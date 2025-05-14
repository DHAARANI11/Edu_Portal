
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { 
  Plus, 
  Search, 
  Filter, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  FileText, 
  Edit,
  Trash,
  MoreVertical,
  Download
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AdminStudents = () => {
  const [students, setStudents] = useState([
    { 
      id: 1, 
      firstName: 'Emma', 
      lastName: 'Thompson', 
      email: 'emma.t@university.edu', 
      phone: '(555) 123-4567',
      program: 'Computer Science',
      enrollmentYear: 2023,
      status: 'Active',
      gpa: 3.8,
      image: 'https://i.pravatar.cc/150?u=emma'
    },
    { 
      id: 2, 
      firstName: 'Michael', 
      lastName: 'Chen', 
      email: 'mchen@university.edu', 
      phone: '(555) 234-5678',
      program: 'Mathematics',
      enrollmentYear: 2022,
      status: 'Active',
      gpa: 3.5,
      image: 'https://i.pravatar.cc/150?u=michael'
    },
    { 
      id: 3, 
      firstName: 'Sophia', 
      lastName: 'Garcia', 
      email: 'sgarcia@university.edu', 
      phone: '(555) 345-6789',
      program: 'Psychology',
      enrollmentYear: 2023,
      status: 'Active',
      gpa: 3.9,
      image: 'https://i.pravatar.cc/150?u=sophia'
    },
    { 
      id: 4, 
      firstName: 'James', 
      lastName: 'Wilson', 
      email: 'jwilson@university.edu', 
      phone: '(555) 456-7890',
      program: 'Business Administration',
      enrollmentYear: 2021,
      status: 'Probation',
      gpa: 2.4,
      image: 'https://i.pravatar.cc/150?u=james'
    },
    { 
      id: 5, 
      firstName: 'Olivia', 
      lastName: 'Johnson', 
      email: 'ojohnson@university.edu', 
      phone: '(555) 567-8901',
      program: 'Engineering',
      enrollmentYear: 2022,
      status: 'Active',
      gpa: 3.7,
      image: 'https://i.pravatar.cc/150?u=olivia'
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddStudentDialog, setShowAddStudentDialog] = useState(false);
  const [showStudentDetailsDialog, setShowStudentDetailsDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    program: '',
    enrollmentYear: new Date().getFullYear(),
    status: 'Active',
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({
      ...newStudent,
      [name]: value
    });
  };
  
  const handleAddStudent = () => {
    // Add new student to the list
    const createdStudent = {
      ...newStudent,
      id: students.length + 1,
      gpa: 0.0,
      image: `https://i.pravatar.cc/150?u=${newStudent.firstName.toLowerCase()}`
    };
    
    setStudents([...students, createdStudent]);
    setShowAddStudentDialog(false);
    
    toast({
      title: "Student Added",
      description: `${newStudent.firstName} ${newStudent.lastName} has been added successfully.`,
    });
    
    // Reset form
    setNewStudent({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      program: '',
      enrollmentYear: new Date().getFullYear(),
      status: 'Active',
    });
  };
  
  const handleDeleteStudent = (studentId) => {
    setStudents(students.filter(student => student.id !== studentId));
    
    toast({
      title: "Student Deleted",
      description: "The student record has been deleted successfully.",
    });
  };
  
  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowStudentDetailsDialog(true);
  };
  
  // Filter students based on search query and status
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.program.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || student.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Students</h1>
        <div className="flex space-x-2 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[130px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Students</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="probation">Probation</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="graduated">Graduated</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setShowAddStudentDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={student.image} alt={`${student.firstName} ${student.lastName}`} />
                    <AvatarFallback>{student.firstName.charAt(0)}{student.lastName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{student.firstName} {student.lastName}</CardTitle>
                    <CardDescription>{student.program}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleViewStudent(student)}>
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Student
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleDeleteStudent(student.id)}>
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pb-1">
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{student.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{student.phone}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Enrolled: {student.enrollmentYear}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 flex justify-between items-center">
              <Badge className={
                student.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                student.status === 'Probation' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' :
                student.status === 'Suspended' ? 'bg-red-100 text-red-800 hover:bg-red-100' :
                'bg-blue-100 text-blue-800 hover:bg-blue-100'
              }>
                {student.status}
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleViewStudent(student)}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No students found</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your search or filter criteria.
          </p>
          <Button className="mt-4" onClick={() => setShowAddStudentDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      )}
      
      {/* Add Student Dialog */}
      <Dialog open={showAddStudentDialog} onOpenChange={setShowAddStudentDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Enter the student's information to create a new record.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={newStudent.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={newStudent.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newStudent.email}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={newStudent.phone}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="program">Program</Label>
                <Input
                  id="program"
                  name="program"
                  value={newStudent.program}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="enrollmentYear">Enrollment Year</Label>
                <Input
                  id="enrollmentYear"
                  name="enrollmentYear"
                  type="number"
                  value={newStudent.enrollmentYear}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                defaultValue={newStudent.status}
                onValueChange={(value) => setNewStudent({...newStudent, status: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Probation">Probation</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                  <SelectItem value="Graduated">Graduated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddStudentDialog(false)}>Cancel</Button>
            <Button onClick={handleAddStudent}>Add Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Student Details Dialog */}
      <Dialog open={showStudentDetailsDialog} onOpenChange={setShowStudentDetailsDialog}>
        {selectedStudent && (
          <DialogContent className="sm:max-w-[650px]">
            <DialogHeader>
              <DialogTitle>Student Details</DialogTitle>
              <DialogDescription>
                Comprehensive information about the student.
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="academics">Academics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={selectedStudent.image} alt={`${selectedStudent.firstName} ${selectedStudent.lastName}`} />
                    <AvatarFallback className="text-lg">{selectedStudent.firstName.charAt(0)}{selectedStudent.lastName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-medium">{selectedStudent.firstName} {selectedStudent.lastName}</h3>
                    <p className="text-muted-foreground">{selectedStudent.program}</p>
                    <div className="mt-1">
                      <Badge className={
                        selectedStudent.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                        selectedStudent.status === 'Probation' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' :
                        selectedStudent.status === 'Suspended' ? 'bg-red-100 text-red-800 hover:bg-red-100' :
                        'bg-blue-100 text-blue-800 hover:bg-blue-100'
                      }>
                        {selectedStudent.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Email:</span>
                    </div>
                    <div>
                      <span>{selectedStudent.email}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone:</span>
                    </div>
                    <div>
                      <span>{selectedStudent.phone}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Enrollment Year:</span>
                    </div>
                    <div>
                      <span>{selectedStudent.enrollmentYear}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Student ID:</span>
                    </div>
                    <div>
                      <span>STU{selectedStudent.id.toString().padStart(6, '0')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">Reset Password</Button>
                  <Button variant="outline" className="flex-1">Send Email</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="academics" className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Academic Summary</h3>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Program:</span>
                    </div>
                    <div>
                      <span>{selectedStudent.program}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">GPA:</span>
                    </div>
                    <div>
                      <span>{selectedStudent.gpa.toFixed(1)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Credits Completed:</span>
                    </div>
                    <div>
                      <span>45</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Credits Required:</span>
                    </div>
                    <div>
                      <span>120</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Current Courses</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-muted/40 rounded-md">
                      <span>CS101 - Introduction to Computer Science</span>
                      <span className="font-medium">A-</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted/40 rounded-md">
                      <span>MATH201 - Calculus I</span>
                      <span className="font-medium">B+</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted/40 rounded-md">
                      <span>PHY105 - Physics for Engineers</span>
                      <span className="font-medium">B</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    View Transcript
                  </Button>
                  <Button className="flex-1">
                    <Plus className="h-4 w-4 mr-2" />
                    Enroll in Courses
                  </Button>
                </div>
              </TabsContent>
              
              
            </Tabs>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowStudentDetailsDialog(false)}>Close</Button>
              <Button variant="default">Edit Profile</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default AdminStudents;
