const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

//Connected To DB
main().then(() => {
    console.log("Connected to DB");
}).catch((err) =>{
    console.log(err);
});

//Define connection of DB
async function main() {
    await mongoose.connect(MONGO_URL);
}


//Function for initialising the DB with data
const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((listing) => ({
        ...listing,
        owner: '69fdcccb27a3b79583c2f006',
    }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialised");
    await mongoose.connection.close();
};

initDB();




// app.get("/testlisting", async (req, res) => {
//     const sampleListing = new Listing({
//         title: "My new Villa",
//         description: "By ta sea Beach",
//         price: 1200,
//         location: "BBsr, 751012",
//         country: 'india'
//     });

//     await sampleListing.save().then((res) =>{
//         console.log(res);
//     }).catch((err) =>{
//         console.log(err);
//     });

//     console.log("Sample was saved");
//     res.send("Succesfull Testing");
// });
