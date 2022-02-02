const http = require("http");
const finalhandler = require("finalhandler");
const serveStatic = require("serve-static");
 
// Crée une fonction middleware qui servira le contenu du dossier courant de façon statique
const serve = serveStatic("./");
 
// Création du serveur
const server = http.createServer(function(req, res) {
    serve(req, res, finalhandler(req, res)); // Traitement de la requête par le middleware
});
 
// Lancement
server.listen(8080, function() {
    console.log("Static server is up on http://localhost:8080");
});
