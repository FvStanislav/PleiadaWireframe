const publisherSections = [
  { key: "requests", title: "Заявки" },
  { key: "calendar", title: "Календарь" },
  { key: "chats", title: "Чаты" },
  { key: "channels", title: "Управление каналами" },
  { key: "publisher-profile", title: "Профиль" },
  { key: "publisher-billing", title: "Платежи и документы" },
  { key: "publisher-help", title: "Помощь" }
];

const publisherRequests = [
  {
    id: "request-1",
    channel: "Канал 1",
    format: "Нативная интеграция",
    amount: 48000,
    publicationDate: "2026-11-05",
    status: "Новая"
  },
  {
    id: "request-2",
    channel: "Канал 2",
    format: "Упоминание товара",
    amount: 32500,
    publicationDate: "2026-11-12",
    status: "Ждет ответа"
  },
  {
    id: "request-3",
    channel: "Канал 3",
    format: "Спонсор ролика",
    amount: 65000,
    publicationDate: "2026-11-20",
    status: "Согласовано"
  }
];

const publisherRequestState = {
  status: "Все",
  search: "",
  sort: "date"
};

const publisherCalendarDays = [
  { date: "2026-11-02", weekday: "Пн", label: "2 ноя" },
  { date: "2026-11-03", weekday: "Вт", label: "3 ноя" },
  { date: "2026-11-04", weekday: "Ср", label: "4 ноя" },
  { date: "2026-11-05", weekday: "Чт", label: "5 ноя" },
  { date: "2026-11-06", weekday: "Пт", label: "6 ноя" },
  { date: "2026-11-07", weekday: "Сб", label: "7 ноя" },
  { date: "2026-11-08", weekday: "Вс", label: "8 ноя" }
];

const publisherCalendarSlots = ["09:00", "12:00", "15:00", "18:00", "21:00"];

const publisherCalendarPlacements = [
  {
    id: "calendar-1",
    channel: "Канал 1",
    format: "Нативная интеграция",
    date: "2026-11-02",
    time: "12:00",
    kind: "scheduled"
  },
  {
    id: "calendar-2",
    channel: "Канал 2",
    format: "Упоминание товара",
    date: "2026-11-03",
    time: "18:00",
    kind: "scheduled"
  },
  {
    id: "calendar-3",
    channel: "Канал 3",
    format: "Спонсор ролика",
    date: "2026-11-04",
    time: "15:00",
    kind: "scheduled"
  },
  {
    id: "calendar-4",
    channel: "Канал 1",
    format: "Нативный текст",
    date: "2026-11-06",
    time: "09:00",
    kind: "scheduled"
  },
  {
    id: "calendar-5",
    channel: "Канал 2",
    format: "Нативная интеграция",
    date: "2026-11-08",
    time: "21:00",
    kind: "scheduled"
  },
  {
    id: "calendar-potential-1",
    channel: "Канал 1",
    format: "Нативная интеграция",
    date: "2026-11-05",
    time: "15:00",
    kind: "potential"
  },
  {
    id: "calendar-potential-2",
    channel: "Канал 3",
    format: "Обзор продукта",
    date: "2026-11-07",
    time: "12:00",
    kind: "potential"
  }
];

const publisherCalendarState = {
  channels: ["Канал 1", "Канал 2", "Канал 3"],
  mode: "all"
};

const workspaceSwitch = document.querySelector("#workspace-switch");
const sidebar = document.querySelector(".sidebar");
let publisherMode = false;

function renderPublisherSidebar(activeKey) {
  sidebar.innerHTML = `
    <div class="account-card">
      <div class="account-avatar">FV</div>
      <div class="account-main">
        <div class="account-name">${mockData.client.nickname}</div>
        <div class="account-balance-label">Баланс</div>
        <div class="account-balance">${mockData.client.balance}</div>
      </div>
    </div>

    <div class="sidebar-title">Разделы</div>

    ${publisherSections.map((section) => `
      <button class="nav-item publisher-nav-item ${section.key === activeKey ? "active" : ""}" data-publisher-screen="${section.key}">
        <span class="nav-title">${section.title}</span>
      </button>
    `).join("")}
  `;

  document.querySelectorAll("[data-publisher-screen]").forEach((item) => {
    item.addEventListener("click", () => renderPublisherScreen(item.dataset.publisherScreen));
  });
}

function publisherRequestStatusClass(status) {
  if (status === "Новая") return "publisher-status-new";
  if (status === "Ждет ответа") return "publisher-status-waiting";
  if (status === "Согласовано") return "publisher-status-agreed";
  return "";
}

