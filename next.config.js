// @ts-nocheck
import BuilderDevTools from "@builder.io/dev-tools/next";

/** @type {import('next').NextConfig} */
const nextConfig = BuilderDevTools()(
  BuilderDevTools()(
    BuilderDevTools()(
      BuilderDevTools()(
        BuilderDevTools()({
          reactStrictMode: true,
          compiler: {
            styledComponents: true,
          },
          publicRuntimeConfig: {
            // Available on both server and client
            theme: "DEFAULT",
          },
          images: {
            remotePatterns: [
              {
                hostname: "wecare.com.vn",
              },
              {
                hostname: "placehold.co",
              },
            ],
          },
        })
      )
    )
  )
);

export default nextConfig;
