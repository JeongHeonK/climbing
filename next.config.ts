import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MONGO_DB_URL: process.env.MONGO_DB_URL,
    SESSION_SECRET: process.env.SESSION_SECRET,
    NEXT_PUBLIC_KAKAO_KEYaa: process.env.NEXT_PUBLIC_KAKAO_KEY,
  },
};

export default nextConfig;
