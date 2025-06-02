
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

interface CallMetricsTableProps {
  agents: Agent[];
}

export const CallMetricsTable = ({ agents }: CallMetricsTableProps) => {
  const activeAgents = agents.filter(agent => agent.status === 'online' || agent.status === 'busy');

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Call Metrics</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-2 text-left font-medium text-gray-600">Agent</th>
                <th className="px-2 py-2 text-center font-medium text-gray-600">Active</th>
                <th className="px-2 py-2 text-center font-medium text-gray-600">Total</th>
                <th className="px-2 py-2 text-center font-medium text-gray-600">Success</th>
                <th className="px-2 py-2 text-center font-medium text-gray-600">Avg Time</th>
              </tr>
            </thead>
            <tbody>
              {activeAgents.map((agent, index) => (
                <tr key={agent.id} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'} hover:bg-blue-50`}>
                  <td className="px-2 py-2 font-medium truncate">{agent.id}</td>
                  <td className="px-2 py-2 text-center">{agent.currentCalls}</td>
                  <td className="px-2 py-2 text-center">{agent.totalCalls}</td>
                  <td className="px-2 py-2 text-center">
                    <span className={agent.successRate >= 95 ? 'text-green-600' : agent.successRate >= 90 ? 'text-yellow-600' : 'text-red-600'}>
                      {agent.successRate}%
                    </span>
                  </td>
                  <td className="px-2 py-2 text-center">{agent.avgResponseTime}s</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-2 bg-gray-100 text-xs">
          <div className="grid grid-cols-5 gap-2">
            <div className="font-medium">TOTALS:</div>
            <div className="text-center font-bold">{activeAgents.reduce((sum, agent) => sum + agent.currentCalls, 0)}</div>
            <div className="text-center font-bold">{activeAgents.reduce((sum, agent) => sum + agent.totalCalls, 0)}</div>
            <div className="text-center font-bold text-green-600">
              {Math.round(activeAgents.reduce((sum, agent) => sum + agent.successRate, 0) / activeAgents.length)}%
            </div>
            <div className="text-center font-bold">
              {(activeAgents.reduce((sum, agent) => sum + agent.avgResponseTime, 0) / activeAgents.length).toFixed(1)}s
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
