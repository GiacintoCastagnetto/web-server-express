const {Router} = require("express");
const { getCountries, createCountry, updateCountry, deleteCountry } = require("../controllers/countries.controller");
const router = Router();

router.get("/", getCountries);
router.post("/", createCountry);
router.put("/", updateCountry);
router.delete("/", deleteCountry);


module.exports = router;