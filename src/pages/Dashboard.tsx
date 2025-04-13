
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquareText, CalendarDays } from "lucide-react";
import ChatPanel from "@/components/dashboard/ChatPanel";
import EventList from "@/components/dashboard/EventList";
import EventCalendar from "@/components/dashboard/EventCalendar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/auth-context";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Hello, {user?.name || "User"}
          </h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:inline-flex">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquareText className="h-4 w-4" />
              <span>AI Assistant</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>Events</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-2/3 h-[calc(100vh-20rem)]">
                <ChatPanel />
              </div>
              
              <div className="w-full md:w-1/3">
                <EventCalendar />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="events">
            <div className="h-[calc(100vh-20rem)]">
              <EventList />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
