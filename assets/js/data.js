/* ─────────────────────────────────────────────────────────────
   Данные прототипа. Значения и превью — как в макете
   Figma «Home page» → Library (3064:14668).
   Геометрия превью (w/h/crop) взята из макета 1:1, менять не нужно.
   ───────────────────────────────────────────────────────────── */

const PARTS = {
  // image 6 (2897:16859) — вписано без кропа
  block: { src: 'assets/img/part-block.png', w: 102, h: 85 },
  // image 5 (2897:16953) — кроп из Figma
  bracket: { src: 'assets/img/part-bracket.png', w: 102.857, h: 54.857, crop: { w: 134.2, l: -13.77, h: 172.24, t: -36 } },
  // image 8 (2897:16859;41:131)
  aero: { src: 'assets/img/part-aerospace.png', w: 95.818, h: 96, crop: { w: 106.33, l: -3.16, h: 108.78, t: -5.3 } },
};

// Превью в правой панели (3064:14829) — та же деталь, размер 180×96
const PANEL_PART = { src: 'assets/img/part-bracket.png', w: 180, h: 96, crop: PARTS.bracket.crop };

const CHANGED = '29.02.2024 17:35:08';

const INFO_DEFAULT = {
  visibility: 'Публичный',
  props: [
    ['Разработчик', 'СПРУТ-ТЕХНОЛОГИЯ'],
    ['ID номер', '2212'],
    ['Дата', '8/14/2024 12:59'],
    ['Тип оборудования', 'Токарно-фрезерный'],
    ['Модель', 'Mori Seiki NT 4250'],
    ['Размер файла', '2.9 MB'],
  ],
  axes: ['X', 'Y', 'Z', 'B', 'C', 'S', 'X2', 'Z2', 'LPOS', 'CHUCK', 'PINOL', 'LSTATE'],
  tags: ['Metal working', 'Mill-turning'],
  users: [
    { name: 'Илья Давыдов', mail: 'Ivanov@mail.com', role: 'Создатель', control: 'static' },
    { name: 'Иван Винокур', mail: 'Ivanov@mail.com', role: 'Просмотр', control: 'select' },
    { name: 'Петр Васильев', mail: 'Petrov@mail.com', role: 'Редактирование', control: 'pill' },
  ],
};

const COLLECTIONS = [
  { name: '3D фрезерование', count: '4 проекта', changed: CHANGED, access: 'a' },
  { name: 'Обучение Роботы', count: '4 проекта', changed: CHANGED, access: 'a' },
  { name: 'Токарные проекты', count: '4 проекта', changed: CHANGED, access: 'a' },
  { name: 'Станки Швейцарского типа', count: '4 проекта', changed: CHANGED, access: 'a' },
];

/* 20 карточек — 5 рядов по 4, как в макете */
const PROJECTS = [
  { id: 'p01', name: 'From Drawing',   part: 'block',   access: 'a', groups: ['shared'] },
  { id: 'p02', name: 'From Drawing',   part: 'block',   access: 'a', groups: ['shared'] },
  { id: 'p03', name: 'From Drawing',   part: 'bracket', access: 'a', groups: ['shared', 'favorite'], favorite: true, selected: true },
  { id: 'p04', name: 'Aerospace part', part: 'aero',    access: 'b', groups: ['shared', 'official'] },

  { id: 'p05', name: 'From Drawing', part: 'block', access: 'a', groups: ['shared', 'mine'] },
  { id: 'p06', name: 'From Drawing', part: 'block', access: 'a', groups: ['shared'] },
  { id: 'p07', name: 'From Drawing', part: 'block', access: 'a', groups: ['shared', 'official'] },
  { id: 'p08', name: 'From Drawing', part: 'block', access: 'b', groups: ['shared'] },

  { id: 'p09', name: 'From Drawing', part: 'block', access: 'a', groups: ['shared'] },
  { id: 'p10', name: 'From Drawing', part: 'block', access: 'a', groups: ['shared', 'mine'] },
  { id: 'p11', name: 'From Drawing', part: 'block', access: 'a', groups: ['shared'] },
  { id: 'p12', name: 'From Drawing', part: 'block', access: 'b', groups: ['shared', 'official'] },

  { id: 'p13', name: 'From Drawing', part: 'block', access: 'a', groups: ['shared'] },
  { id: 'p14', name: 'From Drawing', part: 'block', access: 'a', groups: ['shared'] },
  { id: 'p15', name: 'From Drawing', part: 'block', access: 'a', groups: ['shared', 'mine'] },
  { id: 'p16', name: 'From Drawing', part: 'block', access: 'a', groups: ['shared'] },

  { id: 'p17', name: 'From Drawing', part: 'block', access: 'a', groups: ['shared'] },
  { id: 'p18', name: 'From Drawing', part: 'block', access: 'a', groups: ['shared', 'official'] },
  { id: 'p19', name: 'From Drawing', part: 'block', access: 'a', groups: ['shared'] },
  { id: 'p20', name: 'From Drawing', part: 'block', access: 'a', groups: ['shared'] },
].map((p) => ({ changed: CHANGED, accessText: 'Доступные мне', ...p }));
