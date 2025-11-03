"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ui/image-uploader";
import AdminItemContainer from "@/app/components/Common/AdminItemContainer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";
import { RiAiGenerateText } from "react-icons/ri";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import TinyEditor from "../TinyMce/TinyEditor";

interface NewsFormProps {
  title: string;
  slug: string;
  category: string;
  popularNews: string;
  coverImage: string;
  coverImageAlt: string;
  thumbnail: string;
  thumbnailAlt: string;
  date: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
}

const NewsFormPage = ({ editMode }: { editMode?: boolean }) => {
  const { id } = useParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm<NewsFormProps>();
  const [categoryList, setCategoryList] = useState<
    { _id: string; name: string }[]
  >([]);

  const handleAddNews = async (data: NewsFormProps) => {
    try {
      const response = await fetch(
        editMode ? `/api/admin/news?id=${id}` : `/api/admin/news`,
        {
          method: editMode ? "PATCH" : "POST",
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        router.push("/admin/news");
      }
    } catch (error) {
      console.log("Error in adding news", error);
    }
  };

  const fetchNewsData = async () => {
    try {
      const response = await fetch(`/api/admin/news?id=${id}`);
      if (response.ok) {
        const data = await response.json();
        // console.log(data, "his");
        setValue("title", data.data.title);
        setValue("slug", data.data.slug);
        setValue("category", data.data.category);
        setValue("popularNews", data.data.popularNews);
        setValue("coverImage", data.data.coverImage);
        setValue("coverImageAlt", data.data.coverImageAlt);
        setValue("thumbnail", data.data.thumbnail);
        setValue("thumbnailAlt", data.data.thumbnailAlt);
        const isoDate = new Date(data.data.date).toISOString().split("T")[0];
        setValue("date", isoDate);
        setValue("content", data.data.content);
        setValue("metaTitle", data.data.metaTitle);
        setValue("metaDescription", data.data.metaDescription);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log("Error in fetching news data", error);
    }
  };

  const handleFetchCategory = async () => {
    try {
      const response = await fetch("/api/admin/news/category");
      if (response.ok) {
        const data = await response.json();
        setCategoryList(data.data);
      }
    } catch (error) {
      console.log("Error fetching category", error);
    }
  };

  useEffect(() => {
    if (editMode) {
      handleFetchCategory().then(() => fetchNewsData());
    } else {
      handleFetchCategory();
    }
  }, []);

  useEffect(() => {
    if (watch("slug") === undefined) return;
    const slug = watch("slug").replace(/\s+/g, "-");
    setValue("slug", slug);
  }, [watch("slug")]);

  const handleAutoGenerate = () => {
    const name = watch("title");
    if (!name) return;
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""); // remove leading/trailing dashes
    setValue("slug", slug);
  };

  return (
    <div className="flex flex-col gap-5">
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleAddNews)}
      >
        <AdminItemContainer>
          <div className="p-5 rounded-md flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Title</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  {...register("title", {
                    required: "Title is required",
                  })}
                />
                {errors.title && (
                  <p className="text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div>
                <Label className="flex gap-2 items-center mb-1">
                  Slug
                  <div
                    className="flex gap-2 items-center bg-green-600 text-white p-1 rounded-md cursor-pointer w-fit"
                    onClick={handleAutoGenerate}
                  >
                    <p>Auto Generate</p>
                    <RiAiGenerateText />
                  </div>
                </Label>
                <Input
                  type="text"
                  placeholder="Slug"
                  {...register("slug", {
                    required: "Slug is required",
                    pattern: {
                      value: /^[a-z0-9]+(-[a-z0-9]+)*$/,
                      message:
                        "Slug must contain only lowercase letters, numbers, and hyphens (no spaces)",
                    },
                  })}
                />
                {errors.slug && (
                  <p className="text-red-500">{errors.slug.message}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="">Category</Label>
              <Controller
                name={`category`}
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue=""
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryList.map((item, index) => (
                        <SelectItem key={index} value={item.name}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label className="">Popular News</Label>
              <Controller
                name={`popularNews`}
                control={control}
                rules={{ required: "Popular News is required" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue=""
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Popular News" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.popularNews && (
                <p className="text-red-500">{errors.popularNews.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Cover Image</Label>
                <Controller
                  name="coverImage"
                  control={control}
                  rules={{ required: "Image is required" }}
                  render={({ field }) => (
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.coverImage && (
                  <p className="text-red-500">{errors.coverImage.message}</p>
                )}
                <Label className="font-bold">Alt Tag</Label>
                <Input
                  type="text"
                  placeholder="Alt Tag"
                  {...register("coverImageAlt")}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="font-bold">Thumbnail</Label>
                <Controller
                  name="thumbnail"
                  control={control}
                  rules={{ required: "Image is required" }}
                  render={({ field }) => (
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.thumbnail && (
                  <p className="text-red-500">{errors.thumbnail.message}</p>
                )}
                <Label className="font-bold">Alt Tag</Label>
                <Input
                  type="text"
                  placeholder="Alt Tag"
                  {...register("thumbnailAlt")}
                />
              </div>
            </div>

            <div>
              <Label className="">Date</Label>
              <Input
                type="date"
                placeholder="Date"
                max={new Date().toISOString().split("T")[0]}
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && (
                <p className="text-red-500">{errors.date.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label className="">Content</Label>
              <Controller
                name="content"
                control={control}
                rules={{ required: "Content is required" }}
                render={({ field }) => {
                  return (
                    <TinyEditor
                      newsContent={field.value}
                      setNewsContent={field.onChange}
                    />
                  );
                }}
              />
              {errors.content && (
                <p className="text-red-500">{errors.content.message}</p>
              )}
            </div>

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
        </AdminItemContainer>

        <div className="flex">
          <Button
            type="submit"
            className="cursor-pointer text-white text-[16px] w-full"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewsFormPage;
