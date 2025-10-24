import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import LeadershipTeam from "@/app/models/LeadershipTeam";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const leadershipTeam = await LeadershipTeam.findOne({});
        if (!leadershipTeam) {
            return NextResponse.json({ message: "Leadership Team not found" }, { status: 404 });
        }
        return NextResponse.json({data:leadershipTeam,message:"Leadership Team fetched successfully"}, { status: 200 });
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
        const leadershipTeam = await LeadershipTeam.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!leadershipTeam) {
            return NextResponse.json({ message: "Leadership Team not found" }, { status: 404 });
        }
        return NextResponse.json({data:leadershipTeam,message:"Leadership Team updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}