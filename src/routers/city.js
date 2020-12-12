const express = require("express")
const {City} = require("./../models/city")
const router = express.Router()

router.get("/city", async (req, res) => {
    res.render("cities.hbs")
})

router.get("/cities", async (req, res) => {
    try {
        const cities = await City.find()
        res.status(200).send({cities});
    } catch(error) {
        res.status(401).send(error.message);
    }
})

router.get("/cities/:id", async (req, res) => {
    try{
        let city = await City.findById(req.params.id);
        res.status(200).send(city);
    } catch(error) {
        res.send(error.message);
    }
})

router.post("/cities", async (req, res) => {
    try {
        const city = new City(req.body.city)
        await city.save()
        res.status(201).send(city)
    } catch (error) {
        res.status(401).send(error.message)
    }
})

router.put('/cities', async (req, res) => {
    try {
        const city = await City.findById(req.body.id);
        if (!city) {
            return res.status(404).send();
        }
        if (req.body.city.name) {
            city.name = req.body.city.name;
        }
        if (req.body.city.name_ua) {
            city.name_ua = req.body.city.name_ua;
        }
        await city.save();
        res.status(200).send(city);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/cities/:id', async (req, res) => {
    try {
        const city = await City.findByIdAndDelete(req.params.id);
        if (!city) {
            return res.status(404).send();
        }
        res.status(200).send(city);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


module.exports = router;