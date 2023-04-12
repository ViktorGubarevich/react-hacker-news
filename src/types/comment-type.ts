export interface CommentType {
  by: string;
  id: number;
  parent: number;
  text: string;
  time: number;
  type: string;
  kids?: number[];
}