import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = isGitHubPages
  ? {
      assetPrefix: basePath,
      basePath,
      images: {
        unoptimized: true,
      },
      output: "export",
      trailingSlash: true,
    }
  : {};

export default nextConfig;
