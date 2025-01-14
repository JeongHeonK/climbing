"use server";

import { connectDB } from "@/app/api/database";
import { ObjectId } from "mongodb";
import { IGathering } from "../types/type";

export const getGatherings = async (page = 1) => {
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

export const getGathering = async (id: string) => {
  const db = (await connectDB).db("climbing");
  const result = await db
    .collection("gathering")
    .findOne({ _id: new ObjectId(id) });

  return result;
};
