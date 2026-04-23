/* ============================================================
   THE AMAZING RACE — ARIEL'S BIRTHDAY  |  script.js  v5
   ============================================================ */
'use strict';

/* ══════════════════════════════════════════════════════════
   ★  CONFIGURATION
══════════════════════════════════════════════════════════ */
const STORAGE_KEY = 'ariel_race_v5';
const LOVE_METER_MAX = 100; // pops needed to fill the meter 100%

// Ariel's birth: April 27, 1997 at 16:00 (Israel local time)
const BIRTH_DATE = new Date(1997, 3, 27, 16, 0, 0);

// All image paths → assets/ folder (actual filenames)
const PHOTO_BALLOON_SRC = [
  'assets/maya&ariel (1).jpeg',
  'assets/maya&ariel (3).jpeg',
  'assets/maya&ariel (7).jpeg',
  'assets/maya&ariel (12).jpeg',
  'assets/maya&ariel (20).jpeg',
];
const GALLERY_SRC = [
  'assets/maya&ariel (1).jpeg',
  'assets/maya&ariel (5).jpeg',
  'assets/maya&ariel (9).jpeg',
  'assets/maya&ariel (14).jpeg',
  'assets/maya&ariel (22).jpeg',
  'assets/maya&ariel (27).jpeg',
];
// Film strip: spread across all available photos
const FILM_STRIP_PHOTOS = [
  'assets/maya&ariel (2).jpeg',
  'assets/maya&ariel (4).jpeg',
  'assets/maya&ariel (6).jpeg',
  'assets/maya&ariel (8).jpeg',
  'assets/maya&ariel (10).jpeg',
  'assets/maya&ariel (13).jpeg',
  'assets/maya&ariel (16).jpeg',
  'assets/maya&ariel (18).jpeg',
  'assets/maya&ariel (21).jpeg',
  'assets/maya&ariel (24).jpeg',
  'assets/maya&ariel (26).jpeg',
  'assets/maya&ariel (29).jpeg',
  'assets/maya&ariel (31).jpeg',
  'assets/maya&ariel (33).jpeg',
  'assets/maya&ariel (36).jpeg',
  'assets/maya&ariel (38).jpeg',
];

// Maya's personal greeting (Mission 3)
const MAYA_GREETING =
  `אאריאל אהוב שלי,
איך זה יכול להיות שזה רק יום ההולדת השני שאנחנו חוגגים יחד? למרות הזמן הקצר, אני מרגישה שאני מכירה אותך כל חיי, כאילו היית שם מאז ומתמיד, אולי בגלל זה אתה קורה לזה- עידן הקרח.

המון המון מזל טוב, מלך שלי!! אני מאחלת לך שתהיה תמיד מאושר ושמח, שכל יום תהיה עטוף באהבה וצחוק, ושכל יום הולדת תצליח להתעלות על זו שלפנייה.

גיל 29 זה כבר ממש לא צחוק אתה גבר-גבר על, גבר אלפא אורגינל שלי, ואני כל כך גאה במי שאתה ובלב הענק שלך.

אני מאחלת לך קודם כל בריאות ואושר פנימי. שתהיה שלם עם עצמך, שתלך לישון ותקום עם חיוך על השפתיים. שתשאף תמיד הכי גבוה שאפשר, תחלום בגדול ותקטוף את כל ההצלחות שאתה ראוי להן. אני מאחלת לך שתמיד יהיה בך את הכוח והרצון להשקיע ולקדם את עצמך – שהעבודה הקשה שלך בכל תחום תשתלם ותניב תוצאות מדהימות.

ולנו? אני מאחלת שנמשיך להצמיח את האהבה והחברות הנדירה שלנו. שנמשיך לעשות טוב אחד לשנייה. כשאני רואה אותך, הלב שלי מתמלא באושר; אתה החצי השני שלי, אתה קורא אותי ומרגיש אותי, ובך מצאתי כל דבר שאי פעם חלמתי שאצטרך.

זו הזדמנות להגיד לך תודה. תודה על האיזון הענק שאתה מביא לחיי, על השמחה והצחוקים המשותפים, על הספונטניות ועל השפה שקיימת רק בינינו. אני מעריכה את מה שיש לנו, ובעיקר אני שרופה לך על הטוסיק !! אני מאוהבת בך.

היכולות שלך מדהימות אותי בכל פעם מחדש. אתה אדם כל כך חכם, מצחיק וסקסי, עם רצון לטרוף את העולם, ואני פשוט גאה בך ברמות שאי אפשר להסביר.

אהוב שלי, בשנתך ה-29 אני מאחלת לך ליהנות מכל רגע ויום, ולהמשיך להסתכל קדימה אל כל התכנונים והעתיד המשותף והמבטיח שלנו.

תמיד אהיה פה לצידך בטוב וקושי, להציק ולאהוב.
אוהבת אותך הכי בעולם,  אתה שלי מהבית!!

מאיה שלך 💛`;

const FAMILY_MESSAGES = [
  { from: 'אמא 💕', text: 'אריאל, אתה הגבר הכי מיוחד שגדל בבית שלנו. כל יום אתה מפתיע אותנו ומגדיל עלינו גאווה. אוהבים אותך עד אין קץ! יום הולדת שמח בן שלנו! 🎂', color: '#FF6B9D' },
  { from: 'אבא 🤍', text: 'הבן שלי — כל יום אתה מפתיע אותי. הצלחות שלך הן הצלחות שלנו. גאה בך תמיד. יום הולדת שמח! 🥂', color: '#4ECDC4' },
  { from: 'אח/אחות 🌟', text: 'הגדול שלנו... תמיד שם בשבילנו, תמיד מחייך, תמיד מקדים. הגיע הזמן שיחגגו אותך! יום הולדת שמח! ❤️', color: '#FFCC00' },
  { from: 'סבא וסבתא 🌺', text: 'הנכד שלנו! אנחנו מתגאים בך כל יום מחדש. שתמשיך לגדול, לאהוב, ולהיות מאושר. יום הולדת שמח! 💐', color: '#C792E9' },
];

