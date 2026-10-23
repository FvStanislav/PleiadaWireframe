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

function render(name) {
  const current = screens[name] || screens.campaigns;

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

  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.screen === name);
  });
}

navItems.forEach((item) => {
  item.addEventListener("click", () => render(item.dataset.screen));
});

render("campaigns");
