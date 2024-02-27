import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import prismadb from "../lib/prismadb";

export const signup = async (req: Request, res: Response) => {
  try {
    // destructure the data from the body
    const { username, email, password } = req.body;

    // check if user exist in database or not
    const existsingUser = await prismadb.user.findUnique({ where: { email } });
    if (existsingUser) throw new Error("Email Already Exists!");

    /// encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const user = await prismadb.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // if unable to create user throw the error
    if (!user) throw new Error("Unable to Create user");

    // if user is created successfully sign the token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    /// if user is create and token is sign successfully send respond
    res.status(200).json({
      user: {
        email: user.email,
        id: user.id,
        username: user.username,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existsingUser = await prismadb.user.findUnique({ where: { email } });
    if (!existsingUser) {
      throw new Error("Invalid Email. Kindly Signup!");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existsingUser?.password,
    );

    if (!isPasswordValid) throw new Error("Invalid password!");

    const token = jwt.sign(
      { id: existsingUser.id, email: existsingUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.status(200).json({
      user: {
        email: existsingUser.email,
        id: existsingUser.id,
        username: existsingUser.username,
      },
      token,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteAllUser = async (req: Request, res: Response) => {
  try {
    const DeletedCount = await prismadb.user.deleteMany();
    if (!DeletedCount)throw new Error("Failed to Delete user!");
    res.status(200).json("All User successfully Deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
