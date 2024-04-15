import mongoose from "mongoose";
import { imageModel } from "./imageModel.js";
export const genreSchema=new mongoose.Schema({
    name:{
       type: String,
       required:true
    },
    genreImage:{
        type:mongoose.Schema.ObjectId,
        ref:'image'
    },
},{timestamps:true})
genreSchema.pre(/find/i,function(next){
    this.populate('genreImage')
    next()
})
genreSchema.pre(/delete/i,async function(next){
    const genreTobeDeleted=await genreModel.findOne(this._conditions)
    const imageTobeDeleted=genreTobeDeleted.genreImage
    await imageModel.findByIdAndDelete(imageTobeDeleted)
    next()
})
export const genreModel= mongoose.model('genre',genreSchema)