function publisherRequestDate(value) {
  return new Intl.DateTimeFormat("ru-RU").format(new Date(`${value}T00:00:00`));
}

function filteredPublisherRequests() {
  const query = publisherRequestState.search.trim().toLowerCase();

  return publisherRequests
    .filter((request) => publisherRequestState.status === "Все" || request.status === publisherRequestState.status)
    .filter((request) => !query || `${request.channel} ${request.format}`.toLowerCase().includes(query))
    .sort((a, b) => {
      if (publisherRequestState.sort === "amount") return b.amount - a.amount;
      return a.publicationDate.localeCompare(b.publicationDate);
    });
}

function renderPublisherRequestCard(request) {
  return `
    <article class="publisher-request-card">
      <div class="publisher-request-title-row">
        <div>
          <span class="publisher-request-label">Канал</span>
          <h3>${request.channel}</h3>
        </div>
        <span class="publisher-request-status ${publisherRequestStatusClass(request.status)}">${request.status}</span>
      </div>

      <div class="publisher-request-meta">
        <div>
          <span>Формат</span>
          <strong>${request.format}</strong>
        </div>
        <div>
          <span>Стоимость</span>
          <strong>${formatNumber(request.amount)} ₽</strong>
        </div>
        <div>
          <span>Дата публикации</span>
          <strong>${publisherRequestDate(request.publicationDate)}</strong>
        </div>
      </div>
    </article>
  `;
}

function renderPublisherRequestsList() {
  const list = document.querySelector("#publisher-request-list");
  if (!list) return;

  const requests = filteredPublisherRequests();
  list.innerHTML = requests.length
    ? requests.map(renderPublisherRequestCard).join("")
    : `<div class="panel publisher-request-empty">Заявки не найдены.</div>`;
}

function renderPublisherRequests() {
  screen.innerHTML = `
    <div class="page-header publisher-requests-header">
      <h1>Заявки</h1>
      <p>Заявки на размещение в ваших каналах.</p>
    </div>

    <div class="publisher-request-toolbar">
      <div class="publisher-status-filters" aria-label="Фильтр по статусу">
        ${["Все", "Новая", "Ждет ответа", "Согласовано"].map((status) => `
          <button class="publisher-filter-button ${publisherRequestState.status === status ? "active" : ""}" type="button" data-request-status="${status}">${status}</button>
        `).join("")}
      </div>

      <div class="publisher-request-controls">
        <input id="publisher-request-search" class="publisher-request-search" type="search" placeholder="Поиск" value="${publisherRequestState.search}">
        <select id="publisher-request-sort" class="publisher-request-sort" aria-label="Сортировка заявок">
          <option value="date" ${publisherRequestState.sort === "date" ? "selected" : ""}>По дате</option>
          <option value="amount" ${publisherRequestState.sort === "amount" ? "selected" : ""}>По сумме</option>
        </select>
      </div>
    </div>

    <div class="publisher-request-list" id="publisher-request-list"></div>
  `;

  document.querySelectorAll("[data-request-status]").forEach((button) => {
    button.addEventListener("click", () => {
      publisherRequestState.status = button.dataset.requestStatus;
      renderPublisherRequests();
    });
  });

  document.querySelector("#publisher-request-search").addEventListener("input", (event) => {
    publisherRequestState.search = event.target.value;
    renderPublisherRequestsList();
  });

  document.querySelector("#publisher-request-sort").addEventListener("change", (event) => {
    publisherRequestState.sort = event.target.value;
    renderPublisherRequestsList();
  });

  renderPublisherRequestsList();
}

function filteredPublisherCalendarPlacements() {
  return publisherCalendarPlacements.filter((placement) => {
    const channelMatches = publisherCalendarState.channels.includes(placement.channel);
    const modeMatches = publisherCalendarState.mode === "all" || placement.kind === "scheduled";
    return channelMatches && modeMatches;
  });
}

function renderPublisherCalendarPlacement(placement) {
  const potential = placement.kind === "potential";
  return `
    <article class="publisher-calendar-placement ${potential ? "potential" : "scheduled"}">
      <span class="publisher-calendar-placement-time">${placement.time}</span>
      <strong>${placement.channel}</strong>
      <span>${placement.format}</span>
      <small>${potential ? "Потенциальное" : "Запланировано"}</small>
    </article>
  `;
}

