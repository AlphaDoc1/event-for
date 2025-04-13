
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import { authService } from "@/services/api";
import { CalendarDays, AlertCircle, Server } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    if (password !== confirmPassword) {
      setError("Passwords don't match. Please try again.");
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await authService.register({ name, email, password });
      
      if (response.success && response.data) {
        login(response.data.user, response.data.token);
        toast({
          title: "Registration successful",
          description: "Your account has been created!",
        });
        navigate("/dashboard");
      } else {
        setError(response.message || "Failed to create account. Please try again.");
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: response.message || "Failed to create account. Please try again.",
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unexpected error occurred. Please try again.";
        
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Registration error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isBackendConnectionError = error && (
    error.includes("Failed to fetch") || 
    error.includes("connect to server") || 
    error.includes("Connection timeout") ||
    error.includes("backend is running")
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <CalendarDays className="h-12 w-12 text-brand-600" />
            </div>
            <h2 className="text-3xl font-bold">Create your account</h2>
            <p className="text-muted-foreground mt-2">
              Get started with EventScribe
            </p>
          </div>
          
          {isBackendConnectionError && (
            <Alert variant="destructive">
              <Server className="h-4 w-4" />
              <AlertDescription>
                <p><strong>Backend connection error:</strong> {error}</p>
                <div className="mt-2 text-sm">
                  <p>To run this application, you need to:</p>
                  <ol className="list-decimal pl-5 mt-1 space-y-1">
                    <li>Create a Spring Boot application on your local machine</li>
                    <li>Configure it to run on <code>http://localhost:8080</code></li>
                    <li>Implement these API endpoints:
                      <ul className="list-disc pl-5 mt-1">
                        <li><code>/api/health</code> - Health check endpoint</li>
                        <li><code>/api/auth/login</code> - Authentication endpoint</li>
                        <li><code>/api/auth/register</code> - Registration endpoint</li>
                        <li><code>/api/events</code> - Events management endpoints</li>
                      </ul>
                    </li>
                    <li>Enable CORS to allow requests from this frontend</li>
                  </ol>
                  <p className="mt-2">Once your backend is running, refresh this page and try registering again.</p>
                </div>
              </AlertDescription>
            </Alert>
          )}
          
          {error && !isBackendConnectionError && (
            <Alert variant="default">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="youremail@example.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-brand-600 hover:text-brand-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