/* ══════════════════════════════════════════════════════════
   MISSIONS  (5 & 6 SWAPPED; new 5 = Levinsky market)
══════════════════════════════════════════════════════════ */
const MISSIONS = [
  {
    id: 1, icon: '☕', title: 'משימת תדלוק', type: 'standard', btnText: 'ביצעתי! ✓',
    text:
      `בוקר טוב אריאל! המירוץ ליום ההולדת יוצא לדרך ברגע זה.

כדי שיהיה לך כוח לכל מה שמצפה לנו, המשימה הראשונה שלך היא "משימת תדלוק": עליך להתארגן בזריזות ולהכין לשנינו את המקינטה המושלמת.

הריח של הקפה הוא יריית הפתיחה של היום הזה.
קדימה, המצבר צריך להיטען! ☕`,
  },
  {
    id: 2, icon: '🦆', title: 'אגם בעיר היין', type: 'standard', btnText: 'ביצעתי! ✓',
    revealOnComplete: {
      icon: '🧺',
      name: 'נכון! הולכים לפיקניק',
      address: 'פארק האגם, ראשון לציון',
    },
    text:
      `התחנה הבאה שלנו נמצאת במקום שבו העיר פוגשת את המים — מקום שבו הברווזים נהנים משמש צהריים.

הוא לא בים, אבל יש בו אגם, והוא נמצא בעיר שבה הכל התחיל (עיר היין).

קח את הסל, המפה והמצב רוח, אנחנו יוצאים לנשום אוויר פתוח.
לאן נוסעים? 🗺️`,
  },
  {
    id: 3, icon: '🔐', title: 'קוד הלב', type: 'password', password: 'מושי', btnText: 'המשך לתחנה הבאה ✓',
    text:
      `לפני שמתקדמים, צריך לפתוח את הלב. 💛

כדי לצפות בברכה האישית שמאיה הכינה לך, עליך להזין את הקוד הסודי.

הקוד הוא שם החיבה שמאיה קוראת לך בו.
ברגע שתקיש אותו, המסך יפתח! 🔓`,
  },
  {
    id: 4, icon: '🗺️', title: 'הכתובת הסודית', type: 'standard', btnText: 'ביצעתי! ✓',
    revealOnComplete: {
      icon: '☕',
      name: 'Coffee Organization',
      address: 'מקווה ישראל 3, תל אביב',
    },
    text:
      `הכתובת היא:

1️⃣  מקור מים בו נשים מתרחצות?
2️⃣  איך קוראים ליעקוב אבינו?
3️⃣  מספר האחים שלך?

שם מחכה לך משהו מיוחד שקשור לתחביבים שלך.
נחש לאן הולכים?`,
  },
  {
    // ← formerly Mission 6 (swapped)
    id: 5, icon: '🌶️', title: 'מרכז הטעמים', type: 'standard', btnText: 'הגעתי! ✓',
    mapImage: 'assets/levinski.jpg map.jpg',
    revealOnComplete: {
      icon: '🗺️',
      name: 'שוק לווינסקי',
      address: 'הגענו! הנה המפה הטקטית של השוק —',
    },
    text:
      `הבטן כבר מתחילה לדבר, והחושים מתעוררים.

אנחנו הולכים למקום שבו התבלינים הם הגיבורים. בין סמטאות של טעמים, בורקסים וריחות של פעם, נמצא את המקום שנותן לחיים את כל הטעם.

זהו המרכז של הקולינריה הישנה והחדשה.
בדקו את המפה הטקטית! 🌿🥙`,
  },
  {
    // ← formerly Mission 5 (swapped)
    id: 6, icon: '📸', title: 'משימת תיעוד', type: 'standard', btnText: 'הצטלמנו! ✓',
    text:
      `צאו לסיבוב בשוק והצטלמו למזכרת בדוכן שהכי משך לכם את העין!

📸 תיעדו את הרגע — העין שלכם, הנוף שלכם, הפוז שלכם.

הזיכרון הכי טוב יישאר בתמונה!`,
  },
  {
    id: 7, icon: '🤗', title: 'משימת הוכחה', type: 'standard', btnText: 'ביצעתי! ✓',
    text:
      `עצרת להתרעננות! 💪

במירוץ הזה, האנרגיה לא מגיעה רק מאוכל. כדי לקבל את הרמז הבא, עליך לבצע "משימת הוכחה":

הענק למאיה חיבוק של דקה ונשיקה.

רק אחרי שה-Sensor של האהבה יתמלא, המחסום הבא יפתח! 💛`,
  },
  {
    id: 8, icon: '👨‍👩‍👧‍👦', title: 'השבט שלך', type: 'family', btnText: 'קראתי! 💛',
    text:
      `הגעת לנקודת המפגש עם האנשים שמכירים אותך מהצעד הראשון.

המירוץ למיליון הוא כלום לעומת השבט שלך. כדי לעבור לשלב הבא, עליך לקרוא את המסרים מה"תומכים בבית".

הם הכינו לך את הצידה הכי חשובה לדרך — אהבה מהמשפחה. 💕`,
  },
];

