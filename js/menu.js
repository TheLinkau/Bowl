window.onload = function() {
    getRank();
}

// Affiche le top 5 des meilleurs scores de l'application
function getRank() {
    for(var i=1; i<=5; i++) {
        var item = localStorage.getItem("rank"+i);
        if(item != null) {
            player = item.split(",")[0];
            score = item.split(",")[1];
            document.getElementById("rank"+i+"-player").innerHTML = player;
            document.getElementById("rank"+i+"-score").innerHTML = score;
        }
    }
    return true;
}