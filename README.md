# Creative Developer Portfolio ✦

A modern, high-performance portfolio built for creative developers and designers. 

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS v4](https://img.shields.io/badge/TailwindCSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

## Features

- **Next.js App Router**: Server-side rendering and static generation for peak performance.
- **Framer Motion & Lenis**: Silky-smooth 60fps animations and hardware-accelerated smooth scrolling.
- **Resend Integration**: Fully functional, serverless contact form without exposing email addresses.
- **Tailwind CSS v4**: Lightning-fast, utility-first styling with modern PostCSS processing.
- **Optimized Media**: Next.js `<Image>` component integration with WebP conversion.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env.local` file with your Resend API Key:
   ```env
   RESEND_API_KEY=your_resend_api_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Architecture Notes

- **`/src/components/ui`**: Contains atomic, reusable UI elements (e.g., `MagneticButton`).
- **`/src/constants`**: Houses local static data (e.g., `PROJECTS_DATA`).

---
*Built with passion and caffeine.*
