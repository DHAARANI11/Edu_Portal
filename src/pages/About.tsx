
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckIcon, LayoutGrid, Users, Book, Award } from 'lucide-react';

export const About = () => {
  const values = [
    {
      icon: <LayoutGrid className="h-6 w-6 text-primary" />,
      title: "Innovation",
      description: "We constantly strive to create cutting-edge solutions that transform the educational experience."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Collaboration",
      description: "We believe in fostering seamless communication between students, faculty, and administrators."
    },
    {
      icon: <Book className="h-6 w-6 text-primary" />,
      title: "Education First",
      description: "Our platform is designed with educational outcomes as the primary focus."
    },
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Excellence",
      description: "We are committed to providing the highest quality tools and services for academic success."
    }
  ];

  const benefits = [
    "Real-time tracking of student progress",
    "Streamlined attendance management",
    "Simplified grading and assessment",
    "Enhanced communication channels",
    "Secure data management",
    "Comprehensive reporting and analytics",
    "User-friendly interface for all stakeholders",
    "Flexible access across devices"
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">About StudentTrack</h1>
            <p className="text-lg text-muted-foreground mb-8">
              StudentTrack was founded with a mission to create a comprehensive platform that bridges the gap between students, faculty, and administrators. Our goal is to enhance the educational experience through intuitive technology solutions.
            </p>
            <div className="bg-muted p-6 rounded-lg">
              <blockquote className="italic text-foreground">
                "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
              </blockquote>
              <p className="mt-2 text-muted-foreground">— Malcolm X</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-none shadow-sm hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Benefits of StudentTrack</h2>
              <p className="text-muted-foreground mb-8">
                Our platform offers numerous advantages for educational institutions looking to modernize their administrative processes and enhance student engagement.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-2 mt-1">
                      <CheckIcon className="h-5 w-5 text-primary" />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-education-500/30 to-education-700/30 transform rotate-2"></div>
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Students collaborating"
                className="rounded-xl shadow-lg relative"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((member) => (
              <Card key={member} className="overflow-hidden">
                <div className="aspect-square bg-muted">
                  <img 
                    src={`https://i.pravatar.cc/300?img=${member + 60}`} 
                    alt={`Team Member ${member}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="text-center py-4">
                  <h3 className="font-semibold text-lg">Team Member {member}</h3>
                  <p className="text-muted-foreground text-sm">Position</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
