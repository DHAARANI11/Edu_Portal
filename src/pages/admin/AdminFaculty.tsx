import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Search, MoreVertical, Mail, Phone, Edit, X, Check, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { toast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const AdminFaculty = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddFacultyDialog, setShowAddFacultyDialog] = useState(false);
  const [showEditFacultyDialog, setShowEditFacultyDialog] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);
  const [newFaculty, setNewFaculty] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: 'Computer Science',
    position: 'Assistant Professor',
    phone: ''
  });
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showCoursesDialog, setShowCoursesDialog] = useState(false);
  
  const departments = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'English',
    'History',
    'Psychology',
    'Biology',
    'Economics'
  ];
  
  const positions = [
    'Professor',
    'Associate Professor',
    'Assistant Professor',
    'Lecturer',
    'Adjunct Faculty'
  ];
  
  const courses = [
    { id: 'cs101', name: 'CS101 - Introduction to Computer Science' },
    { id: 'cs202', name: 'CS202 - Data Structures and Algorithms' },
    { id: 'cs305', name: 'CS305 - Database Systems' },
    { id: 'math201', name: 'MATH201 - Calculus I' },
    { id: 'phy105', name: 'PHY105 - Physics for Engineers' },
    { id: 'eng101', name: 'ENG101 - English Composition' }
  ];
  
  const facultyMembers = [
    { 
      id: 1, 
      firstName: 'John', 
      lastName: 'Smith', 
      email: 'john.smith@university.edu', 
      department: 'Computer Science',
      position: 'Professor',
      phone: '(555) 123-4567',
      courses: ['cs101', 'cs202', 'cs305'],
      bio: 'Ph.D. in Computer Science with over 15 years of teaching experience. Research interests include artificial intelligence and machine learning.'
    },
    { 
      id: 2, 
      firstName: 'Sarah', 
      lastName: 'Johnson', 
      email: 'sarah.johnson@university.edu', 
      department: 'Mathematics',
      position: 'Associate Professor',
      phone: '(555) 234-5678',
      courses: ['math201'],
      bio: 'Ph.D. in Applied Mathematics with research focus on numerical analysis and computational mathematics.'
    },
    { 
      id: 3, 
      firstName: 'Michael', 
      lastName: 'Williams', 
      email: 'michael.williams@university.edu', 
      department: 'Physics',
      position: 'Assistant Professor',
      phone: '(555) 345-6789',
      courses: ['phy105'],
      bio: 'Ph.D. in Theoretical Physics with expertise in quantum mechanics and relativity.'
    },
    { 
      id: 4, 
      firstName: 'Emily', 
      lastName: 'Davis', 
      email: 'emily.davis@university.edu', 
      department: 'English',
      position: 'Professor',
      phone: '(555) 456-7890',
      courses: ['eng101'],
      bio: 'Ph.D. in English Literature specializing in Victorian literature and feminist theory.'
    },
    { 
      id: 5, 
      firstName: 'Robert', 
      lastName: 'Brown', 
      email: 'robert.brown@university.edu', 
      department: 'Chemistry',
      position: 'Associate Professor',
      phone: '(555) 567-8901',
      courses: [],
      bio: 'Ph.D. in Organic Chemistry with research focus on pharmaceutical applications.'
    }
  ];

  const filteredFaculty = facultyMembers.filter(faculty => 
    faculty.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faculty.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faculty.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faculty.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (firstName: string, lastName: string) => {
    return firstName.charAt(0) + lastName.charAt(0);
  };
  
  const handleAddFaculty = () => {
    // Validation
    if (!newFaculty.firstName || !newFaculty.lastName || !newFaculty.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    const id = Math.max(...facultyMembers.map(f => f.id)) + 1;
    
    const faculty = {
      id,
      ...newFaculty,
      courses: [],
      bio: ''
    };
    
    // Add new faculty (in a real app this would be an API call)
    facultyMembers.push(faculty);
    
    toast({
      title: "Faculty Added",
      description: `${newFaculty.firstName} ${newFaculty.lastName} has been added to the faculty list.`,
    });
    
    // Reset form and close dialog
    setNewFaculty({
      firstName: '',
      lastName: '',
      email: '',
      department: 'Computer Science',
      position: 'Assistant Professor',
      phone: ''
    });
    setShowAddFacultyDialog(false);
  };
  
  const handleEditFaculty = (faculty) => {
    setSelectedFaculty(faculty);
    setShowEditFacultyDialog(true);
  };
  
  const handleUpdateFaculty = () => {
    if (!selectedFaculty) return;
    
    // Find and update faculty member (in a real app this would be an API call)
    const index = facultyMembers.findIndex(f => f.id === selectedFaculty.id);
    if (index >= 0) {
      facultyMembers[index] = { ...selectedFaculty };
      
      toast({
        title: "Faculty Updated",
        description: `${selectedFaculty.firstName} ${selectedFaculty.lastName}'s information has been updated.`,
      });
    }
    
    setShowEditFacultyDialog(false);
  };
  
  const handleViewProfile = (faculty) => {
    setSelectedFaculty(faculty);
    setShowProfileDialog(true);
  };
  
  const handleManageCourses = (faculty) => {
    setSelectedFaculty(faculty);
    setShowCoursesDialog(true);
  };
  
  const handleToggleCourse = (courseId) => {
    if (!selectedFaculty) return;
    
    const updatedCourses = [...selectedFaculty.courses];
    
    if (updatedCourses.includes(courseId)) {
      // Remove course
      const index = updatedCourses.indexOf(courseId);
      updatedCourses.splice(index, 1);
    } else {
      // Add course
      updatedCourses.push(courseId);
    }
    
    setSelectedFaculty({
      ...selectedFaculty,
      courses: updatedCourses
    });
  };
  
  const handleSaveCourses = () => {
    if (!selectedFaculty) return;
    
    // Find and update faculty courses (in a real app this would be an API call)
    const index = facultyMembers.findIndex(f => f.id === selectedFaculty.id);
    if (index >= 0) {
      facultyMembers[index].courses = [...selectedFaculty.courses];
      
      toast({
        title: "Courses Updated",
        description: `Course assignments for ${selectedFaculty.firstName} ${selectedFaculty.lastName} have been updated.`,
      });
    }
    
    setShowCoursesDialog(false);
  };
  
  const handleDeleteFaculty = (id) => {
    // Find and remove faculty member (in a real app this would be an API call)
    const index = facultyMembers.findIndex(f => f.id === id);
    if (index >= 0) {
      const faculty = facultyMembers[index];
      facultyMembers.splice(index, 1);
      
      toast({
        title: "Faculty Removed",
        description: `${faculty.firstName} ${faculty.lastName} has been removed from the faculty list.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Faculty</h1>
        <Dialog open={showAddFacultyDialog} onOpenChange={setShowAddFacultyDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Faculty Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Faculty Member</DialogTitle>
              <DialogDescription>
                Enter the details for the new faculty member.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={newFaculty.firstName}
                    onChange={(e) => setNewFaculty({...newFaculty, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={newFaculty.lastName}
                    onChange={(e) => setNewFaculty({...newFaculty, lastName: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newFaculty.email}
                  onChange={(e) => setNewFaculty({...newFaculty, email: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newFaculty.phone}
                  onChange={(e) => setNewFaculty({...newFaculty, phone: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={newFaculty.department}
                  onValueChange={(value) => setNewFaculty({...newFaculty, department: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Select
                  value={newFaculty.position}
                  onValueChange={(value) => setNewFaculty({...newFaculty, position: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map(position => (
                      <SelectItem key={position} value={position}>{position}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddFacultyDialog(false)}>Cancel</Button>
              <Button onClick={handleAddFaculty}>Add Faculty</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or department..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">Filter</Button>
        <Button variant="outline">Sort</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map(faculty => (
          <Card key={faculty.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://i.pravatar.cc/100?u=${faculty.id}`} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(faculty.firstName, faculty.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{faculty.firstName} {faculty.lastName}</CardTitle>
                    <p className="text-sm text-muted-foreground">{faculty.position}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditFaculty(faculty)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleManageCourses(faculty)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Assign Courses
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleViewProfile(faculty)}>
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={() => handleDeleteFaculty(faculty.id)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Delete Account
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{faculty.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{faculty.phone}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <div className="text-muted-foreground">Department</div>
                  <div>{faculty.department}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-muted-foreground">Courses</div>
                  <div>{faculty.courses.length}</div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewProfile(faculty)}>
                    <User className="h-4 w-4 mr-1" />
                    View Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredFaculty.length === 0 && (
          <div className="col-span-3 text-center py-12">
            <User className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No Faculty Found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search terms or add new faculty members.
            </p>
          </div>
        )}
      </div>
      
      {/* Edit Faculty Dialog */}
      <Dialog open={showEditFacultyDialog} onOpenChange={setShowEditFacultyDialog}>
        {selectedFaculty && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Faculty Member</DialogTitle>
              <DialogDescription>
                Update details for {selectedFaculty.firstName} {selectedFaculty.lastName}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-firstName">First Name</Label>
                  <Input
                    id="edit-firstName"
                    value={selectedFaculty.firstName}
                    onChange={(e) => setSelectedFaculty({...selectedFaculty, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-lastName">Last Name</Label>
                  <Input
                    id="edit-lastName"
                    value={selectedFaculty.lastName}
                    onChange={(e) => setSelectedFaculty({...selectedFaculty, lastName: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedFaculty.email}
                  onChange={(e) => setSelectedFaculty({...selectedFaculty, email: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={selectedFaculty.phone}
                  onChange={(e) => setSelectedFaculty({...selectedFaculty, phone: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-department">Department</Label>
                <Select
                  value={selectedFaculty.department}
                  onValueChange={(value) => setSelectedFaculty({...selectedFaculty, department: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-position">Position</Label>
                <Select
                  value={selectedFaculty.position}
                  onValueChange={(value) => setSelectedFaculty({...selectedFaculty, position: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map(position => (
                      <SelectItem key={position} value={position}>{position}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-bio">Bio</Label>
                <Input
                  id="edit-bio"
                  value={selectedFaculty.bio}
                  onChange={(e) => setSelectedFaculty({...selectedFaculty, bio: e.target.value})}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditFacultyDialog(false)}>Cancel</Button>
              <Button onClick={handleUpdateFaculty}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      {/* View Profile Dialog */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        {selectedFaculty && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Faculty Profile</DialogTitle>
              <DialogDescription>
                {selectedFaculty.firstName} {selectedFaculty.lastName} - {selectedFaculty.position}
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:w-1/3">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${selectedFaculty.id}`} />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {getInitials(selectedFaculty.firstName, selectedFaculty.lastName)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-medium">{selectedFaculty.firstName} {selectedFaculty.lastName}</h3>
                  <p className="text-muted-foreground">{selectedFaculty.position}</p>
                </div>
                
                <div className="mt-6 space-y-2 w-full">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{selectedFaculty.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{selectedFaculty.phone}</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground">Department</p>
                    <p className="text-sm font-medium">{selectedFaculty.department}</p>
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3 space-y-4">
                <div>
                  <h4 className="text-lg font-medium">Biography</h4>
                  <p className="mt-2 text-sm">{selectedFaculty.bio}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-2">Assigned Courses</h4>
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course Code</TableHead>
                          <TableHead>Course Name</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedFaculty.courses.length > 0 ? (
                          selectedFaculty.courses.map(courseId => {
                            const course = courses.find(c => c.id === courseId);
                            if (!course) return null;
                            
                            const [code, name] = course.name.split(' - ');
                            return (
                              <TableRow key={courseId}>
                                <TableCell>{code}</TableCell>
                                <TableCell>{name}</TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={2} className="text-center">No courses assigned</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => handleManageCourses(selectedFaculty)}>
                <Edit className="h-4 w-4 mr-1" />
                Assign Courses
              </Button>
              <Button variant="outline" onClick={() => handleEditFaculty(selectedFaculty)}>
                <Edit className="h-4 w-4 mr-1" />
                Edit Profile
              </Button>
              <Button onClick={() => setShowProfileDialog(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Assign Courses Dialog */}
      <Dialog open={showCoursesDialog} onOpenChange={setShowCoursesDialog}>
        {selectedFaculty && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Courses</DialogTitle>
              <DialogDescription>
                Manage course assignments for {selectedFaculty.firstName} {selectedFaculty.lastName}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="space-y-4">
                {courses.map(course => {
                  const isAssigned = selectedFaculty.courses.includes(course.id);
                  return (
                    <div key={course.id} className="flex items-center justify-between">
                      <span>{course.name}</span>
                      <Button
                        size="sm"
                        variant={isAssigned ? "default" : "outline"}
                        onClick={() => handleToggleCourse(course.id)}
                      >
                        {isAssigned ? (
                          <Check className="h-4 w-4 mr-1" />
                        ) : (
                          <Plus className="h-4 w-4 mr-1" />
                        )}
                        {isAssigned ? 'Assigned' : 'Assign'}
                      </Button>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 p-3 bg-muted/50 rounded-md">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Faculty members can be assigned to multiple courses.
                  Assigning or removing a course here will update their teaching schedule.
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCoursesDialog(false)}>Cancel</Button>
              <Button onClick={handleSaveCourses}>Save Assignments</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default AdminFaculty;