const splashScreen = document.getElementById('splash-screen');
const menuContainer = document.getElementById('menu-container');
const btnIniciar = document.getElementById('btn-iniciar');
const btnConfiguracoes = document.getElementById('btn-configuracoes');
const btnCreditos = document.getElementById('btn-creditos');

const modalConfigs = document.getElementById('modal-configs');
const modalCreditos = document.getElementById('modal-creditos');
const btnFecharConfigs = document.getElementById('btn-fechar-configs');
const btnFecharCreditos = document.getElementById('btn-fechar-creditos');

const closeButtons = document.querySelectorAll('.close');


const splashShown = localStorage.getItem('splashShown');

if (splashShown) {
 
    splashScreen.style.display = 'none';
    menuContainer.style.display = 'flex';
} else {
  
    localStorage.setItem('splashShown', 'true');
    setTimeout(() => {
        splashScreen.style.display = 'none';
        menuContainer.style.display = 'flex';
    }, 3500); 
}


const savedVolume = localStorage.getItem('gameVolume');
const savedDifficulty = localStorage.getItem('gameDifficulty');

if (savedVolume) {
    document.getElementById('volume-slider').value = savedVolume;
}
if (savedDifficulty) {
    document.getElementById('difficulty').value = savedDifficulty;
}

btnIniciar.addEventListener('click', () => {
  
    window.location.href = './index.html';
});

btnConfiguracoes.addEventListener('click', () => {
    modalConfigs.style.display = 'block';
});

btnCreditos.addEventListener('click', () => {
    modalCreditos.style.display = 'block';
});

btnFecharConfigs.addEventListener('click', () => {
    modalConfigs.style.display = 'none';
});

btnFecharCreditos.addEventListener('click', () => {
    modalCreditos.style.display = 'none';
});

closeButtons.forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
        e.target.closest('.modal').style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target === modalConfigs) {
        modalConfigs.style.display = 'none';
    }
    if (e.target === modalCreditos) {
        modalCreditos.style.display = 'none';
    }
});

const volumeSlider = document.getElementById('volume-slider');
const difficultySelect = document.getElementById('difficulty');

volumeSlider.addEventListener('change', (e) => {
    const volume = e.target.value;
    localStorage.setItem('gameVolume', volume);
});

difficultySelect.addEventListener('change', (e) => {
    const difficulty = e.target.value;
    localStorage.setItem('gameDifficulty', difficulty);
});
