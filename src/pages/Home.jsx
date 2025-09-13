import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, FileText, BarChart3, Home as HomeIcon, Package, Search, Github, Mail, Phone } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect } from 'react';

const Home = () => {
  const isMobile = useIsMobile();

  // 手機版打開頁面時滾動到頂部
  useEffect(() => {
    if (isMobile) {
      window.scrollTo(0, 0);
    }
  }, [isMobile]);

  const features = [
    {
      title: "查詢災情分布",
      description: "即時查看各地災情分布與處理進度",
      icon: <MapPin className="h-8 w-8" />,
      link: "/map",
      gradient: "from-blue-400 to-blue-600",
      hoverColor: "hover:from-blue-500 hover:to-blue-700"
    },
    {
      title: "上報災情",
      description: "快速通報災情，協助救災工作",
      icon: <FileText className="h-8 w-8" />,
      link: "/report",
      gradient: "from-emerald-400 to-emerald-600",
      hoverColor: "hover:from-emerald-500 hover:to-emerald-700"
    },
    {
      title: "避難所查詢",
      description: "尋找附近避難場所與即時容量資訊",
      icon: <HomeIcon className="h-8 w-8" />,
      link: "/shelters",
      gradient: "from-amber-400 to-orange-500",
      hoverColor: "hover:from-amber-500 hover:to-orange-600"
    },
    {
      title: "物資需求申請",
      description: "申請緊急物資支援，加速資源調配",
      icon: <Package className="h-8 w-8" />,
      link: "/resources",
      gradient: "from-rose-400 to-red-500",
      hoverColor: "hover:from-rose-500 hover:to-red-600"
    },
    {
      title: "公開查詢",
      description: "災情資訊查詢與公告發布平台",
      icon: <Search className="h-8 w-8" />,
      link: "/public",
      gradient: "from-cyan-400 to-blue-500",
      hoverColor: "hover:from-cyan-500 hover:to-blue-600"
    },
    {
      title: "災情儀表板",
      description: "統計分析災情數據，輔助決策",
      icon: <BarChart3 className="h-8 w-8" />,
      link: "/dashboard",
      gradient: "from-purple-400 to-pink-500",
      hoverColor: "hover:from-purple-500 hover:to-pink-600"
    }
  ];

  return (
    <div className="min-h-screen taiwan-gradient">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        {/* 添加淡淡的背景圖案 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-300 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-300 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-amber-300 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        {/* 新增漂浮元素特效 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-4 h-4 bg-emerald-400/30 rounded-full"
               style={{ animation: 'gentle-float 8s ease-in-out infinite' }}></div>
          <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-blue-400/30 rounded-full"
               style={{ animation: 'gentle-float 6s ease-in-out infinite 2s' }}></div>
          <div className="absolute top-1/2 left-1/5 w-3 h-3 bg-amber-400/30 rounded-full"
               style={{ animation: 'gentle-float 10s ease-in-out infinite 1s' }}></div>
          <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-purple-400/30 rounded-full"
               style={{ animation: 'gentle-float 7s ease-in-out infinite 3s' }}></div>
        </div>
        
        {/* 添加微妙的光線效果 */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-radial from-emerald-200/20 via-transparent to-transparent blur-3xl"
             style={{ animation: 'wave-subtle 8s ease-in-out infinite' }}></div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* LOGO區域 - 響應式設計 */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div 
                className={`${isMobile ? 'w-36 h-36' : 'w-48 h-48'} mountain-gradient rounded-full flex items-center justify-center natural-shadow-lg border-4 border-white/80 overflow-hidden transition-all duration-700 hover:scale-105`}
                style={{ animation: 'gentle-float 6s ease-in-out infinite' }}
              >
                {/* 可以放圖片或文字 */}
                <img 
                  src="/images/logo.png" 
                  alt="島嶼守望者 Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // 如果圖片載入失敗，顯示文字版本
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span 
                  className={`${isMobile ? 'text-5xl' : 'text-7xl'} text-white font-bold drop-shadow-lg`}
                  style={{ display: 'none' }}
                >
                  島
                </span>
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-6"
              style={{ animation: 'fade-in-up 0.8s ease-out' }}>
            島嶼守望者
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed"
             style={{ animation: 'fade-in-up 0.8s ease-out 0.2s both' }}>
            整合災害資訊，提升應變效率，守護民眾安全
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center"
               style={{ animation: 'fade-in-up 0.8s ease-out 0.4s both' }}>
            <Button asChild size="lg" className="text-lg px-8 py-3 mountain-gradient hover:scale-105 transition-all duration-300 natural-shadow border-0 text-white font-semibold">
              <Link to="/map">立即查看災情</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3 bg-white/80 backdrop-blur border-2 border-slate-300 hover:bg-white hover:scale-105 transition-all duration-300 natural-shadow">
              <Link to="/report">通報災情</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent mb-12"
              style={{ animation: 'fade-in-up 0.6s ease-out' }}>
            主要功能
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} 
                    className="group hover:scale-105 transition-all duration-500 natural-shadow hover:natural-shadow-lg bg-white/80 backdrop-blur border-0 overflow-hidden"
                    style={{ 
                      animation: `fade-in-up 0.6s ease-out ${index * 0.1 + 0.2}s both`,
                    }}>
                <CardHeader className="text-center relative">
                  <div className={`bg-gradient-to-r ${feature.gradient} ${feature.hoverColor} text-white rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-500 natural-shadow`}
                       style={{ animation: 'wave-subtle 4s ease-in-out infinite' }}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-slate-700 group-hover:text-slate-800 transition-colors duration-300">{feature.title}</CardTitle>
                  <CardDescription className="text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button asChild className={`w-full bg-gradient-to-r ${feature.gradient} hover:scale-105 transition-all duration-300 border-0 text-white font-medium natural-shadow`}>
                    <Link to={feature.link}>前往使用</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-white/60 backdrop-blur">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent mb-8"
              style={{ animation: 'fade-in-up 0.6s ease-out' }}>
            關於平台
          </h2>
          <div className="prose prose-lg mx-auto text-slate-600">
            <p className="text-lg leading-relaxed mb-6"
               style={{ animation: 'fade-in-up 0.6s ease-out 0.2s both' }}>
              島嶼守望者是一個開源的公民科技專案，致力於整合各種災害資訊，
              提供民眾、政府機關及救災單位一個統一的資訊平台。
            </p>
            <p className="text-lg leading-relaxed mb-6"
               style={{ animation: 'fade-in-up 0.6s ease-out 0.4s both' }}>
              透過即時的災情通報、視覺化的地圖展示、以及智慧化的數據分析，
              我們希望能夠提升災害應變的效率，減少災害對民眾生活的影響。
            </p>
            <p className="text-lg leading-relaxed"
               style={{ animation: 'fade-in-up 0.6s ease-out 0.6s both' }}>
              平台採用開放原始碼的方式開發，歡迎各界共同參與，
              一起為台灣的防災工作貢獻心力。
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div style={{ animation: 'fade-in-up 0.6s ease-out' }}>
              <h3 className="text-xl font-bold mb-4 text-emerald-300">島嶼守望者</h3>
              <p className="text-slate-300 leading-relaxed">
                開源公民科技專案，致力於提升災害應變效率
              </p>
            </div>
            <div style={{ animation: 'fade-in-up 0.6s ease-out 0.2s both' }}>
              <h4 className="text-lg font-semibold mb-4 text-blue-300">快速連結</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <Link to="/map" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  災情地圖
                </Link>
                <Link to="/report" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  災情上報
                </Link>
                <Link to="/shelters" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  避難所查詢
                </Link>
                <Link to="/resources" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  物資申請
                </Link>
                <Link to="/public" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  公開查詢
                </Link>
                <Link to="/dashboard" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                  數據儀表板
                </Link>
              </div>
            </div>
            <div style={{ animation: 'fade-in-up 0.6s ease-out 0.4s both' }}>
              <h4 className="text-lg font-semibold mb-4 text-amber-300">聯絡資訊</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-300">
                  <Github className="h-4 w-4 text-emerald-400" />
                  <a href="#" className="hover:underline">
                    範例
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span>example.com</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="h-4 w-4 text-amber-400" />
                  <span>02-1234-5678</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-600 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 島嶼守望者. 本專案採用開源授權.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

