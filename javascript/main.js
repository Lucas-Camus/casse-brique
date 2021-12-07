// Cette variable permet d'enregistrer de la référence à l'élément <canvas> dans une variable <canvas>
const canvas = document.getElementById("casse-brique");

// Stockage du contexte de rendu 2D
const ctx = canvas.getContext("2d");

// Rayon du cercle dessiné
const ballRadius = 10;

// Définition de la position de la balle
let x = canvas.width/2;

// Définition de la position de la balle
let y = canvas.height-30;

// Cette variable correspond a la vitesse de déplacement et de la direction de la balle sur l'axe horizontal
let dx = 2;

// Cette variable correspond a la vitesse de déplacement de de la direction de la balle sur l'axe vertical
let dy = -2;

// Cette variable correspond a la hauteur de la raquette contrôlable
const paddleHeight = 10;

// Cette variable correspond a la largeur de la raquette contrôlable
const paddleWidth = 75;

// Cette variable définis le point de départ de la raquette sur l'axe des X
let paddleX = (canvas.width-paddleWidth)/2;

// Cette varibale permet de mémorise l'état des touches (fleche de droite ou touche D)
let rightPressed = false;

// Cette varibale permet de mémorise l'état des touches (fleche de gauche ou touche Q)
let leftPressed = false;

// Variable pour la couleur de la balle
let ballColor = "#000000";

// Variable pour la couleur de la raquette
let paddleColor = "#9f0303";

// Variable pour la couleur des briques
let bricksColor = "#9f0303";

// Variable pour la couleur du score
let scoreColor = "#000000";

// Variable pour la couleure du level
let levelColor = "#000000";

// Variable pour la couleure du compteur de vies
let livesColor = "#000000";

// Variable pour la vitesse de déplacement de la raquette de 6px (vers la Droite ou vers la Gauche)
let paddleMovement = 6;

// Cette variable permet de définir le nombre de ligne de briques pour le level 2
const brickRowLevel1 = 3;

// Cette variable permet de définir le nombre de colonne de briques pour le level 2
const brickColumnLevel1 = 11;

// Cette variable permet de définir le nombre de ligne de briques pour le level 2
const brickRowLevel2 = 5;

// Cette variable permet de définir le nombre de colonne de briques pour le level 2
const brickColumnLevel2 = 11;

// Cette variable permet de définir le nombre de colonne de briques pour le level 2
const brickRowLevel3 = 7;

// Cette variable permet de définir le nombre de colonne de briques pour le level 2
const brickColumnLevel3 = 11;

// Cette variable permet de définir le nombre de colonne de briques pour le level 1
let brickColumnCount = brickColumnLevel1;

// Cette variable permet de définir le nombre de ligne de briques pour le level 1
let brickRowCount = brickRowLevel1;

// Cette variable permet de définir la largeur de chaque briques
let brickWidth = 75;

// Cette variable permet de de définir la hauteur de chaque briques
let brickHeight = 20;

// Cette variable permet de définir la grosseur de chaque briques
let brickPadding = 10;

// Cette variable permet de définir la marge en haut des briques
let brickOffsetTop = 30;

// Cette variable permet de définir la marge sur le côté gauche
let brickOffsetLeft = 17;

// Variable qui permet de stocker le score
let score = 0;

// Cette variable stock la font ainsi que la taille de l'écriture
const font = "16px Arial";

// Variable pour le compteur de vie
let lives = 3;

// Variable pour les levels
let level = 1;

// Cette contient un tableau de bricks vide
let bricks = [];

/**
 * Cette fonction contient un tableau vide a deux dimensions :
 * - une qui contiendra les colonnes de briques (c)
 * - une qui contiendra les lignes de briques (r)
 * Et on ferra une boucle a l'intérieur de ces deux dimensions pour incrémenter le
 * nombre de colonnes et de lignes qu'il faut.
 * Avec les bonnes "coordonnées" (x et y) de chaque briques
 * @param column
 * @param row
 * @returns {*}
 */
