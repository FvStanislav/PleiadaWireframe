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
  additionalOptions: [],
  budget: "",
  dateFrom: "",
  dateTo: "",
  media: {
    topics: [],
    subscribersFrom: "",
    subscribersTo: "",
    viewsFrom: "",
    viewsTo: "",
    reachFrom: "",
    reachTo: "",
    erFrom: "",
    erTo: "",
    errFrom: "",
    errTo: "",
    geography: [],
    gender: [],
    ageFrom: "",
    ageTo: ""
  }
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

function checkboxOptions(items, selected) {
  return items
    .map((item) => `
      <label class="checkbox-row">
        <input type="checkbox" value="${item}" ${selected.includes(item) ? "checked" : ""}>
        <span>${item}</span>
      </label>
    `)
    .join("");
}

function contentDependentOptions(items, selected, emptyText) {
  if (!campaignDraft.contentType) {
    return `<div class="multi-select-empty">${emptyText}</div>`;
  }

  return checkboxOptions(items, selected);
}

function multiSelectSummary(selected, emptyText, disabledText = null) {
  if (disabledText && !campaignDraft.contentType) return disabledText;
  if (!selected.length) return emptyText;
  if (selected.length === 1) return selected[0];
  return `Выбрано: ${selected.length}`;
}

function placementOptions() {
  const items = campaignDraft.contentType
    ? mockData.campaignCreation.contentTypes[campaignDraft.contentType].placements
    : [];

  return contentDependentOptions(items, campaignDraft.placements, "Сначала выберите формат контента");
}

function additionalOptions() {
  const items = campaignDraft.contentType
    ? mockData.campaignCreation.contentTypes[campaignDraft.contentType].additionalOptions
    : [];

  return contentDependentOptions(items, campaignDraft.additionalOptions, "Сначала выберите формат контента");
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

function syncRootMultiSelect(selector, targetArray, summarySelector, emptyText) {
  const selected = Array.from(
    document.querySelectorAll(`${selector} input[type='checkbox']:checked`)
  ).map((item) => item.value);

  if (targetArray === "placements" || targetArray === "additionalOptions") {
    campaignDraft[targetArray] = selected;
    document.querySelector(summarySelector).textContent = multiSelectSummary(selected, emptyText);
  } else {
    campaignDraft.media[targetArray] = selected;
    document.querySelector(summarySelector).textContent = multiSelectSummary(selected, emptyText);
  }
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
        <strong>Подбор медиа</strong>
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
          <summary id="placement-summary">${multiSelectSummary(campaignDraft.placements, "Выберите форматы размещения", "Сначала выберите формат контента")}</summary>
          <div class="multi-select-menu" id="placement-options">
            ${placementOptions()}
          </div>
        </details>
        <div class="field-hint">Можно выбрать несколько вариантов.</div>
      </div>

      <div class="field">
        <label>Дополнительные опции</label>
        <details class="multi-select" ${campaignDraft.contentType ? "" : "data-disabled"}>
          <summary id="additional-options-summary">${multiSelectSummary(campaignDraft.additionalOptions, "Выберите дополнительные опции", "Сначала выберите формат контента")}</summary>
          <div class="multi-select-menu" id="additional-options">
            ${additionalOptions()}
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
    campaignDraft.additionalOptions = [];
    render("campaign-create-step1");
  });

  document.querySelector("#campaign-platform").addEventListener("change", (event) => {
    campaignDraft.platform = event.target.value;
  });

  document.querySelectorAll("#placement-options input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      syncRootMultiSelect("#placement-options", "placements", "#placement-summary", "Выберите форматы размещения");
    });
  });

  document.querySelectorAll("#additional-options input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      syncRootMultiSelect("#additional-options", "additionalOptions", "#additional-options-summary", "Выберите дополнительные опции");
    });
  });

  document.querySelectorAll(".multi-select[data-disabled]").forEach((multiSelect) => {
    multiSelect.addEventListener("click", (event) => event.preventDefault());
  });

  document.querySelector("#campaign-next").addEventListener("click", () => {
    saveStep1Fields();
    render("campaign-create-step2");
  });
}

