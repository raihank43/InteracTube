const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//! uri -> nanti di pindah ke process.env
const uri =
  "mongodb+srv://raihank43:pakraden133@cluster0.bue4llj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//? database yang dituju
const database = client.db("p3-gc01");

//? kemudian di exports
module.exports = database;
