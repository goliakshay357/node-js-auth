const jwt = require('jsonwebtoken');

//JWT middleware
module.exports = function(req,res,next){
  const token = req.header('auth-token')
  if(!token){
    return res.status(401).send('Access Denied')
  }

  try{
    const verifier = jwt.verify(token,process.env.TOKEN_SECRET);
    req.user = verifier;
    next();
  }catch{
    res.status(400).send('Invalid Token')
  }
}
