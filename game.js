
// ========================================
// ゆめのまちのガチャコレクション
// ゲームの設定
// ========================================

const SAVE_KEY = "yumeGachaSave_v1";

const START_COINS = 100;
const DRAW_INTERVAL_MINUTES = 1 / 60;
const COINS_PER_INTERVAL = 1;
const MAX_OFFLINE_HOURS = 8;
const UNLOCK_COST = 50;
const UNLOCK_COLLECTION_COUNT = 5;


// アイテムのデータ
// weight が大きいほど出やすくなります。
// machine は排出されるガチャのIDです。

const items = [
  // ========================================
  // はじまりのガチャ：既存の5種類
  // ========================================
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

  // はじまりのガチャ：追加7種類
  {
    id: "sleepy-moon",
    name: "おねむの月",
    icon: "🌙",
    rarity: "ノーマル",
    weight: 20,
    machine: "starter",
    description: "毎晩、町のみんなが眠るまで見守っています。"
  },
  {
    id: "dream-pillow",
    name: "ひつじのまくら",
    icon: "🐑",
    rarity: "ノーマル",
    weight: 20,
    machine: "starter",
    description: "抱きしめると、ひつじの夢が見られます。"
  },
  {
    id: "rain-cloud",
    name: "わたあめ雲",
    icon: "☁️",
    rarity: "ノーマル",
    weight: 20,
    machine: "starter",
    description: "ときどき甘い雨を降らせる小さな雲。"
  },
  {
    id: "dream-key",
    name: "夢のかぎ",
    icon: "🗝️",
    rarity: "ノーマル",
    weight: 15,
    machine: "starter",
    description: "どこの扉を開けるのか、持ち主も知りません。"
  },
  {
    id: "night-lantern",
    name: "夜ふかしランタン",
    icon: "🏮",
    rarity: "レア",
    weight: 5,
    machine: "starter",
    description: "暗い夢の中でも、帰り道を照らしてくれます。"
  },
  {
    id: "dream-bird",
    name: "星うたの小鳥",
    icon: "🐦",
    rarity: "レア",
    weight: 4,
    machine: "starter",
    description: "歌声を聞いた人は、楽しい夢を見るそうです。"
  },
  {
    id: "rainbow-moon",
    name: "虹色の三日月",
    icon: "🌛",
    rarity: "スーパーレア",
    weight: 2,
    machine: "starter",
    description: "めったに姿を見せない、夢の空の宝物。"
  },

  // ========================================
  // おとぎの森ガチャ：既存の5種類
  // ========================================
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
  },

  // おとぎの森ガチャ：追加7種類
  {
    id: "mushroom-house",
    name: "きのこのおうち",
    icon: "🏠",
    rarity: "ノーマル",
    weight: 20,
    machine: "forest",
    description: "夜になると窓に小さな明かりがともります。"
  },
  {
    id: "sleepy-fox",
    name: "うとうとキツネ",
    icon: "🦊",
    rarity: "ノーマル",
    weight: 20,
    machine: "forest",
    description: "お気に入りの切り株で、いつもお昼寝。"
  },
  {
    id: "moon-flower",
    name: "月あかり草",
    icon: "🌼",
    rarity: "ノーマル",
    weight: 20,
    machine: "forest",
    description: "月が昇ると花びらが淡く光ります。"
  },
  {
    id: "acorn-fairy",
    name: "どんぐり妖精",
    icon: "🌰",
    rarity: "ノーマル",
    weight: 15,
    machine: "forest",
    description: "どんぐりを集めて、森の仲間に配っています。"
  },
  {
    id: "moss-turtle",
    name: "こけむしカメ",
    icon: "🐢",
    rarity: "レア",
    weight: 5,
    machine: "forest",
    description: "背中に小さな森を育てている不思議なカメ。"
  },
  {
    id: "crystal-butterfly",
    name: "水晶のちょう",
    icon: "🦋",
    rarity: "レア",
    weight: 4,
    machine: "forest",
    description: "羽ばたくたびに、きらきらした粉が舞います。"
  },
  {
    id: "ancient-tree",
    name: "夢守りの大樹",
    icon: "🌳",
    rarity: "スーパーレア",
    weight: 2,
    machine: "forest",
    description: "町が生まれる前から、夢を見守っている大樹。"
  },

  // ========================================
  // 星空ガチャ：新規12種類
  // ========================================
  {
    id: "starry-bottle",
    name: "星空の小びん",
    icon: "🧪",
    rarity: "ノーマル",
    weight: 25,
    machine: "starry",
    description: "夜空のきらめきを、ひとしずく閉じ込めた小びん。"
  },
  {
    id: "moon-cookie",
    name: "三日月クッキー",
    icon: "🍪",
    rarity: "ノーマル",
    weight: 25,
    machine: "starry",
    description: "食べると、月まで届きそうな夢を見られます。"
  },
  {
    id: "sleeping-star",
    name: "おやすみ星",
    icon: "💫",
    rarity: "ノーマル",
    weight: 25,
    machine: "starry",
    description: "眠る前に枕元へ置くと、星がひとつ瞬きます。"
  },
  {
    id: "comet-feather",
    name: "ほうき星の羽",
    icon: "🪶",
    rarity: "ノーマル",
    weight: 20,
    machine: "starry",
    description: "風に乗せると、遠い夢の町まで飛んでいきます。"
  },
  {
    id: "night-lamp",
    name: "星あかりランプ",
    icon: "🏮",
    rarity: "ノーマル",
    weight: 20,
    machine: "starry",
    description: "暗い夜道に、小さな星の光を灯します。"
  },
  {
    id: "planet-marble",
    name: "惑星ビー玉",
    icon: "🔮",
    rarity: "ノーマル",
    weight: 20,
    machine: "starry",
    description: "中をのぞくと、知らない惑星が回っています。"
  },
  {
    id: "starry-cat",
    name: "星空ねこ",
    icon: "🐈",
    rarity: "レア",
    weight: 8,
    machine: "starry",
    description: "毛並みの中に、小さな星座が浮かんでいます。"
  },
  {
    id: "dream-planet",
    name: "ゆめの惑星",
    icon: "🪐",
    rarity: "レア",
    weight: 8,
    machine: "starry",
    description: "小さな輪の中に、誰かの夢が眠っています。"
  },
  {
    id: "star-whale",
    name: "星くじら",
    icon: "🐋",
    rarity: "レア",
    weight: 6,
    machine: "starry",
    description: "夜空を泳ぎながら、流れ星を集めています。"
  },
  {
    id: "aurora-butterfly",
    name: "オーロラちょう",
    icon: "🦋",
    rarity: "レア",
    weight: 5,
    machine: "starry",
    description: "羽ばたくたび、夜空に七色の光が広がります。"
  },
  {
    id: "moon-rabbit",
    name: "月のうさぎ",
    icon: "🐇",
    rarity: "スーパーレア",
    weight: 3,
    machine: "starry",
    description: "月の裏側で、夢のお餅をついているそうです。"
  },
  {
    id: "dream-galaxy",
    name: "夢の銀河",
    icon: "🌌",
    rarity: "スーパーレア",
    weight: 1,
    machine: "starry",
    description: "まだ誰も見たことのない夢が集まった銀河。"
  }
];

