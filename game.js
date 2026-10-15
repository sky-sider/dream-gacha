
// ========================================
// ゆめのまちのガチャコレクション
// ゲームの設定
// ========================================

const SAVE_KEY = "yumeGachaSave_v1";

const START_COINS = 100;
const DRAW_INTERVAL_MINUTES = 10 / 60;
const COINS_PER_INTERVAL = 1;
const MAX_OFFLINE_HOURS = 8;
const UNLOCK_COST = 50;
const UNLOCK_COLLECTION_COUNT = 5;

// アイテムのデータ
// weight が大きいほど出やすくなります。
// 各ガチャの中で、weight の合計を使って抽選します。

const items = [
  {
    id: "moon-cat",
    name: "ゆめねこ",
    icon: "🐈",
    rarity: "レア",
    weight: 8,
    machine: "starter",
    description: "いつも夢の中で、ふかふかの雲を探しています。"
  },
  {
    id: "dream-mushroom",
    name: "ゆめのきのこ",
    icon: "🍄",
    rarity: "ノーマル",
    weight: 25,
    machine: "starter",
    description: "夜になると、ほんのり光る不思議なきのこ。"
  },
  {
    id: "star-fragment",
    name: "星のかけら",
    icon: "⭐",
    rarity: "ノーマル",
    weight: 25,
    machine: "starter",
    description: "夢の空から落ちてきた、小さな星。"
  },
  {
    id: "cloud-bunny",
    name: "くものうさぎ",
    icon: "🐇",
    rarity: "ノーマル",
    weight: 25,
    machine: "starter",
    description: "雲の上をぴょんぴょん跳ねるうさぎ。"
  },
  {
    id: "dream-bottle",
    name: "夢びん",
    icon: "🫙",
    rarity: "スーパーレア",
    weight: 2,
    machine: "starter",
    description: "誰かが見た夢が、ひとつ入っています。"
  },
  {
    id: "forest-spirit",
    name: "森のこびと",
    icon: "🧚",
    rarity: "レア",
    weight: 10,
    machine: "forest",
    description: "森の秘密を知っている小さな住人。"
  },
  {
    id: "sleepy-owl",
    name: "ねむねむフクロウ",
    icon: "🦉",
    rarity: "ノーマル",
    weight: 25,
    machine: "forest",
    description: "起きているのか眠っているのか不明です。"
  },
  {
    id: "blue-chick",
    name: "水色ひよこ",
    icon: "🐣",
    rarity: "ノーマル",
    weight: 25,
    machine: "forest",
    description: "雨上がりの水たまりが大好き。"
  },
  {
    id: "flower-spirit",
    name: "おしゃべりな花",
    icon: "🌷",
    rarity: "ノーマル",
    weight: 25,
    machine: "forest",
    description: "昨日の夢の話を聞かせてくれます。"
  },
  {
    id: "rainbow-seed",
    name: "虹のたね",
    icon: "🌈",
    rarity: "スーパーレア",
    weight: 3,
    machine: "forest",
    description: "植えると、まだ誰も見たことのない花が咲くそうです。"
  }
];

// ガチャ機械のデータ
const machines = [
  {
    id: "starter",
    name: "はじまりのガチャ",
    description: "夢の町の、最初のガチャ。",
    price: 10,
    icon: "🌙",
    theme: "pink"
  },
  {
    id: "forest",
    name: "おとぎの森ガチャ",
    description: "森に住む、不思議な生き物たち。",
    price: 15,
    icon: "🌿",
    theme: "green"
  }
];

// ========================================
// セーブデータ
// ========================================

function createNewSave() {
  return {
    coins: START_COINS,
    inventory: {},
    unlockedMachines: ["starter"],
    selectedMachine: "starter",
    lastTime: Date.now()
  };
}

function loadSave() {
  try {
    const saved = localStorage.getItem(SAVE_KEY);

    if (!saved) {
      return createNewSave();
    }

    const data = JSON.parse(saved);

    if (
      !data ||
      typeof data.coins !== "number" ||
      !data.inventory ||
      !Array.isArray(data.unlockedMachines)
    ) {
      return createNewSave();
    }

    const validMachines = machines
      .filter(machine => data.unlockedMachines.includes(machine.id))
      .map(machine => machine.id);

    if (!validMachines.includes("starter")) {
      validMachines.unshift("starter");
    }

    return {
      coins: Math.max(0, data.coins),
      inventory: data.inventory,
      unlockedMachines: validMachines,
      selectedMachine: validMachines.includes(data.selectedMachine)
        ? data.selectedMachine
        : "starter",
      lastTime: typeof data.lastTime === "number"
        ? data.lastTime
        : Date.now()
    };
  } catch (error) {
    console.error("セーブデータを読み込めませんでした。", error);
    return createNewSave();
  }
}

