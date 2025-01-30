import { MongoClient } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGO_DB_URL!;
const db = new MongoClient(uri).db("climbing");

export { db };
