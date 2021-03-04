//CRUD

const { MongoClient, ObjectID } = require('mongodb')

const connecttionURL = process.env.MONGO_URL
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id.id.length)
// console.log(id.toHexString().length)
// console.log(id.getTimestamp())

MongoClient.connect(connecttionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if(error) {
        console.log("Error")
        return console.log(error);
    }
    const db = client.db(databaseName);
    

    db.collection('tasks').deleteMany({
        completed: true
    }).then(res => console.log(res)).catch(err=> console.log(err))

    // db.collection('users').deleteOne({
    //     name: 'Phil'
    // }).then(res => console.log(res)).catch(err=> console.log(err))

    // db.collection('users').deleteMany({
    //     age: 25
    // }).then((res) => {
    //     console.log("Success!", res + "deleted")
    // }).catch(err => console.log(err))

    // db.collection('tasks').updateMany(
    //     {completed: false},
    //     { $set: {completed: true}}
    // ).then((res) => {
    //     console.log(res)
    // }).catch((err) => {
    //     console.log(err)
    // })

    // db.collection('users').updateOne(
    //     { _id: new ObjectID('5de84856ed72201a90738515')}, 
    //     { $inc: { age: 1 }}
    //     ).then((result) => {
    //         console.log(result)
    //     }).catch((error) => {
    //         console.log(error)
    //     })


    // db.collection('tasks').findOne({_id: new ObjectID('5de85249141512103c653a52')}, (error, result) => {
    //     if(error){
    //         return console.log("Couldn't find that! " + error)
    //     }
    //     console.log(result)
    // });

    // db.collection('tasks').find({completed: false}).toArray((error, result) => {
    //     if(error){
    //         return console.log("Couldn't find that! " + error)
    //     }
    //     console.log(result)
    // })

    // db.collection('users').findOne({
    //     _id: new ObjectID('5de850be11fab35e943f3034')
    // }, {
    //     limit: 10
    // }, (error, result) => {
    //     if(error) {
    //         return console.log("Oh no! An error: " + error)
    //     }
    //     console.log(result)
    // })

    // db.collection('users').find({age: 25}).toArray((error, results) => {
    //     console.log(results)
    // })

    // db.collection('users').find({age: 25}).count((error, results) => {
    //     console.log(results)
    // })


    // db.collection('users').insertOne({
    //     _id: id,
    //     name: "Phil",
    //     age: 31
    // }, (error, result) => {
    //     if (error) {
    //         return console.log("Unable to find user")
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: "Trevor",
    //         age: 25
    //     },
    //     {
    //         name: "Bill",
    //         age: 93
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log("Unable to do the thing" + error)
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         name: "Do laundry",
    //         completed: false,
    //         reocurring: true,
    //         frequency: 'weekly'
    //     },
    //     {
    //         name: "Cook Dinner",
    //         completed: false
    //     },
    //     {
    //         name: "Go golfing! :)",
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log(error)
    //     }
    //     console.log(result.ops)
    // })


})