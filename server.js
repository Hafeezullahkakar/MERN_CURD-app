const express = require('express')
const app =  express()
const cors = require('cors')
const mongoose = require('mongoose')

// const bodyParser= require('body-parser')
const port = 3000;
//config
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
// app.use(bodyParser.urlencoded({extended:false}))

// connect to mongodb
const connect  = mongoose.connect("mongodb://localhost:27017/MERN_CURD" ,{
    useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify : false
}).then(()=>{console.log("connection Successful!")}).catch((err)=>{console.log(`Error is: ${err}`)})
// Schema
const itemSchema = {
    itemTitle: String,
    itemDescription: String
}
// Collection /model
const Curd_operation = mongoose.model('curd_operation' , itemSchema)

//Create operation
app.post('/newoperation', (req, res)=>{
    const newItem = new Curd_operation({
        itemTitle : req.body.itemTitle,
        itemDescription: req.body.itemDescription
    })
 newItem.save().then(()=>console.log (newItem)).catch((e)=> console.log(e));
})
//Read Operation
app.get('/newoperation', (req, res)=>{
    Curd_operation.find().then((operation)=>res.json(operation)).catch((err)=>res.status(400).json('Error is:'+err))
})
//Update Operation=
app.put('/newoperation/:id', (req, res)=>{
    const updateItem = {
        itemTitle: req.body.itemTitle,
        itemDescription : req.body.itemDescription
    }
    Curd_operation.findByIdAndUpdate({_id:req.params.id}, {$set : updateItem}, (req, res, err)=>{
        if(!err){
            console.log(`item with id is updated successfully!`)
        }
        else{
            console.log('Error ocurred is : '+ err)
        }
    })

})

//Delete Operation
app.delete("/newoperation/:id", (req, res)=>{
    const id = req.params.id
    Curd_operation.findByIdAndDelete({_id:id}, (req, res, err)=>{
        if(!err){
            console.log(`Item with id ${id} is deleted successfully...!`)
                }
                else{
                    console.log(err)
                }
    })
})

app.listen(port, ()=>{
    console.log(`You are being listent at port no : ${port}`)
})

