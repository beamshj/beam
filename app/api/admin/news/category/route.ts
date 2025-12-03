import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import News from "@/app/models/News";

export async function GET() {
    try {
        await connectDB();
        const news = await News.findOne({});
        if (!news) {
            return NextResponse.json({ message: "News not found" }, { status: 404 });
        }
        const categories = news.categories;
        return NextResponse.json({data:categories,message:"News fetched successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const {name,name_ar} = await request.json();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const category = await News.findOneAndUpdate({}, { $push: { categories: { name,name_ar } } }, { upsert: true, new: true });
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
    const { name,name_ar } = await request.json();
    const id = request.nextUrl.searchParams.get("id");
    const isAdmin = await verifyAdmin(request);

    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const news = await News.findOne();
    if (!news) {
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    }

    let categoryFound = false;

    news.categories = news.categories.map((category: { _id: string; name: string;name_ar:string; news: { _id: string; }[]; }) => {
      if (category._id.toString() === id) {
        categoryFound = true;

        // update the category name
        category.name = name;
        category.name_ar = name_ar;

        // update all blogs inside this category
        category.news = category.news.map((b: { _id: string; }) => ({
          ...b,
          category: name,
          category_ar: name_ar,
        }));
      }
      return category;
    });

    if (!categoryFound) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    await news.save();

    return NextResponse.json(
      { data: news, message: "Category updated successfully" },
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
        const news = await News.findOne({});
        if (!news) {
            return NextResponse.json({ message: "News not found" }, { status: 404 });
        }
        news.categories = news.categories.filter((category: { _id: string; }) => category._id.toString() !== id);
        await news.save();
        return NextResponse.json({data:news,message:"Category deleted successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
