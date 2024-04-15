import {v2 as cloudinary} from 'cloudinary';
import asyncHandler from '../../../utils/asyncHandler.js';
import { imageModel } from '../../../../DB/models/imageModel.js';
export const upload=({modelImage})=>{
    return asyncHandler(async(req,res,next)=>{
        if(!req.file)return next()
        const{path}=req.file
        const{public_id,secure_url}=await cloudinary.uploader.upload(path);
        const{_id:image_ID}=await imageModel.create({name:public_id,path:secure_url})
        req.body[modelImage]=image_ID
        next()
    })
}
export const deleteImage=async(image_name)=>{
    await cloudinary.uploader.destroy(image_name)
}