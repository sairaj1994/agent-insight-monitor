
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Headphones } from 'lucide-react';

interface SystemStatusProps {
  metrics: {
    activeCalls: number;
    dialLevel: number;
    dialableLeads: number;
    currentTime: string;
    totalCallRinging: number;
    callsWaitingForAgents: number;
    agentsInCall: number;
    totalAgents: number;
  };
}

export const SystemStatus = ({ metrics }: SystemStatusProps) => {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{metrics.dialLevel}</div>
            <div className="text-sm text-gray-600">Dial Level</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{metrics.dialableLeads}</div>
            <div className="text-sm text-gray-600">Dialable Leads</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{metrics.currentTime}</div>
            <div className="text-sm text-gray-600">Current Time (IST)</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{metrics.activeCalls}</div>
            <div className="text-sm text-gray-600">Current Active Call</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">{metrics.totalCallRinging}</div>
            <div className="text-sm text-gray-600">Total Call Ringing</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-teal-600">{metrics.callsWaitingForAgents}</div>
            <div className="text-sm text-gray-600">Calls waiting for agents</div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center mt-4">
          <div>
            <div className="text-2xl font-bold text-indigo-600">{metrics.agentsInCall}</div>
            <div className="text-sm text-gray-600">Agents in Call</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-600">{metrics.totalAgents}</div>
            <div className="text-sm text-gray-600">Total Agents Available</div>
          </div>
          <div>
            <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white">
              <Headphones className="w-4 h-4 mr-2" />
              Listen / Barge-In
            </Button>
            <div className="text-sm text-gray-600 mt-1">Live Call Monitor</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
