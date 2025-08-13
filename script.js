// --- DOM Elements ---
const briefingArea = document.getElementById('briefing-area');
const monogramMessage = document.getElementById('monogram-message');
const startMissionBtn = document.getElementById('start-mission-btn');

const itemSelectionArea = document.getElementById('item-selection-area');
const maxSlotsSpan = document.getElementById('max-slots');
const itemList = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');
const confirmSelectionBtn = document.getElementById('confirm-selection-btn');
const selectionFeedback = document.getElementById('selection-feedback');

const missionStartArea = document.getElementById('mission-start-area');
const selectedItemsList = document.getElementById('selected-items-list');
const proceedToMissionBtn = document.getElementById('proceed-to-mission-btn');
const newMissionBtn = document.getElementById('new-mission-btn');

const missionArea = document.getElementById('mission-area');
const missionScenario = document.getElementById('mission-scenario');
const missionChoices = document.getElementById('mission-choices');
const missionFeedback = document.getElementById('mission-feedback');
const resetGameBtn = document.getElementById('reset-game-btn');

// --- CANVAS ELEMENTS ---
const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d'); // This is your drawing context!

// --- GAME DATA ---
const INATOR_PREFIXES = [
    "De-", "Re-", "Mega-", "Mini-", "Super-", "Ultra-", "Anti-", "Giga-", "Micro-", "Hyper-"
];

const INATOR_EFFECTS = [
    "Shrink", "Growth", "Flatten", "Monotony", "Elevator", "Color-Changing", "Stinky", "Spinning", "Sticky", "Magnetic"
];

const INATOR_SUFFIXES = [
    "-Inator", "-izer", "-ifier", "-omatic", "-tron", "-inator 5000"
];

const DOOF_PLOTS = [
    "to make everyone's shoelaces untie",
    "to turn all mailboxes into angry squirrels",
    "to replace all elevator music with polka",
    "to make everyone scratch their left ear every five minutes",
    "to make all garden gnomes dance uncontrollably",
    "to swap everyone's left and right socks",
    "to turn all garden hoses into rubber chickens",
    "to make everyone's alarm clocks play banjo music"
];

const EFFECT_DETAILS = {
    "Shrink": {
        challenge: "creates tiny passages and makes crucial components hard to reach.",
        suggestedItems: ["jetBoots", "grapplingHook", "enlargementPill"],
        obstacles: ["small vent", "high shelf", "tight squeeze"],
        weakness: "enlargementPill"
    },
    "Growth": {
        challenge: "causes objects to expand, blocking paths and making areas unstable.",
        suggestedItems: ["laserPen", "explosiveFloss", "miniChainsaw"],
        obstacles: ["giant potted plant", "enlarged door", "heavy debris pile"],
        weakness: "miniChainsaw"
    },
    "Flatten": {
        challenge: "compresses areas, creating narrow gaps and crushing hazards.",
        suggestedItems: ["disguiseKit", "jetBoots", "portableTunnelDigger"],
        obstacles: ["narrow corridor", "crushed pipe", "flattened security bot"],
        weakness: "portableTunnelDigger"
    },
    "Monotony": {
        challenge: "dulls senses and makes movement sluggish, requiring sharp focus.",
        suggestedItems: ["caffeinePill", "whoopeeCushion", "smokeBomb"],
        obstacles: ["droning hum", "sleepy guard", "slow-moving laser grid"],
        weakness: "caffeinePill"
    },
    "Elevator": {
        challenge: "removes vertical access and causes sudden drops.",
        suggestedItems: ["grapplingHook", "jetBoots", "emergencyParachute"],
        obstacles: ["missing staircase", "collapsed floor", "deep chasm"],
        weakness: "grapplingHook"
    },
    "Color-Changing": {
        challenge: "confuses sensors and camouflages enemies, requiring optical aids.",
        suggestedItems: ["infraredGoggles", "colorCorrectingSpray", "reflectiveShield"],
        obstacles: ["shifting walls", "camouflaged Norm-Bot", "color-coded laser grid"],
        weakness: "colorCorrectingSpray"
    },
    "Stinky": {
        challenge: "emits foul odors, affecting visibility and requiring breathing apparatus.",
        suggestedItems: ["gasMask", "portableFan", "deodorizerSpray"],
        obstacles: ["noxious gas vent", "stinky sludge puddle", "odor-sensitive alarm"],
        weakness: "gasMask"
    },
    "Spinning": {
        challenge: "causes dizziness and makes platforms unstable.",
        suggestedItems: ["stabilizerShoes", "magnetizedBoots", "antiNauseaPatch"],
        obstacles: ["rotating floor", "spinning platforms", "dizzying lights"],
        weakness: "stabilizerShoes"
    },
    "Sticky": {
        challenge: "traps objects and slows movement, making quick escapes difficult.",
        suggestedItems: ["antiStickSpray", "greaseGun", "escapePod"],
        obstacles: ["sticky floor", "goo trap", "adhesive-covered lever"],
        weakness: "antiStickSpray"
    },
    "Magnetic": {
        challenge: "pulls metallic objects and disables electronics, hindering gadget use.",
        suggestedItems: ["nonMetallicGrapplingHook", "rubberSuit", "empDevice"],
        obstacles: ["strong magnetic field", "malfunctioning metal door", "attracting debris"],
        weakness: "empDevice"
    }
};

