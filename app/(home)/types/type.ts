import { ObjectId } from "mongodb";

export interface IGathering {
  _id: string;
  user: string;
  title: string;
  description: string;
  lat: string;
  lng: string;
  date: Date;
}

export interface Gathering extends Omit<IGathering, "_id"> {
  _id: ObjectId;
}

export interface KakaoMap extends HTMLScriptElement {
  crossorigin?: string;
}
