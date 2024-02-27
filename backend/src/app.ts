import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/user";
import bodyParser from "body-parser";

// to import .env variables
dotenv.config();
const app = express();

// use body-parser as request body needs to be parse before using it
// it is not available in express by default
app.use(bodyParser.json({ limit: "30mb", strict: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const port = process.env.PORT;
app.use("/api/user", userRoute);
app.use("/api", userRoute);

// app.get("/api", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
