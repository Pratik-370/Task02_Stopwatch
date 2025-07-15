let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 1;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

// Create floating particles
function createParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position and size
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        // Random color
        const colors = ['#ff6b6b', '#4ecdc4', '#ffbe0b', '#fb5607'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
    
    // Add animation effect
    display.style.transform = 'scale(1.05)';
    setTimeout(() => {
        display.style.transform = 'scale(1)';
    }, 100);
}

function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        isRunning = true;
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    updateDisplay();
    lapsContainer.innerHTML = '';
    lapCount = 1;
}

function recordLap() {
    if (isRunning) {
        const lapTime = elapsedTime;
        const lapItem = document.createElement('div');
        lapItem.classList.add('lap-item');
        lapItem.innerHTML = `
            <span>Lap ${lapCount}</span>
            <span>${formatTime(lapTime)}</span>
        `;
        
        // Add animation
        lapItem.style.transform = 'translateX(-100%)';
        lapItem.style.opacity = '0';
        lapsContainer.prepend(lapItem);
        
        setTimeout(() => {
            lapItem.style.transform = 'translateX(0)';
            lapItem.style.opacity = '1';
        }, 10);
        
        lapCount++;
        
        // Scroll to top
        lapsContainer.scrollTop = 0;
    }
}

// Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

// Initialize
updateDisplay();
createParticles();