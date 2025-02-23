/** @type {import('next').NextConfig} */
export default {
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};
// Compare this snippet from tailwind.config.js:
