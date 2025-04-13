
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  CalendarDays, 
  MessageSquareText, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  Zap 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_50%_at_50%_50%,hsl(254,86%,96%)_0%,hsl(0,0%,100%)_100%)]" />
          
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Plan Your Events with <span className="gradient-text">AI-Powered</span> Assistance
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  EventScribe makes planning events effortless with conversational AI. Create, manage, and sync your events with Google Calendar.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="gradient-bg">Get Started</Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline">Login</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Powerful Features
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Everything you need to plan and manage your events with ease.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="flex flex-col items-center space-y-2 p-6 bg-white rounded-lg shadow-sm border border-border">
                  <div className="p-2 bg-brand-50 rounded-full">
                    <MessageSquareText className="h-10 w-10 text-brand-600" />
                  </div>
                  <h3 className="text-xl font-bold">AI Chatbot</h3>
                  <p className="text-muted-foreground text-center">
                    Plan events naturally through conversations with our AI assistant.
                  </p>
                </div>
                
                <div className="flex flex-col items-center space-y-2 p-6 bg-white rounded-lg shadow-sm border border-border">
                  <div className="p-2 bg-brand-50 rounded-full">
                    <Calendar className="h-10 w-10 text-brand-600" />
                  </div>
                  <h3 className="text-xl font-bold">Google Calendar Sync</h3>
                  <p className="text-muted-foreground text-center">
                    Seamlessly sync your events with Google Calendar.
                  </p>
                </div>
                
                <div className="flex flex-col items-center space-y-2 p-6 bg-white rounded-lg shadow-sm border border-border">
                  <div className="p-2 bg-brand-50 rounded-full">
                    <Zap className="h-10 w-10 text-brand-600" />
                  </div>
                  <h3 className="text-xl font-bold">Efficient Management</h3>
                  <p className="text-muted-foreground text-center">
                    Create, edit, and organize your events all in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  How It Works
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Get started with EventScribe in just a few simple steps.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
                <div className="flex flex-col items-center space-y-4 relative">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-600 text-white font-bold text-lg">
                    1
                  </div>
                  <h3 className="text-xl font-bold">Create An Account</h3>
                  <p className="text-muted-foreground text-center">
                    Sign up for a free account to get started with EventScribe.
                  </p>
                  
                  {/* Connector line */}
                  <div className="hidden md:block absolute top-6 left-[calc(100%_-_24px)] w-[calc(100%_-_48px)] h-px bg-border"></div>
                </div>
                
                <div className="flex flex-col items-center space-y-4 relative">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-600 text-white font-bold text-lg">
                    2
                  </div>
                  <h3 className="text-xl font-bold">Chat With AI</h3>
                  <p className="text-muted-foreground text-center">
                    Tell our AI assistant about your event in natural language.
                  </p>
                  
                  {/* Connector line */}
                  <div className="hidden md:block absolute top-6 left-[calc(100%_-_24px)] w-[calc(100%_-_48px)] h-px bg-border"></div>
                </div>
                
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-600 text-white font-bold text-lg">
                    3
                  </div>
                  <h3 className="text-xl font-bold">Manage Events</h3>
                  <p className="text-muted-foreground text-center">
                    View, edit, and sync your events with Google Calendar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-20 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Why Choose EventScribe?
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  We've designed EventScribe to make event planning as simple and intuitive as possible. Our AI assistant understands natural language, so you can plan events just like you would when talking to a human assistant.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-6 w-6 text-brand-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Natural Conversation</h3>
                      <p className="text-muted-foreground">
                        Plan events through natural language conversations.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-6 w-6 text-brand-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Time-Saving</h3>
                      <p className="text-muted-foreground">
                        Create and manage events in seconds, not minutes.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-6 w-6 text-brand-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Synchronized</h3>
                      <p className="text-muted-foreground">
                        Keep all your calendars in sync automatically.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-6 w-6 text-brand-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Secure</h3>
                      <p className="text-muted-foreground">
                        Your data is always secure and private.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-center relative">
                <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-brand-600/20 to-blue-500/20 rounded-lg p-1">
                  <div className="absolute -top-4 -left-4 bg-white shadow-lg rounded-lg p-4 max-w-xs">
                    <div className="flex items-start gap-2">
                      <div className="h-8 w-8 rounded-full bg-brand-600 flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-white" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">EventScribe AI</p>
                        <p className="text-xs">
                          I'll help you plan your team meeting for next Tuesday at 3pm.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -right-4 bg-white shadow-lg rounded-lg p-4 max-w-xs">
                    <div className="flex items-start gap-2">
                      <div className="h-8 w-8 rounded-full bg-brand-50 flex items-center justify-center">
                        <CalendarDays className="h-4 w-4 text-brand-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Event Created</p>
                        <p className="text-xs">
                          Team Meeting scheduled for Tuesday, 3:00 PM - 4:00 PM.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl rounded-lg p-6 max-w-sm">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold">Team Meeting</h3>
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Tuesday, May 12, 2025
                        </p>
                        <p className="text-sm text-muted-foreground">
                          3:00 PM - 4:00 PM
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Conference Room A
                        </p>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button size="sm">Add to Calendar</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-brand-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Ready to Simplify Your Event Planning?
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl">
                Join thousands of users who save time and reduce stress with EventScribe.
              </p>
              <Link to="/register">
                <Button size="lg" variant="secondary">Get Started for Free</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
