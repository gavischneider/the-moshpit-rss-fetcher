import { ObjectId } from "mongodb";

export interface Tag {
  _id: any;
  title: string;
  postIds: ObjectId[];
}
