import mongoose from "mongoose"

const interestSchema = new mongoose.Schema({
    fullName:String,
    email:String,
    phone:String,
    findUs:String,
    selectSchool:String,
    selectGrade:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Interest = mongoose.models.Interest || mongoose.model("Interest",interestSchema)

export default Interest


