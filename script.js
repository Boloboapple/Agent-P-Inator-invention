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
const newMissionBtn = document.getElementById('new-mission-btn');

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
        suggestedItems: ["jetBoots", "grapplingHook", "enlargementPill"]
    },
    "Growth": {
        challenge: "causes objects to expand, blocking paths and making areas unstable.",
        suggestedItems: ["laserPen", "explosiveFloss", "miniChainsaw"]
    },
    "Flatten": {
        challenge: "compresses areas, creating narrow gaps and crushing hazards.",
        suggestedItems: ["disguiseKit", "jetBoots", "portableTunnelDigger"]
    },
    "Monotony": {
        challenge: "dulls senses and makes movement sluggish, requiring sharp focus.",
        suggestedItems: ["caffeinePill", "whoopeeCushion", "smokeBomb"]
    },
    "Elevator": {
        challenge: "removes vertical access and causes sudden drops.",
        suggestedItems: ["grapplingHook", "jetBoots", "emergencyParachute"]
    },
    "Color-Changing": {
        challenge: "confuses sensors and camouflages enemies, requiring optical aids.",
        suggestedItems: ["infraredGoggles", "colorCorrectingSpray", "reflectiveShield"]
    },
    "Stinky": {
        challenge: "emits foul odors, affecting visibility and requiring breathing apparatus.",
        suggestedItems: ["gasMask", "portableFan", "deodorizerSpray"]
    },
    "Spinning": {
        challenge: "causes dizziness and makes platforms unstable.",
        suggestedItems: ["stabilizerShoes", "magnetizedBoots", "antiNauseaPatch"]
    },
    "Sticky": {
        challenge: "traps objects and slows movement, making quick escapes difficult.",
        suggestedItems: ["antiStickSpray", "greaseGun", "escapePod"]
    },
    "Magnetic": {
        challenge: "pulls metallic objects and disables electronics, hindering gadget use.",
        suggestedItems: ["nonMetallicGrapplingHook", "rubberSuit", "empDevice"]
    }
};

const ALL_AVAILABLE_ITEMS = [
    { id: "grapplingHook", name: "Grappling Hook", desc: "Allows vertical ascension and traversal over gaps." },
    { id: "jetBoots", name: "Jet Boots", desc: "Provides short bursts of flight for quick movement or dodging." },
    { id: "laserPen", name: "Laser Pen", desc: "Cuts through thin materials and activates distant switches." },
    { id: "disguiseKit", name: "Disguise Kit", desc: "Temporarily blend in with specific human types." },
    { id: "explosiveFloss", name: "Explosive Dental Floss", desc: "Creates small detonations for distractions or clearing debris." },
    { id: "universalRemote", name: "Universal Remote", desc: "Controls certain electronic devices." },
    { id: "rubberDuckie", name: "Rubber Duckie", desc: "A decoy, or surprisingly buoyant." },
    { id: "reconDrone", name: "Recon Drone", desc: "Provides advanced intel on mission layout." },
    { id: "enlargementPill", name: "Enlargement Pill", desc: "Temporarily increases size to reach high places or push heavy objects." },
    { id: "miniChainsaw", name: "Miniature Chainsaw", desc: "Quickly cuts through large obstacles." },
    { id: "portableTunnelDigger", name: "Portable Tunnel Digger", desc: "Creates small tunnels through soft ground." },
    { id: "caffeinePill", name: "Caffeine Pill", desc: "Boosts Agent P's alertness and speed temporarily." },
    { id: "whoopeeCushion", name: "Whoopee Cushion", desc: "A classic distraction, effective on Norm-Bots with poor hearing." },
    { id: "smokeBomb", name: "Brightly Colored Smoke Bomb", desc: "Obscures vision, useful for escapes or bypassing sensors." },
    { id: "emergencyParachute", name: "Emergency Parachute", desc: "Softens unexpected drops." },
    { id: "infraredGoggles", name: "Infrared Goggles", desc: "Detects heat signatures and hidden laser grids." },
    { id: "colorCorrectingSpray", name: "Color-Correcting Spray", desc: "Temporarily changes an object's color to bypass color-sensitive traps." },
    { id: "reflectiveShield", name: "Reflective Shield", desc: "Bounces back laser beams and other light-based attacks." },
    { id: "gasMask", name: "Gas Mask", desc: "Protects against noxious fumes." },
    { id: "portableFan", name: "Portable Fan", desc: "Clears light gases or activates wind-sensitive mechanisms." },
    { id: "deodorizerSpray", name: "Deodorizer Spray", desc: "Neutralizes strong odors." },
    { id: "stabilizerShoes", name: "Stabilizer Shoes", desc: "Reduces effects of unstable or spinning surfaces." },
    { id: "magnetizedBoots", name: "Magnetized Boots", desc: "Allows walking on metallic ceilings or walls." },
    { id: "antiNauseaPatch", name: "Anti-Nausea Patch", desc: "Prevents disorientation from spinning effects." },
    { id: "antiStickSpray", name: "Anti-Stick Spray", desc: "Removes sticky residues and prevents adhesion." },
    { id: "greaseGun", name: "Grease Gun", desc: "Lubricates mechanisms or makes surfaces slippery." },
    { id: "escapePod", name: "Emergency Escape Pod", desc: "A last resort for mission abort or quick evasion." },
    { id: "nonMetallicGrapplingHook", name: "Non-Metallic Grappling Hook", desc: "A specialized grappling hook unaffected by magnetism." },
    { id: "rubberSuit", name: "Rubber Suit", desc: "Provides insulation against electrical and magnetic fields." },
    { id: "empDevice", name: "EMP Device", desc: "Disables electronic devices in a small radius." }
];

