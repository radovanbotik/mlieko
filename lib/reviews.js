import { readFile, readdir } from "node:fs/promises";
import matter from "gray-matter";
import { marked } from "marked";

const getReview = async slug => {
  const text = await readFile(`./content/reviews/${slug}.md`, "utf-8");
  const {
    content,
    data: { title, image, date },
  } = matter(text);
  const body = marked(content);
  return { body, title, image, date };
};

const getSlugs = async () => {
  const reviews = await readdir(`./content/reviews`);
  const slugs = reviews.filter(slug => slug.endsWith(".md")).map(slug => slug.slice(0, -".md".length));
  return slugs;
};

const getReviews = async () => {
  const slugs = await getSlugs();
  const result = [];
  for (const slug of slugs) {
    const { title, image, date } = await getReview(slug);
    result.push({ slug, title, image, date });
  }
  return result;
};

export { getReview, getReviews, getSlugs };
