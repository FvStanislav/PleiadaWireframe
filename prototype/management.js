let activeCampaignId = "campaign-1";

const placementStatusOrder = ["Модерация", "Согласование", "Ждет публикации", "Опубликовано", "Отменено"];

function managementStatusClass(status) {
  if (status === "Черновик") return "status-draft";
  if (status === "Модерация") return "status-moderation";
  if (status === "Согласование") return "status-negotiation";
  if (status === "В работе") return "status-working";
  if (status === "Ждет публикации") return "status-planned";
  if (status === "Опубликовано" || status === "Завершен" || status === "Завершена") return "status-complete";
  if (status === "Отменено" || status === "Отменен") return "status-cancelled";
  return "status-neutral";
}

function getCampaign(campaignId = activeCampaignId) {
  return mockData.campaigns.find((item) => item.id === campaignId) || mockData.campaigns[0];
}

function getCampaignManagement(campaignId = activeCampaignId) {
  const campaign = getCampaign(campaignId);
  return campaign && mockData[campaign.managementKey] ? mockData[campaign.managementKey] : mockData.campaignManagement;
}

function splitPlacements(split) {
  return split.channels.flatMap((channel) => channel.placements || []);
}

function renderSplitStatusTooltip(split) {
  const placements = splitPlacements(split);
  const activeStatuses = placements.filter((placement) => placement.status);

  if (!activeStatuses.length) {
    return `
      <div class="split-status-tooltip" role="tooltip">
        <strong>Статусы размещений</strong>
        <span>Появятся после запуска сплита.</span>
      </div>
    `;
  }

  const counts = placementStatusOrder.map((status) => ({
    status,
    count: activeStatuses.filter((placement) => placement.status === status).length
  })).filter((item) => item.count > 0);

  return `
    <div class="split-status-tooltip" role="tooltip">
      <strong>Статусы размещений</strong>
      ${counts.map((item) => `
        <div class="split-status-tooltip-row">
          <span>${item.status}</span>
          <b>${item.count}</b>
        </div>
      `).join("")}
    </div>
  `;
}

function renderManagementPlacement(placement) {
  const moderationPassed = placement.status && placement.status !== "Модерация";

  return `
    <div class="management-placement-row">
      <div class="management-placement-main">
        <strong>${placement.name}</strong>
        <div class="management-placement-meta">
          <span>Стоимость: ${formatNumber(placement.price)} ₽</span>
          ${placement.status ? `<span class="management-status ${managementStatusClass(placement.status)}">${placement.status}</span>` : ""}
        </div>
      </div>
      <div class="management-placement-actions">
        ${moderationPassed ? `<span class="moderation-ok" tabindex="0" data-tooltip="Креатив промодерирован" aria-label="Креатив промодерирован">✓</span>` : ""}
        <button class="secondary-button creative-open" type="button" data-placement-id="${placement.id}">Креатив</button>
        <button class="danger-button cancel-action" type="button" data-cancel-target="${placement.name}">Отменить</button>
      </div>
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
        <div class="management-summary-actions">
          <button class="secondary-button contact-action" type="button" data-channel-name="${channel.name}">Связаться</button>
          <button class="danger-button cancel-action" type="button" data-cancel-target="${channel.name}">Отменить</button>
        </div>
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
              <span>Каналов: ${split.channels.length} шт.</span>
              <span>Размещений: ${split.placementCount} шт.</span>
              <span>Бюджет: ${formatNumber(split.budget)} ₽</span>
            </div>
          </div>
          <div class="management-summary-actions">
            <span class="split-status-wrap" tabindex="0">
              <span class="management-status ${managementStatusClass(split.status)}">${split.status}</span>
              ${renderSplitStatusTooltip(split)}
            </span>
            <button class="danger-button cancel-action" type="button" data-cancel-target="${split.name}">Отменить</button>
          </div>
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

function openCancelModal(target) {
  const modal = document.querySelector("#cancel-modal");
  const label = document.querySelector("#cancel-modal-target");
  if (label) label.textContent = target;
  if (modal) modal.hidden = false;
}

function closeCancelModal() {
  const modal = document.querySelector("#cancel-modal");
  if (modal) modal.hidden = true;
}

function openChatWidget(channelName) {
  const widget = document.querySelector("#chat-widget");
  const title = document.querySelector("#chat-widget-title");
  if (title) title.textContent = channelName;
  if (widget) widget.hidden = false;
}

function closeChatWidget() {
  const widget = document.querySelector("#chat-widget");
  if (widget) widget.hidden = true;
}

function renderCampaignManagement(campaignId = activeCampaignId) {
  activeCampaignId = campaignId || "campaign-1";
  const campaign = getCampaign(activeCampaignId);
  const management = getCampaignManagement(activeCampaignId);

  screen.innerHTML = `
    <div class="management-page">
      <button class="back-button" id="management-back">← Рекламные кампании</button>

      <div class="management-page-header-row">
        <div class="management-page-header">
          <div class="management-title-row">
            <h1>${management.title}</h1>
            <span class="management-status ${managementStatusClass(campaign.status)}">${campaign.status}</span>
          </div>
          <p>${management.subtitle}</p>
        </div>
        <div class="management-header-actions">
          <button class="secondary-button" id="open-creatives">Креативы</button>
          <button class="primary-button" id="add-split">Добавить сплит</button>
        </div>
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

    <div class="action-modal" id="cancel-modal" hidden>
      <div class="action-modal-backdrop" data-close-cancel></div>
      <div class="action-modal-dialog" role="dialog" aria-modal="true" aria-label="Отмена">
        <button class="action-modal-close" type="button" aria-label="Закрыть" data-close-cancel>×</button>
        <h2>Отмена</h2>
        <p id="cancel-modal-target"></p>
      </div>
    </div>

    <aside class="chat-widget" id="chat-widget" hidden aria-label="Чат">
      <div class="chat-widget-header">
        <div>
          <span>Чат</span>
          <strong id="chat-widget-title">Канал</strong>
        </div>
        <button class="chat-widget-close" type="button" aria-label="Закрыть чат" id="chat-widget-close">×</button>
      </div>
      <div class="chat-widget-body">
        <div class="chat-placeholder"></div>
        <div class="chat-placeholder short"></div>
      </div>
      <div class="chat-widget-input">Сообщение…</div>
    </aside>
  `;

  document.querySelector("#management-back").addEventListener("click", () => render("campaigns"));
  document.querySelector("#add-split").addEventListener("click", () => render("campaign-create-step1"));
  document.querySelector("#open-creatives").addEventListener("click", renderCampaignCreatives);

  document.querySelectorAll(".creative-open").forEach((button) => {
    button.addEventListener("click", openCreativeModal);
  });

  document.querySelectorAll("[data-close-creative]").forEach((element) => {
    element.addEventListener("click", closeCreativeModal);
  });

  document.querySelectorAll(".cancel-action").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openCancelModal(button.dataset.cancelTarget);
    });
  });

  document.querySelectorAll("[data-close-cancel]").forEach((element) => {
    element.addEventListener("click", closeCancelModal);
  });

  document.querySelectorAll(".contact-action").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openChatWidget(button.dataset.channelName);
    });
  });

  document.querySelector("#chat-widget-close").addEventListener("click", closeChatWidget);

  setActiveNav("campaigns");
}

renderCampaignCreateStep5 = renderCampaignManagement;
