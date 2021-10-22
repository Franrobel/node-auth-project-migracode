
const express = require("express");
const bcrypt = require("bcrypt");   // bcrypt is used to hash password before saving it to database
const fs = require("fs");   // fs is node's inbuilt file system module used to manage files

const usersDb = require("../database/db.json");   // import existing data from db.json file
const generateJWT = require("../utils/generateJWT");
const router = express.Router();   // we create a new router using express's inbuilt Router method

// user registration / sign-up
router.post("/sign-up", async (req, res) => {
  const {  name, email, password } = req.body; // deconstruct namee email password in body
  try {
    const user = await usersDb.filter(user => user.email === email); // si el usuario que se registra tiene el mismo mail que uno que ya esta en el body.
                                                                    //  en este caso es el primero no va a dar res.status(404)
    if (user.length > 0) {
      return res.status(400).json({error: "User already exist!"});
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt); //

    let newUser = {
      id: usersDb.length,
      name: name, // el que declare en  const {  name, email, password } = req.body  
      email: email,
      password: bcryptPassword// --> bcrypt.hash(password, salt); declarada antes
    }

    usersDb.push(newUser);  // we add newUser to usersDb array


    // we save the updated array to db.json file by using fs module of node
    
    await fs.writeFileSync('./database/db.json', JSON.stringify(usersDb));

    
    /* Once the user registration is done successfully, we will generate a
      jsonwebtoken and send it back to user. This token will be used for
      accessing other resources to verify identity of the user.
      
      The following generateJWT function does not exist till now but we
      will create it in the next step. */
    
    const jwtToken = generateJWT(newUser.id);

    return res.status(201).send({ jwtToken: jwtToken, isAuthenticated: true});

  } catch (error) {
      console.log(error)
    console.error(error.message);
    res.status(500).send({error: error.message});
  }
});


module.exports = router;   // we need to export this router to implement it inside our server.js file