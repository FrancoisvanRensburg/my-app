// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import data from "./data.json";

export interface Events {
  id?: string;
  name?: string;
  slug?: string;
  venue?: string;
  address?: string;
  performers?: string;
  date?: string;
  time?: string;
  description?: string;
  image?: string;
  message?: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Events[]>) {
  if (req.method === "GET") {
    res.status(200).json(data.events);
    return;
  }
  res.setHeader("Allow", ["GET"]);
  // @ts-ignore
  res.status(405).json({ message: `Method: ${req.method} is not allowed` });
}
