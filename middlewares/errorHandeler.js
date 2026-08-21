const erroHandler = (err,req,res,next)=>{
       
 console.log("Hello"); 
   if(err) {
       console.log(err);
       return res.json(err);
       
      
    }

   next();
}

module.exports = erroHandler;