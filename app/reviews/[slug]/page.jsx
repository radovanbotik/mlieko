import React from "react";
import { getReview, getSlugs } from "@/lib/reviews";
import ShareLinkButton from "@/components/ShareLinkButton";

export async function generateMetadata({ params: { slug } }) {
  console.log(slug);
  const review = await getReview(slug);
  return {
    title: review.title,
  };
}

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map(slug => ({ slug: slug }));
}

const page = async ({ params: { slug } }) => {
  const review = await getReview(slug);

  return (
    <div className="space-y-2">
      <h2 className="text-2xl text-pink-400">{review.title}</h2>
      <div className="flex gap-2 items-center">
        <p>{review.date}</p>
        <ShareLinkButton />
      </div>
      <img src={review.image} alt="" height={320} width={640} />
      <article dangerouslySetInnerHTML={{ __html: review.body }} className="prose max-w-screen-sm" />
    </div>
  );
};

export default page;
