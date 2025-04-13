
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useEvents } from "@/contexts/event-context";
import { Event } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface EventFormProps {
  onClose: () => void;
}

const EventForm = ({ onClose }: EventFormProps) => {
  const { createEvent, selectedEvent, updateEvent, setSelectedEvent } = useEvents();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Event>(
    selectedEvent || {
      title: "",
      description: "",
      startDate: new Date().toISOString(),
      endDate: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
      location: "",
      category: "meeting",
      isAllDay: false,
      color: "#725bf7",
    }
  );
  
  const [startDate, setStartDate] = useState<Date | undefined>(
    selectedEvent ? new Date(selectedEvent.startDate) : new Date()
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    selectedEvent ? new Date(selectedEvent.endDate) : new Date(new Date().getTime() + 60 * 60 * 1000)
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      toast({
        title: "Missing dates",
        description: "Please select start and end dates for your event.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate end date is after start date
    if (endDate < startDate) {
      toast({
        title: "Invalid dates",
        description: "End date must be after start date.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const eventData = {
        ...formData,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };
      
      let success;
      
      if (selectedEvent?.id) {
        // Update existing event
        success = await updateEvent({ ...eventData, id: selectedEvent.id });
      } else {
        // Create new event
        success = await createEvent(eventData);
      }
      
      if (success) {
        setSelectedEvent(null);
        onClose();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isAllDay: checked }));
  };

  const handleCancel = () => {
    setSelectedEvent(null);
    onClose();
  };

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{selectedEvent?.id ? "Edit Event" : "Create Event"}</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Meeting with client"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Event details..."
              rows={3}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Label htmlFor="isAllDay" className="flex-1">All-day Event</Label>
            <Switch
              id="isAllDay"
              checked={formData.isAllDay}
              onCheckedChange={handleSwitchChange}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          {!formData.isAllDay && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Time</Label>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Select 
                    value={startDate ? format(startDate, "HH:mm") : "09:00"}
                    onValueChange={(value) => {
                      if (startDate) {
                        const [hours, minutes] = value.split(":").map(Number);
                        const newDate = new Date(startDate);
                        newDate.setHours(hours);
                        newDate.setMinutes(minutes);
                        setStartDate(newDate);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 * 4 }).map((_, i) => {
                        const hour = Math.floor(i / 4);
                        const minute = (i % 4) * 15;
                        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
                        return (
                          <SelectItem key={time} value={time}>
                            {format(new Date().setHours(hour, minute), "h:mm a")}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>End Time</Label>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Select 
                    value={endDate ? format(endDate, "HH:mm") : "10:00"}
                    onValueChange={(value) => {
                      if (endDate) {
                        const [hours, minutes] = value.split(":").map(Number);
                        const newDate = new Date(endDate);
                        newDate.setHours(hours);
                        newDate.setMinutes(minutes);
                        setEndDate(newDate);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 * 4 }).map((_, i) => {
                        const hour = Math.floor(i / 4);
                        const minute = (i % 4) * 15;
                        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
                        return (
                          <SelectItem key={time} value={time}>
                            {format(new Date().setHours(hour, minute), "h:mm a")}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              placeholder="Conference Room A"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              value={formData.category || "meeting"}
              onValueChange={(value) => {
                setFormData((prev) => ({ ...prev, category: value }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="holiday">Holiday</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : selectedEvent?.id ? "Update Event" : "Create Event"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default EventForm;
