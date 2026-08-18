/* ─────────────────────────────────────────────────────────────
   Данные прототипа. Структура и подписи — по макету
   Figma «Home page» → Library (3064:14668).
   Превью деталей заменены иконкой-заглушкой «3D-модель».
   ───────────────────────────────────────────────────────────── */

const PREVIEW_ICON = 'assets/img/icn-3d-model.svg';

/* Подпись в подвале карточки = где лежит проект.
   В «Библиотеке» это всегда «Библиотека»; на «Недавних» будут вперемешку
   библиотека и локальные пути вида D:\\Projects\\shaft.stcprj */
const LIBRARY_LOCATION = 'Библиотека';

/* Тип проекта — показывается иконкой напротив даты изменения.
   Сами глифы (icn-status-*.svg, 24px) привязаны в styles.css классами
   .status-icon--<ключ> и выводятся маской: файлы нарисованы в #F5F5F5 под
   тёмную тему, а маска берёт цвет из токена и сохраняет полупрозрачные части.
   short — подпись в правой панели; «мой» и «мой, я поделился» подписаны
   одинаково, разницу несёт иконка. */
const STATUS = {
  public:       { short: 'Публичный',    label: 'Публичный проект' },
  sharedByMe:   { short: 'Мой проект',   label: 'Мой проект, я поделился им' },
  sharedWithMe: { short: 'Доступен мне', label: 'Проект, доступный мне' },
  private:      { short: 'Мой проект',   label: 'Мой проект, доступен только мне' },
};

/* Категории раздела «Цифровое оборудование». Количество считается из DMC_ITEMS.
   Kit — схема, интерпретатор и постпроцессор в одном комплекте. */
const DMC_KINDS = [
  { id: 'all', label: 'Все категории' },
  { id: 'schemes', label: 'Схемы', chip: 'Схема станка' },
  { id: 'interpreters', label: 'Интерпретаторы', chip: 'Интерпретатор' },
  { id: 'posts', label: 'Постпроцессоры', chip: 'Постпроцессор' },
  { id: 'kits', label: 'Комплекты', chip: 'Комплект', hint: 'Kit — схема, интерпретатор и постпроцессор в одном комплекте' },
];

/* Компоненты цифрового оборудования. Состав полей — как в референсе карточки:
   стойка, тип, оси, рабочая зона, оснащение. */
