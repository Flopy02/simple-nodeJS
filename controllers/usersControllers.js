const db = require("../database");

exports.getAllUsers = function (req, res) {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
};

exports.createNewUser = (req, res) => {
    const { firstName, lastName } = req.body;

    // Vérifier si firstName ou lastName sont manquants
    if (!firstName || !lastName) {
        return res.status(400).json({ error: "Le prénom et le nom de famille sont requis !" });
    }

    // Ajouter des validations supplémentaires
    function isAlphanumeric(str) {
        const regex = /^[a-zA-Z0-9]+$/;
        return regex.test(str);
    }

    if (typeof firstName !== "string" || typeof lastName !== "string") {
        return res.status(400).json({ error: "Le prénom et le nom de famille doivent être des chaînes de caractères !" });
    }

    if (!isAlphanumeric(firstName) || !isAlphanumeric(lastName)) {
        return res.status(400).json({ error: "Le prénom et le nom de famille ne doivent contenir que des caractères alphanumériques !" });
    }

    // Insertion dans la base de données
    db.run(
        "INSERT INTO users (firstName, lastName) VALUES (?, ?)",
        [firstName, lastName],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json({
                    msg: "Nouvel utilisateur ajouté",
                    newUser: {
                        id: this.lastID,
                        firstName,
                        lastName,
                    },
                });
            }
        }
    );
};
