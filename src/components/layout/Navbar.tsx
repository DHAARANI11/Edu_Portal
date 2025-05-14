
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    
    switch(user.role) {
      case 'student': return '/student';
      case 'faculty': return '/faculty';
      case 'admin': return '/admin';
      default: return '/';
    }
  };

  return (
    <nav className="py-4 px-4 md:px-6 border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full education-gradient flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="hidden md:inline">StudentTrack</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
          <Link to="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
          
          <ThemeToggle />
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
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
                <DropdownMenuItem onClick={() => navigate(getDashboardLink())}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`${getDashboardLink()}/profile`)}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="default" className="bg-primary hover:bg-primary/90">
              <Link to="/signin">Sign In</Link>
            </Button>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b py-4 px-6 shadow-lg z-50 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-foreground hover:text-primary" onClick={closeMenu}>Home</Link>
            <Link to="/about" className="text-foreground hover:text-primary" onClick={closeMenu}>About</Link>
            <Link to="/contact" className="text-foreground hover:text-primary" onClick={closeMenu}>Contact</Link>
            
            {isAuthenticated ? (
              <>
                <Link to={getDashboardLink()} className="text-foreground hover:text-primary" onClick={closeMenu}>Dashboard</Link>
                <Link to={`${getDashboardLink()}/profile`} className="text-foreground hover:text-primary" onClick={closeMenu}>Profile</Link>
                <Button variant="outline" onClick={() => { handleLogout(); closeMenu(); }}>
                  Log out
                </Button>
              </>
            ) : (
              <Button asChild variant="default" className="bg-primary hover:bg-primary/90 w-full">
                <Link to="/signin" onClick={closeMenu}>Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
