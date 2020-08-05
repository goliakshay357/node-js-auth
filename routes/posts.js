const router = require('express').Router();
const verify = require('./verifyToken')

router.get('/',verify,(req,res) => {
  // res.json({
  //   posts:{title: 'my First post', description: 'random data shud not be accessed'}
  // })

  res.send(req.user)
})
module.exports = router;