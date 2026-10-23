const splitState = {
  ...Object.fromEntries(
    mockData.campaignCreation.split.placements.map((placement) => [placement.id, true])
  ),
  ...Object.fromEntries(
    mockData.campaignCreation.split.suggestedPlacements.map((placement) => [placement.id, false])
  )
};

let suggestedSearch = "";
let suggestedSort = "relevance";

const baseRenderCampaignCreateStep2 = renderCampaignCreateStep2;

renderCampaignCreateStep2 = function () {
  baseRenderCampaignCreateStep2();
  const progressItems = screen.querySelectorAll(".wizard-progress-item");
  if (progressItems[2]) {
    progressItems[2].querySelector("strong").textContent = "Сплит";
  }
};

function formatNumber(value) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

function renderGenderAudience(gender) {
  return `
    <div class="audience-block">
      <div class="audience-title">Аудитория по полу</div>
      <div class="gender-labels">
        <span>Мужчины ${gender.male}%</span>
        <span>Женщины ${gender.female}%</span>
      </div>
      <div class="gender-scale" aria-label="Мужчины ${gender.male}%, женщины ${gender.female}%">
        <div class="gender-segment gender-male" style="width: ${gender.male}%"></div>
        <div class="gender-segment gender-female" style="width: ${gender.female}%"></div>
      </div>
    </div>
  `;
}

function renderAgeAudience(age) {
  const maxCount = Math.max(...age.map((item) => item.count), 1);

  return `
    <div class="audience-block">
      <div class="audience-title">Возраст аудитории</div>
      <div class="age-chart">
        ${age.map((item) => {
          const height = Math.max(8, Math.round((item.count / maxCount) * 72));
          return `
            <div class="age-column">
              <div class="age-count">${formatNumber(item.count)}</div>
              <div class="age-bar-wrap">
                <div class="age-bar" style="height: ${height}px"></div>
              </div>
              <div class="age-label">${item.label}</div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function renderSplitPlacementCard(placement) {
  const isAdded = splitState[placement.id];

  return `
    <article class="media-card">
      <div class="media-card-header">
        <div>
          <div class="media-card-kicker">${placement.type}</div>
          <h3>${placement.name}</h3>
        </div>
        <div class="media-card-actions">
          <div class="media-price">
            <span>Цена:</span>
            <strong>${formatNumber(placement.price)} ₽</strong>
          </div>
          <button
            class="split-toggle ${isAdded ? "is-added" : ""}"
            data-placement-id="${placement.id}"
            aria-pressed="${isAdded}"
          >${isAdded ? "Добавлено в сплит" : "Добавить в сплит"}</button>
        </div>
      </div>

      <div class="media-metrics">
        <div class="media-metric"><span>Подписчиков</span><strong>${formatNumber(placement.subscribers)}</strong></div>
        <div class="media-metric"><span>Просмотров</span><strong>${formatNumber(placement.views)}</strong></div>
        <div class="media-metric"><span>Охват</span><strong>${formatNumber(placement.reach)}</strong></div>
        <div class="media-metric"><span>ER</span><strong>${placement.er}%</strong></div>
        <div class="media-metric"><span>ERR</span><strong>${placement.err}%</strong></div>
        <div class="media-metric"><span>Публикаций в месяц</span><strong>${placement.publicationsPerMonth}</strong></div>
      </div>

      <div class="audience-grid">
        ${renderGenderAudience(placement.gender)}
        ${renderAgeAudience(placement.age)}
      </div>
    </article>
  `;
}

function bindSplitToggleButtons(root = document) {
  root.querySelectorAll(".split-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.placementId;
      splitState[id] = !splitState[id];
      button.classList.toggle("is-added", splitState[id]);
      button.textContent = splitState[id] ? "Добавлено в сплит" : "Добавить в сплит";
      button.setAttribute("aria-pressed", String(splitState[id]));
    });
  });
}

