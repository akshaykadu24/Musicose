import { FreeMode, Mousewheel, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// Shared settings for horizontal product rows (Daily Deals, Smart Watches).
// Mobile shows part of the next card so users know they can swipe.
export const scrollRowProps = {
  slidesPerView: 1.25,
  spaceBetween: 14,
  freeMode: true,
  mousewheel: { forceToAxis: true, releaseOnEdges: true },
  pagination: { clickable: true },
  modules: [FreeMode, Mousewheel, Pagination],
  breakpoints: {
    520: { slidesPerView: 2.2, spaceBetween: 16 },
    800: { slidesPerView: 3, spaceBetween: 20 },
    1100: { slidesPerView: 4, spaceBetween: 16 },
    1280: { slidesPerView: 5, spaceBetween: 16 },
  },
};

export const scrollRowStyles = {
  ".swiper": { pb: "10" },
  ".swiper-slide": { height: "auto" },
  ".swiper-pagination-bullet-active": { bg: "red.500" },
};
