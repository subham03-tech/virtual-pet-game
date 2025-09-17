"use client";

import React, { useEffect, useRef, useState } from "react";



const PETS = [
  { id: "dog", name: "Dog", emoji: "🐶", img: "https://cdn-icons-png.flaticon.com/512/616/616408.png" },
  { id: "cat", name: "Cat", emoji: "🐱", img: "https://cdn-icons-png.flaticon.com/512/616/616430.png" },
  { id: "dragon", name: "Dragon", emoji: "🐲", img: "https://sdmntpraustraliaeast.oaiusercontent.com/files/00000000-fafc-61fa-802a-ff0cb7f25497/raw?se=2025-09-17T07%3A55%3A49Z&sp=r&sv=2024-08-04&sr=b&scid=42f1f1c8-2438-5562-acff-20bff835d608&skoid=732f244e-db13-47c3-bcc7-7ee02a9397bc&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-09-17T01%3A14%3A02Z&ske=2025-09-18T01%3A14%3A02Z&sks=b&skv=2024-08-04&sig=IRetZKIICU6dApfWpRVjJp%2BNCCvHLxpvScboK0puCcs%3D" },
];

const EXPENSIVE_FOOD = [
  { id: "steak", label: "🥩 Steak", cost: 50, hungerBoost: 40, happinessBoost: 20 },
  { id: "sushi", label: "🍣 Sushi", cost: 75, hungerBoost: 50, happinessBoost: 30 },
  { id: "truffle", label: "🍄 Truffle", cost: 100, hungerBoost: 70, happinessBoost: 40 },
];

const ENVIRONMENTS = [
  { id: "home", label: "🏠 Home", bg: "from-yellow-100 to-yellow-200" },
  { id: "park", label: "🌳 Park", bg: "from-green-200 to-green-300" },
  { id: "beach", label: "🏖 Beach", bg: "from-blue-200 to-cyan-200" },
];

const SHOP_SKINS = [
  { id: "robot", name: "cute cat", img: "https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-45ac-622f-b6d1-db9235f88efb/raw?se=2025-09-17T08%3A25%3A40Z&sp=r&sv=2024-08-04&sr=b&scid=2230c0d3-de0d-5007-8114-1fb5e9a07730&skoid=03727f49-62d3-42ac-8350-1c0e6559d238&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-09-17T00%3A50%3A16Z&ske=2025-09-18T00%3A50%3A16Z&sks=b&skv=2024-08-04&sig=MG4W7ZekQFAhXfLbMID/aif2732quvPaCCoOO4Z5lEE%3D", cost: 200 },
  { id: "unicorn", name: "Red dragon", img: "https://sdmntprwestus3.oaiusercontent.com/files/00000000-705c-61fd-9e47-ae8068453466/raw?se=2025-09-17T08%3A17%3A23Z&sp=r&sv=2024-08-04&sr=b&scid=be298104-8eb5-51cf-b416-31c96affd754&skoid=03727f49-62d3-42ac-8350-1c0e6559d238&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-09-17T00%3A50%3A20Z&ske=2025-09-18T00%3A50%3A20Z&sks=b&skv=2024-08-04&sig=HrAHenqy24eup3Y68gGA5Ddu20fVL5NjhNFsmywy/e8%3D", cost: 300 },
  { id: "lion", name: "Fancy dog", img: "https://sdmntprwestus3.oaiusercontent.com/files/00000000-5c80-61fd-88e5-ff1d43e43c0a/raw?se=2025-09-17T07%3A55%3A48Z&sp=r&sv=2024-08-04&sr=b&scid=f710038f-5039-50ba-91b9-f494cddca491&skoid=732f244e-db13-47c3-bcc7-7ee02a9397bc&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-09-17T06%3A54%3A28Z&ske=2025-09-18T06%3A54%3A28Z&sks=b&skv=2024-08-04&sig=AgrAF%2BRyys9heTlNKy0YSJ7hYoaOvy100xzMMCsMjvg%3D", cost: 250 },
];

