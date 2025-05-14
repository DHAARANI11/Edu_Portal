import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Progress } from '@/components/ui/progress';

// Define proper interfaces for our data
interface Course {
  id: number;
  code: string;
  name: string;
}

interface AttendanceRecord {
  id: number;
  courseId: number;
  date: string;
  time: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  topic: string;
  notes: string;
}

export const StudentAttendance = () => {
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [showAttendanceDetails, setShowAttendanceDetails] = useState(false);
  const [selectedSession, setSelectedSession] = useState<AttendanceRecord | null>(null);
  
  // Sample courses data
  const courses: Course[] = [
    { id: 1, code: 'CS101', name: 'Introduction to Computer Science' },
    { id: 2, code: 'MATH201', name: 'Calculus I' },
    { id: 3, code: 'PHY105', name: 'Physics for Engineers' },
    { id: 4, code: 'ENG101', name: 'English Composition' }
  ];
  
  // Sample attendance data
  const attendanceData: AttendanceRecord[] = [
    { 
      id: 1, 
      courseId: 1, 
      date: '2025-05-08', 
      time: '10:00 AM - 11:30 AM', 
      status: 'present',
      topic: 'Introduction to Algorithms',
      notes: ''
    },
    { 
      id: 2, 
      courseId: 1, 
      date: '2025-05-05', 
      time: '10:00 AM - 11:30 AM', 
      status: 'present',
      topic: 'Data Types and Variables',
      notes: ''
    },
    { 
      id: 3, 
      courseId: 1, 
      date: '2025-05-01', 
      time: '10:00 AM - 11:30 AM', 
      status: 'absent',
      topic: 'Control Structures',
      notes: 'Medical absence - doctor\'s note provided'
    },
    { 
      id: 4, 
      courseId: 2, 
      date: '2025-05-07', 
      time: '1:00 PM - 2:30 PM', 
      status: 'present',
      topic: 'Limits and Continuity',
      notes: ''
    },
    { 
      id: 5, 
      courseId: 2, 
      date: '2025-05-05', 
      time: '1:00 PM - 2:30 PM', 
      status: 'late',
      topic: 'Derivatives',
      notes: 'Arrived 15 minutes late'
    },
    { 
      id: 6, 
      courseId: 3, 
      date: '2025-05-06', 
      time: '9:00 AM - 10:30 AM', 
      status: 'present',
      topic: 'Newton\'s Laws of Motion',
      notes: ''
    },
    { 
      id: 7, 
      courseId: 3, 
      date: '2025-05-04', 
      time: '9:00 AM - 10:30 AM', 
      status: 'excused',
      topic: 'Force and Motion',
      notes: 'University event - approved absence'
    },
    { 
      id: 8, 
      courseId: 4, 
      date: '2025-05-07', 
      time: '3:00 PM - 4:30 PM', 
      status: 'present',
      topic: 'Essay Structure',
      notes: ''
    }
  ];
  
  // Filter attendance data based on selected course and period
  const filteredAttendance = attendanceData.filter(record => {
    const courseMatch = selectedCourse === 'all' || record.courseId === parseInt(selectedCourse);
    
    if (selectedPeriod === 'current') {
      // Current period logic (for demo purposes, showing all)
      return courseMatch;
    } else {
      return courseMatch;
    }
  });
  
  const handleViewDetails = (session: AttendanceRecord) => {
    setSelectedSession(session);
    setShowAttendanceDetails(true);
  };
  
  const getAttendanceRateForCourse = (courseId: number) => {
    const courseRecords = attendanceData.filter(record => record.courseId === courseId);
    if (courseRecords.length === 0) return 0;
    
    const presentCount = courseRecords.filter(record => 
      record.status === 'present' || record.status === 'late').length;
    
    return Math.round((presentCount / courseRecords.length) * 100);
  };
  
  const getOverallAttendanceRate = () => {
    if (attendanceData.length === 0) return 0;
    
    const presentCount = attendanceData.filter(record => 
      record.status === 'present' || record.status === 'late').length;
    
    return Math.round((presentCount / attendanceData.length) * 100);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Present</Badge>;
      case 'absent':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Absent</Badge>;
      case 'late':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Late</Badge>;
      case 'excused':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Excused</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'absent':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'late':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'excused':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };
  
  // Fix the getCourseById function to always return an object with code and name properties
  const getCourseById = (id: number): Course => {
    return courses.find(course => course.id === id) || { id: 0, code: 'N/A', name: 'Unknown Course' };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Attendance</h1>
          <p className="text-muted-foreground">Track your attendance across all courses.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <Card className="md:col-span-8">
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>Your overall attendance rate across all courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Attendance</span>
                  <span className="font-medium">{getOverallAttendanceRate()}%</span>
                </div>
                <Progress value={getOverallAttendanceRate()} className="h-2" />
              </div>
              
              <div className="space-y-4">
                {courses.map(course => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{course.code} - {course.name}</span>
                      <span className="font-medium">{getAttendanceRateForCourse(course.id)}%</span>
                    </div>
                    <Progress value={getAttendanceRateForCourse(course.id)} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Present</span>
                </div>
                <span className="font-medium">
                  {attendanceData.filter(record => record.status === 'present').length}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                  <span>Late</span>
                </div>
                <span className="font-medium">
                  {attendanceData.filter(record => record.status === 'late').length}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <XCircle className="h-4 w-4 text-red-500 mr-2" />
                  <span>Absent</span>
                </div>
                <span className="font-medium">
                  {attendanceData.filter(record => record.status === 'absent').length}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Info className="h-4 w-4 text-blue-500 mr-2" />
                  <span>Excused</span>
                </div>
                <span className="font-medium">
                  {attendanceData.filter(record => record.status === 'excused').length}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 flex justify-center">
            <p className="text-sm text-muted-foreground">
              Total Sessions: {attendanceData.length}
            </p>
          </CardFooter>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            {courses.map(course => (
              <SelectItem key={course.id} value={course.id.toString()}>
                {course.code} - {course.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">Current Semester</SelectItem>
            <SelectItem value="previous">Previous Semester</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Attendance Records</h2>
        
        {filteredAttendance.map(record => (
          <Card key={record.id} className="hover:border-primary/30 transition-colors cursor-pointer" onClick={() => handleViewDetails(record)}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {getStatusIcon(record.status)}
                  <CardTitle className="ml-2 text-lg">
                    {getCourseById(record.courseId).code}
                  </CardTitle>
                </div>
                <div>
                  {getStatusBadge(record.status)}
                </div>
              </div>
              <CardDescription>{getCourseById(record.courseId).name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm">{new Date(record.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm">{record.time}</span>
                </div>
              </div>
              
              <div className="mt-2">
                <p className="text-sm font-medium">Topic: {record.topic}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto" onClick={(e) => {
                e.stopPropagation();
                handleViewDetails(record);
              }}>
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
        
        {filteredAttendance.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No Attendance Records</h3>
            <p className="text-muted-foreground mt-2">
              There are no attendance records for the selected course and period.
            </p>
          </div>
        )}
      </div>
      
      <Dialog open={showAttendanceDetails} onOpenChange={setShowAttendanceDetails}>
        {selectedSession && (
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Attendance Details</DialogTitle>
              <DialogDescription>
                {getCourseById(selectedSession.courseId).code} - {getCourseById(selectedSession.courseId).name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                {getStatusIcon(selectedSession.status)}
                <span className="font-medium">{getStatusBadge(selectedSession.status)}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium">{new Date(selectedSession.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Time</p>
                  <p className="font-medium">{selectedSession.time}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Topic</p>
                  <p className="font-medium">{selectedSession.topic}</p>
                </div>
              </div>
              
              {selectedSession.notes && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Notes</p>
                  <p className="text-sm bg-muted p-3 rounded-md">{selectedSession.notes}</p>
                </div>
              )}
              
              <div className="bg-muted/50 p-4 rounded-md">
                <h4 className="text-sm font-medium mb-2">Attendance Policy</h4>
                <p className="text-xs text-muted-foreground">
                  Students are expected to maintain at least 80% attendance in all courses.
                  If you have questions about an attendance record, please contact your instructor.
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAttendanceDetails(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default StudentAttendance;
