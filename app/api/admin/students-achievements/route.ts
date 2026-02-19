import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import StudentsAchievements from "@/app/models/StudentsAchievemnets";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET() {
  try {
    await connectDB();
    const schoolAchievements = await StudentsAchievements.findOne({});
    if (!schoolAchievements) {
      return NextResponse.json(
        { message: "Students Achievements not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        data: schoolAchievements,
        message: "Students Achievements fetched successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const schoolAchievements = await StudentsAchievements.findOneAndUpdate(
      {},
      body,
      { upsert: true, new: true },
    );
    if (!schoolAchievements) {
      return NextResponse.json(
        { message: "Students Achievements not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        data: schoolAchievements,
        message: "Students Achievements updated successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