/* ══════════════════════════════════════════════════════════
   GIFTS  (unlocked progressively by mission completion)
══════════════════════════════════════════════════════════ */
const GIFTS = [
  { id: 1, icon: '👕', title: 'בגדים חדשים',
    desc: 'לך תלבש בגדים חדשים ותתבשם טוב — מגיע לך להתפנק! 🪭✨', unlocksAfterMission: 1 },
  { id: 2, icon: '💛', title: 'הלב של מאיה',
    desc: 'הברכה האישית ממאיה — מלא אהבה, רגש, ומילים שבאות מהלב. רק בשבילך. 💌', unlocksAfterMission: 3 },
  { id: 3, icon: '☕', title: 'סדנאת קפה',
    desc: 'סדנה מקצועית לאוהבי קפה! תלמד להכין קפה ברמה הכי גבוהה. ☕✨', unlocksAfterMission: 4 },
  { id: 4, icon: '🫖', title: 'מכונת מקינטה',
    desc: 'מכונת קפה מקינטה חדשה ומושלמת — כדי שכל בוקר יתחיל עם הקפה הכי טעים! ❤️', unlocksAfterMission: 5 },
  { id: 5, icon: '🌶️', title: 'סיור אוכל בשוק',
    desc: 'סיור קולינרי מיוחד בשוק לוינסקי — טעמים, ריחות ואוכל שאין בשום מקום אחר! 🦩', unlocksAfterMission: 5 },
  { id: 6, icon: '🎤', title: 'הופעה של אודי כגן',
    desc: 'כרטיסים להופעה של אודי כגן — ערב מיוחד, מוזיקה שמתחברת לנשמה. 🎵🎉', unlocksAfterMission: 7 },
];

function getUnlockedGifts() {
  return GIFTS.filter(g => state.completed.includes(g.unlocksAfterMission));
}
function getNewGifts() {
  const opened = state.giftsOpened || [];
  return getUnlockedGifts().filter(g => !opened.includes(g.id));
}
function updateGiftBadge() {
  const badge = document.getElementById('gifts-badge');
  if (!badge) return;
  const n = getNewGifts().length;
  badge.textContent = n > 0 ? String(n) : '';
  badge.classList.toggle('visible', n > 0);
}


