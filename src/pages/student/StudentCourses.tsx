
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { BookOpen, Calendar, Clock } from 'lucide-react';

export const StudentCourses = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Introduction to Computer Science', code: 'CS101', instructor: 'Dr. Smith', credits: 3, status: 'In Progress' },
    { id: 2, name: 'Calculus I', code: 'MATH201', instructor: 'Prof. Johnson', credits: 4, status: 'In Progress' },
    { id: 3, name: 'Physics for Engineers', code: 'PHY105', instructor: 'Dr. Williams', credits: 4, status: 'In Progress' },
    { id: 4, name: 'English Composition', code: 'ENG101', instructor: 'Prof. Davis', credits: 3, status: 'In Progress' }
  ]);
  
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  const handleViewAllCourses = () => {
    toast({
      title: "All Courses",
      description: "Navigating to course catalog...",
    });
    // For demo purposes just navigate to the same page
    navigate('/student/courses');
  };

  const handleViewCourseDetails = (course) => {
    setSelectedCourse(course);
    setShowCourseDetails(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <Button onClick={handleViewAllCourses}>View All Courses</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="transition-all hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <div>
                  <CardTitle className="text-xl">{course.name}</CardTitle>
                  <CardDescription>{course.code} • {course.credits} credits</CardDescription>
                </div>
                <div className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                  {course.status}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Instructor:</span>
                  <span className="font-medium">{course.instructor}</span>
                </div>
                <div className="flex justify-end mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewCourseDetails(course)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showCourseDetails} onOpenChange={setShowCourseDetails}>
        {selectedCourse && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedCourse.name}</DialogTitle>
              <DialogDescription className="text-base text-foreground">
                {selectedCourse.code} • {selectedCourse.credits} credits
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="font-medium">Instructor:</span> 
                <span>{selectedCourse.instructor}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="font-medium">Schedule:</span> 
                <span>Mon, Wed, Fri 10:00 AM - 11:30 AM</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-medium">Duration:</span> 
                <span>16 weeks (Jan 15, 2025 - May 15, 2025)</span>
              </div>
              
              <div>
                <span className="font-medium">Description:</span>
                <p className="mt-1 text-sm">
                  This course provides a comprehensive introduction to the subject matter, 
                  covering fundamental concepts and practical applications. Students will 
                  engage in lectures, discussions, and hands-on activities.
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCourseDetails(false)}>Close</Button>
              <Button>Access Course Materials</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default StudentCourses;
