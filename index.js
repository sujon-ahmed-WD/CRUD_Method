const express = require('express');
const cors=require('cors')
const app=express()
const port=process.env.PORT || 8080;

// middlweres

app.use(cors())
app.use(express.json())

// User name: carUser Password:B-for-Ball

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://carUser:B-for-Ball@cluster0.v9rdx72.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Database Collection on Broswer
    const userCollection = client.db("NewDB").collection("Data")


    
    
    // Crud Post /Create
    app.post('/users',async(req,res)=>{
        const user=req.body;
        console.log('newuser,user',user);
        const result=await userCollection.insertOne(user)
        res.send(result)
        
    })
    // ------------------------
    // GET/ READ Operation

    app.get('/users',async(req,res)=>{
        const cursor=await userCollection.find().toArray()
        res.send(cursor)
    })
    // ------------------------

    // Update ----------------------
        // Single Data Rread kora jono use hoy 
    app.get('/users/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id:new ObjectId(id)}
        const user=await userCollection.findOne(query);
        res.send(user)

    })

    app.put('/users/:id',async(req,res)=>{
        const id =req.params.id;
        const user=req.body;
        console.log(id,user);
        const filter={_id: new ObjectId(id)} //kon dataka update kora lagvo
        const options ={upsert:true}
        const updatedUser={ // ke ke update korvo ta bolmu ..
            $set:{
                name:user.name,
                email:user.email
            }
        }
        const result=await userCollection.updateOne(filter,updatedUser,options);
        res.send(result)
    })
    // ------------------------


    // DELETE

    app.delete('/users/:id',async(req,res)=>{
        const id =req.params.id;
        console.log('Please delete from database',id);
        const query={_id : new ObjectId (id)}
        const result=await userCollection.deleteOne(query)
        res.send(result)
    })
    // ------------------------

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);


app.get('/',(req,res)=>{
    res.send("Rstart Ahmed 8-17-2024 sdfs")
}) 
app.listen(port,()=>{
    console.log(`the Server is Runnige ${port}`) 
})
