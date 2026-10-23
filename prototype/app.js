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

document.querySelector("#account-name").textContent = mockData.client.nickname;
document.querySelector("#account-balance").textContent = mockData.client.balance;

function setActiveNav(name) {
  const activeSection = name === "campaign-create" ? "campaigns" : name;

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

  document.querySelector("#create-campaign").addEventListener("click", () => render("campaign-create"));
}

function renderCampaignCreate() {
  screen.innerHTML = `
    <button class="back-button" id="back-to-campaigns">← Рекламные кампании</button>

    <div class="page-header">
      <h1>Создание рекламной кампании</h1>
      <p>Страница создания РК. Поля и структура будут добавляться по мере проработки бизнес-правил.</p>
    </div>

    <div class="panel placeholder">
      <strong>Форма создания пока не спроектирована</strong>
      <p>Сейчас зафиксирован только сам экран и переход на него из списка рекламных кампаний.</p>
    </div>
  `;

  document.querySelector("#back-to-campaigns").addEventListener("click", () => render("campaigns"));
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
  } else if (name === "campaign-create") {
    renderCampaignCreate();
  } else {
    renderPlaceholder(screens[name] || screens.campaigns);
  }

  setActiveNav(name);
}

navItems.forEach((item) => {
  item.addEventListener("click", () => render(item.dataset.screen));
});

render("campaigns");
