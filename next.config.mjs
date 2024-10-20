/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
        },
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
        },
      ],
      domains: ['example.com', 'in.pinterest.com'], // Allowing images from these domains
    },
  };
  
  export default nextConfig;
  
  // This configuration allows Next.js to fetch and optimize images from Firebase Storage and GitHub avatars,
  // while keeping other remote sources restricted for security and performance reasons.
  // It's required because Next.js blocks external images by default unless explicitly allowed.
  