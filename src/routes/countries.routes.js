const {Router} = require("express");
const { getCountries, getCountryById, createCountry, updateCountry, deleteCountry } = require("../controllers/countries.controller");
const { verifyJWT } = require("../middlewares/verifyJWT");
const { verifyAdminRole } = require("../middlewares/verifyAdminRole");
const router = Router();

router.get("/", [verifyJWT], getCountries);
router.get("/:id", [verifyJWT, verifyAdminRole], getCountryById);
router.post("/", createCountry);
router.put("/:id", updateCountry);
router.delete("/:id", deleteCountry);


module.exports = router;