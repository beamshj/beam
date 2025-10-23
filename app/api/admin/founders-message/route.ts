import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import FoundersMessage from "@/app/models/FoundersMessage";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const foundersMessage = await FoundersMessage.findOne({});
        if (!foundersMessage) {
            return NextResponse.json({ message: "Founders Message not found" }, { status: 404 });
        }
        return NextResponse.json({data:foundersMessage,message:"Founders Message fetched successfully"}, { status: 200 });
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
        const foundersMessage = await FoundersMessage.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!foundersMessage) {
            return NextResponse.json({ message: "Founders Message not found" }, { status: 404 });
        }
        return NextResponse.json({data:foundersMessage,message:"Founders Message updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}