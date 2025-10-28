import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import Accreditation from "@/app/models/Accreditation";

export async function GET() {
    try {
        await connectDB();
        const accreditation = await Accreditation.findOne({});
        if (!accreditation) {
            return NextResponse.json({ message: "Accreditation not found" }, { status: 404 });
        }
        const categories = accreditation.categories;
        return NextResponse.json({data:categories,message:"Accreditation fetched successfully"}, { status: 200 });
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
        const category = await Accreditation.findOneAndUpdate({}, { $push: { categories: { name } } }, { upsert: true, new: true });
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
    const accreditation = await Accreditation.findOne();
    if (!accreditation) {
      return NextResponse.json({ message: "Accreditation not found" }, { status: 404 });
    }

    let categoryFound = false;

    accreditation.categories = accreditation.categories.map((category: { _id: string; name: string; accreditations: { _id: string; }[]; }) => {
      if (category._id.toString() === id) {
        categoryFound = true;

        // update the category name
        category.name = name;

        // update all accreditations inside this category
        category.accreditations = category.accreditations.map((a: { _id: string; }) => ({
          ...a,
          category: name,
        }));
      }
      return category;
    });

    if (!categoryFound) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    await accreditation.save();

    return NextResponse.json(
      { data: accreditation, message: "Category updated successfully" },
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
        const accreditation = await Accreditation.findOne({});
        if (!accreditation) {
            return NextResponse.json({ message: "Accreditation not found" }, { status: 404 });
        }
        accreditation.categories = accreditation.categories.filter((category: { _id: string; }) => category._id.toString() !== id);
        await accreditation.save();
        return NextResponse.json({data:accreditation,message:"Category deleted successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
