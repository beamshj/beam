// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import Select from "react-select";
// import { motion } from "framer-motion";
// import Pagination from "../../Common/Pagination";
// import { moveUp } from "../../motionVarients";
// import Link from "next/link";
// import { BlogType } from "../type";

// export default function BlogList({
//   data,
//   categories,
// }: {
//   data: BlogType["categories"][number]["blogs"];
//   categories: { name: string }[];
// }) {
//   const uniqueCategories = [
//     ...Array.from(new Set(categories.map((category) => category.name))),
//   ];

//   console.log(uniqueCategories);

//   const [selectedCategory, setSelectedCategory] = useState("curriculum");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [blogsPerPage, setBlogsPerPage] = useState(9);

//   useEffect(() => {
//     const updateBlogsPerPage = () => {
//       if (window.innerWidth < 1024) {
//         setBlogsPerPage(5);
//       } else {
//         setBlogsPerPage(9);
//       }
//     };

//     updateBlogsPerPage();
//     window.addEventListener("resize", updateBlogsPerPage);
//     return () => window.removeEventListener("resize", updateBlogsPerPage);
//   }, []);

//   const filteredBlogs =
//     selectedCategory === "curriculum"
//       ? data
//       : data.filter((blog) => blog.category === selectedCategory);

//   console.log(filteredBlogs);

//   const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
//   const startIndex = (currentPage - 1) * blogsPerPage;
//   const currentBlogs = filteredBlogs.slice(
//     startIndex,
//     startIndex + blogsPerPage
//   );

//   return (
//     <section className="pb-10 xl:pb-20 2xl:pb-[135px]">
//       <div className="container">
//         <div className="w-full flex justify-between items-center border-b border-bdrcolor mb-5 xl:mb-[30px] 2xl:mb-[50px]">
//           {/* Header */}
//           <motion.h1
//             variants={moveUp(0.2)}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, amount: 0.2 }}
//             className="text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl lg:leading-[1.111] font-light mb-3 xl:mb-[30px] 2xl:mb-[50px] text-black"
//           >
//             Blog
//           </motion.h1>
//           {/* Category Tabs */}
//           <div className="hidden lg:flex gap-[15px]">
//             {uniqueCategories.map((cat, index) => {
//               const isSelected = selectedCategory === cat;

//               return (
//                 <motion.div
//                   key={cat}
//                   variants={moveUp(index * 0.2)}
//                   initial="hidden"
//                   whileInView="show"
//                   viewport={{ once: true, amount: 0.2 }}
//                   className={`rounded-[50px] ${
//                     isSelected
//                       ? "bg-gradient-to-r from-[#42BADC] to-[#12586C] p-[1px]" // gradient border
//                       : "border border-bdrcolor"
//                   } transition-colors duration-200 `}
//                 >
//                   <button
//                     onClick={() => {
//                       setSelectedCategory(cat);
//                       setCurrentPage(1);
//                     }}
//                     className={`px-[20px] py-[11px] text-xs rounded-[50px] font-light w-full transition-colors duration-200 uppercase cursor-pointer ${
//                       isSelected
//                         ? "bg-[#C9F3FF] text-black"
//                         : "bg-white text-black hover:bg-[#F5F5F5]"
//                     }`}
//                   >
//                     {cat.charAt(0).toUpperCase() + cat.slice(1)}
//                   </button>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>

//         <div className="block lg:hidden">
//           <Select
//             instanceId="category-select"
//             options={categories.map((cat) => ({
//               value: cat.name,
//               label: cat.name,
//             }))}
//             value={{ value: selectedCategory, label: selectedCategory }}
//             onChange={(option) => {
//               if (option) {
//                 setSelectedCategory(option.value);
//                 setCurrentPage(1);
//               }
//             }}
//             className="text-19 font-light uppercase"
//             classNamePrefix="react-select"
//             styles={{
//               control: (base) => ({
//                 ...base,
//                 borderRadius: "8px",
//                 padding: "2px",
//                 borderColor: "#BCBCBC",
//                 boxShadow: "none",
//               }),
//               option: (base, state) => ({
//                 ...base,
//                 backgroundColor: state.isSelected ? "#EC1C24" : "white",
//                 color: state.isSelected ? "white" : "black",
//                 cursor: "pointer",
//               }),
//             }}
//           />
//         </div>
//         {/* Blog Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[22px] gap-y-[22px] xl:gap-x-[33px] xl:gap-y-[33px] mt-5 xl:mt-[65px] mb-[30px] xl:mb-[50px]">
//           {currentBlogs.map((blog, index) => (
//             <div key={index}>
//               <Link href={`/news-&-media/blog/blog-details/${blog.slug}`}>
//                 <motion.div
//                   variants={moveUp(index * 0.1)}
//                   initial="hidden"
//                   whileInView="show"
//                   viewport={{ once: false, amount: 0.2 }}
//                   className="rounded-[12px] relative overflow-hidden h-full xl:h-[500px] 2xl:h-[551px] border border-bdrcolor flex flex-col group"
//                 >
//                   {/* Sliding Gradient from bottom */}
//                   <div className="absolute inset-0 -z-10 overflow-hidden">
//                     <div className="absolute inset-0 bg-gradient-to-t from-[#E2F5FF] to-white transform translate-y-full opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100" />
//                   </div>

