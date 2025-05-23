print('Start MongoDB initialization');

// Connexion à la base de données
db = db.getSiblingDB('todo_db');

// Création de la collection todos si elle n'existe pas
try {
  db.createCollection('todos');
  print('Collection "todos" créée avec succès');

  // Insertion d'un exemple de tâche
  db.todos.insertOne({
    text: "Exemple de tâche Docker",
    completed: false,
    createdAt: new Date()
  });
  print('Tâche exemple ajoutée');

  // Création d'un utilisateur dédié à l'application
  db.createUser({
    user: "todoapp",
    pwd: "todopassword",
    roles: [{ role: "readWrite", db: "todo_db" }]
  });
  print('Utilisateur todoapp créé');
} catch (error) {
  print('Erreur durant l\'initialisation: ' + error);
}

print('MongoDB initialization completed');