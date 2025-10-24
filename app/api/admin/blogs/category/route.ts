import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import Blog from "@/app/models/Blog";

export async function GET() {
    try {
        await connectDB();
        const blog = await Blog.findOne({});
        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }
        const categories = blog.categories;
        return NextResponse.json({data:categories,message:"Blog fetched successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const {name} = await request.json();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const category = await Blog.findOneAndUpdate({}, { $push: { categories: { name } } }, { upsert: true, new: true });
        if (!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }
        return NextResponse.json({data:category,message:"Category created successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
  try {
    const { name } = await request.json();
    const id = request.nextUrl.searchParams.get("id");
    const isAdmin = await verifyAdmin(request);

    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const blog = await Blog.findOne();
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    let categoryFound = false;

    blog.categories = blog.categories.map((category: { _id: string; name: string; blogs: { _id: string; }[]; }) => {
      if (category._id.toString() === id) {
        categoryFound = true;

        // update the category name
        category.name = name;

        // update all blogs inside this category
        category.blogs = category.blogs.map((b: { _id: string; }) => ({
          ...b,
          category: name,
        }));
      }
      return category;
    });

    if (!categoryFound) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    await blog.save();

    return NextResponse.json(
      { data: blog, message: "Category updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}



export async function DELETE(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const blog = await Blog.findOne({});
        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }
        blog.categories = blog.categories.filter((category: { _id: string; }) => category._id.toString() !== id);
        await blog.save();
        return NextResponse.json({data:blog,message:"Category deleted successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
