const router=require('express').Router();
const Item=require('../../Models/Items')
router.get('/',async (req,res)=>{
    let x=await Item.find().sort({date:-1})
    res.json(x);
});
router.post('/',async (req,res)=>{
    const item=new Item({
        name:req.body.name
    });

    let x=await item.save();
    res.json(x);

});
router.delete('/:id',async (req,res)=>{
    try{
    const id=await Item.findById(req.params.id)
    Item.remove(id)
    res.json({sucess:true})
}
catch(err){
    res.status(404).json({sucess:false})
}
})
module.exports=router