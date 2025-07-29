// 災情模擬資料 - 台南市
export const disasterData = [
  {
    id: "D001",
    location: "台南市中西區中正路一段",
    lat: 22.9908,
    lng: 120.2133,
    type: "積水",
    status: "處理中",
    description: "路面積水約30公分，影響交通",
    reportTime: "2024-07-19 08:30",
    images: [
      "/images/disasters/flood/積水.jpg",
      "/images/disasters/flood/積水2.jpg"
    ],
    reporter: "市民王小明",
    priority: "高"
  },
  {
    id: "D002",
    location: "台南市東區東門路二段",
    lat: 22.9757,
    lng: 120.2267,
    type: "倒塌",
    status: "待派遣",
    description: "建築物外牆磁磚掉落，有安全疑慮",
    reportTime: "2024-07-19 09:15",
    images: [
      "/images/disasters/collapse/D002_01_20240719091545.jpg"
    ],
    reporter: "路人李小華",
    priority: "緊急"
  },
  {
    id: "D003",
    location: "台南市南區健康路一段",
    lat: 22.9589,
    lng: 120.1906,
    type: "停電",
    status: "完成",
    description: "區域性停電已修復",
    reportTime: "2024-07-19 07:45",
    images: [],
    reporter: "台電維修人員",
    priority: "中"
  },
  {
    id: "D004",
    location: "台南市北區成功路三段",
    lat: 23.0050,
    lng: 120.2054,
    type: "積水",
    status: "處理中",
    description: "地下道積水，已封閉通行",
    reportTime: "2024-07-19 10:20",
    images: [
      "/images/disasters/flood/D004_01_20240719102034.jpg"
    ],
    reporter: "交通警察",
    priority: "高"
  },
  {
    id: "D005",
    location: "台南市安南區安中路一段",
    lat: 23.0364,
    lng: 120.1742,
    type: "土石流",
    status: "待派遣",
    description: "山坡地有土石鬆動跡象",
    reportTime: "2024-07-19 11:00",
    images: [
      "/images/disasters/landslide/D005_01_20240719110015.jpg",
      "/images/disasters/landslide/D005_02_20240719110032.jpg"
    ],
    reporter: "里長陳先生",
    priority: "緊急"
  },
  {
    id: "D006",
    location: "台南市安平區安平路一段",
    lat: 23.0014,
    lng: 120.1606,
    type: "火災",
    status: "完成",
    description: "小型火災已撲滅",
    reportTime: "2024-07-19 06:30",
    images: [],
    reporter: "消防隊",
    priority: "緊急"
  },
  {
    id: "D007",
    location: "台南市永康區中華路二段",
    lat: 23.0275,
    lng: 120.2563,
    type: "積水",
    status: "處理中",
    description: "市場周邊積水，攤商受影響",
    reportTime: "2024-07-19 09:45",
    images: [
      "/images/disasters/flood/D007_01_20240719094512.jpg"
    ],
    reporter: "市場管理員",
    priority: "中"
  },
  {
    id: "D008",
    location: "台南市歸仁區中山路三段",
    lat: 22.9637,
    lng: 120.2898,
    type: "停電",
    status: "待派遣",
    description: "社區停電，影響約200戶",
    reportTime: "2024-07-19 11:30",
    images: [],
    reporter: "社區管委會",
    priority: "高"
  }
];

// 災情類型定義 - 台灣自然風格
export const disasterTypes = [
  { value: "積水", label: "積水", color: "#0EA5E9", icon: "💧" }, // 台灣海洋藍
  { value: "倒塌", label: "倒塌", color: "#DC2626", icon: "🏗️" }, // 台灣紅土色
  { value: "停電", label: "停電", color: "#F59E0B", icon: "⚡" }, // 台灣金黃色
  { value: "土石流", label: "土石流", color: "#8B5CF6", icon: "🏔️" }, // 玉山紫色
  { value: "火災", label: "火災", color: "#EF4444", icon: "🔥" }, // 台灣夕陽橙
  { value: "其他", label: "其他", color: "#059669", icon: "❗" } // 台灣森林綠
];

// 處理狀態定義 - 台灣自然風格
export const statusTypes = [
  { value: "待派遣", label: "待派遣", color: "#DC2626" }, // 緊急紅
  { value: "處理中", label: "處理中", color: "#F59E0B" }, // 處理中橙
  { value: "完成", label: "完成", color: "#059669" } // 完成綠
];

// 優先級定義 - 台灣自然風格
export const priorityTypes = [
  { value: "緊急", label: "緊急", color: "#DC2626" }, // 緊急紅
  { value: "高", label: "高", color: "#F59E0B" }, // 高級橙
  { value: "中", label: "中", color: "#0EA5E9" }, // 中級藍
  { value: "低", label: "低", color: "#059669" } // 低級綠
];

