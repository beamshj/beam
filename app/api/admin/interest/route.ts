import connectDB from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"
import { verifyAdmin } from "@/lib/verifyAdmin"
import Interest from "@/app/models/Interest"

export async function POST(req:NextRequest){
    try {
        await connectDB()
        const {fullName,email,phone,findUs,selectSchool,selectGrade} = await req.json()
        const interest = await Interest.create({fullName,email,phone,findUs,selectSchool,selectGrade})
        if(!interest){
            return NextResponse.json({message:"Error sending message",success:false},{status:500})
        }
        return NextResponse.json({message:"Thank you, we will get back to you soon",success:true},{status:200})
    } catch (error) {
        console.log("Error sending message",error)
        return NextResponse.json({message:"Error sending message",success:false},{status:500})
    }
}

export async function GET(){
    try {
        await connectDB()
        const interest = await Interest.find()
        if(!interest){
            return NextResponse.json({message:"No interest found"},{status:404})
        }
        return NextResponse.json({data:interest},{status:200})
    } catch (error) {
        console.log("Error fetching interest",error)
        return NextResponse.json({message:"Error fetching interest"},{status:500})
    }
}

export async function DELETE(req:NextRequest){
    try {
        await connectDB()
        const isAdmin = await verifyAdmin(req);
        if(!isAdmin){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const {id} = await req.json()
        const interest = await Interest.findByIdAndDelete(id)
        if(!interest){
            return NextResponse.json({message:"Interest not found"},{status:404})
        }
        return NextResponse.json({message:"Interest deleted successfully"},{status:200})
    } catch (error) {
        console.log("Error deleting interest",error)
        return NextResponse.json({message:"Error deleting interest"},{status:500})
    }
}