const ALL_AVAILABLE_ITEMS = [
    { id: "grapplingHook", name: "Grappling Hook", desc: "Allows vertical ascension and traversal over gaps.", type: "movement" },
    { id: "jetBoots", name: "Jet Boots", desc: "Provides short bursts of flight for quick movement or dodging.", type: "movement" },
    { id: "laserPen", name: "Laser Pen", desc: "Cuts through thin materials and activates distant switches.", type: "utility" },
    { id: "disguiseKit", name: "Disguise Kit", desc: "Temporarily blend in with specific human types.", type: "stealth" },
    { id: "explosiveFloss", name: "Explosive Dental Floss", desc: "Creates small detonations for distractions or clearing debris.", type: "disruption" },
    { id: "universalRemote", name: "Universal Remote", desc: "Controls certain electronic devices.", type: "utility" },
    { id: "rubberDuckie", name: "Rubber Duckie", desc: "A decoy, or surprisingly buoyant.", type: "distraction" },
    { id: "reconDrone", name: "Recon Drone", desc: "Provides advanced intel on mission layout.", type: "intel" },
    { id: "enlargementPill", name: "Enlargement Pill", desc: "Temporarily increases size to reach high places or push heavy objects.", type: "utility" },
    { id: "miniChainsaw", name: "Miniature Chainsaw", desc: "Quickly cuts through large obstacles.", type: "disruption" },
    { id: "portableTunnelDigger", name: "Portable Tunnel Digger", desc: "Creates small tunnels through soft ground.", type: "movement" },
    { id: "caffeinePill", name: "Caffeine Pill", desc: "Boosts Agent P's alertness and speed temporarily.", type: "utility" },
    { id: "whoopeeCushion", name: "Whoopee Cushion", desc: "A classic distraction, effective on Norm-Bots with poor hearing.", type: "distraction" },
    { id: "smokeBomb", name: "Brightly Colored Smoke Bomb", desc: "Obscures vision, useful for escapes or bypassing sensors.", type: "stealth" },
    { id: "emergencyParachute", name: "Emergency Parachute", desc: "Softens unexpected drops.", type: "safety" },
    { id: "infraredGoggles", name: "Infrared Goggles", desc: "Detects heat signatures and hidden laser grids.", type: "intel" },
    { id: "colorCorrectingSpray", name: "Color-Correcting Spray", desc: "Temporarily changes an object's color to bypass color-sensitive traps.", type: "utility" },
    { id: "reflectiveShield", name: "Reflective Shield", desc: "Bounces back laser beams and other light-based attacks.", type: "utility" },
    { id: "gasMask", name: "Gas Mask", desc: "Protects against noxious fumes.", type: "safety" },
    { id: "portableFan", name: "Portable Fan", desc: "Clears light gases or activates wind-sensitive mechanisms.", type: "utility" },
    { id: "deodorizerSpray", name: "Deodorizer Spray", desc: "Neutralizes strong odors.", type: "utility" },
    { id: "stabilizerShoes", name: "Stabilizer Shoes", desc: "Reduces effects of unstable or spinning surfaces.", type: "movement" },
    { id: "magnetizedBoots", name: "Magnetized Boots", desc: "Allows walking on metallic ceilings or walls.", type: "movement" },
    { id: "antiNauseaPatch", name: "Anti-Nausea Patch", desc: "Prevents disorientation from spinning effects.", type: "safety" },
    { id: "antiStickSpray", name: "Anti-Stick Spray", desc: "Removes sticky residues and prevents adhesion.", type: "utility" },
    { id: "greaseGun", name: "Grease Gun", desc: "Lubricates mechanisms or makes surfaces slippery.", type: "utility" },
    { id: "escapePod", name: "Emergency Escape Pod", desc: "A last resort for mission abort or quick evasion.", type: "safety" },
    { id: "nonMetallicGrapplingHook", name: "Non-Metallic Grappling Hook", desc: "A specialized grappling hook unaffected by magnetism.", type: "movement" },
    { id: "rubberSuit", name: "Rubber Suit", desc: "Provides insulation against electrical and magnetic fields.", type: "safety" },
    { id: "empDevice", name: "EMP Device", desc: "Disables electronic devices in a small radius.", type: "disruption" }
];

