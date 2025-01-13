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

export const getGathering = async (page = 1) => {
  const skipCount = (page - 1) * 8;

  const db = (await connectDB).db("climbing");
  const result = db
    .collection<Gathering>("gathering")
    .find({})
    .skip(skipCount)
    .sort({ date: -1 })
    .limit(8);

  return result;
};
