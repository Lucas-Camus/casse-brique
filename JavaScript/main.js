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
 * La fonction clearBall() elle, permet d'effacer la trainée laisser par l'affichage de la balle
 * Redéssine la balle à nouveau
 * Et calcul pour voir a quel moment la balle rebondit sur le "mur"
 */
function clearBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    x += dx;
    y += dy;
}

/**
 * Affichage de la balle toute les 10ms
 */
setInterval(clearBall, 10);