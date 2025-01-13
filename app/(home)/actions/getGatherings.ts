"use server";

import { connectDB } from "@/app/api/database";

export interface IGathering {
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
  const result = await db
    .collection<IGathering>("gathering")
    .find({})
    .skip(skipCount)
    .limit(9)
    .sort({ date: -1 })
    .toArray();

  const gatherings = result.slice(0, 8).map((data) => ({
    ...data,
    _id: String(data._id),
  }));

  const hasNext = result.length > 8;
  return { gatherings, hasNext };
};
