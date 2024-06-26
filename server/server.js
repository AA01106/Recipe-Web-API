const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const routes = require("./routes/index.route")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const cors = require("cors");
const {specs , swaggerUi} = require("./service/swaggerConfig")

//Database conncetion
function dbConnection() {
  const url = process.env.DB_URL
  mongoose.connect(url)
    .then(() => {
      console.log("DB Connected !!");
    })
    .catch((err) => {
      console.log(err);
      console.log("DB Not Connected");
    })
}

app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.options("*", cors());

app.use("/api-docs" ,swaggerUi.serve , swaggerUi.setup(specs) )
app.use("/api", routes)


app.all("*", (req, res) => {
  res.status(404).send({ message: "Invalid Route" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  dbConnection()
  console.log(`Server is Running ${PORT}`);
  console.log("Swagger Docs : http://localhost:5000/api-docs");
})