const router = require("express").Router();

router.get('/', (req, res) => {
    return res.send("Inside the user router");
});

router.get("/jwtVerification", async (req, res) => {
  if(req.headers.authorization){
    return res.status(500).send({ msg: "Token not found!"});
  } 

  
})

module.exports = router;