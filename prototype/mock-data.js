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
          price: 14800,
          relevance: 100,
          gender: { male: 55, female: 45 },
          age: [
            { label: "18–24", count: 3080 },
            { label: "25–34", count: 6160 },
            { label: "35–44", count: 3850 },
            { label: "45+", count: 2310 }
          ]
        },
        {
          id: "channel-2",
          type: "Канал",
          name: "Канал 2",
          subscribers: 18500,
          views: 41780,
          reach: 28600,
          er: 3.4,
          err: 5.1,
          publicationsPerMonth: 8,
          price: 22400,
          relevance: 96,
          gender: { male: 38, female: 62 },
          age: [
            { label: "18–24", count: 5720 },
            { label: "25–34", count: 10010 },
            { label: "35–44", count: 8008 },
            { label: "45+", count: 4862 }
          ]
        }
      ],
      suggestedPlacements: [
        {
          id: "channel-3",
          type: "Канал",
          name: "Канал 3",
          subscribers: 8200,
          views: 31200,
          reach: 20700,
          er: 2.8,
          err: 4.6,
          publicationsPerMonth: 6,
          price: 15400,
          relevance: 98,
          gender: { male: 63, female: 37 },
          age: [
            { label: "18–24", count: 4140 },
            { label: "25–34", count: 7452 },
            { label: "35–44", count: 5590 },
            { label: "45+", count: 3518 }
          ]
        },
        {
          id: "channel-4",
          type: "Канал",
          name: "Канал 4",
          subscribers: 46000,
          views: 79000,
          reach: 51500,
          er: 1.7,
          err: 3.2,
          publicationsPerMonth: 12,
          price: 32000,
          relevance: 92,
          gender: { male: 47, female: 53 },
          age: [
            { label: "18–24", count: 8240 },
            { label: "25–34", count: 18025 },
            { label: "35–44", count: 15450 },
            { label: "45+", count: 9785 }
          ]
        },
        {
          id: "channel-5",
          type: "Канал",
          name: "Канал 5",
          subscribers: 12500,
          views: 18400,
          reach: 14200,
          er: 4.1,
          err: 5.8,
          publicationsPerMonth: 4,
          price: 11800,
          relevance: 88,
          gender: { male: 29, female: 71 },
          age: [
            { label: "18–24", count: 3976 },
            { label: "25–34", count: 5254 },
            { label: "35–44", count: 3266 },
            { label: "45+", count: 1704 }
          ]
        }
      ]
    }
  },
  campaignManagement: {
    title: "Управление рекламной кампанией",
    subtitle: "Рекламная кампани 1",
    splits: [
      {
        id: "split-1",
        name: "Сплит 1",
        dateRange: "01.11.2026 — 30.11.2026",
        placementCount: 5,
        status: "В работе",
        channels: [
          {
            id: "management-channel-1",
            name: "Канал 1",
            status: "Отменен",
            placements: ["Размещение 1"]
          },
          {
            id: "management-channel-2",
            name: "Канал 2",
            status: "Заявка не отправлена",
            placements: ["Размещение 2"]
          }
        ]
      }
    ]
  },
  campaigns: [],
  contracts: [],
  media: []
};
