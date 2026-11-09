const chatParties = [
  { id: "media-group", advertiserName: "Media Group", publisherName: "ООО «Диваны»", advertiser: true, publisher: true, initials: "MG" },
  { id: "content-studio", advertiserName: "Студия Контент", advertiser: true, publisher: false, initials: "СК" },
  { id: "vector", publisherName: "Агентство «Вектор»", advertiser: false, publisher: true, initials: "В" }
];

const chatViewState = {
  advertiser: { partyId: "media-group", topicId: "general" },
  publisher: { partyId: "media-group", topicId: "general" }
};

const chatMessages = {
  "media-group|general": [
    { side: "publisher", author: "Мария", time: "10:20", text: "Добрый день! По новым размещениям можно писать сюда, всё увидим." },
    { side: "advertiser", author: "Алексей", time: "10:24", text: "Спасибо. По конкретным публикациям напишем в обсуждениях размещений." }
  ],
  "media-group|placement:placement-2": [
    { side: "advertiser", author: "Алексей", time: "11:05", text: "Подскажите, можем оставить публикацию на вечер?" },
    { side: "publisher", author: "Мария", time: "11:12", text: "Да, после 18:00 слот свободен." }
  ],
  "media-group|request:request-1": [
    { side: "advertiser", author: "Алексей", time: "12:15", text: "Здравствуйте! Направили запрос на нативную интеграцию в Канале 1." },
    { side: "publisher", author: "Мария", time: "12:18", text: "Получили. Проверяем дату и условия размещения." }
  ],
  "vector|request:request-3": [
    { side: "advertiser", author: "Елена", time: "09:40", text: "Добрый день! Отправили заявку на спонсорское упоминание." }
  ]
};

let chatMiniContext = null;

