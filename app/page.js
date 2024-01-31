import { getReviews } from "@/lib/reviews";
import Link from "next/link";
import Image from "next/image";

const page = async () => {
  const { reviews, pageCount } = await getReviews(3);

  return (
    <>
      <h2 className="text-purple-800 text-2xl">Homepage of milk</h2>
      <p>the freshest news about milk</p>
      <ul className="flex flex-col gap-4 flex-wrap sm:flex-row">
        {reviews.map(review => {
          return (
            <li key={review.slug} className=" bg-white shadow-sm hover:shadow-xl transition-shadow">
              <Link
                href={`/reviews/${review.slug}`}
                className="grid place-items-center bg-white shadow-sm hover:shadow-xl transition-shadow sm:items-start sm:flex-row"
              >
                <Image src={review.image} alt="" width={320} height={180} />
                <div className="px-2 py-1 space-y-2 text-center">
                  <h4>{review.title}</h4>
                  <h5 className="hidden sm:block">{review.subtitle}</h5>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default page;