const SHOP_ACCESSORIES = [
  { id: "hat_red", name: "Red Hat", slot: "hat", img: "🎩", cost: 80 },
  { id: "glasses", name: "Cool Specs", slot: "specs", img: "🕶", cost: 120 },
  { id: "bow", name: "Neck Bow", slot: "bow", img: "🎀", cost: 70 },
];

const SHOP_BOOSTS = [
  { id: "boost_time", name: "+10s", effect: { type: "time", value: 10 }, cost: 150 },
  { id: "boost_double", name: "Double Coins (1 game)", effect: { type: "double", value: 1 }, cost: 250 },
];

type AccessorySlot = 'hat' | 'specs' | 'bow';
type AccessoryPosition = {
  top?: string;
  bottom?: string;
  left: string;
  transform: string;
  width: string;
};
type AccessoryPositions = {
  [slot in AccessorySlot]?: AccessoryPosition;
};
type AccessoryPositionsMap = {
  [petId: string]: AccessoryPositions;
};

const ACCESSORY_POSITIONS: AccessoryPositionsMap = {
  dog: {
    hat: { top: '-6%', left: '50%', transform: 'translate(-50%, 0)', width: '70%' },
    specs: { top: '34%', left: '50%', transform: 'translate(-50%, 0)', width: '62%' },
    bow: { bottom: '4%', left: '50%', transform: 'translate(-50%, 0)', width: '60%' },
  },
  cat: {
    hat: { top: '-4%', left: '50%', transform: 'translate(-50%, 0)', width: '70%' },
    specs: { top: '36%', left: '50%', transform: 'translate(-50%, 0)', width: '60%' },
    bow: { bottom: '4%', left: '50%', transform: 'translate(-50%, 0)', width: '55%' },
  },
  dragon: {
    hat: { top: '-10%', left: '50%', transform: 'translate(-50%, 0)', width: '80%' },
    specs: { top: '30%', left: '50%', transform: 'translate(-50%, 0)', width: '70%' },
    bow: { bottom: '6%', left: '50%', transform: 'translate(-50%, 0)', width: '70%' },
  },
  robot: {
    hat: { top: '-8%', left: '50%', transform: 'translate(-50%, 0)', width: '72%' },
    specs: { top: '34%', left: '50%', transform: 'translate(-50%, 0)', width: '66%' },
    bow: { bottom: '4%', left: '50%', transform: 'translate(-50%, 0)', width: '60%' },
  },
};

type PetType = {
  id: keyof typeof ACCESSORY_POSITIONS;
  name: string;
  emoji: string;
  img: string;
  hunger: number;
  happiness: number;
  energy: number;
  age: number;
};

