import { useEffect } from "react";
import { useEvents, useDonations, useActivities } from "@/lib/api/hooks";
import { PageHeader } from "@/components/layout/page-header";
import { Heart, Calendar, Activity, Users } from "lucide-react";
import { StatCard } from "./components/stat-card";
import { RecentDonations } from "./components/recent-donations";
import { UpcomingEvents } from "./components/upcoming-events";
import { ActivityChart } from "./components/activity-chart";
import { ActivityData, ActivityMetrics, DonationMetrics } from "@/lib/api/types";
import { create } from "zustand";

interface ActivityChartData {
  name: string;
  donations: number;
  events: number;
}

interface DashboardStore {
  activityData: ActivityChartData[];
  setActivityData: (data: ActivityChartData[]) => void;
}

const useDashboardStore = create<DashboardStore>((set) => ({
  activityData: [],
  setActivityData: (data) => set({ activityData: data }),
}));

function combineMetricsData(
  donationsMetrics: DonationMetrics | undefined,
  activitiesMetrics: ActivityMetrics | undefined
): ActivityChartData[] {
  if (!donationsMetrics?.monthlyStats || !activitiesMetrics?.monthlyStats) {
    return [];
  }

  const DEFAULT_MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  return donationsMetrics.monthlyStats.map((donationStat, index) => ({
    name: DEFAULT_MONTHS[index] || `Month ${index + 1}`,
    donations: donationStat.donations,
    events: activitiesMetrics.monthlyStats[index]?.activities || 0
  }));
}

export default function DashboardPage() {
  const { events = [], isLoading: eventsLoading } = useEvents();
  const { 
    donations = [], 
    isLoading: donationsLoading,
    metrics: { data: donationsMetrics, isLoading: donationsMetricsLoading }
  } = useDonations();
  const { 
    activities = [], 
    isLoading: activitiesLoading,
    metrics: { data: activitiesMetrics, isLoading: activitiesMetricsLoading }
  } = useActivities();
  const { activityData, setActivityData } = useDashboardStore();

  useEffect(() => {
    if (!donationsMetricsLoading && !activitiesMetricsLoading && donationsMetrics && activitiesMetrics) {
      const combinedData = combineMetricsData(donationsMetrics, activitiesMetrics);
      setActivityData(combinedData);
    }
  }, [donationsMetrics, activitiesMetrics, donationsMetricsLoading, activitiesMetricsLoading]);

  const totalRsvps = events.reduce((acc, event) => acc + (event.rsvpCount || 0), 0);
  const upcomingEvents = events
    .filter((event) => new Date(event.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const recentDonations = donations
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  if (eventsLoading || donationsLoading || activitiesLoading || donationsMetricsLoading || activitiesMetricsLoading) {
    return <div className="text-foreground">loading....</div>;
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Dashboard Overview" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Donations"
          value={donations.length}
          icon={Heart}
          change={{ value: "", positive: true }}
        />
        <StatCard
          title="Upcoming Events"
          value={events.length}
          icon={Calendar}
          change={{ value: "", positive: true }}
        />
        <StatCard
          title="Total Activities"
          value={activities.length}
          icon={Activity}
          change={{ value: "", positive: true }}
        />
        <StatCard
          title="Event Registrations"
          value={totalRsvps}
          icon={Users}
          change={{ value: "", positive: true }}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ActivityChart data={activityData} />
        </div>
        <div className="flex flex-col gap-4">
          <RecentDonations donations={recentDonations} />
          <UpcomingEvents events={upcomingEvents} />
        </div>
      </div>
    </div>
  );
}