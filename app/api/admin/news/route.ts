import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import News from "@/app/models/News";

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const id = request.nextUrl.searchParams.get("id");
        const news = await News.findOne({});
        if (!news) {
            return NextResponse.json({ message: "News not found" }, { status: 404 });
        }
        if(id){
            const foundNews = news.categories.flatMap((category: { news: { _id: string; }; }) => category.news).find((news: { _id: string; }) => news._id.toString() === id);
            console.log(foundNews);
            if (!foundNews) {
                return NextResponse.json({ message: "News not found" }, { status: 404 });
            }
            return NextResponse.json({data:foundNews,message:"News fetched successfully"}, { status: 200 });
        }
        return NextResponse.json({data:news,message:"News fetched successfully"}, { status: 200 });
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
        if(id){
            const news = await News.findOne({});
            if (!news) {
                return NextResponse.json({ message: "News not found" }, { status: 404 });
            }
            const toUpdate = news.categories.flatMap((category: { news: { _id: string; }; }) => category.news).find((news: { _id: string; }) => news._id.toString() === id);
            if (!toUpdate) {
                return NextResponse.json({ message: "News not found" }, { status: 404 });
            }
            toUpdate.title = body.title;
            toUpdate.slug = body.slug;
            toUpdate.category = body.category;
            toUpdate.coverImage = body.coverImage;
            toUpdate.coverImageAlt = body.coverImageAlt;
            toUpdate.thumbnail = body.thumbnail;
            toUpdate.thumbnailAlt = body.thumbnailAlt;
            toUpdate.date = body.date;
            toUpdate.content = body.content;
            toUpdate.metaTitle = body.metaTitle;
            toUpdate.metaDescription = body.metaDescription;
            await news.save();
            return NextResponse.json({data:news,message:"News updated successfully"}, { status: 200 });
        }
        const news = await News.findOneAndUpdate({},body,{upsert:true,new:true});
        if (!news) {
            return NextResponse.json({ message: "News not found" }, { status: 404 });
        }
        return NextResponse.json({data:news,message:"News updated successfully"}, { status: 200 });
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
        const news = await News.findOne({});
        if (!news) {
            return NextResponse.json({ message: "News not found" }, { status: 404 });
        }
        const category = news.categories.find((category: { name: string; }) => category.name === body.category);
        console.log(category);
        if (!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }
        category.news.push(body);
        await news.save();
        return NextResponse.json({message:"News added successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
  try {
    const newsId = request.nextUrl.searchParams.get("id"); // ✅ this is the blog _id
    const isAdmin = await verifyAdmin(request);

    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const newsDoc = await News.findOne({});
    if (!newsDoc) {
      return NextResponse.json({ message: "News document not found" }, { status: 404 });
    }

    let newsDeleted = false;

    // Loop through categories and remove the blog with given id
    newsDoc.categories = newsDoc.categories.map((category: { news: { _id: string; }[]; }) => {
      const hasNews = category.news.some((n: { _id: string; }) => n._id.toString() === newsId);
      if (hasNews) {
        newsDeleted = true;
        return {
          ...category,
          news: category.news.filter((n: { _id: string; }) => n._id.toString() !== newsId),
        };
      }
      return category;
    });

    if (!newsDeleted) {
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    }

    await newsDoc.save();

    return NextResponse.json(
      { message: "News deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


