
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

interface Campaign {
  id: string;
  name: string;
  dialLevel: number;
  status: 'active' | 'paused' | 'stopped';
}

interface CampaignSelectorProps {
  campaigns: Campaign[];
  selectedCampaign: Campaign | null;
  onCampaignSelect: (campaign: Campaign) => void;
}

export const CampaignSelector = ({ campaigns, selectedCampaign, onCampaignSelect }: CampaignSelectorProps) => {
  return (
    <Card className="bg-white border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Select Campaign:</label>
          <Select 
            value={selectedCampaign?.id || ''} 
            onValueChange={(value) => {
              const campaign = campaigns.find(c => c.id === value);
              if (campaign) onCampaignSelect(campaign);
            }}
          >
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Choose a campaign" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
              {campaigns.map((campaign) => (
                <SelectItem key={campaign.id} value={campaign.id}>
                  {campaign.name} (Level: {campaign.dialLevel})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedCampaign && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Status:</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                selectedCampaign.status === 'active' ? 'bg-green-100 text-green-800' :
                selectedCampaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {selectedCampaign.status.toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