function getSuggestedPlacements() {
  const split = mockData.campaignCreation.split;
  const query = suggestedSearch.trim().toLowerCase();
  const items = split.suggestedPlacements.filter((placement) =>
    placement.name.toLowerCase().includes(query)
  );

  return items.sort((a, b) => {
    if (suggestedSort === "subscribers") return b.subscribers - a.subscribers;
    if (suggestedSort === "views") return b.views - a.views;
    if (suggestedSort === "price") return a.price - b.price;
    return b.relevance - a.relevance;
  });
}

function renderSuggestedPlacements() {
  const list = document.querySelector("#suggested-media-list");
  if (!list) return;

  const items = getSuggestedPlacements();
  list.innerHTML = items.length
    ? items.map(renderSplitPlacementCard).join("")
    : `<div class="suggested-empty">По вашему запросу ничего не найдено.</div>`;

  bindSplitToggleButtons(list);
}

renderCampaignCreateStep3 = function () {
  const split = mockData.campaignCreation.split;

  screen.innerHTML = `
    <div class="wizard-header">
      <div>
        <button class="back-button" id="exit-campaign-create">← Рекламные кампании</button>
        <h1>Создание рекламной кампании</h1>
      </div>
      <div class="wizard-step">Шаг 3</div>
    </div>

    <div class="wizard-progress">
      <div class="wizard-progress-item complete">
        <span>1</span>
        <strong>Параметры РК</strong>
      </div>
      <div class="wizard-progress-line complete"></div>
      <div class="wizard-progress-item complete">
        <span>2</span>
        <strong>Подбор медиа</strong>
      </div>
      <div class="wizard-progress-line complete"></div>
      <div class="wizard-progress-item active">
        <span>3</span>
        <strong>Сплит</strong>
      </div>
      <div class="wizard-progress-line"></div>
      <div class="wizard-progress-item future">
        <span>4</span>
        <strong>Загрузка креатива</strong>
      </div>
    </div>

    <div class="split-budget-grid">
      <div class="split-budget-card">
        <span>Запланированный бюджет</span>
        <strong>${formatNumber(split.plannedBudget)} ₽</strong>
      </div>
      <div class="split-budget-card">
        <span>Предварительный бюджет</span>
        <strong>${formatNumber(split.preliminaryBudget)} ₽</strong>
      </div>
    </div>

    <section class="split-section">
      <div class="split-section-header">
        <h2>Подобрали для вас размещения:</h2>
      </div>
      <div class="media-card-list">
        ${split.placements.map(renderSplitPlacementCard).join("")}
      </div>
    </section>

    <section class="split-section suggested-section">
      <div class="split-section-header suggested-header">
        <h2>Могут подойти:</h2>
        <div class="suggested-controls">
          <input
            id="suggested-search"
            class="suggested-search"
            type="search"
            value="${suggestedSearch}"
            placeholder="Поиск по названию"
            aria-label="Поиск по названию"
          >
          <select id="suggested-sort" class="suggested-sort" aria-label="Сортировка каналов">
            <option value="relevance" ${suggestedSort === "relevance" ? "selected" : ""}>По релевантности</option>
            <option value="subscribers" ${suggestedSort === "subscribers" ? "selected" : ""}>По подписчикам</option>
            <option value="views" ${suggestedSort === "views" ? "selected" : ""}>По просмотрам</option>
            <option value="price" ${suggestedSort === "price" ? "selected" : ""}>По цене</option>
          </select>
        </div>
      </div>
      <div class="media-card-list" id="suggested-media-list"></div>
    </section>

    <div class="wizard-actions">
      <button class="secondary-button" id="campaign-back-step2">Назад</button>
      <button class="primary-button" id="campaign-next-step4">Далее</button>
    </div>
  `;

  document.querySelector("#exit-campaign-create").addEventListener("click", () => render("campaigns"));
  document.querySelector("#campaign-back-step2").addEventListener("click", () => render("campaign-create-step2"));
  document.querySelector("#campaign-next-step4").addEventListener("click", renderCampaignCreateStep4);

  bindSplitToggleButtons(screen);
  renderSuggestedPlacements();

  document.querySelector("#suggested-search").addEventListener("input", (event) => {
    suggestedSearch = event.target.value;
    renderSuggestedPlacements();
  });

  document.querySelector("#suggested-sort").addEventListener("change", (event) => {
    suggestedSort = event.target.value;
    renderSuggestedPlacements();
  });
};

