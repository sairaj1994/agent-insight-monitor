
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useState, useEffect } from 'react';

interface MetricData {
  time: string;
  calls: number;
  successRate: number;
  responseTime: number;
}

export const MetricsChart = () => {
  const [data, setData] = useState<MetricData[]>([]);

  useEffect(() => {
    // Generate initial data for the last 24 hours
    const generateData = () => {
      const now = new Date();
      const newData: MetricData[] = [];
      
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        newData.push({
          time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          calls: Math.floor(Math.random() * 50) + 20,
          successRate: Math.floor(Math.random() * 10) + 90,
          responseTime: Math.random() * 2 + 1.5,
        });
      }
      
      setData(newData);
    };

    generateData();

    // Update data every 30 seconds
    const interval = setInterval(() => {
      setData(prevData => {
        const newPoint = {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          calls: Math.floor(Math.random() * 50) + 20,
          successRate: Math.floor(Math.random() * 10) + 90,
          responseTime: Math.random() * 2 + 1.5,
        };
        
        const updated = [...prevData.slice(1), newPoint];
        return updated;
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="h-64">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Call Volume (Last 24 Hours)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="callsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="time" 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Area
              type="monotone"
              dataKey="calls"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#callsGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="h-64">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Success Rate & Response Time</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="time" 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              yAxisId="left"
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              domain={[85, 100]}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              domain={[0, 5]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="successRate"
              stroke="#10B981"
              strokeWidth={2}
              dot={false}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="responseTime"
              stroke="#F59E0B"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
