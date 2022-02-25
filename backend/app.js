const express = require('express')
const app = express();
const Cors = require('cors')
const port = 8000;
require('./db/dbcon')
const User = require('./model/User')
const Product = require('./model/Product')


app.use(express.json())
app.use(Cors())

app.post('/register', async (req,res)=>{
    
    const insert = new User(req.body);
    const data = await insert.save()
    console.log(data)
    res.send(data)


})

app.post('/login', async (req,res)=>{
    // console.log("Get Method Calling");
    const email =req.body.email;
    const password =req.body.password;

    const read = await User.findOne({email:email});
    // const data = await insert.save()
    if(read.password === password){
        console.log("Login Successfull")
        res.send("Login Successfull")
    }else{
        console.log("Invalid Email")
        res.send("Invalid Email")
    }


})


app.post('/add_product', async (req,res)=>{
    const insert = new Product(req.body);
    const data = await insert.save()
    console.log(data)
    res.send(data)
})

app.get('/get_product', async (req,res)=>{
    const data = await Product.find()
    console.log(data)
    res.send(data)
})

app.get('/product/:id', async (req,res)=>{
    const id = req.params.id;
    const data = await Product.findOne({_id:id})
    console.log(data)
    res.send(data)
})


app.delete('/delete_product/:id', async (req,res)=>{
    const id = req.params.id;
    const data = await Product.findByIdAndDelete({_id:id})
    console.log(data)
    res.send(data)
})

app.put('/update_product/:id', async (req,res)=>{
    const id = req.params.id;
    const data = await Product.findByIdAndUpdate({_id:id},req.body,{new:true})
    console.log(data)
    res.send(data)
})

app.get('/search_product/:value', async (req,res)=>{
    const value = req.params.value;
    const data = await Product.find({
        "$or":[
            {name:{$regex:value}},
            {category:{$regex:value}},
            {price:{$regex:value}},
            {company:{$regex:value}},
        ]
    })
    console.log(data)
    res.send(data)
})

// app.patch('/update_product/:id', async (req,res)=>{
//     const id = req.params.id;
//     const data = await Product.findByIdAndUpdate({_id:id},req.body,{new:true})
//     console.log(data)
//     res.send(data)
// })

app.listen(port,()=>{
    console.log("Server Is running "+port)
})