
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bot, Activity, Phone, Clock, AlertCircle } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'busy' | 'error';
  currentCalls: number;
  totalCalls: number;
  avgResponseTime: number;
  successRate: number;
  lastActivity: Date;
}

interface AgentStatusCardProps {
  agent: Agent;
}

export const AgentStatusCard = ({ agent }: AgentStatusCardProps) => {
  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'busy':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-400';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusBadge = (status: Agent['status']) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Online</Badge>;
      case 'busy':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Busy</Badge>;
      case 'offline':
        return <Badge variant="secondary">Offline</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const formatLastActivity = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Active now';
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Bot className="h-5 w-5 text-gray-700" />
              </div>
              <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(agent.status)} border-2 border-white`}></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{agent.name}</h3>
              <p className="text-sm text-gray-500">ID: {agent.id}</p>
            </div>
          </div>
          {getStatusBadge(agent.status)}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              Current Calls
            </span>
            <span className="font-medium">{agent.currentCalls}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center">
              <Activity className="h-4 w-4 mr-2" />
              Total Today
            </span>
            <span className="font-medium">{agent.totalCalls}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Avg Response
            </span>
            <span className="font-medium">{agent.avgResponseTime}s</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Success Rate</span>
            <span className="font-medium text-green-600">{agent.successRate}%</span>
          </div>

          <div className="pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Last activity: {formatLastActivity(agent.lastActivity)}
            </p>
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            View Details
          </Button>
          {agent.status === 'error' && (
            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
              <AlertCircle className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
