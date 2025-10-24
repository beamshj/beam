import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Testimonials from "@/app/models/Testimonials";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const testimonials = await Testimonials.findOne({});
        if (!testimonials) {
            return NextResponse.json({ message: "Testimonials not found" }, { status: 404 });
        }
        return NextResponse.json({data:testimonials,message:"Testimonials fetched successfully"}, { status: 200 });
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
        const testimonials = await Testimonials.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!testimonials) {
            return NextResponse.json({ message: "Testimonials not found" }, { status: 404 });
        }
        return NextResponse.json({data:testimonials,message:"Testimonials updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}