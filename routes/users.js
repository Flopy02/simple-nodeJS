const express = require("express")
const router = express.Router()
const { getAllUsers,createNewUser,updateUser,deleteUser } = require("../controllers/usersControllers")

const db = require("../database")

// GET METHOD
router.get("/users",getAllUsers)

// POST : CRÉER un nouvel utilisateur
router.post("/users",createNewUser )
// PUT : MODIFIER un utilisateur en fonction de son ID
router.put("/users/:id", updateUser)
// DELETE : SUPPRIMER un utilisateur en fonction de son ID
router.delete("/users/:id", deleteUser)




module.exports = router