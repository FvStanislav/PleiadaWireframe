const mockData = {
  client: {
    nickname: "@fvstanislav",
    balance: "1 250 000 ₽"
  },
  campaignCreation: {
    contentTypes: {
      longVideo: {
        label: "Длинные видео",
        platforms: ["VK Video", "YouTube"],
        placements: [
          "Видео рекламодателя",
          "Нативный текст рекламодателя",
          "Нативное объявление спонсора видео"
        ],
        additionalOptions: [
          "Конкурс (розыгрыш)",
          "Ссылка в описании",
          "Закрепленный комментарий",
          "Эксклюзивность категории"
        ]
      },
      shortForm: {
        label: "Short-form видео",
        platforms: ["VK Clips", "YouTube Shorts", "TikTok"],
        placements: [
          "Баннер",
          "Анимационный баннер",
          "Half screen"
        ],
        additionalOptions: [
          "Описание",
          "Закрепленный комментарий",
          "Эксклюзивность категории"
        ]
      },
      posts: {
        label: "Посты",
        platforms: ["VK", "Telegram", "Max"],
        placements: [
          "Пост",
          "Репост"
        ],
        additionalOptions: [
          "Перманентный пост",
          "Эксклюзивность категории"
        ]
      },
      outdoor: {
        label: "Наружная реклама",
        platforms: ["Наружная реклама"],
        placements: [
          "Биллборд",
          "Сити",
          "Пиллар",
          "Цифровой экран"
        ],
        additionalOptions: [
          "Эксклюзивность категории"
        ]
      }
    }
  },
  campaigns: [],
  contracts: [],
  media: []
};
