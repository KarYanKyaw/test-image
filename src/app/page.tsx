"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const url = "https://elibrary-demo-b.origin.com.mm/api";

import useSWR from "swr";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";

interface Ebook {
  cover_photo: string;
  title: string;
  _id: string;
}

const Home = () => {
  const [limit, setLimit] = useState<number>(200);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView) {
      setLimit((prevLimit) => prevLimit + 12);
    }
  }, [inView]);

  const getData = (url: string) => {
    return (async () => {
      try {
        const fetchOptions: RequestInit = {};

        const response = await fetch(url, fetchOptions);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "An error occurred");
        }

        return data;
      } catch (error) {
        console.error("Fetch API Error:", error);
        throw error;
      }
    })();
  };

  const { data, isLoading, error } = useSWR(
    `${url}/ebook/list?limit=${limit}`,
    getData
  );

  const router = useRouter();

  return (
    <div className="min-h-screen m-10">
      <div className="grid gap-12 mb-3 grid-cols-4">
        {!error && (
          <>
            {isLoading ? (
              <>
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-300 h-72 w-full mb-2"></div>
                    <div className="bg-gray-300 h-6 w-3/4"></div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {data?.all?.map((item: Ebook, index: number) => (
                  <div
                    onClick={() => router.push(`/book/${item._id}`)}
                    key={index}
                  >
                    <Image
                      priority
                      width={300}
                      height={300}
                      src={item.cover_photo}
                      alt=""
                    />
                    {item.title}
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
      {!isLoading && <div ref={ref}></div>}
    </div>
  );
};

export default Home;
