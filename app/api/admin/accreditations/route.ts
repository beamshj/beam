import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import Accreditation from "@/app/models/Accreditation";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const id = request.nextUrl.searchParams.get("id");
    const accreditation = await Accreditation.findOne({});
    if (!accreditation) {
      return NextResponse.json({ message: "Accreditation not found" }, { status: 404 });
    }
    if (id) {
      const foundAccreditation = accreditation.categories.flatMap((category: { accreditations: { _id: string; }; }) => category.accreditations).find((accreditation: { _id: string; }) => accreditation._id.toString() === id);
      if (!foundAccreditation) {
        return NextResponse.json({ message: "Accreditation not found" }, { status: 404 });
      }
      return NextResponse.json({ data: foundAccreditation, message: "Accreditation fetched successfully" }, { status: 200 });
    }
    return NextResponse.json({ data: accreditation, message: "Accreditation fetched successfully" }, { status: 200 });
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
    if (id) {
      const accreditation = await Accreditation.findOne({});
      if (!accreditation) {
        return NextResponse.json({ message: "Accreditation not found" }, { status: 404 });
      }
      const toUpdate = accreditation.categories.flatMap((category: { accreditations: { _id: string; }; }) => category.accreditations).find((accreditation: { _id: string; }) => accreditation._id.toString() === id);
      if (!toUpdate) {
        return NextResponse.json({ message: "Accreditation not found" }, { status: 404 });
      }
      toUpdate.title = body.title;
      toUpdate.title_ar = body.title_ar;
      toUpdate.description = body.description;
      toUpdate.description_ar = body.description_ar;
      toUpdate.image = body.image;
      toUpdate.imageAlt = body.imageAlt;
      toUpdate.imageAlt_ar = body.imageAlt_ar;
      toUpdate.category = body.category;
      toUpdate.category_ar = body.category_ar;
      await accreditation.save();
      return NextResponse.json({ data: accreditation, message: "Accreditation updated successfully" }, { status: 200 });
    }
    const accreditation = await Accreditation.findOneAndUpdate({}, body, { upsert: true, new: true });
    if (!accreditation) {
      return NextResponse.json({ message: "Accreditation not found" }, { status: 404 });
    }
    return NextResponse.json({ data: accreditation, message: "Accreditation updated successfully" }, { status: 200 });
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
    const accreditation = await Accreditation.findOne({});
    if (!accreditation) {
      return NextResponse.json({ message: "Accreditation not found" }, { status: 404 });
    }
    const category = accreditation.categories.find((category: { name: string; }) => category.name === body.category);
    console.log(category);
    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }
    if (category.accreditations === null) {
      category.accreditations = [];
    }
    category.accreditations.push(body);
    await accreditation.save();
    return NextResponse.json({ message: "Accreditation added successfully" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const accreditationId = request.nextUrl.searchParams.get("id"); // ✅ this is the blog _id
    const isAdmin = await verifyAdmin(request);

    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const accreditationDoc = await Accreditation.findOne({});
    if (!accreditationDoc) {
      return NextResponse.json({ message: "Accreditation document not found" }, { status: 404 });
    }

    let accreditationDeleted = false;

    // Loop through categories and remove the blog with given id
    accreditationDoc.categories = accreditationDoc.categories.map((category: { accreditations: { _id: string; }[]; }) => {
      const hasBlog = category.accreditations.some((b: { _id: string; }) => b._id.toString() === accreditationId);
      if (hasBlog) {
        accreditationDeleted = true;
        return {
          ...category,
          accreditations: category.accreditations.filter((b: { _id: string; }) => b._id.toString() !== accreditationId),
        };
      }
      return category;
    });

    if (!accreditationDeleted) {
      return NextResponse.json({ message: "Accreditation not found" }, { status: 404 });
    }

    await accreditationDoc.save();

    return NextResponse.json(
      { message: "Accreditation deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting accreditation:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


