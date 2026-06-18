const steps = Array.from(document.querySelectorAll('.step'));
const startButton = document.getElementById('startButton');
const envelopeContainer = document.getElementById('envelopeContainer');
const letterContainer = document.getElementById('letterContainer');
const unfoldButton = document.getElementById('unfoldButton');
const continueButton = document.getElementById('continueButton');
const nextNoteButton = document.getElementById('nextNoteButton');
const replayButton = document.getElementById('replayButton');
const runawayYesButton = document.getElementById('runawayYesButton');
const noWhyButton = document.getElementById('noWhyButton');
const pickupActions = document.getElementById('pickupActions');
const pickupAnswer = document.getElementById('pickupAnswer');
const pickupCount = document.getElementById('pickupCount');
const pickupQuestion = document.getElementById('pickupQuestion');
const pickupAnswerText = document.getElementById('pickupAnswerText');
const pickupContinueButton = document.getElementById('pickupContinueButton');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
const finalGreeting = document.getElementById('finalGreeting');
const romanceNote = document.getElementById('romanceNote');
const noteCount = document.getElementById('noteCount');
const noteTitle = document.getElementById('noteTitle');
const noteText = document.getElementById('noteText');

const balloonColors = ['#ff5c8a', '#ffd166', '#ef476f', '#7bdff2', '#cdb4db'];
const confettiColors = ['#ff5c8a', '#ffd166', '#ffffff', '#f7a1c4', '#b8f2e6'];
const romanticNotes = [
    {
        title: 'For every smile',
        text: 'Your smile has a way of making ordinary moments feel like something worth remembering forever.'
    },
    {
        title: 'For every little moment',
        text: 'I hope today wraps you in the kind of happiness that feels soft, honest, and beautifully yours.'
    },
    {
        title: 'For the person you are',
        text: 'You are special in ways words can only try to hold, and this little surprise is one tiny piece of that feeling.'
    }
];
const pickupLines = [
    {
        question: 'Are you a camera?',
        answer: 'Because every moment with you feels picture perfect.'
    },
    {
        question: 'Are you a sunrise?',
        answer: 'Because you make everything around you feel warmer and brighter.'
    },
    {
        question: 'Are you a wish?',
        answer: 'Because meeting you feels like something my heart quietly hoped for.'
    }
];
let musicWanted = false;
let celebrationStarted = false;
let noteIndex = 0;
let pickupIndex = 0;

function showStep(stepId) {
    steps.forEach((step) => {
        step.classList.toggle('active', step.id === stepId);
    });
}

async function playMusic() {
    if (!backgroundMusic) return;

    musicWanted = true;
    backgroundMusic.volume = 0.55;

    try {
        await backgroundMusic.play();
        musicToggle.textContent = 'Music On';
        musicToggle.classList.add('is-playing');
    } catch (error) {
        musicToggle.textContent = 'Tap For Music';
        musicToggle.classList.remove('is-playing');
    }
}

function pauseMusic() {
    if (!backgroundMusic) return;

    backgroundMusic.pause();
    musicWanted = false;
    musicToggle.textContent = 'Music Off';
    musicToggle.classList.remove('is-playing');
}

function typeGreeting() {
    const message = 'Happy Birthday,';
    let index = 0;
    finalGreeting.textContent = '';
    finalGreeting.classList.remove('typed');

    const timer = window.setInterval(() => {
        finalGreeting.textContent += message[index];
        index += 1;

        if (index >= message.length) {
            window.clearInterval(timer);
            finalGreeting.classList.add('typed');
        }
    }, 85);
}

