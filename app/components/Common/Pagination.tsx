"use client";

import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { motion } from "framer-motion";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const renderPages = () => {
    const pages: (number | string)[] = [];

    // Case 1: Show first 4 + dots + last (initial view)
    if (currentPage <= 3) {
      for (let i = 1; i <= Math.min(4, totalPages); i++) {
        pages.push(i);
      }
      if (totalPages > 4) {
        pages.push("...");
        pages.push(totalPages);
      }
    }
    // Case 2: Middle range with shifting dots
    else if (currentPage > 3 && currentPage < totalPages - 2) {
      pages.push(1);
      pages.push("...");
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push("...");
      pages.push(totalPages);
    }
    // Case 3: Near the end
    else {
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) {
        if (i > 1) pages.push(i);
      }
    }

    return pages.map((page, idx) =>
      page === "..." ? (
        <span key={`dots-${idx}`}>...</span>
      ) : (
        <button
          key={page}
          onClick={() => onPageChange(page as number)}
          className={`rounded-full text-sm leading-[1.52] font-light w-[40px] lg:w-[50px] h-[40px] lg:h-[50px] cursor-pointer ${
            currentPage === page
              ? "bg-[#C9F3FF] text-black hover:bg-primary hover:text-white transition-all duration-300"
              : "text-black hover:bg-[#D3D3D3] transition-all duration-300"
          }`}
        >
          {(page as number).toString().padStart(2, "0")}
        </button>
      )
    );
  };

  return (
    <motion.div className="flex justify-center mt-[25px] xl:mt-[50px] items-center space-x-[2px] text-sm font-light removeMt">
      {/* Prev Button */}
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="w-[35px] lg:w-[50px] h-[35px] lg:h-[50px] flex items-center justify-center cursor-pointer"
        >
          <MdOutlineArrowBackIos className="text-[#D3D3D3]" size={24} />
        </button>
      )}

      {/* Page Numbers */}
      {renderPages()}

      {/* Next Button */}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="w-[35px] lg:w-[50px] h-[35px] lg:h-[50px] flex items-center justify-center cursor-pointer"
        >
          <MdOutlineArrowForwardIos className="text-[#D3D3D3]" size={24} />
        </button>
      )}
    </motion.div>
  );
}
