"use strict";

const router = require("express").Router();

const { getIngredients } = require("./controllers/ingredientsController");
const { getCocktail } = require("./controllers/cocktailController");

router.get("/ingredients", getIngredients);
router.get("/cocktail", getCocktail);

module.exports = exports = router;