// --- GAME STATE VARIABLES ---
let currentInator = null;
let playerInventory = [];
const MAX_INVENTORY_SLOTS = 3;
let currentlyDisplayedItems = []; // To keep track of what's shown to the user for selection

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
        suggestedItems: effectDetails.suggestedItems
    };
}

/**
 * Displays the mission briefing and prepares for item selection.
 */
function startNewMission() {
    currentInator = generateRandomInator();
    playerInventory.length = 0; // Clear previous inventory

    // Update UI elements for briefing
    briefingArea.classList.remove('hidden');
    itemSelectionArea.classList.add('hidden');
    missionStartArea.classList.add('hidden');
    selectionFeedback.textContent = '';
    itemInput.value = '';

    maxSlotsSpan.textContent = MAX_INVENTORY_SLOTS;

    monogramMessage.innerHTML = `
        Major Monogram: Agent P! We've got a Code Red!<br>
        Dr. Doofenshmirtz has just activated the new <strong>${currentInator.name}</strong>!<br>
        His nefarious goal this time is ${currentInator.plot}.<br>
        Be warned, Agent P, this Inator's power <strong>${currentInator.challengeDescription}</strong>
    `;
    startMissionBtn.style.display = 'none'; // Hide briefing button after brief
    displayItemSelection(); // Immediately proceed to item selection for this flow
}

/**
 * Populates the item selection list in the UI.
 */
function displayItemSelection() {
    itemList.innerHTML = ''; // Clear previous items
    currentlyDisplayedItems = []; // Reset the list of items presented to the user

    // Filter available items: prioritize suggested items, then add others
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

    // Shuffle non-suggested items and add some more randomly
    // Limit to about 5-7 extra general items to keep choices manageable
    const numExtraItems = Math.min(7, nonSuggestedItems.length);
    for (let i = 0; i < numExtraItems; i++) {
        const randomIndex = Math.floor(Math.random() * nonSuggestedItems.length);
        const itemToAdd = nonSuggestedItems.splice(randomIndex, 1)[0];
        if (itemToAdd) {
            availableItemsForSelection.push(itemToAdd);
        }
    }

    // Ensure we don't present too many options, maybe cap at 12-15 total
    if (availableItemsForSelection.length > 15) {
        availableItemsForSelection = availableItemsForSelection.slice(0, 15);
    }

    // Populate the UI list and store for selection
    availableItemsForSelection.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="item-index">${index + 1}.</span> <strong>${item.name}</strong>: ${item.desc}`;
        itemList.appendChild(li);
        currentlyDisplayedItems.push(item); // Store this item in our tracking array
    });

    briefingArea.classList.add('hidden'); // Hide briefing
    itemSelectionArea.classList.remove('hidden'); // Show item selection
}

/**
 * Handles the player's item selection from the input field.
 */
function handleItemSelection() {
    const input = itemInput.value;
    const chosenIndices = input.split(',')
                               .map(s => parseInt(s.trim()) - 1) // Convert to 0-indexed numbers
                               .filter(n => !isNaN(n) && n >= 0 && n < currentlyDisplayedItems.length); // Filter invalid inputs

    playerInventory.length = 0; // Reset inventory
    selectionFeedback.textContent = ''; // Clear previous feedback

    // Use a Set to easily track unique item IDs and prevent duplicates
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
 * Displays the confirmed mission loadout and prepares for the next mission.
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
}

// --- EVENT LISTENERS ---
startMissionBtn.addEventListener('click', startNewMission);
confirmSelectionBtn.addEventListener('click', handleItemSelection);
newMissionBtn.addEventListener('click', startNewMission); // Allows starting a new mission after one is done

// --- INITIAL GAME START ---
document.addEventListener('DOMContentLoaded', () => {
    // We'll initially show the briefing button, user clicks to start
    briefingArea.classList.remove('hidden');
    startMissionBtn.style.display = 'block';
    itemSelectionArea.classList.add('hidden');
    missionStartArea.classList.add('hidden');

    // Initial message on load
    monogramMessage.innerHTML = "Agent P, standby for mission briefing. Doofenshmirtz is up to no good again!";
});
