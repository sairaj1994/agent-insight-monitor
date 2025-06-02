
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SystemStatusProps {
  metrics: {
    activeCalls: number;
    successRate: number;
    avgResponse: number;
    totalAgents: number;
  };
}

export const SystemStatus = ({ metrics }: SystemStatusProps) => {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{metrics.activeCalls}</div>
            <div className="text-sm text-gray-600">Active Calls</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{metrics.successRate}%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{metrics.avgResponse}s</div>
            <div className="text-sm text-gray-600">Avg Response</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{metrics.totalAgents}</div>
            <div className="text-sm text-gray-600">Total Agents</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">0</div>
            <div className="text-sm text-gray-600">Errors</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-teal-600">98.5%</div>
            <div className="text-sm text-gray-600">Uptime</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
