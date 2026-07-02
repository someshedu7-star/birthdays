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
const loveYesButton = document.getElementById('loveYesButton');
const loveNoButton = document.getElementById('loveNoButton');
const loveYesContinueButton = document.getElementById('loveYesContinueButton');
const sureYesButton = document.getElementById('sureYesButton');
const sureNoButton = document.getElementById('sureNoButton');
const loveReasonInput = document.getElementById('loveReasonInput');
const saveReasonButton = document.getElementById('saveReasonButton');
const saveStatus = document.getElementById('saveStatus');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
const finalGreeting = document.getElementById('finalGreeting');
const romanceNote = document.getElementById('romanceNote');
const noteCount = document.getElementById('noteCount');
const noteTitle = document.getElementById('noteTitle');
const noteText = document.getElementById('noteText');
const blushLayer = document.querySelector('.blush-layer');
const countDays = document.getElementById('countDays');
const countHours = document.getElementById('countHours');
const countMinutes = document.getElementById('countMinutes');
const countSeconds = document.getElementById('countSeconds');
const passwordGate = document.getElementById('passwordGate');
const celebrationPassword = document.getElementById('celebrationPassword');
const passwordMessage = document.getElementById('passwordMessage');

const balloonColors = ['#ff5c8a', '#ffd166', '#ef476f', '#7bdff2', '#cdb4db'];
const confettiColors = ['#ff5c8a', '#ffd166', '#ffffff', '#f7a1c4', '#b8f2e6'];
const countdownTarget = new Date('2026-08-18T00:00:00+05:30').getTime();
const TEMP_PASSWORD = '1234';
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
const SUPABASE_URL = 'https://knccnerjqyiahfqupfwm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuY2NuZXJqcXlpYWhmcXVwZndtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4Mzc0NTQsImV4cCI6MjA5NzQxMzQ1NH0.FPYVeF7QSQbk1iBdO12NrjbjaICm6NMq2ouBOZghZSw';
const SUPABASE_TABLE = 'birthday_responses';
let musicWanted = false;
let celebrationStarted = false;
let noteIndex = 0;
let pickupIndex = 0;
let loveLoopId = null;
let blushLoopId = null;

function showStep(stepId) {
    steps.forEach((step) => {
        step.classList.toggle('active', step.id === stepId);
    });
}

function updateCountdown() {
    if (!countDays || !countHours || !countMinutes || !countSeconds) return;

    const distance = Math.max(0, countdownTarget - Date.now());
    const days = Math.floor(distance / 86400000);
    const hours = Math.floor((distance % 86400000) / 3600000);
    const minutes = Math.floor((distance % 3600000) / 60000);
    const seconds = Math.floor((distance % 60000) / 1000);

    countDays.textContent = String(days).padStart(2, '0');
    countHours.textContent = String(hours).padStart(2, '0');
    countMinutes.textContent = String(minutes).padStart(2, '0');
    countSeconds.textContent = String(seconds).padStart(2, '0');

    if (passwordGate && distance <= 0) {
        passwordGate.classList.add('is-unlocked');
    }
}

function isPasswordRequired() {
    return Date.now() < countdownTarget;
}

