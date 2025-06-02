
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Headphones, Volume2, VolumeX } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'busy' | 'error';
  currentCalls: number;
  totalCalls: number;
  avgResponseTime: number;
  successRate: number;
  lastActivity: Date;
  currentCallId?: string;
  customerPhone?: string;
}

interface AgentCallMonitorProps {
  agents: Agent[];
}

export const AgentCallMonitor = ({ agents }: AgentCallMonitorProps) => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const activeAgents = agents.filter(agent => 
    (agent.status === 'online' || agent.status === 'busy') && agent.currentCalls > 0
  );

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500 text-white';
      case 'busy': return 'bg-yellow-500 text-white';
      case 'offline': return 'bg-gray-400 text-white';
      case 'error': return 'bg-red-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const handleStartListening = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsListening(true);
    console.log(`Starting to listen to agent ${agent.id} - ${agent.name}`);
  };

  const handleStopListening = () => {
    setIsListening(false);
    setSelectedAgent(null);
    console.log('Stopped listening');
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Live Call Monitor</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {activeAgents.map((agent) => (
              <div key={agent.id} className="grid grid-cols-6 gap-2 p-3 text-xs border-b border-gray-100 hover:bg-gray-50">
                <div className="font-medium">{agent.id}</div>
                <div className="truncate">{agent.name}</div>
                <div className="text-center">
                  <Badge className={`text-xs px-1 py-0 ${getStatusColor(agent.status)}`}>
                    {agent.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="text-center">{agent.currentCalls}</div>
                <div className="text-center font-mono text-xs">
                  {agent.customerPhone || '+1234567890'}
                </div>
                <div className="text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm" 
                        className="h-6 px-2 text-xs bg-blue-500 hover:bg-blue-600"
                        onClick={() => handleStartListening(agent)}
                      >
                        <Headphones className="w-3 h-3 mr-1" />
                        Listen
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Live Call Monitor - {agent.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Agent:</span> {agent.name} ({agent.id})
                          </div>
                          <div>
                            <span className="font-medium">Customer:</span> {agent.customerPhone || '+1234567890'}
                          </div>
                          <div>
                            <span className="font-medium">Call Duration:</span> 02:34
                          </div>
                          <div>
                            <span className="font-medium">Status:</span>
                            <Badge className={`ml-2 text-xs ${getStatusColor(agent.status)}`}>
                              IN CALL
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="bg-gray-100 p-4 rounded-lg">
                          <div className="flex items-center justify-center space-x-4">
                            <Button
                              onClick={() => setIsMuted(!isMuted)}
                              variant={isMuted ? "destructive" : "outline"}
                              size="sm"
                            >
                              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                              {isMuted ? 'Unmute' : 'Mute'}
                            </Button>
                            
                            <div className="flex-1 text-center">
                              <div className="flex items-center justify-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium">LISTENING LIVE</span>
                              </div>
                            </div>
                            
                            <Button
                              onClick={handleStopListening}
                              variant="destructive"
                              size="sm"
                            >
                              Stop Listening
                            </Button>
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-500 text-center">
                          Audio monitoring is active. This session is being recorded for quality purposes.
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 bg-gray-50 text-xs">
            <div className="grid grid-cols-6 gap-2 font-medium text-gray-600">
              <div>Agent ID</div>
              <div>Name</div>
              <div className="text-center">Status</div>
              <div className="text-center">Active Calls</div>
              <div className="text-center">Customer Phone</div>
              <div className="text-center">Monitor</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {activeAgents.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No active calls to monitor at the moment.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
