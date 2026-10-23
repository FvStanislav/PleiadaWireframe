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
    },
    mediaSelection: {
      topics: ["Авто", "Недвижимость", "Здоровье", "Психология"],
      geography: {
        "Россия": ["Москва", "Пермь"],
        "Китай": ["Пекин", "Шанхай"]
      },
      gender: ["Мужской", "Женский"]
    },
    split: {
      plannedBudget: 50000,
      preliminaryBudget: 48400,
      placements: [
        {
          id: "channel-1",
          type: "Канал",
          name: "Канал 1",
          subscribers: 3000,
          views: 23413,
          reach: 15400,
          er: 2,
          err: 4,
          publicationsPerMonth: 5,
          gender: {
            male: 55,
            female: 45
          },
          age: [
            { label: "18–24", count: 3080 },
            { label: "25–34", count: 6160 },
            { label: "35–44", count: 3850 },
            { label: "45+", count: 2310 }
          ]
        }
      ]
    }
  },
  campaigns: [],
  contracts: [],
  media: []
};
