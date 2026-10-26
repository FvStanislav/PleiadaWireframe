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
    publicationTime: "15:00",
    status: "Новая",
    creative: { name: "native_video_01.mp4", type: "Видео", details: "Вертикальное видео · 15 сек." }
  },
  {
    id: "request-2",
    channel: "Канал 2",
    format: "Упоминание товара",
    amount: 32500,
    publicationDate: "2026-11-12",
    publicationTime: "18:00",
    status: "Ждет ответа",
    creative: { name: "product_visual_01.jpg", type: "Изображение", details: "1080 × 1080 · JPG" }
  },
  {
    id: "request-3",
    channel: "Канал 3",
    format: "Спонсор ролика",
    amount: 65000,
    publicationDate: "2026-11-20",
    publicationTime: "15:00",
    status: "Согласовано",
    creative: { name: "sponsor_video_01.mp4", type: "Видео", details: "Горизонтальное видео · 30 сек." }
  }
];

const publisherRequestState = {
  status: "Все",
  search: "",
  sort: "date"
};

let publisherCalendarWeek = "2026-11-02";
let publisherCalendarFocus = null;
let publisherRequestNotice = "";

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
    kind: "potential",
    requestId: "request-1"
  },
  {
    id: "calendar-potential-2",
    channel: "Канал 3",
    format: "Обзор продукта",
    date: "2026-11-07",
    time: "12:00",
    kind: "potential"
  },
  {
    id: "calendar-potential-request-2",
    channel: "Канал 2",
    format: "Упоминание товара",
    date: "2026-11-12",
    time: "18:00",
    kind: "potential",
    requestId: "request-2"
  },
  {
    id: "calendar-request-3",
    channel: "Канал 3",
    format: "Спонсор ролика",
    date: "2026-11-20",
    time: "15:00",
    kind: "scheduled",
    requestId: "request-3"
  },
  {
    id: "calendar-6",
    channel: "Канал 2",
    format: "Нативный текст",
    date: "2026-11-12",
    time: "12:00",
    kind: "scheduled"
  },
  {
    id: "calendar-7",
    channel: "Канал 3",
    format: "Упоминание товара",
    date: "2026-11-20",
    time: "18:00",
    kind: "scheduled"
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

function publisherEscape(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function publisherDate(value) {
  return new Date(`${value}T12:00:00`);
}

function publisherISODate(date) {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
}

function publisherWeekStart(value) {
  const date = publisherDate(value);
  date.setDate(date.getDate() - (date.getDay() + 6) % 7);
  return publisherISODate(date);
}

function publisherCalendarDays() {
  const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  return weekdays.map((weekday, index) => {
    const date = publisherDate(publisherCalendarWeek);
    date.setDate(date.getDate() + index);
    return { date: publisherISODate(date), weekday, label: new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short" }).format(date) };
  });
}

function publisherCalendarRange() {
  const days = publisherCalendarDays();
  const first = publisherDate(days[0].date);
  const last = publisherDate(days[6].date);
  const month = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }).format(last).replace(/^\d+\s+/, "");
  if (first.getMonth() === last.getMonth()) return `${first.getDate()}–${last.getDate()} ${month} ${last.getFullYear()}`;
  return `${days[0].label} – ${days[6].label} ${last.getFullYear()}`;
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
    <article class="publisher-request-card" data-open-request="${request.id}">
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
      <div class="publisher-request-footer">
        <button class="publisher-open-link" type="button" aria-label="Открыть заявку: ${request.channel}, ${request.format}">${request.actionNote || "Открыть заявку →"}</button>
        <div class="publisher-request-actions">
          <button class="publisher-action-button accept" type="button" data-request-action="accept" data-request-id="${request.id}">Принять</button>
          <button class="publisher-action-button decline" type="button" data-request-action="decline" data-request-id="${request.id}">Отказаться</button>
          <button class="publisher-action-button" type="button" data-request-action="contact" data-request-id="${request.id}">Связаться</button>
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

  list.querySelectorAll("[data-open-request]").forEach((card) => {
    card.addEventListener("click", () => renderPublisherRequestDetail(card.dataset.openRequest));
  });
  list.querySelectorAll("[data-request-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      publisherRequestAction(button.dataset.requestId, button.dataset.requestAction);
    });
  });
}

function publisherRequestAction(requestId, action) {
  const request = publisherRequests.find((item) => item.id === requestId);
  if (!request) return;
  if (action === "accept") {
    request.status = "Согласовано";
    request.actionNote = "Заявка принята";
    publisherRequestNotice = `Заявка для «${request.channel}» принята.`;
    renderPublisherRequests();
  } else if (action === "decline") {
    renderPublisherRequestDetail(requestId, "decline");
  } else {
    renderPublisherRequestDetail(requestId, "reply");
  }
}