let save = loadSave();

// 前回のプレイから経過した時間を計算する。
// オフライン中の収入は最大8時間分まで。
function applyOfflineIncome() {
  const now = Date.now();
  const previous = save.lastTime || now;
  const elapsed = Math.max(0, now - previous);
  const cappedElapsed = Math.min(
    elapsed,
    MAX_OFFLINE_HOURS * 60 * 60 * 1000
  );

  const minutes = Math.floor(
    cappedElapsed / (DRAW_INTERVAL_MINUTES * 60 * 1000)
  );

  if (minutes > 0) {
    save.coins += minutes * COINS_PER_INTERVAL;
  }

  save.lastTime = now;
}

function saveGame() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  } catch (error) {
    console.error("セーブに失敗しました。", error);
    setStatus("セーブできませんでした。ブラウザの保存設定を確認してください。");
  }
}

// ========================================
// HTML要素を取得
// ========================================

const coinDisplay = document.getElementById("coins");
const machineList = document.getElementById("machines");
const machineTitle = document.getElementById("machine-title");
const machineDescription = document.getElementById("machine-description");
const machineArt = document.getElementById("machine-art");
const capsule = document.getElementById("capsule");
const priceDisplay = document.getElementById("price");
const drawButton = document.getElementById("draw-button");
const statusDisplay = document.getElementById("status");
const resultBox = document.getElementById("result");
const resultLabel = document.getElementById("result-label");
const resultIcon = document.getElementById("result-icon");
const resultName = document.getElementById("result-name");
const resultRarity = document.getElementById("result-rarity");
const resultNote = document.getElementById("result-note");
const collectionGrid = document.getElementById("collection");
const collectionCount = document.getElementById("collection-count");
const progressBar = document.getElementById("progress-bar");
const unlockButton = document.getElementById("unlock-button");
const unlockRequirements = document.getElementById("unlock-requirements");
const unlockCard = document.getElementById("unlock-card");
const incomeStatus = document.getElementById("income-status");
const resetButton = document.getElementById("reset-button");

let isDrawing = false;

// ========================================
// 共通処理
// ========================================

function setStatus(message) {
  statusDisplay.textContent = message;
}

function getSelectedMachine() {
  return machines.find(
    machine => machine.id === save.selectedMachine
  ) || machines[0];
}

function getOwnedUniqueCount() {
  return items.filter(item => (save.inventory[item.id] || 0) > 0)
    .length;
}

function getMachineItems(machineId) {
  return items.filter(item => item.machine === machineId);
}

// ========================================
// コイン表示・時間経過
// ========================================

function renderCoins() {
  coinDisplay.textContent = Math.floor(save.coins).toLocaleString();
}

function updateIncomeStatus() {
  const elapsed = Math.max(0, Date.now() - save.lastTime);
  const minuteMs = DRAW_INTERVAL_MINUTES * 60 * 1000;
  const remaining = Math.max(0, minuteMs - elapsed);
  const seconds = Math.ceil(remaining / 1000);

  incomeStatus.textContent =
    `次のコインまで約 ${seconds} 秒。10秒ごとに1コイン獲得します。`;
}

function tickIncome() {
  const now = Date.now();
  const minuteMs = DRAW_INTERVAL_MINUTES * 60 * 1000;
  const elapsed = Math.max(0, now - save.lastTime);
  const cappedElapsed = Math.min(
    elapsed,
    MAX_OFFLINE_HOURS * 60 * 60 * 1000
  );
  const minutes = Math.floor(cappedElapsed / minuteMs);

  if (minutes > 0) {
    save.coins += minutes * COINS_PER_INTERVAL;

    // 加算した時間分だけ時刻を進める。
    // タイマーが少し遅れても、経過時間を失いにくくする。
    save.lastTime += minutes * minuteMs;

    renderCoins();
    saveGame();
    renderUnlock();
  }

  updateIncomeStatus();
}

