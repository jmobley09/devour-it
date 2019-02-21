// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
const Allcharacters = require("../model/character.js");
const Sequalize = require('sequelize');




// Routes
// =============================================================
module.exports = function(app) {

  // Search for Specific Character (or all characters) then provides JSON
  app.get("/api/:characters", function(req, res) {

    // If the user provides a specific character in the URL...
    if (req.params.characters) {

      // Then display the JSON for ONLY that character.
      // (Note how we're using the ORM here to run our searches)
      Allcharacters.findOne({
        where: {
          routeName: req.params.characters
        }
      })
    }

    // Otherwise...
    else {
      // Otherwise display the data for all of the characters.
      // (Note how we're using the ORM here to run our searches)
      Allcharacters.findAll().then(function(result) {
        return res.json(result);
      })
    }

  });

  // If a user sends data to add a new character...
  app.post("/api/new", function(req, res) {

    // Take the request...
    var character = req.body;

    // Then send it to the ORM to "save" into the DB.
    orm.addCharacter(character, function(data) {
      console.log(data);
    });

  });
};
