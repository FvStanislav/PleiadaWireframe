const campaignCreativeFiles = [
  {
    id: "creative-1",
    name: "vertical_video_01.mp4",
    kind: "Видео",
    dimensions: "430 × 1280",
    duration: "15 сек.",
    format: "MP4",
    size: "8,4 МБ"
  },
  {
    id: "creative-2",
    name: "horizontal_video_01.mp4",
    kind: "Видео",
    dimensions: "1920 × 1080",
    duration: "30 сек.",
    format: "MP4",
    size: "24,7 МБ"
  },
  {
    id: "creative-3",
    name: "square_video_01.mp4",
    kind: "Видео",
    dimensions: "1080 × 1080",
    duration: "12 сек.",
    format: "MP4",
    size: "14,2 МБ"
  },
  {
    id: "creative-4",
    name: "story_video_02.mp4",
    kind: "Видео",
    dimensions: "1080 × 1920",
    duration: "8 сек.",
    format: "MP4",
    size: "10,9 МБ"
  },
  {
    id: "creative-5",
    name: "key_visual_01.jpg",
    kind: "Изображение",
    dimensions: "1440 × 1080",
    duration: null,
    format: "JPG",
    size: "3,1 МБ"
  }
];

function renderCreativeFileCard(file) {
  return `
    <article class="creative-file-card">
      <div class="creative-file-preview">
        <span>${file.kind}</span>
        <strong>${file.dimensions}</strong>
      </div>
      <div class="creative-file-body">
        <h3>${file.name}</h3>
        <div class="creative-file-meta">
          <div><span>Тип</span><strong>${file.kind}</strong></div>
          <div><span>Разрешение</span><strong>${file.dimensions}</strong></div>
          ${file.duration ? `<div><span>Длительность</span><strong>${file.duration}</strong></div>` : ""}
          <div><span>Формат</span><strong>${file.format}</strong></div>
          <div><span>Размер</span><strong>${file.size}</strong></div>
        </div>
      </div>
    </article>
  `;
}

function renderCampaignCreatives() {
  screen.innerHTML = `
    <div class="creative-library-page">
      <button class="back-button" id="creative-library-back">← Управление рекламной кампанией</button>

      <div class="creative-library-header">
        <h1>Креативы</h1>
        <p>${mockData.campaignManagement.subtitle}</p>
      </div>

      <div class="creative-file-list">
        ${campaignCreativeFiles.map(renderCreativeFileCard).join("")}
      </div>
    </div>
  `;

  document.querySelector("#creative-library-back").addEventListener("click", renderCampaignManagement);
  setActiveNav("campaigns");
}