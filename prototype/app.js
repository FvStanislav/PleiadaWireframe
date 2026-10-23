const screens = {
  campaigns: {
    title: "Рекламные кампании",
    text: "Основной список рекламных кампаний."
  },
  reports: {
    title: "Отчеты",
    text: "Раздел для формирования кастомных отчетов."
  },
  profile: {
    title: "Профиль и организации",
    text: "Управление личными данными и данными юридических лиц."
  },
  billing: {
    title: "Платежи и документы",
    text: "Управление юридическими документами и расчетами."
  },
  help: {
    title: "Помощь",
    text: "Документация и возможность написать в поддержку."
  }
};

const screen = document.querySelector("#screen");
const navItems = document.querySelectorAll(".nav-item");

const campaignDraft = {
  name: "",
  contentType: "",
  platform: "",
  placements: [],
  budget: "",
  dateFrom: "",
  dateTo: ""
};

document.querySelector("#account-name").textContent = mockData.client.nickname;
document.querySelector("#account-balance").textContent = mockData.client.balance;

function setActiveNav(name) {
  const activeSection = name.startsWith("campaign-create") ? "campaigns" : name;

  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.screen === activeSection);
  });
}

function renderCampaigns() {
  screen.innerHTML = `
    <div class="page-header-row">
      <div class="page-header">
        <h1>Рекламные кампании</h1>
        <p>Основной список рекламных кампаний.</p>
      </div>
      <button class="primary-button" id="create-campaign">Создать</button>
    </div>

    <div class="panel placeholder">
      <strong>Список РК пока не спроектирован</strong>
      <p>На этом этапе зафиксирован переход к созданию новой рекламной кампании.</p>
    </div>
  `;

  document.querySelector("#create-campaign").addEventListener("click", () => render("campaign-create-step1"));
}

function contentOptions() {
  return Object.entries(mockData.campaignCreation.contentTypes)
    .map(([key, item]) => `<option value="${key}" ${campaignDraft.contentType === key ? "selected" : ""}>${item.label}</option>`)
    .join("");
}

function platformOptions() {
  if (!campaignDraft.contentType) return "";

  return mockData.campaignCreation.contentTypes[campaignDraft.contentType].platforms
    .map((platform) => `<option value="${platform}" ${campaignDraft.platform === platform ? "selected" : ""}>${platform}</option>`)
    .join("");
}

function placementOptions() {
  if (!campaignDraft.contentType) {
    return `<div class="multi-select-empty">Сначала выберите формат контента</div>`;
  }

  return mockData.campaignCreation.contentTypes[campaignDraft.contentType].placements
    .map((placement) => `
      <label class="checkbox-row">
        <input type="checkbox" value="${placement}" ${campaignDraft.placements.includes(placement) ? "checked" : ""}>
        <span>${placement}</span>
      </label>
    `)
    .join("");
}

function placementSummary() {
  if (!campaignDraft.contentType) return "Сначала выберите формат контента";
  if (!campaignDraft.placements.length) return "Выберите форматы размещения";
  if (campaignDraft.placements.length === 1) return campaignDraft.placements[0];
  return `Выбрано: ${campaignDraft.placements.length}`;
}

function saveStep1Fields() {
  const name = document.querySelector("#campaign-name");
  const platform = document.querySelector("#campaign-platform");
  const budget = document.querySelector("#campaign-budget");
  const dateFrom = document.querySelector("#campaign-date-from");
  const dateTo = document.querySelector("#campaign-date-to");

  if (name) campaignDraft.name = name.value;
  if (platform) campaignDraft.platform = platform.value;
  if (budget) campaignDraft.budget = budget.value;
  if (dateFrom) campaignDraft.dateFrom = dateFrom.value;
  if (dateTo) campaignDraft.dateTo = dateTo.value;
}

