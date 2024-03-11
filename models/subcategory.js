const mongoose=require('mongoose');


const subcategoryschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'

    }
})


const Subcategory=mongoose.model('Subcategory',subcategoryschema);

module.exports=Subcategory;