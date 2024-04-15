import asyncHandler from "../../../utils/asyncHandler.js";
import { genreModel } from '../../../../DB/models/genreModel.js'
import { imageModel } from "../../../../DB/models/imageModel.js";
export const getAllGenres=asyncHandler(async(req,res,next)=>{
    const data =await genreModel.find()
    res.status(200).json(data)
})
export const addGenre=asyncHandler(async(req,res,next)=>{
    await genreModel.create(req.body)
    res.status(200).json({message:"genre add succ.."})
})
export  const deleteGenre=asyncHandler(async(req,res,next)=>{
    const{id}=req.params
    await genreModel.findByIdAndDelete(id)
    res.status(200).json({message:"genre deleted"})
})
export const updateGenre=asyncHandler(async(req,res,next)=>{
    const{id}=req.params
    const {genreImage}=await genreModel.findById(id)
    if(req.file){await imageModel.findByIdAndDelete(genreImage)}
    await genreModel.findByIdAndUpdate(id,req.body)
    res.status(200).json({message:"genre updated succ.."})
})