function makeHeartBurst(amount = 28) {
    const container = document.querySelector('.hearts-container');
    if (!container) return;

    for (let i = 0; i < amount; i += 1) {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = '♥';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 2.4}s`;
        heart.style.animationDuration = `${6 + Math.random() * 5}s`;
        heart.style.fontSize = `${16 + Math.random() * 26}px`;
        container.appendChild(heart);

        window.setTimeout(() => heart.remove(), 12000);
    }
}

function makeSceneHearts(amount = 24) {
    const activeScene = document.querySelector('.step.active .romance-scene, .step.active .pickup-scene, .step.active .forever-scene');
    if (!activeScene) return;

    for (let i = 0; i < amount; i += 1) {
        const heart = document.createElement('span');
        heart.className = 'scene-heart';
        heart.textContent = '♥';
        heart.style.left = `${8 + Math.random() * 84}%`;
        heart.style.animationDelay = `${Math.random() * 0.9}s`;
        heart.style.animationDuration = `${3.8 + Math.random() * 2.6}s`;
        heart.style.fontSize = `${14 + Math.random() * 24}px`;
        activeScene.appendChild(heart);

        window.setTimeout(() => heart.remove(), 7000);
    }
}

function makeHeartDrops(amount = 18) {
    const activeScene = document.querySelector('.step.active .romance-scene, .step.active .pickup-scene, .step.active .forever-scene');
    if (!activeScene) return;

    for (let i = 0; i < amount; i += 1) {
        const heart = document.createElement('span');
        heart.className = 'heart-drop';
        heart.textContent = '♥';
        heart.style.left = `${6 + Math.random() * 88}%`;
        heart.style.animationDelay = `${Math.random() * 1.2}s`;
        heart.style.animationDuration = `${3.2 + Math.random() * 2.4}s`;
        heart.style.fontSize = `${12 + Math.random() * 18}px`;
        activeScene.appendChild(heart);

        window.setTimeout(() => heart.remove(), 7000);
    }
}

function makeFirecrackerBurst(amount = 4) {
    const activeScene = document.querySelector('.step.active .romance-scene, .step.active .pickup-scene, .step.active .forever-scene');
    if (!activeScene) return;

    for (let i = 0; i < amount; i += 1) {
        const burst = document.createElement('span');
        burst.className = 'cracker-burst';
        burst.style.left = `${18 + Math.random() * 64}%`;
        burst.style.top = `${16 + Math.random() * 46}%`;
        burst.style.animationDelay = `${Math.random() * 0.5}s`;
        activeScene.appendChild(burst);

        window.setTimeout(() => burst.remove(), 1800);
    }
}

function moveRunawayButton() {
    const maxX = 120;
    const maxY = 72;
    const x = Math.round((Math.random() * maxX * 2) - maxX);
    const y = Math.round((Math.random() * maxY * 2) - maxY);
    runawayYesButton.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() > 0.5 ? 7 : -7}deg)`;
    makeHeartDrops(5);
}

function resetPickupScene() {
    const pickupLine = pickupLines[pickupIndex];
    const pickupCard = document.querySelector('.pickup-card');

    pickupCount.textContent = `Question ${pickupIndex + 1} of ${pickupLines.length}`;
    pickupQuestion.textContent = pickupLine.question;
    pickupAnswerText.textContent = pickupLine.answer;
    pickupContinueButton.textContent = pickupIndex === pickupLines.length - 1 ? 'Wishes From' : 'Next Question';
    pickupActions.classList.remove('is-hidden');
    pickupAnswer.classList.remove('is-visible');
    runawayYesButton.style.transform = '';

    pickupCard.classList.remove('pickup-enter');
    void pickupCard.offsetWidth;
    pickupCard.classList.add('pickup-enter');
}

function showPickupAnswer() {
    pickupActions.classList.add('is-hidden');
    pickupAnswer.classList.add('is-visible');
    makeSceneHearts(30);
    makeHeartDrops(22);
    makeFirecrackerBurst(5);
}

function launchConfetti(amount = 80) {
    const container = document.querySelector('.confetti-cannon-container');
    if (!container) return;

    for (let i = 0; i < amount; i += 1) {
        const confetti = document.createElement('span');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = confettiColors[i % confettiColors.length];
        confetti.style.animationDelay = `${Math.random() * 0.9}s`;
        confetti.style.animationDuration = `${2.8 + Math.random() * 1.8}s`;
        container.appendChild(confetti);

        window.setTimeout(() => confetti.remove(), 5600);
    }
}

