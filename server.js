const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// MongoDB connection

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error);
    });


// Contact Schema

const contactSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

});


const Contact = mongoose.model("Contact", contactSchema);


// Test route

app.get("/", (req, res) => {

    res.send("Portfolio Backend is Running");

});


// Contact API

app.post("/api/contact", async (req, res) => {

    try {

        const { name, email, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            message
        });

        await newContact.save();

        res.status(201).json({
            message: "Message sent successfully!"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});