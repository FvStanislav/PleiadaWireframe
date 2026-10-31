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
      status: "Черновик",
      channels: [
        {
          id: "campaign-2-channel-1",
          name: "Канал 6",
          placementCount: 1,
          budget: 31800,
          placements: [
            { id: "campaign-2-placement-1", name: "Размещение 1", price: 31800, status: null }
          ]
        },
        {
          id: "campaign-2-channel-2",
          name: "Канал 7",
          placementCount: 1,
          budget: 44400,
          placements: [
            { id: "campaign-2-placement-2", name: "Размещение 2", price: 44400, status: null }
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
      status: "Завершен",
      channels: [
        {
          id: "campaign-3-channel-1",
          name: "Канал 8",
          placementCount: 1,
          budget: 68500,
          placements: [
            { id: "campaign-3-placement-1", name: "Размещение 1", price: 68500, status: "Опубликовано" }
          ]
        },
        {
          id: "campaign-3-channel-2",
          name: "Канал 9",
          placementCount: 1,
          budget: 45000,
          placements: [
            { id: "campaign-3-placement-2", name: "Размещение 2", price: 45000, status: "Отменено" }
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
    status: "В работе",
    managementKey: "campaignManagement",
    group: null
  },
  {
    id: "campaign-2",
    name: "Рекламная кампания 2",
    dateRange: mockData.campaignManagement2.splits[0].dateRange,
    budget: mockData.campaignManagement2.splits[0].budget,
    status: "Черновик",
    managementKey: "campaignManagement2",
    group: "VK Диваны"
  },
  {
    id: "campaign-3",
    name: "Рекламная кампания 3",
    dateRange: mockData.campaignManagement3.splits[0].dateRange,
    budget: mockData.campaignManagement3.splits[0].budget,
    status: "Завершена",
    managementKey: "campaignManagement3",
    group: "VK Диваны"
  }
];

const campaignListState = {
  deletedIds: new Set(),
  groups: [...new Set(mockData.campaigns.map((campaign) => campaign.group).filter(Boolean))],
  pendingDeleteId: null
};

function openCampaignFromList(campaignId) {
  renderCampaignManagement(campaignId);
}

function getCampaignSplits(campaign) {
  const management = campaign && mockData[campaign.managementKey];
  return management && Array.isArray(management.splits) ? management.splits : [];
}

function renderCampaignSplitSummary(campaign) {
  const splits = getCampaignSplits(campaign);
  const counts = splits.reduce((result, split) => {
    const status = split.status || "Без статуса";
    result[status] = (result[status] || 0) + 1;
    return result;
  }, {});

  return `
    <div class="campaign-list-split-summary">
      <span class="campaign-list-split-label">Сплиты: <strong>${splits.length}</strong></span>
      <div class="campaign-list-split-statuses">
        ${Object.entries(counts).map(([status, count]) => `
          <span class="campaign-split-status ${managementStatusClass(status)}">${status} · ${count}</span>
        `).join("")}
      </div>
    </div>
  `;
}

function openDeleteCampaignModal(campaignId) {
  campaignListState.pendingDeleteId = campaignId;
  const campaign = mockData.campaigns.find((item) => item.id === campaignId);
  const modal = document.querySelector("#delete-campaign-modal");
  const label = document.querySelector("#delete-campaign-name");
  if (label) label.textContent = campaign ? campaign.name : "Рекламная кампания";
  if (modal) modal.hidden = false;
}

function closeDeleteCampaignModal() {
  campaignListState.pendingDeleteId = null;
  const modal = document.querySelector("#delete-campaign-modal");
  if (modal) modal.hidden = true;
}

function moveCampaignToTrash() {
  if (!campaignListState.pendingDeleteId) return;
  campaignListState.deletedIds.add(campaignListState.pendingDeleteId);
  campaignListState.pendingDeleteId = null;
  renderCampaigns();
}

function openCampaignTrashModal() {
  const modal = document.querySelector("#campaign-trash-modal");
  if (modal) modal.hidden = false;
}

function closeCampaignTrashModal() {
  const modal = document.querySelector("#campaign-trash-modal");
  if (modal) modal.hidden = true;
}

function restoreCampaign(campaignId) {
  campaignListState.deletedIds.delete(campaignId);
  renderCampaigns();
  openCampaignTrashModal();
}

function permanentlyDeleteCampaign(campaignId) {
  campaignListState.deletedIds.delete(campaignId);
  mockData.campaigns = mockData.campaigns.filter((campaign) => campaign.id !== campaignId);
  renderCampaigns();
  openCampaignTrashModal();
}

function renderCampaignTrashItems() {
  const deletedCampaigns = mockData.campaigns.filter((campaign) => campaignListState.deletedIds.has(campaign.id));

  if (!deletedCampaigns.length) {
    return `<div class="campaign-trash-empty">Корзина пуста.</div>`;
  }

  return deletedCampaigns.map((campaign) => `
    <div class="campaign-trash-item">
      <div>
        <strong>${campaign.name}</strong>
        <span>${campaign.group ? `Группа: ${campaign.group}` : "Без группы"}</span>
      </div>
      <div class="campaign-trash-item-actions">
        <button class="secondary-button restore-campaign" type="button" data-restore-campaign-id="${campaign.id}">Восстановить</button>
        <button class="danger-button permanent-delete-campaign" type="button" data-permanent-delete-campaign-id="${campaign.id}">Удалить навсегда</button>
      </div>
    </div>
  `).join("");
}

function openCreateGroupModal() {
  const modal = document.querySelector("#create-group-modal");
  const input = document.querySelector("#create-group-name");
  if (modal) modal.hidden = false;
  if (input) {
    input.value = "";
    input.focus();
  }
}

function closeCreateGroupModal() {
  const modal = document.querySelector("#create-group-modal");
  if (modal) modal.hidden = true;
}

function createCampaignGroup() {
  const input = document.querySelector("#create-group-name");
  const groupName = input ? input.value.trim() : "";
  if (!groupName) return;
  if (!campaignListState.groups.includes(groupName)) campaignListState.groups.push(groupName);
  renderCampaigns();
}

function renderCampaignListCard(campaign) {
  return `
    <article class="campaign-list-card" data-campaign-id="${campaign.id}" role="button" tabindex="0">
      <div class="campaign-list-card-main">
        <div class="campaign-list-card-content">
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
          ${renderCampaignSplitSummary(campaign)}
        </div>

        <div class="campaign-list-card-actions">
          <span class="management-status ${managementStatusClass(campaign.status)}">${campaign.status}</span>
          <button class="secondary-button open-campaign-button" type="button" data-campaign-id="${campaign.id}">Перейти</button>
          <button class="campaign-delete-button" type="button" data-delete-campaign-id="${campaign.id}" aria-label="Переместить рекламную кампанию в корзину" title="В корзину">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v5m4-5v5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderCampaignGroup(groupName, campaigns) {
  return `
    <section class="campaign-group">
      <div class="campaign-group-header">
        <div>
          <span class="campaign-group-label">Группа</span>
          <h2>${groupName}</h2>
        </div>
        <span class="campaign-group-count">РК: ${campaigns.length}</span>
      </div>
      <div class="campaign-group-list">
        ${campaigns.length
          ? campaigns.map(renderCampaignListCard).join("")
          : `<div class="campaign-group-empty">В группе пока нет рекламных кампаний.</div>`}
      </div>
    </section>
  `;
}

renderCampaigns = function () {
  const visibleCampaigns = mockData.campaigns.filter((campaign) => !campaignListState.deletedIds.has(campaign.id));
  const ungroupedCampaigns = visibleCampaigns.filter((campaign) => !campaign.group);
  const trashCount = campaignListState.deletedIds.size;

  screen.innerHTML = `
    <div class="page-header-row">
      <div class="page-header">
        <h1>Рекламные кампании</h1>
        <p>Основной список рекламных кампаний.</p>
      </div>
      <div class="campaign-list-header-actions">
        <button class="secondary-button campaign-trash-button" id="open-campaign-trash" type="button">
          Корзина${trashCount ? `<span>${trashCount}</span>` : ""}
        </button>
        <button class="secondary-button" id="create-group" type="button">Создать группу</button>
        <button class="primary-button" id="create-campaign" type="button">Создать</button>
      </div>
    </div>

    <div class="campaign-list">
      ${ungroupedCampaigns.map(renderCampaignListCard).join("")}
      ${campaignListState.groups.map((groupName) => renderCampaignGroup(
        groupName,
        visibleCampaigns.filter((campaign) => campaign.group === groupName)
      )).join("")}
    </div>

    <div class="delete-campaign-modal" id="delete-campaign-modal" hidden>
      <div class="delete-campaign-backdrop" data-close-delete-campaign></div>
      <div class="delete-campaign-dialog" role="dialog" aria-modal="true" aria-label="Перемещение рекламной кампании в корзину">
        <button class="delete-campaign-close" type="button" aria-label="Закрыть" data-close-delete-campaign>×</button>
        <h2>Переместить в корзину?</h2>
        <p id="delete-campaign-name"></p>
        <p class="delete-campaign-hint">Рекламную кампанию можно будет восстановить из корзины.</p>
        <div class="delete-campaign-actions">
          <button class="secondary-button" type="button" data-close-delete-campaign>Отмена</button>
          <button class="danger-button" id="confirm-move-campaign-trash" type="button">В корзину</button>
        </div>
      </div>
    </div>

    <div class="campaign-trash-modal" id="campaign-trash-modal" hidden>
      <div class="campaign-trash-backdrop" data-close-campaign-trash></div>
      <div class="campaign-trash-dialog" role="dialog" aria-modal="true" aria-label="Корзина рекламных кампаний">
        <button class="delete-campaign-close" type="button" aria-label="Закрыть" data-close-campaign-trash>×</button>
        <h2>Корзина РК</h2>
        <p>Удаленные рекламные кампании можно восстановить или удалить безвозвратно.</p>
        <div class="campaign-trash-list">
          ${renderCampaignTrashItems()}
        </div>
      </div>
    </div>

    <div class="create-group-modal" id="create-group-modal" hidden>
      <div class="create-group-backdrop" data-close-create-group></div>
      <form class="create-group-dialog" id="create-group-form">
        <button class="delete-campaign-close" type="button" aria-label="Закрыть" data-close-create-group>×</button>
        <h2>Новая группа</h2>
        <label for="create-group-name">Название группы</label>
        <input id="create-group-name" type="text" placeholder="Например, VK Диваны" autocomplete="off">
        <div class="create-group-actions">
          <button class="secondary-button" type="button" data-close-create-group>Отмена</button>
          <button class="primary-button" type="submit">Создать группу</button>
        </div>
      </form>
    </div>
  `;

  document.querySelector("#create-campaign").addEventListener("click", () => render("campaign-create-step1"));
  document.querySelector("#create-group").addEventListener("click", openCreateGroupModal);
  document.querySelector("#open-campaign-trash").addEventListener("click", openCampaignTrashModal);

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
      openDeleteCampaignModal(button.dataset.deleteCampaignId);
    });
  });

  document.querySelectorAll("[data-close-delete-campaign]").forEach((element) => {
    element.addEventListener("click", closeDeleteCampaignModal);
  });

  document.querySelector("#confirm-move-campaign-trash").addEventListener("click", moveCampaignToTrash);

  document.querySelectorAll("[data-close-campaign-trash]").forEach((element) => {
    element.addEventListener("click", closeCampaignTrashModal);
  });

  document.querySelectorAll(".restore-campaign").forEach((button) => {
    button.addEventListener("click", () => restoreCampaign(button.dataset.restoreCampaignId));
  });

  document.querySelectorAll(".permanent-delete-campaign").forEach((button) => {
    button.addEventListener("click", () => permanentlyDeleteCampaign(button.dataset.permanentDeleteCampaignId));
  });

  document.querySelectorAll("[data-close-create-group]").forEach((element) => {
    element.addEventListener("click", closeCreateGroupModal);
  });

  document.querySelector("#create-group-form").addEventListener("submit", (event) => {
    event.preventDefault();
    createCampaignGroup();
  });
};

render("campaigns");