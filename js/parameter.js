// Called quand on clique sur le bouton d'ajout d'un joueur
function addPlayer() {
    var input = document.getElementById("playerName"); // On récupère la liste de joueurs <ul>
    if (input.value) { // S'il y un nom dans le champ
        var li = document.createElement("li"); // On crée un nouveau <li>
        li.className = "list-group-item bg-appli text-light float-left";
        li.textContent = input.value; // Avec le nom du joueur

        // Bouton permettant de supprimer le <li>
        var button = document.createElement("button");
        button.addEventListener('click', function() {
            document.getElementById("players").removeChild(this.parentElement);
        });
        button.textContent = "x";
        button.className = "btn btn-danger float-right";

        li.appendChild(button); // On ajouter le bouton au <li>
        document.getElementById("players").appendChild(li);
        input.value = null;
        return true;
    } else { // On prévient user si pas de nom et on fait rien
        // Alert ne fonctionne pas pour les tests mocha
        window.alert("Veuillez entrer un nom de joueur !");
        return false;
    }
}

// Called quand on clique sur JOUER
function sendPlayers() {
    var players = [];
    var childs = document.getElementById("players").childNodes; // On récupère la liste <ul>
    for (var i = 1; i < childs.length; i++) { // Pour chaque <li> (joueur)
        players.push(childs[i].firstChild.nodeValue); // On récupère le nom
    }
    if (players.length > 0) { // Si on a des joueurs
        window.sessionStorage.setItem('playersNames', players); // On les stock dans les cookies pour les récupérer dans game
        window.location.href = "game.html" // Go game.html
        return true;
    } else {
        alert('Il doit y avoir au moins un joueur !'); // On averti user qu'il n'y a pas de joueurs et on fait rien
        return false;
    }
}

module.exports = {
    addPlayer,
    sendPlayers
};