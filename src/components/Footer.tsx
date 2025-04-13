
import { CalendarDays } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-brand-600" />
            <span className="text-xl font-bold">EventScribe</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact Us
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} EventScribe. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
