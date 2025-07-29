import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { shelterData, shelterStatus } from '@/data/shelterData';
import { ArrowLeft, Search, MapPin, Users, Phone, ExternalLink, Home, AlertTriangle, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
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

const Shelters = () => {
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredData, setFilteredData] = useState(shelterData);
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(isMobile);
  const mapRef = useRef(null);
  const zoomControlRef = useRef(null);

  useEffect(() => {
    let filtered = shelterData;
    
    // 搜尋過濾
    if (searchQuery) {
      filtered = filtered.filter(shelter => 
        shelter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shelter.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // 狀態過濾
    if (statusFilter !== 'all') {
      filtered = filtered.filter(shelter => shelter.status === statusFilter);
    }
    
    setFilteredData(filtered);
  }, [searchQuery, statusFilter]);

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
          
          // 重新添加縮放控制到正確位置
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

  const getShelterStatusColor = (status) => {
    const statusType = shelterStatus.find(s => s.value === status);
    return statusType ? statusType.color : '#6B7280';
  };

  const createShelterIcon = (status, capacity, currentOccupancy) => {
    const color = getShelterStatusColor(status);
    const occupancyRate = (currentOccupancy / capacity) * 100;
    
    let icon = '🏠';
    if (status === '已滿') icon = '🔴';
    else if (status === '準備中') icon = '🟡';
    else if (occupancyRate > 80) icon = '🟠';
    else icon = '🟢';
    
    return L.divIcon({
      html: `<div style="background-color: ${color}; color: white; border-radius: 50%; width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; font-size: 18px; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">${icon}</div>`,
      className: 'custom-shelter-marker',
      iconSize: [35, 35],
      iconAnchor: [17, 17]
    });
  };

  const openGoogleMaps = (address) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const getOccupancyWarning = (current, capacity) => {
    const rate = (current / capacity) * 100;
    if (rate >= 95) return { message: '⚠️ 已接近滿載', color: 'text-red-600' };
    if (rate >= 80) return { message: '⚠️ 即將達到最大容量', color: 'text-orange-600' };
    if (rate >= 60) return { message: '✅ 容量充足', color: 'text-green-600' };
    return { message: '✅ 大量空位可用', color: 'text-green-600' };
  };

  return (
    <div className={`${isMobile ? 'h-screen' : 'h-screen'} taiwan-gradient ${isMobile ? 'flex flex-col' : 'flex flex-col'}`}>
      {/* Header - 手機版優化 */}
      <div className={`bg-white/80 backdrop-blur natural-shadow border-b border-emerald-200/30 flex-shrink-0 z-[1000]`}>
        <div className={`max-w-7xl mx-auto px-4 ${isMobile ? 'py-2' : 'py-3'}`}>
          <div className={`flex items-center gap-4 ${isMobile ? 'flex-col space-y-2' : ''}`}>
            <div className="flex items-center gap-4 w-full">
              <Button variant="ghost" size="sm" asChild className="hover:bg-emerald-100/50 transition-all duration-300">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h1 className={`font-bold bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent ${isMobile ? 'text-base' : 'text-2xl'}`}>避難所查詢</h1>
            </div>
            
            <div className={`flex items-center gap-2 ${isMobile ? 'w-full' : 'ml-auto flex-row space-x-3'}`}>
              {/* 搜尋框 */}
              <div className={`relative ${isMobile ? 'w-full' : 'w-64'}`}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={isMobile ? "搜尋避難所..." : "搜尋避難所名稱或地址..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 text-sm ${isMobile ? 'w-full text-xs' : ''}`}
                />
              </div>
              {/* 狀態過濾 */}
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`border border-gray-300 rounded-md px-2 py-1 text-sm ${isMobile ? 'w-full text-xs' : 'w-32'}`}
              >
                <option value="all">{isMobile ? '全部' : '全部狀態'}</option>
                {shelterStatus.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className={`flex-1 relative overflow-hidden`} style={{ height: isMobile ? 'calc(100vh - 95px)' : 'calc(100vh - 85px)' }}>
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
              // 初始添加縮放控制
              zoomControlRef.current = L.control.zoom({
                position: 'topright'
              }).addTo(map.target);
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredData.map((shelter) => (
              <Marker
                key={shelter.id}
                position={[shelter.lat, shelter.lng]}
                icon={createShelterIcon(shelter.status, shelter.capacity, shelter.currentOccupancy)}
                eventHandlers={{
                  click: () => {
                    setSelectedShelter(shelter);
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
                    <h3 className="font-semibold">{shelter.name}</h3>
                    <p className="text-sm text-gray-600">{shelter.address}</p>
                    <Badge 
                      style={{ backgroundColor: getShelterStatusColor(shelter.status) }}
                      className="text-white mt-1"
                    >
                      {shelter.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">
                      容量: {shelter.currentOccupancy}/{shelter.capacity}
                    </p>
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
              className={`rounded-full shadow-xl text-white border-2 border-white ${
                isMobile ? 'h-12 w-12' : 'h-10 w-10'
              } bg-blue-600 hover:bg-blue-700`}
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
        <div className={`${isMobile ? 'fixed inset-0 top-0' : 'absolute top-0 right-0 h-full'} bg-white shadow-lg transition-all duration-300 z-[9999] ${
          sidebarCollapsed 
            ? isMobile 
              ? 'translate-x-full' 
              : 'translate-x-full'
            : 'translate-x-0 translate-y-0'
        } ${
          isMobile ? 'w-full border-0' : 'w-96 border-l'
        }`} style={{ height: isMobile ? '100%' : '100%' }}>
          <div className="h-full flex flex-col overflow-hidden">
            {!sidebarCollapsed && (
              <>
                {/* Header with close button - 手機版優化 */}
                <div className={`flex items-center justify-between bg-gray-50 border-b ${isMobile ? 'p-3' : 'p-4'}`}>
                  {isMobile ? (
                    <Button
                      onClick={() => setSidebarCollapsed(true)}
                      variant="ghost"
                      size="sm"
                      className="hover:bg-gray-200"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      
                    </Button>
                  ) : (
                    <h2 className="font-semibold text-gray-900 text-lg">
                      {selectedShelter ? '避難所詳情' : '避難所列表'}
                    </h2>
                  )}
                  <h2 className={`font-semibold text-gray-900 ${isMobile ? 'text-base' : 'text-lg'} ${isMobile ? 'ml-4' : ''}`}>
                    {selectedShelter ? '避難所詳情' : '避難所列表'}
                  </h2>
                  {!isMobile && (
                    <Button
                      onClick={() => setSidebarCollapsed(true)}
                      variant="ghost"
                      size="sm"
                      className="hover:bg-gray-200"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                  {selectedShelter ? (
                    <div className={`${isMobile ? 'p-4' : 'p-6'}`}>
                      <Card>
                        <CardHeader className={isMobile ? 'p-4' : ''}>
                          <div className="flex items-center gap-2">
                            <Home className="h-6 w-6 text-blue-600" />
                            <div>
                              <CardTitle className={isMobile ? 'text-base' : 'text-lg'}>{selectedShelter.name}</CardTitle>
                              <p className="text-sm text-gray-600">編號: {selectedShelter.id}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className={`space-y-4 ${isMobile ? 'p-4 pt-0' : ''}`}>
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                            <div>
                              <p className="font-medium">地址</p>
                              <p className="text-sm text-gray-600">{selectedShelter.address}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="font-medium">容量狀況</p>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      selectedShelter.currentOccupancy / selectedShelter.capacity > 0.8 
                                        ? 'bg-red-500' 
                                        : selectedShelter.currentOccupancy / selectedShelter.capacity > 0.6 
                                        ? 'bg-orange-500' 
                                        : 'bg-green-500'
                                    }`}
                                    style={{ 
                                      width: `${(selectedShelter.currentOccupancy / selectedShelter.capacity) * 100}%` 
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-600">
                                  {selectedShelter.currentOccupancy}/{selectedShelter.capacity}
                                </span>
                              </div>
                              <p className={`text-xs mt-1 ${getOccupancyWarning(selectedShelter.currentOccupancy, selectedShelter.capacity).color}`}>
                                {getOccupancyWarning(selectedShelter.currentOccupancy, selectedShelter.capacity).message}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="font-medium">聯絡資訊</p>
                              <p className="text-sm text-gray-600">{selectedShelter.contact}</p>
                              <p className="text-sm text-gray-600">負責人: {selectedShelter.manager}</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="font-medium mb-2">開放狀態</p>
                            <Badge 
                              style={{ backgroundColor: getShelterStatusColor(selectedShelter.status) }}
                              className="text-white"
                            >
                              {selectedShelter.status}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">
                              開放時間: {selectedShelter.openTime}
                            </p>
                          </div>
                          
                          <div>
                            <p className="font-medium mb-2">設施服務</p>
                            <div className="flex flex-wrap gap-1">
                              {selectedShelter.facilities.map((facility, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {facility}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className={`pt-4 border-t space-y-2 ${isMobile ? 'space-y-3' : ''}`}>
                            <Button 
                              onClick={() => openGoogleMaps(selectedShelter.address)}
                              className="w-full"
                              size={isMobile ? "default" : "default"}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              導航至此避難所
                            </Button>
                            <Button 
                              onClick={() => setSelectedShelter(null)}
                              variant="outline"
                              className="w-full"
                              size={isMobile ? "default" : "default"}
                            >
                              返回避難所列表
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <div className={isMobile ? 'p-3' : 'p-4'}>
                      <div className="space-y-3">
                        {filteredData.length === 0 ? (
                          <div className="text-center py-8">
                            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500">沒有找到符合條件的避難所</p>
                          </div>
                        ) : (
                          filteredData.map((shelter) => {
                            const occupancyRate = (shelter.currentOccupancy / shelter.capacity) * 100;
                            const warning = getOccupancyWarning(shelter.currentOccupancy, shelter.capacity);
                            
                            return (
                              <Card 
                                key={shelter.id} 
                                className="cursor-pointer hover:shadow-md transition-shadow"
                                onClick={() => setSelectedShelter(shelter)}
                              >
                                <CardContent className={isMobile ? 'p-3' : 'p-4'}>
                                  <div className="flex items-start gap-3">
                                    <div className={`rounded-full flex items-center justify-center text-lg ${isMobile ? 'w-10 h-10' : 'w-8 h-8'}`}
                                         style={{ backgroundColor: getShelterStatusColor(shelter.status) }}>
                                      🏠
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between mb-1">
                                        <p className={`font-medium truncate ${isMobile ? 'text-base' : 'text-sm'}`}>{shelter.name}</p>
                                        <Badge 
                                          style={{ backgroundColor: getShelterStatusColor(shelter.status) }}
                                          className={`text-white shrink-0 ml-2 ${isMobile ? 'text-sm' : 'text-xs'}`}
                                        >
                                          {shelter.status}
                                        </Badge>
                                      </div>
                                      <p className={`text-gray-600 truncate mb-2 ${isMobile ? 'text-sm' : 'text-xs'}`}>{shelter.address}</p>
                                      <div className="flex items-center justify-between">
                                        <span className={`text-gray-500 ${isMobile ? 'text-sm' : 'text-xs'}`}>
                                          {shelter.currentOccupancy}/{shelter.capacity} 人
                                        </span>
                                        <span className={`${warning.color} ${isMobile ? 'text-sm' : 'text-xs'}`}>
                                          {warning.message}
                                        </span>
                                      </div>
                                      <div className={`w-full bg-gray-200 rounded-full mt-1 ${isMobile ? 'h-2' : 'h-1'}`}>
                                        <div 
                                          className={`rounded-full ${isMobile ? 'h-2' : 'h-1'} ${
                                            occupancyRate > 80 ? 'bg-red-500' : 
                                            occupancyRate > 60 ? 'bg-orange-500' : 'bg-green-500'
                                          }`}
                                          style={{ width: `${occupancyRate}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })
                        )}
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

export default Shelters;
