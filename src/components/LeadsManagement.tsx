
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pause, Play } from 'lucide-react';

interface Lead {
  id: string;
  phoneNumber: string;
  name: string;
  status: 'dialing' | 'pending' | 'completed' | 'failed';
  attempts: number;
  lastAttempt?: Date;
}

interface Campaign {
  id: string;
  name: string;
  dialLevel: number;
  status: 'active' | 'paused' | 'stopped';
}

interface LeadsManagementProps {
  campaigns: Campaign[];
}

export const LeadsManagement = ({ campaigns }: LeadsManagementProps) => {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isDialing, setIsDialing] = useState(true);

  // Mock leads data
  const leads: Lead[] = [
    { id: '1', phoneNumber: '+1234567890', name: 'John Doe', status: 'dialing', attempts: 1 },
    { id: '2', phoneNumber: '+1234567891', name: 'Jane Smith', status: 'pending', attempts: 0 },
    { id: '3', phoneNumber: '+1234567892', name: 'Bob Johnson', status: 'dialing', attempts: 2 },
    { id: '4', phoneNumber: '+1234567893', name: 'Alice Brown', status: 'pending', attempts: 0 },
    { id: '5', phoneNumber: '+1234567894', name: 'Charlie Davis', status: 'completed', attempts: 1 },
  ];

  const dialingLeads = leads.filter(lead => lead.status === 'dialing');
  const pendingLeads = leads.filter(lead => lead.status === 'pending');

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'dialing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Campaign Selection */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium">Campaign:</label>
              <Select 
                value={selectedCampaign?.id || ''} 
                onValueChange={(value) => {
                  const campaign = campaigns.find(c => c.id === value);
                  setSelectedCampaign(campaign || null);
                }}
              >
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select campaign" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                  {campaigns.map((campaign) => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => setIsDialing(!isDialing)}
                variant={isDialing ? "destructive" : "default"}
                size="sm"
                className="flex items-center space-x-2"
              >
                {isDialing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isDialing ? 'Pause Dialing' : 'Resume Dialing'}</span>
              </Button>
              <div className={`px-3 py-1 rounded text-sm font-medium ${
                isDialing ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {isDialing ? 'DIALING ACTIVE' : 'DIALING PAUSED'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedCampaign && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Currently Dialing */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                Currently Dialing
                <Badge variant="secondary">{dialingLeads.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-80 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium text-gray-600">Phone</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-600">Name</th>
                      <th className="px-3 py-2 text-center font-medium text-gray-600">Attempts</th>
                      <th className="px-3 py-2 text-center font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dialingLeads.map((lead, index) => (
                      <tr key={lead.id} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'} hover:bg-blue-50`}>
                        <td className="px-3 py-2 font-mono text-xs">{lead.phoneNumber}</td>
                        <td className="px-3 py-2">{lead.name}</td>
                        <td className="px-3 py-2 text-center">{lead.attempts}</td>
                        <td className="px-3 py-2 text-center">
                          <Badge className={`text-xs ${getStatusColor(lead.status)}`}>
                            {lead.status.toUpperCase()}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Pending Leads */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                Pending Leads
                <Badge variant="secondary">{pendingLeads.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-80 overflow-y-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium text-gray-600">Phone</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-600">Name</th>
                      <th className="px-3 py-2 text-center font-medium text-gray-600">Attempts</th>
                      <th className="px-3 py-2 text-center font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingLeads.map((lead, index) => (
                      <tr key={lead.id} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'} hover:bg-blue-50`}>
                        <td className="px-3 py-2 font-mono text-xs">{lead.phoneNumber}</td>
                        <td className="px-3 py-2">{lead.name}</td>
                        <td className="px-3 py-2 text-center">{lead.attempts}</td>
                        <td className="px-3 py-2 text-center">
                          <Badge className={`text-xs ${getStatusColor(lead.status)}`}>
                            {lead.status.toUpperCase()}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!selectedCampaign && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">Please select a campaign to view leads data.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
