const router = require('express').Router();
const User = require('../model/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {registerValidation, loginValidation} = require('../validation')

router.post('/register',async (req,res)=> {

  //validate the data
  const {error} = registerValidation(req.body);
  
  if(error){
    return res.status(400).send(error.details[0].message);
  }

  //Checking if the user is already in the database
  const emailExists = await User.findOne({email: req.body.email});
  if(emailExists){
    return res.status(400).send('Email Already Exists')
  }

  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });

  try{
    const savedUser = await user.save();
    res.send(savedUser._id);
  }catch(err){
    res.status(400).send(err);
  }
})

router.post('/login', async (req,res)=> {
  //validate the data
  const {error} = registerValidation(req.body);
  if(error){
    return res.status(400).send(error.details[0].message);
  }

  //checking the email Address
  const user = await User.findOne({email: req.body.email});
  if(!user){
    return res.status(400).send('Email Does not exists')
  }else{
    //Ckecking password
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass){
      return res.status(400).send('Invalid Password')
    }

    //Login successfull... now make a JWT TOken
    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
  }

})
module.exports = router;