function canStartCelebration() {
    if (!isPasswordRequired()) return true;

    const enteredPassword = celebrationPassword.value.trim();
    if (enteredPassword === TEMP_PASSWORD) {
        passwordMessage.textContent = 'Unlocked.';
        passwordGate.classList.remove('has-error');
        passwordGate.classList.add('is-success');
        return true;
    }

    passwordMessage.textContent = 'Not yet, pookie. Try the secret date.';
    passwordGate.classList.remove('is-success');
    passwordGate.classList.add('has-error');
    celebrationPassword.focus();
    celebrationPassword.select();
    makeBlushPops(8);
    return false;
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
    const activeScene = document.querySelector('.step.active .romance-scene, .step.active .pickup-scene, .step.active .love-question-scene, .step.active .love-celebration-scene, .step.active .sure-scene, .step.active .reason-scene, .step.active .forever-scene');
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
    const activeScene = document.querySelector('.step.active .romance-scene, .step.active .pickup-scene, .step.active .love-question-scene, .step.active .love-celebration-scene, .step.active .sure-scene, .step.active .reason-scene, .step.active .forever-scene');
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
    const activeScene = document.querySelector('.step.active .romance-scene, .step.active .pickup-scene, .step.active .love-question-scene, .step.active .love-celebration-scene, .step.active .sure-scene, .step.active .reason-scene, .step.active .forever-scene');
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

function makeBlushPops(amount = 8) {
    if (!blushLayer) return;

    for (let i = 0; i < amount; i += 1) {
        const blush = document.createElement('span');
        blush.className = 'blush-pop';
        blush.textContent = i % 3 === 0 ? '♡' : '♥';
        blush.style.left = `${Math.random() * 100}%`;
        blush.style.top = `${10 + Math.random() * 78}%`;
        blush.style.animationDelay = `${Math.random() * 0.7}s`;
        blush.style.animationDuration = `${3.4 + Math.random() * 2.8}s`;
        blush.style.fontSize = `${14 + Math.random() * 22}px`;
        blushLayer.appendChild(blush);

        window.setTimeout(() => blush.remove(), 7000);
    }
}

function startBlushLoop() {
    if (blushLoopId) return;

    makeBlushPops(14);
    blushLoopId = window.setInterval(() => makeBlushPops(6), 2400);
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

function startLoveLoop() {
    if (loveLoopId) window.clearInterval(loveLoopId);

    makeSceneHearts(80);
    makeHeartDrops(48);
    makeFirecrackerBurst(10);
    loveLoopId = window.setInterval(() => {
        makeSceneHearts(24);
        makeHeartDrops(18);
        makeFirecrackerBurst(3);
    }, 2200);
}

function stopLoveLoop() {
    if (!loveLoopId) return;

    window.clearInterval(loveLoopId);
    loveLoopId = null;
}

async function saveLoveResponse(answer, reason = '') {
    const payload = {
        answer,
        reason,
        created_at: new Date().toISOString()
    };

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        const savedResponses = JSON.parse(localStorage.getItem('birthday_responses') || '[]');
        savedResponses.push(payload);
        localStorage.setItem('birthday_responses', JSON.stringify(savedResponses));
        return { savedLocally: true };
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}`, {
        method: 'POST',
        headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal'
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error('Could not save response');
    }

    return { savedLocally: false };
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
    startBlushLoop();

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
    makeBlushPops(10);
}

startButton.addEventListener('click', () => {
    if (!canStartCelebration()) return;

    playMusic();
    showStep('step2');
    startBlushLoop();
});

celebrationPassword.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        startButton.click();
    }
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

    showStep('stepLoveQuestion');
    makeSceneHearts(60);
    makeHeartDrops(34);
    makeFirecrackerBurst(8);
    launchConfetti(90);
    launchFireworks(10);
});

loveYesButton.addEventListener('click', async () => {
    showStep('stepLoveYes');
    startLoveLoop();
    try {
        await saveLoveResponse('yes');
    } catch (error) {
        console.warn(error);
    }
});

loveNoButton.addEventListener('click', () => {
    stopLoveLoop();
    showStep('stepLoveSure');
    makeSceneHearts(24);
    makeHeartDrops(14);
});

sureNoButton.addEventListener('click', async () => {
    showStep('stepLoveYes');
    startLoveLoop();
    try {
        await saveLoveResponse('yes_after_sure');
    } catch (error) {
        console.warn(error);
    }
});

sureYesButton.addEventListener('click', () => {
    stopLoveLoop();
    showStep('stepLoveReason');
    saveStatus.textContent = '';
    loveReasonInput.value = '';
    makeHeartDrops(18);
});

saveReasonButton.addEventListener('click', async () => {
    const reason = loveReasonInput.value.trim();
    saveReasonButton.disabled = true;
    saveStatus.textContent = 'Saving...';

    try {
        const result = await saveLoveResponse('no', reason);
        saveStatus.textContent = result.savedLocally
            ? 'Saved locally. Add Supabase details in script.js to save online.'
            : 'Saved.';
        window.setTimeout(() => {
            showStep('step7');
            makeSceneHearts(36);
            makeHeartDrops(20);
        }, 1200);
    } catch (error) {
        saveStatus.textContent = 'Could not save. Please check Supabase settings.';
    } finally {
        saveReasonButton.disabled = false;
    }
});

loveYesContinueButton.addEventListener('click', () => {
    stopLoveLoop();
    showStep('step7');
    makeSceneHearts(48);
    makeHeartDrops(30);
    makeFirecrackerBurst(8);
});

replayButton.addEventListener('click', () => {
    stopLoveLoop();
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

updateCountdown();
window.setInterval(updateCountdown, 1000);
