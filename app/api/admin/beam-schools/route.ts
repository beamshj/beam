import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import School from "@/app/models/School";

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const id = request.nextUrl.searchParams.get("id");
        const school = await School.findOne({}).populate("schools.location","name _id").populate("schools.category","name _id");
        if (!school) {
            return NextResponse.json({ message: "School not found" }, { status: 404 });
        }
        if(id){
            const foundSchool = school.schools.find((school: { _id: string; }) => school._id.toString() === id);
            if (!foundSchool) {
                return NextResponse.json({ message: "School not found" }, { status: 404 });
            }
            return NextResponse.json({data:foundSchool,message:"School fetched successfully"}, { status: 200 });
        }
        return NextResponse.json({data:school,message:"School fetched successfully"}, { status: 200 });
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
        if(id){
            const school = await School.findOne({});
            if (!school) {
                return NextResponse.json({ message: "School not found" }, { status: 404 });
            }
            school.schools = school.schools.map((school: { _id: string; }) => {
                if (school._id.toString() === id) {
                    return body;
                }
                return school;
            });
            await school.save();
            return NextResponse.json({data:school,message:"School updated successfully"}, { status: 200 });
        }
        const school = await School.findOneAndUpdate({},body,{upsert:true,new:true});
        if (!school) {
            return NextResponse.json({ message: "School not found" }, { status: 404 });
        }
        return NextResponse.json({data:school,message:"School updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const school = await School.findOne({});
        if (!school) {
            return NextResponse.json({ message: "School not found" }, { status: 404 });
        }
        school.schools.push(body);
        await school.save();
        return NextResponse.json({message:"School added successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
