import { Metadata } from "next";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const id = (await params).id;

  const fetchOptions: RequestInit = {};

  const response = await fetch(
    `https://elibrary-demo-b.origin.com.mm/api/ebook/get/${id}/similar`,
    fetchOptions
  );

  const data = await response.json();

  return {
    title: data?.data?.title,
    description: data?.description || "No description available.",
    openGraph: {
      images: [
        {
          url: data?.data?.cover_photo || "default-image-url",
          alt: data?.data?.title || "Book cover image",
        },
      ],
    },
  };
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