// --- GAME STATE VARIABLES ---
let currentInator = null;
let playerInventory = [];
const MAX_INVENTORY_SLOTS = 3;
let currentlyDisplayedItems = [];

// --- CANVAS DRAWING FUNCTIONS ---

/**
 * Clears the entire canvas.
 */
function clearCanvas() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
}

/**
 * Draws Doofenshmirtz on the canvas.
 * @param {number} x - The x-coordinate for Doof's position (center of his base).
 * @param {number} y - The y-coordinate for Doof's position (bottom of his feet).
 * @param {string} pose - 'standing', 'defeated', 'triumphant'.
 */
function drawDoofenshmirtz(x, y, pose = 'standing') {
    const scale = 0.8; // Adjust overall size
    const bodyColor = '#4e6d99'; // Doof's dark teal/blue lab coat
    const skinColor = '#e7b583'; // Peach/light brown for skin
    const hairColor = '#333333'; // Dark grey/black for hair
    const eyeColor = '#ffffff';
    const pupilColor = '#000000';
    const beltColor = '#222222';
    const shoeColor = '#333333';

    ctx.save();
    ctx.translate(x, y); // Move origin to Doof's base point
    ctx.scale(scale, scale); // Scale Doof

    // Body (Lab Coat)
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.roundRect(-40, -180, 80, 180, 10); // Main body rectangle with rounded corners
    ctx.fill();
    ctx.closePath();

    // Arms
    ctx.fillRect(-70, -170, 30, 100); // Left arm
    ctx.fillRect(40, -170, 30, 100); // Right arm

    // Hands
    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.arc(-55, -70, 10, 0, Math.PI * 2); ctx.fill(); // Left hand
    ctx.arc(55, -70, 10, 0, Math.PI * 2); ctx.fill(); // Right hand
    ctx.closePath();

    // Head
    ctx.fillStyle = skinColor;
    ctx.beginPath();
    // Doof's head is somewhat pear-shaped with a prominent chin
    ctx.ellipse(0, -220, 60, 80, 0, 0, Math.PI * 2); // Oval for head
    ctx.fill();
    ctx.closePath();

    // Nose (Distinctive)
    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.moveTo(10, -210);
    ctx.lineTo(25, -200);
    ctx.lineTo(10, -190);
    ctx.fill();
    ctx.closePath();

    // Eyes
    ctx.fillStyle = eyeColor;
    ctx.beginPath();
    ctx.arc(-20, -230, 10, 0, Math.PI * 2); ctx.fill(); // Left eye
    ctx.arc(20, -230, 10, 0, Math.PI * 2); ctx.fill(); // Right eye
    ctx.closePath();

    ctx.fillStyle = pupilColor;
    ctx.beginPath();
    ctx.arc(-20, -230, 3, 0, Math.PI * 2); ctx.fill(); // Left pupil
    ctx.arc(20, -230, 3, 0, Math.PI * 2); ctx.fill(); // Right pupil
    ctx.closePath();

    // Mouth (expression based on pose)
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (pose === 'standing') {
        ctx.arc(0, -195, 15, 0, Math.PI, false); // Slight frown or neutral
    } else if (pose === 'defeated') {
        ctx.arc(0, -190, 20, 0, Math.PI); // Larger frown
    } else if (pose === 'triumphant') {
        ctx.arc(0, -200, 20, 0, Math.PI, true); // Smile
    }
    ctx.stroke();
    ctx.closePath();

    // Hair
    ctx.fillStyle = hairColor;
    ctx.beginPath();
    ctx.moveTo(-60, -280);
    ctx.lineTo(-40, -300);
    ctx.lineTo(0, -290);
    ctx.lineTo(40, -300);
    ctx.lineTo(60, -280);
    ctx.lineTo(0, -260); // Roughly outline the hair spike
    ctx.fill();
    ctx.closePath();

    // Belt
    ctx.fillStyle = beltColor;
    ctx.fillRect(-50, -10, 100, 10);

    // Feet/Shoes
    ctx.fillStyle = shoeColor;
    ctx.fillRect(-35, -5, 30, 5); // Left foot
    ctx.fillRect(5, -5, 30, 5); // Right foot


    // Restore context to its state before drawing Doof
    ctx.restore();
}

