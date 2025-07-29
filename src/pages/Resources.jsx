import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Package, CheckCircle, Home, Eye, AlertTriangle, Heart, HandHeart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Resources = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requestId, setRequestId] = useState('');
  const [submittedType, setSubmittedType] = useState(''); // 紀錄提交的類型
  const [showRecords, setShowRecords] = useState(false);
  const [requests, setRequests] = useState([]); // 本地儲存的申請記錄
  const [formData, setFormData] = useState({
    type: 'need', // 新增：需求類型 'need' 或 'donate'
    location: '',
    items: [],
    people: '',
    quantity: '',
    notes: ''
  });

  // 手機版打開頁面時滾動到頂部
  useEffect(() => {
    if (isMobile) {
      window.scrollTo(0, 0);
    }
  }, [isMobile]);

  // 申請類型選項
  const requestTypes = [
    { value: 'need', label: '我需要物資', icon: '🆘', color: 'bg-red-500' },
    { value: 'donate', label: '我要捐贈物資', icon: '❤️', color: 'bg-green-500' }
  ];

  // 物資類型選項
  const resourceTypes = [
    { id: 'water', label: '飲用水', icon: '🧴' },
    { id: 'food', label: '食物', icon: '🍱' },
    { id: 'blanket', label: '毛毯', icon: '🧥' },
    { id: 'medicine', label: '藥品', icon: '💊' },
    { id: 'tent', label: '帳篷', icon: '⛺' },
    { id: 'mask', label: '口罩', icon: '😷' },
    { id: 'battery', label: '電池', icon: '🔋' },
    { id: 'flashlight', label: '手電筒', icon: '🔦' },
    { id: 'firstaid', label: '急救包', icon: '🩹' },
    { id: 'clothing', label: '衣物', icon: '👕' }
  ];

  // 使用對象選項
  const peopleTypes = [
    { value: 'residents', label: '居民' },
    { value: 'volunteers', label: '志工' },
    { value: 'staff', label: '災防人員' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.items.length === 0) {
      alert('請至少選擇一項需求物資');
      return;
    }
    
    // 生成申請編號
    const newRequestId = 'REQ' + new Date().getFullYear() + 
                        String(new Date().getMonth() + 1).padStart(2, '0') + 
                        String(new Date().getDate()).padStart(2, '0') + 
                        String(Date.now()).slice(-3);
    
    const newRequest = {
      id: newRequestId,
      ...formData,
      status: formData.type === 'need' ? '待處理' : '可提供',
      timestamp: new Date().toLocaleString('zh-TW'),
      items: formData.items.map(id => resourceTypes.find(type => type.id === id)?.label).filter(Boolean)
    };
    
    // 添加到本地記錄
    setRequests(prev => [newRequest, ...prev]);
    setRequestId(newRequestId);
    setSubmittedType(formData.type); // 儲存提交類型
    setIsSubmitted(true);
    
    console.log('新增物資需求申請:', newRequest);
  };

  const handleItemChange = (itemId, checked) => {
    setFormData(prev => ({
      ...prev,
      items: checked 
        ? [...prev.items, itemId]
        : prev.items.filter(id => id !== itemId)
    }));
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setRequestId('');
    setSubmittedType('');
    setFormData({
      type: 'need',
      location: '',
      items: [],
      people: '',
      quantity: '',
      notes: ''
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">
              {submittedType === 'need' ? '物資需求申請成功' : '物資捐贈登記成功'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">申請編號</p>
              <p className="text-2xl font-bold text-gray-900">{requestId}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>目前狀態：</strong>{submittedType === 'need' ? '待處理' : '可提供'}
              </p>
              <p className="text-xs text-blue-700 mt-1">
                {submittedType === 'need' 
                  ? '後續單位將聯繫支援，請保持聯絡暢通' 
                  : '感謝您的愛心，我們會聯繫您安排物資收取'
                }
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Button onClick={resetForm} className="w-full">
                {submittedType === 'need' ? (
                  <>
                    <Package className="h-4 w-4 mr-2" />
                    再次申請
                  </>
                ) : (
                  <>
                    <Heart className="h-4 w-4 mr-2" />
                    再次捐贈
                  </>
                )}
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  返回
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showRecords) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setShowRecords(false)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">物資需求記錄</h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-4 py-8">
          {requests.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">目前沒有申請記錄</p>
                <Button 
                  onClick={() => setShowRecords(false)} 
                  variant="outline" 
                  className="mt-4"
                >
                  立即申請
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">申請編號: {request.id}</h3>
                        <p className="text-sm text-gray-600">{request.timestamp}</p>
                      </div>
                      <Badge variant={request.status === '待處理' ? 'secondary' : 'default'}>
                        {request.status}
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">地點</p>
                        <p className="text-sm text-gray-600">{request.location}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">使用對象</p>
                        <p className="text-sm text-gray-600">
                          {peopleTypes.find(type => type.value === request.people)?.label}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">需求數量</p>
                        <p className="text-sm text-gray-600">{request.quantity}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">需求物資</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {request.items.map((item, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {request.notes && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700">備註</p>
                        <p className="text-sm text-gray-600">{request.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">物資需求申請</h1>
            {requests.length > 0 && (
              <Button variant="outline" onClick={() => setShowRecords(true)} className="ml-auto">
                <Eye className="h-4 w-4 mr-2" />
                查看申請記錄 ({requests.length})
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto p-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {formData.type === 'need' ? (
                <>
                  <Package className="h-6 w-6 text-red-600" />
                  物資需求申請
                </>
              ) : (
                <>
                  <Heart className="h-6 w-6 text-green-600" />
                  物資捐贈登記
                </>
              )}
            </CardTitle>
            <p className="text-sm text-gray-600">
              {formData.type === 'need' 
                ? "請詳細填寫物資需求資訊，協助相關單位進行資源調配"
                : "感謝您的愛心，請填寫捐贈物資資訊，方便統一調配"
              }
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 申請類型選擇 */}
              <div className="space-y-3">
                <Label>申請類型 *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {requestTypes.map((type) => (
                    <div 
                      key={type.value}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.type === type.value 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full ${type.color} flex items-center justify-center text-white text-2xl`}>
                          {type.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{type.label}</h3>
                          <p className="text-sm text-gray-600">
                            {type.value === 'need' ? '申請緊急物資支援' : '提供愛心捐贈物資'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 地點名稱 */}
              <div className="space-y-2">
                <Label htmlFor="location">
                  {formData.type === 'need' ? '需求地點／描述 *' : '捐贈地點／描述 *'}
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder={formData.type === 'need' ? "請輸入需要物資的詳細地址" : "請輸入捐贈物資的取貨地點"}
                  required
                />
              </div>

              {/* 物資種類 */}
              <div className="space-y-3">
                <Label>
                  {formData.type === 'need' ? '需求物資種類 * (可複選)' : '捐贈物資種類 * (可複選)'}
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {resourceTypes.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={type.id}
                        checked={formData.items.includes(type.id)}
                        onCheckedChange={(checked) => handleItemChange(type.id, checked)}
                      />
                      <Label htmlFor={type.id} className="flex items-center gap-2 cursor-pointer">
                        <span className="text-lg">{type.icon}</span>
                        <span>{type.label}</span>
                      </Label>
                    </div>
                  ))}
                </div>
                {formData.items.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.items.map(itemId => {
                      const item = resourceTypes.find(type => type.id === itemId);
                      return (
                        <Badge key={itemId} variant="secondary" className="text-xs">
                          {item?.icon} {item?.label}
                        </Badge>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 使用對象 */}
              <div className="space-y-2">
                <Label htmlFor="people">
                  {formData.type === 'need' ? '使用對象 *' : '捐贈對象 *'}
                </Label>
                <Select value={formData.people} onValueChange={(value) => setFormData(prev => ({ ...prev, people: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder={formData.type === 'need' ? "請選擇使用對象" : "請選擇捐贈對象"} />
                  </SelectTrigger>
                  <SelectContent>
                    {peopleTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 數量 */}
              <div className="space-y-2">
                <Label htmlFor="quantity">
                  {formData.type === 'need' ? '預估需求數量 *' : '可提供數量 *'}
                </Label>
                <Input
                  id="quantity"
                  value={formData.quantity}
                  onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                  placeholder={formData.type === 'need' ? "例如：100份、50人份、20箱等" : "例如：200份、100人份、50箱等"}
                  required
                />
              </div>

              {/* 備註 */}
              <div className="space-y-2">
                <Label htmlFor="notes">備註 (選填)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder={formData.type === 'need' ? "其他特殊需求或說明..." : "其他捐贈條件或說明..."}
                  rows={3}
                />
              </div>

              {/* 提交按鈕 */}
              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  {formData.type === 'need' ? (
                    <>
                      <Package className="h-4 w-4 mr-2" />
                      提交物資需求
                    </>
                  ) : (
                    <>
                      <Heart className="h-4 w-4 mr-2" />
                      提交捐贈資訊
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link to="/">取消</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* 右側圖片/說明區域 */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">物資支援說明</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>• 申請提交後將由相關單位評估處理</p>
                <p>• 緊急物資將優先配送處理</p>
                <p>• 請確保聯絡資訊正確以便後續聯繫</p>
                <p>• 可隨時查看申請記錄追蹤處理狀況</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Resources;
