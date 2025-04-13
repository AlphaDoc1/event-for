
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, AlertCircle, Server } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [backendStatus, setBackendStatus] = useState<'loading' | 'online' | 'offline'>('loading');
  const [showBackendAlert, setShowBackendAlert] = useState(false);

  useEffect(() => {
    // Check backend connection status
    const checkBackendStatus = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/health', {
          signal: AbortSignal.timeout(10000), // 10 second timeout for slower connections
          mode: 'cors', // Ensure CORS is enabled
          headers: {
            'Accept': 'application/json'
          }
        });
        if (response.ok) {
          setBackendStatus('online');
          setShowBackendAlert(false);
        } else {
          setBackendStatus('offline');
          setShowBackendAlert(true);
        }
      } catch (error) {
        console.error("Backend connection error:", error);
        setBackendStatus('offline');
        setShowBackendAlert(true);
      }
    };

    checkBackendStatus();
    // Check status periodically
    const intervalId = setInterval(checkBackendStatus, 30000); // Every 30 seconds
    
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-brand-600" />
            <span className="text-xl font-bold">EventScribe</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge 
                    variant={backendStatus === 'online' ? "outline" : "destructive"} 
                    className="flex items-center gap-1 cursor-help"
                    onClick={() => setShowBackendAlert(!showBackendAlert)}
                  >
                    <Server className="h-3 w-3" />
                    {backendStatus === 'loading' ? 'Connecting...' : 
                     backendStatus === 'online' ? 'Backend Online' : 'Backend Offline'}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  {backendStatus === 'online' 
                    ? 'Spring Boot backend is connected' 
                    : 'Spring Boot backend is not running at http://localhost:8080. Click to see setup instructions.'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      
      {showBackendAlert && backendStatus === 'offline' && (
        <div className="container my-4">
          <Alert variant="destructive">
            <Server className="h-4 w-4" />
            <AlertDescription>
              <p><strong>Backend connection error:</strong> Cannot connect to the Spring Boot backend</p>
              <div className="mt-2 text-sm">
                <p>To run this application, you need to:</p>
                <ol className="list-decimal pl-5 mt-1 space-y-1">
                  <li>Make sure the Spring Boot application is running on port 8080</li>
                  <li>Verify that <code>http://localhost:8080/api/health</code> is accessible</li>
                  <li>Set the <code>db_password</code> environment variable with your MongoDB password</li>
                  <li>Start the Spring Boot application with <code>mvn spring-boot:run</code> command</li>
                  <li>Ensure it implements these API endpoints:
                    <ul className="list-disc pl-5 mt-1">
                      <li><code>/api/health</code> - Health check endpoint</li>
                      <li><code>/api/auth/login</code> - Authentication endpoint</li>
                      <li><code>/api/auth/register</code> - Registration endpoint</li>
                      <li><code>/api/events</code> - Events management endpoints</li>
                    </ul>
                  </li>
                </ol>
                <p className="mt-2">Once your backend is running, refresh this page.</p>
                <p className="mt-1">The frontend is running on port 8081 while the backend should be on port 8080.</p>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
};

export default Navbar;
