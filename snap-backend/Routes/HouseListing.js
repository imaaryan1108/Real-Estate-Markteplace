import express from "express";
import House from "../Models/House.js";
import formidable from "formidable";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import cors from "cors";

const Cloudinary = cloudinary.v2;
const cloud_name = "dnsxizbbp";
const api_key = "346221214516497";
const api_secret = "yyp5BKe92IAX40HtB0PR2s2W1tk";

const mongoURI =
  "mongodb+srv://dbUser:lddufobioDygq9v2@cluster0.7nxqt.mongodb.net/Houses?retryWrites=true&w=majority";

//-----------------------------Cloudinary Config--------------------------------//
Cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

//-----------------------------MongoDb Config----------------------------------//
mongoose.connect(mongoURI, (error) => {
  if (error) {
    return console.log(error);
  }
  return console.log("Connection to MongoDB was Successful");
});

const router = express.Router();
router.use(express.json());
router.use(cors());

router.post("/houseListing", (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (error, fields, files) => {
    const {
      name,
      surname,
      phoneNumber,
      email,
      city,
      state,
      address,
      locality,
      sale_or_rent,
      housePrice,
      bedroomNumber,
      buildUpArea,
    } = fields; 

    const { houseImage } = files;
    console.log(houseImage,fields,files)

    Cloudinary.uploader.upload(
      houseImage.path,
      { folder: "/Assets" },
      async (error, results) => {
        console.log(results)
        console.log(error)
        const image_url = results.url;

        const newHouseListing = new House({
          owner: {
            name,
            surname,
            phoneNumber,
            email,
          },
          house_location: {
            city,
            state,
            address,
            locality,
          },
          house_properties: {
            sale_or_rent,
            housePrice,
            bedroomNumber,
            houseImage: image_url,
            buildUpArea
          },
        });
        const savedListing = await newHouseListing.save();
        return res.status(200).json(savedListing);
      }
    );
  
  });
});


router.post("/uniqueId", (req, res) => {
  const dbData = req.body;
  House.countDocuments({ user_id: dbData.user_id }, (err, count) => {
    try {
      if (count > 0) {
        res.status(200).send(count.toString())
      } else {
        House.create(dbData, (err, data) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(201).send(count.toString());
          }
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });
});

router.post("/bookmarks", async (req, res) => {
  const dbData = req.body;
  try {
    const result = await House.updateOne(
      { user_id: dbData.user_id },
      { $push: { bookmarks: dbData } },
      { upsert: true }
    );
    console.log(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/delete", async (req, res) => {
  try {
    const result = await House.updateOne(
      { user_id: dbData.user_id },
      { $pull: { bookmarks: { image: dbData.image } } }
    );
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
