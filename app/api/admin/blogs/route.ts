import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import Blog from "@/app/models/Blog";

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const id = request.nextUrl.searchParams.get("id");
        const blog = await Blog.findOne({});
        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }
        if(id){
            const foundBlog = blog.categories.flatMap((category: { blogs: any; }) => category.blogs).find((blog: { _id: string; }) => blog._id.toString() === id);
            console.log(foundBlog);
            if (!foundBlog) {
                return NextResponse.json({ message: "Blog not found" }, { status: 404 });
            }
            return NextResponse.json({data:foundBlog,message:"Blog fetched successfully"}, { status: 200 });
        }
        return NextResponse.json({data:blog,message:"Blog fetched successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const id = request.nextUrl.searchParams.get("id");
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const blog = await Blog.findOneAndUpdate({},body,{upsert:true,new:true});
        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }
        return NextResponse.json({data:blog,message:"Blog updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    console.log("POST");
    try {
        const body = await request.json();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const blog = await Blog.findOne({});
        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }
        const category = blog.categories.find((category: { _id: string; }) => category._id.toString() === body.category);
        console.log(category);
        if (!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }
        category.blogs.push(body);
        await blog.save();
        return NextResponse.json({message:"Blog added successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
  try {
    const blogId = request.nextUrl.searchParams.get("id"); // ✅ this is the blog _id
    const isAdmin = await verifyAdmin(request);

    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const blogDoc = await Blog.findOne({});
    if (!blogDoc) {
      return NextResponse.json({ message: "Blog document not found" }, { status: 404 });
    }

    let blogDeleted = false;

    // Loop through categories and remove the blog with given id
    blogDoc.categories = blogDoc.categories.map((category: any) => {
      const hasBlog = category.blogs.some((b: any) => b._id.toString() === blogId);
      if (hasBlog) {
        blogDeleted = true;
        return {
          ...category,
          blogs: category.blogs.filter((b: any) => b._id.toString() !== blogId),
        };
      }
      return category;
    });

    if (!blogDeleted) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    await blogDoc.save();

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


