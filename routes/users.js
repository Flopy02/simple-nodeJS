const express = require("express")
const router = express.Router()
const { getAllUsers,createNewUser } = require("../controllers/usersControllers")

const db = require("../database")

// GET METHOD
router.get("/users",getAllUsers)

// POST : CRÉER un nouvel utilisateur
router.post("/users",createNewUser )

// PUT : MODIFIER un utilisateur en fonction de son ID
router.put("/users/:id", (req, res) => {
    // Récupérer l'ID de l'utilisateur à modifier depuis les paramètres d'URL
	//const id = parseInt(req.params.id);

    // Récupérer les données envoyées dans le corps de la requête
	//const { firstName, lastName } = req.body;

    // Trouver l'utilisateur avec l'ID correspondant
	//const userIndex = users.findIndex((user) => user.id === id);

	// Si l'utilisateur n'est pas trouvé, retourner une erreur 404
	//if (userIndex < 0) {
		//return res.status(404).json({ msg: "Utilisateur non trouvé" });
	//}

    // Mettre à jour les champs qui ont été envoyés
	//if (firstName) users[userIndex].firstName = firstName;
	//if (lastName) users[userIndex].lastName = lastName;

    // Renvoyer une réponse avec les données mises à jour de l'utilisateur
	//res.json({
		//msg: "Utilisateur mis à jour",
		//user: users[userIndex],
	//});
});

// DELETE : SUPPRIMER un utilisateur en fonction de son ID
router.delete("/users/:id", (req, res) => {
	//const id = parseInt(req.params.id);
	//const userIndex = users.findIndex((user) => user.id === id);

	// Si l'utilisateur n'est pas trouvé, retourner une erreur 404
	//if (userIndex < 0) {
		//return res.status(404).json({ msg: "Utilisateur non trouvé" });
	}

	// Supprimer l'utilisateur du tableau
	//users.splice(userIndex, 1);

	// Renvoyer une réponse confirmant la suppression
	//res.json({
		///msg: "Utilisateur supprimé",
	//});
//
);




module.exports = router