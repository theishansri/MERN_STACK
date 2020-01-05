const express=require('express')
const app=express();
const mongoose=require('mongoose');
const items=require('./routes/api/items')
const dotenv=require('dotenv')
app.use(express.json())
dotenv.config()
mongoose.connect(process.env.MONGO_CONNECTION,{dbName: process.env.DB_NAME,useUnifiedTopology: true,useNewUrlParser: true},()=>console.log('MongoDB connected'))
const port=process.env.PORT||5000
app.use('/api/items',items)
app.listen(port,()=>{
    console.log(`Server connected on port ${port}`)
})