
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Phone, Clock, TrendingUp, AlertCircle, CheckCircle, Users } from 'lucide-react';
import { ActivityFeed } from '@/components/ActivityFeed';
import { AgentStatusGrid } from '@/components/AgentStatusGrid';
import { CallMetricsTable } from '@/components/CallMetricsTable';
import { SystemStatus } from '@/components/SystemStatus';
import { CampaignSelector } from '@/components/CampaignSelector';
import { LeadsManagement } from '@/components/LeadsManagement';
import { CampaignManagement } from '@/components/CampaignManagement';
import { AgentCallMonitor } from '@/components/AgentCallMonitor';
import { MetricsChart } from '@/components/MetricsChart';
import { LoginForm } from '@/components/LoginForm';
import { useRealtimeMetrics } from '@/hooks/useRealtimeMetrics';
import { useAuth, AuthProvider } from '@/contexts/AuthContext';

interface Campaign {
  id: string;
  name: string;
  dialLevel: number;
  status: 'active' | 'paused' | 'stopped';
  totalLeads: number;
  dialedLeads: number;
  pendingLeads: number;
}

const MainDashboard = () => {
  const { user, logout } = useAuth();
  const { metrics, agents, activities } = useRealtimeMetrics();
  
  const [campaigns] = useState<Campaign[]>([
    { id: '1', name: 'Summer Sales Campaign', dialLevel: 3, status: 'active', totalLeads: 1500, dialedLeads: 678, pendingLeads: 822 },
    { id: '2', name: 'Product Launch Outreach', dialLevel: 5, status: 'active', totalLeads: 2000, dialedLeads: 1200, pendingLeads: 800 },
    { id: '3', name: 'Customer Retention', dialLevel: 2, status: 'paused', totalLeads: 800, dialedLeads: 200, pendingLeads: 600 },
    { id: '4', name: 'Market Research Survey', dialLevel: 4, status: 'active', totalLeads: 1200, dialedLeads: 800, pendingLeads: 400 },
  ]);
  
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(campaigns[0]);

  const handleDialLevelChange = (campaignId: string, newDialLevel: number) => {
    console.log(`Campaign ${campaignId} dial level changed to ${newDialLevel}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold">Voice Agent Admin</h1>
            {user && (
              <Badge variant="secondary" className="bg-white text-green-600">
                {user.role === 'admin' ? 'Administrator' : 'User'}: {user.name}
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <span>Real-Time Report</span>
            <span>Status: ACTIVE</span>
            <span>{new Date().toLocaleString()}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={logout}
              className="text-white border-white hover:bg-white hover:text-green-600"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800 text-white px-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="bg-transparent border-0 space-x-0">
            <TabsTrigger value="dashboard" className="bg-gray-600 data-[state=active]:bg-gray-700 rounded-none border-r border-gray-600">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="campaign" className="hover:bg-gray-700 data-[state=active]:bg-gray-700 rounded-none border-r border-gray-600">
              Campaign
            </TabsTrigger>
            <TabsTrigger value="lists" className="hover:bg-gray-700 data-[state=active]:bg-gray-700 rounded-none border-r border-gray-600">
              Lists
            </TabsTrigger>
            <TabsTrigger value="reports" className="hover:bg-gray-700 data-[state=active]:bg-gray-700 rounded-none border-r border-gray-600">
              Reports
            </TabsTrigger>
            {user?.role === 'admin' && (
              <TabsTrigger value="admin" className="hover:bg-gray-700 data-[state=active]:bg-gray-700 rounded-none">
                Admin
              </TabsTrigger>
            )}
          </TabsList>

          <div className="p-6 space-y-6">
            <TabsContent value="dashboard" className="mt-0 space-y-6">
              {/* Campaign Selection */}
              <CampaignSelector 
                campaigns={campaigns} 
                selectedCampaign={selectedCampaign}
                onCampaignSelect={setSelectedCampaign}
              />

              {/* System Status */}
              <SystemStatus metrics={metrics} selectedCampaign={selectedCampaign} />

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

              {/* Agent Call Monitor */}
              <AgentCallMonitor agents={agents} />
            </TabsContent>

            <TabsContent value="campaign" className="mt-0">
              <CampaignManagement 
                campaigns={campaigns} 
                onDialLevelChange={handleDialLevelChange}
              />
            </TabsContent>

            <TabsContent value="lists" className="mt-0">
              <LeadsManagement campaigns={campaigns} />
            </TabsContent>

            <TabsContent value="reports" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Charts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MetricsChart />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {campaigns.map((campaign) => (
                        <div key={campaign.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <div>
                            <div className="font-medium">{campaign.name}</div>
                            <div className="text-sm text-gray-600">Dial Level: {campaign.dialLevel}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{campaign.dialedLeads}/{campaign.totalLeads}</div>
                            <div className="text-xs text-gray-600">
                              {Math.round((campaign.dialedLeads / campaign.totalLeads) * 100)}% Complete
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {user?.role === 'admin' && (
              <TabsContent value="admin" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Admin Panel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                          <div className="text-2xl font-bold">{agents.length}</div>
                          <div className="text-sm text-gray-600">Total Agents</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Activity className="w-8 h-8 mx-auto mb-2 text-green-600" />
                          <div className="text-2xl font-bold">{campaigns.filter(c => c.status === 'active').length}</div>
                          <div className="text-sm text-gray-600">Active Campaigns</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                          <div className="text-2xl font-bold">{metrics.activeCalls}</div>
                          <div className="text-sm text-gray-600">Active Calls</div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <AuthWrapper />
    </AuthProvider>
  );
};

const AuthWrapper = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <LoginForm />;
  }
  
  return <MainDashboard />;
};

export default Index;
