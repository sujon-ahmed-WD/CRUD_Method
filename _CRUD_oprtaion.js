/**
 * ----------------
 * Mongodb Connecton
 * ------------------
 * 1.crate Account
 * 2.crate an user with Password
 * 3.whitelist Ip Address
 * 4.database >Connect>driver>Node>View full code
 * 5.change the passwoed the uri
 * --------------
 * 
 *     CERATE ---POST
 * --------------------
 * 2.app.post('/users'/async(req,res)=>{})
 * 3.Make the fucntion async to use await inside it
 * 4.Make sure
 * 5.access data from the bode: const user=req.body
 * 6.const result=awit useCoolection.insertOne(user);
 * Exampule ::
 * -----------------------------
 *    app.post('/users',async(req,res)=>{
        const user=req.body;
        console.log('newuser,user',user);
        const result=await userCollection.insertOne(user)
        res.send(result)

    })
 * ----------------------------

    ClIENT --- Side

    1.crate fetch
    2.add second parameter as an object
    3.provide method :"POST"
    4.add headers:{'content-type':"applicaton/json"}
    5.add body:JSON.Stringify(user)

    exampule:
        const handleDelte=_id=>{
        console.log('delete',_id);
        fetch(`http://localhost:8080/users/${_id}`,{
            method:'DELETE'
        })
        .then(res=>res.json())
        .then(data=>{
             
            console.log(data)
            if(data.deletedCount>0){
                alert('deleted Successfully');
                const remaninge=users.filter(user=>user._id !== _id);
                setUser(remaninge)
            }
        })
    }

    ------------------------------
    READ
    ------------------------------
    // Server side

    1.crate a cursor =usecCollection.find().toArray()

    Exampule:

     // GET/ READ Operation

    app.get('/users',async(req,res)=>{
        const cursor=await userCollection.find().toArray()
        res.send(cursor)
    })

    ----------------------------
    DELETE
    ----------------------------
    // ----------------Server_Side--------------
    1.create app.delete('/users/:id',async(req,res)=>{})
    2.Specify uniqe ObjectId to delete the right user
    3.Const query={_id:new ObjectId(id)}
    4.const result =awiat userCollection.deleteOne(query);

    Eaxplue:

       // DELETE

    app.delete('/users/:id',async(req,res)=>{
        const id =req.params.id;
        console.log('Please delete from database',id);
        const query={_id : new ObjectId (id)}
        const result=await userCollection.deleteOne(query)
        res.send(result)
    })

    ----------------Client_Side-----------------
    1.create dynamic url with id 
    2.mention the DELETE methood

    // UPDATE

    --------ServerSide----------------
        fetch(`http://localhost:8080/users/${loadedUser._id}`,{
        method:'PUT',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(Updateduser)
    })
    .then(res=>res.json())
    .then(data=>{

        console.log(data)
        if(data.modifiedCount>0){
            alert("data is update") 
        }
    })
    --------------------------------
    ------------ClientSide----------
    app.put('/data/:id',async(req,res)=>{
        const id=req.params.id;// main data nevo
        const user=req.body; // userbody modda ke asa
        console.log('UpdteUser',id,user);
        const filter={_id:new ObjectId(id)} //{kontermodma kaj korvo _id: MongoDB-তে প্রতিটি ডকুমেন্টের জন্য একটি ইউনিক আইডেন্টিফায়ার থাকে,  যেটি _id নামে পরিচিত।
           new ObjectId(id): id একটি স্ট্রিং, যেটিকে ObjectId অবজেক্টে কনভার্ট করা হচ্ছে, যাতে MongoDB-তে _id এর মানের সাথে সঠিকভাবে মেলানো যায়।}
        const options={upsert:true}; // data jodi thaka thaola overlapinge hova aer jodi aer jodi nh thka tah hola amne
        const updateuser={ // ke ke ami updater korbo ti demu
            $set:{
                name:user.name; // akna user thaka ana name kaj korsa 
                email:user.email // email user thaka akana email update etc kaj korsa 
            }
        }
        const result=await userCollection.updateOne(filter,updateuser,user)
        res.send(result)
         
    })    




 */
