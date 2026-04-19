const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const goomba = document.querySelector('.goomba');
const flag = document.getElementById('flag');
const timerDisplay = document.getElementById('timer');
const coinsDisplay = document.getElementById('coins');

let goombaDefeated = false;
let goombaMovingRight = false; // Controle simples de direção
let goombaStarted = false; // Controla se goomba já começou
let canCollideWithPipe = true; // Delay para evitar colisão múltipla com pipe
let lastMarioHeight = 0; // Rastreia a altura anterior do Mario
let goombaX = window.innerWidth; // Posição X do goomba (começa fora da tela)
let coins = 0; // Contador de moedas
let gameStartTime = Date.now(); // Momento em que o jogo começou
let gameActive = true; // Flag para saber se o jogo está rodando
let gameWon = false; // Flag para saber se o jogo foi vencido
let flagShown = false; // Flag para controlar se a bandeira já foi mostrada

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

const loop = setInterval(() => {
    // Atualizar timer em metros (100 metros = 25 segundos)
    if (gameActive && !gameWon) {
        const elapsedTime = (Date.now() - gameStartTime) / 1000;
        const metros = Math.floor((elapsedTime / 25) * 100);
        timerDisplay.textContent = metros;
        
        // Quando atinge 100 metros, mostrar a bandeira (mas continuar o jogo)
        if (metros >= 100 && !flagShown) {
            flagShown = true;
            flag.style.display = 'block';
            flag.style.animation = 'flag-entrance 2s ease-out forwards';
        }
    }

    const pipePosition = pipe.offsetLeft;
    const goombaPosition = goomba.offsetLeft;
    const flagPosition = flagShown ? flag.offsetLeft : window.innerWidth + 500;
    // Pega a altura exata do Mario a cada frame
    const marioPosition = parseFloat(window.getComputedStyle(mario).bottom);
    const marioLeft = mario.offsetLeft;
    const marioWidth = mario.offsetWidth;
    const goombaWidth = goomba.offsetWidth;
    const flagWidth = flagShown ? flag.offsetWidth : 0;
    
    const hitboxMarioLeft = marioLeft + 40; 
    const hitboxMarioRight = marioLeft + marioWidth - 40; 
    const isHorizontalOverlap = hitboxMarioRight > goombaPosition && hitboxMarioLeft < (goombaPosition + goombaWidth);
    const isPipeGoombaOverlap = goombaPosition < pipePosition + 110 && goombaPosition + goombaWidth > pipePosition;
    const isFlagOverlap = hitboxMarioRight > flagPosition && hitboxMarioLeft < (flagPosition + flagWidth) && marioPosition < 150;

    if (!goombaStarted && goombaPosition > -100 && goombaPosition < window.innerWidth) {
        goombaStarted = true;
        canCollideWithPipe = true; 
        goomba.style.right = '-50px'; 
        goomba.style.left = 'auto'; 
        goomba.style.animation = 'goomba-animation 2s infinite linear';
    }

    if (gameActive && flagShown && !gameWon && hitboxMarioRight > flagPosition && hitboxMarioLeft < (flagPosition + flagWidth)) {
        gameWon = true;
        gameActive = false;
        pipe.style.animation = 'none';
        goomba.style.animation = 'none';
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
        
        clearInterval(loop);
        setTimeout(() => mostrarGameOver(true), 500);
        return;
    }

    if (!goombaDefeated && isPipeGoombaOverlap && !goombaMovingRight && goombaStarted && canCollideWithPipe) {
        goombaMovingRight = true;
        canCollideWithPipe = false;
        goomba.style.animation = 'none';
        goomba.style.left = goombaPosition + 'px';
        goomba.style.right = 'auto';
        goomba.style.transform = 'scaleX(-1)';
    }

    if (!goombaDefeated && goombaMovingRight && goombaStarted) {
        let goombaLeft = parseFloat(goomba.style.left);
        if (isNaN(goombaLeft)) goombaLeft = goombaPosition;
        goombaLeft += 8;
        goomba.style.left = goombaLeft + 'px';

        if (goombaLeft > window.innerWidth) {
            goombaMovingRight = false;
            goomba.style.left = 'auto';
            goomba.style.right = '-50px';
            goomba.style.transform = 'scaleX(1)';
            goomba.style.animation = 'goomba-animation 2s infinite linear';
            canCollideWithPipe = true;
            goombaStarted = false;
        }
    }

    if (pipePosition <= 120 && pipePosition >= 0 && marioPosition < 70) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        goomba.style.animation = 'none';
        goomba.style.left = `${goombaPosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '95px';
        mario.style.marginLeft = '50px';

        gameActive = false;
        clearInterval(loop);
        setTimeout(() => mostrarGameOver(false), 500);
        
    } else if (isHorizontalOverlap && !goombaDefeated && goombaStarted) {
        
      
        if (lastMarioHeight >= 60 && marioPosition < 60 && marioPosition >= 0) {
            goombaDefeated = true;
            coins++; 
            coinsDisplay.textContent = coins; 
            
            goomba.style.left = window.getComputedStyle(goomba).left;
            goomba.style.right = 'auto';
            
            goomba.src = './images/moeda.gif';
            goomba.style.animation = 'coin-float 1s ease-out';
            goomba.style.width = '30px';
            goomba.style.transform = 'scaleX(1)';

            setTimeout(() => {
                goomba.style.display = 'none';
                
                setTimeout(() => {
                    goomba.src = './images/Goomba.gif';
                    goomba.style.animation = 'none';
                    goomba.style.width = '70px';
                    goomba.style.left = 'auto'; 
                    goomba.style.right = '-50px'; 
                    goomba.style.display = 'block';
                    goomba.style.transform = 'scaleX(1)';
                    goombaMovingRight = false;
                    goombaDefeated = false;
                    goombaStarted = false;
                    canCollideWithPipe = true;
                    
                    void goomba.offsetWidth; 
                    setTimeout(() => {
                        goomba.style.animation = 'goomba-animation 2s infinite linear';
                    }, 10);
                }, 500);
            }, 1000);
        } else if (marioPosition < 0 || (lastMarioHeight < 60 && marioPosition < 60)) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            goomba.style.animation = 'none';
            goomba.style.left = `${goombaPosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = './images/game-over.png';
            mario.style.width = '95px';
            mario.style.marginLeft = '50px';

            gameActive = false;
            clearInterval(loop);
            setTimeout(() => mostrarGameOver(false), 500);
        }
    }
    lastMarioHeight = marioPosition;
}, 10);

document.addEventListener('keydown', jump);

function mostrarGameOver(vitoria) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
        cursor: pointer;
    `;
    
    if (vitoria) {
        const imgVitoria = document.createElement('img');
        imgVitoria.src = './images/vitoria.png';
        imgVitoria.style.cssText = `
            width: 50%;
            max-width: 600px;
            height: auto;
            object-fit: contain;
        `;
        overlay.appendChild(imgVitoria);
    } else {
        const imgGameOver = document.createElement('img');
        imgGameOver.src = './images/tela-game-over.gif';
        imgGameOver.style.cssText = `
            width: 50%;
            max-width: 600px;
            height: auto;
            object-fit: contain;
        `;
        overlay.appendChild(imgGameOver);
    }
    
    overlay.addEventListener('click', () => {
        window.location.href = './menu.html';
    });
    
    document.body.appendChild(overlay);
}