const exp = require('express')
const userAuth = exp.Router();
const expAsyncHandler = require('express-async-handler')
const expressAsyncHandler = require('express-async-handler')
const bcryptjs =require('bcryptjs');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')


userAuth.use(bodyParser.json())
userAuth.use(exp.json())



// Signup
userAuth.post('/createAccount',expAsyncHandler(async(req,res)=>{
    const userCollection = req.app.get('userCollection');
    const newUser = req.body;
    newUser.email = newUser.email.toLowerCase();
    let doesUserExist = await userCollection.findOne({email:newUser.email})
    if(doesUserExist!==null) res.status(200).send({success:false,message:'Email already taken'})
    else{
        const hashedPassword = await bcryptjs.hash(newUser.password,3);
        newUser.password = hashedPassword;
        console.log('new User :',newUser)
        await userCollection.insertOne(newUser)
        res.status(200).send({success:true, message:"User Created Succesfully"})
    }
}))

// login User
userAuth.post('/login',expressAsyncHandler(async(req,res)=>{
    const userCollection = req.app.get('userCollection');
    const submitedDetails = req.body;
    submitedDetails.email = submitedDetails.email.toLowerCase();
    const dbAccount = await userCollection.findOne({email:submitedDetails.email});
    console.log('Submitted details are: ',submitedDetails)
    console.log('Db Account is:', dbAccount)

    if(dbAccount === null) {
        res.status(200).send({success:false,message:'user not found'});
    } else {
        let passCheck = await bcryptjs.compare(submitedDetails.password,dbAccount.password)
        // console.log(passCheck)
        if(passCheck!= true) {
            res.status(200).send({success:false,message:'password not matched!'});
        }else{
            const privateKey = 'Bharath'
            let jwToken = jwt.sign(dbAccount,privateKey,{expiresIn:'7d'})
            res.status(200).send({success:true, message:'credentials matched', token:jwToken});
        }
    }
    
}))

module.exports=userAuth;    