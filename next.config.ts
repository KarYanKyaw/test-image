import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "obselibrarymain.s3.ap-southeast-1.amazonaws.com",
      "obsmainlibrary-dev.s3.ap-southeast-1.amazonaws.com",
      "digitallibrary-dev.s3.ap-southeast-1.amazonaws.com", // Add this line
    ],
  },
};

export default nextConfig;