/**
 * Draws the Inator on the canvas.
 * @param {number} x - X-coordinate for the Inator's base.
 * @param {number} y - Y-coordinate for the Inator's base.
 * @param {boolean} isActive - True if the Inator should show active state.
 */
function drawInator(x, y, isActive = false) {
    const scale = 0.7; // Adjust size
    const baseColor = '#555555'; // Grey for base
    const mainBodyColor = '#990000'; // Red for main Inator body
    const topPartColor = '#ffcc00'; // Yellow/gold for top

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    // Base
    ctx.fillStyle = baseColor;
    ctx.beginPath();
    ctx.ellipse(0, 0, 70, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    // Main Body
    ctx.fillStyle = mainBodyColor;
    ctx.fillRect(-50, -150, 100, 150);

    // Top part (dome/emitter)
    ctx.fillStyle = topPartColor;
    ctx.beginPath();
    ctx.arc(0, -150, 60, Math.PI, Math.PI * 2, true); // Half circle for dome top
    ctx.fill();
    ctx.closePath();

    // Glowing effect if active
    if (isActive) {
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(255, 255, 0, 0.8)'; // Yellow glow
        ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
        ctx.beginPath();
        ctx.arc(0, -150, 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.shadowBlur = 0; // Reset shadow
    }

    ctx.restore();
}


// --- FUNCTIONS ---

/**
 * Generates a random Inator object for a new mission.
 * @returns {object} An object containing inator details.
 */
function generateRandomInator() {
    const randomEffectName = INATOR_EFFECTS[Math.floor(Math.random() * INATOR_EFFECTS.length)];
    const randomPrefix = INATOR_PREFIXES[Math.floor(Math.random() * INATOR_PREFIXES.length)];
    const randomSuffix = INATOR_SUFFIXES[Math.floor(Math.random() * INATOR_SUFFIXES.length)];
    const randomPlot = DOOF_PLOTS[Math.floor(Math.random() * DOOF_PLOTS.length)];

    const effectDetails = EFFECT_DETAILS[randomEffectName];

    const inatorName = `${randomPrefix}${randomEffectName}${randomSuffix}`;

    return {
        name: inatorName,
        effect: randomEffectName,
        challengeDescription: effectDetails.challenge,
        plot: randomPlot,
        suggestedItems: effectDetails.suggestedItems,
        weakness: effectDetails.weakness
    };
}

/**
 * Displays the mission briefing and prepares for item selection.
 * This is called when starting a brand new game or a subsequent mission.
 */
function startNewMission() {
    currentInator = generateRandomInator(); // Always generate a new Inator
    playerInventory.length = 0; // Clear previous inventory

    // Reset UI visibility to initial briefing state
    briefingArea.classList.remove('hidden'); // Ensure briefing is visible
    startMissionBtn.style.display = 'block'; // Ensure the button is visible

    itemSelectionArea.classList.add('hidden');
    missionStartArea.classList.add('hidden');
    missionArea.classList.add('hidden');
    resetGameBtn.classList.add('hidden');
    newMissionBtn.classList.add('hidden');

    selectionFeedback.textContent = '';
    itemInput.value = '';

    maxSlotsSpan.textContent = MAX_INVENTORY_SLOTS;

    monogramMessage.innerHTML = `
        Major Monogram: Agent P! We've got a Code Red!<br>
        Dr. Doofenshmirtz has just activated the new <strong>${currentInator.name}</strong>!<br>
        His nefarious goal this time is ${currentInator.plot}.<br>
        Be warned, Agent P, this Inator's power <strong>${currentInator.challengeDescription}</strong>
    `;
    monogramMessage.style.marginBottom = '15px'; // Adjust spacing

    // Clear and reset canvas for the initial state
    clearCanvas();
    drawDoofenshmirtz(gameCanvas.width * 0.5, gameCanvas.height, 'standing'); // Center Doof
    drawInator(gameCanvas.width * 0.2, gameCanvas.height * 0.8, false); // Inator off to side
}

/**
 * Handles the "Receive Mission Briefing" button click.
 * Transitions from briefing to item selection.
 * This function *just* handles the UI transition after `startNewMission` prepares the data.
 */
function showItemSelectionScreen() {
    // The startNewMission() call handles the game state setup
    // We only need to transition UI here if startNewMission() has already been called
    // which it should be on initial DOMContentLoaded, or via the newMissionBtn.
    // However, for the very FIRST "Receive Mission Briefing" click, startNewMission() hasn't
    // generated an Inator yet. So, it should be explicitly called here to ensure data exists.
    // If it's called again by newMissionBtn, it just resets.
    startNewMission(); // Ensure game state is set up before showing items

    briefingArea.classList.add('hidden'); // Hide briefing
    itemSelectionArea.classList.remove('hidden'); // Show item selection
    displayItemSelection(); // Populate item list
}

/**
 * Populates the item selection list in the UI.
 */
function displayItemSelection() {
    itemList.innerHTML = ''; // Clear previous items
    currentlyDisplayedItems = []; // Reset the list of items presented to the user

    let availableItemsForSelection = [];

    // Add suggested items first
    currentInator.suggestedItems.forEach(suggestedId => {
        const item = ALL_AVAILABLE_ITEMS.find(i => i.id === suggestedId);
        if (item && !availableItemsForSelection.some(i => i.id === item.id)) { // Avoid duplicates
            availableItemsForSelection.push(item);
        }
    });

    // Fill remaining slots with random items from the rest of the pool
    const nonSuggestedItems = ALL_AVAILABLE_ITEMS.filter(item =>
        !currentInator.suggestedItems.includes(item.id) &&
        !availableItemsForSelection.some(i => i.id === item.id)
    );

    const numExtraItems = Math.min(7, nonSuggestedItems.length);
    for (let i = 0; i < numExtraItems; i++) {
        const randomIndex = Math.floor(Math.random() * nonSuggestedItems.length);
        const itemToAdd = nonSuggestedItems.splice(randomIndex, 1)[0];
        if (itemToAdd) {
            availableItemsForSelection.push(itemToAdd);
        }
    }

    if (availableItemsForSelection.length > 15) {
        availableItemsForSelection = availableItemsForSelection.slice(0, 15);
    }

    availableItemsForSelection.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="item-index">${index + 1}.</span> <strong>${item.name}</strong>: ${item.desc}`;
        itemList.appendChild(li);
        currentlyDisplayedItems.push(item);
    });
}

/**
 * Handles the player's item selection from the input field.
 */
function handleItemSelection() {
    const input = itemInput.value;
    const chosenIndices = input.split(',')
                               .map(s => parseInt(s.trim()) - 1)
                               .filter(n => !isNaN(n) && n >= 0 && n < currentlyDisplayedItems.length);

    playerInventory.length = 0;
    selectionFeedback.textContent = '';

    const selectedItemIds = new Set();
    let selectedCount = 0;

    for (let i = 0; i < chosenIndices.length; i++) {
        const index = chosenIndices[i];
        const item = currentlyDisplayedItems[index];

        if (item && selectedCount < MAX_INVENTORY_SLOTS && !selectedItemIds.has(item.id)) {
            playerInventory.push(item);
            selectedItemIds.add(item.id);
            selectedCount++;
        }
    }

    if (playerInventory.length === 0) {
        selectionFeedback.textContent = "You must select at least one item!";
        return;
    }
    if (playerInventory.length > MAX_INVENTORY_SLOTS) {
        selectionFeedback.textContent = `You can only select ${MAX_INVENTORY_SLOTS} items. Please revise your selection.`;
        return;
    }

    showMissionLoadout();
}

/**
 * Displays the confirmed mission loadout.
 */
function showMissionLoadout() {
    itemSelectionArea.classList.add('hidden');
    missionStartArea.classList.remove('hidden');

    selectedItemsList.innerHTML = '';
    playerInventory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `- ${item.name}`;
        selectedItemsList.appendChild(li);
    });
    proceedToMissionBtn.classList.remove('hidden');
    newMissionBtn.classList.add('hidden');
}

/**
 * Starts the actual mission gameplay phase.
 */
function startMissionGameplay() {
    missionStartArea.classList.add('hidden');
    missionArea.classList.remove('hidden');
    missionFeedback.textContent = '';
    resetGameBtn.classList.add('hidden');

    // Draw initial mission scene with Doof at starting position and Inator idle
    clearCanvas();
    drawDoofenshmirtz(gameCanvas.width * 0.2, gameCanvas.height, 'standing'); // Doof on left
    drawInator(gameCanvas.width * 0.8, gameCanvas.height, false); // Inator on right, idle

    const inatorEffectObstacles = EFFECT_DETAILS[currentInator.effect].obstacles;
    const currentObstacle = inatorEffectObstacles[Math.floor(Math.random() * inatorEffectObstacles.length)];

    missionScenario.innerHTML = `You've infiltrated D.E.I.! The **${currentInator.name}** hums ominously in the distance. <br>Your path is blocked by a **${currentObstacle}**. What do you do?`;

    displayMissionChoices(currentObstacle);
}

/**
 * Displays available actions based on player's inventory and current obstacle.
 * @param {string} obstacle - The current obstacle text.
 */
function displayMissionChoices(obstacle) {
    missionChoices.innerHTML = ''; // Clear previous choices

    const actions = [];
    let hasRelevantItem = false;

    // Add general actions (always available)
    actions.push({ text: "Try to sneak past (risky)", action: "sneak" });
    actions.push({ text: "Search for an alternate route", action: "search" });

    // Add actions based on player's inventory and obstacle type
    playerInventory.forEach(item => {
        let actionText = `Use ${item.name}`;
        let isRelevant = false;

        if (currentInator.suggestedItems.includes(item.id)) {
            isRelevant = true;
        } else if (
            (item.type === "movement" && (obstacle.includes("vent") || obstacle.includes("gap") || obstacle.includes("chasm") || obstacle.includes("high") || obstacle.includes("corridor"))) ||
            (item.type === "disruption" && (obstacle.includes("blocked") || obstacle.includes("debris") || obstacle.includes("bot") || obstacle.includes("pipe"))) ||
            (item.type === "stealth" && obstacle.includes("guard")) ||
            (item.type === "utility" && (obstacle.includes("door") || obstacle.includes("lever") || obstacle.includes("sensor") || obstacle.includes("alarm") || obstacle.includes("fumes") || obstacle.includes("mechanisms") || obstacle.includes("lights"))) ||
            (item.type === "safety" && (obstacle.includes("drop") || obstacle.includes("fumes") || obstacle.includes("unstable") || obstacle.includes("dizzying"))) ||
            (item.type === "intel" && (obstacle.includes("hidden") || obstacle.includes("camouflaged") || obstacle.includes("grid")))
        ) {
            isRelevant = true;
        }

        if (isRelevant) {
            actions.push({ text: actionText, action: `use_${item.id}` });
            hasRelevantItem = true;
        }
    });

    if (!hasRelevantItem && playerInventory.length > 0) {
        missionFeedback.textContent = "Your current gadgets might not be ideal for this specific obstacle, Agent P. Proceed with caution!";
        missionFeedback.style.color = 'orange';
    } else {
         missionFeedback.textContent = "";
    }

    actions.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.addEventListener('click', () => handleMissionAction(choice.action, obstacle));
        missionChoices.appendChild(button);
    });
}

