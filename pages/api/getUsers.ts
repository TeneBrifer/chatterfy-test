// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import UsersDTO from "@/src/dto/UsersDTO";
import usersData from "./users.json";

export default function getUsers(
  req: NextApiRequest,
  res: NextApiResponse<UsersDTO>
) {
  const query = req.query;
  const {
    sortingBy,
    sortingOrder,
    email,
    firstName,
    lastName,
    gender,
    subscription,
    fullSearch,
  } = query;
  res.statusCode = 200;
  res.setHeader("content-Type", "application/json");
  console.log(sortingBy);
  let usersDataSend = usersData
    .filter((user) =>
      email
        ? user["email"].toLowerCase().search(email.toString().toLowerCase()) !==
          -1
        : true
    )
    .filter((user) =>
      firstName
        ? user["firstName"]
            .toLowerCase()
            .search(firstName.toString().toLowerCase()) !== -1
        : true
    )
    .filter((user) =>
      lastName
        ? user["lastName"]
            .toLowerCase()
            .search(lastName.toString().toLowerCase()) !== -1
        : true
    )
    .filter((user) => (gender ? user["gender"] === gender : true))
    .filter((user) =>
      subscription ? user["subscription"] === subscription : true
    )
    .sort((a, b) => {
      let x;
      let y;
      switch (sortingBy) {
        case "age": {
          x = a["age"];
          y = b["age"];
          break;
        }
        case "birthdate": {
          x = new Date(a["birthdate"]).getTime();
          y = new Date(b["birthdate"]).getTime();
          break;
        }
        case "createdAt": {
          x = new Date(a["createdAt"]).getTime();
          y = new Date(b["createdAt"]).getTime();
          break;
        }
        default: {
          x = new Date(a["createdAt"]).getTime();
          y = new Date(b["createdAt"]).getTime();
          break;
        }
      }
      switch (sortingOrder) {
        case "ASC": {
          return x < y ? -1 : x > y ? 1 : 0;
        }
        case "DESC": {
          return x > y ? -1 : x < y ? 1 : 0;
        }
        default:
          return x < y ? -1 : x > y ? 1 : 0;
      }
    });
  res.end(JSON.stringify(usersDataSend));
}
