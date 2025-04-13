
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from "@/types";
import { useEvents } from "@/contexts/event-context";
import { format } from "date-fns";

const EventCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { events, setSelectedEvent } = useEvents();

  // Get events for the selected date
  const getEventsForDate = (date: Date | undefined) => {
    if (!date) return [];
    
    return events.filter((event) => {
      const eventDate = new Date(event.startDate);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const selectedEvents = getEventsForDate(date);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Calendar</CardTitle>
          <CardDescription>Select a date to view events</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border mx-auto"
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>
            Events for {date ? format(date, "MMMM d, yyyy") : "Today"}
          </CardTitle>
          <CardDescription>
            {selectedEvents.length
              ? `${selectedEvents.length} event${selectedEvents.length > 1 ? "s" : ""} scheduled`
              : "No events scheduled"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {selectedEvents.length > 0 ? (
              selectedEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="p-3 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <div className="font-medium">{event.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(event.startDate), "h:mm a")} - {format(new Date(event.endDate), "h:mm a")}
                  </div>
                  {event.location && (
                    <div className="text-sm text-muted-foreground">{event.location}</div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No events scheduled for this day
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventCalendar;
