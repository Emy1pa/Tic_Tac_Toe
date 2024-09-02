<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>README - Tic-Tac-Toe Game</title>
    
</head>
<body>

<h1>Tic-Tac-Toe Game</h1>

<h2>Introduction</h2>
<p>Ce projet est un jeu de morpion (Tic-Tac-Toe) en JavaScript, développé pour permettre à deux joueurs de s'affronter sur une grille de 20x20 cases. Le but du jeu est d'aligner 5 symboles identiques horizontalement, verticalement ou en diagonale. Ce jeu inclut également un système de score persistant qui utilise <code>localStorage</code> pour sauvegarder les scores des joueurs entre les sessions.</p>

<h2>Fonctionnalités</h2>
<ul>
    <li><strong>Grille 20x20</strong> : Les joueurs peuvent cliquer sur les cases pour placer leur symbole (X ou O).</li>
    <li><strong>Système de score</strong> : Les scores des joueurs sont sauvegardés et récupérés depuis <code>localStorage</code>.</li>
    <li><strong>Popup de victoire</strong> : Une fenêtre contextuelle s'affiche lorsqu'un joueur gagne.</li>
    <li><strong>Personnalisation des joueurs</strong> : Les joueurs peuvent entrer leur nom et choisir leur symbole.</li>
    <li><strong>Changement de couleur dynamique</strong> : Les informations des joueurs sont affichées dans des fenêtres contextuelles qui changent de couleur en fonction du tour du joueur.</li>
</ul>

<h2>Structure du Code</h2>

<h3>Variables Globales</h3>
<ul>
    <li><code>firstPlayer</code> et <code>secondPlayer</code> : Objets contenant le nom et le symbole de chaque joueur.</li>
    <li><code>board</code> : Un tableau représentant la grille de jeu, initialisé à 400 cases vides.</li>
    <li><code>currentPlayer</code> : Variable qui garde trace du joueur en cours.</li>
    <li><code>gamePlaying</code> : Booléen indiquant si le jeu est en cours ou non.</li>
    <li><code>conditionWin</code> : Nombre de symboles à aligner pour gagner (ici, 5).</li>
    <li><code>nameRegex</code> : Expression régulière pour valider les noms des joueurs (alphanumérique uniquement).</li>
</ul>

<h3>Fonctions</h3>

<h4>Initialisation</h4>
<div class="code-block">
    <code>getScore(name)</code> : Retourne le score du joueur depuis <code>localStorage</code>.<br>
    <code>setScore(name, score)</code> : Sauvegarde le score du joueur dans <code>localStorage</code>.<br>
    <code>updateScore(name)</code> : Incrémente le score du joueur et le sauvegarde.<br>
    <code>scoreInitialize()</code> : Initialise et retourne les scores des deux joueurs.
</div>

<h4>Configuration du Plateau</h4>
<p>Création des cellules de la grille : Une boucle génère 400 cases et ajoute un <code>eventListener</code> sur chaque cellule pour capturer les clics des joueurs.</p>

<h4>Interaction du Joueur</h4>
<div class="code-block">
    <code>cellClick(index)</code> : Gestionnaire d'événements pour les clics sur les cellules. Met à jour le symbole dans la cellule et vérifie si un joueur a gagné.<br>
    <code>updatePlayerInfo()</code> : Met à jour l'affichage des informations des joueurs (changement de couleur de fond pour indiquer le tour).<br>
    <code>checkWin(index)</code> : Vérifie si le joueur courant a gagné en alignant 5 symboles dans une direction.
</div>

<h4>Gestion des Scores</h4>
<div class="code-block">
    <code>updateScoreDisplay()</code> : Met à jour l'affichage des scores des joueurs dans les popups.<br>
    <code>showWinPopup(winnerName, newScore)</code> : Affiche une fenêtre contextuelle annonçant le gagnant et offre la possibilité de redémarrer le jeu.
</div>

<h4>Gestion des Popups</h4>
<div class="code-block">
    <code>showPopup(title, message, isFirstPlayer)</code> : Affiche un popup permettant aux joueurs de saisir leur nom et de choisir leur symbole.<br>
    <code>showPlayerInfo()</code> : Affiche les informations des joueurs (nom, symbole, score) dans des fenêtres contextuelles de chaque côté de l'écran.
</div>

<h3>Événements</h3>
<p><code>startBtn.addEventListener("click")</code> : Lancement du processus de configuration des joueurs lorsque le bouton "Start" est cliqué.</p>

<h2>Comment Jouer</h2>
<ol>
    <li><strong>Initialisation</strong> : Cliquez sur "Start" pour commencer la configuration des joueurs.</li>
    <li><strong>Saisie des joueurs</strong> : Entrez les noms des joueurs et choisissez un symbole pour le premier joueur. Le symbole du second joueur est automatiquement attribué.</li>
    <li><strong>Jeu</strong> : Cliquez sur les cases de la grille pour placer vos symboles. Le jeu s'alterne entre les deux joueurs.</li>
    <li><strong>Victoire</strong> : Le jeu détecte automatiquement la victoire lorsqu'un joueur aligne 5 symboles, horizontalement, verticalement ou en diagonale. Le score du gagnant est mis à jour et affiché dans un popup.</li>
    <li><strong>Redémarrage</strong> : Cliquez sur "Restart Game" dans le popup pour relancer une nouvelle partie.</li>
</ol>

<h2>Technologies Utilisées</h2>
<ul>
    <li><strong>HTML/CSS</strong> : Structure de la page et styles.</li>
    <li><strong>JavaScript</strong> : Logique du jeu, gestion des événements, et interaction avec <code>localStorage</code> pour la persistance des données.</li>
</ul>

<h2>Améliorations Possibles</h2>
<ul>
    <li><strong>Personnalisation de la grille</strong> : Ajouter une option pour changer la taille de la grille.</li>
    <li><strong>Mode multi-joueurs en ligne</strong> : Permettre à des joueurs de s'affronter en ligne.</li>
    <li><strong>Animations</strong> : Ajouter des animations pour rendre le jeu plus interactif.</li>
</ul>

</body>
</html>