function chatEscape(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function chatPartyLabel(party, workspace) {
  return workspace === "publisher" ? (party.publisherName || party.advertiserName) : (party.advertiserName || party.publisherName);
}

function chatPartyForChannel(channelId) {
  return channelId.startsWith("campaign-2-") || channelId.startsWith("campaign-3-") ? "content-studio" : "media-group";
}

function chatAllTopics() {
  const result = [];
  mockData.campaigns.forEach((campaign) => {
    const management = mockData[campaign.managementKey];
    if (!management) return;
    management.splits.forEach((split) => split.channels.forEach((channel) =>
      (channel.placements || []).forEach((placement) => result.push({
        id: `placement:${placement.id}`,
        partyId: chatPartyForChannel(channel.id),
        label: placement.name,
        channel: channel.name,
        campaign: campaign.name,
        split: split.name,
        status: placement.status || "Черновик сплита",
        amount: `${formatNumber(placement.price)} ₽`,
        campaignId: campaign.id,
        placementId: placement.id
      }))
    ));
  });
  if (typeof publisherRequests !== "undefined") {
    publisherRequests.forEach((request) => result.push({
      id: `request:${request.id}`,
      partyId: request.id === "request-3" ? "vector" : "media-group",
      label: request.format,
      channel: request.channel,
      campaign: "Рекламная кампания",
      split: "Заявка на размещение",
      status: request.status,
      amount: `${formatNumber(request.amount)} ₽`,
      date: `${request.publicationDate} · ${request.publicationTime}`,
      requestId: request.id
    }));
  }
  return result;
}

function chatPartyTopics(partyId) {
  return chatAllTopics().filter((topic) => topic.partyId === partyId);
}

function chatConversationKey(partyId, topicId) {
  return `${partyId}|${topicId}`;
}

function chatStatusClass(status) {
  if (typeof managementStatusClass === "function") return managementStatusClass(status);
  return "status-neutral";
}

function renderChatMessages(workspace, partyId, topicId) {
  const items = chatMessages[chatConversationKey(partyId, topicId)] || [];
  if (!items.length) return `<div class="chat-empty-messages">Здесь пока нет сообщений. Начните обсуждение.</div>`;
  return items.map((item) => `
    <div class="chat-message ${item.side === workspace ? "outgoing" : "incoming"}">
      <div class="chat-message-meta"><strong>${chatEscape(item.author)}</strong><span>${chatEscape(item.time)}</span></div>
      <div class="chat-message-text">${chatEscape(item.text)}</div>
    </div>
  `).join("");
}

function renderChatConversation(workspace, partyId, topicId, compact = false) {
  const party = chatParties.find((item) => item.id === partyId);
  const topic = chatPartyTopics(partyId).find((item) => item.id === topicId);
  if (!party) return "";
  const name = chatPartyLabel(party, workspace);
  const title = topic ? `${topic.channel} · ${topic.label}` : "Общий чат";
  const context = topic ? `
    <div class="chat-placement-context">
      <div><span>РК / источник</span><strong>${chatEscape(topic.campaign)}</strong></div>
      <div><span>Сплит</span><strong>${chatEscape(topic.split)}</strong></div>
      <div><span>Стоимость</span><strong>${chatEscape(topic.amount)}</strong></div>
      <span class="management-status ${chatStatusClass(topic.status)}">${chatEscape(topic.status)}</span>
    </div>
  ` : `<div class="chat-general-note">Общие вопросы с контрагентом, не привязанные к конкретному размещению.</div>`;
  const origin = !compact && topic && ((workspace === "advertiser" && topic.placementId) || (workspace === "publisher" && topic.requestId))
    ? `<button class="chat-origin-button" type="button" data-chat-origin="${chatEscape(topic.id)}">Открыть ${topic.requestId ? "заявку" : "размещение"}</button>`
    : "";
  return `
    <div class="chat-conversation-header">
      <div>
        <span class="chat-eyebrow">${chatEscape(name)}</span>
        <h2>${chatEscape(title)}</h2>
      </div>
      ${origin}
    </div>
    ${context}
    <div class="chat-message-list" aria-label="Переписка">
      ${renderChatMessages(workspace, partyId, topicId)}
    </div>
    <form class="chat-compose" data-chat-compose="${compact ? "mini" : "full"}">
      <textarea name="message" rows="2" aria-label="Сообщение" placeholder="Написать сообщение…" required></textarea>
      <button class="primary-button" type="submit">Отправить</button>
    </form>
  `;
}

function chatSend(workspace, partyId, topicId, text) {
  const message = text.trim();
  if (!message) return;
  const key = chatConversationKey(partyId, topicId);
  if (!chatMessages[key]) chatMessages[key] = [];
  chatMessages[key].push({
    side: workspace,
    author: workspace === "publisher" ? "Мария" : "Алексей",
    time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    text: message
  });
}

function chatScrollToBottom(root) {
  const timeline = root && root.querySelector(".chat-message-list");
  if (timeline) timeline.scrollTop = timeline.scrollHeight;
}

function chatSelect(workspace, partyId, topicId) {
  chatViewState[workspace] = { partyId, topicId };
  renderChatsWorkspace(workspace);
}

function renderChatsWorkspace(workspace) {
  const available = chatParties.filter((party) => party[workspace]);
  const state = chatViewState[workspace];
  if (!available.some((party) => party.id === state.partyId)) {
    state.partyId = available[0].id;
    state.topicId = "general";
  }
  const activeParty = available.find((party) => party.id === state.partyId);
  const activeTopic = chatPartyTopics(state.partyId).find((topic) => topic.id === state.topicId);
  if (state.topicId !== "general" && !activeTopic) state.topicId = "general";

  screen.innerHTML = `
    <div class="chat-page">
      <div class="page-header">
        <h1>Чаты</h1>
        <p>Общие диалоги с контрагентами и отдельные обсуждения каждого размещения.</p>
      </div>
      <div class="chat-workspace">
        <aside class="chat-counterparty-column">
          <div class="chat-column-heading">Контрагенты <span>${available.length}</span></div>
          ${available.map((party) => {
            const count = chatPartyTopics(party.id).length;
            return `
              <details class="chat-counterparty" ${party.id === state.partyId ? "open" : ""}>
                <summary>
                  <span class="chat-party-avatar">${chatEscape(party.initials)}</span>
                  <span class="chat-party-summary">
                    <strong>${chatEscape(chatPartyLabel(party, workspace))}</strong>
                    <small>Размещений: ${count}</small>
                  </span>
                  <span class="chat-party-chevron">⌄</span>
                </summary>
                <div class="chat-counterparty-topics">
                  <button class="chat-topic-button ${party.id === state.partyId && state.topicId === "general" ? "selected" : ""}" data-chat-party="${party.id}" data-chat-topic="general" type="button">
                    <strong>Общий чат</strong><small>Без привязки к размещению</small>
                  </button>
                  ${chatPartyTopics(party.id).map((topic) => `
                    <button class="chat-topic-button ${party.id === state.partyId && topic.id === state.topicId ? "selected" : ""}" data-chat-party="${party.id}" data-chat-topic="${chatEscape(topic.id)}" type="button">
                      <strong>${chatEscape(topic.channel)} · ${chatEscape(topic.label)}</strong>
                      <small>${chatEscape(topic.status)} · ${chatEscape(topic.amount)}</small>
                    </button>
                  `).join("")}
                </div>
              </details>
            `;
          }).join("")}
        </aside>
        <section class="chat-conversation-panel">
          ${renderChatConversation(workspace, activeParty.id, state.topicId)}
        </section>
      </div>
    </div>
  `;
  screen.querySelectorAll("[data-chat-party]").forEach((button) => {
    button.addEventListener("click", () => chatSelect(workspace, button.dataset.chatParty, button.dataset.chatTopic));
  });
  const form = screen.querySelector(".chat-compose");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = form.querySelector("textarea");
    if (!input.value.trim()) return;
    chatSend(workspace, state.partyId, state.topicId, input.value);
    renderChatsWorkspace(workspace);
    const newInput = screen.querySelector(".chat-compose textarea");
    newInput.focus();
    chatScrollToBottom(screen);
  });
  const origin = screen.querySelector("[data-chat-origin]");
  if (origin) origin.addEventListener("click", () => chatNavigateToOrigin(workspace, activeTopic));
  chatScrollToBottom(screen);
  if (workspace === "advertiser") setActiveNav("chats");
}

