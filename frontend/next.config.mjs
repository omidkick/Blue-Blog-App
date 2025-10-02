// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "5000",
//         pathname: "/uploads/**",
//       },
//     ],
//   },
//   logging: {
//     fetches: {
//       fullUrl: true,
//     },
//   },
//   // experimental: {
//   //   ppr: "incremental",
//   // },
// };

// export default nextConfig;


//! for deploying :

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.blue-blog.ir",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;