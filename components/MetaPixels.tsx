"use client";
import Script from "next/script";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initEngagementTracking } from "@/lib/tracking";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID!;

// Extend window type for Meta Pixel
declare global {
  interface Window {
    fbq: any;
  }
}

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Meta Pixel initialization script
  const init = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
    fbq('track', 'PageView');
  `;

  // Track PageView on route changes (SPA navigation)
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams]);

  // Scroll depth tracking for engagement measurement
  useEffect(() => {
    if (typeof window === "undefined" || !window.fbq) return;

    let scrollDepth = 0;
    const trackedDepths = new Set();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentDepth = Math.round((scrollTop / docHeight) * 100);

      if (currentDepth > scrollDepth) {
        scrollDepth = currentDepth;

        // Track significant scroll milestones
        const milestones = [25, 50, 75, 90];
        for (const milestone of milestones) {
          if (currentDepth >= milestone && !trackedDepths.has(milestone)) {
            trackedDepths.add(milestone);
            window.fbq("trackCustom", "ScrollDepth", {
              depth_percentage: milestone,
              content_name: "landing_page",
            });
            break; // Only track one milestone per scroll event
          }
        }
      }
    };

    // Throttle scroll events for performance
    let scrollTimeout: NodeJS.Timeout;
    const throttledScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100);
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Initialize engagement tracking when pixel loads
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      const cleanup = initEngagementTracking();
      return cleanup;
    }
  }, []);

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: init }}
      />
      {/* NoScript fallback (opciono) */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
