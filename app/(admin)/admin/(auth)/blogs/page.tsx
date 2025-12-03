"use client";

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import AdminItemContainer from "@/app/components/Common/AdminItemContainer";
import { useForm, Controller } from "react-hook-form";
import { ImageUploader } from "@/components/ui/image-uploader";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import BlogCard from "./BlogCard";
import { toast } from "sonner";

interface BlogsPageProps {
  metaTitle: string;
  metaTitle_ar: string;
  metaDescription: string;
  metaDescription_ar: string;
  banner: string;
  bannerAlt: string;
  bannerAlt_ar: string;
  pageTitle: string;
  pageTitle_ar: string;
  firstSection: {
    title: string;
    description: string;
  };
}

export default function Blogs() {
  const [category, setCategory] = useState<string>("");
  const [categoryArabic, setCategoryArabic] = useState<string>("");
  const [blogList, setBlogList] = useState<{ _id: string; title: string }[]>(
    []
  );
  const [categoryList, setCategoryList] = useState<
    { _id: string; name: string,name_ar:string }[]
  >([]);

  const [reorderMode, setReorderMode] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<BlogsPageProps>();

  const handleAddCategory = async () => {
    try {
      const response = await fetch("/api/admin/blogs/category", {
        method: "POST",
        body: JSON.stringify({ name: category,name_ar:categoryArabic }),
      });
      if (response.ok) {
        const data = await response.json();
        setCategory("");
        setCategoryArabic("");
        toast.success(data.message);
        handleFetchCategory();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error adding category", error);
    }
  };

  const handleFetchCategory = async () => {
    try {
      const response = await fetch("/api/admin/blogs/category");
      if (response.ok) {
        const data = await response.json();
        setCategoryList(data.data);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error fetching category", error);
    }
  };

  const handleEditCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/blogs/category?id=${id}`, {
        method: "PATCH",
        body: JSON.stringify({ name: category,name_ar:categoryArabic }),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        handleFetchCategory();
        setCategory("");
        setCategoryArabic("");
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error editing category", error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/blogs/category?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        handleFetchCategory();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error deleting category", error);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/blogs?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        handleFetchBlogs();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error deleting blog", error);
    }
  };

  const onSubmit = async (data: BlogsPageProps) => {
    try {
      const response = await fetch(`/api/admin/blogs`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        // router.push("/admin/commitment");
      }
    } catch (error) {
      console.log("Error in submitting details", error);
    }
  };

  const handleFetchBlogs = async () => {
    try {
      const response = await fetch("/api/admin/blogs");
      if (response.ok) {
        const data = await response.json();
        setValue("metaTitle", data.data.metaTitle);
        setValue("metaDescription", data.data.metaDescription);
        setValue("banner", data.data.banner);
        setValue("bannerAlt", data.data.bannerAlt);
        setValue("pageTitle", data.data.pageTitle);
        setBlogList(
          data.data.categories.flatMap(
            (category: { blogs: { _id: string }[] }) => category.blogs
          )
        );
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error fetching blog details", error);
    }
  };

  const getTaskPos = (id: string) =>
    blogList.findIndex(
      (item: { _id: string; title: string }) => item._id == id
    );
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = getTaskPos(active.id as string);
    const newIndex = getTaskPos(over.id as string);

    const newPosition = arrayMove(blogList, oldIndex, newIndex);
    setBlogList(newPosition);
  };

  const confirmPosition = async () => {
    setReorderMode(!reorderMode);

    // send only blog IDs, not full objects
    const reorderedIds = blogList.map((blog) => blog._id);

    const formData = new FormData();
    formData.append("blogs", JSON.stringify(reorderedIds));

    const response = await fetch(`/api/admin/blogs/reorder`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      toast.success(data.message);
    }
  };

  useEffect(() => {
    handleFetchCategory();
    handleFetchBlogs();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-10">

        {/*English Version*/}
        <div className="flex flex-col gap-5">
        <AdminItemContainer>
          <Label className="" main>
            Banner
          </Label>
          <div className="p-5 rounded-md grid grid-cols-2 gap-5">
            <div>
              <Controller
                name="banner"
                control={control}
                rules={{ required: "Banner is required" }}
                render={({ field }) => (
                  <ImageUploader
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.banner && (
                <p className="text-red-500">{errors.banner.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Alt Tag</Label>
                <Input
                  type="text"
                  placeholder="Alt Tag"
                  {...register("bannerAlt")}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Page Title</Label>
                <Input
                  type="text"
                  placeholder="Page Title"
                  {...register("pageTitle")}
                />
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <div className="flex flex-col gap-2">
          <Label className="font-bold">Meta Title</Label>
          <Input
            type="text"
            placeholder="Meta Title"
            {...register("metaTitle")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-bold">Meta Description</Label>
          <Input
            type="text"
            placeholder="Meta Description"
            {...register("metaDescription")}
          />
        </div>

        </div>


{/*Arabic Version*/}
        <div className="flex flex-col gap-5">
        <AdminItemContainer>
          <Label className="" main>
            Banner
          </Label>
          <div className="p-5 rounded-md grid grid-cols-2 gap-5">
            <div>
              <Controller
                name="banner"
                control={control}
                rules={{ required: "Banner is required" }}
                render={({ field }) => (
                  <ImageUploader
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.banner && (
                <p className="text-red-500">{errors.banner.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Alt Tag</Label>
                <Input
                  type="text"
                  placeholder="Alt Tag"
                  {...register("bannerAlt_ar")}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Page Title</Label>
                <Input
                  type="text"
                  placeholder="Page Title"
                  {...register("pageTitle_ar")}
                />
              </div>
            </div>
          </div>
        </AdminItemContainer>

        <div className="flex flex-col gap-2">
          <Label className="font-bold">Meta Title</Label>
          <Input
            type="text"
            placeholder="Meta Title"
            {...register("metaTitle_ar")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-bold">Meta Description</Label>
          <Input
            type="text"
            placeholder="Meta Description"
            {...register("metaDescription_ar")}
          />
        </div>

        </div>

        <div className="col-span-2">
          <Button
            type="submit"
            className="cursor-pointer text-white text-[16px] w-full"
          >
            Submit
          </Button>
        </div>
      </form>

      <div className="h-screen grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2 h-screen">
          <div className="h-full w-full p-5 shadow-md border-gray-300 rounded-md overflow-y-hidden bg-white">
            <div className="flex justify-between border-b-2 pb-2">
              <div>
                <Label className="text-sm font-bold">Category</Label>
                <p className="text-red-500 text-[13px] font-light">
                  Deleting Category will delete all blogs in that category
                </p>
              </div>
              <Dialog>
                <DialogTrigger
                  className="bg-black text-white px-2 py-1 rounded-md"
                  onClick={() => {setCategory("");setCategoryArabic("")}}
                >
                  Add Category
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Category</DialogTitle>
                    <DialogDescription>
                      <Label>Category Name</Label>
                      <Input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />

                      <Label>Category Name Arabic</Label>
                      <Input
                        type="text"
                        placeholder="Category"
                        value={categoryArabic}
                        onChange={(e) => setCategoryArabic(e.target.value)}
                      />

                    </DialogDescription>
                  </DialogHeader>
                  <DialogClose
                    className="bg-black text-white px-2 py-1 rounded-md"
                    onClick={handleAddCategory}
                  >
                    Save
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </div>
            <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[80%]">
              {categoryList.map((item) => (
                <div
                  className="flex justify-between border p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                  key={item._id}
                >
                  <div className="text-[16px]">{item.name}</div>
                  <div className="flex gap-5">
                    <Dialog>
                      <DialogTrigger
                        onClick={() => {
                          setCategory(item.name);
                          setCategoryArabic(item.name_ar);
                        }}
                      >
                        <MdEdit />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Category</DialogTitle>
                          <DialogDescription>
                            <Label>Category Name</Label>
                            <Input
                              type="text"
                              placeholder="Category"
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                            />

                            <Label>Category Name Arabic</Label>
                            <Input
                              type="text"
                              placeholder="Category"
                              value={categoryArabic}
                              onChange={(e) => setCategoryArabic(e.target.value)}
                            />
                          </DialogDescription>
                        </DialogHeader>
                        <DialogClose
                          className="bg-black text-white px-2 py-1 rounded-md"
                          onClick={() => handleEditCategory(item._id)}
                        >
                          Save
                        </DialogClose>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger>
                        <MdDelete />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Are you sure? This will delete all the blogs in the
                            category
                          </DialogTitle>
                        </DialogHeader>
                        <div className="flex gap-2">
                          <DialogClose className="bg-black text-white px-2 py-1 rounded-md">
                            No
                          </DialogClose>
                          <DialogClose
                            className="bg-black text-white px-2 py-1 rounded-md"
                            onClick={() => handleDeleteCategory(item._id)}
                          >
                            Yes
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-screen w-full p-5 shadow-md border-gray-300 rounded-md overflow-y-hidden bg-white">
          <div className="flex justify-between border-b-2 pb-2">
            <div>
              <Label className="text-sm font-bold">Blogs</Label>
              <p>Count: {blogList.length}</p>
            </div>
            <div className="flex gap-5">
              <div className="flex gap-5">
                <Button
                  className={`text-white text-[16px] ${
                    reorderMode ? "bg-yellow-700" : "bg-green-700"
                  }`}
                  onClick={() =>
                    reorderMode
                      ? confirmPosition()
                      : setReorderMode(!reorderMode)
                  }
                >
                  {reorderMode ? "Done" : "Reorder"}
                </Button>
              </div>
              <Button onClick={() => router.push("/admin/blogs/add")}>
                Add Blog
              </Button>
            </div>
          </div>
          {!reorderMode && (
            <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[90%]">
              {blogList.map((item) => (
                <div
                  className="flex justify-between border p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                  key={item._id}
                >
                  <div className="text-[16px]">{item.title}</div>
                  <div className="flex gap-5">
                    <MdEdit
                      onClick={() =>
                        router.push(`/admin/blogs/edit/${item._id}`)
                      }
                    />

                    <Dialog>
                      <DialogTrigger>
                        <MdDelete />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure?</DialogTitle>
                        </DialogHeader>
                        <div className="flex gap-2">
                          <DialogClose className="bg-black text-white px-2 py-1 rounded-md">
                            No
                          </DialogClose>
                          <DialogClose
                            className="bg-black text-white px-2 py-1 rounded-md"
                            onClick={() => handleDeleteBlog(item._id)}
                          >
                            Yes
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          )}

          {reorderMode && (
            <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[90%]">
              <DndContext
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={blogList.map((item) => item._id)}
                  strategy={verticalListSortingStrategy}
                >
                  {blogList.map((item) => (
                    <BlogCard key={item._id} title={item.title} id={item._id} />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
