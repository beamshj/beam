"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Select from "react-select";
import { motion } from "framer-motion";
import Pagination from "../../Common/Pagination";

interface BlogItem {
  image: string;
  title: string;
  date: string;
  category: string;
}

export default function BlogList({ data }: { data: BlogItem[] }) {
  const categories = [
    ...Array.from(new Set(data.map((blog) => blog.category))),
  ];

  const [selectedCategory, setSelectedCategory] = useState("curriculum");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(9);

  useEffect(() => {
    const updateBlogsPerPage = () => {
      if (window.innerWidth < 1024) {
        setBlogsPerPage(5);
      } else {
        setBlogsPerPage(9);
      }
    };

    updateBlogsPerPage();
    window.addEventListener("resize", updateBlogsPerPage);
    return () => window.removeEventListener("resize", updateBlogsPerPage);
  }, []);

  const filteredBlogs =
    selectedCategory === "curriculum"
      ? data
      : data.filter((blog) => blog.category === selectedCategory);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + blogsPerPage
  );

  return (
    <section className="pb-10 xl:pb-20 2xl:pb-[135px]">
      <div className="container">
        <div className="w-full flex justify-between items-center border-b border-bdrcolor">
          {/* Header */}
          <motion.h1 className="text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl lg:leading-[1.111] font-light mb-[30px] xl:mb-[50px] text-black">
            Blog
          </motion.h1>
          {/* Category Tabs */}
          <div className="hidden lg:flex gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-[20px] py-[11px] text-xs rounded-[50px] border border-bdrcolor font-light transition-colors duration-200
            ${
              selectedCategory === cat
                ? "bg-[#C9F3FF] text-black border-[#42BADC]"
                : "bg-white text-black hover:bg-[#F5F5F5]"
            }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="block lg:hidden">
          <Select
            instanceId="category-select"
            options={categories.map((cat) => ({ value: cat, label: cat }))}
            value={{ value: selectedCategory, label: selectedCategory }}
            onChange={(option) => {
              if (option) {
                setSelectedCategory(option.value);
                setCurrentPage(1);
              }
            }}
            className="text-19 font-light"
            classNamePrefix="react-select"
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: "8px",
                padding: "2px",
                borderColor: "#BCBCBC",
                boxShadow: "none",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected ? "#EC1C24" : "white",
                color: state.isSelected ? "white" : "black",
                cursor: "pointer",
              }),
            }}
          />
        </div>
        {/* Blog Grid */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[22px] gap-y-[22px] xl:gap-x-[33px] xl:gap-y-[33px] mt-[65px]">
          {currentBlogs.map((blog, index) => (
            <motion.div
              key={index}
              className="rounded-[12px] relative overflow-hidden h-[350px] xl:h-[480px] 2xl:h-[551px] border border-bdrcolor flex flex-col group"
            >
              {/* Sliding Gradient from bottom */}
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#E2F5FF] to-white transform translate-y-full opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100" />
              </div>

              {/* Image Section */}
              <div className="relative w-full h-[301px] rounded-t-[12px] overflow-hidden flex-shrink-0">
                <Image
                  src={blog.image || "/images/fallback.jpg"}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
                {/* Black overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/0" />

                {/* Hover Arrow */}
                <div className="absolute top-[30px] right-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-primary text-white w-[74px] h-[74px] rounded-full flex items-center justify-center">
                    <Image
                      src="/images/arrow-right-up.svg"
                      alt="arrow"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 flex flex-col justify-center px-[40px]">
                <div className="flex text-colorpara justify-between items-center text-sm font-light leading-[1.7] mb-[15px]">
                  <span>
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })}
                  </span>
                  <span className="capitalize">{blog.category}</span>
                </div>
                <h3 className="text-lg leading-[1.2] font-light text-black">
                  {blog.title}
                </h3>
                <div>
                  <button className="bg-primary text-white w-[27px] h-[27px] rounded-full flex items-center justify-center mt-[15px]">
                    <Image
                      src="/images/arrow-right-tip.svg"
                      alt="arrow"
                      width={15}
                      height={15}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}
