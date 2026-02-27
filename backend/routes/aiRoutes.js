const r=require("express").Router();
const c=require("../controllers/aiController");

r.post("/",c.generate);

module.exports=r;