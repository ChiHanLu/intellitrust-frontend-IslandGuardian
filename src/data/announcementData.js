// 公告模擬資料 - 台南市
export const announcementData = [
  {
    id: "A001",
    title: "7/20 停水通知",
    content: "因管線維修，中西區部分地區將於7/20上午8時至下午6時停水，請民眾提前儲水。",
    type: "停水",
    priority: "高",
    publishTime: "2024-07-19 14:00",
    effectiveTime: "2024-07-20 08:00",
    area: "中西區"
  },
  {
    id: "A002",
    title: "東區避難所人數已滿",
    content: "位於東區的避難所已達收容上限，請民眾前往南區體育館或北區活動中心。",
    type: "避難",
    priority: "緊急",
    publishTime: "2024-07-19 13:30",
    effectiveTime: "2024-07-19 13:30",
    area: "東區"
  },
  {
    id: "A003",
    title: "交通管制通知",
    content: "因積水嚴重，中正路一段實施交通管制，請用路人改道行駛。",
    type: "交通",
    priority: "中",
    publishTime: "2024-07-19 12:15",
    effectiveTime: "2024-07-19 12:15",
    area: "中西區"
  },
  {
    id: "A004",
    title: "緊急疏散通知",
    content: "安南區安中路一段因土石流風險，建議居民暫時疏散至安全地點。",
    type: "疏散",
    priority: "緊急",
    publishTime: "2024-07-19 11:45",
    effectiveTime: "2024-07-19 11:45",
    area: "安南區"
  },
  {
    id: "A005",
    title: "物資發放通知",
    content: "災區物資發放點已設置完成，發放時間為每日上午9時至下午5時。",
    type: "物資",
    priority: "中",
    publishTime: "2024-07-19 10:00",
    effectiveTime: "2024-07-19 10:00",
    area: "全市"
  }
];

// 公告類型定義
export const announcementTypes = [
  { value: "停水", label: "停水通知", color: "#3B82F6" },
  { value: "避難", label: "避難資訊", color: "#EF4444" },
  { value: "交通", label: "交通管制", color: "#F59E0B" },
  { value: "疏散", label: "緊急疏散", color: "#DC2626" },
  { value: "物資", label: "物資發放", color: "#10B981" },
  { value: "其他", label: "其他通知", color: "#6B7280" }
];

