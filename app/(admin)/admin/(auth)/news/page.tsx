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
import { toast } from "sonner";

interface NewsPageProps {
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
    title_ar: string;
    description: string;
    description_ar: string;
  };
}

export default function News() {
  const [category, setCategory] = useState<string>("");
  const [categoryArabic, setCategoryArabic] = useState<string>("");
  const [newsList, setNewsList] = useState<{ _id: string; title: string }[]>(
    []
  );
  const [categoryList, setCategoryList] = useState<
    { _id: string; name: string, name_ar: string }[]
  >([]);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<NewsPageProps>();

  const handleAddCategory = async () => {
    try {
      const response = await fetch("/api/admin/news/category", {
        method: "POST",
        body: JSON.stringify({ name: category, name_ar: categoryArabic }),
      });
      if (response.ok) {
        const data = await response.json();
        setCategory("");
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
      const response = await fetch("/api/admin/news/category");
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
      const response = await fetch(`/api/admin/news/category?id=${id}`, {
        method: "PATCH",
        body: JSON.stringify({ name: category, name_ar: categoryArabic }),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        handleFetchCategory();
        setCategory("");
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
      const response = await fetch(`/api/admin/news/category?id=${id}`, {
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

  const handleDeleteNews = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/news?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        handleFetchNews();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error deleting news", error);
    }
  };

  const onSubmit = async (data: NewsPageProps) => {
    try {
      const response = await fetch(`/api/admin/news`, {
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

  const handleFetchNews = async () => {
    try {
      const response = await fetch("/api/admin/news");
      if (response.ok) {
        const data = await response.json();
        setValue("metaTitle", data.data.metaTitle);
        setValue("metaTitle_ar", data.data.metaTitle_ar);
        setValue("metaDescription", data.data.metaDescription);
        setValue("metaDescription_ar", data.data.metaDescription_ar);
        setValue("banner", data.data.banner);
        setValue("bannerAlt", data.data.bannerAlt);
        setValue("bannerAlt_ar", data.data.bannerAlt_ar);
        setValue("pageTitle", data.data.pageTitle);
        setValue("pageTitle_ar", data.data.pageTitle_ar);
        setNewsList(
          data.data.categories.flatMap(
            (category: { news: { _id: string }[] }) => category.news
          )
        );
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error fetching news details", error);
    }
  };

  useEffect(() => {
    handleFetchCategory();
    handleFetchNews();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-10">

        {/*English Version */}
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

          <AdminItemContainer>
            <Label main>SEO</Label>
            <div className="flex flex-col gap-2 p-5">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("metaTitle")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Description</Label>
                <Input
                  type="text"
                  placeholder=""
                  {...register("metaDescription")}
                />
              </div>
            </div>
          </AdminItemContainer>

        </div>


        {/*Arabic Version */}
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

          <AdminItemContainer>
            <Label main>SEO</Label>
            <div className="flex flex-col gap-2 p-5">
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder=""
                  {...register("metaTitle_ar")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-bold">Description</Label>
                <Input
                  type="text"
                  placeholder=""
                  {...register("metaDescription_ar")}
                />
              </div>
            </div>
          </AdminItemContainer>

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
              <div className="flex flex-col">
                <Label className="text-sm font-bold">Category</Label>
                <p className="text-red-500 font-light text-[14px]">
                  Deleting category will delete all news under that category
                </p>
              </div>
              <Dialog>
                <DialogTrigger
                  className="bg-primary text-white px-2 py-1 rounded-md"
                  onClick={() => { setCategory(""); setCategoryArabic("") }}
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
            <div className="flex flex-col">
              <Label className="text-sm font-bold">News</Label>
              <p className="text-[14px]">Count:{newsList?.length}</p>
            </div>
            <Button onClick={() => router.push("/admin/news/add")}>
              Add News
            </Button>
          </div>
          <div className="mt-2 flex flex-col gap-2 overflow-y-scroll h-[90%]">
            {newsList.map((item) => (
              <div
                className="flex justify-between border p-2 items-center rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                key={item._id}
              >
                <div className="text-[16px]">{item.title}</div>
                <div className="flex gap-5">
                  <MdEdit
                    onClick={() => router.push(`/admin/news/edit/${item._id}`)}
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
                          onClick={() => handleDeleteNews(item._id)}
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
    </div>
  );
}
