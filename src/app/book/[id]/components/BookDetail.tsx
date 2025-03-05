"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const BookDetail = ({
  data,
}: {
  data: {
    data: {
      _id: string;
      cover_photo: string;
      title: string;
    };
  };
}) => {
  const router = useRouter();

  return (
    <div>
      <p className=" cursor-pointer" onClick={() => router.push("/")}>
        Back
      </p>
      <div onClick={() => router.push(`/book/${data?.data._id}`)}>
        <Image
          priority
          width={300}
          height={300}
          src={data?.data.cover_photo}
          alt=""
        />
        {data?.data.title}
      </div>
    </div>
  );
};

export default BookDetail;
