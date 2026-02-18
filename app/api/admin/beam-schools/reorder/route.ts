import { NextRequest, NextResponse } from "next/server";
import School from "@/app/models/School";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";
export async function POST(req: NextRequest) {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        await connectDB()
        const formData = await req.formData()
        const schools = formData.get("schools") as string
        const actualSchools = JSON.parse(schools)
        const allSchools = await School.findOne({})
        allSchools.schools = actualSchools
        await allSchools.save()
        session.commitTransaction()
        return NextResponse.json({ message: "Schools reordered successfully", success: true }, { status: 200 })
    } catch (error) {
        console.log(error)
        session.abortTransaction()
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 })
    }
    finally {
        session.endSession()
    }
}