function renderCampaignCreateStep1() {
  const platformDisabled = campaignDraft.contentType ? "" : "disabled";

  screen.innerHTML = `
    <div class="wizard-header">
      <div>
        <button class="back-button" id="exit-campaign-create">← Рекламные кампании</button>
        <h1>Создание рекламной кампании</h1>
      </div>
      <div class="wizard-step">Шаг 1</div>
    </div>

    <div class="wizard-progress">
      <div class="wizard-progress-item active">
        <span>1</span>
        <strong>Параметры РК</strong>
      </div>
      <div class="wizard-progress-line"></div>
      <div class="wizard-progress-item future">
        <span>2</span>
        <strong>Следующий шаг</strong>
      </div>
    </div>

    <div class="panel form-panel">
      <div class="field">
        <label for="campaign-name">Название</label>
        <input id="campaign-name" type="text" value="${campaignDraft.name}" placeholder="Например, Осенняя кампания">
      </div>

      <div class="field">
        <label for="campaign-content-type">Формат контента</label>
        <select id="campaign-content-type">
          <option value="">Выберите формат контента</option>
          ${contentOptions()}
        </select>
      </div>

      <div class="field">
        <label for="campaign-platform">Платформа</label>
        <select id="campaign-platform" ${platformDisabled}>
          <option value="">${campaignDraft.contentType ? "Выберите платформу" : "Сначала выберите формат контента"}</option>
          ${platformOptions()}
        </select>
      </div>

      <div class="field">
        <label>Форматы размещения</label>
        <details class="multi-select" ${campaignDraft.contentType ? "" : "data-disabled"}>
          <summary>${placementSummary()}</summary>
          <div class="multi-select-menu" id="placement-options">
            ${placementOptions()}
          </div>
        </details>
        <div class="field-hint">Можно выбрать несколько вариантов.</div>
      </div>

      <div class="field">
        <label for="campaign-budget">Бюджет</label>
        <div class="money-input">
          <input id="campaign-budget" type="text" inputmode="decimal" value="${campaignDraft.budget}" placeholder="0">
          <span>₽</span>
        </div>
      </div>

      <div class="field">
        <label>Даты проведения</label>
        <div class="date-range">
          <div>
            <span class="sub-label">С</span>
            <input id="campaign-date-from" type="date" value="${campaignDraft.dateFrom}">
          </div>
          <div>
            <span class="sub-label">По</span>
            <input id="campaign-date-to" type="date" value="${campaignDraft.dateTo}">
          </div>
        </div>
      </div>
    </div>

    <div class="wizard-actions">
      <button class="secondary-button" id="campaign-back">Назад</button>
      <button class="primary-button" id="campaign-next">Далее</button>
    </div>
  `;

  document.querySelector("#exit-campaign-create").addEventListener("click", () => render("campaigns"));
  document.querySelector("#campaign-back").addEventListener("click", () => render("campaigns"));

  document.querySelector("#campaign-content-type").addEventListener("change", (event) => {
    saveStep1Fields();
    campaignDraft.contentType = event.target.value;
    campaignDraft.platform = "";
    campaignDraft.placements = [];
    render("campaign-create-step1");
  });

  document.querySelector("#campaign-platform").addEventListener("change", (event) => {
    campaignDraft.platform = event.target.value;
  });

  document.querySelectorAll("#placement-options input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      campaignDraft.placements = Array.from(
        document.querySelectorAll("#placement-options input[type='checkbox']:checked")
      ).map((item) => item.value);

      document.querySelector(".multi-select summary").textContent = placementSummary();
    });
  });

  const multiSelect = document.querySelector(".multi-select[data-disabled]");
  if (multiSelect) {
    multiSelect.addEventListener("click", (event) => event.preventDefault());
  }

  document.querySelector("#campaign-next").addEventListener("click", () => {
    saveStep1Fields();
    render("campaign-create-step2");
  });
}

function renderCampaignCreateStep2() {
  screen.innerHTML = `
    <div class="wizard-header">
      <div>
        <button class="back-button" id="exit-campaign-create">← Рекламные кампании</button>
        <h1>Создание рекламной кампании</h1>
      </div>
      <div class="wizard-step">Шаг 2</div>
    </div>

    <div class="wizard-progress">
      <div class="wizard-progress-item complete">
        <span>1</span>
        <strong>Параметры РК</strong>
      </div>
      <div class="wizard-progress-line complete"></div>
      <div class="wizard-progress-item active">
        <span>2</span>
        <strong>Следующий шаг</strong>
      </div>
    </div>

    <div class="panel placeholder">
      <strong>Следующий шаг пока не определен</strong>
      <p>Первый шаг сохранен в состоянии прототипа. Содержимое этого шага будет добавлено после уточнения.</p>
    </div>

    <div class="wizard-actions">
      <button class="secondary-button" id="campaign-back-step1">Назад</button>
    </div>
  `;

  document.querySelector("#exit-campaign-create").addEventListener("click", () => render("campaigns"));
  document.querySelector("#campaign-back-step1").addEventListener("click", () => render("campaign-create-step1"));
}

function renderPlaceholder(current) {
  screen.innerHTML = `
    <div class="page-header">
      <h1>${current.title}</h1>
      <p>${current.text}</p>
    </div>

    <div class="panel placeholder">
      <strong>Страница пока не спроектирована</strong>
      <p>На этом этапе зафиксированы только структура верхнего меню и назначение раздела.</p>
    </div>
  `;
}

function render(name) {
  if (name === "campaigns") {
    renderCampaigns();
  } else if (name === "campaign-create-step1") {
    renderCampaignCreateStep1();
  } else if (name === "campaign-create-step2") {
    renderCampaignCreateStep2();
  } else {
    renderPlaceholder(screens[name] || screens.campaigns);
  }

  setActiveNav(name);
}

navItems.forEach((item) => {
  item.addEventListener("click", () => render(item.dataset.screen));
});

render("campaigns");