function renderPublisherRequestDetail(requestId, panel = "") {
  const request = publisherRequests.find((item) => item.id === requestId);
  if (!request) return;
  renderPublisherSidebar("requests");
  screen.innerHTML = `
    <button class="back-button" type="button" id="publisher-request-back">← К заявкам</button>
    <div class="publisher-detail-heading">
      <div class="page-header">
        <h1>Заявка на размещение</h1>
        <p>${request.channel} · ${request.format}</p>
      </div>
      <span class="publisher-request-status ${publisherRequestStatusClass(request.status)}">${request.status}</span>
    </div>
    <div class="publisher-detail-grid">
      <div class="publisher-detail-main">
        <section class="panel publisher-detail-section">
          <h2>Основная информация</h2>
          <div class="publisher-detail-facts">
            <div><span>Канал</span><strong>${request.channel}</strong></div>
            <div><span>Формат</span><strong>${request.format}</strong></div>
            <div><span>Стоимость</span><strong>${formatNumber(request.amount)} ₽</strong></div>
            <div><span>Дата публикации</span><strong>${publisherRequestDate(request.publicationDate)}</strong></div>
            <div><span>Время</span><strong>${request.publicationTime}</strong></div>
          </div>
        </section>
        <section class="panel publisher-detail-section">
          <h2>Креатив</h2>
          <div class="publisher-creative-card">
            <div class="publisher-creative-preview" aria-label="Предпросмотр креатива">
              <span>${request.creative.type === "Видео" ? "▶" : "▧"}</span>
              <small>Предпросмотр</small>
            </div>
            <div class="publisher-creative-info">
              <strong>${request.creative.name}</strong>
              <span>${request.creative.type}</span>
              <span>${request.creative.details}</span>
            </div>
          </div>
        </section>
        <section class="panel publisher-detail-section" id="publisher-detail-panel">
          ${publisherRequestPanel(request, panel)}
        </section>
      </div>
      <aside class="panel publisher-detail-aside">
        <h2>Действия</h2>
        <button class="primary-button" type="button" data-detail-action="accept">Принять</button>
        <button class="secondary-button" type="button" data-detail-action="reply">Ответить</button>
        <button class="secondary-button" type="button" data-detail-action="schedule">Запланировать</button>
        <button class="secondary-button" type="button" data-detail-action="calendar">Сверить с календарем</button>
        <button class="secondary-button" type="button" data-detail-action="decline">Отказаться</button>
      </aside>
    </div>
  `;
  document.querySelector("#publisher-request-back").addEventListener("click", () => renderPublisherScreen("requests"));
  screen.querySelectorAll("[data-detail-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.detailAction;
      if (action === "accept") {
        request.status = "Согласовано";
        request.actionNote = "Заявка принята";
        renderPublisherRequestDetail(requestId, "accepted");
      } else if (action === "calendar") {
        publisherCalendarWeek = publisherWeekStart(request.publicationDate);
        publisherCalendarState.channels = [request.channel];
        publisherCalendarState.mode = "all";
        publisherCalendarFocus = requestId;
        renderPublisherScreen("calendar");
      } else {
        renderPublisherRequestDetail(requestId, action);
      }
    });
  });
  const reply = screen.querySelector("#publisher-reply-form");
  if (reply) reply.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = reply.querySelector("textarea").value.trim();
    if (!message) return;
    request.reply = message;
    request.actionNote = "Ответ отправлен";
    renderPublisherRequestDetail(requestId, "replied");
  });
  const schedule = screen.querySelector("#publisher-schedule-form");
  if (schedule) schedule.addEventListener("submit", (event) => {
    event.preventDefault();
    const date = schedule.querySelector("[name=date]").value;
    const time = schedule.querySelector("[name=time]").value;
    if (!date || !time) return;
    const placement = publisherCalendarPlacements.find((item) => item.requestId === requestId);
    if (placement) Object.assign(placement, { date, time, kind: "scheduled" });
    else publisherCalendarPlacements.push({
      id: `calendar-${requestId}`, requestId, channel: request.channel,
      format: request.format, date, time, kind: "scheduled"
    });
    request.publicationDate = date;
    request.publicationTime = time;
    request.actionNote = "Добавлено в календарь";
    renderPublisherRequestDetail(requestId, "scheduled");
  });
  const decline = screen.querySelector("#publisher-decline-confirm");
  if (decline) decline.addEventListener("click", () => {
    request.actionNote = "Отказ отправлен";
    renderPublisherRequestDetail(requestId, "declined");
  });
}