function rangeField(label, key, min, max, step = 1, suffix = "") {
  const from = campaignDraft.media[`${key}From`];
  const to = campaignDraft.media[`${key}To`];

  return `
    <div class="field">
      <label>${label}</label>
      <div class="date-range">
        <div>
          <span class="sub-label">От${suffix}</span>
          <input id="${key}-from" type="number" min="${min}" max="${max}" step="${step}" value="${from}" placeholder="${min}">
        </div>
        <div>
          <span class="sub-label">До${suffix}</span>
          <input id="${key}-to" type="number" min="${min}" max="${max}" step="${step}" value="${to}" placeholder="${max}">
        </div>
      </div>
    </div>
  `;
}

function geographySummary() {
  const selected = campaignDraft.media.geography;
  if (!selected.length) return "Выберите географию";
  if (selected.length === 1) return selected[0].split("/")[1];
  return `Выбрано: ${selected.length}`;
}

function geographyOptions() {
  return Object.entries(mockData.campaignCreation.mediaSelection.geography)
    .map(([country, cities]) => {
      const selectedCount = cities.filter((city) => campaignDraft.media.geography.includes(`${country}/${city}`)).length;
      const checked = selectedCount === cities.length ? "checked" : "";

      return `
        <details class="geo-group">
          <summary>
            <label class="checkbox-row geo-country-row" onclick="event.stopPropagation()">
              <input type="checkbox" class="geo-country" data-country="${country}" ${checked}>
              <span>${country}</span>
            </label>
          </summary>
          <div class="geo-children">
            ${cities.map((city) => `
              <label class="checkbox-row">
                <input type="checkbox" class="geo-city" data-country="${country}" value="${country}/${city}" ${campaignDraft.media.geography.includes(`${country}/${city}`) ? "checked" : ""}>
                <span>${city}</span>
              </label>
            `).join("")}
          </div>
        </details>
      `;
    })
    .join("");
}

function syncGeographyState() {
  campaignDraft.media.geography = Array.from(document.querySelectorAll(".geo-city:checked"))
    .map((input) => input.value);

  document.querySelector("#geography-summary").textContent = geographySummary();

  document.querySelectorAll(".geo-country").forEach((countryInput) => {
    const country = countryInput.dataset.country;
    const children = Array.from(document.querySelectorAll(`.geo-city[data-country="${country}"]`));
    const checkedCount = children.filter((input) => input.checked).length;
    countryInput.checked = checkedCount === children.length;
    countryInput.indeterminate = checkedCount > 0 && checkedCount < children.length;
  });
}

function saveStep2Fields() {
  ["subscribers", "views", "reach", "er", "err", "age"].forEach((key) => {
    const from = document.querySelector(`#${key}-from`);
    const to = document.querySelector(`#${key}-to`);
    if (from) campaignDraft.media[`${key}From`] = from.value;
    if (to) campaignDraft.media[`${key}To`] = to.value;
  });
}

