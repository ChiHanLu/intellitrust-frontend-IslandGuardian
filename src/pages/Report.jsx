import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Upload, MapPin, CheckCircle, Home, Map } from 'lucide-react';
import { disasterTypes } from '@/data/disasterData';
import { useIsMobile } from '@/hooks/use-mobile';

const Report = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reportId, setReportId] = useState('');
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    description: '',
    images: [],
    coordinates: { lat: '', lng: '' }
  });

  // 手機版打開頁面時滾動到頂部
  useEffect(() => {
    if (isMobile) {
      window.scrollTo(0, 0);
    }
  }, [isMobile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 模擬提交處理
    const newReportId = 'D' + String(Date.now()).slice(-3).padStart(3, '0');
    setReportId(newReportId);
    setIsSubmitted(true);
    
    // 模擬將資料加入全域狀態（實際應用中會發送到後端）
    console.log('新增災情報告:', { ...formData, id: newReportId });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // 模擬圖片上傳
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, images: [...prev.images, ...imageUrls] }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            coordinates: {
              lat: position.coords.latitude.toFixed(6),
              lng: position.coords.longitude.toFixed(6)
            }
          }));
        },
        (error) => {
          console.error('無法取得位置:', error);
          alert('無法取得您的位置，請手動輸入地址');
        }
      );
    } else {
      alert('您的瀏覽器不支援定位功能');
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen taiwan-gradient flex items-center justify-center p-4">
        <Card className="w-full max-w-md natural-shadow-lg bg-white/90 backdrop-blur border-emerald-200/30">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-emerald-100/80 backdrop-blur rounded-full flex items-center justify-center mb-4 natural-shadow"
                 style={{ animation: 'gentle-float 3s ease-in-out infinite' }}>
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <CardTitle className="text-2xl text-emerald-600">災情通報成功</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-emerald-50/80 backdrop-blur p-4 rounded-lg border border-emerald-200/50">
              <p className="text-sm text-slate-600 mb-2">您的回報編號</p>
              <p className="text-2xl font-bold text-slate-800">{reportId}</p>
            </div>
            <div className="bg-amber-50/80 backdrop-blur p-4 rounded-lg border border-amber-200/50">
              <p className="text-sm text-amber-800">
                <strong>目前狀態：</strong>待確認
              </p>
              <p className="text-xs text-amber-700 mt-1">
                相關單位將盡快處理您的通報
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Button asChild className="w-full mountain-gradient hover:scale-105 transition-all duration-300 natural-shadow text-white">
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  返回
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300">
                <Link to="/map">
                  <Map className="h-4 w-4 mr-2" />
                  查看地圖
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen taiwan-gradient">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur natural-shadow border-b border-emerald-200/30">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild className="hover:bg-emerald-100/50 transition-all duration-300">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 text-slate-600" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent">災情上報</h1>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto p-4 py-8">
        <Card className="natural-shadow-lg bg-white/90 backdrop-blur border-emerald-200/30">
          <CardHeader>
            <CardTitle className="text-slate-700">通報災情資訊</CardTitle>
            <p className="text-sm text-slate-600">
              請詳細填寫災情資訊，協助相關單位快速應變處理
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 災情類型 */}
              <div className="space-y-2">
                <Label htmlFor="type" className="text-slate-700 font-medium">災情類型 *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-200 bg-white/80 backdrop-blur">
                    <SelectValue placeholder="請選擇災情類型" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/90 backdrop-blur border-emerald-200/30">
                    {disasterTypes.map(type => (
                      <SelectItem key={type.value} value={type.value} className="hover:bg-emerald-50/50">
                        {type.icon} {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 地點描述 */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-slate-700 font-medium">地點描述 *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="請輸入詳細地址或地標"
                  className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-200 bg-white/80 backdrop-blur"
                  required
                />
              </div>

              {/* 位置選擇 */}
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">位置資訊</Label>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={getCurrentLocation} 
                          className="border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300">
                    <MapPin className="h-4 w-4 mr-2 text-emerald-600" />
                    取得目前位置
                  </Button>
                  {formData.coordinates.lat && (
                    <div className="flex items-center text-sm text-slate-600 bg-emerald-50/50 rounded-lg px-3 py-2 border border-emerald-200/50">
                      <span>緯度: {formData.coordinates.lat}, 經度: {formData.coordinates.lng}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 災情描述 */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-slate-700 font-medium">災情描述 *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="請詳細描述災情狀況、影響範圍等"
                  className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-200 bg-white/80 backdrop-blur"
                  rows={4}
                  required
                />
              </div>

              {/* 照片上傳 */}
              <div className="space-y-2">
                <Label htmlFor="images" className="text-slate-700 font-medium">照片上傳</Label>
                <div className="border-2 border-dashed border-emerald-300/50 rounded-lg p-6 text-center bg-emerald-50/30 hover:bg-emerald-50/50 transition-all duration-300">
                  <Upload className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 mb-2">點擊上傳災情照片</p>
                  <input
                    type="file"
                    id="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button type="button" variant="outline" onClick={() => document.getElementById('images').click()}
                          className="border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300">
                    選擇檔案
                  </Button>
                </div>
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {formData.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`上傳圖片 ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg border border-emerald-200/50 natural-shadow"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* 提交按鈕 */}
              <div className="flex gap-4">
                <Button type="submit" className="flex-1 mountain-gradient hover:scale-105 transition-all duration-300 natural-shadow text-white">
                  提交災情通報
                </Button>
                <Button type="button" variant="outline" asChild 
                        className="border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300">
                  <Link to="/">取消</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Report;

