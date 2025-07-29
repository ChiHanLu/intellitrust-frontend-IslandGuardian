// 統計模擬資料
export const statisticsData = {
  // 每日災情新增趨勢
  dailyTrend: [
    { date: "7/15", count: 12 },
    { date: "7/16", count: 8 },
    { date: "7/17", count: 15 },
    { date: "7/18", count: 22 },
    { date: "7/19", count: 18 }
  ],
  
  // 各災種比例
  disasterTypeStats: [
    { type: "積水", count: 25, percentage: 45.5 },
    { type: "停電", count: 12, percentage: 21.8 },
    { type: "倒塌", count: 8, percentage: 14.5 },
    { type: "火災", count: 6, percentage: 10.9 },
    { type: "土石流", count: 4, percentage: 7.3 }
  ],
  
  // 各區處理進度 - 台南市
  areaProgress: [
    { area: "中西區", total: 15, pending: 3, processing: 7, completed: 5 },
    { area: "東區", total: 12, pending: 2, processing: 4, completed: 6 },
    { area: "南區", total: 8, pending: 1, processing: 2, completed: 5 },
    { area: "北區", total: 10, pending: 2, processing: 3, completed: 5 },
    { area: "安南區", total: 6, pending: 1, processing: 2, completed: 3 },
    { area: "安平區", total: 4, pending: 0, processing: 1, completed: 3 }
  ],
  
  // 處理狀態統計
  statusStats: [
    { status: "待派遣", count: 9, percentage: 16.4 },
    { status: "處理中", count: 19, percentage: 34.5 },
    { status: "完成", count: 27, percentage: 49.1 }
  ],
  
  // 優先級統計
  priorityStats: [
    { priority: "緊急", count: 8, percentage: 14.5 },
    { priority: "高", count: 15, percentage: 27.3 },
    { priority: "中", count: 22, percentage: 40.0 },
    { priority: "低", count: 10, percentage: 18.2 }
  ],
  
  // 關鍵指標
  keyMetrics: {
    totalReports: 55,
    processingCases: 19,
    completedCases: 27,
    completionRate: 49.1,
    averageResponseTime: "2.5小時",
    activeShelters: 4,
    totalCapacity: 1020,
    currentOccupancy: 425
  },

  // 當日放假機率
  holidayProbability: {
    probability: 75,
    reason: "豪雨警報持續，多處積水嚴重",
    riskLevel: "高",
    lastUpdated: "2024-07-19 14:30",
    factors: [
      { factor: "災情嚴重度", weight: 40, score: 85 },
      { factor: "氣象預報", weight: 30, score: 75 },
      { factor: "交通狀況", weight: 20, score: 60 },
      { factor: "公共設施", weight: 10, score: 70 }
    ]
  }
};

// AI 建議模擬資料 - 台南市
export const aiSuggestions = [
  {
    id: "AI001",
    type: "priority",
    title: "優先處理建議",
    content: "建議優先處理中西區積水案件，該區域案件數量較多且影響範圍廣泛",
    confidence: 85,
    timestamp: "2024-07-19 12:00"
  },
  {
    id: "AI002",
    type: "resource",
    title: "資源調配建議",
    content: "安南區土石流風險較高，建議增派工程人員前往現場評估",
    confidence: 92,
    timestamp: "2024-07-19 11:30"
  },
  {
    id: "AI003",
    type: "evacuation",
    title: "疏散建議",
    content: "東區避難所已滿，建議引導民眾前往南區避難所",
    confidence: 78,
    timestamp: "2024-07-19 13:45"
  }
];

// 時間序列資料（用於更詳細的趨勢分析）
export const timeSeriesData = {
  hourlyReports: [
    { hour: "06:00", count: 2 },
    { hour: "07:00", count: 3 },
    { hour: "08:00", count: 5 },
    { hour: "09:00", count: 4 },
    { hour: "10:00", count: 3 },
    { hour: "11:00", count: 2 },
    { hour: "12:00", count: 1 }
  ],
  
  weeklyTrend: [
    { week: "第1週", reports: 45, resolved: 38 },
    { week: "第2週", reports: 52, resolved: 41 },
    { week: "第3週", reports: 38, resolved: 35 },
    { week: "本週", reports: 55, resolved: 27 }
  ]
};

