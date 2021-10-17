const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const cors = require("cors");
const { getConnection } = require("./dbconnection");
const app = express();

//enabling cors
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//db connection
getConnection();

app.use("/api/v1", indexRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Web based password manager application!!!" });
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
