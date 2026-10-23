function managementStatusClass(status) {
  if (status === "В работе") return "status-working";
  if (status === "Отменен") return "status-cancelled";
  if (status === "Заявка не отправлена") return "status-pending";
  if (status === "Запланировано") return "status-planned";
  return "status-neutral";
}

function renderManagementPlacement(placement) {
  return `
    <div class="management-placement-row">
      <div class="management-placement-main">
        <strong>${placement.name}</strong>
        <div class="management-placement-meta">
          <span>Стоимость: ${formatNumber(placement.price)} ₽</span>
          <span class="management-status ${managementStatusClass(placement.status)}">${placement.status}</span>
        </div>
      </div>
      <button class="secondary-button creative-open" type="button" data-placement-id="${placement.id}">Креатив</button>
    </div>
  `;
}

function renderManagementChannel(channel) {
  return `
    <details class="management-channel">
      <summary>
        <div>
          <div class="management-channel-title">${channel.name}</div>
          <div class="management-channel-meta">
            <span>Размещений: ${channel.placementCount} шт.</span>
            <span>Бюджет: ${formatNumber(channel.budget)} ₽</span>
          </div>
        </div>
        <span class="management-status ${managementStatusClass(channel.status)}">${channel.status}</span>
      </summary>
      <div class="management-placement-list">
        ${channel.placements.map(renderManagementPlacement).join("")}
      </div>
    </details>
  `;
}

function renderManagementSplit(split) {
  return `
    <details class="management-split-card">
      <summary>
        <div class="management-split-main">
          <div>
            <div class="management-split-name">${split.name}</div>
            <div class="management-split-meta">
              <span>${split.dateRange}</span>
              <span>Размещений: ${split.placementCount} шт.</span>
              <span>Бюджет: ${formatNumber(split.budget)} ₽</span>
            </div>
          </div>
          <span class="management-status ${managementStatusClass(split.status)}">${split.status}</span>
        </div>
      </summary>
      <div class="management-split-body">
        ${split.channels.map(renderManagementChannel).join("")}
      </div>
    </details>
  `;
}

function openCreativeModal() {
  const modal = document.querySelector("#creative-modal");
  if (modal) modal.hidden = false;
}

function closeCreativeModal() {
  const modal = document.querySelector("#creative-modal");
  if (modal) modal.hidden = true;
}

function renderCampaignManagement() {
  const management = mockData.campaignManagement;

  screen.innerHTML = `
    <div class="management-page">
      <button class="back-button" id="management-back">← Рекламные кампании</button>

      <div class="management-page-header-row">
        <div class="management-page-header">
          <h1>${management.title}</h1>
          <p>${management.subtitle}</p>
        </div>
        <button class="primary-button" id="add-split">Добавить сплит</button>
      </div>

      <div class="management-split-list">
        ${management.splits.map(renderManagementSplit).join("")}
      </div>
    </div>

    <div class="creative-modal" id="creative-modal" hidden>
      <div class="creative-modal-backdrop" data-close-creative></div>
      <div class="creative-modal-dialog" role="dialog" aria-modal="true" aria-label="Креатив">
        <button class="creative-modal-close" type="button" aria-label="Закрыть" data-close-creative>×</button>
        <div class="creative-modal-empty"></div>
      </div>
    </div>
  `;

  document.querySelector("#management-back").addEventListener("click", () => render("campaigns"));
  document.querySelector("#add-split").addEventListener("click", () => render("campaign-create-step1"));

  document.querySelectorAll(".creative-open").forEach((button) => {
    button.addEventListener("click", openCreativeModal);
  });

  document.querySelectorAll("[data-close-creative]").forEach((element) => {
    element.addEventListener("click", closeCreativeModal);
  });

  setActiveNav("campaigns");
}

renderCampaignCreateStep5 = renderCampaignManagement;