// ========================================
// ガチャ機械一覧
// ========================================

function renderMachines() {
  machineList.replaceChildren();

  machines.forEach(machine => {
    const unlocked = save.unlockedMachines.includes(machine.id);
    const selected = save.selectedMachine === machine.id;

    const card = document.createElement("article");
    card.className = "machine-card";

    if (selected) card.classList.add("selected");
    if (!unlocked) card.classList.add("locked");

    const art = document.createElement("div");
    art.className = "mini-machine";

    if (machine.theme === "green") {
      art.classList.add("green");
    }

    const windowBox = document.createElement("div");
    windowBox.className = "mini-window";
    windowBox.textContent = unlocked ? machine.icon : "🔒";
    art.appendChild(windowBox);

    const name = document.createElement("h3");
    name.textContent = machine.name;

    const description = document.createElement("p");
    description.textContent = unlocked
      ? `1回 ${machine.price} コイン`
      : "まだ使えません";

    const button = document.createElement("button");
    button.className = "button " + (selected ? "primary" : "secondary");
    button.textContent = !unlocked
      ? "🔒 未解放"
      : selected
        ? "選択中"
        : "この機械を選ぶ";
    button.disabled = !unlocked || selected || isDrawing;

    button.addEventListener("click", () => {
      if (!save.unlockedMachines.includes(machine.id)) return;

      save.selectedMachine = machine.id;
      resultBox.classList.add("hidden");
      saveGame();
      renderAll();
      setStatus(`${machine.name}を選びました。`);
      document.getElementById("play-area").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });

    card.append(art, name, description, button);
    machineList.appendChild(card);
  });
}

// ========================================
// ガチャ画面
// ========================================

function renderPlayArea() {
  const machine = getSelectedMachine();

  machineTitle.textContent = machine.name;
  machineDescription.textContent = machine.description;
  priceDisplay.textContent = machine.price;

  machineArt.classList.toggle("green", machine.theme === "green");
  capsule.textContent = machine.icon;

  drawButton.disabled = isDrawing || save.coins < machine.price;
  drawButton.textContent = save.coins < machine.price
    ? "コインが足りません"
    : isDrawing
      ? "カプセルを取り出しています…"
      : "✨ ガチャを回す";
}

// ========================================
// ランダム抽選
// ========================================

function drawRandomItem(machineId) {
  const candidates = getMachineItems(machineId);
  const totalWeight = candidates.reduce(
    (total, item) => total + item.weight,
    0
  );

  if (candidates.length === 0 || totalWeight <= 0) {
    return null;
  }

  let random = Math.random() * totalWeight;

  for (const item of candidates) {
    random -= item.weight;

    if (random < 0) {
      return item;
    }
  }

  return candidates[candidates.length - 1];
}

function drawGacha() {
  if (isDrawing) return;

  const machine = getSelectedMachine();

  if (!save.unlockedMachines.includes(machine.id)) {
    setStatus("このガチャはまだ解放されていません。");
    return;
  }

  if (save.coins < machine.price) {
    setStatus("コインが足りません。少し待ってみましょう。");
    renderPlayArea();
    return;
  }

  const item = drawRandomItem(machine.id);

  if (!item) {
    setStatus("このガチャにはアイテムがありません。");
    return;
  }

  save.coins -= machine.price;
  isDrawing = true;

  resultBox.classList.add("hidden");
  machineArt.classList.remove("shake");

  // アニメーションを再スタートする
  void machineArt.offsetWidth;
  machineArt.classList.add("shake");

  setStatus("カプセルがころころ……！");
  renderCoins();
  renderPlayArea();
  renderMachines();

  window.setTimeout(() => {
    isDrawing = false;

    const oldCount = save.inventory[item.id] || 0;
    save.inventory[item.id] = oldCount + 1;

    showResult(item, oldCount === 0);

    saveGame();
    renderAll();

    if (oldCount === 0) {
      setStatus("新しいアイテムを発見！ 図鑑に登録しました。");
    } else {
      setStatus("また出会えました！ 所持数が増えました。");
    }
  }, 450);
}

