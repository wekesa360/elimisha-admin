import { Activity, Contact, Donation, Event, Partner, Poster, RSVPEntry } from './types';
import api from './axios';

export const activities = {
  list: () => api.get<Activity[]>('/activities').then((res: { data: any; }) => res.data),
  metrics: () => api.get<{ total: number; upcoming: number; past: number; }>(`/activities/metrics`).then((res: { data: any; }) => res.data),
  create: (data: FormData) => api.post<Activity>('/activities', data).then((res: { data: any; }) => res.data),
  update: (id: string, data: FormData) => api.put<Activity>(`/activities/${id}`, data).then((res: { data: any; }) => res.data),
  delete: (id: string) => api.delete(`/activities/${id}`).then((res: { data: any; }) => res.data),
};

export const donations = {
  list: () => api.get<Donation[]>('/donations').then((res: { data: any; }) => res.data),
  metrics: () => api.get<{ total: number; pending: number; approved: number; rejected: number; }>(`/donations/metrics`).then((res: { data: any; }) => res.data),
  create: (data: FormData) => api.post<Donation>('/donations', data).then((res: { data: any; }) => res.data),
  update: (id: string, data: FormData) => api.put<Donation>(`/donations/${id}`, data).then((res: { data: any; }) => res.data),
  delete: (id: string) => api.delete(`/donations/${id}`).then((res: { data: any; }) => res.data),
};

export const events = {
  list: () => api.get<Event[]>('/events').then((res: { data: any; }) => res.data),
  create: (data: FormData) => api.post<Event>('/events', data).then((res: { data: any; }) => res.data),
  update: (id: string, data: FormData) => api.put<Event>(`/events/${id}`, data).then((res: { data: any; }) => res.data),
  delete: (id: string) => api.delete(`/events/${id}`).then((res: { data: any; }) => res.data),
  getRSVPs: (eventId: string) => api.get<RSVPEntry[]>(`/events/${eventId}/rsvp`).then((res: { data: any; }) => res.data),
  submitRsvp: (eventId: string, data: FormData) => 
    api.post<RSVPEntry>(`/events/${eventId}/rsvp`, data).then((res: { data: any; }) => res.data),
  updateRsvp: (eventId: string, rsvpId: string, data: FormData) =>
    api.put<RSVPEntry>(`/events/${eventId}/rsvp/${rsvpId}`, data).then((res: { data: any; }) => res.data),
  deleteRsvp: (eventId: string, rsvpId: string) => 
    api.delete(`/events/${eventId}/rsvp/${rsvpId}`).then((res: { data: any; }) => res.data),
};

export const partners = {
  list: () => api.get<Partner[]>('/partners').then((res: { data: any; }) => res.data),
  create: (data: FormData) => api.post<Partner>('/partners', data).then((res: { data: any; }) => res.data),
  update: (id: string, data: FormData) => api.put<Partner>(`/partners/${id}`, data).then((res: { data: any; }) => res.data),
  delete: (id: string) => api.delete(`/partners/${id}`).then((res: { data: any; }) => res.data),
};

export const contacts = {
  list: () => api.get<Contact[]>('/contacts').then((res: { data: any; }) => res.data),
  create: (data: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<Contact>('/contacts', data).then((res: { data: any; }) => res.data),
  delete: (id: string) => api.delete(`/contacts/${id}`).then((res: { data: any; }) => res.data),
};

export const posters = {
  list: () => api.get<Poster[]>('/posters').then((res: { data: any; }) => res.data),
  create: (data: FormData) => api.post<Poster>('/posters', data).then((res: { data: any; }) => res.data),
  update: (id: string, data: FormData) => api.put<Poster>(`/posters/${id}`, data).then((res: { data: any; }) => res.data),
  toggle: (id: string) => api.patch<Poster>(`/posters/${id}/toggle`).then((res: { data: any; }) => res.data),
  delete: (id: string) => api.delete(`/posters/${id}`).then((res: { data: any; }) => res.data),
};