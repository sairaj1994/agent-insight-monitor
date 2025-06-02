
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Phone, Clock, TrendingUp, AlertCircle, CheckCircle, Users } from 'lucide-react';
import { ActivityFeed } from '@/components/ActivityFeed';
import { AgentStatusGrid } from '@/components/AgentStatusGrid';
import { CallMetricsTable } from '@/components/CallMetricsTable';
import { SystemStatus } from '@/components/SystemStatus';
import { useRealtimeMetrics } from '@/hooks/useRealtimeMetrics';

const Index = () => {
  const { metrics, agents, activities } = useRealtimeMetrics();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold">Voice Agent Admin</h1>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <span>Real-Time Report</span>
            <span>Status: ACTIVE</span>
            <span>{new Date().toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800 text-white px-6 py-2">
        <div className="flex space-x-6 text-sm">
          <span className="bg-gray-600 px-3 py-1 rounded">Dashboard</span>
          <span className="hover:bg-gray-700 px-3 py-1 rounded cursor-pointer">Campaign</span>
          <span className="hover:bg-gray-700 px-3 py-1 rounded cursor-pointer">Lists</span>
          <span className="hover:bg-gray-700 px-3 py-1 rounded cursor-pointer">Scripts</span>
          <span className="hover:bg-gray-700 px-3 py-1 rounded cursor-pointer">Reports</span>
          <span className="hover:bg-gray-700 px-3 py-1 rounded cursor-pointer">Admin</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* System Status */}
        <SystemStatus metrics={metrics} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Agent Status */}
          <div className="lg:col-span-1">
            <AgentStatusGrid agents={agents} />
          </div>

          {/* Middle Column - Call Metrics */}
          <div className="lg:col-span-1">
            <CallMetricsTable agents={agents} />
          </div>

          {/* Right Column - Activity Feed */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Real-Time Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityFeed activities={activities} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
