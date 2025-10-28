import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ScholarshipPrograms from "@/app/models/ScholarshipPrograms";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const schoolAchievements = await ScholarshipPrograms.findOne({});
        if (!schoolAchievements) {
            return NextResponse.json({ message: "Scholarship Programs not found" }, { status: 404 });
        }
        return NextResponse.json({data:schoolAchievements,message:"Scholarship Programs fetched successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
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
        const scholarshipPrograms = await ScholarshipPrograms.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!scholarshipPrograms) {
            return NextResponse.json({ message: "Scholarship Programs not found" }, { status: 404 });
        }
        return NextResponse.json({data:scholarshipPrograms,message:"Scholarship Programs updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}