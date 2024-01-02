import Link from "next/link";
import React from "react";
import { getReviews } from "@/lib/reviews";

export const metadata = { title: "recenzie" };

const page = async () => {
  const reviews = await getReviews();

  return (
    <div className="space-y-2">
      <h2 className="text-purple-800 text-2xl">this is reviews page</h2>
      <ul className="flex flex-col gap-4 flex-wrap md:flex-row">
        {reviews.map(review => {
          return (
            <li key={review.slug} className="bg-white shadow-sm hover:shadow-xl transition-shadow">
              <Link href={`/reviews/${review.slug}`} className="grid place-items-center">
                <img src={review.image} alt="mlieko" width={320} height={180} />
                <h4>{review.title}</h4>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default page;
