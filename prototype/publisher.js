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

function renderPublisherScreen(key) {
  const section = publisherSections.find((item) => item.key === key) || publisherSections[0];
  renderPublisherSidebar(section.key);

  if (section.key === "requests") {
    renderPublisherRequests();
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
