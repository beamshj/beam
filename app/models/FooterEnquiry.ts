import mongoose from "mongoose"

const enquirySchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    message:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const FooterEnquiry = mongoose.models.FooterEnquiry || mongoose.model("FooterEnquiry",enquirySchema)

export default FooterEnquiry


