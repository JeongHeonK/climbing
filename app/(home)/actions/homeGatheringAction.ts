"use server";

import { ObjectId } from "mongodb";
import { connectDB } from "@/app/api/database";
import { IGathering } from "../types/type";

export const getGatherings = async (page = 1) => {
  const skipCount = (page - 1) * 8;

  try {
    const db = (await connectDB).db("climbing");
    const result = await db
      .collection<IGathering>("gathering")
      .find({})
      .sort({ date: -1 })
      .skip(skipCount)
      .limit(9)
      .toArray();

    const gatherings = result.slice(0, 8).map((data) => ({
      ...data,
      _id: String(data._id),
    }));

    const hasNext = result.length > 8;
    return { gatherings, hasNext };
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};

export const getGathering = async (id: string) => {
  try {
    const db = (await connectDB).db("climbing");
    const result = await db
      .collection("gathering")
      .findOne({ _id: new ObjectId(id) });

    return result;
  } catch (err) {
    const error = err as Error;
    console.log(error);
  }
};