function chatNavigateToOrigin(workspace, topic) {
  if (!topic) return;
  closeChatMini();
  if (workspace === "publisher" && topic.requestId) {
    renderPublisherRequestDetail(topic.requestId);
  } else if (workspace === "advertiser" && topic.placementId) {
    renderCampaignManagement(topic.campaignId);
    const row = Array.from(document.querySelectorAll("[data-placement-row-id]"))
      .find((item) => item.dataset.placementRowId === topic.placementId);
    if (row) {
      let parent = row.parentElement;
      while (parent) {
        if (parent.tagName === "DETAILS") parent.open = true;
        parent = parent.parentElement;
      }
      row.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }
}

function openChatInSection(workspace, partyId, topicId = "general") {
  chatViewState[workspace] = { partyId, topicId };
  closeChatMini();
  if (workspace === "publisher") renderPublisherScreen("chats");
  else render("chats");
}

function closeChatMini() {
  document.querySelector("#chat-mini-root")?.remove();
  chatMiniContext = null;
}

function renderChatMini() {
  if (!chatMiniContext) return;
  let root = document.querySelector("#chat-mini-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "chat-mini-root";
    document.body.appendChild(root);
  }
  const { workspace, partyId, topicId } = chatMiniContext;
  const party = chatParties.find((item) => item.id === partyId);
  root.innerHTML = `
    <aside class="chat-mini-panel" aria-label="Мини-чат">
      <div class="chat-mini-topbar">
        <strong>${chatEscape(chatPartyLabel(party, workspace))}</strong>
        <button type="button" class="chat-mini-close" aria-label="Закрыть мини-чат">×</button>
      </div>
      ${renderChatConversation(workspace, partyId, topicId, true)}
      <button type="button" class="chat-open-full">Открыть в разделе «Чаты»</button>
    </aside>
  `;
  root.querySelector(".chat-mini-close").addEventListener("click", closeChatMini);
  root.querySelector(".chat-open-full").addEventListener("click", () => openChatInSection(workspace, partyId, topicId));
  const form = root.querySelector(".chat-compose");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = form.querySelector("textarea");
    if (!input.value.trim()) return;
    chatSend(workspace, partyId, topicId, input.value);
    renderChatMini();
    root.querySelector("textarea").focus();
  });
  chatScrollToBottom(root);
}

function openChatMini(workspace, partyId, topicId = "general") {
  if (!chatParties.some((party) => party.id === partyId)) return;
  chatMiniContext = { workspace, partyId, topicId };
  renderChatMini();
}

function openMiniChatForPlacement(placementId) {
  const topic = chatAllTopics().find((item) => item.placementId === placementId);
  if (topic) openChatMini("advertiser", topic.partyId, topic.id);
}

function openMiniChatForChannel(channelId) {
  openChatMini("advertiser", chatPartyForChannel(channelId), "general");
}

function openMiniChatForRequest(requestId) {
  const topic = chatAllTopics().find((item) => item.requestId === requestId);
  if (topic) openChatMini("publisher", topic.partyId, topic.id);
}
