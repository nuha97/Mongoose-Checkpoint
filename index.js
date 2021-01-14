const mongoose = require("mongoose");
const express = require("express");
//const app = express();

//enviroment variables
require('dotenv').config();

//database connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{
    useNewUrlParser : true,
   
    useUnifiedTopology:true
});

//check database connection
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("connected to database succefully");
})

//creation of person schema
let personSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age : Number,
    favoriteFoods : Array
})
// creation of person model 
let Model = mongoose.model("model",personSchema,"person");

//---------------------------------------------------------------------------------//
//create and save record of a model
let person = new Model({
    name : "Nuha Haman",
    age:24,
    favoriteFoods : ["Pizza","Burger"]
});

// person.save(function (err,doc){
//     if(err) return console.log(err);
//     console.log("Document inserted succefully");
//     return console.log(doc)
// })

//---------------------------------------------------------------------------------//

// create many records with model.create()
let arrayOfPeople = [
    {name:'Hend', age:25 , favoriteFoods:['meat','chicken','food']},
    {name:'Ali', age:29 , favoriteFoods:['fruits','vegtables']},
    {name:'Ahmed', age:34 , favoriteFoods:['everything']}]

    // Model.create(arrayOfPeople,function (err,doc){
    //         if(err) return console.log(err);
    //         console.log("Document inserted succefully");
    //         return console.log(doc)
    //     })

//---------------------------------------------------------------------------------//
//fetch Document with a specific name (model.find())
    // Model.find({ name : "Ali"},function (err,doc){
    //             if(err) return console.log(err);
    //             console.log("fetch specific data succefully");
    //             console.log(doc)
    //         })

//---------------------------------------------------------------------------------//
//fetch Document with a specific favoritefood (model.findOne())
// Model.findOne({ favoriteFoods : "meat"},function (err,doc){
//     if(err) return console.log(err);
//     console.log("fetch one record data succefully");
//     console.log(doc)
// })

//---------------------------------------------------------------------------------//
//fetch Document with a specific id (model.findOne())
//let id = '5ffedc01543467af380d069b'
// Model.findById(id,function (err,doc){
//     if(err) return console.log(err);
//     console.log("fetch one record data by id  succefully");
//     console.log(doc)
// })

//---------------------------------------------------------------------------------//
//classic update Document with a specific id (find,edit,save)

    // var foodToAdd = 'hamburger';
    // Model.findById("5ffedc01543467af380d069a", function(err, data) {
    //   data.favoriteFoods.push(foodToAdd);
    //   data.save(function(err){
    //     if (err) {
    //       console.log("there's an error");
    //       console.log(err);
    //     }
    //   });
      
    //   if (err) {
    //     console.log(err);
    //   }
    //   else {
    //    console.log(data);
    //   }
    // });
  

//---------------------------------------------------------------------------------//
//perform new update on document (findOneAndUpdtae)
// Model.findOneAndUpdate({ name : "Ali"},{age:20},{new:true},function (err,doc){
//     if(err) return console.log(err);
//     console.log("update age by 20  succefully");
//     return console.log(doc)
// })

//---------------------------------------------------------------------------------//
//Delete One Document Using (findByIdAndRemove)
// let id = '5ffedc01543467af380d069b'
// Model.findByIdAndRemove(id,function (err,doc){
//     if(err) return console.log(err);
//     console.log("Document deleted succefully");
//     return console.log(doc)
// })

//-------------------------------------------------------------------------------//
//Delete many Documents Using (remove)
// function delManyDoc (done){
//     Model.remove({ name: "Ahmed" },function (err,doc){
//         // if(err) return console.log(err);
//         // console.log("Document inserted succefully");
//         // return console.log(doc)
//         if(err) done(err);
//         return done(null, data);
//     })    
// }
// console.log(delManyDoc);
 
//-------------------------------------------------------------------------------//
//Chain Search Query Helpers to Narrow Search Results
    Model.find({ favoriteFoods : "meat"}).sort({name : "desc"}).limit(2).select("-age").exec((err, data) => {
    if(err) console.log(err);
 
    console.log("show data succefully");
    console.log(data);
 })
