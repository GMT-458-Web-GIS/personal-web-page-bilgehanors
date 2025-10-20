const chambers = document.querySelectorAll('.chamber');
const revolver = document.getElementById('revolver');
let bulletPosition = null;  // Mermi başlangıç pozisyonu (0-5)
let currentPosition = 0;    // Tamburun aktif yeri (0-5)
let spinning = false;
let bulletHidden = false;

// LocalStorage için keyler
const LAST_PLAY_KEY = "rus-ruleti-last-play";
const STREAK_KEY = "rus-ruleti-streak";

// Streak ve son oynama zamanı al-sat fonksiyonları
function getStreak() {
  return parseInt(localStorage.getItem(STREAK_KEY)) || 0;
}

function setStreak(val) {
  localStorage.setItem(STREAK_KEY, val.toString());
}

function getLastPlay() {
  return parseInt(localStorage.getItem(LAST_PLAY_KEY)) || 0;
}

function setLastPlay(timestamp) {
  localStorage.setItem(LAST_PLAY_KEY, timestamp.toString());
}

function canPlayToday() {
  const now = Date.now();
  const last = getLastPlay();
  return now - last > 24 * 60 * 60 * 1000;
}

function showStreak() {
  const streak = getStreak();
  document.getElementById('result').innerText += `\n🔥 Streak: ${streak}`;
}

// Yuvaları dairesel yerleştir ve tıklama ile mermi koyma
function positionChambers() {
  const centerX = 150, centerY = 150, radius = 100;
  chambers.forEach((chamber, index) => {
    const angle = (index / 6) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle) - 25;
    const y = centerY + radius * Math.sin(angle) - 25;
    chamber.style.left = `${x}px`;
    chamber.style.top = `${y}px`;

    chamber.addEventListener('click', () => {
      if (spinning) return;
      if (bulletHidden) return;  // Dönüş sonrası mermi gizliyse değişiklik yok
      chambers.forEach(c => c.classList.remove('bullet'));
      bulletPosition = index;
      chamber.classList.add('bullet');
      document.getElementById('result').innerText = `Mermi ${index + 1}. yuvaya yerleştirildi.`;
    });
  });
}

// Tamburu dönme animasyonuyla döndür
function spinChamber() {
  if (!canPlayToday()) {
    const hoursLeft = Math.ceil((24 * 60 * 60 * 1000 - (Date.now() - getLastPlay())) / (60 * 60 * 1000));
    alert(`Bugün oynadın! Lütfen ${hoursLeft} saat sonra tekrar dene.`);
    return;
  }

  if (bulletPosition === null) {
    alert("Önce mermiyi bir yuvaya yerleştir.");
    return;
  }
  if (spinning) return;

  spinning = true;
  bulletHidden = true;

  // Mermiyi gizle (çünkü tambur dönüyor)
  chambers.forEach(c => c.classList.remove('bullet'));
  document.getElementById('result').innerText = "🎯 Tambur dönüyor...";

  let spins = Math.floor(Math.random() * 12) + 10;
  let currentSpin = 0;
  const rotationStep = 360 / 6;
  let currentAngle = 0;
  let activeIndex = 0;

  const interval = setInterval(() => {
    currentAngle = (currentAngle + rotationStep) % 360;
    revolver.style.transform = `rotate(${currentAngle}deg)`;

    activeIndex = (activeIndex + 1) % 6;
    chambers.forEach(c => c.classList.remove('active'));
    chambers[activeIndex].classList.add('active');

    currentSpin++;
    if (currentSpin >= spins) {
      clearInterval(interval);
      spinning = false;
      currentPosition = activeIndex;
      document.getElementById('result').innerText = `🎯 Tambur döndü, pozisyon ${currentPosition + 1}`;
    }
  }, 100);
}

// Ateş etme fonksiyonu
function fire() {
  if (spinning) return;

  if (!canPlayToday()) {
    alert("Bugün zaten oynadın! Yarın tekrar gel.");
    return;
  }

  if (bulletPosition === null) {
    alert("Mermi yerleştirmedin.");
    return;
  }

  // Oynama kaydını güncelle
  setLastPlay(Date.now());

  // Tamburu sıfırla (dönüş kaldır)
  revolver.style.transform = `rotate(0deg)`;

  chambers.forEach(c => {
    c.classList.remove('active', 'bullet');
    c.style.background = '';
    c.style.borderColor = '#aaa';
  });

  chambers[currentPosition].classList.add('active');

  if (currentPosition === bulletPosition) {
    chambers[currentPosition].classList.add('bullet');
    chambers[currentPosition].style.background = 'red';
    document.getElementById('result').innerText = '💀 BAMM! Vuruldun!\n💔 Streak sıfırlandı.';
    setStreak(0);
  } else {
    chambers[currentPosition].style.background = 'green';

    chambers[bulletPosition].classList.add('bullet');
    chambers[bulletPosition].style.borderColor = 'red';

    let current = getStreak();
    setStreak(current + 1);

    document.getElementById('result').innerText = `🎖️ Tık! Hayattasın.\n💡 Mermi ${bulletPosition + 1}. yuvadaydı.`;
    showStreak();

    setTimeout(() => {
      chambers[currentPosition].style.background = '';
      chambers[bulletPosition].style.borderColor = '#aaa';
    }, 1500);
  }
}

// İlk konumlandırmayı yap
positionChambers();