const DMC_ITEMS = [
  { id: 'd01', price: 0, name: 'Makino DA 90',        kind: 'schemes',       control: 'Okuma',        type: 'Mill Turn',   axes: '6+',  area: '830 × 480 × 730',  equipment: ['Барфидер', 'Приводной инструмент'], status: 'public',       favorite: true },
  { id: 'd02', price: 148000, name: 'Mori Seiki NT 4250',  kind: 'kits',          control: 'Fanuc 31i',    type: 'Mill Turn',   axes: '9',   area: '1250 × 660 × 700', equipment: ['Барфидер', 'Противошпиндель', 'Люнет', 'Приводной инструмент'],       status: 'public' },
  { id: 'd03', price: 0, name: 'DMG MORI DMU 50',     kind: 'schemes',       control: 'Siemens 840D', type: '5X Mill',     axes: '5',   area: '650 × 520 × 475',  equipment: ['Поворотный стол', 'СОЖ через шпиндель', 'Измерительный щуп'],       status: 'public' },
  { id: 'd04', price: 'support', name: 'Haas VF-2SS',         kind: 'schemes',       control: 'Haas NGC',     type: '3X Mill',     axes: '3',   area: '760 × 410 × 510',  equipment: ['СОЖ через шпиндель'],       status: 'sharedWithMe' },
  { id: 'd05', price: 96000, name: 'Okuma LB3000 EX',     kind: 'schemes',       control: 'Okuma OSP',    type: 'Turning',     axes: '4',   area: 'Ø410 × 1000',      equipment: ['Барфидер', 'Люнет', 'Противошпиндель'],       status: 'public' },
  { id: 'd06', price: 'support', name: 'Fanuc 31i Mill Turn', kind: 'interpreters',  control: 'Fanuc 31i',    type: 'Mill Turn',   axes: '6+',  area: '—',                equipment: ['Циклы сверления', 'TCPM'],       status: 'public',       favorite: true },
  { id: 'd07', price: 'support', name: 'Siemens 840D sl',     kind: 'interpreters',  control: 'Siemens 840D', type: '5X Mill',     axes: '5',   area: '—',                equipment: ['Циклы фрезерования', 'TRAORI'],       status: 'public' },
  { id: 'd08', price: 0, name: 'Heidenhain TNC 640',  kind: 'interpreters',  control: 'TNC 640',      type: '5X Mill',     axes: '5',   area: '—',                equipment: ['Циклы измерения'], status: 'private' },
  { id: 'd09', price: 24500, name: 'Fanuc 0i-MF post',    kind: 'posts',         control: 'Fanuc 0i-MF',  type: '3X Mill',     axes: '3',   area: '—',                equipment: ['G54.1', 'Подпрограммы'],       status: 'sharedByMe' },
  { id: 'd10', price: 0, name: 'Sinumerik 828D post', kind: 'posts',         control: 'Sinumerik 828D', type: 'Turning',   axes: '4',   area: '—',                equipment: ['Циклы точения'],       status: 'private' },
  { id: 'd11', price: 39000, name: 'Mazak Smooth G post', kind: 'posts',         control: 'Smooth G',     type: 'Mill Turn',   axes: '9',   area: '—',                equipment: ['Синхронизация каналов'], status: 'sharedByMe',   favorite: true },
  { id: 'd12', price: 210000, name: 'Grob G350 kit',       kind: 'kits',          control: 'Siemens 840D', type: '5X Mill',     axes: '5',   area: '700 × 800 × 900',  equipment: ['Паллеты', 'Поворотный стол', 'Измерительный щуп', 'Смена инструмента'],       status: 'public' },
  { id: 'd13', price: 0, name: 'Hermle C42 U',        kind: 'schemes',       control: 'TNC 640',      type: '5X Mill',     axes: '5',   area: '800 × 800 × 550',  equipment: ['Поворотный стол', 'Приводной инструмент', 'СОЖ через шпиндель'],       status: 'sharedWithMe' },
  { id: 'd14', price: 0, name: 'Doosan Puma 2600',    kind: 'schemes',       control: 'Fanuc 31i',    type: 'Turning',     axes: '3',   area: 'Ø460 × 700',       equipment: [],  status: 'public' },
  { id: 'd15', price: 132000, name: 'Sodick AQ537L',       kind: 'schemes',       control: 'Sodick LN2',   type: 'Wire EDM',    axes: '4',   area: '500 × 370 × 300',  equipment: ['Автозаправка проволоки'],       status: 'public' },
  { id: 'd16', price: 'support', name: 'Haas ST-20 post',     kind: 'posts',         control: 'Haas NGC',     type: 'Turning',     axes: '2',   area: '—',                equipment: ['Циклы точения'],       status: 'private' },
].map((d) => {
  // чипы доступа: «Мои компоненты» = приватные и те, которыми я поделился
  const groups = [];
  if (d.status === 'private' || d.status === 'sharedByMe') groups.push('mine');
  if (d.favorite) groups.push('favorite');
  return { ...d, groups };
});

/* Какой чип-фильтр отвечает за какой тип */
const CHIP_BY_STATUS = {
  public: 'official',
  sharedByMe: 'mine',
  private: 'mine',
  sharedWithMe: 'shared',
};

/* Набор осей зависит от типа оборудования */
const AXES_BY_TYPE = {
  'Токарно-фрезерный': ['X', 'Y', 'Z', 'B', 'C', 'S', 'X2', 'Z2', 'LPOS', 'CHUCK', 'PINOL', 'LSTATE'],
  'Токарный': ['X', 'Z', 'C', 'S', 'CHUCK', 'PINOL', 'LSTATE'],
  'Фрезерный 3-осевой': ['X', 'Y', 'Z', 'S'],
  'Фрезерный 5-осевой': ['X', 'Y', 'Z', 'A', 'C', 'S', 'TABLE'],
  'Эрозионный': ['X', 'Y', 'Z', 'U', 'V', 'WIRE'],
};

const USERS_POOL = [
  { name: 'Илья Давыдов', mail: 'Ivanov@mail.com', role: 'Создатель', control: 'static' },
  { name: 'Иван Винокур', mail: 'Ivanov@mail.com', role: 'Просмотр', control: 'select' },
  { name: 'Петр Васильев', mail: 'Petrov@mail.com', role: 'Редактирование', control: 'pill' },
  { name: 'Анна Кольцова', mail: 'koltsova@mail.com', role: 'Просмотр', control: 'select' },
  { name: 'Сергей Гущин', mail: 'gushchin@mail.com', role: 'Редактирование', control: 'pill' },
];

