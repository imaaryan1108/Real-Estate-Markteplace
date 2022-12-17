import express from "express";
import cors from "cors";
const port = process.env.PORT || 9000;
import houseListingRoute from "./Routes/HouseListing.js";
import houseFetchRoute from "./Routes/HouseFetch.js";

const app = express();
app.use(cors());

app.use(houseListingRoute);
app.use(houseFetchRoute);

// -----------ALL NEW ROUTES TO BE DEFINED ABOVE -------------

app.get("/", (req, res) => {
  res.status(200).send("Your API IS RUNNING CORRECTLY!");
});


app.listen(port, () => {
  console.log(`Housify Backend Running on Port:${port}`);
});
