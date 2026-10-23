mockData.campaignManagement.subtitle = "Рекламная кампания 1";

function openCampaignFromList() {
  renderCampaignManagement();
}

function openDeleteCampaignModal() {
  const modal = document.querySelector("#delete-campaign-modal");
  if (modal) modal.hidden = false;
}

function closeDeleteCampaignModal() {
  const modal = document.querySelector("#delete-campaign-modal");
  if (modal) modal.hidden = true;
}

renderCampaigns = function () {
  const campaign = mockData.campaignManagement;
  const split = campaign.splits[0];

  screen.innerHTML = `
    <div class="page-header-row">
      <div class="page-header">
        <h1>Рекламные кампании</h1>
        <p>Основной список рекламных кампаний.</p>
      </div>
      <button class="primary-button" id="create-campaign">Создать</button>
    </div>

    <div class="campaign-list">
      <article class="campaign-list-card" id="campaign-1-card" role="button" tabindex="0">
        <div class="campaign-list-card-main">
          <div>
            <div class="campaign-list-card-title">${campaign.subtitle}</div>
            <div class="campaign-list-card-meta">
              <div>
                <span>Даты</span>
                <strong>${split.dateRange}</strong>
              </div>
              <div>
                <span>Бюджет</span>
                <strong>${formatNumber(split.budget)} ₽</strong>
              </div>
            </div>
          </div>

          <div class="campaign-list-card-actions">
            <span class="management-status ${managementStatusClass(split.status)}">${split.status}</span>
            <button class="secondary-button" id="open-campaign" type="button">Перейти</button>
            <button class="campaign-delete-button" id="delete-campaign" type="button" aria-label="Удалить рекламную кампанию" title="Удалить">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v5m4-5v5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </article>
    </div>

    <div class="delete-campaign-modal" id="delete-campaign-modal" hidden>
      <div class="delete-campaign-backdrop" data-close-delete-campaign></div>
      <div class="delete-campaign-dialog" role="dialog" aria-modal="true" aria-label="Удаление рекламной кампании">
        <button class="delete-campaign-close" type="button" aria-label="Закрыть" data-close-delete-campaign>×</button>
        <h2>Удаление рекламной кампании</h2>
        <p>${campaign.subtitle}</p>
      </div>
    </div>
  `;

  document.querySelector("#create-campaign").addEventListener("click", () => render("campaign-create-step1"));

  const card = document.querySelector("#campaign-1-card");
  card.addEventListener("click", openCampaignFromList);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCampaignFromList();
    }
  });

  document.querySelector("#open-campaign").addEventListener("click", (event) => {
    event.stopPropagation();
    openCampaignFromList();
  });

  document.querySelector("#delete-campaign").addEventListener("click", (event) => {
    event.stopPropagation();
    openDeleteCampaignModal();
  });

  document.querySelectorAll("[data-close-delete-campaign]").forEach((element) => {
    element.addEventListener("click", closeDeleteCampaignModal);
  });
};

render("campaigns");
