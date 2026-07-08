import type { ResourceCategory } from "./resource-category";

export interface Resource {
  id: string;
  category: ResourceCategory;
  title: string;
  thumbnail: string;
  tags: string[];
  duration: number;
  description: string;
  date_uploaded: string;
}
