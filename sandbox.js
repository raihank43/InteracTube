const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

async function run() {
  try {
    const database = client.db("p3-gc01");
    const posts = database.collection("posts");

    const doc = {
      title: "Lorem ipsum 22",
      imgUrl: "img.png",
      content: "lorem lorem lorem ipsum ",
      comments: [
        {
          name: "raihan",
          text: "nice!",
        },
      ],
    };

    //! pada mongoDB bisa menyimpan document(data/row) dengan key yang berbeda

    //* insert document
    // const result = await test.insertOne(doc);
    // console.log(result, "<<<<");

    /**
       {
      acknowledged: true,
      insertedId: new ObjectId('660148d61539eec444c78860')
      } <<<<
     */

    // console.log(`a document was inserted with the _id: ${result.insertedId}`);

    //* findOne document
    // const result = await posts.findOne({
    //   _id: new ObjectId("66014951fb88a2b8a21ee602"), // kalau tidak pakai ObjectId nanti hasilnya akan null, karena dia bentuknya object
    // });
    // console.log(result);

    //* findAll document
    // nanti returnnya merupakan instance dari findCursor, yang merupakan sebuah method dari mongoDB yang mengatur hasil query kita
    // namun bukan hasilnya
    const result = await posts.find({}).toArray(); //makanya kita butuh method toArray() biar jadi array semuanya

    console.log(result);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
