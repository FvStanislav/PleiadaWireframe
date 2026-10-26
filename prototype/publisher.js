const publisherSections = [
  { key: "requests", title: "Заявки" },
  { key: "calendar", title: "Календарь" },
  { key: "chats", title: "Чаты" },
  { key: "channels", title: "Управление каналами" },
  { key: "publisher-profile", title: "Профиль" },
  { key: "publisher-billing", title: "Платежи и документы" },
  { key: "publisher-help", title: "Помощь" }
];

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

function renderPublisherScreen(key) {
  const section = publisherSections.find((item) => item.key === key) || publisherSections[0];

  renderPublisherSidebar(section.key);
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
