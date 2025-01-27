"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import { Auth } from "@/app/api/auth";
import { connectDB } from "@/app/api/database";
import { FormError } from "@/app/components/Authentication/type";
import { gatheringValidation, Gathering } from "@/app/util/validation";
import { IGathering } from "@/app/(home)/types/type";

export const generateGathering = async (
  _: FormError | undefined,
  formData: FormData,
): Promise<FormError> => {
  const session = (await cookies()).get("session")?.value;

  if (!session) return { state: "error", message: "로그인 후 이용해주세요." };

  const userInput = {
    title: formData.get("title")?.toString(),
    description: formData.get("description")?.toString(),
    lat: formData.get("lat")?.toString(),
    lng: formData.get("lng")?.toString(),
    date: formData.get("date")?.toString(),
  };

  const validationResult = gatheringValidation(userInput);

  if (!validationResult.success) {
    const [{ message }] = validationResult.error.errors;

    return { state: "error", message };
  }

  const userId = await Auth.getUsername(JSON.stringify(session));

  if (
    userInput.title === undefined ||
    userInput.description === undefined ||
    userInput.lat === undefined ||
    userInput.lng === undefined ||
    userInput.date === undefined
  )
    return { state: "error", message: "빈 값을 입력할 수 없습니다" };

  try {
    const db = (await connectDB).db("climbing");
    await db.collection<Gathering>("gathering").insertOne({
      user: userId,
      title: userInput.title,
      description: userInput.description,
      lat: userInput.lat,
      lng: userInput.lng,
      date: new Date(userInput.date),
    });

    return { state: "success", message: null };
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  } finally {
    redirect("/");
  }
};

type UpdateGathering = {
  title: string;
  description: string;
  lat: string;
  lng: string;
  date: Date;
};

export const editGathering = async (
  _: FormError | undefined,
  formData: FormData,
): Promise<FormError> => {
  const session = (await cookies()).get("session")?.value;

  if (!session) return { state: "error", message: "로그인 후 이용해주세요." };

  const userInput = {
    title: formData.get("title")?.toString(),
    description: formData.get("description")?.toString(),
    lat: formData.get("lat")?.toString(),
    lng: formData.get("lng")?.toString(),
    date: formData.get("date")?.toString(),
  };

  const validationResult = gatheringValidation(userInput);

  if (!validationResult.success) {
    const [{ message }] = validationResult.error.errors;

    return { state: "error", message };
  }

  const docId = formData.get("id")?.toString();

  if (
    userInput.title === undefined ||
    userInput.description === undefined ||
    userInput.lat === undefined ||
    userInput.lng === undefined ||
    userInput.date === undefined ||
    docId === undefined
  )
    return { state: "error", message: "빈 값을 입력할 수 없습니다" };

  try {
    const db = (await connectDB).db("climbing");
    await db.collection<UpdateGathering>("gathering").updateOne(
      { _id: new ObjectId(docId) },
      {
        $set: {
          title: userInput.title,
          description: userInput.description,
          lat: userInput.lat,
          lng: userInput.lng,
          date: new Date(userInput.date),
        },
      },
    );

    return { state: "success", message: null };
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  } finally {
    redirect("/");
  }
};

export const deleteGathering = async (id: string) => {
  try {
    const db = (await connectDB).db("climbing");
    await db
      .collection<UpdateGathering>("gathering")
      .deleteOne({ _id: new ObjectId(id) });
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};

export const getMyGatherings = async (ids: string[]) => {
  try {
    const objectIds = ids.map((id) => new ObjectId(id)) as unknown as string[];

    const db = (await connectDB).db("climbing");
    const result = await db
      .collection<IGathering>("gathering")
      .find({ _id: { $in: objectIds } })
      .sort({ date: -1 })
      .toArray();

    const myGatherings = result.map((data) => {
      const newData = {
        ...data,
        _id: data._id.toString(),
      };

      return newData;
    });

    return myGatherings;
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};
