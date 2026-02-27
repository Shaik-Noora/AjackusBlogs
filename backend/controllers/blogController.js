const db = require("../db/database");

exports.getAll = (_,res)=>{
 db.all("SELECT * FROM blogs ORDER BY created_at DESC",
 [],(e,r)=> e?res.status(500).json(e):res.json(r));
};

exports.getOne=(req,res)=>{
 db.get("SELECT * FROM blogs WHERE id=?",
 [req.params.id],
 (e,r)=> e?res.status(500).json(e):res.json(r));
};

exports.create=(req,res)=>{
 const {title,content,author}=req.body;
 db.run(
 "INSERT INTO blogs(title,content,author) VALUES(?,?,?)",
 [title,content,author],
 function(e){
  if(e) return res.status(500).json(e);
  res.json({id:this.lastID});
 });
};

exports.update=(req,res)=>{
 const {title,content,author}=req.body;
 db.run(
 `UPDATE blogs SET title=?,content=?,author=?,
 updated_at=CURRENT_TIMESTAMP WHERE id=?`,
 [title,content,author,req.params.id],
 e=> e?res.status(500).json(e):res.json({ok:true})
 );
};

exports.remove=(req,res)=>{
 db.run("DELETE FROM blogs WHERE id=?",
 [req.params.id],
 e=> e?res.status(500).json(e):res.json({deleted:true}));
};