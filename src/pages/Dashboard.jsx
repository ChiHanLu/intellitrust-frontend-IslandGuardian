import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TrendingUp, AlertTriangle, CheckCircle, Clock, Users, Home, Lightbulb } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import { statisticsData, aiSuggestions } from '@/data/statisticsData';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect } from 'react';

const Dashboard = () => {
  const isMobile = useIsMobile();
  const COLORS = ['#3B82F6', '#EF4444', '#F59E0B', '#8B5CF6', '#10B981'];

  // 手機版打開頁面時滾動到頂部
  useEffect(() => {
    if (isMobile) {
      window.scrollTo(0, 0);
    }
  }, [isMobile]);

  const MetricCard = ({ title, value, subtitle, icon: Icon, color = "blue" }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className={`p-3 bg-${color}-100 rounded-full`}>
            <Icon className={`h-6 w-6 text-${color}-600`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">數據儀表板</h1>
            <Badge variant="outline" className="ml-auto">
              即時更新
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 py-8 space-y-8">
        {/* Key Metrics */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">關鍵指標</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="當前上報總數"
              value={statisticsData.keyMetrics.totalReports}
              subtitle="本週新增 18 件"
              icon={AlertTriangle}
              color="blue"
            />
            <MetricCard
              title="處理中案件"
              value={statisticsData.keyMetrics.processingCases}
              subtitle="平均處理時間 2.5 小時"
              icon={Clock}
              color="orange"
            />
            <MetricCard
              title="已完成案件"
              value={statisticsData.keyMetrics.completedCases}
              subtitle={`完成率 ${statisticsData.keyMetrics.completionRate}%`}
              icon={CheckCircle}
              color="green"
            />
            <MetricCard
              title="避難所收容人數"
              value={statisticsData.keyMetrics.currentOccupancy}
              subtitle={`總容量 ${statisticsData.keyMetrics.totalCapacity} 人`}
              icon={Users}
              color="purple"
            />
          </div>
        </section>

        {/* Holiday Probability */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">當日放假機率預測</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Probability Card */}
            <Card className="md:col-span-2 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 border-orange-200 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text mb-2">
                      {statisticsData.holidayProbability.probability}%
                    </div>
                    <div className="absolute -top-2 -right-8">
                      <Badge 
                        className={`text-white font-semibold ${
                          statisticsData.holidayProbability.riskLevel === '高' 
                            ? 'bg-red-500 shadow-red-200' 
                            : statisticsData.holidayProbability.riskLevel === '中' 
                            ? 'bg-orange-500 shadow-orange-200' 
                            : 'bg-green-500 shadow-green-200'
                        } shadow-lg`}
                      >
                        {statisticsData.holidayProbability.riskLevel}機率
                      </Badge>
                    </div>
                  </div>
                  <p className="text-lg font-medium text-gray-700">停班停課機率</p>
                  <div className="mt-4 p-4 bg-white/50 rounded-lg border border-orange-100">
                    <p className="text-sm text-gray-600 mb-1">主要原因</p>
                    <p className="text-gray-800 font-medium">{statisticsData.holidayProbability.reason}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    影響因子分析
                  </h4>
                  <div className="space-y-4">
                    {statisticsData.holidayProbability.factors.map((factor, index) => (
                      <div key={index} className="bg-white/60 rounded-lg p-3 border border-orange-100">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-800">{factor.factor}</span>
                            <Badge variant="outline" className="text-xs">
                              權重 {factor.weight}%
                            </Badge>
                          </div>
                          <span className="text-lg font-bold text-gray-900">{factor.score}</span>
                        </div>
                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ${
                              factor.score >= 80 ? 'bg-gradient-to-r from-red-400 to-red-600' :
                              factor.score >= 60 ? 'bg-gradient-to-r from-orange-400 to-orange-600' :
                              'bg-gradient-to-r from-green-400 to-green-600'
                            }`}
                            style={{ width: `${factor.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Level Indicator */}
            <Card className="bg-white shadow-lg border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">風險指標</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {[
                    { level: '低機率', range: '0-30%', color: 'bg-green-500', active: statisticsData.holidayProbability.probability <= 30 },
                    { level: '中機率', range: '31-60%', color: 'bg-orange-500', active: statisticsData.holidayProbability.probability > 30 && statisticsData.holidayProbability.probability <= 60 },
                    { level: '高機率', range: '61-100%', color: 'bg-red-500', active: statisticsData.holidayProbability.probability > 60 }
                  ].map((risk, index) => (
                    <div key={index} className={`p-3 rounded-lg border-2 transition-all ${
                      risk.active 
                        ? 'border-current bg-gray-50 shadow-md' 
                        : 'border-gray-200 bg-gray-50/50'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${risk.color} ${
                          risk.active ? 'ring-2 ring-offset-2 ring-current' : ''
                        }`}></div>
                        <div>
                          <p className={`font-medium ${risk.active ? 'text-gray-900' : 'text-gray-600'}`}>
                            {risk.level}
                          </p>
                          <p className="text-xs text-gray-500">{risk.range}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">最後更新</p>
                    <p className="text-sm font-medium text-gray-700">
                      {statisticsData.holidayProbability.lastUpdated}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Disaster Types Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                各災種比例分布
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statisticsData.disasterTypeStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {statisticsData.disasterTypeStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {statisticsData.disasterTypeStats.map((item, index) => (
                  <div key={item.type} className="flex items-center gap-2 text-sm">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span>{item.type}: {item.count}件</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Daily Trend Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                每日災情新增趨勢
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={statisticsData.dailyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Area Progress Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>各區處理進度</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={statisticsData.areaProgress} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="area" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="pending" stackId="a" fill="#EF4444" name="待派遣" />
                <Bar dataKey="processing" stackId="a" fill="#F59E0B" name="處理中" />
                <Bar dataKey="completed" stackId="a" fill="#10B981" name="已完成" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              AI 智慧建議
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{suggestion.title}</h4>
                      <p className="text-gray-700 text-sm mb-3">{suggestion.content}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>可信度: {suggestion.confidence}%</span>
                        <span>時間: {suggestion.timestamp}</span>
                      </div>
                    </div>
                    <Badge 
                      className={`ml-4 text-white ${
                        suggestion.type === 'priority' ? 'bg-red-600 hover:bg-red-700' : 
                        suggestion.type === 'resource' ? 'bg-blue-600 hover:bg-blue-700' : 
                        'bg-orange-600 hover:bg-orange-700'
                      }`}
                    >
                      {suggestion.type === 'priority' ? '優先級' : 
                       suggestion.type === 'resource' ? '資源' : '疏散'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status Summary */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>處理狀態統計</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statisticsData.statusStats.map((status) => (
                  <div key={status.status} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ 
                          backgroundColor: status.status === '待派遣' ? '#EF4444' : 
                                         status.status === '處理中' ? '#F59E0B' : '#10B981' 
                        }}
                      ></div>
                      <span className="font-medium">{status.status}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">{status.count}</span>
                      <span className="text-sm text-gray-500 ml-2">({status.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>優先級分布</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statisticsData.priorityStats.map((priority) => (
                  <div key={priority.priority} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ 
                          backgroundColor: priority.priority === '緊急' ? '#DC2626' : 
                                         priority.priority === '高' ? '#F59E0B' : 
                                         priority.priority === '中' ? '#10B981' : '#6B7280'
                        }}
                      ></div>
                      <span className="font-medium">{priority.priority}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">{priority.count}</span>
                      <span className="text-sm text-gray-500 ml-2">({priority.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