/* ══════════════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════════════ */
let state = { current: 1, completed: [], m3Unlocked: false, balloonPops: 0, giftsOpened: [] };

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) { }
}
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) state = { ...state, ...JSON.parse(raw) };
  } catch (_) { localStorage.removeItem(STORAGE_KEY); }
}
function resetState() {
  // Full wipe → restart from Mission 1
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

/* ══════════════════════════════════════════════════════════
   LIVE BIRTHDAY TIMER
══════════════════════════════════════════════════════════ */
function getElapsed() {
  const now = new Date();
  const diffMs = now.getTime() - BIRTH_DATE.getTime();
  let totalS = Math.max(0, Math.floor(diffMs / 1000));

  const seconds = totalS % 60; totalS = Math.floor(totalS / 60);
  const minutes = totalS % 60; totalS = Math.floor(totalS / 60);
  const hours = totalS % 24;

  // Proper year + remaining-days calculation
  let years = now.getFullYear() - BIRTH_DATE.getFullYear();
  const anniversary = new Date(BIRTH_DATE);
  anniversary.setFullYear(now.getFullYear());
  if (anniversary > now) years--;

  const lastBD = new Date(BIRTH_DATE);
  lastBD.setFullYear(BIRTH_DATE.getFullYear() + years);
  const days = Math.floor((now.getTime() - lastBD.getTime()) / 86400000);

  return { years, days, hours, minutes, seconds };
}

function tickTimer() {
  const { years, days, hours, minutes, seconds } = getElapsed();
  const set = (id, val, w) => {
    const el = document.getElementById(id);
    if (!el) return;
    const str = String(val).padStart(w, '0');
    if (el.textContent !== str) {
      el.textContent = str;
      el.classList.remove('tick');
      void el.offsetWidth;
      el.classList.add('tick');
      setTimeout(() => el.classList.remove('tick'), 120);
    }
  };
  set('t-years', years, 2);
  set('t-days', days, 3);
  set('t-hours', hours, 2);
  set('t-minutes', minutes, 2);
  set('t-seconds', seconds, 2);
}

/* ══════════════════════════════════════════════════════════
   LOVE-METER
══════════════════════════════════════════════════════════ */
let loveResetTimeout = null; // only one reset timer at a time

function updateLoveMeter() {
  const pops = state.balloonPops || 0;
  const pct  = Math.min(100, Math.round((pops / LOVE_METER_MAX) * 100));
  const fill  = document.getElementById('lm-fill');
  const pctEl = document.getElementById('lm-pct');
  const heart = document.getElementById('lm-heart');
  const track = document.getElementById('lm-track');

  if (fill)  fill.style.width = pct + '%';
  if (pctEl) pctEl.textContent = pops >= LOVE_METER_MAX ? '💕' : `${pops}/${LOVE_METER_MAX}`;
  if (track) track.setAttribute('aria-valuenow', pct);

  if (heart) {
    if (pct === 100)     heart.textContent = '💕';
    else if (pct >= 75)  heart.textContent = '❤️';
    else if (pct >= 50)  heart.textContent = '💖';
    else if (pct >= 25)  heart.textContent = '💗';
    else                 heart.textContent = '🤍';
    const duration = Math.max(0.3, 1.2 - (pct / 100) * 0.9);
    heart.style.animationDuration = duration + 's';
  }

  // Full → start 2-minute countdown, then reset to 0 and go again
  if (pops >= LOVE_METER_MAX) {
    if (!loveResetTimeout) {
      loveResetTimeout = setTimeout(() => {
        state.balloonPops = 0;
        saveState();
        loveResetTimeout = null;
        updateLoveMeter();
        showToast('💗 המדד התאפס — בואו נמלא אותו שוב! 🎈');
      }, 2 * 60 * 1000); // 2 minutes
    }
  } else {
    if (loveResetTimeout) { clearTimeout(loveResetTimeout); loveResetTimeout = null; }
  }
}

/* ══════════════════════════════════════════════════════════
   CONFETTI
══════════════════════════════════════════════════════════ */
const CONF_COLORS = ['#FFCC00', '#FF3366', '#33CC99', '#3399FF', '#CC33FF', '#FF6633', '#FFFFFF', '#FFD700'];

function fireBurst(x = 0.5, y = 0.65, big = false) {
  const fn = window.confetti;
  if (typeof fn !== 'function') return;
  const base = { spread: big ? 120 : 80, gravity: 1.1, ticks: 220, colors: CONF_COLORS, scalar: big ? 1.3 : 1 };
  fn({ ...base, particleCount: big ? 180 : 100, origin: { x, y } });
  if (big) {
    setTimeout(() => fn({ ...base, particleCount: 80, angle: 60, origin: { x: 0.15, y: 0.7 } }), 200);
    setTimeout(() => fn({ ...base, particleCount: 80, angle: 120, origin: { x: 0.85, y: 0.7 } }), 400);
    setTimeout(() => fn({ ...base, particleCount: 120, origin: { x: 0.5, y: 0.5 } }), 650);
  }
}

/* ══════════════════════════════════════════════════════════
   BALLOONS
══════════════════════════════════════════════════════════ */
const BALLOON_COLORS = ['#FF3366', '#FF6633', '#FFCC00', '#33CC99', '#3399FF', '#CC33FF', '#FF99CC', '#FFD700'];
let validPhotos = [];

// Pop a balloon on click → increment love-meter
function popBalloon(el) {
  if (el._popped) return;
  el._popped = true;
  el.classList.add('balloon--popped');
  state.balloonPops = (state.balloonPops || 0) + 1;
  saveState();
  updateLoveMeter();
  setTimeout(() => el.remove(), 380);
}

function createColorBalloon() {
  const c = document.getElementById('balloon-container');
  if (!c) return;
  const b = document.createElement('div');
  const sz = 26 + Math.random() * 30;
  b.className = 'balloon';
  b.style.cssText = `
    left:${Math.random() * 100}%;width:${sz}px;height:${sz * 1.32}px;
    background:${BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)]};
    animation-duration:${9 + Math.random() * 12}s;
    animation-delay:${Math.random() * 4}s;
    filter:brightness(${.82 + Math.random() * .35});
  `;
  c.appendChild(b);
  setTimeout(() => b.remove(), 25000);
}

function createPhotoBalloon(src) {
  const c = document.getElementById('balloon-container');
  if (!c) return;
  const b = document.createElement('div');
  const sz = 95 + Math.random() * 55;
  b.className = 'balloon balloon--photo';
  b.style.cssText = `
    left:${5 + Math.random() * 86}%;width:${sz}px;height:${sz * 1.25}px;
    animation-duration:${15 + Math.random() * 12}s;
    animation-delay:${Math.random() * 6}s;
  `;
  const img = document.createElement('img');
  img.alt = ''; img.src = src;
  img.onerror = () => b.remove();
  img.style.pointerEvents = 'none';
  b.appendChild(img);
  c.appendChild(b);
  setTimeout(() => b.remove(), 33000);
}

function startBalloons() {
  for (let i = 0; i < 5; i++) createColorBalloon();
  setInterval(createColorBalloon, 1600);

  let tested = 0;
  PHOTO_BALLOON_SRC.forEach((src, idx) => {
    const probe = new Image();
    probe.onload = () => validPhotos.push(src);
    probe.src = src;
    setTimeout(() => {
      tested++;
      if (tested === PHOTO_BALLOON_SRC.length && validPhotos.length > 0) {
        validPhotos.slice(0, 2).forEach((s, i) =>
          setTimeout(() => createPhotoBalloon(s), 7000 + i * 11000)
        );
        let pi = 0;
        setInterval(() => { createPhotoBalloon(validPhotos[pi % validPhotos.length]); pi++; }, 18000);
      }
    }, (idx + 1) * 120);
  });
}

function launchBalloonWave() {
  for (let i = 0; i < 32; i++) setTimeout(createColorBalloon, i * 60);
  if (validPhotos.length > 0) {
    for (let i = 0; i < 6; i++) {
      setTimeout(() => createPhotoBalloon(validPhotos[i % validPhotos.length]), 800 + i * 550);
    }
  }
}

/* ══════════════════════════════════════════════════════════
   FILM STRIP
══════════════════════════════════════════════════════════ */
function initFilmStrip() {
  const strip = document.getElementById('film-strip');
  if (!strip) return;

  // Build items
  let loadedCount = 0;
  FILM_STRIP_PHOTOS.forEach(src => {
    const probe = new Image();
    probe.onload = () => {
      const item = document.createElement('div');
      item.className = 'fs-item'; item.setAttribute('role', 'listitem');
      const img = document.createElement('img');
      img.src = src; img.alt = 'תמונה שלנו'; img.loading = 'lazy';
      item.appendChild(img);
      strip.appendChild(item);
      loadedCount++;
    };
    probe.src = src;
  });

  // Auto-scroll (pauses on user interaction)
  let isPaused = false;
  let animId = null;
  let direction = 1; // 1 = right-to-left (RTL feel)

  function scroll() {
    if (!isPaused && strip.children.length > 0) {
      strip.scrollLeft += direction;
      // Loop: reset to start when reaching end
      if (strip.scrollLeft >= strip.scrollWidth - strip.clientWidth - 2) {
        strip.scrollLeft = 0;
      }
    }
    animId = requestAnimationFrame(scroll);
  }
  animId = requestAnimationFrame(scroll);

  // Drag to scroll
  let isDown = false, startX = 0, startScrollLeft = 0;
  strip.addEventListener('mousedown', e => {
    isDown = true; isPaused = true;
    startX = e.pageX - strip.offsetLeft;
    startScrollLeft = strip.scrollLeft;
    strip.classList.add('grabbing');
  });
  document.addEventListener('mouseup', () => { isDown = false; strip.classList.remove('grabbing'); setTimeout(() => { isPaused = false; }, 800); });
  document.addEventListener('mousemove', e => {
    if (!isDown) return;
    strip.scrollLeft = startScrollLeft - (e.pageX - strip.offsetLeft - startX);
  });
  strip.addEventListener('touchstart', e => {
    isPaused = true; startX = e.touches[0].pageX; startScrollLeft = strip.scrollLeft;
  }, { passive: true });
  strip.addEventListener('touchend', () => { setTimeout(() => { isPaused = false; }, 800); });
  strip.addEventListener('touchmove', e => {
    strip.scrollLeft = startScrollLeft - (e.touches[0].pageX - startX);
  }, { passive: true });

  // Add edge-fade overlays
  const section = document.getElementById('film-strip-section');
  if (section) {
    ['fs-fade-left', 'fs-fade-right'].forEach(cls => {
      const fade = document.createElement('div');
      fade.className = cls; section.appendChild(fade);
    });
  }
}

/* ══════════════════════════════════════════════════════════
   GIFT LIST DRAWER
══════════════════════════════════════════════════════════ */
function openGiftList() {
  const log     = document.getElementById('adventure-log');
  const content = document.getElementById('al-content');
  if (!log || !content) return;

  const unlockedIds = getUnlockedGifts().map(g => g.id);
  const openedIds   = state.giftsOpened || [];

  const cards = GIFTS.map(g => {
    const isOpened   = openedIds.includes(g.id);
    const isUnlocked = unlockedIds.includes(g.id);
    const isNew      = isUnlocked && !isOpened;

    if (isOpened) return `
      <div class="gift-card gift-card--opened">
        <div class="gift-icon">${g.icon}</div>
        <div class="gift-info">
          <div class="gift-num">מתנה ${String(g.id).padStart(2,'0')}</div>
          <div class="gift-title">${g.title}</div>
          <div class="gift-desc">${g.desc}</div>
        </div>
        <div class="gift-claimed">אסוף! ✅</div>
      </div>`;

    if (isNew) return `
      <div class="gift-card gift-card--new" id="gift-card-${g.id}">
        <div class="gift-icon gift-icon--bounce">${g.icon}</div>
        <div class="gift-info">
          <div class="gift-num">מתנה ${String(g.id).padStart(2,'0')} 🆕</div>
          <div class="gift-title">${g.title}</div>
          <div class="gift-desc">${g.desc}</div>
        </div>
        <button class="gift-open-btn" type="button" onclick="handleOpenGift(${g.id})">קח את המתנה! 🎁</button>
      </div>`;

    return `
      <div class="gift-card gift-card--locked">
        <div class="gift-icon gift-icon--locked">🔒</div>
        <div class="gift-info">
          <div class="gift-num">מתנה ${String(g.id).padStart(2,'0')}</div>
          <div class="gift-title gift-title--locked">???</div>
          <div class="gift-desc gift-desc--locked">יפתח אחרי משימה ${g.unlocksAfterMission}</div>
        </div>
      </div>`;
  }).join('');

  content.innerHTML = cards;
  log.classList.add('al-open');
  log.setAttribute('aria-hidden', 'false');
  document.body.classList.add('body-noscroll');
}

function closeGiftList() {
  const log = document.getElementById('adventure-log');
  log?.classList.remove('al-open');
  log?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('body-noscroll');
}

window.handleOpenGift = function(giftId) {
  if (!state.giftsOpened) state.giftsOpened = [];
  if (!state.giftsOpened.includes(giftId)) {
    state.giftsOpened.push(giftId);
    saveState();
    updateGiftBadge();
    fireBurst(0.5, 0.5, false);
  }
  openGiftList(); // re-render
};

/* ══════════════════════════════════════════════════════════
   STICKY OFFSET MEASUREMENT
══════════════════════════════════════════════════════════ */
function measureOffsets() {
  const topbar = document.getElementById('topbar');
  const pmwrap = document.getElementById('pm-wrap');
  const tbH = topbar ? topbar.getBoundingClientRect().height : 44;
  document.body.style.paddingTop = tbH + 'px';
  document.documentElement.style.setProperty('--topbar-h', tbH + 'px');
  // pm-wrap sticks just below the fixed topbar (header scrolls away)
  if (pmwrap) pmwrap.style.top = tbH + 'px';
}

/* ══════════════════════════════════════════════════════════
   NAVIGATION HELPERS
══════════════════════════════════════════════════════════ */
function getScrollOffset() {
  const tb = document.getElementById('topbar');
  const hd = document.getElementById('race-header');
  const pm = document.getElementById('pm-wrap');
  return (tb?.offsetHeight || 0) + (hd?.offsetHeight || 0) + (pm?.offsetHeight || 0) + 14;
}
function scrollToEl(el) {
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - getScrollOffset();
  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
}
function showToast(msg) {
  document.getElementById('nav-toast')?.remove();
  const t = document.createElement('div');
  t.id = 'nav-toast'; t.className = 'nav-hint-toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}
function navToFirstMission() {
  const el = document.getElementById(`mc-${state.current}`);
  scrollToEl(el);
}

/* ══════════════════════════════════════════════════════════
   PROGRESS MAP
══════════════════════════════════════════════════════════ */
function renderProgressMap() {
  const nav = document.getElementById('progress-map');
  if (!nav) return;
  const track = document.createElement('div');
  track.className = 'pm-track';
  MISSIONS.forEach((m, i) => {
    const isDone = state.completed.includes(m.id);
    const isActive = m.id === state.current && !isDone;
    const cls = isDone ? 'pm-done' : isActive ? 'pm-active' : 'pm-locked';
    const cp = document.createElement('div');
    cp.className = `pm-cp ${cls}`;
    cp.setAttribute('aria-label', `משימה ${m.id}: ${m.title}`);
    const dot = document.createElement('div'); dot.className = 'pmc-dot'; dot.textContent = isDone ? '✓' : String(m.id);
    const icon = document.createElement('div'); icon.className = 'pmc-icon'; icon.textContent = m.icon;
    cp.appendChild(dot); cp.appendChild(icon); track.appendChild(cp);
    if (i < MISSIONS.length - 1) {
      const line = document.createElement('div');
      line.className = `pm-line${isDone ? ' pm-line--done' : ''}`;
      track.appendChild(line);
    }
  });
  nav.innerHTML = '';
  nav.appendChild(track);
  requestAnimationFrame(() => {
    nav.querySelector('.pm-active')?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  });
}

/* ══════════════════════════════════════════════════════════
   HTML BUILDERS
══════════════════════════════════════════════════════════ */
function pad(n) { return String(n).padStart(2, '0'); }

function buildCompletedCard(m) {
  const card = document.createElement('div');
  card.className = 'mission-card mc-done'; card.id = `mc-${m.id}`; card.dataset.id = m.id;
  card.innerHTML = `
    <div class="mc-header">
      <div class="mc-num">${pad(m.id)}</div>
      <div class="mc-icon-wrap">${m.icon}</div>
      <h3 class="mc-title">${m.title}</h3>
      <div class="mc-status" aria-label="הושלם">✅</div>
    </div>`;
  return card;
}

function buildM3SuccessHTML() {
  const imgs = GALLERY_SRC.map(src => `
    <div class="m3-gallery-item">
      <img src="${src}" alt="תמונה" loading="lazy" onerror="this.closest('.m3-gallery-item').remove()">
    </div>`).join('');
  return `
    <p class="m3-success-header">🎉 פתחת את הלב! הנה הברכה האישית ממאיה:</p>
    <div class="m3-gallery">${imgs}</div>
    <div class="m3-greeting-card">
      <div class="m3-greeting-from">💛&nbsp;&nbsp;מאיה — לאריאל שלה</div>
      <p class="m3-greeting-text">${MAYA_GREETING}</p>
    </div>`;
}

function buildFamilyHTML() {
  return FAMILY_MESSAGES.map(msg => `
    <div class="fam-msg-card" style="border-right-color:${msg.color}">
      <div class="fam-msg-from" style="color:${msg.color}">${msg.from}</div>
      <p class="fam-msg-text">${msg.text}</p>
    </div>`).join('');
}

// Mission map block (Levinsky tactical map)
function buildMapHTML(mission) {
  if (!mission.mapImage) return '';
  return `
    <div class="mission-map">
      <div class="mm-header">
        <span>🎯</span>
        <span>המפה הטקטית — שוק לוינסקי</span>
      </div>
      <img class="mm-img" src="${mission.mapImage}" alt="מפת לוינסקי"
           loading="lazy" onerror="this.closest('.mission-map').remove()">
      <span class="mm-tag">CLASSIFIED — MISSION ${pad(mission.id)}</span>
    </div>`;
}

function buildActiveCard(m, animate) {
  const card = document.createElement('div');
  card.className = `mission-card mc-active${animate ? ' mc-reveal' : ''}`;
  card.id = `mc-${m.id}`; card.dataset.id = m.id;

  let body = '';
  if (m.type === 'password') {
    if (state.m3Unlocked) {
      body = `
        <p class="mc-content">${m.text}</p>
        <div class="m3-success-zone visible" id="m3-success-${m.id}">${buildM3SuccessHTML()}</div>
        <button class="mc-complete-btn" id="mc-btn-${m.id}" type="button">${m.btnText}</button>`;
    } else {
      body = `
        <p class="mc-content">${m.text}</p>
        <div class="mc-pw-zone" id="pw-zone-${m.id}">
          <p class="mc-pw-label">🔑 הזן את הקוד הסודי:</p>
          <div class="mc-pw-row">
            <input type="text" class="mc-pw-input" id="pw-input-${m.id}"
                   placeholder="הקוד הסודי..."
                   autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false"
                   aria-label="שדה קוד סודי" />
            <button class="mc-pw-submit" id="pw-submit-${m.id}" type="button">פתח 🔑</button>
          </div>
          <div class="mc-pw-error-msg" id="pw-error-${m.id}" role="alert">❌ קוד שגוי — נסה שוב!</div>
        </div>
        <div class="m3-success-zone" id="m3-success-${m.id}">${buildM3SuccessHTML()}</div>`;
    }
  } else if (m.type === 'family') {
    body = `
      <p class="mc-content">${m.text}</p>
      <div class="family-msgs">${buildFamilyHTML()}</div>
      <button class="mc-complete-btn" id="mc-btn-${m.id}" type="button">${m.btnText}</button>`;
  } else {
    body = `
      <p class="mc-content">${m.text}</p>
      ${m.revealOnComplete ? '' : buildMapHTML(m)}
      <button class="mc-complete-btn" id="mc-btn-${m.id}" type="button">${m.btnText}</button>`;
  }

  card.innerHTML = `
    <div class="mc-header">
      <div class="mc-num">${pad(m.id)}</div>
      <div class="mc-icon-wrap">${m.icon}</div>
      <h3 class="mc-title">${m.title}</h3>
      <div class="mc-status" aria-label="פעיל">🚩</div>
    </div>
    <div class="mc-body">${body}</div>`;
  return card;
}

/* ══════════════════════════════════════════════════════════
   INITIAL RENDER
══════════════════════════════════════════════════════════ */
function initialRender() {
  const feed = document.getElementById('mission-feed');
  if (!feed) return;
  feed.innerHTML = '';
  state.completed.forEach(id => {
    const m = MISSIONS.find(x => x.id === id);
    if (m) feed.appendChild(buildCompletedCard(m));
  });
  const active = MISSIONS.find(m => m.id === state.current);
  if (active) feed.appendChild(buildActiveCard(active, false));
  renderProgressMap();
  updateLoveMeter();
  updateGiftBadge();
  bindEvents();
}

/* ══════════════════════════════════════════════════════════
   REVEAL-THEN-ADVANCE  (missions with revealOnComplete)
══════════════════════════════════════════════════════════ */
function handleRevealStep(id) {
  const mission = MISSIONS.find(m => m.id === id);
  if (!mission?.revealOnComplete) return;

  const btn  = document.getElementById(`mc-btn-${id}`);
  const body = document.querySelector(`#mc-${id} .mc-body`);
  if (!btn || !body) return;

  // Replace the complete button with the reveal card + advance button
  btn.disabled = true;
  btn.style.opacity = '0';
  setTimeout(() => {
    btn.remove();
    const r = mission.revealOnComplete;
    const reveal = document.createElement('div');
    reveal.className = 'mission-reveal mc-reveal';
    reveal.innerHTML = `
      <div class="mr-tagline">🎉 נכון! היעד הוא:</div>
      <div class="mr-name">${r.icon} ${r.name}</div>
      <div class="mr-address">📍 ${r.address}</div>`;
    body.appendChild(reveal);

    // If the mission also has a tactical map, inject it right below the reveal
    if (mission.mapImage) {
      const mapWrap = document.createElement('div');
      mapWrap.innerHTML = buildMapHTML(mission);
      const mapEl = mapWrap.firstElementChild;
      if (mapEl) body.appendChild(mapEl);
    }

    const advBtn = document.createElement('button');
    advBtn.className = 'mc-complete-btn mc-reveal';
    advBtn.id = `mc-advance-${id}`;
    advBtn.type = 'button';
    advBtn.textContent = 'קדימה למשימה הבאה! 🏁';
    advBtn.addEventListener('click', () => completeMission(id));
    body.appendChild(advBtn);

    setTimeout(() => scrollToEl(reveal), 80);
  }, 200);
}

/* ══════════════════════════════════════════════════════════
   COMPLETE MISSION
══════════════════════════════════════════════════════════ */
function completeMission(id) {
  if (state.completed.includes(id) || id !== state.current) return;
  const mission = MISSIONS.find(m => m.id === id);
  if (!mission) return;

  const btn = document.getElementById(`mc-btn-${id}`);
  if (btn) btn.disabled = true;

  const isLast = id === MISSIONS.length;
  fireBurst(0.5, 0.65, isLast);

  state.completed.push(id);
  state.current = id + 1;
  saveState();
  updateLoveMeter();

  const feed = document.getElementById('mission-feed');
  const oldCard = document.getElementById(`mc-${id}`);
  if (!oldCard || !feed) { if (isLast) showWinState(); return; }

  const body = oldCard.querySelector('.mc-body');
  if (body) {
    body.style.maxHeight = body.scrollHeight + 'px';
    body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      body.style.transition = 'max-height 0.45s ease, opacity 0.35s ease, padding 0.4s ease';
      body.style.maxHeight = body.style.paddingTop = body.style.paddingBottom = '0';
      body.style.opacity = '0';
    });
  }

  setTimeout(() => {
    oldCard.replaceWith(buildCompletedCard(mission));
    renderProgressMap();
    if (isLast) { showWinState(); return; }
    const nextMission = MISSIONS.find(m => m.id === state.current);
    if (nextMission) {
      const nextCard = buildActiveCard(nextMission, true);
      feed.appendChild(nextCard);
      bindEvents();
      setTimeout(() => scrollToEl(nextCard), 120);
    }
  }, 480);
}

