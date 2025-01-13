import { connectDB } from "@/app/api/database";

interface Gathering {
  _id: string;
  user: string;
  title: string;
  description: string;
  lat: string;
  lng: string;
  date: string;
}

export const getGathering = async () => {
  const db = (await connectDB).db("climbing");
  const result = db.collection<Gathering>("gathering").find({}).toArray();
  return result;
};
