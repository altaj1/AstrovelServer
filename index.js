const express = require ('express');
const dotenv = require('dotenv')

const cors = require('cors')
const app = express();
const port = process.env.PORT || 4000;
app.use(cors())
dotenv.config()
app.use(express.json());

// PmijSgOpV7CoL2Yf
// astrovel
const pass = process.env.PASS
const user = process.env.USER
// console.log(pass, user)
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${user}:${pass}@cluster0.zumttn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
async function run() {

    try {
        // await client.connect()
        const touristCollection = client.db("touristsDB").collection('spot');
        const countryCollection = client.db("countruDB").collection("name")
        app.get("/my-list/:email", async(req, res)=>{
          const  email = req.params.email;
          const result = await touristCollection.find({ email: email }).toArray();
          res.send(result)
          // console.log(result)
        })
        app.get("/view-deatils/:id",async(req, res)=>{
          const id = req.params.id
          const query = {_id: new ObjectId(id)}
          const result = await touristCollection.findOne(query);
          res.send(result)

          // console.log(result)
        })
        app.get('/country/:country', async(req, res)=>{
          const country = req.params.country;
          console.log(country)
        })
        app.get('/all-country', async(req, res)=>{
          const country = countryCollection.find();
          const result =  await country.toArray();
          res.send(result)
        })
        app.get("/all-torists", async(req, res)=>{
            const corsor = touristCollection.find();
            const result = await corsor.toArray();
            res.send(result)
        })
        app.post('/add-tourists', async(req, res)=>{
            const spot = req.body;
            console.log(spot)
            const result = await touristCollection.insertOne(spot);
            res.send(result)
        })
        app.delete("/delete/:id", async(req, res) =>{
          const id = req.params.id;
          const query = {_id: new ObjectId(id)}
          const result = await touristCollection.deleteOne(query);
          res.send(result);
        })
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Close the MongoDB client connection
       
     }
   }
   // Run the function and handle any errors
   run().catch(console.dir);     
app.get('/', (req, res) => {
    res.send('this is strovel server')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })