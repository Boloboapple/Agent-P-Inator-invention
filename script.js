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
    { id: "antiNauseaPatch", name: "Anti-Nausea Patch", desc: "Prevent
