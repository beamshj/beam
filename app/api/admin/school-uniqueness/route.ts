import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SchoolUniqueness from "@/app/models/SchoolUniqueness";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const schoolUniqueness = await SchoolUniqueness.findOne({});
        if (!schoolUniqueness) {
            return NextResponse.json({ message: "School Uniqueness not found" }, { status: 404 });
        }
        return NextResponse.json({data:schoolUniqueness,message:"School Uniqueness fetched successfully"}, { status: 200 });
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
        const schoolUniqueness = await SchoolUniqueness.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!schoolUniqueness) {
            return NextResponse.json({ message: "School Uniqueness not found" }, { status: 404 });
        }
        return NextResponse.json({data:schoolUniqueness,message:"School Uniqueness updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}