//                   {/* Image Section */}
//                   <div className="relative w-full h-[301px] rounded-t-[12px] overflow-hidden flex-shrink-0">
//                     <Image
//                       src={blog.thumbnail || "/images/fallback.jpg"}
//                       alt={blog.thumbnailAlt}
//                       fill
//                       className="object-cover"
//                     />
//                     {/* Black overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/0" />

//                     {/* Hover Arrow */}
//                     <div className="absolute top-[30px] right-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       <button className="bg-primary text-white w-[74px] h-[74px] rounded-full flex items-center justify-center">
//                         <Image
//                           src="/images/arrow-right-up.svg"
//                           alt="arrow"
//                           width={24}
//                           height={24}
//                         />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Content Section */}
//                   <div className="flex-1 flex flex-col justify-center px-[20px] xl:px-[40px] py-[20px] 2xl:py-[0px]">
//                     <div className="flex text-colorpara justify-between items-center text-sm font-light leading-[1.7] mb-[15px]">
//                       <span>
//                         {blog.date
//                           ? new Date(blog.date).toLocaleDateString("en-US", {
//                               year: "numeric",
//                               month: "numeric",
//                               day: "numeric",
//                             })
//                           : "Date not available"}
//                       </span>
//                       <span className="capitalize">{blog.category}</span>
//                     </div>
//                     <h3 className="text-lg leading-[1.2] font-light text-black">
//                       {blog.title.split(" ").slice(0, 6).join(" ") + "..."}
//                     </h3>
//                     <div>
//                       <button className="bg-primary text-white w-[27px] h-[27px] rounded-full flex items-center justify-center mt-[15px]">
//                         <Image
//                           src="/images/arrow-right-tip.svg"
//                           alt="arrow"
//                           width={15}
//                           height={15}
//                         />
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               </Link>
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={setCurrentPage}
//         />
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Pagination from "../../Common/Pagination";
import { moveUp } from "../../motionVarients";
import Link from "next/link";
import { BlogType } from "../type";

export default function BlogList({
  data,
}: {
  data: BlogType["categories"][number]["blogs"];
}) {
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

  const totalPages = Math.ceil(data.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentBlogs = data.slice(startIndex, startIndex + blogsPerPage);

  return (
    <section className="pb-10 xl:pb-20 2xl:pb-[135px]">
      <div className="container">
        {/* Header */}
        <div className="w-full flex justify-between items-center border-b border-bdrcolor mb-5 xl:mb-[30px] 2xl:mb-[50px]">
          <motion.h1
            variants={moveUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl lg:leading-[1.111] font-light mb-3 xl:mb-[30px] 2xl:mb-[50px] text-black"
          >
            Blog
          </motion.h1>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[22px] gap-y-[22px] xl:gap-x-[33px] xl:gap-y-[33px] mt-5 xl:mt-[65px] mb-[30px] xl:mb-[50px]">
          {currentBlogs.map((blog, index) => (
            <div key={index}>
              <Link href={`/news-&-media/blog/blog-details/${blog.slug}`}>
                <motion.div
                  variants={moveUp(index * 0.1)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="rounded-[12px] relative overflow-hidden h-full xl:h-[495px] border border-bdrcolor flex flex-col group"
                >
                  {/* Sliding Gradient from bottom */}
                  <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#E2F5FF] to-white transform translate-y-full opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100" />
                  </div>

                  {/* Image Section */}
                  <div className="relative w-full h-[301px] rounded-t-[12px] overflow-hidden flex-shrink-0">
                    <Image
                      src={blog.thumbnail || "/images/fallback.jpg"}
                      alt={blog.thumbnailAlt}
                      fill
                      className="object-cover"
                    />
                    {/* Black overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/0" />

                    {/* Hover Arrow */}
                    <div className="absolute top-[30px] right-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-primary text-white w-[74px] h-[74px] rounded-full flex items-center justify-center overflow-hidden cursor-pointer">
                        <span className="transition-all duration-400 translate-y-2 -translate-x-2 group-hover:-translate-y-0 group-hover:translate-x-0 block">
                          <Image
                            src="/images/arrow-right-up.svg"
                            alt="arrow"
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 flex flex-col justify-center px-[20px] xl:px-[40px] py-[20px] 2xl:py-[0px]">
                    {/* <div className="flex text-colorpara justify-between items-center text-sm font-light leading-[1.7] mb-[15px]">
                      <span>
                        {blog.date
                          ? new Date(blog.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                            })
                          : "Date not available"}
                      </span>
                      <span className="capitalize">{blog.category}</span>
                    </div> */}
                    <h3 className="text-lg leading-[1.2] font-light text-black capitalize line-clamp-2">
                      {/* {blog.title.split(" ").slice(0, 6).join(" ") + "..."} */}
                      {blog.title.toLowerCase()}
                    </h3>
                    <div>
                      <button className="bg-primary text-white w-[27px] h-[27px] rounded-full flex items-center justify-center mt-[15px] cursor-pointer">
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
              </Link>
            </div>
          ))}
        </div>

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
