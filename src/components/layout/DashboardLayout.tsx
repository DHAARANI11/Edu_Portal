
import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, Menu, User, X, ChevronRight } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface DashboardLayoutProps {
  role: 'student' | 'faculty' | 'admin';
  navItems: NavItem[];
}

export const DashboardLayout = ({ role, navItems }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getBasePath = () => {
    switch (role) {
      case 'student': return '/student';
      case 'faculty': return '/faculty';
      case 'admin': return '/admin';
      default: return '/';
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar - Desktop */}
      <aside 
        className={`fixed left-0 top-0 z-40 h-screen w-64 transition-transform bg-card border-r shadow-md md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <Link to="/" className="text-xl font-bold flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full education-gradient flex items-center justify-center">
            </div>
            <span>EduPortal</span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={closeSidebar}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-6 p-2 bg-muted rounded-lg">
            <Avatar>
              <AvatarImage src={user?.profileImage || ''} alt={user?.firstName || ''} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(user?.firstName || '')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={`flex items-center px-3 py-2.5 rounded-md transition-colors ${
                  isActive(item.href) 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted text-foreground'
                }`}
                onClick={closeSidebar}
              >
                {React.cloneElement(item.icon as React.ReactElement, { 
                  className: 'mr-2 h-4 w-4',
                })}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 md:hidden" 
          onClick={closeSidebar}
        />
      )}

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4">
          <div className="flex items-center md:w-64">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden mr-2">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden md:flex items-center">
              <nav aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm">
                  <li>
                    <Link 
                      to={getBasePath()} 
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </li>
                  <li>
                    <span className="text-foreground">
                      {navItems.find(item => isActive(item.href))?.label || 'Overview'}
                    </span>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.profileImage || ''} alt={user?.firstName || ''} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(user?.firstName || '')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(`${getBasePath()}/profile`)}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <Link to="/">Sign out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        {/* Page content */}
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
