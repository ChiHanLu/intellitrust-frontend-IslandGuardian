import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, MapPin, Clock, Users, Phone, ExternalLink, Megaphone, Home, Package, Heart, HandHeart } from 'lucide-react';
import { disasterData, disasterTypes, statusTypes } from '@/data/disasterData';
import { announcementData, announcementTypes } from '@/data/announcementData';
import { shelterData, shelterStatus } from '@/data/shelterData';
import { resourceData, resourceTypes, urgencyTypes, resourceStatus } from '@/data/resourceData';
import { useIsMobile } from '@/hooks/use-mobile';

const Public = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('announcements');
  const isMobile = useIsMobile();

  // 手機版打開頁面時滾動到頂部
  useEffect(() => {
    if (isMobile) {
      window.scrollTo(0, 0);
    }
  }, [isMobile]);

  // 過濾災情資料
  const filteredDisasters = useMemo(() => {
    if (!searchQuery) return disasterData;
    return disasterData.filter(disaster => 
      disaster.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disaster.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disaster.type.includes(searchQuery)
    );
  }, [searchQuery]);

  // 過濾公告資料
  const filteredAnnouncements = useMemo(() => {
    if (!searchQuery) return announcementData;
    return announcementData.filter(announcement => 
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.area.includes(searchQuery)
    );
  }, [searchQuery]);

  // 過濾避難所資料
  const filteredShelters = useMemo(() => {
    if (!searchQuery) return shelterData;
    return shelterData.filter(shelter => 
      shelter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shelter.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // 過濾物資需求資料
  const filteredResources = useMemo(() => {
    if (!searchQuery) return resourceData;
    return resourceData.filter(resource => 
      resource.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.items.some(item => item.toLowerCase().includes(searchQuery.toLowerCase())) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const getStatusColor = (status) => {
    const statusType = statusTypes.find(s => s.value === status);
    return statusType ? statusType.color : '#6B7280';
  };

  const getTypeIcon = (type) => {
    const disasterType = disasterTypes.find(t => t.value === type);
    return disasterType ? disasterType.icon : '❗';
  };

  const getAnnouncementColor = (type) => {
    const announcementType = announcementTypes.find(t => t.value === type);
    return announcementType ? announcementType.color : '#6B7280';
  };

  const getShelterStatusColor = (status) => {
    const statusType = shelterStatus.find(s => s.value === status);
    return statusType ? statusType.color : '#6B7280';
  };

  const getResourceTypeColor = (type) => {
    const resourceType = resourceTypes.find(t => t.value === type);
    return resourceType ? resourceType.color : '#6B7280';
  };

  const getResourceTypeIcon = (type) => {
    const resourceType = resourceTypes.find(t => t.value === type);
    return resourceType ? resourceType.icon : '📦';
  };

  const getUrgencyColor = (urgency) => {
    const urgencyType = urgencyTypes.find(u => u.value === urgency);
    return urgencyType ? urgencyType.color : '#6B7280';
  };

  const getResourceStatusColor = (status) => {
    const statusType = resourceStatus.find(s => s.value === status);
    return statusType ? statusType.color : '#6B7280';
  };

  const openGoogleMaps = (address) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className={`flex items-center gap-4 ${isMobile ? 'flex-col space-y-2' : ''}`}>
            <div className="flex items-center gap-4 w-full">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />

                </Link>
              </Button>
              <h1 className={`font-bold text-gray-900 ${isMobile ? 'text-xl' : 'text-2xl'}`}>公開查詢平台</h1>
            </div>
          </div>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto p-4 ${isMobile ? 'py-4' : 'py-8'}`}>
        {/* Search Bar */}
        <Card className={`mb-6 ${isMobile ? 'mb-4' : 'mb-8'}`}>
          <CardContent className={isMobile ? 'p-4' : 'p-6'}>
            <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-center'} gap-4`}>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={isMobile ? "搜尋地點、編號..." : "搜尋地點、災情編號或關鍵字..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              {!isMobile && (
                <Button variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  搜尋
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className={`flex gap-2 mb-6 ${isMobile ? 'grid grid-cols-2 gap-2 mb-4' : 'flex-wrap'}`}>
          <Button 
            variant={activeTab === 'announcements' ? 'default' : 'outline'}
            onClick={() => setActiveTab('announcements')}
            className={isMobile ? 'text-sm' : ''}
          >
            公告資訊
          </Button>
          <Button 
            variant={activeTab === 'disasters' ? 'default' : 'outline'}
            onClick={() => setActiveTab('disasters')}
            className={isMobile ? 'text-sm' : ''}
          >
            災情查詢
          </Button>
          <Button 
            variant={activeTab === 'shelters' ? 'default' : 'outline'}
            onClick={() => setActiveTab('shelters')}
            className={isMobile ? 'text-sm' : ''}
          >
            避難所資訊
          </Button>
          <Button 
            variant={activeTab === 'resources' ? 'default' : 'outline'}
            onClick={() => setActiveTab('resources')}
            className={isMobile ? 'text-sm' : ''}
          >
            物資需求
          </Button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'disasters' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">災情資訊</h2>
              <span className="text-sm text-gray-500">共 {filteredDisasters.length} 筆資料</span>
            </div>
            
            <div className="grid gap-4">
              {filteredDisasters.map((disaster) => (
                <Card key={disaster.id} className="hover:shadow-md transition-shadow">
                  <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
                    <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-start justify-between'}`}>
                      <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-start gap-4 flex-1'}`}>
                        <div className={`flex items-center gap-3 ${isMobile ? 'w-full' : ''}`}>
                          <div className={`${isMobile ? 'text-2xl' : 'text-3xl'}`}>{getTypeIcon(disaster.type)}</div>
                          <div className={`flex-1 ${isMobile ? 'min-w-0' : ''}`}>
                            <div className={`flex ${isMobile ? 'flex-col space-y-1' : 'items-center gap-2'} mb-2`}>
                              <h3 className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'} ${isMobile ? 'truncate' : ''}`}>{disaster.type}</h3>
                              <Badge 
                                style={{ backgroundColor: getStatusColor(disaster.status) }}
                                className={`text-white ${isMobile ? 'self-start text-xs' : ''}`}
                              >
                                {disaster.status}
                              </Badge>
                            </div>
                          </div>
                          {isMobile && (
                            <div className="text-right shrink-0">
                              <p className="text-xs font-medium text-gray-900">編號: {disaster.id}</p>
                              <Badge 
                                style={{ backgroundColor: getStatusColor(disaster.status) }}
                                className="text-white text-xs mt-1"
                              >
                                {disaster.status}
                              </Badge>
                            </div>
                          )}
                        </div>
                        <div className={`${isMobile ? 'w-full' : 'flex-1'}`}>
                          <div className={`space-y-2 ${isMobile ? 'text-sm' : 'text-sm'} text-gray-600`}>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 shrink-0" />
                              <span className={isMobile ? 'truncate' : ''}>{disaster.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 shrink-0" />
                              <span className={isMobile ? 'text-xs' : ''}>回報時間: {disaster.reportTime}</span>
                            </div>
                            {!isMobile && (
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 shrink-0" />
                                <span>回報人: {disaster.reporter}</span>
                              </div>
                            )}
                            <p className={`mt-2 ${isMobile ? 'text-sm line-clamp-2' : ''}`}>{disaster.description}</p>
                          </div>
                        </div>
                      </div>
                      {!isMobile && (
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">編號: {disaster.id}</p>
                          <p className="text-xs text-gray-500 mt-1">回報人: {disaster.reporter}</p>
                        </div>
                      )}
                    </div>
                    {isMobile && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500">回報人: {disaster.reporter}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">公告資訊</h2>
              <span className="text-sm text-gray-500">共 {filteredAnnouncements.length} 筆公告</span>
            </div>
            
            <div className="grid gap-4">
              {filteredAnnouncements.map((announcement) => (
                <Card key={announcement.id} className="hover:shadow-md transition-shadow">
                  <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
                    <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-start justify-between'}`}>
                      <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-start gap-4 flex-1'}`}>
                        <div className={`flex items-center gap-3 ${isMobile ? 'w-full' : ''}`}>
                          <Megaphone className={`text-blue-600 mt-1 ${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} />
                          <div className={`flex-1 ${isMobile ? 'min-w-0' : ''}`}>
                            <div className={`flex ${isMobile ? 'flex-col space-y-1' : 'items-center gap-2'} mb-2`}>
                              <h3 className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'} ${isMobile ? 'line-clamp-2' : ''}`}>{announcement.title}</h3>
                              <div className={`flex ${isMobile ? 'flex-wrap' : ''} gap-1`}>
                                <Badge 
                                  style={{ backgroundColor: getAnnouncementColor(announcement.type) }}
                                  className={`text-white ${isMobile ? 'text-xs' : ''}`}
                                >
                                  {announcement.type}
                                </Badge>
                                {announcement.priority === '緊急' && (
                                  <Badge variant="destructive" className={isMobile ? 'text-xs' : ''}>緊急</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          {isMobile && (
                            <div className="text-right shrink-0">
                              <p className="text-xs text-gray-500">編號: {announcement.id}</p>
                            </div>
                          )}
                        </div>
                        <div className={`${isMobile ? 'w-full' : 'flex-1'}`}>
                          <p className={`text-gray-700 mb-3 ${isMobile ? 'text-sm line-clamp-3' : ''}`}>{announcement.content}</p>
                          <div className={`flex ${isMobile ? 'flex-col space-y-1' : 'items-center gap-4'} text-sm text-gray-500`}>
                            <span className={isMobile ? 'text-xs' : ''}>發布時間: {announcement.publishTime}</span>
                            <span className={isMobile ? 'text-xs' : ''}>影響區域: {announcement.area}</span>
                          </div>
                        </div>
                      </div>
                      {!isMobile && (
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">編號: {announcement.id}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'shelters' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">避難所資訊</h2>
              <span className="text-sm text-gray-500">共 {filteredShelters.length} 個避難所</span>
            </div>
            
            <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
              {filteredShelters.map((shelter) => (
                <Card key={shelter.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className={isMobile ? 'p-4 pb-2' : ''}>
                    <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center justify-between'}`}>
                      <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} ${isMobile ? 'line-clamp-2' : ''}`}>{shelter.name}</CardTitle>
                      <Badge 
                        style={{ backgroundColor: getShelterStatusColor(shelter.status) }}
                        className={`text-white ${isMobile ? 'self-start text-xs' : ''}`}
                      >
                        {shelter.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className={`space-y-4 ${isMobile ? 'p-4 pt-0' : ''}`}>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-1 shrink-0" />
                      <div>
                        <p className={`font-medium ${isMobile ? 'text-sm' : 'text-sm'}`}>地址</p>
                        <p className={`text-gray-600 ${isMobile ? 'text-sm line-clamp-2' : 'text-sm'}`}>{shelter.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500 shrink-0" />
                      <div>
                        <p className={`font-medium ${isMobile ? 'text-sm' : 'text-sm'}`}>收容情況</p>
                        <p className={`text-gray-600 ${isMobile ? 'text-sm' : 'text-sm'}`}>
                          {shelter.currentOccupancy} / {shelter.capacity} 人
                          <span className={`ml-2 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                            ({Math.round((shelter.currentOccupancy / shelter.capacity) * 100)}% 滿)
                          </span>
                        </p>
                      </div>
                    </div>
                    
                    <div className={`flex ${isMobile ? 'flex-col space-y-1' : 'items-center'} gap-2`}>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500 shrink-0" />
                        <div>
                          <p className={`font-medium ${isMobile ? 'text-sm' : 'text-sm'}`}>聯絡資訊</p>
                          <p className={`text-gray-600 ${isMobile ? 'text-sm' : 'text-sm'}`}>{shelter.contact}</p>
                          {isMobile && (
                            <p className="text-xs text-gray-500">負責人: {shelter.manager}</p>
                          )}
                        </div>
                      </div>
                      {!isMobile && (
                        <p className="text-xs text-gray-500">負責人: {shelter.manager}</p>
                      )}
                    </div>
                    
                    <div>
                      <p className={`font-medium mb-2 ${isMobile ? 'text-sm' : 'text-sm'}`}>設施</p>
                      <div className="flex flex-wrap gap-1">
                        {shelter.facilities.map((facility) => (
                          <Badge key={facility} variant="outline" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className={`flex gap-2 ${isMobile ? 'flex-col space-y-2' : ''}`}>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className={isMobile ? 'w-full' : 'flex-1'}
                        onClick={() => openGoogleMaps(shelter.address)}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        導航
                      </Button>
                      <Button size="sm" variant="outline" asChild className={isMobile ? 'w-full' : ''}>
                        <a href={`tel:${shelter.contact}`}>
                          <Phone className="h-3 w-3 mr-1" />
                          撥打
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">物資需求資訊</h2>
              <span className="text-sm text-gray-500">共 {filteredResources.length} 筆資料</span>
            </div>
            
            <div className="grid gap-4">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-md transition-shadow">
                  <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
                    <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-start justify-between'}`}>
                      <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-start gap-4 flex-1'}`}>
                        <div className={`flex items-center gap-3 ${isMobile ? 'w-full' : ''}`}>
                          <div className={`${isMobile ? 'text-2xl' : 'text-3xl'}`}>{getResourceTypeIcon(resource.type)}</div>
                          <div className={`flex-1 ${isMobile ? 'min-w-0' : ''}`}>
                            <div className={`flex ${isMobile ? 'flex-col space-y-1' : 'items-center gap-2'} mb-2`}>
                              <h3 className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'} ${isMobile ? 'truncate' : ''}`}>
                                {resource.type === "需求" ? "物資需求" : "物資捐贈"}
                              </h3>
                              <div className={`flex ${isMobile ? 'flex-wrap' : ''} gap-1`}>
                                <Badge 
                                  style={{ backgroundColor: getResourceTypeColor(resource.type) }}
                                  className={`text-white ${isMobile ? 'text-xs' : ''}`}
                                >
                                  {resource.type}
                                </Badge>
                                <Badge 
                                  style={{ backgroundColor: getUrgencyColor(resource.urgency) }}
                                  className="text-white text-xs"
                                >
                                  {resource.urgency}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          {isMobile && (
                            <div className="text-right shrink-0">
                              <p className="text-xs font-medium text-gray-900">編號: {resource.id}</p>
                              <Badge 
                                style={{ backgroundColor: getResourceStatusColor(resource.status) }}
                                className="text-white text-xs mt-1"
                              >
                                {resource.status}
                              </Badge>
                            </div>
                          )}
                        </div>
                        <div className={`${isMobile ? 'w-full' : 'flex-1'}`}>
                          <div className={`space-y-2 ${isMobile ? 'text-sm' : 'text-sm'} text-gray-600`}>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 shrink-0" />
                              <span className={isMobile ? 'truncate' : ''}>{resource.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 shrink-0" />
                              <span>影響人數: {resource.people} 人</span>
                            </div>
                            <div className={`flex ${isMobile ? 'flex-col space-y-1' : 'items-center'} gap-2`}>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 shrink-0" />
                                <span className={isMobile ? 'text-xs' : ''}>聯絡人: {resource.contact}</span>
                              </div>
                              {isMobile && (
                                <span className="text-xs text-gray-500 ml-6">{resource.phone}</span>
                              )}
                              {!isMobile && (
                                <span>({resource.phone})</span>
                              )}
                            </div>
                            <div>
                              <p className="font-medium mb-1">物資清單:</p>
                              <div className="flex flex-wrap gap-1">
                                {resource.items.map((item, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <p className={`mt-2 ${isMobile ? 'text-sm line-clamp-2' : ''}`}>{resource.description}</p>
                          </div>
                        </div>
                      </div>
                      {!isMobile && (
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">編號: {resource.id}</p>
                          <p className="text-xs text-gray-500 mt-1">時間: {resource.timestamp}</p>
                          <Badge 
                            style={{ backgroundColor: getResourceStatusColor(resource.status) }}
                            className="text-white text-xs mt-1"
                          >
                            {resource.status}
                          </Badge>
                        </div>
                      )}
                    </div>
                    {isMobile && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500">時間: {resource.timestamp}</p>
                      </div>
                    )}
                    <div className={`flex gap-2 ${isMobile ? 'mt-3' : 'mt-4'}`}>
                      <Button size="sm" variant="outline" asChild className={isMobile ? 'flex-1' : ''}>
                        <a href={`tel:${resource.phone}`}>
                          <Phone className="h-3 w-3 mr-1" />
                          {isMobile ? '撥打' : '聯絡'}
                        </a>
                      </Button>
                      {resource.type === "需求" ? (
                        <Button size="sm" asChild className={isMobile ? 'flex-1' : ''}>
                          <Link to="/resources">
                            <HandHeart className="h-3 w-3 mr-1" />
                            {isMobile ? '捐助' : '我要捐助'}
                          </Link>
                        </Button>
                      ) : (
                        <Button size="sm" asChild className={isMobile ? 'flex-1' : ''}>
                          <Link to="/resources">
                            <Package className="h-3 w-3 mr-1" />
                            {isMobile ? '申請' : '我需要物資'}
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Public;

