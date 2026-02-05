import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Alumni from "@/app/models/Alumni";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const alumni = await Alumni.findOne({});
        if (!alumni) {
            return NextResponse.json({ message: "Alumni not found" }, { status: 404 });
        }
        return NextResponse.json({ data: alumni, message: "Alumni fetched successfully" }, { status: 200 });
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
        const alumni = await Alumni.findOneAndUpdate({}, body, { upsert: true, new: true });
        if (!alumni) {
            return NextResponse.json({ message: "Alumni not found" }, { status: 404 });
        }
        return NextResponse.json({ data: alumni, message: "Alumni updated successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}