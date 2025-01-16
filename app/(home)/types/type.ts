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
  _id: string;
}

export interface MyGathering extends Omit<IGathering, "_id"> {
  id: string;
  userLike: boolean;
}
