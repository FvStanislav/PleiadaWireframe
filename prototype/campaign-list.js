mockData.campaignManagement.subtitle = "Рекламная кампания 1";

mockData.campaignManagement2 = {
  title: "Управление рекламной кампанией",
  subtitle: "Рекламная кампания 2",
  splits: [
    {
      id: "campaign-2-split-1",
      name: "Сплит 1",
      dateRange: "10.11.2026 — 10.12.2026",
      placementCount: 2,
      budget: 76200,
      status: "В работе",
      channels: [
        {
          id: "campaign-2-channel-1",
          name: "Канал 6",
          status: "Заявка не отправлена",
          placementCount: 1,
          budget: 31800,
          placements: [
            { id: "campaign-2-placement-1", name: "Размещение 1", price: 31800, status: "Запланировано" }
          ]
        },
        {
          id: "campaign-2-channel-2",
          name: "Канал 7",
          status: "В работе",
          placementCount: 1,
          budget: 44400,
          placements: [
            { id: "campaign-2-placement-2", name: "Размещение 2", price: 44400, status: "Запланировано" }
          ]
        }
      ]
    }
  ]
};

mockData.campaignManagement3 = {
  title: "Управление рекламной кампанией",
  subtitle: "Рекламная кампания 3",
  splits: [
    {
      id: "campaign-3-split-1",
      name: "Сплит 1",
      dateRange: "01.12.2026 — 31.12.2026",
      placementCount: 2,
      budget: 113500,
      status: "В работе",
      channels: [
        {
          id: "campaign-3-channel-1",
          name: "Канал 8",
          status: "В работе",
          placementCount: 1,
          budget: 68500,
          placements: [
            { id: "campaign-3-placement-1", name: "Размещение 1", price: 68500, status: "Запланировано" }
          ]
        },
        {
          id: "campaign-3-channel-2",
          name: "Канал 9",
          status: "Заявка не отправлена",
          placementCount: 1,
          budget: 45000,
          placements: [
            { id: "campaign-3-placement-2", name: "Размещение 2", price: 45000, status: "Запланировано" }
          ]
        }
      ]
    }
  ]
};

mockData.campaigns = [
  {
    id: "campaign-1",
    name: "Рекламная кампания 1",
    dateRange: mockData.campaignManagement.splits[0].dateRange,
    budget: mockData.campaignManagement.splits[0].budget,
    status: mockData.campaignManagement.splits[0].status,
    managementKey: "campaignManagement"
  },
  {
    id: "campaign-2",
    name: "Рекламная кампания 2",
    dateRange: mockData.campaignManagement2.splits[0].dateRange,
    budget: mockData.campaignManagement2.splits[0].budget,
    status: mockData.campaignManagement2.splits[0].status,
    managementKey: "campaignManagement2"
  },
  {
    id: "campaign-3",
    name: "Рекламная кампания 3",
    dateRange: mockData.campaignManagement3.splits[0].dateRange,
    budget: mockData.campaignManagement3.splits[0].budget,
    status: mockData.campaignManagement3.splits[0].status,
    managementKey: "campaignManagement3"
  }
];

function openCampaignFromList(campaignId) {
  renderCampaignManagement(campaignId);
}

function openDeleteCampaignModal(campaignName) {
  const modal = document.querySelector("#delete-campaign-modal");
  const label = document.querySelector("#delete-campaign-name");
  if (label) label.textContent = campaignName;
  if (modal) modal.hidden = false;
}

function closeDeleteCampaignModal() {
  const modal = document.querySelector("#delete-campaign-modal");
  if (modal) modal.hidden = true;
}

function renderCampaignListCard(campaign) {
  return `
    <article class="campaign-list-card" data-campaign-id="${campaign.id}" role="button" tabindex="0">
      <div class="campaign-list-card-main">
        <div>
          <div class="campaign-list-card-title">${campaign.name}</div>
          <div class="campaign-list-card-meta">
            <div>
              <span>Даты</span>
              <strong>${campaign.dateRange}</strong>
            </div>
            <div>
              <span>Бюджет</span>
              <strong>${formatNumber(campaign.budget)} ₽</strong>
            </div>
          </div>
        </div>

        <div class="campaign-list-card-actions">
          <span class="management-status ${managementStatusClass(campaign.status)}">${campaign.status}</span>
          <button class="secondary-button open-campaign-button" type="button" data-campaign-id="${campaign.id}">Перейти</button>
          <button class="campaign-delete-button" type="button" data-delete-campaign-id="${campaign.id}" aria-label="Удалить рекламную кампанию" title="Удалить">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v5m4-5v5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `;
}

renderCampaigns = function () {
  screen.innerHTML = `
    <div class="page-header-row">
      <div class="page-header">
        <h1>Рекламные кампании</h1>
        <p>Основной список рекламных кампаний.</p>
      </div>
      <button class="primary-button" id="create-campaign">Создать</button>
    </div>

    <div class="campaign-list">
      ${mockData.campaigns.map(renderCampaignListCard).join("")}
    </div>

    <div class="delete-campaign-modal" id="delete-campaign-modal" hidden>
      <div class="delete-campaign-backdrop" data-close-delete-campaign></div>
      <div class="delete-campaign-dialog" role="dialog" aria-modal="true" aria-label="Удаление рекламной кампании">
        <button class="delete-campaign-close" type="button" aria-label="Закрыть" data-close-delete-campaign>×</button>
        <h2>Удаление рекламной кампании</h2>
        <p id="delete-campaign-name"></p>
      </div>
    </div>
  `;

  document.querySelector("#create-campaign").addEventListener("click", () => render("campaign-create-step1"));

  document.querySelectorAll(".campaign-list-card").forEach((card) => {
    const campaignId = card.dataset.campaignId;

    card.addEventListener("click", () => openCampaignFromList(campaignId));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCampaignFromList(campaignId);
      }
    });
  });

  document.querySelectorAll(".open-campaign-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openCampaignFromList(button.dataset.campaignId);
    });
  });

  document.querySelectorAll(".campaign-delete-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const campaign = mockData.campaigns.find((item) => item.id === button.dataset.deleteCampaignId);
      openDeleteCampaignModal(campaign ? campaign.name : "Рекламная кампания");
    });
  });

  document.querySelectorAll("[data-close-delete-campaign]").forEach((element) => {
    element.addEventListener("click", closeDeleteCampaignModal);
  });
};

render("campaigns");
