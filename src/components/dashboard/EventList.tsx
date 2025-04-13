
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { useEvents } from "@/contexts/event-context";
import { Edit, Trash2, MoreVertical, Plus, CalendarDays, Search } from "lucide-react";
import EventForm from "./EventForm";

const EventList = () => {
  const { events, loading, deleteEvent, setSelectedEvent } = useEvents();
  const [searchTerm, setSearchTerm] = useState("");
  const [showEventForm, setShowEventForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  const filteredEvents = events.filter((event) => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEdit = (eventId: string | undefined) => {
    if (!eventId) return;
    const event = events.find((e) => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
      setShowEventForm(true);
    }
  };

  const handleDelete = (eventId: string | undefined) => {
    if (!eventId) return;
    setEventToDelete(eventId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (eventToDelete) {
      await deleteEvent(eventToDelete);
      setEventToDelete(null);
      setShowDeleteDialog(false);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              <span>Your Events</span>
            </CardTitle>
            <CardDescription>Manage your upcoming events</CardDescription>
          </div>
          <Button onClick={() => setShowEventForm(true)} size="sm">
            <Plus className="h-4 w-4 mr-1" /> 
            New Event
          </Button>
        </div>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-[calc(100vh-22rem)]">
          {loading ? (
            <div className="py-12 flex justify-center text-muted-foreground">
              Loading events...
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="space-y-2">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 border rounded-md flex justify-between items-start"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{event.title}</h4>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(event.startDate), "MMM d, yyyy")}
                      {event.isAllDay
                        ? " (All day)"
                        : `, ${format(new Date(event.startDate), "h:mm a")} - ${format(
                            new Date(event.endDate),
                            "h:mm a"
                          )}`}
                    </div>
                    {event.location && (
                      <div className="text-sm text-muted-foreground">
                        {event.location}
                      </div>
                    )}
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(event.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(event.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <CalendarDays className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-1">No events found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm
                  ? "No events match your search criteria"
                  : "You haven't created any events yet"}
              </p>
              <Button onClick={() => setShowEventForm(true)}>
                <Plus className="h-4 w-4 mr-1" /> 
                Create Event
              </Button>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      
      {/* Create/Edit Event Dialog */}
      <Dialog open={showEventForm} onOpenChange={setShowEventForm}>
        <DialogContent className="sm:max-w-lg">
          <EventForm onClose={() => setShowEventForm(false)} />
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default EventList;
