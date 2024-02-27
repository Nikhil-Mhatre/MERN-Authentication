import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prismadb from "../lib/prismadb";

interface CustomRequest extends Request {
  user: {
    id: string;
    username: string;
    email: string;
    password: string;
  };
}

const verifyToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Unauthorized: Missing token");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as JwtPayload;

    if (!decodedToken) throw new Error("Unauthorized: Token expired");

    const validUser = await prismadb.user.findUnique({
      where: { email: decodedToken?.email },
    });

    if (!validUser) throw new Error("Unauthorized: Invalid token");
    req.user = validUser;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export default verifyToken;
