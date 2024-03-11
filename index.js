const express=require('express');
const mongoose=require('mongoose');
const app=express();
const Category=require('./models/category');
const SubCategory=require('./models/subcategory');
const PORT=5000;

app.use(express.json());


mongoose.connect('mongodb://localhost:27017/itemsdb',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}
)



app.post('/categories',async(req,res)=>{
  
    const category=new Category(req.body);
    await category.save();

    res.status(201).json(category);

})

app.get('/categories',async(req,res)=>{
    const categories=await Category.find();
    res.json(categories);

})

app.post('/subcategories',async(req,res)=>{

    const subcategory=new SubCategory(req.body)
    await subcategory.save();

    res.status(201).json(subcategory);

})

app.get('/subcategories',async(req,res)=>{

  const subcategories=await SubCategory.find().populate('category');
  res.json(subcategories);

})


app.put('/categories/:categoryId',async(req,res)=>{

    const category=await Category.findByIdAndUpdate(
        req.params.categoryId,
        req.body,
        {new:true}
    )

    if(!category){
        return;
    }

    res.json(category);

})


app.delete('/categories/:categoryId',async(req,res)=>{

    const category=await Category.findByIdAndDelete(
        req.params.categoryId
    )

    if(!category){
        return;
    }

    res.json({message:'category deleted successfully'});

})


app.put('/subcategories/:subCategoryId',async(req,res)=>{

    const subCategory=await SubCategory.findByIdAndUpdate(
        req.params.subCategoryId,
        req.body,
        {new:true}
    )

    if(!subCategory){
        return;
    }

    res.json(subCategory);

})


app.delete('/subcategories/:subCategoryId',async(req,res)=>{

    const subCategory=await SubCategory.findByIdAndDelete(
        req.params.subCategoryId
    )

    if(!subCategory){
        return;
    }

    res.json({message:'subcategory deleted successfully'});

})













app.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`);
})