/**
 * Handles the player's chosen action during the mission.
 * @param {string} action - The action chosen (e.g., "sneak", "use_grapplingHook").
 * @param {string} obstacle - The current obstacle being faced.
 */
function handleMissionAction(action, obstacle) {
    let outcomeMessage = "";
    let missionSuccess = false;

    if (action.startsWith("use_")) {
        const itemId = action.substring(4);
        const usedItem = ALL_AVAILABLE_ITEMS.find(item => item.id === itemId);

        if (usedItem) {
            const isSuggested = currentInator.suggestedItems.includes(usedItem.id);
            const isTypeRelevant =
                (usedItem.type === "movement" && (obstacle.includes("vent") || obstacle.includes("gap") || obstacle.includes("chasm") || obstacle.includes("high") || obstacle.includes("corridor"))) ||
                (usedItem.type === "disruption" && (obstacle.includes("blocked") || obstacle.includes("debris") || obstacle.includes("bot") || obstacle.includes("pipe"))) ||
                (usedItem.type === "stealth" && obstacle.includes("guard")) ||
                (usedItem.type === "utility" && (obstacle.includes("door") || obstacle.includes("lever") || obstacle.includes("sensor") || obstacle.includes("alarm") || obstacle.includes("fumes") || obstacle.includes("mechanisms") || obstacle.includes("lights"))) ||
                (usedItem.type === "safety" && (obstacle.includes("drop") || obstacle.includes("fumes") || obstacle.includes("unstable") || obstacle.includes("dizzying"))) ||
                (usedItem.type === "intel" && (obstacle.includes("hidden") || obstacle.includes("camouflaged") || obstacle.includes("grid")));

            if (isSuggested || isTypeRelevant) {
                outcomeMessage = `You skillfully used your ${usedItem.name}! The ${obstacle} is bypassed.`;
                missionSuccess = true;
            } else {
                outcomeMessage = `You tried to use your ${usedItem.name}, but it wasn't quite right for the ${obstacle}. You barely managed to avoid detection!`;
            }
        }
    } else if (action === "sneak") {
        if (Math.random() > 0.6) {
            outcomeMessage = `You expertly snuck past the ${obstacle}. Nicely done!`;
            missionSuccess = true;
        } else {
            outcomeMessage = `You attempted to sneak, but the ${obstacle} was tougher than expected. You were almost spotted!`;
        }
    } else if (action === "search") {
        if (Math.random() > 0.5) {
            outcomeMessage = `You found a hidden bypass around the ${obstacle}. Good thinking!`;
            missionSuccess = true;
        } else {
            outcomeMessage = `You searched for an alternate route but found nothing useful around the ${obstacle}.`;
        }
    }

    missionFeedback.textContent = outcomeMessage;
    missionFeedback.style.color = missionSuccess ? '#2ecc71' : '#e74c3c';

    if (missionSuccess) {
        // Redraw scene for confrontation: Doof closer to Inator, Inator active
        clearCanvas();
        drawDoofenshmirtz(gameCanvas.width * 0.7, gameCanvas.height, 'standing'); // Doof moves towards Inator's side
        drawInator(gameCanvas.width * 0.8, gameCanvas.height, true); // Inator active

        setTimeout(confrontInator, 1500);
    } else {
        setTimeout(() => {
            missionFeedback.textContent = "You need to try another approach to get past this obstacle!";
            missionFeedback.style.color = '#e74c3c';
            displayMissionChoices(obstacle); // Let them try again
        }, 3000);
    }
}

