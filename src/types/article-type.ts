import { Key } from "react";

export interface ArticleType {
  id: Key | null | undefined;
  time: number;
  title: string;
  information: string;
  score: number;
  author: string;
  by: string;
  descendants: number;
  url: string;
  kids: number[];
}