
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Event } from "@/types";
import { eventsService } from "@/services/api";
import { useAuth } from "./auth-context";
import { useToast } from "@/hooks/use-toast";

interface EventContextType {
  events: Event[];
  loading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
  createEvent: (event: Event) => Promise<boolean>;
  updateEvent: (event: Event) => Promise<boolean>;
  deleteEvent: (eventId: string) => Promise<boolean>;
  selectedEvent: Event | null;
  setSelectedEvent: (event: Event | null) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { isAuthenticated, getToken } = useAuth();
  const { toast } = useToast();

  const fetchEvents = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError(null);
    
    const token = getToken();
    if (!token) {
      setError("Authentication token not found");
      setLoading(false);
      return;
    }
    
    const response = await eventsService.getEvents(token);
    setLoading(false);
    
    if (response.success && response.data) {
      setEvents(response.data);
    } else {
      setError(response.message || "Failed to fetch events");
      toast({
        title: "Error",
        description: response.message || "Failed to fetch events",
        variant: "destructive",
      });
    }
  };
  
  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents();
    }
  }, [isAuthenticated]);

  const createEvent = async (event: Event): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    const token = getToken();
    if (!token) {
      setError("Authentication token not found");
      setLoading(false);
      return false;
    }
    
    const response = await eventsService.createEvent(token, event);
    setLoading(false);
    
    if (response.success && response.data) {
      setEvents([...events, response.data]);
      toast({
        title: "Success",
        description: "Event created successfully",
      });
      return true;
    } else {
      setError(response.message || "Failed to create event");
      toast({
        title: "Error",
        description: response.message || "Failed to create event",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateEvent = async (event: Event): Promise<boolean> => {
    if (!event.id) return false;
    
    setLoading(true);
    setError(null);
    
    const token = getToken();
    if (!token) {
      setError("Authentication token not found");
      setLoading(false);
      return false;
    }
    
    const response = await eventsService.updateEvent(token, event);
    setLoading(false);
    
    if (response.success && response.data) {
      setEvents(events.map(e => e.id === event.id ? response.data! : e));
      toast({
        title: "Success",
        description: "Event updated successfully",
      });
      return true;
    } else {
      setError(response.message || "Failed to update event");
      toast({
        title: "Error",
        description: response.message || "Failed to update event",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteEvent = async (eventId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    const token = getToken();
    if (!token) {
      setError("Authentication token not found");
      setLoading(false);
      return false;
    }
    
    const response = await eventsService.deleteEvent(token, eventId);
    setLoading(false);
    
    if (response.success) {
      setEvents(events.filter(e => e.id !== eventId));
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
      return true;
    } else {
      setError(response.message || "Failed to delete event");
      toast({
        title: "Error",
        description: response.message || "Failed to delete event",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        loading,
        error,
        fetchEvents,
        createEvent,
        updateEvent,
        deleteEvent,
        selectedEvent,
        setSelectedEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
};
