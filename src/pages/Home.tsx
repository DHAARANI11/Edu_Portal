
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { CheckIcon } from 'lucide-react';

export const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const getDashboardLink = () => {
    if (!user) return '/signin';
    
    switch(user.role) {
      case 'student': return '/student';
      case 'faculty': return '/faculty';
      case 'admin': return '/admin';
      default: return '/signin';
    }
  };

  const features = [
    "Comprehensive student tracking system",
    "Attendance management",
    "Course enrollment",
    "Assessment tracking",
    "Leave requests",
    "Homework submission",
    "Real-time progress monitoring",
    "Detailed analytics and reports"
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-primary/5 rounded-l-3xl"></div>
          <div className="absolute h-full w-full bg-[radial-gradient(circle_at_center,rgba(130,80,242,0.15),transparent_50%)]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                EduPortal
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Elevate Educational <span className="text-primary">Excellence</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
                A comprehensive platform for students, faculty, and administrators to track progress, manage courses, and enhance learning outcomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="rounded-full">
                  <Link to={getDashboardLink()}>
                    {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-education-600/20 to-education-800/20 rounded-2xl transform rotate-3"></div>
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Student using laptop"
                className="rounded-2xl shadow-xl w-full relative z-10 transform -rotate-2 transition-all duration-300 hover:rotate-0 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers a complete set of tools designed to enhance the educational experience for students, faculty, and administrators.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-background p-6 rounded-lg shadow-sm border flex items-start space-x-3 transition-all hover:shadow-md hover:border-primary/30">
                <div className="bg-primary/10 rounded-full p-2">
                  <CheckIcon className="h-5 w-5 text-primary" />
                </div>
                <p className="font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 education-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="max-w-2xl mx-auto mb-8 opacity-90">
            Join thousands of educational institutions already using StudentTrack to streamline their academic processes.
          </p>
          <Button asChild size="lg" variant="outline" className="rounded-full border-white text-white bg-white/10 hover:bg-white hover:text-primary">
            <Link to="/signin">Sign In Now</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Home;
