
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  CheckCircle, 
  Users, 
  BookOpen, 
  FileText, 
  Calendar,
  Upload,
  LineChart,
  Shield
} from 'lucide-react';

export const Index = () => {
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
    {
      title: "Comprehensive Student Tracking",
      description: "Track student progress, attendance, assignments, and more in one integrated system.",
      icon: <Users className="h-8 w-8 text-primary" />
    },
    {
      title: "Course Management",
      description: "Easily manage courses, enrollments, assessments, and materials.",
      icon: <BookOpen className="h-8 w-8 text-primary" />
    },
    {
      title: "Assessment Tracking",
      description: "Create, distribute, and grade assessments with detailed analytics.",
      icon: <FileText className="h-8 w-8 text-primary" />
    },
    {
      title: "Attendance Management",
      description: "Record and monitor attendance with comprehensive reporting.",
      icon: <Calendar className="h-8 w-8 text-primary" />
    },
    {
      title: "Homework Submission",
      description: "Streamlined process for submitting and grading assignments.",
      icon: <Upload className="h-8 w-8 text-primary" />
    },
    {
      title: "Analytics Dashboard",
      description: "Visualize student performance data with interactive charts.",
      icon: <LineChart className="h-8 w-8 text-primary" />
    }
  ];

  const roles = [
    {
      title: "For Students",
      description: "Access your courses, track attendance, submit homework, and view your academic progress all in one place.",
      icon: <Users className="h-10 w-10 text-primary" />,
      highlights: [
        "View enrolled courses",
        "Track attendance and request leaves",
        "Submit homework assignments",
        "Access learning materials",
        "Monitor assessment scores"
      ],
      cta: "Access Dashboard"
    },
    {
      title: "For Faculty",
      description: "Manage your classes, create assessments, grade submissions, and track student progress efficiently.",
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      highlights: [
        "Manage assigned classes",
        "Mark attendance",
        "Create and grade assessments",
        "Upload learning materials",
        "Review student performance"
      ],
      cta: "Access Dashboard"
    },
    {
      title: "For Administrators",
      description: "Oversee all aspects of your institution including students, faculty, and course management.",
      icon: <Shield className="h-10 w-10 text-primary" />,
      highlights: [
        "Manage student records",
        "Manage faculty members",
        "Handle course allocations",
        "Generate institution reports",
        "Configure system settings"
      ],
      cta: "Access Dashboard"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-primary/5 rounded-l-3xl"></div>
          <div className="absolute h-full w-full bg-[radial-gradient(circle_at_center,rgba(130,80,242,0.08),transparent_65%)]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                Student Tracking System
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
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/20 rounded-2xl transform rotate-3"></div>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-background p-6 rounded-lg shadow-sm border flex flex-col transition-all hover:shadow-md hover:border-primary/30">
                <div className="bg-primary/10 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground flex-grow">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role-based Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tailored for Everyone</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform serves the unique needs of students, faculty, and administrators with specialized features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {roles.map((role, index) => (
              <div key={index} className="bg-background p-6 rounded-lg shadow-sm border transition-all hover:shadow-md hover:border-primary/30">
                <div className="bg-primary/10 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                  {role.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{role.title}</h3>
                <p className="text-muted-foreground mb-4">{role.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {role.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Button asChild variant="outline" className="w-full">
                  <Link to="/signin">{role.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 education-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Enhance Your Educational Experience?</h2>
          <p className="max-w-2xl mx-auto mb-8 opacity-90">
            Join thousands of educational institutions already using our platform to streamline their academic processes.
          </p>
          <Button asChild size="lg" variant="outline" className="rounded-full border-white text-white bg-white/10 hover:bg-white hover:text-primary">
            <Link to="/signin">Sign In Now</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What People Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from educators and students who have transformed their academic experience with our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="flex items-center mb-4">
                  <img
                    src={`https://i.pravatar.cc/100?img=${i + 60}`}
                    alt={`Testimonial ${i}`}
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-sm text-muted-foreground">Professor, Computer Science</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "This platform has revolutionized how I manage my courses and track student progress. 
                  The comprehensive tools and intuitive interface make my job so much easier."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
