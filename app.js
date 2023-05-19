import express from "express";
import pkg from "body-parser";
import MainRoutes from "./Routes/routes.js";
import cors from "cors"

const { json } = pkg;

const PORT = process.env.PORTSERVER;
const HOST = process.env.HOSTSERVER;

const app = express();
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({ limit:'50mb' }));
app.use(cors())

MainRoutes(app);

const start = async () => {
  try {
    app.listen(PORT, HOST);
    console.log(`Running on http://${HOST}:${PORT}`);
  } catch (error) {
    console.log(error);
  }
};

start();
