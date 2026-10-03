import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        min: 10,
        max: 50
    },
    description:{
        type:String,
        required:true,
        min: 20,
        max: 100
    },
    category:{
        type:String,
        required:true,
        lowercase:true,
        enum:["electronic", "fashion", "home", "books", "toys"]
    },
    price:{
        amount:{
            type:Number,
            required:true,
            min:0
        },
        currency:{
            type:String,
            default:"INR"
        }
    },
    images:{
        type:[{
            type:String
        }],
        validate:{
            validator: images => images.length <= 5,
            message: "A product can have at most 5 images"
        }
    },
    stock:{
        type:Number,
        required:true,
        min:0,
        default:0
    }
})


const productModel = mongoose.model("products",productSchema)

export default productModel