/* ══════════════════════════════════════════════════════════
   PASSWORD VALIDATION
══════════════════════════════════════════════════════════ */
function validatePassword(missionId) {
  const mission = MISSIONS.find(m => m.id === missionId);
  if (!mission) return;
  const input = document.getElementById(`pw-input-${missionId}`);
  const errorEl = document.getElementById(`pw-error-${missionId}`);
  const successEl = document.getElementById(`m3-success-${missionId}`);
  const body = document.querySelector(`#mc-${missionId} .mc-body`);
  if (!input) return;

  if (input.value.trim() === mission.password) {
    input.classList.remove('pw-error'); input.classList.add('pw-success');
    errorEl?.classList.remove('visible');
    state.m3Unlocked = true; saveState();
    if (successEl) { successEl.classList.add('visible'); setTimeout(() => scrollToEl(successEl), 250); }
    if (body && !document.getElementById(`mc-btn-${missionId}`)) {
      const btn = document.createElement('button');
      btn.className = 'mc-complete-btn mc-reveal';
      btn.id = `mc-btn-${missionId}`; btn.type = 'button'; btn.textContent = mission.btnText;
      btn.addEventListener('click', () => completeMission(missionId));
      body.appendChild(btn);
    }
    fireBurst(0.5, 0.6, false);
  } else {
    input.classList.add('pw-error'); input.classList.remove('pw-success');
    errorEl?.classList.add('visible');
    setTimeout(() => input.classList.remove('pw-error'), 500);
  }
}

