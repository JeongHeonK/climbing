import { connectDB } from "@/app/api/database";

interface Gathering {
  _id: string;
  user: string;
  title: string;
  description: string;
  lat: string;
  lng: string;
  date: Date;
}

export const getGathering = async (page = 1) => {
  const skipCount = (page - 1) * 8;

  const db = (await connectDB).db("climbing");
  const result = db
    .collection<Gathering>("gathering")
    .find({})
    .skip(skipCount)
    .limit(8)
    .sort({ date: -1 });

  const gatherings = (await result.hasNext()) ? await result.toArray() : [];

  return gatherings;
};
