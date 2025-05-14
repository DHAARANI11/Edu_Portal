
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Search, ChevronDown, ChevronUp, Check, X, Eye, Edit } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export const FacultyAttendance = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('cs101');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [showAddSessionDialog, setShowAddSessionDialog] = useState(false);
  const [showViewDetailsDialog, setShowViewDetailsDialog] = useState(false);
  const [viewingClass, setViewingClass] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [bulkActionMode, setBulkActionMode] = useState<'all-present' | 'all-absent' | null>(null);
  const [newSession, setNewSession] = useState({
    courseId: 'cs101',
    date: '',
    time: '',
    topic: ''
  });
  
  // Track student attendance status changes
  const [studentAttendance, setStudentAttendance] = useState<Record<number, boolean>>({});
  
  const courses = [
    { id: 'cs101', name: 'CS101 - Introduction to Computer Science' },
    { id: 'cs202', name: 'CS202 - Data Structures and Algorithms' },
    { id: 'cs305', name: 'CS305 - Database Systems' }
  ];
  
  const classes = [
    {
      id: 1,
      courseId: 'cs101',
      date: '2025-05-05',
      time: '9:00 AM - 10:15 AM',
      topic: 'Introduction to Programming',
      attendanceMarked: true,
      present: 40,
      total: 45
    },
    {
      id: 2,
      courseId: 'cs101',
      date: '2025-05-07',
      time: '9:00 AM - 10:15 AM',
      topic: 'Variables and Data Types',
      attendanceMarked: true,
      present: 42,
      total: 45
    },
    {
      id: 3,
      courseId: 'cs101',
      date: '2025-05-09',
      time: '9:00 AM - 10:15 AM',
      topic: 'Control Structures',
      attendanceMarked: false,
      present: 0,
      total: 45
    },
    {
      id: 4,
      courseId: 'cs202',
      date: '2025-05-06',
      time: '11:00 AM - 12:30 PM',
      topic: 'Arrays and Linked Lists',
      attendanceMarked: true,
      present: 35,
      total: 38
    },
    {
      id: 5,
      courseId: 'cs202',
      date: '2025-05-08',
      time: '11:00 AM - 12:30 PM',
      topic: 'Stacks and Queues',
      attendanceMarked: false,
      present: 0,
      total: 38
    },
    {
      id: 6,
      courseId: 'cs305',
      date: '2025-05-05',
      time: '2:00 PM - 3:30 PM',
      topic: 'Database Design',
      attendanceMarked: true,
      present: 26,
      total: 28
    },
    {
      id: 7,
      courseId: 'cs305',
      date: '2025-05-07',
      time: '2:00 PM - 3:30 PM',
      topic: 'SQL Fundamentals',
      attendanceMarked: false,
      present: 0,
      total: 28
    }
  ];
  
  const students = [
    { id: 1, firstName: 'Emma', lastName: 'Wilson', studentId: 'S1001', present: true, courseId: 'cs101', classId: '101' },
    { id: 2, firstName: 'James', lastName: 'Taylor', studentId: 'S1002', present: true, courseId: 'cs101', classId: '101' },
    { id: 3, firstName: 'Sophia', lastName: 'Martinez', studentId: 'S1003', present: false, courseId: 'cs101', classId: '102' },
    { id: 4, firstName: 'Benjamin', lastName: 'Chen', studentId: 'S1004', present: true, courseId: 'cs101', classId: '102' },
    { id: 5, firstName: 'Olivia', lastName: 'Johnson', studentId: 'S1005', present: false, courseId: 'cs202', classId: '201' },
    { id: 6, firstName: 'William', lastName: 'Garcia', studentId: 'S1006', present: true, courseId: 'cs202', classId: '201' },
    { id: 7, firstName: 'Isabella', lastName: 'Brown', studentId: 'S1007', present: true, courseId: 'cs305', classId: '301' },
    { id: 8, firstName: 'Ethan', lastName: 'Davis', studentId: 'S1008', present: true, courseId: 'cs305', classId: '301' }
  ];

  const filteredClasses = classes.filter(cls => 
    cls.courseId === selectedCourse &&
    (cls.topic.toLowerCase().includes(searchQuery.toLowerCase()) || 
     cls.date.includes(searchQuery))
  );
  
  // Get students by course and class ID
  const getStudentsByClass = (classId) => {
    // In a real app, this would filter by the specific class session
    // For now, we'll just filter by course
    return students.filter(student => student.courseId === selectedCourse);
  };
  
  const handleTakeAttendance = (classId) => {
    setSelectedClass(String(classId));
    setEditMode(false);
    
    // Initialize student attendance state
    const initialAttendance = {};
    getStudentsByClass(classId).forEach(student => {
      initialAttendance[student.id] = student.present;
    });
    setStudentAttendance(initialAttendance);
    setBulkActionMode(null);
  };
  
  const handleToggleAttendance = (studentId) => {
    setStudentAttendance(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };
  
  const handleMarkAllPresent = () => {
    const allPresent = {};
    getStudentsByClass(selectedClass).forEach(student => {
      allPresent[student.id] = true;
    });
    setStudentAttendance(allPresent);
    setBulkActionMode('all-present');
    
    toast({
      title: "Bulk Action",
      description: "All students marked as present",
    });
  };
  
  const handleMarkAllAbsent = () => {
    const allAbsent = {};
    getStudentsByClass(selectedClass).forEach(student => {
      allAbsent[student.id] = false;
    });
    setStudentAttendance(allAbsent);
    setBulkActionMode('all-absent');
    
    toast({
      title: "Bulk Action",
      description: "All students marked as absent",
    });
  };
  
  const handleSaveAttendance = () => {
    // Count present students
    const presentCount = Object.values(studentAttendance).filter(status => status).length;
    
    // Update the attendance status for the class
    const classIndex = classes.findIndex(c => c.id === Number(selectedClass));
    if (classIndex >= 0) {
      classes[classIndex].attendanceMarked = true;
      classes[classIndex].present = presentCount;
    }
    
    toast({
      title: "Attendance Saved",
      description: `Attendance ${editMode ? 'updated' : 'marked'} for ${classes[classIndex].topic} (${presentCount}/${students.length} present)`,
    });
    
    setSelectedClass(null);
    setEditMode(false);
    setBulkActionMode(null);
  };
  
  const handleAddSession = () => {
    if (!newSession.date || !newSession.time || !newSession.topic) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Add new session
    const newId = Math.max(...classes.map(c => c.id)) + 1;
    const newClassSession = {
      id: newId,
      courseId: newSession.courseId,
      date: newSession.date,
      time: newSession.time,
      topic: newSession.topic,
      attendanceMarked: false,
      present: 0,
      total: selectedCourse === 'cs101' ? 45 : selectedCourse === 'cs202' ? 38 : 28
    };
    
    // Update classes array (in a real app this would be an API call)
    classes.push(newClassSession);
    
    toast({
      title: "Class Session Added",
      description: `New class session "${newSession.topic}" has been added.`,
    });
    
    // Reset form
    setNewSession({
      courseId: selectedCourse,
      date: '',
      time: '',
      topic: ''
    });
    setShowAddSessionDialog(false);
  };

  const handleEditAttendance = (classId) => {
    setSelectedClass(String(classId));
    setEditMode(true);
    setBulkActionMode(null);
    
    // Initialize student attendance state from existing data
    // In a real app, this would be loaded from backend
    const initialAttendance = {};
    getStudentsByClass(classId).forEach(student => {
      initialAttendance[student.id] = student.present;
    });
    setStudentAttendance(initialAttendance);
    
    toast({
      title: "Editing Attendance",
      description: "You can now update the attendance records.",
    });
  };
  
  const handleViewDetails = (classInfo) => {
    setViewingClass(classInfo);
    setShowViewDetailsDialog(true);
  };
  
  const handleUpdateClassDetails = () => {
    if (!viewingClass) return;
    
    const classIndex = classes.findIndex(c => c.id === viewingClass.id);
    if (classIndex >= 0) {
      classes[classIndex] = { ...viewingClass };
      
      toast({
        title: "Class Details Updated",
        description: "The class session information has been updated.",
      });
    }
    
    setShowViewDetailsDialog(false);
  };
  
  const filteredStudents = selectedClass 
    ? getStudentsByClass(selectedClass)
    : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Attendance Management</h1>
        <Dialog open={showAddSessionDialog} onOpenChange={setShowAddSessionDialog}>
          <DialogTrigger asChild>
            <Button>Add Class Session</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Class Session</DialogTitle>
              <DialogDescription>
                Create a new class session to track attendance.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="session-course" className="text-right">Course</Label>
                <div className="col-span-3">
                  <Select 
                    value={newSession.courseId} 
                    onValueChange={(value) => setNewSession({...newSession, courseId: value})}
                  >
                    <SelectTrigger id="session-course">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map(course => (
                        <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="session-date" className="text-right">Date</Label>
                <Input
                  id="session-date"
                  type="date"
                  value={newSession.date}
                  onChange={(e) => setNewSession({...newSession, date: e.target.value})}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="session-time" className="text-right">Time</Label>
                <Input
                  id="session-time"
                  placeholder="e.g. 9:00 AM - 10:15 AM"
                  value={newSession.time}
                  onChange={(e) => setNewSession({...newSession, time: e.target.value})}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="session-topic" className="text-right">Topic</Label>
                <Input
                  id="session-topic"
                  placeholder="e.g. Introduction to Programming"
                  value={newSession.topic}
                  onChange={(e) => setNewSession({...newSession, topic: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddSessionDialog(false)}>Cancel</Button>
              <Button onClick={handleAddSession}>Add Session</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
        <div className="w-full md:w-64">
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger>
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map(course => (
                <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by topic or date..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>
      
      <Tabs defaultValue="sessions">
        <TabsList>
          <TabsTrigger value="sessions">Class Sessions</TabsTrigger>
          <TabsTrigger value="reports">Attendance Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sessions" className="space-y-4 mt-4">
          {selectedClass ? (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl">
                      {editMode ? "Edit" : "Mark"} Attendance - {filteredClasses.find(c => c.id === Number(selectedClass))?.topic}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {new Date(filteredClasses.find(c => c.id === Number(selectedClass))?.date || '').toLocaleDateString()} • 
                      {filteredClasses.find(c => c.id === Number(selectedClass))?.time}
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedClass(null)}>Back to Classes</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <div>
                    <span className="font-medium text-sm">
                      {Object.values(studentAttendance).filter(status => status).length}/{filteredStudents.length} Students Present
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant={bulkActionMode === 'all-present' ? "default" : "outline"} 
                      size="sm" 
                      onClick={handleMarkAllPresent}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Mark All Present
                    </Button>
                    <Button 
                      variant={bulkActionMode === 'all-absent' ? "default" : "outline"} 
                      size="sm"
                      onClick={handleMarkAllAbsent}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Mark All Absent
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-md border shadow-sm">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-center">Class</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map(student => (
                        <TableRow key={student.id}>
                          <TableCell>{student.studentId}</TableCell>
                          <TableCell>{student.firstName} {student.lastName}</TableCell>
                          <TableCell className="text-center">{student.classId}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                size="sm" 
                                variant={studentAttendance[student.id] ? "default" : "outline"}
                                className={studentAttendance[student.id] ? "bg-green-600 hover:bg-green-700" : ""}
                                onClick={() => handleToggleAttendance(student.id)}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Present
                              </Button>
                              <Button 
                                size="sm" 
                                variant={!studentAttendance[student.id] ? "default" : "outline"}
                                className={!studentAttendance[student.id] ? "bg-red-600 hover:bg-red-700" : ""}
                                onClick={() => handleToggleAttendance(student.id)}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Absent
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <Button onClick={handleSaveAttendance}>{editMode ? 'Update' : 'Save'} Attendance</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredClasses.map(cls => (
              <Card key={cls.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{cls.topic}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {new Date(cls.date).toLocaleDateString()} • {cls.time}
                      </p>
                    </div>
                    {cls.attendanceMarked ? (
                      <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center">
                        <Check className="h-4 w-4 mr-1" />
                        Attendance Marked
                      </div>
                    ) : (
                      <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Pending
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      {cls.attendanceMarked ? (
                        <div className="flex items-center">
                          <span className="text-muted-foreground mr-1">Attendance:</span>
                          <span className="font-medium">{cls.present}/{cls.total} students present</span>
                          <span className="text-muted-foreground ml-1">({((cls.present / cls.total) * 100).toFixed(0)}%)</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Attendance not yet marked</span>
                      )}
                    </div>
                    <div className="space-x-2">
                      {cls.attendanceMarked ? (
                        <>
                          <Button variant="outline" onClick={() => handleEditAttendance(cls.id)}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" onClick={() => handleViewDetails(cls)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </>
                      ) : (
                        <Button onClick={() => handleTakeAttendance(cls.id)}>Take Attendance</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="reports" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">93%</div>
                      <p className="text-sm text-muted-foreground">Average attendance for CS101</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">89%</div>
                      <p className="text-sm text-muted-foreground">Average attendance for CS202</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">95%</div>
                      <p className="text-sm text-muted-foreground">Average attendance for CS305</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Download Report</Button>
                  <Button variant="outline">View Detailed Analytics</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* View Details Dialog */}
      <Dialog open={showViewDetailsDialog} onOpenChange={setShowViewDetailsDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Attendance Details</DialogTitle>
            <DialogDescription>
              {viewingClass && (
                <div className="mt-2">
                  <p><strong>Topic:</strong> {viewingClass.topic}</p>
                  <p><strong>Date:</strong> {new Date(viewingClass.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {viewingClass.time}</p>
                  <p><strong>Attendance:</strong> {viewingClass.present}/{viewingClass.total} students present ({((viewingClass.present / viewingClass.total) * 100).toFixed(0)}%)</p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            <h3 className="font-medium mb-2">Student List</h3>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students
                    .filter(student => student.courseId === (viewingClass?.courseId || ''))
                    .map(student => (
                      <TableRow key={student.id}>
                        <TableCell>{student.studentId}</TableCell>
                        <TableCell>{student.firstName} {student.lastName}</TableCell>
                        <TableCell>{student.classId}</TableCell>
                        <TableCell className="text-right">
                          <div className={`px-2 py-1 inline-flex rounded-full text-xs font-medium ${
                            student.present ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {student.present ? 'Present' : 'Absent'}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => handleEditAttendance(viewingClass?.id)}>Edit Attendance</Button>
            <Button onClick={handleUpdateClassDetails}>Save Changes</Button>
            <Button variant="outline" onClick={() => setShowViewDetailsDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FacultyAttendance;