// ガチャ機械のデータ
const machines = [
  {
    id: "starter",
    name: "はじまりのガチャ",
    description: "夢の町の、最初のガチャ。",
    price: 10,
    unlockCost: 0,
    icon: "🌙",
    theme: "pink"
  },
  {
    id: "forest",
    name: "おとぎの森ガチャ",
    description: "森に住む、不思議な生き物たち。",
    price: 15,
    unlockCost: 50,
    icon: "🌿",
    theme: "green"
  },
  {
    id: "starry",
    name: "星空ガチャ",
    description: "星と夢が集まる、夜空のガチャ。",
    price: 20,
    unlockCost: 100,
    icon: "🌌",
    theme: "purple"
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
const collectionTabs = document.getElementById("collection-tabs");
const collectionRate = document.getElementById("collection-rate");
const collectionCategoryTitle = document.getElementById("collection-category-title");
const collectionCategoryDescription = document.getElementById("collection-category-description");
const collectionCategoryCount = document.getElementById("collection-category-count");
const collectionCategoryProgress = document.getElementById("collection-category-progress");

// 現在表示している図鑑のタブ
let selectedCollectionTab = "all";
const unlockButton = document.getElementById("unlock-button");
const unlockRequirements = document.getElementById("unlock-requirements");
const unlockCard = document.getElementById("unlock-card");
const unlockIcon = document.getElementById("unlock-icon");
const unlockName = document.getElementById("unlock-name");
const unlockDescription = document.getElementById("unlock-description");
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
    `次のコインまで約 ${seconds} 秒。1秒ごとに1コイン獲得します。`;
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
  // 図鑑のタブを生成
  renderCollectionTabs();

  // 選択中のタブに応じて表示対象を絞り込む
  let visibleItems;

  if (selectedCollectionTab === "all") {
    visibleItems = items;
  } else {
    visibleItems = items.filter(
      item => item.machine === selectedCollectionTab
    );
  }

  // 所持済みの種類数を数える
  const ownedCount = visibleItems.filter(
    item => (save.inventory[item.id] || 0) > 0
  ).length;

  const totalCount = visibleItems.length;
  const rate = totalCount > 0
    ? Math.round((ownedCount / totalCount) * 100)
    : 0;

  // 全体の収集率は常に全アイテムを対象にする
  const allOwnedCount = getOwnedUniqueCount();
  const allTotalCount = items.length;
  const allRate = allTotalCount > 0
    ? Math.round((allOwnedCount / allTotalCount) * 100)
    : 0;

  collectionCount.textContent =
    `${allOwnedCount} / ${allTotalCount}種類`;

  progressBar.style.width = `${allRate}%`;

  collectionRate.textContent = allRate === 100
    ? "コンプリート達成！ すべての夢を集めました！"
    : `収集率 ${allRate}%。まだ出会っていない夢があります。`;

  // 選択中のカテゴリ名と説明
  if (selectedCollectionTab === "all") {
    collectionCategoryTitle.textContent = "すべてのアイテム";
    collectionCategoryDescription.textContent =
      "夢の町にあるアイテムを集めよう。";
  } else {
    const machine = machines.find(
      machine => machine.id === selectedCollectionTab
    );

    collectionCategoryTitle.textContent = machine
      ? `${machine.icon} ${machine.name}`
      : "アイテム図鑑";

    collectionCategoryDescription.textContent = machine
      ? machine.description
      : "アイテムを集めよう。";
  }

  collectionCategoryCount.textContent =
    `${ownedCount} / ${totalCount}種類`;

  collectionCategoryProgress.style.width = `${rate}%`;

  // アイテムカードを描画
  collectionGrid.replaceChildren();

  visibleItems.forEach(item => {
    const count = save.inventory[item.id] || 0;
    const owned = count > 0;

    const card = document.createElement("div");
    card.className = "collectible " +
      (owned ? "owned" : "unknown");

    const icon = document.createElement("div");
    icon.className = "collectible-icon";
    icon.textContent = owned ? item.icon : "？";

    const name = document.createElement("div");
    name.className = "collectible-name";
    name.textContent = owned ? item.name : "？？？";

    const amount = document.createElement("div");
    amount.className = "collectible-count";
    amount.textContent = owned ? `所持数 ${count}` : "未発見";

    card.append(icon, name, amount);
    collectionGrid.appendChild(card);
  });
}

// ガチャ機械のデータから図鑑タブを自動生成
function renderCollectionTabs() {
  collectionTabs.replaceChildren();

  const tabs = [
    {
      id: "all",
      label: "📚 すべて"
    },
    ...machines.map(machine => ({
      id: machine.id,
      label: `${machine.icon} ${machine.name}`
    }))
  ];

  // 選択中のタブが存在しなくなった場合は「すべて」に戻す
  if (!tabs.some(tab => tab.id === selectedCollectionTab)) {
    selectedCollectionTab = "all";
  }

  tabs.forEach(tab => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "collection-tab";

    const active = tab.id === selectedCollectionTab;

    if (active) {
      button.classList.add("active");
    }

    button.textContent = tab.label;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", String(active));

    button.addEventListener("click", () => {
      selectedCollectionTab = tab.id;
      renderCollection();
    });

    collectionTabs.appendChild(button);
  });
}

