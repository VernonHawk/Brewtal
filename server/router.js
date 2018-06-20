"use strict";

const router = require("express").Router();

const { getIngredients } = require("./controllers/ingredientsController");

router.get("/ingredients", getIngredients);

module.exports = router;