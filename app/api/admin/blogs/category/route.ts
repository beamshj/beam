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
    const blog = await Blog.findOne({});
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    blog.categories = blog.categories.map((category: any) => {
      if (category._id.toString() === id) {
        const updatedBlogs = category.blogs.map((b: any) => ({
          ...b,
          category: name,
        }));
        return { ...category, name, blogs: updatedBlogs };
      }
      return category;
    });

    await blog.save();

    return NextResponse.json(
      { data: blog, message: "Category updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
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
        blog.categories = blog.categories.filter((category: any) => category._id.toString() !== id);
        await blog.save();
        return NextResponse.json({data:blog,message:"Category deleted successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