function showResult(item, isNew) {
  resultBox.classList.remove("hidden");

  resultLabel.textContent = isNew ? "✨ NEW DISCOVERY!" : "GET!";
  resultIcon.textContent = item.icon;
  resultName.textContent = item.name;
  resultRarity.textContent = item.rarity;
  resultRarity.className = "rarity " + item.rarity;
  resultNote.textContent = item.description;

  capsule.textContent = item.icon;
}

// ========================================
// コレクション図鑑
// ========================================

function renderCollection() {
  collectionGrid.replaceChildren();

  items.forEach(item => {
    const count = save.inventory[item.id] || 0;
    const owned = count > 0;

    const card = document.createElement("div");
    card.className = "collectible " + (owned ? "owned" : "unknown");

    const icon = document.createElement("div");
    icon.className = "collectible-icon";
    icon.textContent = owned ? item.icon : "？";

    const name = document.createElement("div");
    name.className = "collectible-name";
    name.textContent = owned ? item.name : "？？？";

    const amount = document.createElement("div");
    amount.className = "collectible-count";
    amount.textContent = owned ? `× ${count}` : "未発見";

    card.append(icon, name, amount);
    collectionGrid.appendChild(card);
  });

  const ownedCount = getOwnedUniqueCount();
  collectionCount.textContent = `${ownedCount} / ${items.length}`;
  progressBar.style.width = `${(ownedCount / items.length) * 100}%`;
}

// ========================================
// 2台目の解放
// 条件：図鑑5種類以上 ＋ 50コイン
// ========================================

function renderUnlock() {
  const alreadyUnlocked = save.unlockedMachines.includes("forest");
  const ownedCount = getOwnedUniqueCount();

  if (alreadyUnlocked) {
    unlockCard.classList.add("unlocked");
    unlockRequirements.textContent = "解放済み！ お店で選べます。";
    unlockButton.textContent = "解放済み";
    unlockButton.disabled = true;
    return;
  }

  unlockCard.classList.remove("unlocked");

  const enoughItems = ownedCount >= UNLOCK_COLLECTION_COUNT;
  const enoughCoins = save.coins >= UNLOCK_COST;

  unlockRequirements.textContent =
    `図鑑 ${ownedCount}/${UNLOCK_COLLECTION_COUNT} 種類・コイン ${Math.floor(save.coins)}/${UNLOCK_COST} 枚`;

  if (enoughItems && enoughCoins) {
    unlockButton.textContent = `🪙 ${UNLOCK_COST}コインで解放`;
    unlockButton.disabled = false;
  } else {
    unlockButton.textContent = "条件を達成しよう";
    unlockButton.disabled = true;
  }
}

function unlockForest() {
  if (save.unlockedMachines.includes("forest")) return;

  const ownedCount = getOwnedUniqueCount();

  if (ownedCount < UNLOCK_COLLECTION_COUNT) {
    setStatus(`まず図鑑を${UNLOCK_COLLECTION_COUNT}種類集めましょう。`);
    return;
  }

  if (save.coins < UNLOCK_COST) {
    setStatus(`${UNLOCK_COST}コイン必要です。もう少し貯めましょう。`);
    return;
  }

  save.coins -= UNLOCK_COST;
  save.unlockedMachines.push("forest");

  saveGame();
  renderAll();

  setStatus("おめでとう！ おとぎの森ガチャが解放されました！");
}

// ========================================
// まとめて画面更新
// ========================================

function renderAll() {
  renderCoins();
  renderMachines();
  renderPlayArea();
  renderCollection();
  renderUnlock();
  updateIncomeStatus();
}

// ========================================
// ボタンイベント
// ========================================

drawButton.addEventListener("click", drawGacha);
unlockButton.addEventListener("click", unlockForest);

resetButton.addEventListener("click", () => {
  const confirmed = window.confirm(
    "コイン・図鑑・解放状況をすべて消して、最初から始めますか？"
  );

  if (!confirmed) return;

  save = createNewSave();
  saveGame();
  resultBox.classList.add("hidden");
  setStatus("新しい夢の町が始まりました！");
  renderAll();
});

// ========================================
// 起動
// ========================================

applyOfflineIncome();
renderAll();
saveGame();

// 1秒ごとに経過時間を確認する。
// 実際の収入は1分ごとに加算されます。
window.setInterval(tickIncome, 1000);

// ページを離れる直前にも保存する
window.addEventListener("pagehide", saveGame);
window.addEventListener("beforeunload", saveGame);
