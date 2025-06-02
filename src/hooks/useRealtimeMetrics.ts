
import { useState, useEffect } from 'react';

interface Metrics {
  activeCalls: number;
  successRate: number;
  avgResponse: number;
  totalAgents: number;
}

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

interface Activity {
  id: string;
  type: 'call_started' | 'call_ended' | 'error' | 'success' | 'warning';
  message: string;
  timestamp: Date;
  agentId: string;
  duration?: number;
}

export const useRealtimeMetrics = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    activeCalls: 24,
    successRate: 96,
    avgResponse: 2.3,
    totalAgents: 6,
  });

  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 'VA001',
      name: 'Customer Support Agent',
      status: 'online',
      currentCalls: 3,
      totalCalls: 45,
      avgResponseTime: 2.1,
      successRate: 98,
      lastActivity: new Date(Date.now() - 2 * 60000),
    },
    {
      id: 'VA002',
      name: 'Sales Assistant',
      status: 'busy',
      currentCalls: 5,
      totalCalls: 67,
      avgResponseTime: 1.8,
      successRate: 94,
      lastActivity: new Date(Date.now() - 1 * 60000),
    },
    {
      id: 'VA003',
      name: 'Technical Support',
      status: 'online',
      currentCalls: 2,
      totalCalls: 31,
      avgResponseTime: 3.2,
      successRate: 92,
      lastActivity: new Date(Date.now() - 5 * 60000),
    },
    {
      id: 'VA004',
      name: 'Booking Agent',
      status: 'error',
      currentCalls: 0,
      totalCalls: 12,
      avgResponseTime: 2.7,
      successRate: 89,
      lastActivity: new Date(Date.now() - 15 * 60000),
    },
    {
      id: 'VA005',
      name: 'General Inquiry',
      status: 'online',
      currentCalls: 1,
      totalCalls: 28,
      avgResponseTime: 2.0,
      successRate: 97,
      lastActivity: new Date(Date.now() - 3 * 60000),
    },
    {
      id: 'VA006',
      name: 'Emergency Response',
      status: 'offline',
      currentCalls: 0,
      totalCalls: 8,
      avgResponseTime: 1.5,
      successRate: 100,
      lastActivity: new Date(Date.now() - 45 * 60000),
    },
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      type: 'call_started',
      message: 'New incoming call from customer',
      timestamp: new Date(Date.now() - 30000),
      agentId: 'VA001',
    },
    {
      id: '2',
      type: 'success',
      message: 'Call completed successfully',
      timestamp: new Date(Date.now() - 60000),
      agentId: 'VA002',
      duration: 180,
    },
    {
      id: '3',
      type: 'error',
      message: 'Connection timeout detected',
      timestamp: new Date(Date.now() - 120000),
      agentId: 'VA004',
    },
    {
      id: '4',
      type: 'call_started',
      message: 'Call transferred from queue',
      timestamp: new Date(Date.now() - 180000),
      agentId: 'VA003',
    },
    {
      id: '5',
      type: 'warning',
      message: 'High response time detected',
      timestamp: new Date(Date.now() - 240000),
      agentId: 'VA005',
    },
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Update metrics
      setMetrics(prev => ({
        ...prev,
        activeCalls: Math.max(15, prev.activeCalls + (Math.random() > 0.5 ? 1 : -1)),
        successRate: Math.max(90, Math.min(100, prev.successRate + (Math.random() - 0.5) * 2)),
        avgResponse: Math.max(1.0, prev.avgResponse + (Math.random() - 0.5) * 0.2),
      }));

      // Occasionally add new activities
      if (Math.random() > 0.7) {
        const newActivity: Activity = {
          id: Date.now().toString(),
          type: ['call_started', 'call_ended', 'success', 'warning'][Math.floor(Math.random() * 4)] as Activity['type'],
          message: [
            'New call initiated',
            'Call completed',
            'Agent response optimized',
            'Minor delay detected',
          ][Math.floor(Math.random() * 4)],
          timestamp: new Date(),
          agentId: `VA00${Math.floor(Math.random() * 6) + 1}`,
          duration: Math.random() > 0.5 ? Math.floor(Math.random() * 300) + 60 : undefined,
        };

        setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
      }

      // Update agent statuses occasionally
      if (Math.random() > 0.8) {
        setAgents(prev => prev.map(agent => ({
          ...agent,
          currentCalls: Math.max(0, agent.currentCalls + (Math.random() > 0.5 ? 1 : -1)),
          totalCalls: agent.totalCalls + (Math.random() > 0.7 ? 1 : 0),
          lastActivity: Math.random() > 0.9 ? new Date() : agent.lastActivity,
        })));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { metrics, agents, activities };
};
