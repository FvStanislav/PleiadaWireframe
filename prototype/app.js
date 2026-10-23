const screens = {
  home: {
    title: "Прототип готов",
    text: "Здесь будут появляться экраны Pleiada по мере проработки UX. Данные фиксированные, логика реализуется только там, где она нужна для проверки интерфейса."
  },
  campaigns: {
    title: "Кампании",
    text: "Экран пока не спроектирован."
  },
  contracts: {
    title: "Контракты",
    text: "Экран пока не спроектирован."
  },
  media: {
    title: "Медиа",
    text: "Экран пока не спроектирован."
  }
};

const screen = document.querySelector("#screen");
const navItems = document.querySelectorAll(".nav-item");

function render(name) {
  const current = screens[name] || screens.home;
  screen.innerHTML = `
    <div class="panel">
      <h1>${current.title}</h1>
      <p>${current.text}</p>
    </div>
  `;

  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.screen === name);
  });
}

navItems.forEach((item) => {
  item.addEventListener("click", () => render(item.dataset.screen));
});

render("home");