/* ══════════════════════════════════════════════════════════
   WIN STATE
══════════════════════════════════════════════════════════ */
function showWinState() {
  const ws = document.getElementById('win-section');
  if (!ws) return;
  ws.removeAttribute('hidden'); updateLoveMeter();
  setTimeout(() => {
    ws.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => fireBurst(0.5, 0.5, true), 300);
  }, 200);
}

/* ══════════════════════════════════════════════════════════
   EVENT BINDING
══════════════════════════════════════════════════════════ */
function bindEvents() {
  document.querySelectorAll('.mc-complete-btn').forEach(btn => {
    if (btn._bound) return; btn._bound = true;
    const card = btn.closest('.mission-card');
    const id = card ? parseInt(card.dataset.id, 10) : null;
    if (!id || state.completed.includes(id)) return;
    const mission = MISSIONS.find(m => m.id === id);
    // If mission has a reveal step, first click shows answer; second click (on advBtn) advances
    if (mission?.revealOnComplete) {
      btn.addEventListener('click', () => handleRevealStep(id));
    } else {
      btn.addEventListener('click', () => completeMission(id));
    }
  });

  MISSIONS.filter(m => m.type === 'password').forEach(m => {
    const submit = document.getElementById(`pw-submit-${m.id}`);
    const input = document.getElementById(`pw-input-${m.id}`);
    if (submit && !submit._bound) { submit._bound = true; submit.addEventListener('click', () => validatePassword(m.id)); }
    if (input && !input._bound) { input._bound = true; input.addEventListener('keydown', e => { if (e.key === 'Enter') validatePassword(m.id); }); }
  });

  const cel = document.getElementById('win-celebrate-btn');
  if (cel && !cel._bound) { cel._bound = true; cel.addEventListener('click', () => fireBurst(0.5, 0.5, true)); }

  const rst = document.getElementById('win-reset-btn');
  if (rst && !rst._bound) {
    rst._bound = true;
    rst.addEventListener('click', () => {
      if (confirm('לאפס את המירוץ ולהתחיל מחדש מהמשימה הראשונה?')) resetState();
    });
  }
}

