
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Leads from "./pages/Leads";
import Pipeline from "./pages/Pipeline";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import PremiumPlans from "./pages/PremiumPlans";
import Reports from "./pages/Reports";
import Insights from "./pages/Insights";
import LeadActions from "./pages/LeadActions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
            {/* ✅ All protected routes grouped under ProtectedRoute */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/premium-plans" element={<PremiumPlans />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/lead-actions/call-lead" element={<LeadActions.CallLead />} />
          <Route path="/lead-actions/send-email" element={<LeadActions.SendEmail />} />
          <Route path="/lead-actions/schedule-meeting" element={<LeadActions.ScheduleMeeting />} />
        </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
