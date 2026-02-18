import { NextRequest, NextResponse } from "next/server";
import Accreditation from "@/app/models/Accreditation";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";
export async function POST(req: NextRequest) {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        await connectDB()
        const formData = await req.formData()
        const accreditation = formData.get("accreditations") as string
        const actualAccreditation = JSON.parse(accreditation)
        const allAccreditation = await Accreditation.findOne({})
        allAccreditation.categories[1].accreditations = actualAccreditation
        await allAccreditation.save()
        session.commitTransaction()
        return NextResponse.json({ message: "Accreditations reordered successfully", success: true }, { status: 200 })
    } catch (error) {
        console.log(error)
        session.abortTransaction()
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 })
    }
    finally {
        session.endSession()
    }
}