function setUpBricks(column, row) {
    let newBricks = [];
    for(let c=0; c<column; c++) {
        newBricks[c] = [];
        for(let r=0; r<row; r++) {
            newBricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

    return newBricks;
}
bricks = setUpBricks(brickColumnCount, brickRowCount);


/**
 * Cette fonction permet de faire reset la balle
 * (Center en bas du canvas)
 */
function resetBall() {
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 2;
    dy = -2;
    paddleX = (canvas.width - paddleWidth) / 2;
}
/**
 * Cette fonction collisionDetection() permet de détecter a quel moment la
 * balle rentre en collision avec les briques
 * En calculant si la position X de la balle est supérieur a la position X de la brique
 * ET si la position X des la balle est inférieur a la position X de la brique + sa largeur
 * ET si la position Y de la balle est supérieur a la position Y de la brique
 * ET si la position Y de la balle est inférieur a la position Y de la brique + sa hauteur
 * On lui dit ensuite que le "statut" de chaque brique est de zéro (pas de collision, en cas de collision le statut
 * passera a 1)
 * On incrémente de 1 à chaque brique détruite
 * Et si toutes les briques du plateau ont été détruites, on affichera le message présent dans l'alert
 */
function collisionDetection() {
    for(let c=0; c<brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status === 1) {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score === brickRowCount * brickColumnCount){
                        alert("Bravo ! Vous avez détruit toutes les briques !");
                        level++;
                        switch(level){
                            case 2:
                                score = 0;
                                brickColumnCount = brickColumnLevel2;
                                brickRowCount = brickRowLevel2;
                                bricks = setUpBricks(brickColumnCount, brickRowCount);
                                resetBall();
                                bricksColor = "#00a0ff";
                                paddleColor = "#beb000";
                                ballColor = "#beb000";
                                break;
                            case 3:
                                score = 0;
                                brickColumnCount = brickColumnLevel3;
                                brickRowCount = brickRowLevel3;
                                bricks = setUpBricks(brickColumnCount, brickRowCount);
                                resetBall();
                                scoreColor = "#c03e00";
                                levelColor = "#c03e00";
                                livesColor = "#c03e00";
                                bricksColor = "#000000";
                                paddleColor = "#c03e00";
                                ballColor = "#c03e00";
                                break;
                            default:
                                alert("champion du monde!!!!!!!");
                                return document.location.reload();
                        }
                    }
                }
            }
        }
    }
}

/**
 * La fonction drawSrore() permet d'afficher/calculer le score de notre partie en cours
 */
function drawScore() {
    ctx.font = font;
    ctx.fillStyle = scoreColor;
    ctx.fillText("Score: "+score, 8, 20);
}

/**
 * La fonction drawLevel() permet d'afficher le level auquel on se trouve
 */
function drawLevel() {
    ctx.font = font;
    ctx.fillStyle = levelColor;
    ctx.fillText("Level: "+level, canvas.width-500, 20);
}

/**
 * La fonction drawlives() permet d'afficher le nombre de vie de joueur en au droite du canvas
 */
function drawLives() {
    ctx.font = font;
    ctx.fillStyle = livesColor;
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}
/**
 * La fonction drawBall() permet de dessiner la balle
 * Lui donner la taille que l'on souhaite
 * La couleur aussi que l'on souhaite
 */
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

/**
 * La fonction drawPaddle() permet de dessiner la raquette sur l'espace de jeu
 */
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = paddleColor;
    ctx.fill();
    ctx.closePath();
}

/**
 * La fonction drawBricks() permet d'afficher toutes les briques,
 * en parcourant le deux dimensions du tableau avec des for et en donnant
 * aux briques des coordonnées précise
 * leurs taille et leurs couleur
 */
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = bricksColor;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

/**
 * La fonction padBall() elle, permet d'effacer la trainée laisser par l'affichage de la balle
 * Redéssine la balle à nouveau,
 * Déssine le Score,
 * Déssine le nb de vies restantes,
 * Déssine les bricks,
 * Déssine la raquette,
 * Calcul pour voir a quel moment la balle rebondit sur le "mur",
 * Et si on presse une des deux touches (droite ou gauche) déplacer la raquette de droite a gauche de 6px sans
 * pour autant que la raquette sorte du canvas.
 * Et pour finir, décrémente le nombre de vies quand la balles touches le bas du canvas
 */
function padBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScore();
    drawLevel();
    drawLives();
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                resetBall();
            }
        }
    }
/**
 * Lorsque j'appui sur la touche de droite, je déplace mon paddle vers la droite,
 * si le point de départ du paddle + la largeur du paddle, est supérieur a la largeur de mon canvas, alors la raquette va sortir,
 * donc je replace le paddle, a la position largeur du canvas moins largeur du paddle.
 */
    if (rightPressed) {
        paddleX += paddleMovement;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
/**
 * Lorsque j'appui sur la touche de gauche, je déplace mon paddle vers la gauche,
 * si le point de départ du paddle est inférieur à 0 , je place le paddle en position 0.
 */
    else if (leftPressed) {
        paddleX -= paddleMovement;
        if (paddleX < 0){
            paddleX = 0;
        }
    }
    x += dx;
    y += dy;
    requestAnimationFrame(padBall);
}

/**
 * La fonction keyDownHandler sert à se que lorque l'event keyDown est déclenché (lorsque l'on appui sur
 * les touches de Droite ou de Gauche), elle est executée.
 */
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "q") {
        leftPressed = true;
    }
}

/**
 * La fonction keyUpHandler sert à se que lorque l'event keyUp est déclenché (lorsque l'on appui plus sur
 * les touches de Droite ou de Gauche), elle est executée.
 */
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft" || e.key == "q") {
        leftPressed = false;
    }
}

/**
 * la fonction mouseMoveHandler sert à se que lorsque l'event mouseMove est déclenché (lorque l'on bouge la souris)
 * , elle est executée.
 */
function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)
document.addEventListener("mousemove", mouseMoveHandler, false);
/**
 * Affichage de la balle toute les 10ms
 */
padBall();