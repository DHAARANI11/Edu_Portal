import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, FileText, Users, Upload, Clock, User } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { useAuth } from '@/contexts/AuthContext';

export const FacultyDashboard = () => {
  const { user } = useAuth();
  
  // Sample data for dashboard
  const classes = [
    { id: 1, name: 'Introduction to Computer Science', code: 'CS101', students: 35, progress: 65 },
    { id: 2, name: 'Calculus I', code: 'MATH201', students: 42, progress: 48 },
    { id: 3, name: 'Physics for Engineers', code: 'PHY105', students: 28, progress: 75 }
  ];
  
  const upcomingSchedule = [
    { id: 1, className: 'CS101', type: 'Lecture', time: '09:00 - 10:30', room: 'B-201', date: '2025-05-12' },
    { id: 2, className: 'MATH201', type: 'Tutorial', time: '13:00 - 14:30', room: 'A-105', date: '2025-05-12' }
  ];
  
  const pendingTasks = [
    { id: 1, task: 'Grade Midterm Exams', className: 'CS101', deadline: '2025-05-15' },
    { id: 2, task: 'Review Homework Submissions', className: 'PHY105', deadline: '2025-05-13' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.firstName || 'Professor'}! Here's an overview of your teaching schedule.</p>
        </div>
        <Button asChild className="self-start">
          <Link to="/faculty/profile">
            <User className="mr-2 h-4 w-4" />
            View Profile
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Classes</CardTitle>
            <CardDescription>Currently teaching</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classes.length}</div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/faculty/classes" className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                <span>View All Classes</span>
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">leave requests</CardTitle>
            <CardDescription>Pending leave requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/faculty/leave-requests" className="flex items-center">
                <Upload className="mr-2 h-4 w-4" />
                <span>leave Requests</span>
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <CardDescription>Total enrolled</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {classes.reduce((total, cls) => total + cls.students, 0)}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/faculty/classes" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>View Student List</span>
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Assessments</CardTitle>
            <CardDescription>Upcoming tests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/faculty/assessments" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                <span>Manage Assessments</span>
              </Link>
            </Button>
          </CardFooter>
        </Card>

        
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>Current semester completion</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {classes.map(cls => (
              <div key={cls.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{cls.name} ({cls.code})</span>
                  <span className="text-muted-foreground">{cls.progress}%</span>
                </div>
                <Progress value={cls.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" asChild>
              <Link to="/faculty/classes">
                View All Courses
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <div className="col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Your teaching schedule for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingSchedule.map(schedule => (
                  <div key={schedule.id} className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">{schedule.className} - {schedule.type}</p>
                      <p className="text-sm text-muted-foreground">Room: {schedule.room}</p>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">{schedule.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" asChild>
                <Link to="/faculty/classes">Full Schedule</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>Tasks requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTasks.map(task => (
                  <div key={task.id} className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">{task.task}</p>
                      <p className="text-sm text-muted-foreground">{task.className}</p>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">{new Date(task.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" asChild>
                <Link to="/faculty/submissions">View All Tasks</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Quick Access</CardTitle>
          <CardDescription>Common faculty actions</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button className="justify-start" asChild>
            <Link to="/faculty/profile" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </Link>
          </Button>
          <Button className="justify-start" asChild>
            <Link to="/faculty/classes" className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Manage Classes</span>
            </Link>
          </Button>
          <Button className="justify-start" asChild>
            <Link to="/faculty/attendance" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Take Attendance</span>
            </Link>
          </Button>
          <Button className="justify-start" asChild>
            <Link to="/faculty/submissions" className="flex items-center">
              <Upload className="mr-2 h-4 w-4" />
              <span>Grade Submissions</span>
            </Link>
          </Button>
          <Button className="justify-start" asChild>
            <Link to="/faculty/assessments" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              <span>Create Assessment</span>
            </Link>
          </Button>
          <Button className="justify-start" asChild>
            <Link to="/admin/students" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              <span>Student Profiles</span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyDashboard;
