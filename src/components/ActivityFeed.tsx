
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Phone, PhoneOff, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface Activity {
  id: string;
  type: 'call_started' | 'call_ended' | 'error' | 'success' | 'warning';
  message: string;
  timestamp: Date;
  agentId: string;
  duration?: number;
}

interface ActivityFeedProps {
  activities: Activity[];
}

export const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'call_started':
        return <Phone className="h-4 w-4 text-blue-600" />;
      case 'call_ended':
        return <PhoneOff className="h-4 w-4 text-gray-600" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <CheckCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityBadge = (type: Activity['type']) => {
    switch (type) {
      case 'call_started':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700">Started</Badge>;
      case 'call_ended':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-700">Ended</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'success':
        return <Badge variant="secondary" className="bg-green-100 text-green-700">Success</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Warning</Badge>;
      default:
        return <Badge variant="secondary">Info</Badge>;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <ScrollArea className="h-80">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
            <div className="flex-shrink-0 mt-0.5">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {activity.message}
                </p>
                {getActivityBadge(activity.type)}
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>Agent {activity.agentId}</span>
                <span>•</span>
                <span>{formatTimestamp(activity.timestamp)}</span>
                {activity.duration && (
                  <>
                    <span>•</span>
                    <span>{activity.duration}s duration</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
