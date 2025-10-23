import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ManagersMessage from "@/app/models/ManagersMessage";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const managersMessage = await ManagersMessage.findOne({});
        if (!managersMessage) {
            return NextResponse.json({ message: "Managers Message not found" }, { status: 404 });
        }
        return NextResponse.json({data:managersMessage,message:"Managers Message fetched successfully"}, { status: 200 });
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
        const managersMessage = await ManagersMessage.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!managersMessage) {
            return NextResponse.json({ message: "Managers Message not found" }, { status: 404 });
        }
        return NextResponse.json({data:managersMessage,message:"Managers Message updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}