export default function App() {
  const [pet, setPet] = useState<PetType | null>(null);
  const [adopted, setAdopted] = useState(false);
  const [coins, setCoins] = useState(0);
  const [environment, setEnvironment] = useState("home");

  const [unlockedSkins, setUnlockedSkins] = useState<string[]>([]);
  const [unlockedAccessories, setUnlockedAccessories] = useState<string[]>([]);
  const [equippedSkin, setEquippedSkin] = useState<string | null>(null);
  const [equippedAccessories, setEquippedAccessories] = useState({ hat: null, specs: null, bow: null });
  const [shopOpen, setShopOpen] = useState(false);
  const [shopTab, setShopTab] = useState("skins");

  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);

  type GameItem = { id: number; type: string; x: number; y: number };
  const [items, setItems] = useState<GameItem[]>([]);
  const itemsRef = useRef<GameItem[]>([]);
  const requestRef = useRef<number | null>(null);

  const [selectedTime, setSelectedTime] = useState(15);
  const [timeLeft, setTimeLeft] = useState(0);
  const timeLeftRef = useRef(0);

  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const sessionCoinsRef = useRef(0);

  const dogXRef = useRef(50);
  const [dogX, setDogX] = useState(50);
  const keysPressed = useRef({ left: false, right: false });

  const [activeBoosts, setActiveBoosts] = useState({ doubleCoins: false });

  

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("petData_v2");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.pet) {
          setPet(parsed.pet);
          setCoins(parsed.coins || 0);
          setEnvironment(parsed.environment || "home");
          setUnlockedSkins(parsed.unlockedSkins || []);
          setUnlockedAccessories(parsed.unlockedAccessories || []);
          setEquippedSkin(parsed.equippedSkin || null);
          setEquippedAccessories(parsed.equippedAccessories || { hat: null, specs: null, bow: null });
          setAdopted(true);
        }
      } catch (e) {
        console.error("Error parsing saved pet data", e);
      }
    }
  }, []);

  useEffect(() => {
    if (!adopted || !pet) return;
    localStorage.setItem(
      "petData_v2",
      JSON.stringify({ pet, coins, environment, unlockedSkins, unlockedAccessories, equippedSkin, equippedAccessories })
    );
  }, [pet, coins, environment, unlockedSkins, unlockedAccessories, equippedSkin, equippedAccessories, adopted]);

  useEffect(() => {
    if (!adopted || !pet) return;
    const id = setInterval(() => {
      setPet((prev) => {
        if (!prev || typeof prev !== "object") return prev;
        return {
          ...prev,
          hunger: Math.max(0, (prev.hunger || 0) - 5),
          happiness: Math.max(0, (prev.happiness || 0) - 3),
          energy: Math.max(0, (prev.energy || 0) - 2),
          age: (prev.age || 0) + 1,
        } as typeof prev;
      });
    }, 10000);
    return () => clearInterval(id);
  }, [adopted, pet]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") keysPressed.current.left = true;
      if (e.key === "ArrowRight") keysPressed.current.right = true;
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") keysPressed.current.left = false;
      if (e.key === "ArrowRight") keysPressed.current.right = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    if (timeLeftRef.current <= 0) {
      endGame();
      return;
    }
    const t = setTimeout(() => {
      setTimeLeft((prev) => {
        const next = Math.max(0, prev - 1);
        timeLeftRef.current = next;
        return next;
      });
    }, 1000);
    return () => clearTimeout(t);
  }, [playing, timeLeft]);

  type PetChoice = { id: string; name: string; emoji: string; img: string };
  const adoptPet = (choice: PetChoice) => {
    setPet({ id: choice.id as "dog" | "cat" | "dragon" | "robot", name: choice.name, emoji: choice.emoji, img: choice.img, hunger: 80, happiness: 70, energy: 60, age: 0 });
    setCoins(0);
    setAdopted(true);
    setEquippedSkin(null);
    setEquippedAccessories({ hat: null, specs: null, bow: null });
  };

  const releasePet = () => {
    setPet(null);
    setAdopted(false);
    setCoins(0);
    localStorage.removeItem("petData_v2");
  };

  const updateStat = (key: keyof Pick<PetType, "hunger" | "happiness" | "energy">, amount: number) => {
    setPet((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [key]: Math.min(100, Math.max(0, (prev[key] as number ?? 0) + amount)),
      };
    });
  };

  const feedExpensive = (food: { id: string; label: string; cost: number; hungerBoost: number; happinessBoost: number }) => {
    if (coins < food.cost) {
      alert("Not enough coins! 🪙");
      return;
    }
    setCoins((c) => c - food.cost);
    updateStat("hunger", food.hungerBoost);
    updateStat("happiness", food.happinessBoost);
  };

  const buySkin = (skin: { id: string; name: string; img: string; cost: number }) => {
    if (unlockedSkins.includes(skin.id)) return;
    if (coins < skin.cost) { alert('Not enough coins'); return; }
    setCoins((c) => c - skin.cost);
    setUnlockedSkins((u) => [...u, skin.id]);
    setEquippedSkin(skin.id);
    setPet((p) => p ? ({ ...p, img: skin.img, name: skin.name, id: skin.id as "dog" | "cat" | "dragon" | "robot" }) : p);
  };

  const equipSkin = (skin: { id: string; name: string; img: string }) => {
    if (!unlockedSkins.includes(skin.id)) return;
    setEquippedSkin(skin.id);
    setPet((p) => p ? ({ ...p, img: skin.img, name: skin.name, id: skin.id as "dog" | "cat" | "dragon" | "robot" }) : p);
  };

  const buyAccessory = (acc: { id: string; name: string; slot: string; img: string; cost: number }) => {
    if (unlockedAccessories.includes(acc.id)) return;
    if (coins < acc.cost) { alert('Not enough coins'); return; }
    setCoins((c) => c - acc.cost);
    setUnlockedAccessories((u) => [...u, acc.id]);
  };

  const equipAccessory = (acc: { id: string; name: string; slot: string; img: string; cost: number }) => {
    if (!unlockedAccessories.includes(acc.id)) return;
    setEquippedAccessories((prev) => ({ ...prev, [acc.slot]: acc.id }));
  };

  const buyBoost = (boost: { id: string; name: string; effect: { type: string; value: number }; cost: number }) => {
    if (coins < boost.cost) { alert('Not enough coins'); return; }
    setCoins((c) => c - boost.cost);
    if (boost.effect.type === "time") {
      if (playing) {
        setTimeLeft((t) => { timeLeftRef.current = t + boost.effect.value; return t + boost.effect.value; });
      } else {
        setSelectedTime((s) => s + boost.effect.value);
      }
    } else if (boost.effect.type === "double") {
      setActiveBoosts({ doubleCoins: true });
    }
  };

  const startGame = () => {
    setPlaying(true);
    setScore(0);
    sessionCoinsRef.current = 0;
    setTimeLeft(selectedTime);
    timeLeftRef.current = selectedTime;
    dogXRef.current = 50;
    setDogX(50);
    itemsRef.current = [];
    setItems([]);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(gameLoop);
  };

  const endGame = () => {
    if (requestRef.current) { cancelAnimationFrame(requestRef.current); requestRef.current = null; }
    setPlaying(false);
    setFinalScore(score);
    setCoinsEarned(sessionCoinsRef.current);
    setGameOver(true);
    if (activeBoosts.doubleCoins) setActiveBoosts({ doubleCoins: false });
    itemsRef.current = [];
    setItems([]);
  };

  const gameLoop = (_time: number) => {
    const nearEnd = timeLeftRef.current <= 5;
    const fallSpeed = nearEnd ? 2.8 : 1.2;
    const moveSpeed = nearEnd ? 1.8 : 1.0;

    let prevX = dogXRef.current;
    if (keysPressed.current.left && !keysPressed.current.right) prevX = Math.max(0, prevX - moveSpeed * 1.8);
    else if (keysPressed.current.right && !keysPressed.current.left) prevX = Math.min(100, prevX + moveSpeed * 1.8);
    dogXRef.current = prevX;
    setDogX(prevX);

    const spawnRoll = Math.random();
    const spawnChance = nearEnd ? 0.09 : 0.045;
    if (spawnRoll < spawnChance) {
      let type = 'coin';
      const rarer = Math.random();
      if (rarer > 0.995) type = 'diamond';
      else if (rarer > 0.98) type = 'clover';
      else if (Math.random() < 0.18) type = 'bomb';
      else type = 'coin';
      itemsRef.current.push({ id: Date.now() + Math.floor(Math.random() * 1000), type, x: Math.random() * 90, y: 0 });
    }

    itemsRef.current = itemsRef.current.map((it) => ({ ...it, y: it.y + fallSpeed }));

    const newItems = [];
    for (const it of itemsRef.current) {
      if (it.y >= 85 && Math.abs(it.x - dogXRef.current) <= 10) {
        if (it.type === 'coin') {
          const value = activeBoosts.doubleCoins ? 40 : 20;
          setScore((s) => s + 1);
          setCoins((c) => c + value);
          sessionCoinsRef.current += value;
        } else if (it.type === 'diamond') {
          const val = 200;
          setScore((s) => s + 2);
          setCoins((c) => c + val);
          sessionCoinsRef.current += val;
        } else if (it.type === 'clover') {
          setTimeLeft((t) => { timeLeftRef.current = t + 5; return t + 5; });
        } else if (it.type === 'bomb') {
          setScore((s) => Math.max(0, s - 1));
          setCoins((c) => Math.max(0, c - 20));
        }
      } else {
        if (it.y < 100) newItems.push(it);
      }
    }
    itemsRef.current = newItems;
    setItems([...itemsRef.current]);

    if (playing) requestRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => { return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); }; }, []);

  const getAccessoryById = (id: string) => SHOP_ACCESSORIES.find(a => a.id === id) || null;
  const getSkinById = (id: string) => SHOP_SKINS.find(s => s.id === id) || null;

  const getStage = () => { const a = pet?.age ?? 0; if (a < 30) return 'Baby'; if (a < 100) return 'Teen'; return 'Adult'; };

  return (
    <div className={`min-h-screen flex items-start justify-center bg-gradient-to-r ${ENVIRONMENTS.find((e) => e.id === environment)?.bg} p-6`}>
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-6 text-center">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">🐾 Virtual Pet</h1>
          <div className="text-right">
            <p className="font-medium">💰 Coins: {coins}</p>
            <div className="mt-2">
              <button onClick={() => setShopOpen((s) => !s)} className="px-3 py-1 bg-indigo-500 text-white rounded-md mr-2">Shop</button>
              <button onClick={() => setEnvironment(environment === 'home' ? 'park' : environment === 'park' ? 'beach' : 'home')} className="px-3 py-1 bg-gray-200 rounded-md">Change BG</button>
            </div>
          </div>
        </div>

        {!adopted || !pet ? (
          <>
            <h2 className="text-lg mb-4">Adopt your pet!</h2>
            <div className="grid grid-cols-3 gap-4">
              {PETS.map((p) => (
                <button key={p.id} onClick={() => adoptPet(p)} className="flex flex-col items-center bg-gray-100 p-3 rounded-xl shadow hover:bg-gray-200">
                  <img src={p.img} alt={p.name} className="w-16 h-16" />
                  <span className="mt-2 font-semibold">{p.name} {p.emoji}</span>
                </button>
              ))}
            </div>
          </>) : ( 
          <>
            <div>
              <div className="relative mx-auto w-40 h-40 mb-4">
                {pet && <img src={pet.img} alt={pet.name} className="absolute inset-0 w-full h-full object-contain" />}
                {['hat', 'specs', 'bow'].map((slot) => {
                  const accId = equippedAccessories[slot as keyof typeof equippedAccessories];
                  if (!accId) return null;
                  const acc = getAccessoryById(accId);
                  if (!acc) return null;
                  const pos = ACCESSORY_POSITIONS[pet?.id || 'dog'] || ACCESSORY_POSITIONS['dog'];
                  const style = pos[slot as keyof typeof pos] || { top: '30%', left: '50%', transform: 'translate(-50%,0)' };
                  return (
                    <React.Fragment key={slot}>
                      <img src={acc.img} alt={acc.name} style={{ position: 'absolute', ...style }} />
                    </React.Fragment>
                  );
                })}
              </div>

              <div className="space-y-3 text-left">
                {pet && (
                  <>
                    <StatBar label="🍖 Hunger" value={pet.hunger ?? 0} color="bg-green-400" />
                    <StatBar label="😊 Happiness" value={pet.happiness ?? 0} color="bg-yellow-400" />
                    <StatBar label="⚡ Energy" value={pet.energy ?? 0} color="bg-blue-400" />
                    <p className="font-medium">🌱 Age: {pet.age ?? 0} days</p>
                  </>
                )}
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-6 flex-wrap">
                <button onClick={() => updateStat('hunger', 15)} className="px-4 py-2 bg-green-400 rounded-xl shadow hover:bg-green-500">Feed 🍖</button>
                <button onClick={startGame} className="px-4 py-2 bg-yellow-400 rounded-xl shadow hover:bg-yellow-500">Play 🎮</button>
                <button onClick={() => updateStat('energy', 15)} className="px-4 py-2 bg-blue-400 rounded-xl shadow hover:bg-blue-500">Sleep 💤</button>
                <button onClick={releasePet} className="px-4 py-2 bg-red-400 rounded-xl shadow hover:bg-red-500">Release ❌</button>
              </div>
            <div className="mt-6">
                <h3 className="font-bold mb-2">💎 Expensive Food</h3>
                <div className="flex justify-center gap-3 flex-wrap">
                  {EXPENSIVE_FOOD.map((f) => (
                    <button key={f.id} onClick={() => feedExpensive(f)} className="px-3 py-2 rounded-xl shadow bg-gray-200 hover:bg-gray-300">{f.label} ({f.cost} 🪙)</button>
                  ))}
                </div>
              </div>
            <div className="mt-6">
                <h3 className="font-bold mb-2">🌍 Change Environment</h3>
                <div className="flex justify-center gap-3 flex-wrap">
                  {ENVIRONMENTS.map((e) => (
                    <button key={e.id} onClick={() => setEnvironment(e.id)} className={`px-3 py-2 rounded-xl shadow ${environment === e.id ? 'bg-purple-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>{e.label}</button>
                  ))}
                </div>
              </div>

            {!playing && (
              <div className="mt-6">
                <h3 className="font-bold mb-2">⏳ Select Game Duration</h3>
                <div className="flex justify-center gap-3 flex-wrap">
                  {[10, 15, 20, 25, 30].map((t) => (
                    <button key={t} onClick={() => setSelectedTime(t)} className={`px-3 py-2 rounded-lg shadow ${selectedTime === t ? 'bg-purple-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>{t}s</button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              {playing ? (
                <div className="relative w-full h-80 bg-gray-100 rounded-xl overflow-hidden select-none">
                  <p className="font-medium p-2">⏳ Time Left: {timeLeft}s</p>
                  <p className="font-medium p-2">⭐ Score: {score}</p>

                  {items.map((it,idx) => (
                    <div key={`${it.id}-${idx}`} className="absolute w-10 h-10 flex items-center justify-center text-2xl pointer-events-none" style={{ left: `${it.x}%`, top: `${it.y}%`, transform: 'translateX(-50%)' }}>

                      {it.type === 'coin' ? '🪙' : it.type === 'bomb' ? '💣' : it.type === 'diamond' ? '💎' : '🍀'}
                    </div>
                  ))}

                  <div className="absolute bottom-2 w-14 h-14" style={{ left: `${dogX}%`, transform: 'translateX(-50%)' }}>
                    {pet?.img ? <img src={pet.img} alt="pet" className="w-full h-full object-contain" /> : <div className="text-3xl">🐶</div>}

                    {(['hat', 'specs', 'bow'] as const).map((slot) => {
                      const accId = equippedAccessories[slot];
                      if (!accId) return null;
                      const acc = getAccessoryById(accId);
                      if (!acc) return null;
                      const pos = ACCESSORY_POSITIONS[pet?.id || 'dog'] || ACCESSORY_POSITIONS['dog'];
                      const style = pos[slot] || { top: '30%', left: '50%', transform: 'translate(-50%,0)' };
                      return <img key={slot} src={acc.img} alt={acc.name} style={{ position: 'absolute', ...style }} />;
                    })}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 flex justify-between p-2">
                    <button onMouseDown={() => (keysPressed.current.left = true)} onMouseUp={() => (keysPressed.current.left = false)} onTouchStart={() => (keysPressed.current.left = true)} onTouchEnd={() => (keysPressed.current.left = false)} className="px-4 py-2 bg-gray-300 rounded-lg">⬅️</button>
                    <button onMouseDown={() => (keysPressed.current.right = true)} onMouseUp={() => (keysPressed.current.right = false)} onTouchStart={() => (keysPressed.current.right = true)} onTouchEnd={() => (keysPressed.current.right = false)} className="px-4 py-2 bg-gray-300 rounded-lg">➡️</button>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-80 bg-gray-50 rounded-xl p-4 overflow-auto">
                  <h3 className="font-bold">Welcome!</h3>
                  <p className="text-sm mb-3">Play the game to earn coins and spend them in the shop. Rare items (💎, 🍀) can appear during gameplay.</p>
                  <div className="flex gap-3.justify-center">
                    <button onClick={startGame} className="px-4 py-2 bg-yellow-400 rounded-xl shadow hover:bg-yellow-500">Start Game</button>
                    <button onClick={() => setShopOpen(true)} className="px-4 py-2 bg-indigo-500 text-white rounded-xl">Open Shop</button>
                  </div>

                  {shopOpen && (
                    <div className="mt-4 text-left">
                      <div className="flex gap-2 mb-3">
                        <button onClick={() => setShopTab('skins')} className={`px-3 py-1 rounded ${shopTab === 'skins' ? 'bg-indigo-500 text-white' : 'bg-gray-100'}`}>Skins</button>
                        <button onClick={() => setShopTab('accessories')} className={`px-3 py-1 rounded ${shopTab === 'accessories' ? 'bg-indigo-500 text-white' : 'bg-gray-100'}`}>Accessories</button>
                        <button onClick={() => setShopTab('boosts')} className={`px-3 py-1 rounded ${shopTab === 'boosts' ? 'bg-indigo-500 text-white' : 'bg-gray-100'}`}>Boosts</button>
                      </div>

                      {shopTab === 'skins' && (
                        <div className="grid grid-cols-2 gap-3">
                          {SHOP_SKINS.map(s => (
                            <div key={s.id} className="border p-2 rounded">
                              <img src={s.img} alt={s.name} className="w-16 h-16 mx-auto" />
                              <p className="text-sm text-center">{s.name}</p>
                              {!unlockedSkins.includes(s.id) ? (
                                <button onClick={() => buySkin(s)} className="mt-2 w-full px-2 py-1 bg-green-400 text-white rounded">Buy {s.cost}🪙</button>
                              ) : (
                                <button onClick={() => equipSkin(s)} className="mt-2 w-full px-2 py-1 bg-blue-400 text-white rounded">Equip</button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {shopTab === 'accessories' && (
                        <div className="grid grid-cols-2 gap-3">
                          {SHOP_ACCESSORIES.map(a => (
                            <div key={a.id} className="border p-2 rounded">
                              <img src={a.img} alt={a.name} className="w-16 h-16 mx-auto" />
                              <p className="text-sm text-center">{a.name}</p>
                              {!unlockedAccessories.includes(a.id) ? (
                                <button onClick={() => buyAccessory(a)} className="mt-2 w-full px-2 py-1 bg-green-400 text-white rounded">Buy {a.cost}🪙</button>
                              ) : (
                                <div className="flex gap-2">
                                  <button onClick={() => equipAccessory(a)} className="mt-2 w-full px-2 py-1 bg-blue-400 text-white rounded">Equip</button>
                                  <button onClick={() => setEquippedAccessories((prev) => ({ ...prev, [a.slot]: null }))} className="mt-2 w-full px-2 py-1 bg-gray-300 rounded">Unequip</button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {shopTab === 'boosts' && (
                        <div className="grid grid-cols-1 gap-3">
                          {SHOP_BOOSTS.map(b => (
                            <div key={b.id} className="border p-2 rounded flex items-center justify-between">
                              <div>
                                <p className="font-medium">{b.name}</p>
                                <p className="text-sm text-gray-600">Cost: {b.cost}🪙</p>
                              </div>
                              <button onClick={() => buyBoost(b)} className="px-3 py-1 bg-green-400 text-white rounded">Buy</button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-3 text-right">
                        <button onClick={() => setShopOpen(false)} className="px-3 py-1 bg-gray-200 rounded">Close Shop</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {gameOver && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full animate-fadeIn">
                  <h2 className="text-xl font-bold text-center mb-4">🎮 Game Over!</h2>
                  <p className="text-center">Final Score (coins caught): <b>{finalScore}</b></p>
                  <p className="text-center">Coins Earned this session: <b>{coinsEarned}</b></p>
                  <div className="mt-4 flex justify-around">
                    <button onClick={() => { setGameOver(false); startGame(); }} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Play Again</button>
                    <button onClick={() => setGameOver(false)} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Close</button>
                  </div>
                </div>
                <style jsx>{`.animate-fadeIn{animation:fadeIn .4s ease-out}@keyframes fadeIn{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}`}</style>
              </div>
            )}

          </>
        )}

      </div>
    </div>
  );
}

type StatBarProps = {
  label: string;
  value: number;
  color: string;
};

function StatBar(props: StatBarProps) {
  const { label, value, color } = props;
  const safeValue = Math.max(0, Math.min(100, value || 0));
  return (
    <div>
      <p className="font-medium">{label}: {safeValue}%</p>
      <div className="w-full h-3 bg-gray-200 rounded-full"><div className={`${color} h-3 rounded-full`} style={{ width: `${safeValue}%` }} /></div>
    </div>
  );
}
