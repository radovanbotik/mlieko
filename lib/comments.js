import { db } from "./db";

export async function getComments(slug) {
  const comments = await db.comment.findMany({
    where: { slug: slug },
    orderBy: { postedAt: "desc" },
  });
  return comments;
}

export async function createComment({ user, slug, message }) {
  return await db.comment.create({
    data: {
      slug: slug,
      user: user,
      message: message,
    },
  });
}
