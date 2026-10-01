"use client";

import { ReactLenis } from '@studio-freight/react-lenis';

export default function Providers({ children }) {
  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  );
}
