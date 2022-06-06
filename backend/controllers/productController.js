const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors")



// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async(req, res, next) =>{

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
});





// Update Product --Admin
exports.updateProduct = catchAsyncErrors( async(req, res, next) =>{

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product not found",404))
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });


    res.status(200).json({
        success:true,
        product
    });
});

// Delete Product
exports.deleteProduct =catchAsyncErrors( async(req, res, next) =>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product not found",404))
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message:"Product Deleted successfully"
    })
});



// Get ALL products
exports.getAllProducts = catchAsyncErrors( async(req, res) =>{

    const products = await Product.find();

    res.status(200).json({
        success:true,
        products
    })
});

// Get product details
exports.getProductDetails = catchAsyncErrors( async(req, res, next) =>{
    const product = await Product.findById(req.params.id);

    if(!product){
        // next is basically the call-back function 
        return next(new ErrorHander("Product not found",404))
    }

    res.status(200).json({
        success:true,
        product 
    })
});