function launchBalloons(amount = 12) {
    const container = document.querySelector('.balloons-container');
    if (!container) return;

    for (let i = 0; i < amount; i += 1) {
        const balloon = document.createElement('span');
        balloon.className = 'balloon';
        balloon.style.left = `${4 + Math.random() * 92}%`;
        balloon.style.backgroundColor = balloonColors[i % balloonColors.length];
        balloon.style.animationDelay = `${Math.random() * 5}s`;
        balloon.style.animationDuration = `${10 + Math.random() * 7}s`;
        container.appendChild(balloon);

        window.setTimeout(() => balloon.remove(), 18000);
    }
}

function launchFireworks(amount = 8) {
    const container = document.querySelector('.fireworks-container');
    if (!container) return;

    for (let i = 0; i < amount; i += 1) {
        const firework = document.createElement('span');
        firework.className = 'firework';
        firework.style.left = `${12 + Math.random() * 76}%`;
        firework.style.top = `${62 + Math.random() * 22}%`;
        firework.style.backgroundColor = confettiColors[i % confettiColors.length];
        firework.style.animationDelay = `${Math.random() * 2.5}s`;
        container.appendChild(firework);

        window.setTimeout(() => firework.remove(), 6500);
    }
}

function startCelebrationEffects() {
    if (celebrationStarted) return;
    celebrationStarted = true;

    typeGreeting();
    makeHeartBurst(42);
    launchConfetti(100);
    launchBalloons(14);
    launchFireworks(10);

    window.setInterval(() => makeHeartBurst(12), 3000);
    window.setInterval(() => launchConfetti(24), 4400);
    window.setInterval(() => launchBalloons(5), 6400);
    window.setInterval(() => launchFireworks(4), 5400);
}

function renderNote() {
    const note = romanticNotes[noteIndex];
    noteCount.textContent = `Note ${noteIndex + 1} of ${romanticNotes.length}`;
    noteTitle.textContent = note.title;
    noteText.textContent = note.text;
    nextNoteButton.textContent = noteIndex === romanticNotes.length - 1 ? 'Final Reveal' : 'Next Note';

    romanceNote.classList.remove('note-enter');
    void romanceNote.offsetWidth;
    romanceNote.classList.add('note-enter');
    makeSceneHearts(18);
    makeHeartDrops(14);
    makeFirecrackerBurst(3);
}

startButton.addEventListener('click', () => {
    playMusic();
    showStep('step2');
});

envelopeContainer.addEventListener('click', () => {
    envelopeContainer.classList.add('open');

    window.setTimeout(() => {
        showStep('step3');
        letterContainer.classList.add('show');
        if (musicWanted) playMusic();
    }, 650);
});

unfoldButton.addEventListener('click', () => {
    showStep('step4');
    if (musicWanted) playMusic();
    startCelebrationEffects();
});

continueButton.addEventListener('click', () => {
    noteIndex = 0;
    showStep('step5');
    renderNote();
    makeSceneHearts(28);
    makeHeartDrops(20);
    makeFirecrackerBurst(4);
});

nextNoteButton.addEventListener('click', () => {
    if (noteIndex < romanticNotes.length - 1) {
        noteIndex += 1;
        renderNote();
        return;
    }

    pickupIndex = 0;
    resetPickupScene();
    showStep('step6');
    makeSceneHearts(34);
    makeHeartDrops(24);
    makeFirecrackerBurst(5);
});

runawayYesButton.addEventListener('pointerenter', moveRunawayButton);
runawayYesButton.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    moveRunawayButton();
});
runawayYesButton.addEventListener('focus', moveRunawayButton);

noWhyButton.addEventListener('click', showPickupAnswer);

pickupContinueButton.addEventListener('click', () => {
    if (pickupIndex < pickupLines.length - 1) {
        pickupIndex += 1;
        resetPickupScene();
        makeSceneHearts(26);
        makeHeartDrops(18);
        makeFirecrackerBurst(4);
        return;
    }

    showStep('step7');
    makeSceneHearts(60);
    makeHeartDrops(34);
    makeFirecrackerBurst(8);
    launchConfetti(90);
    launchFireworks(10);
});

replayButton.addEventListener('click', () => {
    showStep('step4');
    startCelebrationEffects();
    makeHeartBurst(36);
});

musicToggle.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        playMusic();
    } else {
        pauseMusic();
    }
});
