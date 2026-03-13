"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Textarea } from "@/components/ui/textarea";
import AdminItemContainer from "@/app/components/Common/AdminItemContainer";
import { toast } from "sonner";
import TinyEditor from "@/app/components/TinyMce/TinyEditor";

interface StudentsAchievementsFormProps {
  metaTitle: string;
  metaDescription: string;
  metaTitle_ar: string;
  metaDescription_ar: string;
  banner: string;
  bannerAlt: string;
  bannerAlt_ar: string;
  pageTitle: string;
  pageTitle_ar: string;
  firstSection: {
    intro: string;
    intro_ar: string;
    secondIntro: string;
    secondIntro_ar: string;
    content: string;
    content_ar: string;
    image: string;
    imageAlt: string;
    imageAlt_ar: string;
  };
}

const StudentsAchievementsPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<StudentsAchievementsFormProps>();

  const handleAddStudentsAchievements = async (
    data: StudentsAchievementsFormProps,
  ) => {
    try {
      const response = await fetch(`/api/admin/students-achievements`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
      }
    } catch (error) {
      console.log("Error in adding students achievements", error);
    }
  };

  const fetchStudentsAchievementsData = async () => {
    try {
      const response = await fetch(`/api/admin/students-achievements`);
      if (response.ok) {
        const data = await response.json();
        setValue("banner", data.data.banner);
        setValue("bannerAlt", data.data.bannerAlt);
        setValue("bannerAlt_ar", data.data.bannerAlt_ar);
        setValue("pageTitle", data.data.pageTitle);
        setValue("pageTitle_ar", data.data.pageTitle_ar);
        setValue("metaTitle", data.data.metaTitle);
        setValue("metaTitle_ar", data.data.metaTitle_ar);
        setValue("metaDescription", data.data.metaDescription);
        setValue("metaDescription_ar", data.data.metaDescription_ar);
        setValue("firstSection", data.data.firstSection);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in fetching students achievements data", error);
    }
  };

  useEffect(() => {
    fetchStudentsAchievementsData();
  }, []);

  return (
    <form
      className="grid grid-cols-2 w-full gap-10"
      onSubmit={handleSubmit(handleAddStudentsAchievements)}
    >
      {/*English version*/}
      <div className="flex flex-col gap-5">
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
            <Label main>First Section</Label>
            <div className="p-5 rounded-md flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Introduction</Label>
                  <Textarea
                    placeholder="Introduction"
                    {...register("firstSection.intro")}
                  />
                  {errors.firstSection?.intro && (
                    <p className="text-red-500">
                      {errors.firstSection?.intro.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Second Introduction</Label>
                  <Textarea
                    placeholder="Second Introduction"
                    {...register("firstSection.secondIntro")}
                  />
                  {errors.firstSection?.secondIntro && (
                    <p className="text-red-500">
                      {errors.firstSection?.secondIntro.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Content</Label>
                  <Controller
                    name={`firstSection.content`}
                    control={control}
                    rules={{ required: "Content is required" }}
                    render={({ field }) => {
                      return (
                        <TinyEditor
                          setNewsContent={field.onChange}
                          newsContent={field.value}
                        />
                      );
                    }}
                  />
                  {errors.firstSection?.content && (
                    <p className="text-red-500">
                      {errors.firstSection?.content.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Image</Label>
                      <Controller
                        name={`firstSection.image`}
                        control={control}
                        rules={{ required: "Image is required" }}
                        render={({ field }) => (
                          <ImageUploader
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      {errors.firstSection?.image && (
                        <p className="text-red-500">
                          {errors.firstSection?.image.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="font-bold">Alt Tag</Label>
                      <Input
                        type="text"
                        placeholder="Alt Tag"
                        {...register("firstSection.imageAlt")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AdminItemContainer>

          <div className="flex flex-col gap-2">
            <Label className="pl-3 font-bold">Meta Title</Label>
            <Input
              type="text"
              placeholder="Meta Title"
              {...register("metaTitle")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="pl-3 font-bold">Meta Description</Label>
            <Input
              type="text"
              placeholder="Meta Description"
              {...register("metaDescription")}
            />
          </div>
        </div>
      </div>

      {/*Arabic version*/}
      <div className="flex flex-col gap-5">
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
            <Label main>First Section</Label>
            <div className="p-5 rounded-md flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Introduction</Label>
                  <Textarea
                    placeholder="Introduction"
                    {...register("firstSection.intro_ar")}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Second Introduction</Label>
                  <Textarea
                    placeholder="Second Introduction"
                    {...register("firstSection.secondIntro_ar")}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="font-bold">Content</Label>
                  <Controller
                    name={`firstSection.content_ar`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TinyEditor
                          setNewsContent={field.onChange}
                          newsContent={field.value}
                        />
                      );
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <Label className="font-bold">Image</Label>
                      <Controller
                        name={`firstSection.image`}
                        control={control}
                        rules={{ required: "Image is required" }}
                        render={({ field }) => (
                          <ImageUploader
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      {errors.firstSection?.image && (
                        <p className="text-red-500">
                          {errors.firstSection?.image.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="font-bold">Alt Tag</Label>
                      <Input
                        type="text"
                        placeholder="Alt Tag"
                        {...register("firstSection.imageAlt_ar")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AdminItemContainer>

          <div className="flex flex-col gap-2">
            <Label className="pl-3 font-bold">Meta Title</Label>
            <Input
              type="text"
              placeholder="Meta Title"
              {...register("metaTitle")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="pl-3 font-bold">Meta Description</Label>
            <Input
              type="text"
              placeholder="Meta Description"
              {...register("metaDescription")}
            />
          </div>
        </div>
      </div>

      <div className="flex col-span-2">
        <Button
          type="submit"
          className="cursor-pointer text-white text-[16px] w-full"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default StudentsAchievementsPage;