function bindTopbarEvents() {
  document.getElementById('tb-log')?.addEventListener('click', openGiftList);
  document.getElementById('tb-race')?.addEventListener('click', navToFirstMission);
  document.getElementById('tb-balloons')?.addEventListener('click', () => {
    launchBalloonWave();
    // Each button press = 5 balloon pops on the love-meter
    const POPS_PER_PRESS = 5;
    state.balloonPops = Math.min(LOVE_METER_MAX, (state.balloonPops || 0) + POPS_PER_PRESS);
    saveState();
    updateLoveMeter();
    const remaining = LOVE_METER_MAX - state.balloonPops;
    const msg = remaining <= 0
      ? '🎈 המדד מלא! 💕'
      : `🎈 +${POPS_PER_PRESS} אהבה! עוד ${remaining} לסרגל מלא`;
    showToast(msg);
  });
  document.getElementById('al-close')?.addEventListener('click', closeGiftList);
  document.getElementById('al-backdrop')?.addEventListener('click', closeGiftList);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeGiftList(); });
}

/* ══════════════════════════════════════════════════════════
   SECRET RESET  (tap header title 7×)
══════════════════════════════════════════════════════════ */
function initSecretReset() {
  const title = document.getElementById('rh-title');
  if (!title) return;
  let taps = 0, timer = null;
  title.addEventListener('click', () => {
    taps++; clearTimeout(timer);
    timer = setTimeout(() => { taps = 0; }, 3000);
    if (taps >= 7) { taps = 0; if (confirm('🔄 לאפס?')) resetState(); }
  });
}

/* ══════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  // Handle ?reset=true in URL (dev convenience)
  if (new URLSearchParams(window.location.search).get('reset') === 'true') {
    return resetState();
  }

  loadState();
  measureOffsets();
  window.addEventListener('resize', measureOffsets, { passive: true });
  window.addEventListener('orientationchange', () => setTimeout(measureOffsets, 200), { passive: true });

  tickTimer();
  setInterval(tickTimer, 1000);

  if (state.completed.length >= MISSIONS.length) {
    initialRender();
    showWinState();
  } else {
    initialRender();
  }

  startBalloons();
  initFilmStrip();
  bindTopbarEvents();
  initSecretReset();

  setTimeout(() => fireBurst(0.5, 0.4, false), 900);
});
