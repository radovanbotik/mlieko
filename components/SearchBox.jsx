"use client";
import React, { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import useIsClient from "@/hooks/useIsClient";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

const SearchBox = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedReview, setSelectedReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    if (query.length > 1) {
      const controller = new AbortController();
      (async () => {
        const url = `/api/search?query=${encodeURIComponent(debouncedQuery)}`;
        const response = await fetch(url, { signal: controller.signal });
        console.log(response);
        const { reviews } = await response.json();
        setReviews(reviews);
      })();
      return () => controller.abort();
    } else {
      setReviews([]);
    }
  }, [debouncedQuery]);

  const isClient = useIsClient();
  if (!isClient) return null;

  const handleChange = e => {
    setSelectedReview(e);
    router.push(`/reviews/${e.slug}`);
  };

  return (
    <div className="relative space-y-2 w-48">
      <Combobox onChange={handleChange} value={selectedReview}>
        <Combobox.Input placeholder="search" onChange={e => setQuery(e.target.value)} className="pl-2 w-full" />
        <Combobox.Options className="absolute bg-white w-full space-y-1 pl-2 border rounded">
          {reviews.map(review => {
            return (
              <Combobox.Option key={review.slug} value={review}>
                {({ active }) => {
                  return (
                    <span className={`block truncate cursor-pointer ${active && "bg-amber-500"}`}>{review.title}</span>
                  );
                }}
              </Combobox.Option>
            );
          })}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default SearchBox;
