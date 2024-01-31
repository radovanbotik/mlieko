import Link from "next/link";
import React from "react";
import Image from "next/image";
import { getReviews } from "@/lib/reviews";
import Pagination from "@/components/Pagination";
import SearchBox from "@/components/SearchBox";

export const metadata = { title: "recenzie" };

const PAGE_SIZE = 2;

const page = async ({ searchParams }) => {
  function parsePageParam(paramValue) {
    if (paramValue) {
      const page = Number(paramValue);
      if (isFinite(page) && page > 0) {
        return page;
      }
    }
    return 1;
  }
  const page = parsePageParam(searchParams.page);
  const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);

  return (
    <div className="space-y-2">
      <h2 className="text-purple-800 text-2xl">this is reviews page</h2>
      <div className="flex justify-between">
        <Pagination page={page} pageCount={pageCount} href={"/reviews"} />
        <SearchBox />
      </div>
      <ul className="flex flex-col gap-4 flex-wrap md:flex-row">
        {reviews.map((review, index) => {
          return (
            <li key={review.slug} className="bg-white shadow-sm hover:shadow-xl transition-shadow">
              <Link href={`/reviews/${review.slug}`} className="grid place-items-center">
                <Image src={review.image} alt="mlieko" width={320} height={180} priority={index === 0} />
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
