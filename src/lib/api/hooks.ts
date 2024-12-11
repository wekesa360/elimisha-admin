import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import * as api from './endpoints';

export const useActivities = () => {
  const queryClient = useQueryClient();

  const { data: activities, isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: api.activities.list,
  });

  const metrics = useQuery({
    queryKey: ['activities', 'metrics'],
    queryFn: api.activities.metrics,
  });

  const createMutation = useMutation({
    mutationFn: api.activities.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast.success('Activity created successfully');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => api.activities.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast.success('Activity updated successfully');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.activities.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast.success('Activity deleted successfully');
    },
  });

  return {
    activities,
    metrics,
    isLoading,
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    delete: deleteMutation.mutateAsync,
  };
};

export const useDonations = () => {
  const queryClient = useQueryClient();

  const { data: donations, isLoading } = useQuery({
    queryKey: ['donations'],
    queryFn: api.donations.list,
  });

  const metrics = useQuery({
    queryKey: ['donations', 'metrics'],
    queryFn: api.donations.metrics,
  });

  const createMutation = useMutation({
    mutationFn: api.donations.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donations'] });
      toast.success('Donation created successfully');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => api.donations.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donations'] });
      toast.success('Donation updated successfully');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: api.donations.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donations'] });
      toast.success('Donation deleted successfully');
    },
  });

  return {
    donations,
    metrics,
    isLoading,
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    delete: deleteMutation.mutateAsync,
  };
};

export const useEvents = () => {
  const queryClient = useQueryClient();

  // Main events query
  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: api.events.list,
  });

  const getRSVPs = async (eventId: string) => {
    return api.events.getRSVPs(eventId);
  };

  const mutations = {
    create: useMutation({
      mutationFn: api.events.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['events'] });
        toast.success('Event created successfully');
      },
    }),

    update: useMutation({
      mutationFn: ({ id, data }: { id: string; data: FormData }) => 
        api.events.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['events'] });
        toast.success('Event updated successfully');
      },
    }),

    delete: useMutation({
      mutationFn: api.events.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['events'] });
        toast.success('Event deleted successfully');
      },
    }),

    createRsvp: useMutation({
      mutationFn: ({ eventId, data }: { eventId: string; data: FormData }) =>
        api.events.submitRsvp(eventId, data),
      onSuccess: (_, { eventId }) => {
        queryClient.invalidateQueries({ queryKey: ['events', eventId, 'rsvps'] });
        queryClient.invalidateQueries({ queryKey: ['events'] });
        toast.success('RSVP submitted successfully');
      },
    }),

    updateRsvp: useMutation({
      mutationFn: ({ eventId, rsvpId, data }: { eventId: string; rsvpId: string; data: FormData }) =>
        api.events.updateRsvp(eventId, rsvpId, data),
      onSuccess: (_, { eventId }) => {
        queryClient.invalidateQueries({ queryKey: ['events', eventId, 'rsvps'] });
        queryClient.invalidateQueries({ queryKey: ['events'] });
        toast.success('RSVP updated successfully');
      },
    }),

    deleteRsvp: useMutation({
      mutationFn: ({ eventId, rsvpId }: { eventId: string; rsvpId: string }) =>
        api.events.deleteRsvp(eventId, rsvpId),
      onSuccess: (_, { eventId }) => {
        queryClient.invalidateQueries({ queryKey: ['events', eventId, 'rsvps'] });
        queryClient.invalidateQueries({ queryKey: ['events'] });
        toast.success('RSVP deleted successfully');
      },
    }),
  };

  return {
    events,
    isLoading,
    getRSVPs,
    create: mutations.create.mutateAsync,
    update: mutations.update.mutateAsync,
    delete: mutations.delete.mutateAsync,
    createRsvp: mutations.createRsvp.mutateAsync,
    updateRsvp: mutations.updateRsvp.mutateAsync,
    deleteRsvp: mutations.deleteRsvp.mutateAsync,
  };
};
  
  export const usePartners = () => {
    const queryClient = useQueryClient();
  
    const { data: partners, isLoading } = useQuery({
      queryKey: ['partners'],
      queryFn: api.partners.list,
    });
  
    const createMutation = useMutation({
      mutationFn: api.partners.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['partners'] });
        toast.success('Partner created successfully');
      },
    });
  
    const updateMutation = useMutation({
      mutationFn: ({ id, data }: { id: string; data: FormData }) => api.partners.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['partners'] });
        toast.success('Partner updated successfully');
      },
    });
  
    const deleteMutation = useMutation({
      mutationFn: api.partners.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['partners'] });
        toast.success('Partner deleted successfully');
      },
    });
  
    return {
      partners,
      isLoading,
      create: createMutation.mutateAsync,
      update: updateMutation.mutateAsync,
      delete: deleteMutation.mutateAsync,
    };
  };
  
  export const useContacts = () => {
    const queryClient = useQueryClient();
  
    const { data: contacts, isLoading } = useQuery({
      queryKey: ['contacts'],
      queryFn: api.contacts.list,
    });
  
    const createMutation = useMutation({
      mutationFn: api.contacts.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['contacts'] });
        toast.success('Contact created successfully');
      },
    });
  
    const deleteMutation = useMutation({
      mutationFn: api.contacts.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['contacts'] });
        toast.success('Contact deleted successfully');
      },
    });
  
    return {
      contacts,
      isLoading,
      create: createMutation.mutateAsync,
      delete: deleteMutation.mutateAsync,
    };
  };
  
  export const usePosters = () => {
    const queryClient = useQueryClient();
  
    const { data: posters, isLoading } = useQuery({
      queryKey: ['posters'],
      queryFn: api.posters.list,
    });
  
    const createMutation = useMutation({
      mutationFn: api.posters.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['posters'] });
        toast.success('Poster created successfully');
      },
    });
  
    const updateMutation = useMutation({
      mutationFn: ({ id, data }: { id: string; data: FormData }) => api.posters.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['posters'] });
        toast.success('Poster updated successfully');
      },
    });
  
    const toggleMutation = useMutation({
      mutationFn: api.posters.toggle,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['posters'] });
        toast.success('Poster status updated successfully');
      },
    });
  
    const deleteMutation = useMutation({
      mutationFn: api.posters.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['posters'] });
        toast.success('Poster deleted successfully');
      },
    });
  
    return {
      posters,
      isLoading,
      create: createMutation.mutateAsync,
      update: updateMutation.mutateAsync,
      toggle: toggleMutation.mutateAsync,
      delete: deleteMutation.mutateAsync,
    };
  };