/**
 * Handles the final confrontation with the Inator.
 */
function confrontInator() {
    missionChoices.innerHTML = '';
    missionFeedback.textContent = '';

    missionScenario.innerHTML = `You've bypassed the defenses and reached the **${currentInator.name}**! Dr. Doofenshmirtz is monologuing as usual, gloating about his plan to ${currentInator.plot}. You need to disable the Inator!`;

    const requiredDisableItemId = currentInator.weakness; // Use the specific weakness
    const requiredDisableItem = ALL_AVAILABLE_ITEMS.find(item => item.id === requiredDisableItemId);

    if (requiredDisableItem && playerInventory.some(item => item.id === requiredDisableItem.id)) {
        const button = document.createElement('button');
        button.textContent = `Use your ${requiredDisableItem.name} to disable the Inator!`;
        button.addEventListener('click', () => {
            // Success! Redraw Doof defeated and Inator idle
            clearCanvas();
            drawDoofenshmirtz(gameCanvas.width * 0.9, gameCanvas.height, 'defeated'); // Doof defeated, pushed far right
            drawInator(gameCanvas.width * 0.8, gameCanvas.height, false); // Inator idle

            missionScenario.innerHTML = `**SUCCESS!** You used your ${requiredDisableItem.name} to disable the **${currentInator.name}**! Dr. Doofenshmirtz shouts "Curse you, Perry the Platypus!" as his plan to ${currentInator.plot} is foiled!`;
            missionFeedback.textContent = "Mission Accomplished, Agent P!";
            missionFeedback.style.color = '#2ecc71';
            missionChoices.innerHTML = '';
            newMissionBtn.classList.remove('hidden');
            resetGameBtn.classList.add('hidden');
        });
        missionChoices.appendChild(button);
    } else {
        // Failure! Redraw Doof triumphant and Inator active
        clearCanvas();
        drawDoofenshmirtz(gameCanvas.width * 0.1, gameCanvas.height, 'triumphant'); // Doof triumphant, on left
        drawInator(gameCanvas.width * 0.8, gameCanvas.height, true); // Inator remains active

        missionScenario.innerHTML = `You've reached the Inator, but you don't have the right tool to disable it! Dr. Doofenshmirtz's plan to ${currentInator.plot} succeeds!`;
        missionFeedback.textContent = "MISSION FAILED! You didn't bring the right gadget!";
        missionFeedback.style.color = '#e74c3c';
        resetGameBtn.classList.remove('hidden');
        newMissionBtn.classList.add('hidden');
    }
}

