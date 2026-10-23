mockData.campaignManagement.subtitle = "Рекламная кампания 1";

function openCampaignFromList() {
  renderCampaignManagement();
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
          </div>
        </div>
      </article>
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
};

render("campaigns");
