"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
const url = "https://elibrary-demo-b.origin.com.mm/api";
import useSWR from "swr"; // Import SWRResponse
import { useInView } from "react-intersection-observer";

interface Ebook {
  cover_photo: string;
  title: string;
  // Add more properties as needed
}

const Home = () => {
  const [limit, setLimit] = useState<number>(200); // Explicitly type limit

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView) {
      setLimit((prevLimit) => prevLimit + 12);
    }
  }, [inView]);

  const getData = (url: string) => {
    // Specify Promise<any>
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
        // Remove ': any' here
        console.error("Fetch API Error:", error);
        throw error;
      }
    })();
  };

  const { data, isLoading } = useSWR(
    // Specify SWRResponse type
    `${url}/ebook/list?limit=${limit}`,
    getData
  );

  return (
    <div className="min-h-screen m-10">
      <div className="grid gap-12 mb-3 grid-cols-4">
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
              <div key={index}>
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
      </div>
      {!isLoading && <div ref={ref}></div>}
    </div>
  );
};

export default Home;