function renderCampaignCreateStep2() {
  const mediaData = mockData.campaignCreation.mediaSelection;

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
        <strong>Подбор медиа</strong>
      </div>
      <div class="wizard-progress-line"></div>
      <div class="wizard-progress-item future">
        <span>3</span>
        <strong>Следующий шаг</strong>
      </div>
    </div>

    <div class="panel form-panel">
      <div class="field">
        <label>Тематика</label>
        <details class="multi-select">
          <summary id="topics-summary">${multiSelectSummary(campaignDraft.media.topics, "Выберите тематики")}</summary>
          <div class="multi-select-menu" id="topics-options">
            ${checkboxOptions(mediaData.topics, campaignDraft.media.topics)}
          </div>
        </details>
        <div class="field-hint">Можно выбрать несколько вариантов.</div>
      </div>

      ${rangeField("Подписчиков", "subscribers", 0, 10000000)}
      ${rangeField("Просмотров на ролик", "views", 0, 100000000)}
      ${rangeField("Охват", "reach", 0, 10000000)}
      ${rangeField("ER", "er", 0, 100, 0.01, ", %")}
      ${rangeField("ERR", "err", 0, 100, 0.01, ", %")}

      <div class="field">
        <label>География</label>
        <details class="multi-select geography-select">
          <summary id="geography-summary">${geographySummary()}</summary>
          <div class="multi-select-menu geography-menu" id="geography-options">
            ${geographyOptions()}
          </div>
        </details>
        <div class="field-hint">Выбор страны выбирает или снимает все вложенные города.</div>
      </div>

      <div class="field">
        <label>Пол</label>
        <details class="multi-select">
          <summary id="gender-summary">${multiSelectSummary(campaignDraft.media.gender, "Выберите пол")}</summary>
          <div class="multi-select-menu" id="gender-options">
            ${checkboxOptions(mediaData.gender, campaignDraft.media.gender)}
          </div>
        </details>
        <div class="field-hint">Можно выбрать несколько вариантов.</div>
      </div>

      ${rangeField("Возраст", "age", 10, 120)}
    </div>

    <div class="wizard-actions">
      <button class="secondary-button" id="campaign-back-step1">Назад</button>
      <button class="primary-button" id="campaign-next-step3">Далее</button>
    </div>
  `;

  document.querySelector("#exit-campaign-create").addEventListener("click", () => render("campaigns"));

  document.querySelectorAll("#topics-options input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      syncRootMultiSelect("#topics-options", "topics", "#topics-summary", "Выберите тематики");
    });
  });

  document.querySelectorAll("#gender-options input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      syncRootMultiSelect("#gender-options", "gender", "#gender-summary", "Выберите пол");
    });
  });

  document.querySelectorAll(".geo-country").forEach((countryInput) => {
    const country = countryInput.dataset.country;
    const children = Array.from(document.querySelectorAll(`.geo-city[data-country="${country}"]`));
    const checkedCount = children.filter((input) => input.checked).length;
    countryInput.indeterminate = checkedCount > 0 && checkedCount < children.length;

    countryInput.addEventListener("change", () => {
      children.forEach((child) => {
        child.checked = countryInput.checked;
      });
      syncGeographyState();
    });
  });

  document.querySelectorAll(".geo-city").forEach((cityInput) => {
    cityInput.addEventListener("change", syncGeographyState);
  });

  document.querySelector("#campaign-back-step1").addEventListener("click", () => {
    saveStep2Fields();
    render("campaign-create-step1");
  });

  document.querySelector("#campaign-next-step3").addEventListener("click", () => {
    saveStep2Fields();
    render("campaign-create-step3");
  });
}

function renderCampaignCreateStep3() {
  screen.innerHTML = `
    <div class="wizard-header">
      <div>
        <button class="back-button" id="exit-campaign-create">← Рекламные кампании</button>
        <h1>Создание рекламной кампании</h1>
      </div>
      <div class="wizard-step">Следующий шаг</div>
    </div>

    <div class="wizard-progress">
      <div class="wizard-progress-item complete">
        <span>1</span>
        <strong>Параметры РК</strong>
      </div>
      <div class="wizard-progress-line complete"></div>
      <div class="wizard-progress-item complete">
        <span>2</span>
        <strong>Подбор медиа</strong>
      </div>
    </div>

    <div class="panel placeholder">
      <strong>Следующий шаг пока не определен</strong>
      <p>Параметры первых двух шагов сохранены в состоянии прототипа. Содержимое следующего шага будет добавлено после уточнения.</p>
    </div>

    <div class="wizard-actions">
      <button class="secondary-button" id="campaign-back-step2">Назад</button>
    </div>
  `;

  document.querySelector("#exit-campaign-create").addEventListener("click", () => render("campaigns"));
  document.querySelector("#campaign-back-step2").addEventListener("click", () => render("campaign-create-step2"));
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
  } else if (name === "campaign-create-step3") {
    renderCampaignCreateStep3();
  } else {
    renderPlaceholder(screens[name] || screens.campaigns);
  }

  setActiveNav(name);
}

navItems.forEach((item) => {
  item.addEventListener("click", () => render(item.dataset.screen));
});

render("campaigns");
