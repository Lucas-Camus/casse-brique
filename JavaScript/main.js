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
// Cette varibale permet de mémorise l'état des touches (touches de droite)
let rightPressed = false;
// Cette varibale permet de mémorise l'état des touches (touches de gauche)
let leftPressed = false;

/**
 * La fonction drawBall() permet de dessiner la balle
 * Lui donner la taille que l'on souhaite
 * La couleur aussi que l'on souhaite
 */
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#9f0303";
    ctx.fill();
    ctx.closePath();
}

/**
 * La fonction drawPaddle() permet de dessiner la raquette sur l'espace de jeu
 */
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#9f0303";
    ctx.fill();
    ctx.closePath();
}

/**
 * La fonction clearBall() elle, permet d'effacer la trainée laisser par l'affichage de la balle
 * Redéssine la balle à nouveau,
 * Calcul pour voir a quel moment la balle rebondit sur le "mur",
 * Et si on presse une des deux touches (droite ou gauche) déplacer la raquette de droite a gauche de 6px sans
 * pour autant que la raquette sorte du canvas.
 */
function clearBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    x += dx;
    y += dy;

    if (rightPressed) {
        paddleX += 6;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if (leftPressed) {
        paddleX -= 6;
        if (paddleX < 0){
            paddleX = 0;
        }
    }
}

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)

/**
 * La fonction keyDownHandler sert à se que lorque l'event keyDown est déclenché lors de l'appui de la
 * touche de Droite, elle est executée.
 */
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

/**
 * La fonction keyUpHandler sert à se que lorque l'event keyUp est déclenché lors de l'appui de la
 * touche de Gauche, elle est executée.
 */
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
/**
 * Affichage de la balle toute les 10ms
 */
setInterval(clearBall, 10);