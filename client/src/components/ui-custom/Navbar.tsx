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
                        <img src="data:image/jpeg;base64,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" alt="Avatar" />
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