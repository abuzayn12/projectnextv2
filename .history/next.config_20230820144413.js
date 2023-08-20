/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com']
   },
   experimental: {
    serverComponentsExternalPackages: ['cloudinary', 'graphql-reqeust']
   }
}

module.exports = nextConfig