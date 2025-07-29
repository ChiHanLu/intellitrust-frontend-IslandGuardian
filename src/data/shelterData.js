// 避難所模擬資料 - 台南市
export const shelterData = [
  {
    id: "S001",
    name: "中西區公所避難所",
    address: "台南市中西區開山路1號",
    lat: 22.9908,
    lng: 120.2080,
    capacity: 200,
    currentOccupancy: 150,
    status: "開放",
    facilities: ["飲水", "廁所", "醫療", "通訊"],
    contact: "06-2267-151",
    manager: "王區長",
    openTime: "2024-07-19 08:00"
  },
  {
    id: "S002",
    name: "東區活動中心",
    address: "台南市東區崇德路588號",
    lat: 22.9757,
    lng: 120.2267,
    capacity: 150,
    currentOccupancy: 150,
    status: "已滿",
    facilities: ["飲水", "廁所", "通訊"],
    contact: "06-2686-751",
    manager: "李主任",
    openTime: "2024-07-19 09:00"
  },
  {
    id: "S003",
    name: "南區體育館",
    address: "台南市南區體育路10號",
    lat: 22.9589,
    lng: 120.1906,
    capacity: 300,
    currentOccupancy: 80,
    status: "開放",
    facilities: ["飲水", "廁所", "醫療", "通訊", "淋浴"],
    contact: "06-2151-006",
    manager: "陳主任",
    openTime: "2024-07-19 07:30"
  },
  {
    id: "S004",
    name: "北區區民活動中心",
    address: "台南市北區公園路96號",
    lat: 23.0050,
    lng: 120.2054,
    capacity: 120,
    currentOccupancy: 45,
    status: "開放",
    facilities: ["飲水", "廁所", "通訊"],
    contact: "06-2252-121",
    manager: "張里長",
    openTime: "2024-07-19 10:00"
  },
  {
    id: "S005",
    name: "安南區運動中心",
    address: "台南市安南區安中路四段515號",
    lat: 23.0364,
    lng: 120.1742,
    capacity: 250,
    currentOccupancy: 0,
    status: "準備中",
    facilities: ["飲水", "廁所", "醫療", "通訊", "淋浴"],
    contact: "06-2567-892",
    manager: "劉經理",
    openTime: "預計2024-07-19 16:00"
  }
];

// 避難所狀態定義
export const shelterStatus = [
  { value: "開放", label: "開放中", color: "#10B981" },
  { value: "已滿", label: "已滿", color: "#EF4444" },
  { value: "準備中", label: "準備中", color: "#F59E0B" },
  { value: "關閉", label: "已關閉", color: "#6B7280" }
];

// 避難所設施定義
export const shelterFacilities = [
  { value: "飲水", label: "飲水設備", icon: "💧" },
  { value: "廁所", label: "廁所設備", icon: "🚻" },
  { value: "醫療", label: "醫療設備", icon: "🏥" },
  { value: "通訊", label: "通訊設備", icon: "📞" },
  { value: "淋浴", label: "淋浴設備", icon: "🚿" },
  { value: "餐飲", label: "餐飲服務", icon: "🍽️" }
];