function publisherRequestPanel(request, panel) {
  if (panel === "reply") return `
    <h2>Ответить по заявке</h2>
    <p class="publisher-panel-hint">Сообщение рекламодателю</p>
    <form id="publisher-reply-form">
      <textarea aria-label="Сообщение рекламодателю" placeholder="Напишите ответ…" required></textarea>
      <button class="primary-button" type="submit">Отправить ответ</button>
    </form>`;
  if (panel === "schedule") return `
    <h2>Запланировать размещение</h2>
    <p class="publisher-panel-hint">Выберите дату и временной слот. Занятость можно посмотреть в календаре.</p>
    <form id="publisher-schedule-form" class="publisher-schedule-form">
      <label>Дата <input name="date" type="date" value="${request.publicationDate}" required></label>
      <label>Время <select name="time">${publisherCalendarSlots.map((time) => `<option value="${time}" ${time === request.publicationTime ? "selected" : ""}>${time}</option>`).join("")}</select></label>
      <button class="primary-button" type="submit">Сохранить в календаре</button>
    </form>`;
  if (panel === "decline") return `
    <h2>Отказаться от заявки</h2>
    <p class="publisher-panel-hint">Подтвердите отказ от размещения для «${request.channel}».</p>
    <button class="publisher-action-button decline" type="button" id="publisher-decline-confirm">Подтвердить отказ</button>`;
  const messages = {
    accepted: "Заявка принята.",
    replied: "Ответ отправлен.",
    scheduled: "Размещение добавлено в календарь.",
    declined: "Отказ отправлен."
  };
  return `
    <h2>Работа с заявкой</h2>
    <p class="publisher-panel-hint">${messages[panel] || request.actionNote || "Ответьте рекламодателю, запланируйте размещение или сверьте дату и время с календарем."}</p>
    ${request.reply ? `<div class="publisher-sent-reply"><span>Ваш ответ</span><p>${publisherEscape(request.reply)}</p></div>` : ""}`;
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
    ${publisherRequestNotice ? `<div class="publisher-inline-notice" role="status">${publisherRequestNotice}</div>` : ""}
  `;
  publisherRequestNotice = "";

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
    <article class="publisher-calendar-placement ${potential ? "potential" : "scheduled"} ${placement.requestId === publisherCalendarFocus ? "focused" : ""}">
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
  const days = publisherCalendarDays();

  return `
    <div class="publisher-calendar-scroll">
      <div class="publisher-calendar-grid">
        <div class="publisher-calendar-corner">Время</div>
        ${days.map((day) => `
          <div class="publisher-calendar-day-header">
            <span>${day.weekday}</span>
            <strong>${day.label}</strong>
          </div>
        `).join("")}

        ${publisherCalendarSlots.map((slot) => `
          <div class="publisher-calendar-time">${slot}</div>
          ${days.map((day) => {
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
  const focusedRequest = publisherRequests.find((item) => item.id === publisherCalendarFocus);
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
        <strong>${publisherCalendarRange()}</strong>
        <span>Недельный вид</span>
      </div>
      <div class="publisher-calendar-week-nav">
        <button class="secondary-button" type="button" data-week-shift="-7" aria-label="Предыдущая неделя">←</button>
        <button class="secondary-button" type="button" data-week-shift="7" aria-label="Следующая неделя">→</button>
      </div>
      <div class="publisher-calendar-legend">
        <span><i class="publisher-calendar-legend-dot scheduled"></i>Запланировано</span>
        <span><i class="publisher-calendar-legend-dot potential"></i>Потенциальное</span>
      </div>
    </div>

    ${focusedRequest ? `<div class="publisher-calendar-focus">
      <span>Сверка заявки: ${focusedRequest.channel} · ${publisherRequestDate(focusedRequest.publicationDate)} · ${focusedRequest.publicationTime}</span>
      <button class="secondary-button" type="button" id="publisher-focus-back">К заявке</button>
    </div>` : ""}

    <div id="publisher-calendar-grid-root">
      ${renderPublisherCalendarGrid()}
    </div>
  `;

  const focusBack = document.querySelector("#publisher-focus-back");
  if (focusBack) focusBack.addEventListener("click", () => renderPublisherRequestDetail(publisherCalendarFocus));
  document.querySelectorAll("[data-week-shift]").forEach((button) => {
    button.addEventListener("click", () => {
      const date = publisherDate(publisherCalendarWeek);
      date.setDate(date.getDate() + Number(button.dataset.weekShift));
      publisherCalendarWeek = publisherISODate(date);
      publisherCalendarFocus = null;
      renderPublisherCalendar();
    });
  });

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