function publisherCalendarChannelSummary() {
  if (publisherCalendarState.channels.length === 3) return "Все каналы";
  if (!publisherCalendarState.channels.length) return "Каналы не выбраны";
  if (publisherCalendarState.channels.length === 1) return publisherCalendarState.channels[0];
  return `Каналов: ${publisherCalendarState.channels.length}`;
}

function renderPublisherCalendarGrid() {
  const placements = filteredPublisherCalendarPlacements();

  return `
    <div class="publisher-calendar-scroll">
      <div class="publisher-calendar-grid">
        <div class="publisher-calendar-corner">Время</div>
        ${publisherCalendarDays.map((day) => `
          <div class="publisher-calendar-day-header">
            <span>${day.weekday}</span>
            <strong>${day.label}</strong>
          </div>
        `).join("")}

        ${publisherCalendarSlots.map((slot) => `
          <div class="publisher-calendar-time">${slot}</div>
          ${publisherCalendarDays.map((day) => {
            const slotPlacements = placements.filter((placement) => placement.date === day.date && placement.time === slot);
            return `
              <div class="publisher-calendar-slot" data-date="${day.date}" data-time="${slot}">
                ${slotPlacements.map(renderPublisherCalendarPlacement).join("")}
              </div>
            `;
          }).join("")}
        `).join("")}
      </div>
    </div>
  `;
}

function renderPublisherCalendar() {
  screen.innerHTML = `
    <div class="page-header publisher-calendar-header">
      <h1>Календарь</h1>
      <p>Запланированные и потенциальные размещения по слотам.</p>
    </div>

    <div class="publisher-calendar-toolbar">
      <details class="publisher-channel-filter">
        <summary>${publisherCalendarChannelSummary()}</summary>
        <div class="publisher-channel-filter-menu">
          ${["Канал 1", "Канал 2", "Канал 3"].map((channel) => `
            <label class="publisher-channel-option">
              <input type="checkbox" value="${channel}" ${publisherCalendarState.channels.includes(channel) ? "checked" : ""}>
              <span>${channel}</span>
            </label>
          `).join("")}
        </div>
      </details>

      <div class="publisher-calendar-mode" aria-label="Фильтр размещений">
        <button class="publisher-filter-button ${publisherCalendarState.mode === "scheduled" ? "active" : ""}" type="button" data-calendar-mode="scheduled">Запланированные</button>
        <button class="publisher-filter-button ${publisherCalendarState.mode === "all" ? "active" : ""}" type="button" data-calendar-mode="all">Все размещения</button>
      </div>
    </div>

    <div class="publisher-calendar-range-row">
      <div>
        <strong>2–8 ноября 2026</strong>
        <span>Недельный вид</span>
      </div>
      <div class="publisher-calendar-legend">
        <span><i class="publisher-calendar-legend-dot scheduled"></i>Запланировано</span>
        <span><i class="publisher-calendar-legend-dot potential"></i>Потенциальное</span>
      </div>
    </div>

    <div id="publisher-calendar-grid-root">
      ${renderPublisherCalendarGrid()}
    </div>
  `;

  document.querySelectorAll(".publisher-channel-option input").forEach((input) => {
    input.addEventListener("change", () => {
      publisherCalendarState.channels = Array.from(document.querySelectorAll(".publisher-channel-option input:checked"))
        .map((item) => item.value);
      renderPublisherCalendar();
    });
  });

  document.querySelectorAll("[data-calendar-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      publisherCalendarState.mode = button.dataset.calendarMode;
      renderPublisherCalendar();
    });
  });
}

function renderPublisherScreen(key) {
  const section = publisherSections.find((item) => item.key === key) || publisherSections[0];
  renderPublisherSidebar(section.key);

  if (section.key === "requests") {
    renderPublisherRequests();
    return;
  }

  if (section.key === "calendar") {
    renderPublisherCalendar();
    return;
  }

  screen.innerHTML = `
    <div class="page-header">
      <h1>${section.title}</h1>
      <p>Кабинет паблишера</p>
    </div>

    <div class="panel placeholder publisher-placeholder">
      <strong>${section.title}</strong>
      <p>Содержимое этого раздела кабинета паблишера пока не спроектировано.</p>
    </div>
  `;
}

function enterPublisherWorkspace() {
  publisherMode = true;
  document.body.dataset.workspace = "publisher";
  workspaceSwitch.textContent = "Кабинет рекламодателя";
  renderPublisherScreen("requests");
}

workspaceSwitch.addEventListener("click", () => {
  if (publisherMode) {
    window.location.reload();
    return;
  }

  enterPublisherWorkspace();
});
