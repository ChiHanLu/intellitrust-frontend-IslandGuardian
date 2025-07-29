// 物資需求模擬資料
export const resourceData = [
  {
    id: "RES001",
    type: "需求",
    location: "台南市中西區開山路社區",
    contact: "王里長",
    phone: "06-2267-151",
    items: ["飲用水", "食物", "毛毯"],
    urgency: "緊急",
    people: 50,
    description: "颱風過後社區停水停電，急需民生物資",
    timestamp: "2024-07-19 14:30",
    status: "待處理"
  },
  {
    id: "RES002",
    type: "捐贈",
    location: "台南市東區大學路慈善團體",
    contact: "張主任",
    phone: "06-2686-888",
    items: ["食物", "衣物", "急救包"],
    urgency: "一般",
    people: 100,
    description: "本團體有充足物資可供災區民眾使用",
    timestamp: "2024-07-19 13:15",
    status: "可提供"
  },
  {
    id: "RES003",
    type: "需求",
    location: "台南市南區金華路避難所",
    contact: "李所長",
    phone: "06-2151-006",
    items: ["藥品", "嬰兒用品", "輪椅"],
    urgency: "緊急",
    people: 25,
    description: "避難所內有長者及嬰幼兒需要特殊照護物資",
    timestamp: "2024-07-19 15:45",
    status: "待處理"
  },
  {
    id: "RES004",
    type: "捐贈",
    location: "台南市北區企業物流中心",
    contact: "陳經理",
    phone: "06-2345-678",
    items: ["飲用水", "泡麵", "手電筒"],
    urgency: "一般",
    people: 200,
    description: "企業捐贈大量救災物資，可配送到各需求點",
    timestamp: "2024-07-19 12:00",
    status: "可提供"
  },
  {
    id: "RES005",
    type: "需求",
    location: "台南市安平區文平路社區",
    contact: "劉村長",
    phone: "06-3910-123",
    items: ["發電機", "抽水機", "雨衣"],
    urgency: "緊急",
    people: 80,
    description: "社區積水嚴重，需要排水設備及防護用品",
    timestamp: "2024-07-19 16:20",
    status: "待處理"
  },
  {
    id: "RES006",
    type: "捐贈",
    location: "台南市善化區志工服務站",
    contact: "周組長",
    phone: "06-5817-456",
    items: ["毛毯", "睡袋", "枕頭"],
    urgency: "一般",
    people: 60,
    description: "志工團體募集住宿用品，可提供給避難民眾",
    timestamp: "2024-07-19 11:30",
    status: "可提供"
  }
];

export const resourceTypes = [
  { value: "需求", label: "物資需求", color: "#EF4444", icon: "🆘" },
  { value: "捐贈", label: "物資捐贈", color: "#10B981", icon: "❤️" }
];

export const urgencyTypes = [
  { value: "緊急", label: "緊急", color: "#DC2626" },
  { value: "一般", label: "一般", color: "#F59E0B" },
  { value: "低", label: "低優先", color: "#6B7280" }
];

export const resourceStatus = [
  { value: "待處理", label: "待處理", color: "#F59E0B" },
  { value: "處理中", label: "處理中", color: "#3B82F6" },
  { value: "已完成", label: "已完成", color: "#10B981" },
  { value: "可提供", label: "可提供", color: "#10B981" },
  { value: "已分配", label: "已分配", color: "#6B7280" }
];
