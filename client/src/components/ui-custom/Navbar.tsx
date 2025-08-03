import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Users,
  LineChart,
  KanbanSquare,
  TrendingUp,
  Brain,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Leads', path: '/leads', icon: Users },
  { name: 'Pipeline', path: '/pipeline', icon: KanbanSquare },
  { name: 'Analytics', path: '/analytics', icon: TrendingUp },
  { name: 'AI Insights', path: '/insights', icon: Brain },
];

const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isHomePage = location.pathname === '/';
  const isAuthPage = location.pathname === '/auth';

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // optional
    navigate('/'); // or navigate('/login')
  };


  if (isAuthPage) {
    return null; // Hide navbar on auth page
  }



  return (
    <>
      {/* Desktop/Tablet Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300 md:block ${isMobile ? 'hidden' : ''} ${scrolled || !isHomePage ? 'bg-white bg-opacity-90 backdrop-blur-md shadow-subtle dark:bg-gray-900 dark:bg-opacity-90' : 'bg-transparent'
          }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold">SL</span>
              </div>
              <span className="font-semibold text-lg hidden sm:block">SmartLeads AI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                >
                  <item.icon className={`h-4 w-4 mr-1 ${isActive ? 'text-white' : ''}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Search className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full relative">
                      <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-xs">
                        3
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to="/notifications">
                      <DropdownMenuItem className="cursor-pointer">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium">New lead assigned</p>
                          <p className="text-xs text-gray-500">John Smith was assigned to you</p>
                          <p className="text-xs text-gray-400">2 minutes ago</p>
                        </div>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">Meeting reminder</p>
                        <p className="text-xs text-gray-500">Call with ABC Corp in 30 minutes</p>
                        <p className="text-xs text-gray-400">1 hour ago</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">Task completed</p>
                        <p className="text-xs text-gray-500">Sales proposal was approved</p>
                        <p className="text-xs text-gray-400">Yesterday</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <Link to="/notifications">
                      <DropdownMenuItem className="cursor-pointer text-center text-primary">
                        View all notifications
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 border border-gray-200 dark:border-gray-700 cursor-pointer">
                      <div className="bg-accent text-accent-foreground">JD</div>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link to="/profile">
                      <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/settings">
                      <DropdownMenuItem className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                {/* <Link to="/login">
                  <Button variant="ghost" className="text-sm">Login</Button>
                </Link> */}
                <Link to="/auth">
                  <Button className="text-sm">Login</Button>
                </Link>
              </>
            )}

            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}


          </div>

        </div>

        {/* Mobile menu */}
        {isMobile && isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-md animate-fade-in">
            <div className="container mx-auto py-2 px-4">
              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center px-3 py-3 rounded-md text-sm font-medium transition-all duration-200 ${isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:text-primary hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                        }`}
                    >
                      <item.icon className={`h-4 w-4 mr-2 ${isActive ? 'text-white' : ''}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

      </header>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 md:hidden">
          <div className="flex justify-around items-center py-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex flex-col items-center gap-1 px-3 py-2 min-w-0 flex-1 ${isActive
                    ? 'text-primary'
                    : 'text-gray-600 dark:text-gray-400'
                    }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-primary' : ''}`} />
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;