const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const users = [
	{ id: 1, firstName: 'John', lastName: 'Doe', role: 'admin' },
	{ id: 2, firstName: 'Jane', lastName: 'Smith', role: 'user' },
	{ id: 3, firstName: 'Alice', lastName: 'Johnson', role: 'moderator' },
	{ id: 4, firstName: 'Bob', lastName: 'Brown', role: 'user' },
	{ id: 5, firstName: 'Charlie', lastName: 'Davis', role: 'admin' }
];

// GET : LIRE tous les utilisateurs
app.get("/users", (req, res) => {
	res.json(users);
});

// GET : LIRE un seul utilisateur en fonction de son ID
app.get("/users/:id", (req, res) => {
    // Récupérer l'ID de l'utilisateur à afficher depuis les paramètres d'URL
	const id = parseInt(req.params.id);

    // Trouver l'utilisateur avec l'ID correspondant
	const userIndex = users.findIndex((user) => user.id === id);

	// Si l'utilisateur n'est pas trouvé, retourner une erreur 404
	if (userIndex < 0) {
		return res.status(404).json({ msg: "Utilisateur non trouvé" });
	}

    // Si l'utilisateur est trouvé, renvoyer les données de l'utilisateur
	res.json(users[userIndex]);
});

// PUT : MODIFIER un utilisateur en fonction de son ID
app.put("/users/:id", (req, res) => {
    // Récupérer l'ID de l'utilisateur à modifier depuis les paramètres d'URL
	const id = parseInt(req.params.id);

    // Récupérer les données envoyées dans le corps de la requête
	const { firstName, lastName } = req.body;

    // Trouver l'utilisateur avec l'ID correspondant
	const userIndex = users.findIndex((user) => user.id === id);

	// Si l'utilisateur n'est pas trouvé, retourner une erreur 404
	if (userIndex < 0) {
		return res.status(404).json({ msg: "Utilisateur non trouvé" });
	}

    // Mettre à jour les champs qui ont été envoyés
	if (firstName) users[userIndex].firstName = firstName;
	if (lastName) users[userIndex].lastName = lastName;

    // Renvoyer une réponse avec les données mises à jour de l'utilisateur
	res.json({
		msg: "Utilisateur mis à jour",
		user: users[userIndex],
	});
});

// DELETE : SUPPRIMER un utilisateur en fonction de son ID
app.delete("/users/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const userIndex = users.findIndex((user) => user.id === id);

	// Si l'utilisateur n'est pas trouvé, retourner une erreur 404
	if (userIndex < 0) {
		return res.status(404).json({ msg: "Utilisateur non trouvé" });
	}

	// Supprimer l'utilisateur du tableau
	users.splice(userIndex, 1);

	// Renvoyer une réponse confirmant la suppression
	res.json({
		msg: "Utilisateur supprimé",
	});
});

// POST : CRÉER un nouvel utilisateur
app.post("/users", (req, res) => {
	const { firstName, lastName } = req.body;

	// Récupérer l'ID du dernier utilisateur pour générer un nouvel ID unique
	const lastId = users[users.length - 1].id;
	const newId = lastId + 1;

	// Créer un nouvel utilisateur
	const newUser = {
		id: newId,
		firstName,
		lastName,
		role: 'user', // Ajout d'un rôle par défaut
	};

	// Ajouter le nouvel utilisateur à la liste des utilisateurs
	users.push(newUser);

	// Envoyer une réponse avec un statut 201 et les données du nouvel utilisateur
	res.status(201).json(newUser);
});

// Lancement du serveur
app.listen(port, () => {
	console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
