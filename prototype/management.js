function managementStatusClass(status) {
  if (status === "В работе") return "status-working";
  if (status === "Отменен") return "status-cancelled";
  if (status === "Заявка не отправлена") return "status-pending";
  return "status-neutral";
}

function renderManagementChannel(channel) {
  return `
    <details class="management-channel">
      <summary>
        <div class="management-channel-title">${channel.name}</div>
        <span class="management-status ${managementStatusClass(channel.status)}">${channel.status}</span>
      </summary>
      <div class="management-placement-list">
        ${channel.placements.map((placement) => `
          <div class="management-placement-row">${placement}</div>
        `).join("")}
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

function renderCampaignManagement() {
  const management = mockData.campaignManagement;

  screen.innerHTML = `
    <div class="management-page">
      <button class="back-button" id="management-back">← Рекламные кампании</button>

      <div class="management-page-header">
        <h1>${management.title}</h1>
        <p>${management.subtitle}</p>
      </div>

      <div class="management-split-list">
        ${management.splits.map(renderManagementSplit).join("")}
      </div>
    </div>
  `;

  document.querySelector("#management-back").addEventListener("click", () => render("campaigns"));
  setActiveNav("campaigns");
}

renderCampaignCreateStep5 = renderCampaignManagement;
