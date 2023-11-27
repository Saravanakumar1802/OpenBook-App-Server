import { ObjectId } from "mongodb";
import { bookCollection } from "../index.js";
import express from 'express';



const router = express.Router()

router.get('/', (req, res) => {
    res.send("🔥👋💙✔️✨");
});

router.post("/upload-book", async (req, res) => {
    const data = req.body;
    const result = await bookCollection.insertOne(data);
    res.send(result);
});

// router.get("/all-books", async (req, res) => {
//     const result = await bookCollection.find().toArray();
//     res.send(result);
// });

router.patch("/books/:id", async (req, res) => {
    const id = req.params.id;
    const updatedBook = req.body;
    // console.log(updatedBook);
    const result = await bookCollection.updateOne({ _id: new ObjectId(id) }, { $set: { ...updatedBook } });
    res.send(result);
});

router.delete("/book/:id", async (req, res) => {
    const id = req.params.id;
    const result = await bookCollection.deleteOne({ _id: new ObjectId(id) });
    res.send(result)
})

//! Find category
router.get("/all-books", async (req, res) => {
    let query = {};
    if (req.query.category) {
        query = { category: req.query.category };
    }
    const result = await bookCollection.find(query).toArray();
    res.send(result);
});

//! To get single book

router.get("/book/:id", async (req, res) => {
    const id = req.params.id;
    const result = await bookCollection.findOne({ _id: new ObjectId(id) });
    res.send(result)
})


export default router;