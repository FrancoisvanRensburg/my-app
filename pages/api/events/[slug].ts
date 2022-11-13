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

export default function getEvent(req: NextApiRequest, res: NextApiResponse<Events[]>) {
  console.log("query", req.query);
  const evt = data.events.filter(evt => evt.slug === req.query.slug);
  if (req.method === "GET") {
    res.status(200).json(evt);
  } else {
    res.setHeader("Allow", ["GET"]);
    // @ts-ignore
    res.status(405).json({ message: `Method: ${req.method} is not allowed` });
  }
}
