/* ─────────────────────────────────────────────────────────────
   Страница «Библиотека» — рендер и взаимодействия прототипа.
   ───────────────────────────────────────────────────────────── */
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const el = (tag, cls) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    return n;
  };

  /* Иконка доступа: 4 экспортированных слоя из Figma, позиции — в CSS */
  function accessIcon(variant = 'a') {
    const wrap = el('span', 'access');
    for (let i = 1; i <= 4; i++) {
      const img = el('img');
      img.src = `assets/img/access-${variant}-${i}.svg`;
      img.alt = '';
      wrap.appendChild(img);
    }
    return wrap;
  }

  /* Превью: заглушка «3D-модель» вместо рендера детали */
  function previewInto(host, size) {
    host.textContent = '';
    const img = el('img');
    img.src = PREVIEW_ICON;
    img.alt = '3D-модель';
    img.width = size;
    img.height = size;
    host.appendChild(img);
  }

  function metaRow(changed, access) {
    const row = el('div', 'card-meta');
    const text = el('div', 'card-meta__text');
    const label = el('div', 'card-meta__label');
    label.textContent = 'Изменения';
    const value = el('div', 'card-meta__value');
    value.textContent = changed;
    text.append(label, value);
    row.append(text, accessIcon(access));
    return row;
  }

  function iconButton(src, label) {
    const btn = el('button', 'card-icon');
    btn.type = 'button';
    btn.setAttribute('aria-label', label);
    const img = el('img');
    img.src = src;
    img.alt = '';
    btn.appendChild(img);
    return btn;
  }

  /* ── Подборки ──────────────────────────────────────────── */
  function renderCollections() {
    const host = $('#collections');
    host.textContent = '';
    COLLECTIONS.forEach((c) => {
      const card = el('button', 'collection');
      card.type = 'button';

      const body = el('div', 'collection__body');
      const name = el('h3', 'collection__name');
      name.textContent = c.name;
      body.append(name, metaRow(c.changed, c.access));

      const foot = el('div', 'card-foot');
      const count = el('span', 'card-foot__text');
      count.textContent = c.count;
      const actions = el('div', 'card-foot__actions');
      actions.appendChild(iconButton('assets/img/icn-kebab.svg', 'Действия'));
      foot.append(count, actions);

      card.append(body, el('div', 'card-divider'), foot);
      host.appendChild(card);
    });
  }

  /* ── Проекты ───────────────────────────────────────────── */
  function renderProjects(list) {
    const host = $('#projects');
    host.textContent = '';
    list.forEach((p) => {
      const card = el('button', 'project');
      card.type = 'button';
      card.dataset.id = p.id;
      if (p.selected) card.classList.add('is-selected');

      const preview = el('div', 'project__preview');
      const pv = el('span', 'pv');
      previewInto(pv, 48);
      preview.appendChild(pv);

      const col = el('div', 'project__col');

      const top = el('div', 'project__top');
      const name = el('h3', 'project__name');
      name.textContent = p.name;
      name.title = p.name; // полное имя, если обрезано двумя строками
      top.append(name, metaRow(p.changed, p.access));

      const foot = el('div', 'card-foot');
      const accessText = el('span', 'card-foot__text');
      accessText.textContent = p.accessText;
      const actions = el('div', 'card-foot__actions');
      if (p.favorite) actions.appendChild(iconButton('assets/img/icn-star.svg', 'В избранное'));
      actions.appendChild(iconButton('assets/img/icn-kebab.svg', 'Действия'));
      foot.append(accessText, actions);

      col.append(top, el('div', 'card-divider'), foot);
      card.append(preview, col);
      host.appendChild(card);
    });
  }

  /* ── Правая панель ─────────────────────────────────────── */
  function renderPanel(p) {
    previewInto($('#panel-preview'), 96);
    $('#panel-name').textContent = p.name;
    $('#panel-name').title = p.name;
    $('#panel-visibility').textContent = p.visibility;

    const props = $('#panel-props');
    props.textContent = '';
    [
      ['Разработчик', p.dev],
      ['ID номер', p.num],
      ['Дата', p.date],
      ['Тип оборудования', p.type],
      ['Модель', p.machine],
      ['Размер файла', p.size],
    ].forEach(([k, v]) => {
      const row = el('div', 'prop');
      const key = el('div', 'prop__key');
      key.textContent = k;
      const val = el('div', 'prop__value');
      val.textContent = v;
      row.append(key, val);
      props.appendChild(row);
    });

    const axes = $('#panel-axes');
    axes.textContent = '';
    p.axes.forEach((a) => {
      const t = el('span', 'tag');
      t.textContent = a;
      axes.appendChild(t);
    });

    const tags = $('#panel-tags');
    tags.textContent = '';
    p.tags.forEach((t) => {
      const n = el('span', 'tag tag--solid');
      n.textContent = t;
      tags.appendChild(n);
    });

    const users = $('#panel-users');
    users.textContent = '';
    p.users.forEach((u) => {
      const row = el('div', 'user');
      const id = el('div', 'user__id');
      const name = el('span', 'user__name');
      name.textContent = u.name;
      const mail = el('span', 'user__mail');
      mail.textContent = u.mail;
      id.append(name, mail);

      const cls = u.control === 'select' ? 'role role--select'
        : u.control === 'pill' ? 'role role--pill'
        : 'role role--static';
      const role = el('button', cls);
      role.type = 'button';
      if (u.control === 'static') role.disabled = true;
      const label = el('span');
      label.textContent = u.role;
      role.appendChild(label);
      if (u.control !== 'static') {
        const chevBox = el('span', 'chev');
        const chev = el('img');
        chev.src = 'assets/img/icn-chevron.svg';
        chev.alt = '';
        chevBox.appendChild(chev);
        role.appendChild(chevBox);
      }

      row.append(id, role);
      users.appendChild(row);
    });
  }

  /* ── Состояние и взаимодействия ────────────────────────── */
  const state = { filter: 'all', query: '', selectedId: 'p03' };

  function visibleProjects() {
    const q = state.query.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const byFilter = state.filter === 'all' || (p.groups || []).includes(state.filter);
      const byQuery = !q || p.name.toLowerCase().includes(q);
      return byFilter && byQuery;
    }).map((p) => ({ ...p, selected: p.id === state.selectedId }));
  }

  function refresh() {
    renderProjects(visibleProjects());
    const selected = PROJECTS.find((p) => p.id === state.selectedId);
    if (selected) renderPanel(selected);
    $('#panel').classList.toggle('is-hidden', !selected);
  }

  function bind() {
    // выбор карточки → панель свойств
    $('#projects').addEventListener('click', (e) => {
      const card = e.target.closest('.project');
      if (!card) return;
      if (e.target.closest('.card-icon')) return; // кебаб/звезда не меняют выбор
      state.selectedId = card.dataset.id;
      refresh();
    });

    // чипы-фильтры
    document.querySelectorAll('.chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.chip').forEach((c) => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        state.filter = chip.dataset.filter;
        refresh();
      });
    });

    // поиск
    $('#search').addEventListener('input', (e) => {
      state.query = e.target.value;
      refresh();
    });

    // табы проектов в титульной строке
    document.querySelectorAll('.tab').forEach((tab) => {
      tab.addEventListener('click', (e) => {
        if (e.target.closest('.tab__close')) return;
        document.querySelectorAll('.tab').forEach((t) => t.classList.remove('is-active'));
        tab.classList.add('is-active');
      });
    });
  }

  renderCollections();
  bind();
  refresh();
})();
