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

  /* Иконка типа проекта напротив даты изменения.
     layers — глиф «Access project» из Figma (4 слоя), icon — одиночный глиф. */
  function statusIcon(status) {
    const s = STATUS[status] || STATUS.public;
    const key = STATUS[status] ? status : 'public';
    const icon = el('span', `status-icon status-icon--${key}`);
    icon.title = s.label;
    icon.setAttribute('role', 'img');
    icon.setAttribute('aria-label', s.label);
    return icon;
  }

  /* Превью: иконка-заглушка (у компонентов — своя на категорию) */
  function previewInto(host, size, src = PREVIEW_ICON) {
    host.textContent = '';
    const img = el('img');
    img.src = src;
    img.alt = '';
    img.width = size;
    img.height = size;
    host.appendChild(img);
  }

  function metaRow(changed, status) {
    const row = el('div', 'card-meta');
    const text = el('div', 'card-meta__text');
    const label = el('div', 'card-meta__label');
    label.textContent = 'Изменения';
    const value = el('div', 'card-meta__value');
    value.textContent = changed;
    text.append(label, value);
    row.append(text, statusIcon(status));
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

  /* ── Цифровое оборудование ─────────────────────────────── */
  /* Цена: 0 — бесплатно, 'support' — по подписке на техподдержку, число — рубли */
  function priceLabel(price) {
    if (price === 'support') return 'Тех. поддержка';
    if (!price) return 'Бесплатно';
    return `${String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₽`;
  }

  function kindCount(id) {
    return id === 'all' ? DMC_ITEMS.length : DMC_ITEMS.filter((d) => d.kind === id).length;
  }

  function renderKindChips() {
    const host = $('#chips-dmc-kind');
    host.textContent = '';
    DMC_KINDS.forEach((k, i) => {
      const chip = el('button', i === 0 ? 'chip is-active' : 'chip');
      chip.type = 'button';
      chip.dataset.kind = k.id;
      if (k.hint) chip.title = k.hint;
      const label = el('span');
      label.textContent = k.label;
      const count = el('span', 'chip__count');
      count.textContent = kindCount(k.id);
      chip.append(label, count);
      host.appendChild(chip);
    });
  }

  /* Карточка компонента: состав полей как в референсе, стиль карточки проекта */
  function renderDmcItems(list) {
    const host = $('#dmc-items');
    host.textContent = '';
    list.forEach((d) => {
      const card = el('button', 'dmc');
      card.type = 'button';
      card.dataset.id = d.id;
      if (d.selected) card.classList.add('is-selected');

      const kindDef = DMC_KINDS.find((k) => k.id === d.kind) || {};

      const preview = el('div', 'dmc__preview');
      const pv = el('span', 'pv');
      previewInto(pv, 72, kindDef.icon); // у каждой категории своя иконка превью
      preview.appendChild(pv);


      const body = el('div', 'dmc__body');
      const head = el('div', 'dmc__head');
      const name = el('h3', 'dmc__name');
      name.textContent = d.name;
      name.title = d.name;
      // напротив названия — избранное; категория и цена в футере
      const fav = iconButton(d.favorite ? 'assets/img/icn-star-on.svg' : 'assets/img/icn-star.svg',
        d.favorite ? 'Убрать из избранного' : 'В избранное');
      fav.classList.add('card-icon--fav');
      if (d.favorite) fav.classList.add('is-on');
      fav.dataset.fav = d.id;
      head.append(name, fav);

      // набор полей зависит от категории; высота зарезервирована под максимум,
      // чтобы карточки разных категорий не скакали по высоте
      const props = el('div', 'dmc__props');
      props.style.minHeight = `${DMC_MAX_FIELDS * 20}px`;
      (kindDef.fields || []).forEach((field) => {
        const row = el('div', 'prop');
        const key = el('div', 'prop__key');
        key.textContent = DMC_FIELD_LABEL[field];
        if (field === 'area') key.title = 'Рабочая зона, мм';
        const val = el('div', field === 'equipment' ? 'prop__value dmc__equipment' : 'prop__value');
        if (field === 'equipment') {
          if (!d.equipment.length) {
            val.textContent = '—';
          } else {
            d.equipment.forEach((t) => {
              const tag = el('span', 'tag tag--neutral');
              tag.textContent = t;
              tag.title = t;
              val.appendChild(tag);
            });
          }
        } else {
          val.textContent = d[field] || '—';
        }
        row.append(key, val);
        props.appendChild(row);
      });

      body.append(head, props);

      // футер: категория слева, цена справа
      const foot = el('div', 'card-foot');
      const kind = el('span', `kind-tag kind-tag--${d.kind}`);
      kind.textContent = kindDef.chip || '';
      const price = el('span', 'dmc__price');
      price.textContent = priceLabel(d.price);
      if (d.price === 'support') price.title = 'Включён в техническую поддержку';
      foot.append(kind, el('span', 'card-foot__spacer'), price);

      // превью слева, весь текст — в колонке справа
      const col = el('div', 'dmc__col');
      col.append(body, el('div', 'card-divider'), foot);
      card.append(preview, col);
      host.appendChild(card);
    });
    fitEquipment();
  }

  /* ── Панель компонента: шапка + три вкладки ────────────── */
  function propList(rows) {
    const box = el('div', 'pdmc__props');
    rows.forEach(([k, v]) => {
      const row = el('div', 'pdmc__prop');
      const key = el('div', 'pdmc__key');
      key.textContent = k;
      const val = el('div', 'pdmc__val');
      val.textContent = v;
      row.append(key, val);
      box.appendChild(row);
    });
    return box;
  }

  function block(title, node) {
    const b = el('div', 'pdmc__block');
    const t = el('div', 'pdmc__block-title');
    t.textContent = title;
    b.append(t, node);
    return b;
  }

  function renderDmcPanel(d) {
    const kindDef = DMC_KINDS.find((k) => k.id === d.kind) || {};
    const detail = dmcDetail(d);

    $('#pdmc-name').textContent = d.name;
    $('#pdmc-name').title = d.name;

    const fav = $('#pdmc-fav');
    fav.classList.toggle('is-on', !!d.favorite);
    fav.dataset.fav = d.id;
    fav.setAttribute('aria-label', d.favorite ? 'Убрать из избранного' : 'В избранное');
    fav.querySelector('img').src = d.favorite ? 'assets/img/icn-star-on.svg' : 'assets/img/icn-star.svg';

    const badges = $('#pdmc-badges');
    badges.textContent = '';
    const kind = el('span', `kind-tag kind-tag--${d.kind}`);
    kind.textContent = kindDef.chip || '';
    const tested = el('span', 'tag tag--neutral');
    tested.textContent = detail.tested;
    badges.append(kind, tested);

    const publisher = Object.fromEntries(detail.publisher);
    const n = Number(publisher['Загрузок']);
    const tail = n % 100 >= 11 && n % 100 <= 14 ? 'загрузок'
      : n % 10 === 1 ? 'загрузка'
      : n % 10 >= 2 && n % 10 <= 4 ? 'загрузки'
      : 'загрузок';
    $('#pdmc-meta').textContent = `${publisher['Компания']} · ${n} ${tail} · обновлён ${publisher['Обновлён']}`;

    const body = $('#pdmc-body');
    body.textContent = '';

    if (state.dmcTab === 'about') {
      const actions = el('div', 'pdmc__actions');
      const trial = el('button', 'btn btn--dark');
      trial.type = 'button';
      trial.textContent = 'Получить пробную';
      const request = el('button', 'btn');
      request.type = 'button';
      request.textContent = 'Запросить постпроцессор';
      actions.append(trial, request);

      const ask = el('a', 'pdmc__link');
      ask.href = '#';
      ask.textContent = 'Спросить о компоненте';

      const priceRow = el('div', 'pdmc__price-row');
      const priceKey = el('span', 'pdmc__key');
      priceKey.textContent = 'Цена';
      const priceVal = el('span', `pdmc__price${d.price ? '' : ' pdmc__price--free'}`);
      priceVal.textContent = priceLabel(d.price);
      priceRow.append(priceKey, priceVal);

      const about = el('p', 'pdmc__about');
      about.textContent = detail.about;

      body.append(actions, ask, priceRow, block('Описание', about), block('Публикация', propList(detail.publisher)));
    }

    if (state.dmcTab === 'specs') {
      body.append(
        block('Станок', propList(detail.machine)),
        block('Стойка ЧПУ', propList(detail.controller)),
        block('Проверка', propList([['Тестирование в ENCY', detail.tested]])),
      );
    }

    if (state.dmcTab === 'links') {
      const groups = dmcLinked(d);
      groups.forEach((g) => {
        const list = el('div', 'pdmc__linked');
        g.items.forEach((it) => {
          const row = el('button', 'linked');
          row.type = 'button';
          row.dataset.id = it.id;
          const badge = el('span', `linked__badge linked__badge--${it.kind}`);
          badge.textContent = (DMC_KINDS.find((k) => k.id === it.kind) || {}).chip.charAt(0);
          const text = el('span', 'linked__text');
          const nm = el('span', 'linked__name');
          nm.textContent = it.name;
          const sub = el('span', 'linked__sub');
          sub.textContent = `${it.control} · ${it.type}`;
          text.append(nm, sub);
          const price = el('span', 'linked__price');
          price.textContent = priceLabel(it.price);
          row.append(badge, text, price);
          list.appendChild(row);
        });
        body.appendChild(block(g.title, list));
      });
      if (!groups.length) {
        const empty = el('p', 'pdmc__about');
        empty.textContent = 'Связанных компонентов нет.';
        body.appendChild(empty);
      }
    }
  }

  /* Оснащение держим в одну строку: что не влезло — сворачиваем в тег «+N» */
  function fitEquipment() {
    document.querySelectorAll('.dmc__equipment').forEach((row) => {
      const tags = [...row.querySelectorAll('.tag')].filter((t) => !t.classList.contains('tag--more'));
      if (!tags.length) return;
      row.querySelector('.tag--more')?.remove();
      tags.forEach((t) => t.classList.remove('is-hidden'));

      row.classList.add('is-measuring');
      if (row.scrollWidth > row.clientWidth) {
        const more = el('span', 'tag tag--neutral tag--more');
        row.appendChild(more);
        let hidden = 0;
        // прячем с конца, но одна плашка остаётся видимой всегда
        for (let i = tags.length - 1; i >= 1; i--) {
          tags[i].classList.add('is-hidden');
          hidden += 1;
          more.textContent = `+${hidden}`;
          more.title = tags.slice(tags.length - hidden).map((t) => t.textContent).join(', ');
          if (row.scrollWidth <= row.clientWidth) break;
        }
      }
      row.classList.remove('is-measuring');
    });
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
      body.append(name, metaRow(c.changed, c.status));

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
      previewInto(pv, 80);  // как рендер детали в макете — ~половина бокса 160px
      preview.appendChild(pv);

      const col = el('div', 'project__col');

      const top = el('div', 'project__top');
      const name = el('h3', 'project__name');
      name.textContent = p.name;
      name.title = p.name; // полное имя, если обрезано двумя строками
      top.append(name, metaRow(p.changed, p.status));

      const foot = el('div', 'card-foot');
      const location = el('span', 'card-foot__text'); // где лежит проект
      location.textContent = p.location;
      const actions = el('div', 'card-foot__actions');
      // звезда всегда в разметке: у избранных видна, у остальных — по ховеру
      const fav = iconButton(p.favorite ? 'assets/img/icn-star-on.svg' : 'assets/img/icn-star.svg', p.favorite ? 'Убрать из избранного' : 'В избранное');
      fav.classList.add('card-icon--fav');
      if (p.favorite) fav.classList.add('is-on');
      fav.dataset.fav = p.id;
      actions.append(fav, iconButton('assets/img/icn-kebab.svg', 'Действия'));
      foot.append(location, actions);

      col.append(top, el('div', 'card-divider'), foot);
      card.append(preview, col);
      host.appendChild(card);
    });
  }

  /* ── Правая панель ─────────────────────────────────────── */
  function renderPanel(p) {
    previewInto($('#panel-preview'), 144);
    $('#panel-name').textContent = p.name;
    $('#panel-name').title = p.name;
    // тип проекта: та же иконка, что в карточке, + короткая подпись
    const vis = $('#panel-visibility');
    vis.textContent = '';
    const visLabel = el('span');
    visLabel.textContent = STATUS[p.status].short;
    vis.append(statusIcon(p.status), visLabel);

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
  const state = {
    realm: 'projects',
    filter: 'all',
    query: '',
    selectedId: 'p03',
    dmcFilter: 'all',
    dmcKind: 'all',
    dmcSelectedId: 'd01',
    dmcTab: 'about',
  };

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

  function visibleDmc() {
    const q = state.query.trim().toLowerCase();
    return DMC_ITEMS.filter((d) => {
      const byAccess = state.dmcFilter === 'all' || d.groups.includes(state.dmcFilter);
      const byKind = state.dmcKind === 'all' || d.kind === state.dmcKind;
      const byQuery = !q || d.name.toLowerCase().includes(q) || d.control.toLowerCase().includes(q);
      return byAccess && byKind && byQuery;
    }).map((d) => ({ ...d, selected: d.id === state.dmcSelectedId }));
  }

  function refreshDmc() {
    renderDmcItems(visibleDmc());
    const selected = DMC_ITEMS.find((d) => d.id === state.dmcSelectedId);
    if (selected) renderDmcPanel(selected);
    $('#panel-dmc').classList.toggle('is-hidden', !selected || state.realm !== 'dmc');
  }

  function bind() {
    // выбор карточки → панель свойств
    $('#projects').addEventListener('click', (e) => {
      const star = e.target.closest('.card-icon--fav');
      if (star) {
        const item = PROJECTS.find((p) => p.id === star.dataset.fav);
        item.favorite = !item.favorite;
        item.groups = item.favorite
          ? [...item.groups, 'favorite']
          : item.groups.filter((g) => g !== 'favorite');
        refresh();
        return;
      }
      const card = e.target.closest('.project');
      if (!card) return;
      if (e.target.closest('.card-icon')) return; // кебаб не меняет выбор
      state.selectedId = card.dataset.id;
      refresh();
    });

    // чипы-фильтры: активный выбирается внутри своего ряда
    document.querySelectorAll('.chips').forEach((row) => {
      row.addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (!chip) return;
        // активный выбирается внутри своей группы (доступ / категории)
        const set = chip.closest('.chips__set') || row;
        set.querySelectorAll('.chip').forEach((c) => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        if (row.id === 'chips-projects') {
          state.filter = chip.dataset.filter;
          refresh();
        } else {
          if (chip.dataset.filter) state.dmcFilter = chip.dataset.filter;
          if (chip.dataset.kind) state.dmcKind = chip.dataset.kind;
          refreshDmc();
        }
      });
    });

    // выбор компонента и переключение избранного
    $('#dmc-items').addEventListener('click', (e) => {
      const star = e.target.closest('.card-icon--fav');
      if (star) {
        const item = DMC_ITEMS.find((d) => d.id === star.dataset.fav);
        item.favorite = !item.favorite;
        item.groups = item.favorite
          ? [...item.groups, 'favorite']
          : item.groups.filter((g) => g !== 'favorite');
        refreshDmc();
        return;
      }
      const card = e.target.closest('.dmc');
      if (!card || e.target.closest('.card-icon')) return;
      state.dmcSelectedId = card.dataset.id;
      refreshDmc();
    });

    // поиск — работает в активном разделе
    $('#search').addEventListener('input', (e) => {
      state.query = e.target.value;
      if (state.realm === 'projects') refresh();
      else refreshDmc();
    });

    // разделы библиотеки: Проекты / Цифровое оборудование
    document.querySelectorAll('.seg__btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const isProjects = btn.dataset.realm === 'projects';
        state.realm = isProjects ? 'projects' : 'dmc';
        document.querySelectorAll('.seg__btn').forEach((b) => {
          const on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-selected', String(on));
        });
        // у каждого раздела свои ряды чипов
        $('#chips-projects').classList.toggle('is-hidden', !isProjects);
        $('#chips-dmc').classList.toggle('is-hidden', isProjects);
        document.querySelectorAll('.content > .section:not(#realm-dmc)').forEach((s) => {
          s.classList.toggle('is-hidden', !isProjects);
        });
        $('#realm-dmc').classList.toggle('is-hidden', isProjects);
        $('#panel').classList.toggle('is-hidden', !isProjects);
        // загрузка компонентов идёт не отсюда — в DMC кнопки нет
        $('.btn-primary').classList.toggle('is-hidden', !isProjects);
        if (!isProjects) refreshDmc();
      });
    });

    // вкладки панели компонента
    document.querySelectorAll('.ptabs__btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.dmcTab = btn.dataset.ptab;
        document.querySelectorAll('.ptabs__btn').forEach((b) => {
          const on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-selected', String(on));
        });
        refreshDmc();
      });
    });

    // звезда в шапке панели
    $('#pdmc-fav').addEventListener('click', (e) => {
      const item = DMC_ITEMS.find((d) => d.id === e.currentTarget.dataset.fav);
      item.favorite = !item.favorite;
      item.groups = item.favorite
        ? [...item.groups, 'favorite']
        : item.groups.filter((g) => g !== 'favorite');
      refreshDmc();
    });

    // переход по связанному компоненту
    $('#pdmc-body').addEventListener('click', (e) => {
      const row = e.target.closest('.linked');
      if (!row) return;
      state.dmcSelectedId = row.dataset.id;
      refreshDmc();
    });

    // при изменении ширины пересчитываем, сколько плашек оснащения влезает
    window.addEventListener('resize', () => {
      if (state.realm === 'dmc') fitEquipment();
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
  renderKindChips();
  bind();
  refresh();
})();
