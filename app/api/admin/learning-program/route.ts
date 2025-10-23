import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import LearningProgram from "@/app/models/LearningProgram";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const learningProgram = await LearningProgram.findOne({});
        if (!learningProgram) {
            return NextResponse.json({ message: "Learning Program not found" }, { status: 404 });
        }
        return NextResponse.json({data:learningProgram,message:"Learning Program fetched successfully"}, { status: 200 });
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
        const learningProgram = await LearningProgram.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!learningProgram) {
            return NextResponse.json({ message: "Learning Program not found" }, { status: 404 });
        }
        return NextResponse.json({data:learningProgram,message:"Learning Program updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}