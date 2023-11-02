require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const connection = require("./db/db");

const swaggerUi = require("swagger-ui-express");
const apiDocument = require("./documentation/swagger.json");

app.use("/api/v1/api-document",swaggerUi.serve, swaggerUi.setup(apiDocument))

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./router/userRoutes");

app.use("/api/v1/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});
