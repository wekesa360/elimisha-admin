export interface BaseEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Activity extends BaseEntity {
    title: string;
    date: string;
    imageUrl?: string;
    description: string;
  }
  
  export interface Donation extends BaseEntity {
    title: string;
    date: string;
    description: string;
    location: string;
    imageUrl?: string;
  }
  
  export interface RSVPEntry extends BaseEntity {
    eventId: string;
    fullName: string;
    email: string;
    mpesaPhone: string;
    whatsappPhone: string;
  }
  
  export interface Event extends BaseEntity {
    title: string;
    date: string;
    location: string;
    description: string;
    seatsAvailable: number;
    fee: number;
    googleMapsLink: string;
    imageUrl?: string;
    rsvpCount?: number;
    rsvpList?: RSVPEntry[];
  }
  
  export interface Partner extends BaseEntity {
    name: string;
    logoUrl: string;
  }
  
  export interface Contact extends BaseEntity {
    fullName: string;
    email: string;
    message: string;
  }
  
  export interface Poster extends BaseEntity {
    title: string | undefined;
    startDate: string;
    endDate: string;
    imageUrl: string;
    active: boolean;
  }

  export interface ActivityData {
    name: string;
    donations: number;
    events: number;
    }

    export type ActivityMonthlyStats = {
      name: string | null;
      activities: number;
    };
    
    export type ActivityStats = {
      total: number;
      withImages: number;
      avgDescriptionLength: number;
      recentActivities: number;
    };
    
    export type ActivityMetrics = {
      monthlyStats: ActivityMonthlyStats[];
      stats: ActivityStats;
    };

    export type DonationsMonthlyStats = {
      name: string | null;
      donations: number;
      unique_locations: number;
    };
    
    export type LocationStats = {
      location: string;
      count: number;
      lastDonation: string;  // ISO date string
    };
    
    export type DonationStats = {
      total: number;
      uniqueLocations: number;
      withImages: number;
      recentDonations: number;
    };
    
    export type DonationMetrics = {
      monthlyStats: DonationsMonthlyStats[];
      topLocations: LocationStats[];
      stats: DonationStats;
    };