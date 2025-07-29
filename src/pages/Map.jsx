import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { disasterData, disasterTypes, statusTypes } from '@/data/disasterData';
import { ArrowLeft, Filter, MapPin, Clock, User, AlertTriangle, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

// 修復 Leaflet 圖標問題
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map = () => {
  const [selectedDisaster, setSelectedDisaster] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [filteredData, setFilteredData] = useState(disasterData);
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(isMobile);
  const mapRef = useRef(null);
  const zoomControlRef = useRef(null);

  useEffect(() => {
    if (filterType === 'all') {
      setFilteredData(disasterData);
    } else {
      setFilteredData(disasterData.filter(item => item.type === filterType));
    }
  }, [filterType]);

  // 響應式設計：在手機版預設收縮側邊欄
  useEffect(() => {
    setSidebarCollapsed(isMobile);
  }, [isMobile]);

  // 當側邊欄狀態改變時，重新調整地圖大小但保持當前視圖
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mapRef.current) {
        const map = mapRef.current;
        try {
          // 保存當前的中心點和縮放級別
          const currentCenter = map.getCenter();
          const currentZoom = map.getZoom();
          
          // 移除現有的縮放控制
          if (zoomControlRef.current) {
            map.removeControl(zoomControlRef.current);
          }
          
          // 重新計算地圖大小
          map.invalidateSize();
          
          // 恢復用戶的視圖位置，而不是重置到預設位置
          map.setView(currentCenter, currentZoom);
          
          // 重新添加縮放控制到固定位置 - 電腦版固定在右上角，手機版在右上角
          zoomControlRef.current = L.control.zoom({
            position: 'topright'
          }).addTo(map);
        } catch (error) {
          console.warn('地圖重新渲染時發生錯誤:', error);
        }
      }
    }, 350);
    
    return () => clearTimeout(timer);
  }, [sidebarCollapsed, isMobile]);

  const getStatusColor = (status) => {
    const statusType = statusTypes.find(s => s.value === status);
    return statusType ? statusType.color : '#6B7280';
  };

  const getTypeIcon = (type) => {
    const disasterType = disasterTypes.find(t => t.value === type);
    return disasterType ? disasterType.icon : '❗';
  };

  const createCustomIcon = (type, status) => {
    const icon = getTypeIcon(type);
    const color = getStatusColor(status);
    
    return L.divIcon({
      html: `<div style="background-color: ${color}; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">${icon}</div>`,
      className: 'custom-marker',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
  };

  return (
    <div className={`${isMobile ? 'h-screen' : 'h-screen'} taiwan-gradient ${isMobile ? 'flex flex-col' : 'flex flex-col'}`}>
      {/* Header - 手機版優化 */}
      <div className={`bg-white/80 backdrop-blur natural-shadow border-b border-emerald-200/30 flex-shrink-0 z-[1000]`}>
        <div className={`max-w-7xl mx-auto px-4 ${isMobile ? 'py-2' : 'py-3'}`}>
          <div className={`flex items-center ${isMobile ? 'justify-between' : 'justify-between'}`}>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild className="hover:bg-emerald-100/50 transition-all duration-300">
                <Link to="/">
                  <ArrowLeft className={`h-4 w-4 text-slate-600`} />
                </Link>
              </Button>
              <h1 className={`font-bold bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent ${isMobile ? 'text-base' : 'text-2xl'}`}>災情地圖</h1>
            </div>
            
            <div className="flex items-center gap-2">
              {!isMobile && <Filter className="h-3 w-3 text-slate-500" />}
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className={`border border-emerald-200 rounded-lg px-2 py-1 text-xs bg-white/80 backdrop-blur natural-shadow focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 ${isMobile ? 'min-w-[80px]' : 'min-w-[120px]'}`}
              >
                <option value="all">{isMobile ? '全部' : '所有災情'}</option>
                {disasterTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {isMobile ? type.label : `${type.icon} ${type.label}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className={`flex-1 relative overflow-hidden`} style={{ height: isMobile ? 'calc(100vh - 56px)' : 'calc(100vh - 75px)' }}>
        {/* Map Container */}
        <div className={`absolute inset-0 transition-all duration-300 ${
          sidebarCollapsed 
            ? 'left-0 right-0' 
            : isMobile 
              ? 'left-0 right-0' 
              : 'left-0 right-96'
        }`}>
          <MapContainer
            ref={mapRef}
            center={[22.9908, 120.2133]}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
            whenReady={(map) => {
              mapRef.current = map.target;
              // 初始添加縮放控制到固定位置
              zoomControlRef.current = L.control.zoom({
                position: 'topright'
              }).addTo(map.target);
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredData.map((disaster) => (
              <Marker
                key={disaster.id}
                position={[disaster.lat, disaster.lng]}
                icon={createCustomIcon(disaster.type, disaster.status)}
                eventHandlers={{
                  click: () => {
                    setSelectedDisaster(disaster);
                    if (isMobile) {
                      // 手機版延遲顯示側邊欄，避免地圖卡住
                      setTimeout(() => {
                        setSidebarCollapsed(false);
                      }, 100);
                    } else if (sidebarCollapsed) {
                      setSidebarCollapsed(false);
                    }
                  }
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold">{disaster.location}</h3>
                    <p className="text-sm text-gray-600">{disaster.type}</p>
                    <Badge 
                      style={{ backgroundColor: getStatusColor(disaster.status) }}
                      className="text-white"
                    >
                      {disaster.status}
                    </Badge>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* 通用切換按鈕 - 手機版優化 */}
        {sidebarCollapsed && (
          <div className={`fixed z-[10001] ${
            isMobile 
              ? 'bottom-6 right-6'
              : 'top-1/2 right-4 transform -translate-y-1/2'
          }`}>
            <Button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`rounded-full natural-shadow-lg text-white border-2 border-white/50 ${
                isMobile ? 'h-12 w-12' : 'h-10 w-10'
              } mountain-gradient hover:scale-110 transition-all duration-300`}
              size="sm"
            >
              {isMobile ? (
                <Menu className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}

        {/* Sidebar - 手機版優化 */}
        <div className={`${isMobile ? 'fixed inset-0 top-0' : 'absolute top-0 right-0 h-full'} bg-white/90 backdrop-blur natural-shadow-lg transition-all duration-300 z-[9999] ${
          sidebarCollapsed 
            ? isMobile 
              ? 'translate-x-full' 
              : 'translate-x-full'
            : 'translate-x-0 translate-y-0'
        } ${
          isMobile ? 'w-full border-0' : 'w-96 border-l border-emerald-200/30'
        }`} style={{ height: isMobile ? '100%' : '100%' }}>
          <div className="h-full flex flex-col overflow-hidden">
            {!sidebarCollapsed && (
              <>
                {/* Header with close button - 手機版優化 */}
                <div className={`flex items-center justify-between bg-gradient-to-r from-emerald-50/80 to-blue-50/80 backdrop-blur border-b border-emerald-200/30 ${isMobile ? 'p-3' : 'p-4'}`}>
                  {isMobile ? (
                    <Button
                      onClick={() => setSidebarCollapsed(true)}
                      variant="ghost"
                      size="sm"
                      className="hover:bg-emerald-100/50 transition-all duration-300"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2 text-slate-600" />
                      
                    </Button>
                  ) : (
                    <h2 className="font-semibold text-slate-700 text-lg">
                    </h2>
                  )}
                  <h2 className={`font-semibold bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent ${isMobile ? 'text-base' : 'text-lg'} ${isMobile ? 'ml-4' : ''}`}>
                    {selectedDisaster ? '災情詳情' : '災情列表'}
                  </h2>
                  {!isMobile && (
                    <Button
                      onClick={() => setSidebarCollapsed(true)}
                      variant="ghost"
                      size="sm"
                      className="hover:bg-emerald-100/50 transition-all duration-300"
                    >
                      <ChevronRight className="h-4 w-4 text-slate-600" />
                    </Button>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                  {selectedDisaster ? (
                    <div className={`${isMobile ? 'p-4' : 'p-6'}`}>
                      <Card className="natural-shadow bg-white/80 backdrop-blur border-emerald-200/30">
                        <CardHeader className={isMobile ? 'p-4' : ''}>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl filter drop-shadow-sm">{getTypeIcon(selectedDisaster.type)}</span>
                            <div>
                              <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} text-slate-700`}>{selectedDisaster.type}</CardTitle>
                              <p className="text-sm text-slate-500">編號: {selectedDisaster.id}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className={`space-y-4 ${isMobile ? 'p-4 pt-0' : ''}`}>
                          <div className="flex items-start gap-2 p-3 bg-emerald-50/50 rounded-lg border border-emerald-100/50">
                            <MapPin className="h-4 w-4 text-emerald-600 mt-1" />
                            <div>
                              <p className="font-medium text-slate-700">地點</p>
                              <p className="text-sm text-slate-600">{selectedDisaster.location}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2 p-3 bg-blue-50/50 rounded-lg border border-blue-100/50">
                            <AlertTriangle className="h-4 w-4 text-blue-600 mt-1" />
                            <div>
                              <p className="font-medium text-slate-700">災情描述</p>
                              <p className="text-sm text-slate-600">{selectedDisaster.description}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 p-3 bg-amber-50/50 rounded-lg border border-amber-100/50">
                            <Clock className="h-4 w-4 text-amber-600" />
                            <div>
                              <p className="font-medium text-slate-700">回報時間</p>
                              <p className="text-sm text-slate-600">{selectedDisaster.reportTime}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 p-3 bg-purple-50/50 rounded-lg border border-purple-100/50">
                            <User className="h-4 w-4 text-purple-600" />
                            <div>
                              <p className="font-medium text-slate-700">回報人</p>
                              <p className="text-sm text-slate-600">{selectedDisaster.reporter}</p>
                            </div>
                          </div>
                          
                          <div className="p-3 bg-slate-50/50 rounded-lg border border-slate-100/50">
                            <p className="font-medium mb-2 text-slate-700">處理狀態</p>
                            <Badge 
                              style={{ backgroundColor: getStatusColor(selectedDisaster.status) }}
                              className="text-white natural-shadow"
                            >
                              {selectedDisaster.status}
                            </Badge>
                          </div>
                          
                          {selectedDisaster.images && selectedDisaster.images.length > 0 && (
                            <div className="p-3 bg-rose-50/50 rounded-lg border border-rose-100/50">
                              <p className="font-medium mb-2 text-slate-700">相關圖片</p>
                              <div className={`grid gap-2 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                                {selectedDisaster.images.map((image, index) => (
                                  <img
                                    key={index}
                                    src={image}
                                    alt={`災情圖片 ${index + 1}`}
                                    className={`w-full object-cover rounded-lg border border-white/50 natural-shadow ${isMobile ? 'h-32' : 'h-20'}`}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="pt-4 border-t border-emerald-200/50">
                            <Button 
                              onClick={() => setSelectedDisaster(null)}
                              variant="outline"
                              className="w-full border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300"
                              size={isMobile ? "default" : "default"}
                            >
                              返回災情列表
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <div className={isMobile ? 'p-3' : 'p-6'}>
                      <div className="space-y-3">
                        {filteredData.map((disaster, index) => (
                          <Card 
                            key={disaster.id} 
                            className="cursor-pointer hover:scale-[1.02] hover:natural-shadow-lg transition-all duration-300 natural-shadow bg-white/80 backdrop-blur border-emerald-200/30"
                            onClick={() => setSelectedDisaster(disaster)}
                            style={{ 
                              animation: `fade-in-up 0.4s ease-out ${index * 0.05}s both`,
                            }}
                          >
                            <CardContent className={isMobile ? 'p-3' : 'p-4'}>
                              <div className="flex items-center gap-3">
                                <div className={`${isMobile ? 'text-2xl' : 'text-xl'} filter drop-shadow-sm p-2 rounded-lg bg-gradient-to-br from-white/50 to-slate-50/50 border border-emerald-100/50`}>
                                  {getTypeIcon(disaster.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`font-medium truncate text-slate-700 ${isMobile ? 'text-base' : 'text-sm'}`}>{disaster.location}</p>
                                  <p className={`text-slate-500 ${isMobile ? 'text-sm' : 'text-xs'}`}>{disaster.type}</p>
                                </div>
                                <Badge 
                                  style={{ backgroundColor: getStatusColor(disaster.status) }}
                                  className={`text-white shrink-0 natural-shadow ${isMobile ? 'text-sm' : 'text-xs'}`}
                                >
                                  {disaster.status}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;

