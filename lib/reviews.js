import "server-only";
import { marked } from "marked";
const qs = require("qs");

const URL = process.env.CMS_URL;
export const CACHE_TAG_REVIEWS = "reviews";

const fetchReviews = async parameters => {
  const response = await fetch(`${URL}/api/reviews?${qs.stringify(parameters, { encodeValuesOnly: true })}`, {
    next: {
      tags: [CACHE_TAG_REVIEWS],
    },
  });
  if (!response.ok) {
    console.log("error");
    throw new Error(
      `CMS returned ${response.status} for this url : ${URL}/api/reviews?${qs.stringify(parameters, {
        encodeValuesOnly: true,
      })}`
    );
  }

  return await response.json();
};

const getReview = async slug => {
  const response = await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ["slug", "title", "publishedAt", "subtitle", "body"],
    populate: { image: { fields: ["url"] } },
    pagination: { pageSize: 1, withCount: false },
  });
  const { data } = response;
  if (data.length === 0) {
    return null;
  }
  const { attributes } = data[0];
  return {
    slug: attributes.slug,
    title: attributes.title,
    image: `${URL}${attributes.image.data.attributes.url}`,
    date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
    subtitle: attributes.subtitle,
    body: marked(attributes.body),
  };
};

const getSlugs = async () => {
  const { data } = await fetchReviews({
    fields: ["slug"],
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 100 },
  });
  return data.map(item => item.attributes.slug);
};

const getReviews = async (pageSize, page) => {
  const response = await fetchReviews({
    fields: ["slug", "title", "subtitle", "publishedAt"],
    populate: { image: { fields: ["url"] } },
    sort: ["publishedAt:desc"],
    pagination: { pageSize: pageSize, page: page },
  });
  const { data, meta } = response;
  return {
    reviews: data.map(({ attributes }) => ({
      slug: attributes.slug,
      title: attributes.title,
      image: `${URL}${attributes.image.data.attributes.url}`,
      date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
      subtitle: attributes.subtitle,
    })),
    pageCount: meta.pagination.pageCount,
  };
};

const searchReviews = async query => {
  const response = await fetchReviews({
    filters: { title: { $containsi: query } },
    fields: ["slug", "title"],
    sort: ["title"],
    pagination: { pageSize: 100 },
  });
  const { data, meta } = response;
  return {
    reviews: data.map(({ attributes }) => ({
      slug: attributes.slug,
      title: attributes.title,
    })),
    pageCount: meta.pagination.pageCount,
  };
};

export { getReview, getReviews, getSlugs, searchReviews };
