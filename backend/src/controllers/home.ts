import { Request, Response } from "express";
interface CustomRequest extends Request {
  user: {
    id: string;
    email: string;
    username: string;
    password: string;
  };
}

export const home = (req: CustomRequest, res: Response) => {
  const { id, email, username } = req.user;

  res.send({ id, email, username });
};
