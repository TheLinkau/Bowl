# Projet Bowling  

## I/ Rôle de chaque membre du groupe

Léo ANDRIANTSIZAFY : Chargé des paramètres de configuration (nombre et nom des joueurs)  
Théo DABIN : Chargé de l’affichage de la page principal  
Toufik HAS : Chargé de l’affichage du tableau des scores  
Jean-Yves LEGRAS : Chargé de la gestion de projet  
Nathan MERIGEAU : Chargé de la logique mathématique

## II/ Environnement de travail

Le projet consiste en une application de suivi du score d’une partie de bowling.  
Dans l’optique d’être disponible à tout moment et sur tout support, nous avons choisi de partir sur une interface web (codé en HTML/CSS (avec Bootstrap en plus comme framework) et JavaScript (+ Node.js)).  
Pour l’intégration continue et les tests, nous avons décidé d’utiliser la fonctionnalité intégrée nativement dans GitHub avec comme Mochha comme framework de test (Node.js).

## III/ Méthode de gestion de projet

Pour ce qui est de la méthode de gestion de projet, nous avons choisi l’outil de ticketing intégré dans GitHub.
Après avoir divisé le projet en sous-tâche, chaque sous-tâche a pu être attribué aux personnes du groupe via les tickets et l’outil projet de GitHub (qui nous a également permis de suivre l’avancement de chacun des tickets au fil du temps).  
Enfin, la méthode agile a été choisi pour la gestion du projet avec des sprints qui se concluait par un rendu au client avec retour de sa part au prochain sprint  
Une réunion a été organisé avec le client en début de projet pour clarifier ses attentes et deux autres réunions en interne ont été faites en début de sprint pour se mettre d'accord sur le chemin à suivre (cela ne compte évidemment pas les multiples échnages en continu que nous avons en interne pour s'accorder au fil du projet
Date des sprints :  
03/01 au 05/01 : 1er sprint  
02/02 au 04/02 : 2ème et dernier sprint

## IV/ Réunion de rétrospective

Point positifs :
####
* Le travail en présentiel a été efficace avec une bonne communication
* La répartition des tâches a été cohérente et a permis à chacun d'avancer de son côté sans impacter l'avancement des autres

Points négatifs : 
#### 
* Pas d'accord préalable sur les normes d'import/export de js, un mixte de normes a conduit à des erreurs de compilation et de tests.
* Nous avons choisi un environnement de travail non maitrisé, ce qui nous as fait perdre beaucoup de temps sur un projet assez court

Propositions de solutions pour les points négatifs :
####
* Avoir plus de cohésion et faire plus de commit pour rassembler plus rapidemment le travail de tout le monde
* Plus d'explications sur les méthodes utilisés pour que tout le monde utilise les mêmes

## IV/ Commentaire Enseignant
Le travail a presque été trop répartie, spécialisant chacune des personnes et pouvant mettre à mal le projets si l'un des participant était tombé malade par exemple.
L'intégration du travail de chacun n'a pas été continue et à engendré beaucoup de tension lors de la première intégration qui a amené une première version testable par une utilisateur que beaucoup trop tard dans le projet. Si j'avais attendu la première version testable j'aurais fait mes premiers retour beaucoup trop tard pour qu'ils puissent être intégré dans la version finale. Le but de la méthodologie est de faire des erreurs pour les comprendre et ne plus les refaire. Les erreurs ont été plutôt bien analysées et corrigées sur la toute fin du projets.

Le code est plutôt bien commenté même si il y a des commentaires inutile, d'autre pas à jours (des commentaires font référence à 10 quilles) et certains énigmatiques:
ex: //On rempli les variables
    this.addCoups(nbQuille);
    if(this.numTour >= this.nbTourMax)
      this.finJeu = true;
      
Les histoires sont à peine définies, et ne sont même pas fermées dans le gestionnaires de projets.      

Beaucoup de commit avec un message inexplicite ("update fichier", voir "commit")


