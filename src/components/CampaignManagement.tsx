
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

interface Campaign {
  id: string;
  name: string;
  dialLevel: number;
  status: 'active' | 'paused' | 'stopped';
  totalLeads: number;
  dialedLeads: number;
  pendingLeads: number;
}

interface CampaignManagementProps {
  campaigns: Campaign[];
  onDialLevelChange: (campaignId: string, newDialLevel: number) => void;
}

export const CampaignManagement = ({ campaigns, onDialLevelChange }: CampaignManagementProps) => {
  const { user } = useAuth();
  const [editingCampaign, setEditingCampaign] = useState<string | null>(null);
  const [tempDialLevel, setTempDialLevel] = useState<number>(0);

  const handleEditStart = (campaign: Campaign) => {
    setEditingCampaign(campaign.id);
    setTempDialLevel(campaign.dialLevel);
  };

  const handleEditSave = (campaignId: string) => {
    onDialLevelChange(campaignId, tempDialLevel);
    setEditingCampaign(null);
  };

  const handleEditCancel = () => {
    setEditingCampaign(null);
    setTempDialLevel(0);
  };

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'stopped': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Campaign Management</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Campaign Name</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-600">Dial Level</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-600">Total Leads</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-600">Dialed</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-600">Pending</th>
                  {user?.role === 'admin' && (
                    <th className="px-4 py-3 text-center font-medium text-gray-600">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign, index) => (
                  <tr key={campaign.id} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'} hover:bg-blue-50`}>
                    <td className="px-4 py-3 font-medium">{campaign.name}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge className={`text-xs ${getStatusColor(campaign.status)}`}>
                        {campaign.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {editingCampaign === campaign.id ? (
                        <div className="flex items-center justify-center space-x-2">
                          <Input
                            type="number"
                            value={tempDialLevel}
                            onChange={(e) => setTempDialLevel(parseInt(e.target.value) || 0)}
                            className="w-16 h-8 text-center"
                            min="1"
                            max="10"
                          />
                          <Button size="sm" onClick={() => handleEditSave(campaign.id)} className="h-6 px-2 text-xs">
                            Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleEditCancel} className="h-6 px-2 text-xs">
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <span className="font-bold text-blue-600">{campaign.dialLevel}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">{campaign.totalLeads}</td>
                    <td className="px-4 py-3 text-center text-green-600">{campaign.dialedLeads}</td>
                    <td className="px-4 py-3 text-center text-orange-600">{campaign.pendingLeads}</td>
                    {user?.role === 'admin' && (
                      <td className="px-4 py-3 text-center">
                        {editingCampaign !== campaign.id && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditStart(campaign)}
                            className="h-7 px-3 text-xs"
                          >
                            Edit Dial Level
                          </Button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Campaign Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{campaigns.length}</div>
              <div className="text-sm text-gray-600">Total Campaigns</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {campaigns.filter(c => c.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">Active</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {campaigns.filter(c => c.status === 'paused').length}
              </div>
              <div className="text-sm text-gray-600">Paused</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {campaigns.filter(c => c.status === 'stopped').length}
              </div>
              <div className="text-sm text-gray-600">Stopped</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
