import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { School, GraduationCap, Users, Calendar, FileText, Settings, BookOpen, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const AdminDashboard = () => {
  const { user } = useAuth();
  
  // Sample data for dashboard
  const statistics = {
    students: 1248,
    faculty: 86,
    courses: 42,
    departments: 7
  };
  
  const recentActivity = [
    { id: 1, action: "New student registration", time: "2 hours ago" },
    { id: 2, action: "Course schedule updated", time: "5 hours ago" },
    { id: 3, action: "Faculty meeting scheduled", time: "1 day ago" },
    { id: 4, action: "Semester grades submitted", time: "2 days ago" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.firstName || 'Admin'}! Here's an overview of your institution.</p>
        </div>
        <Button asChild className="self-start">
          <Link to="/admin/profile">
            <User className="mr-2 h-4 w-4" />
            View Profile
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <CardDescription>Total enrolled students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.students}</div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/students" className="flex items-center">
                <GraduationCap className="mr-2 h-4 w-4" />
                <span>View All Students</span>
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Faculty</CardTitle>
            <CardDescription>Teaching staff</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.faculty}</div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/faculty" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>Manage Faculty</span>
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <CardDescription>Active courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.courses}</div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/courses" className="flex items-center">
                <School className="mr-2 h-4 w-4" />
                <span>View All Courses</span>
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <CardDescription>Academic departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.departments}</div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/courses" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Manage Departments</span>
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">
              View All Activity
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button className="justify-start" asChild>
              <Link to="/admin/students" className="flex items-center">
                <GraduationCap className="mr-2 h-4 w-4" />
                <span>Manage Students</span>
              </Link>
            </Button>
            <Button className="justify-start" asChild>
              <Link to="/admin/faculty" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>Manage Faculty</span>
              </Link>
            </Button>
            <Button className="justify-start" asChild>
              <Link to="/admin/courses" className="flex items-center">
                <School className="mr-2 h-4 w-4" />
                <span>Manage Courses</span>
              </Link>
            </Button>
            <Button className="justify-start" asChild>
              <Link to="/admin/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </Link>
            </Button>
            <Button className="justify-start" asChild>
              <Link to="/student/profile" className="flex items-center">
                <GraduationCap className="mr-2 h-4 w-4" />
                <span>Student Profiles</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Academic Management</CardTitle>
            <CardDescription>Manage academic functions</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button className="justify-start" variant="outline" asChild>
              <Link to="/admin/students" className="flex items-center">
                <GraduationCap className="mr-2 h-4 w-4" />
                <span>Student Records</span>
              </Link>
            </Button>
            <Button className="justify-start" variant="outline" asChild>
              <Link to="/admin/faculty" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>Faculty Management</span>
              </Link>
            </Button>
            <Button className="justify-start" variant="outline" asChild>
              <Link to="/admin/courses" className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Course Catalog</span>
              </Link>
            </Button>
            <Button className="justify-start" variant="outline" asChild>
              <Link to="/admin/courses" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Academic Calendar</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Administration</CardTitle>
            <CardDescription>Manage system settings</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button className="justify-start" variant="outline" asChild>
              <Link to="/admin/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>User Accounts</span>
              </Link>
            </Button>
            <Button className="justify-start" variant="outline" asChild>
              <Link to="/admin/profile" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>System Settings</span>
              </Link>
            </Button>
            <Button className="justify-start" variant="outline" asChild>
              <Link to="/admin/profile" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                <span>Reports</span>
              </Link>
            </Button>
            <Button className="justify-start" variant="outline" asChild>
              <Link to="/admin/profile" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Integrations</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
