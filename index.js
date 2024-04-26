const express = require ('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 4000;
app.use(cors())
app.use(express.json());
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://al-taj:V0vu4UKN7aoLCZJj@cluster0.zumttn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
async function run() {
    try {

        const touristCollection = client.db("touristsDB").collection('spot');
        

        app.post('/add-tourists', async(req, res)=>{
            const spot = req.body;
            const result = await touristCollection.insertOne(spot);
            res.send(result)
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