// ========================================
// 2台目の解放
// 条件：図鑑5種類以上 ＋ 50コイン
// ========================================

function renderUnlock() {
  // まだ購入していない、次のガチャを探す
  const machine = machines.find(
    item => !save.unlockedMachines.includes(item.id)
  );

  // すべて購入済みならカードを隠す
  if (!machine) {
    unlockCard.style.display = "none";
    return;
  }

  // 購入カードを表示する
  unlockCard.style.display = "";

  // 次に購入するガチャの情報を表示する
  unlockIcon.textContent = machine.icon;
  unlockName.textContent = machine.name;
  unlockDescription.textContent = machine.description;

  // 購入価格を表示する
  unlockRequirements.textContent =
    `購入価格：${machine.unlockCost}コイン`;

  // コイン残高に応じてボタンを更新する
  if (save.coins >= machine.unlockCost) {
    unlockButton.textContent =
      `${machine.icon} ${machine.name}を購入する`;
    unlockButton.disabled = false;
  } else {
    const shortage = machine.unlockCost - save.coins;

    unlockButton.textContent =
      `${machine.name}（あと${shortage}コイン）`;
    unlockButton.disabled = true;
  }
}

function purchaseMachine(machineId) {
  const machine = machines.find(item => item.id === machineId);

  // 存在しない機械や、すでに購入済みの機械は処理しない
  if (!machine || save.unlockedMachines.includes(machineId)) {
    return;
  }

  // コインが足りない場合
  if (save.coins < machine.unlockCost) {
    alert(
      `コインが足りません！\n必要なコイン：${machine.unlockCost}枚`
    );
    return;
  }

  // コインを支払って購入
  save.coins -= machine.unlockCost;
  save.unlockedMachines.push(machineId);

  // 購入した機械を選択状態にする
  save.selectedMachine = machineId;

  // 購入結果を保存して画面を更新
  saveGame();
  renderAll();
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

unlockButton.addEventListener("click", () => {
  const machine = machines.find(
    item => !save.unlockedMachines.includes(item.id)
  );

  if (machine) {
    purchaseMachine(machine.id);
  }
});

// セーブデータのリセット
resetButton.addEventListener("click", () => {
  const confirmed = window.confirm(
    "セーブデータをリセットしますか？\n" +
    "コイン、図鑑、購入したガチャが初期状態に戻ります。"
  );

  // キャンセルされた場合は何もしない
  if (!confirmed) {
    return;
  }

  // このゲーム専用の保存データだけを削除
  localStorage.removeItem(SAVE_KEY);

  // 初期状態のセーブデータを作成
  save = createNewSave();

  // 表示を初期状態に更新
  selectedCollectionTab = "all";
  resultBox.classList.add("hidden");
  setStatus("新しい夢の町が始まりました！");
  saveGame();
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
