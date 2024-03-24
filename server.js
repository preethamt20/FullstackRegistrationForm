// create the server
const exp = require('express');
const app = exp()
const cors = require('cors')
app.listen(3500,()=>{console.log('server is running on the port 3500 ')})


const userAuth = require('./APIs/userAuth');
const mClient = require('mongodb').MongoClient

//middle wares
app.use(exp.json())
app.use(cors())

mClient.connect('mongodb://127.0.0.1:27017')
.then(dbServerRef=>{
    const DB = dbServerRef.db('bharathInternDB');
    const userCollection = DB.collection('userCollection')
    app.set('userCollection',userCollection);
    console.log('Database connection Success!');
})
.catch((err)=>{
    console.log('error in Connecting to database! : ',err)
})


app.use('/userData', userAuth );

const invalidPathMiddleware = (request, response, next) => {
    response.send({message: 'Invalid Path'})
}
app.use(invalidPathMiddleware)

const errhandlingMiddleware = (error, request, response, next) => {
    response.send({message: error.message})
}
app.use(errhandlingMiddleware)