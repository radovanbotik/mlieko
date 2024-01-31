import React, { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getReview, getSlugs } from "@/lib/reviews";
import ShareLinkButton from "@/components/ShareLinkButton";
import CommentList from "@/components/CommentList";
import CommentForm from "@/components/CommentForm";

// export const dynamicParams = true;
// export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map(slug => ({ slug: slug }));
}

export async function generateMetadata({ params: { slug } }) {
  const review = await getReview(slug);
  if (!review) {
    return notFound();
  }
  return {
    title: review.title,
  };
}

const page = async ({ params: { slug } }) => {
  const review = await getReview(slug);

  if (!review) {
    return notFound();
  }

  return (
    <div className="space-y-2">
      <h2 className="text-2xl text-pink-400">{review.title}</h2>
      <div className="flex gap-2 items-center">
        <p>{review.date}</p>
        <ShareLinkButton />
      </div>
      <Image src={review.image} alt="" height={320} width={640} priority={true} />
      <article dangerouslySetInnerHTML={{ __html: review.body }} className="prose max-w-screen-sm" />
      <section className="border-dashed border-t max-w-screen-sm mt-3 py-3 space-y-3">
        <h2 className="font-bold items-center text-xl">Comments</h2>
        <CommentForm title={review.title} slug={slug} />
        <Suspense fallback={<p>loading...</p>}>
          <CommentList slug={slug} />
        </Suspense>
      </section>
    </div>
  );
};

export default page;
