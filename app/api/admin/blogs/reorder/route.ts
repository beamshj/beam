import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import Blog from "@/app/models/Blog";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  const session = await mongoose.startSession();

  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    session.startTransaction();

    const blog = await Blog.findOne({});
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const blogs = formData.get("blogs") as string;
    const reorderedIds: string[] = JSON.parse(blogs); // now it's an array of IDs

    const category = blog.categories[0];
    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    // reorder category.blogs according to reorderedIds
    const reorderedBlogs = reorderedIds
      .map(id => category.blogs.find((b: { _id: string; }) => b._id.toString() === id))
      .filter(Boolean); // remove any not found

    // assign new order
    category.blogs = reorderedBlogs;
    await blog.save({ session });

    await session.commitTransaction();
    return NextResponse.json({ success: true, message: "Blog reordered successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  } finally {
    session.endSession();
  }
}
