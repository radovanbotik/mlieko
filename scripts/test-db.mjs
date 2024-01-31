import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
// const comment = await db.comment.create({
//   data: {
//     slug: "kefir",
//     user: "radovan",
//     message: "review test 2",
//   },
// });

// console.log(comment);

const comments = await db.comment.findMany({
  where: { slug: "kefir" },
});

console.log(comments);
