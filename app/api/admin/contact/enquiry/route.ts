import connectDB from "@/lib/mongodb"
import Enquiry from "@/app/models/Enquiry"
import { NextRequest, NextResponse } from "next/server"
import { verifyAdmin } from "@/lib/verifyAdmin"

export async function POST(req:NextRequest){
    try {
        await connectDB()
        const {firstName,lastName,phone,email,message,purpose} = await req.json()
        const enquiry = await Enquiry.create({firstName,lastName,phone,email,message,purpose})
        if(!enquiry){
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
        const enquiry = await Enquiry.find()
        if(!enquiry){
            return NextResponse.json({message:"No enquiry found"},{status:404})
        }
        return NextResponse.json({data:enquiry},{status:200})
    } catch (error) {
        console.log("Error fetching enquiry",error)
        return NextResponse.json({message:"Error fetching enquiry"},{status:500})
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
        const enquiry = await Enquiry.findByIdAndDelete(id)
        if(!enquiry){
            return NextResponse.json({message:"Enquiry not found"},{status:404})
        }
        return NextResponse.json({message:"Enquiry deleted successfully"},{status:200})
    } catch (error) {
        console.log("Error deleting enquiry",error)
        return NextResponse.json({message:"Error deleting enquiry"},{status:500})
    }
}