function renderCampaignCreateStep4() {
  screen.innerHTML = `
    <div class="wizard-header">
      <div>
        <button class="back-button" id="exit-campaign-create">← Рекламные кампании</button>
        <h1>Создание рекламной кампании</h1>
      </div>
      <div class="wizard-step">Шаг 4</div>
    </div>

    <div class="wizard-progress">
      <div class="wizard-progress-item complete"><span>1</span><strong>Параметры РК</strong></div>
      <div class="wizard-progress-line complete"></div>
      <div class="wizard-progress-item complete"><span>2</span><strong>Подбор медиа</strong></div>
      <div class="wizard-progress-line complete"></div>
      <div class="wizard-progress-item complete"><span>3</span><strong>Сплит</strong></div>
      <div class="wizard-progress-line complete"></div>
      <div class="wizard-progress-item active"><span>4</span><strong>Загрузка креатива</strong></div>
    </div>

    <section class="panel creative-upload-panel">
      <div class="creative-upload-header">
        <h2>Загрузка креатива</h2>
        <p>Добавьте файл креатива для рекламной кампании.</p>
      </div>

      <div class="creative-drop-zone">
        <div class="creative-upload-icon">↑</div>
        <strong>Перетащите файл сюда</strong>
        <span>или</span>
        <button type="button" class="secondary-button">Выбрать файл</button>
      </div>
    </section>

    <div class="wizard-actions">
      <button class="secondary-button" id="campaign-back-step3">Назад</button>
      <button class="primary-button" id="campaign-next-step5">Далее</button>
    </div>
  `;

  document.querySelector("#exit-campaign-create").addEventListener("click", () => render("campaigns"));
  document.querySelector("#campaign-back-step3").addEventListener("click", () => render("campaign-create-step3"));
  document.querySelector("#campaign-next-step5").addEventListener("click", renderCampaignCreateStep5);
}

function renderCampaignCreateStep5() {
  screen.innerHTML = `
    <div class="wizard-header">
      <div>
        <button class="back-button" id="exit-campaign-create">← Рекламные кампании</button>
        <h1>Создание рекламной кампании</h1>
      </div>
      <div class="wizard-step">Следующий шаг</div>
    </div>

    <div class="wizard-progress">
      <div class="wizard-progress-item complete"><span>1</span><strong>Параметры РК</strong></div>
      <div class="wizard-progress-line complete"></div>
      <div class="wizard-progress-item complete"><span>2</span><strong>Подбор медиа</strong></div>
      <div class="wizard-progress-line complete"></div>
      <div class="wizard-progress-item complete"><span>3</span><strong>Сплит</strong></div>
      <div class="wizard-progress-line complete"></div>
      <div class="wizard-progress-item complete"><span>4</span><strong>Загрузка креатива</strong></div>
    </div>

    <div class="panel placeholder">
      <strong>Следующий шаг пока не определен</strong>
      <p>Содержимое следующего шага будет добавлено после уточнения.</p>
    </div>

    <div class="wizard-actions">
      <button class="secondary-button" id="campaign-back-step4">Назад</button>
    </div>
  `;

  document.querySelector("#exit-campaign-create").addEventListener("click", () => render("campaigns"));
  document.querySelector("#campaign-back-step4").addEventListener("click", renderCampaignCreateStep4);
}
