import { prisma } from "@/lib/prisma";

// Fold a Steam-only "orphan" account (created by a bare Steam login, with no
// email and no password) into a real target account. Everything the orphan
// owns is moved to the target, then the orphan row is deleted. Runs in one
// transaction so a failure leaves both accounts untouched.
//
// Only call this once the caller has confirmed `sourceId` is a Steam-only
// account — merging a password/email account here would silently destroy it.
export async function mergeSteamOnlyUserInto(sourceId: string, targetId: string) {
  if (sourceId === targetId) return;

  await prisma.$transaction(async (tx) => {
    // Rows with no cross-user unique constraint — move wholesale.
    await tx.order.updateMany({ where: { userId: sourceId }, data: { userId: targetId } });
    await tx.skinPurchase.updateMany({ where: { userId: sourceId }, data: { userId: targetId } });
    await tx.address.updateMany({ where: { userId: sourceId }, data: { userId: targetId } });

    // Reviews & wishlist are unique on [userId, productId]; drop orphan rows
    // that would collide with the target's, move the rest.
    await moveUniqueByProduct(
      tx.review.findMany.bind(tx.review),
      tx.review.update.bind(tx.review),
      tx.review.delete.bind(tx.review),
      sourceId,
      targetId,
    );
    await moveUniqueByProduct(
      tx.wishlistItem.findMany.bind(tx.wishlistItem),
      tx.wishlistItem.update.bind(tx.wishlistItem),
      tx.wishlistItem.delete.bind(tx.wishlistItem),
      sourceId,
      targetId,
    );

    // Newsletter is unique on userId — keep the target's if it already has one.
    const targetNewsletter = await tx.newsletter.findUnique({ where: { userId: targetId } });
    if (targetNewsletter) {
      await tx.newsletter.deleteMany({ where: { userId: sourceId } });
    } else {
      await tx.newsletter.updateMany({ where: { userId: sourceId }, data: { userId: targetId } });
    }

    // Hand the Steam identity to the target.
    await tx.steamAccount.update({ where: { userId: sourceId }, data: { userId: targetId } });

    // Sessions and password-reset tokens cascade-delete with the orphan.
    await tx.user.delete({ where: { id: sourceId } });
  });
}

type FindMany = (args: {
  where: { userId: string };
  select: { id: true; productId: true };
}) => Promise<Array<{ id: string; productId: string }>>;
type Update = (args: { where: { id: string }; data: { userId: string } }) => Promise<unknown>;
type Delete = (args: { where: { id: string } }) => Promise<unknown>;

async function moveUniqueByProduct(
  findMany: FindMany,
  update: Update,
  del: Delete,
  sourceId: string,
  targetId: string,
) {
  const targetRows = await findMany({ where: { userId: targetId }, select: { id: true, productId: true } });
  const takenProductIds = new Set(targetRows.map((r) => r.productId));
  const sourceRows = await findMany({ where: { userId: sourceId }, select: { id: true, productId: true } });
  for (const row of sourceRows) {
    if (takenProductIds.has(row.productId)) {
      await del({ where: { id: row.id } });
    } else {
      await update({ where: { id: row.id }, data: { userId: targetId } });
    }
  }
}
