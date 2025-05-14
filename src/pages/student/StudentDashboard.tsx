
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, FileText, User, Clock, Upload, FileUp } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { useAuth } from '@/contexts/AuthContext';

export const StudentDashboard = () => {
  const { user } = useAuth();
  
  // Sample data for dashboard
  const courses = [
    { id: 1, name: 'Introduction to Computer Science', code: 'CS101', instructor: 'Dr. Alan Turing', progress: 65 },
    { id: 2, name: 'Calculus I', code: 'MATH201', instructor: 'Dr. Katherine Johnson', progress: 48 },
    { id: 3, name: 'Physics for Engineers', code: 'PHY105', instructor: 'Dr. Richard Feynman', progress: 75 }
  ];
  
  const upcomingAssessments = [
    { id: 1, title: 'Midterm Exam', courseName: 'Introduction to Computer Science', date: '2025-05-20', time: '09:00 - 11:00' },
    { id: 2, title: 'Assignment 3', courseName: 'Calculus I', date: '2025-05-15', time: '23:59' }
  ];
  
  const attendance = {
    present: 87,
    absent: 5,
    late: 8
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.firstName || 'Student'}! Here's an overview of your academic journey.</p>
        </div>
        <Button asChild className="self-start">
          <Link to="/student/profile">
            <User className="mr-2 h-4 w-4" />
            View Profile
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <CardDescription>Currently enrolled</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/student/courses" className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                <span>All Courses</span>
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Assessments</CardTitle>
            <CardDescription>Upcoming</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingAssessments.length}</div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/student/assessments" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                <span>View Assessments</span>
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <CardDescription>Current semester</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendance.present}%</div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/student/attendance" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>View Attendance</span>
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Submissions</CardTitle>
            <CardDescription>Pending tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/student/homework" className="flex items-center">
                <Upload className="mr-2 h-4 w-4" />
                <span>View Submissions</span>
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>Your progress in current courses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {courses.map(course => (
              <div key={course.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="font-medium">{course.name}</span>
                    <p className="text-xs text-muted-foreground">Instructor: {course.instructor}</p>
                  </div>
                  <span className="text-muted-foreground">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" asChild>
              <Link to="/student/courses">View All Courses</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Assessments</CardTitle>
            <CardDescription>Exams and assignments due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAssessments.map(assessment => (
                <div key={assessment.id} className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{assessment.title}</p>
                    <p className="text-sm text-muted-foreground">{assessment.courseName}</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm">{new Date(assessment.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" asChild>
              <Link to="/student/assessments">View All Assessments</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Frequently used features</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button className="justify-start" asChild>
              <Link to="/student/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </Link>
            </Button>
            <Button className="justify-start" asChild>
              <Link to="/student/attendance" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>View Attendance</span>
              </Link>
            </Button>
            <Button className="justify-start" asChild>
              <Link to="/student/homework" className="flex items-center">
                <Upload className="mr-2 h-4 w-4" />
                <span>Submit Homework</span>
              </Link>
            </Button>
            <Button className="justify-start" asChild>
              <Link to="/student/materials" className="flex items-center">
                <FileUp className="mr-2 h-4 w-4" />
                <span>Learning Materials</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