const COLLECTIONS = [
  { name: '3D фрезерование', count: '12 проектов', changed: '18.06.2024 09:12:44', status: 'public' },
  { name: 'Обучение Роботы', count: '7 проектов', changed: '02.05.2024 14:03:19', status: 'public' },
  { name: 'Токарные проекты', count: '23 проекта', changed: '29.02.2024 17:35:08', status: 'public' },
  { name: 'Станки Швейцарского типа', count: '5 проектов', changed: '11.07.2024 11:48:02', status: 'sharedWithMe' },
];

/* 20 карточек — 5 рядов по 4, как в макете */
const PROJECTS = [
  { id: 'p01', name: 'Turn part probing 2',   status: 'sharedWithMe',   favorite: true,  changed: '29.02.2024 17:35:08', date: '8/14/2024 12:59',  type: 'Токарно-фрезерный', machine: 'Mori Seiki NT 4250',   size: '2.9 MB',  tags: ['Metal working', 'Mill-turning'],   dev: 'СПРУТ-ТЕХНОЛОГИЯ', num: '2212' },
  { id: 'p02', name: 'Shaft 40x120',          status: 'sharedWithMe',   changed: '04.03.2024 10:22:15', date: '3/4/2024 10:22',   type: 'Токарный',           machine: 'Okuma LB3000 EX',      size: '1.4 MB',  tags: ['Turning', 'Steel'],                dev: 'СПРУТ-ТЕХНОЛОГИЯ', num: '2214' },
  { id: 'p03', name: 'Bracket 5-axis',        status: 'sharedByMe', favorite: true,  changed: '17.03.2024 08:41:57', date: '3/17/2024 08:41',  type: 'Фрезерный 5-осевой', machine: 'DMG MORI DMU 50',      size: '8.2 MB',  tags: ['Milling', 'Aluminium', '5X'],      dev: 'Иван Винокур',     num: '3081' },
  { id: 'p04', name: 'Aerospace part',        status: 'public',       changed: '21.03.2024 19:05:33', date: '3/21/2024 19:05',  type: 'Фрезерный 5-осевой', machine: 'Hermle C42 U',         size: '14.7 MB', tags: ['Aerospace', 'Titanium', '5X'],     dev: 'СПРУТ-ТЕХНОЛОГИЯ', num: '1109' },

  { id: 'p05', name: 'Гидроцилиндр корпус',   status: 'private',          changed: '02.04.2024 12:10:04', date: '4/2/2024 12:10',   type: 'Токарно-фрезерный',  machine: 'Mazak Integrex i-200', size: '5.1 MB',  tags: ['Mill-turning', 'Hydraulics'],      dev: 'Петр Васильев',    num: '3122' },
  { id: 'p06', name: 'Impeller 5X',           status: 'public',       favorite: true,  changed: '08.04.2024 16:47:29', date: '4/8/2024 16:47',   type: 'Фрезерный 5-осевой', machine: 'Grob G350',            size: '21.3 MB', tags: ['Impeller', '5X', 'Inconel'],       dev: 'СПРУТ-ТЕХНОЛОГИЯ', num: '1147' },
  { id: 'p07', name: 'Фланец DN100',          status: 'sharedWithMe',   changed: '15.04.2024 09:58:11', date: '4/15/2024 09:58',  type: 'Токарный',           machine: 'Doosan Puma 2600',     size: '0.9 MB',  tags: ['Turning', 'Flange'],               dev: 'Анна Кольцова',    num: '2251' },
  { id: 'p08', name: 'Mold core insert',      status: 'public',       changed: '23.04.2024 14:32:50', date: '4/23/2024 14:32',  type: 'Эрозионный',         machine: 'Sodick AQ537L',        size: '3.6 MB',  tags: ['EDM', 'Tooling'],                  dev: 'СПРУТ-ТЕХНОЛОГИЯ', num: '1183' },

  { id: 'p09', name: 'Втулка бронзовая',      status: 'sharedWithMe',   changed: '05.05.2024 11:19:38', date: '5/5/2024 11:19',   type: 'Токарный',           machine: 'Okuma LB3000 EX',      size: '0.6 MB',  tags: ['Turning', 'Bronze'],               dev: 'Сергей Гущин',     num: '2267' },
  { id: 'p10', name: 'Turbine blade',         status: 'public',       favorite: true,  changed: '12.05.2024 18:02:07', date: '5/12/2024 18:02', type: 'Фрезерный 5-осевой', machine: 'Hermle C42 U',         size: '18.9 MB', tags: ['Aerospace', 'Blade', '5X'],        dev: 'СПРУТ-ТЕХНОЛОГИЯ', num: '1204' },
  { id: 'p11', name: 'Корпус редуктора цилиндрического двухступенчатого КЦ2-250-63',      status: 'sharedByMe', changed: '19.05.2024 08:25:44', date: '5/19/2024 08:25',  type: 'Фрезерный 3-осевой', machine: 'Haas VF-2SS',          size: '6.4 MB',  tags: ['Milling', 'Cast iron'],            dev: 'Иван Винокур',     num: '3175' },
  { id: 'p12', name: 'Spindle housing',       status: 'sharedWithMe',   changed: '27.05.2024 13:51:26', date: '5/27/2024 13:51',  type: 'Токарно-фрезерный',  machine: 'Mazak Integrex i-200', size: '4.8 MB',  tags: ['Mill-turning', 'Spindle'],         dev: 'СПРУТ-ТЕХНОЛОГИЯ', num: '2288' },

  { id: 'p13', name: 'Зубчатое колесо m2',    status: 'sharedWithMe',   changed: '03.06.2024 10:07:59', date: '6/3/2024 10:07',   type: 'Фрезерный 5-осевой', machine: 'DMG MORI DMU 50',      size: '7.7 MB',  tags: ['Gear', 'Milling'],                 dev: 'Петр Васильев',    num: '2301' },
  { id: 'p14', name: 'Heat sink mill',        status: 'private',          changed: '11.06.2024 15:44:13', date: '6/11/2024 15:44',  type: 'Фрезерный 3-осевой', machine: 'Haas VF-2SS',          size: '2.2 MB',  tags: ['Milling', 'Aluminium'],            dev: 'Анна Кольцова',    num: '3198' },
  { id: 'p15', name: 'Крышка подшипника шпиндельного узла',     status: 'public',       changed: '18.06.2024 09:12:44', date: '6/18/2024 09:12',  type: 'Токарный',           machine: 'Doosan Puma 2600',     size: '1.1 MB',  tags: ['Turning', 'Bearing'],              dev: 'СПРУТ-ТЕХНОЛОГИЯ', num: '1236' },
  { id: 'p16', name: 'Valve body',            status: 'sharedWithMe',   favorite: true,  changed: '25.06.2024 17:29:31', date: '6/25/2024 17:29', type: 'Токарно-фрезерный',  machine: 'Mori Seiki NT 4250',   size: '9.3 MB',  tags: ['Mill-turning', 'Valve'],           dev: 'СПРУТ-ТЕХНОЛОГИЯ', num: '2319' },

  { id: 'p17', name: 'Ось ступенчатая',       status: 'private',          changed: '02.07.2024 08:33:08', date: '7/2/2024 08:33',   type: 'Токарный',           machine: 'Okuma LB3000 EX',      size: '0.8 MB',  tags: ['Turning', 'Shaft'],                dev: 'Сергей Гущин',     num: '3224' },
  { id: 'p18', name: 'Electrode EDM',         status: 'public',       changed: '11.07.2024 11:48:02', date: '7/11/2024 11:48',  type: 'Эрозионный',         machine: 'Sodick AQ537L',        size: '2.7 MB',  tags: ['EDM', 'Graphite'],                 dev: 'СПРУТ-ТЕХНОЛОГИЯ', num: '1262' },
  { id: 'p19', name: 'Планка направляющая',   status: 'sharedWithMe',   changed: '19.07.2024 14:56:47', date: '7/19/2024 14:56',  type: 'Фрезерный 3-осевой', machine: 'Haas VF-2SS',          size: '1.9 MB',  tags: ['Milling', 'Steel'],                dev: 'Иван Винокур',     num: '2334' },
  { id: 'p20', name: 'Rotor disc',            status: 'public',       changed: '28.07.2024 20:14:22', date: '7/28/2024 20:14',  type: 'Фрезерный 5-осевой', machine: 'Grob G350',            size: '16.5 MB', tags: ['Rotor', '5X', 'Inconel'],          dev: 'СПРУТ-ТЕХНОЛОГИЯ', num: '1288' },
].map((p, i) => ({
  ...p,
  location: LIBRARY_LOCATION,
  axes: AXES_BY_TYPE[p.type],
  // группы для чипов-фильтров: по типу проекта + «Избранные», если помечен
  groups: p.favorite ? [CHIP_BY_STATUS[p.status], 'favorite'] : [CHIP_BY_STATUS[p.status]],
  users: [USERS_POOL[0], USERS_POOL[1 + (i % 4)]],
}));
