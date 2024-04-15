import mongoose from "mongoose";
import { deleteImage } from "../middlewares/imageUploadMiddleware.js";
const imageSchema= new mongoose.Schema({
    name:String,
    path:String
},{timestamps:true})
imageSchema.pre(/delete/i,async function(next){
    const imageToBeDeleted=await imageModel.findOne(this._conditions)
    await  deleteImage(imageToBeDeleted.name)
     next()
})
export const imageModel=mongoose.model('image',imageSchema)