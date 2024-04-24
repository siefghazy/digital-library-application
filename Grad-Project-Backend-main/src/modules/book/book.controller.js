import bookModel from "../../../DB/models/book.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import cloudinary from "../../utils/cloudinary.js";
import { nanoid } from "nanoid";
import APIFeatures from "../../utils/APIFeatures.js";

export const createBook = asyncHandler(async (req, res, next) => {
  const { title, description, isbn, author, url } = req.body;
  if (!req.files) {
    return next(new Error("Book images are required", { cause: 400 }));
  }
  const cloudFolder = nanoid();
  const{filename}=req.files.book[0]
  let images = [];
  for (const file of req.files.images) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path,
      {
        folder: `${process.env.FOLDER_CLOUD}/books/${cloudFolder}`,
      }
    );

    images.push({ id: public_id, url: secure_url });
  }
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.files.defaultImage[0].path,
    {
      folder: `${process.env.FOLDER_CLOUD}/books/${cloudFolder}`,
    }
  );
const book = await bookModel.create({
    ...req.body,
    cloudFolder,
    createdBy: req.user._id,
    defaultImage: { url: secure_url, id: public_id },
    images,
    url:filename,
  });
  return res.status(201).json({ success: true, result: book });
});

export const GetAllBooks = asyncHandler(async (req, res) => {
  // Execute query
  const features = new APIFeatures(bookModel.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const book = await features.query;

  // Send Response
  return res.status(200).json({
    status: "success",
    results: book.length,
    data: {
      book,
    },
  });
});

export const UpdateBook = asyncHandler(async (req, res) => {
  const book = await bookModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!book) {
    return next(new Error("Invalid book id", { cause: 400 }));
  }
  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
});

export const DeleteBook = asyncHandler(async (req, res) => {
  const book = await bookModel.findByIdAndDelete(req.params.id);
  if (!book) {
    return next(new Error("Invalid book id", { cause: 400 }));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const GetBook = asyncHandler(async (req, res) => {
  const book = await bookModel.findById(req.params.id);
  if (!book) {
    return next(new Error("Invalid book id", { cause: 400 }));
  }
  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
});

export const Search = asyncHandler(async (req, res) => {
  const search = req.query.search || "";
  let genre = req.query.genre || "All";

  const genreOptions = {};
  genre === "All"? (genre = genreOptions): (genre = req.query.genre.split(","));

  const features = new APIFeatures((await bookModel.find( {"$or": [{title: {$regex: search}}, {author: {$regex: search}}, {description: {$regex: search}}]}).where("genre")).includes([...genre]), req.query)
    .sort()
    .limitFields()
    .paginate();
  const books = await features.query

  res.status(200).json({
    status: "success",
    results: books.length,
    data: {
      books,
    },
  });
});
export const getRecent=asyncHandler(async(req,res,next)=>{
  const data= new APIFeatures( bookModel.find(),req.query).paginate()
  const book =await data.query
  book.map((Element)=>{
      const nowDate=new Date(Date.now()).toLocaleDateString()
      const createDate=Element.createdAt.toLocaleDateString()
      const startDate=new Date(createDate)
      const endDate=new Date(nowDate)
      const diff=(endDate-startDate)
      if(diff>14){
           const index= data.indexOf(Element)
           delete data[index]
      }
  })
 res.status(200).json(book)
})
