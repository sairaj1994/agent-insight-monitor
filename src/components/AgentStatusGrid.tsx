
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

interface AgentStatusGridProps {
  agents: Agent[];
}

export const AgentStatusGrid = ({ agents }: AgentStatusGridProps) => {
  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-500 text-white';
      case 'busy':
        return 'bg-yellow-500 text-white';
      case 'offline':
        return 'bg-gray-400 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Agent Status</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {agents.map((agent) => (
            <div key={agent.id} className="grid grid-cols-4 gap-2 p-2 text-xs border-b border-gray-100 hover:bg-gray-50">
              <div className="font-medium truncate">{agent.id}</div>
              <div className="truncate">{agent.name.split(' ')[0]}</div>
              <div className="text-center">
                <Badge className={`text-xs px-1 py-0 ${getStatusColor(agent.status)}`}>
                  {agent.status.toUpperCase()}
                </Badge>
              </div>
              <div className="text-center font-medium">{agent.currentCalls}</div>
            </div>
          ))}
        </div>
        <div className="p-2 bg-gray-50 text-xs">
          <div className="grid grid-cols-4 gap-2 font-medium text-gray-600">
            <div>Agent ID</div>
            <div>Name</div>
            <div className="text-center">Status</div>
            <div className="text-center">Calls</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
