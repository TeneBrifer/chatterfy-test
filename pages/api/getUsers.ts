// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import UsersDTO from "@/dto/UsersDTO";
import usersData from "./users.json";

export default function getUsers(
  req: NextApiRequest,
  res: NextApiResponse<UsersDTO>,
) {
  res.statusCode = 200
  res.setHeader('content-Type','application/json')
  res.end(JSON.stringify(usersData))
}
