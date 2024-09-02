Tic-Tac-Toe Game
Introduction
Ce projet est un jeu de morpion (Tic-Tac-Toe) en JavaScript, développé pour permettre à deux joueurs de s'affronter sur une grille de 20x20 cases. Le but du jeu est d'aligner 5 symboles identiques horizontalement, verticalement ou en diagonale. Ce jeu inclut également un système de score persistant qui utilise localStorage pour sauvegarder les scores des joueurs entre les sessions.

Fonctionnalités
Grille 20x20 : Les joueurs peuvent cliquer sur les cases pour placer leur symbole (X ou O).
Système de score : Les scores des joueurs sont sauvegardés et récupérés depuis localStorage.
Popup de victoire : Une fenêtre contextuelle s'affiche lorsqu'un joueur gagne.
Personnalisation des joueurs : Les joueurs peuvent entrer leur nom et choisir leur symbole.
Changement de couleur dynamique : Les informations des joueurs sont affichées dans des fenêtres contextuelles qui changent de couleur en fonction du tour du joueur.
Structure du Code
Variables Globales
firstPlayer et secondPlayer : Objets contenant le nom et le symbole de chaque joueur.
board : Un tableau représentant la grille de jeu, initialisé à 400 cases vides.
currentPlayer : Variable qui garde trace du joueur en cours.
gamePlaying : Booléen indiquant si le jeu est en cours ou non.
conditionWin : Nombre de symboles à aligner pour gagner (ici, 5).
nameRegex : Expression régulière pour valider les noms des joueurs (alphanumérique uniquement).
Fonctions
Initialisation
getScore(name) : Retourne le score du joueur depuis localStorage.
setScore(name, score) : Sauvegarde le score du joueur dans localStorage.
updateScore(name) : Incrémente le score du joueur et le sauvegarde.
scoreInitialize() : Initialise et retourne les scores des deux joueurs.
Configuration du Plateau
Création des cellules de la grille : Une boucle génère 400 cases et ajoute un eventListener sur chaque cellule pour capturer les clics des joueurs.
Interaction du Joueur
cellClick(index) : Gestionnaire d'événements pour les clics sur les cellules. Met à jour le symbole dans la cellule et vérifie si un joueur a gagné.
updatePlayerInfo() : Met à jour l'affichage des informations des joueurs (changement de couleur de fond pour indiquer le tour).
checkWin(index) : Vérifie si le joueur courant a gagné en alignant 5 symboles dans une direction.
Gestion des Scores
updateScoreDisplay() : Met à jour l'affichage des scores des joueurs dans les popups.
showWinPopup(winnerName, newScore) : Affiche une fenêtre contextuelle annonçant le gagnant et offre la possibilité de redémarrer le jeu.
Gestion des Popups
showPopup(title, message, isFirstPlayer) : Affiche un popup permettant aux joueurs de saisir leur nom et de choisir leur symbole.
showPlayerInfo() : Affiche les informations des joueurs (nom, symbole, score) dans des fenêtres contextuelles de chaque côté de l'écran.
Événements
startBtn.addEventListener("click") : Lancement du processus de configuration des joueurs lorsque le bouton "Start" est cliqué.
Comment Jouer
Initialisation : Cliquez sur "Start" pour commencer la configuration des joueurs.
Saisie des joueurs : Entrez les noms des joueurs et choisissez un symbole pour le premier joueur. Le symbole du second joueur est automatiquement attribué.
Jeu : Cliquez sur les cases de la grille pour placer vos symboles. Le jeu s'alterne entre les deux joueurs.
Victoire : Le jeu détecte automatiquement la victoire lorsqu'un joueur aligne 5 symboles, horizontalement, verticalement ou en diagonale. Le score du gagnant est mis à jour et affiché dans un popup.
Redémarrage : Cliquez sur "Restart Game" dans le popup pour relancer une nouvelle partie.
Technologies Utilisées
HTML/CSS : Structure de la page et styles.
JavaScript : Logique du jeu, gestion des événements, et interaction avec localStorage pour la persistance des données.
