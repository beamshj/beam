import mongoose from "mongoose"

const interestSchema = new mongoose.Schema({
    fullName:String,
    email:String,
    phone:String,
    findUs:String,
    purpose:String,
    selectSchool:String,
    selectGrade:String,
    enrollmentYear:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Interest = mongoose.models.Interest || mongoose.model("Interest",interestSchema)

export default Interest