// Function to restart the game
function resetGame() {
    startNewMission(); // Simply restart the whole flow
}


// --- EVENT LISTENERS ---
startMissionBtn.addEventListener('click', showItemSelectionScreen);
confirmSelectionBtn.addEventListener('click', handleItemSelection);
proceedToMissionBtn.addEventListener('click', startMissionGameplay);
newMissionBtn.addEventListener('click', startNewMission);
resetGameBtn.addEventListener('click', resetGame);

// --- INITIAL GAME START ---
document.addEventListener('DOMContentLoaded', () => {
    // Ensure the briefing area is visible initially (removed 'hidden' class)
    briefingArea.classList.remove('hidden');
    // Ensure the start button is explicitly visible
    startMissionBtn.style.display = 'block';

    // Hide all other sections initially
    itemSelectionArea.classList.add('hidden');
    missionStartArea.classList.add('hidden');
    missionArea.classList.add('hidden');
    resetGameBtn.classList.add('hidden');
    newMissionBtn.classList.add('hidden');

    // Set initial message
    monogramMessage.innerHTML = "Agent P, standby for mission briefing. Doofenshmirtz is up to no good again!";

    // Draw initial scene on canvas
    clearCanvas();
    drawDoofenshmirtz(gameCanvas.width * 0.5, gameCanvas.height, 'standing'); // Center Doof
    drawInator(gameCanvas.width * 0.2, gameCanvas.height * 0.8, false); // Inator off to side
});
