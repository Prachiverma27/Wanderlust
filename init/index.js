const mongoose = require('mongoose');
const Listing=require("../models/listing.js");
const initData=require("./data.js");

main().then(res=>console.log("connected to database!!"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlustt');
}


const initDB =  async()=>{
await Listing.deleteMany({});
initData.data=initData.data.map((obj)=>({...obj,owner:"67a88fbe393ff8e67e768b99",geometry:{
  type:"Point",coordinates:[obj.lng,obj.lat]}}));


await Listing.insertMany(initData.data);
console.log("data was initlized");

}

initDB();