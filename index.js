import express from "express";
import 'dotenv/config'
import cors from 'cors'
import { MongoClient } from "mongodb";
import userRouter from './routes/user.route.js'

export const app = express()
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);

await client.connect();
console.log(`Connected to the Database :)`);

//! Creating DB
export const bookCollection = client.db("BookInventory").collection("Books");

app.use("/", userRouter)

app.listen(port, () => console.log(`Running on ${port}`))