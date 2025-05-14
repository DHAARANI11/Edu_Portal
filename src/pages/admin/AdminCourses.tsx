
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { 
  Plus, 
  Search, 
  Filter, 
  BookOpen, 
  Users, 
  Calendar,
  MoreVertical,
  Edit,
  Trash,
  Copy,
  Download,
  FileText
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AdminCourses = () => {
  const [courses, setCourses] = useState([
    { 
      id: 1, 
      name: 'Introduction to Computer Science', 
      code: 'CS101', 
      department: 'Computer Science',
      credits: 3,
      instructor: 'Dr. Smith',
      students: 28,
      status: 'Active',
      term: 'Spring 2025'
    },
    { 
      id: 2, 
      name: 'Calculus I', 
      code: 'MATH201', 
      department: 'Mathematics',
      credits: 4,
      instructor: 'Prof. Johnson',
      students: 35,
      status: 'Active',
      term: 'Spring 2025'
    },
    { 
      id: 3, 
      name: 'Physics for Engineers', 
      code: 'PHY105', 
      department: 'Physics',
      credits: 4,
      instructor: 'Dr. Williams',
      students: 32,
      status: 'Active',
      term: 'Spring 2025'
    },
    { 
      id: 4, 
      name: 'English Composition', 
      code: 'ENG101', 
      department: 'English',
      credits: 3,
      instructor: 'Prof. Davis',
      students: 40,
      status: 'Active',
      term: 'Spring 2025'
    },
    { 
      id: 5, 
      name: 'Introduction to Psychology', 
      code: 'PSY101', 
      department: 'Psychology',
      credits: 3,
      instructor: 'Dr. Wilson',
      students: 45,
      status: 'Active',
      term: 'Spring 2025'
    },
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddCourseDialog, setShowAddCourseDialog] = useState(false);
  const [showEditCourseDialog, setShowEditCourseDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  const [newCourse, setNewCourse] = useState({
    name: '',
    code: '',
    department: '',
    credits: '',
    instructor: '',
    term: 'Spring 2025',
    description: ''
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({
      ...newCourse,
      [name]: value
    });
  };
  
  const handleAddCourse = () => {
    // Add new course to the list
    const createdCourse = {
      ...newCourse,
      id: courses.length + 1,
      students: 0,
      status: 'Active',
      credits: parseInt(newCourse.credits)
    };
    
    setCourses([...courses, createdCourse]);
    setShowAddCourseDialog(false);
    
    toast({
      title: "Course Added",
      description: `${newCourse.name} (${newCourse.code}) has been added successfully.`,
    });
    
    // Reset form
    setNewCourse({
      name: '',
      code: '',
      department: '',
      credits: '',
      instructor: '',
      term: 'Spring 2025',
      description: ''
    });
  };
  
  const handleEditCourse = () => {
    // Update the course in the list
    const updatedCourses = courses.map(course => 
      course.id === selectedCourse.id ? selectedCourse : course
    );
    
    setCourses(updatedCourses);
    setShowEditCourseDialog(false);
    
    toast({
      title: "Course Updated",
      description: `${selectedCourse.name} (${selectedCourse.code}) has been updated successfully.`,
    });
  };
  
  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
    
    toast({
      title: "Course Deleted",
      description: "The course has been deleted successfully.",
    });
  };
  
  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Courses</h1>
        <div className="flex space-x-2 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setShowAddCourseDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <CardTitle className="text-xl">{course.name}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {
                      setSelectedCourse(course);
                      setShowEditCourseDialog(true);
                    }}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      // Duplicate course
                      const duplicatedCourse = {
                        ...course,
                        id: courses.length + 1,
                        name: `${course.name} (Copy)`,
                        code: `${course.code}-COPY`
                      };
                      setCourses([...courses, duplicatedCourse]);
                      toast({
                        title: "Course Duplicated",
                        description: `A copy of ${course.name} has been created.`,
                      });
                    }}>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Course Code:</span>
                  <span className="font-medium">{course.code}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Department:</span>
                  <span>{course.department}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Credits:</span>
                  <span>{course.credits}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Instructor:</span>
                  <span>{course.instructor}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 flex justify-between items-center">
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                <span>{course.students} students</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSelectedCourse(course);
                  setShowEditCourseDialog(true);
                }}
              >
                Edit Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No courses found</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your search or add a new course.
          </p>
          <Button className="mt-4" onClick={() => setShowAddCourseDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        </div>
      )}
      
      {/* Add Course Dialog */}
      <Dialog open={showAddCourseDialog} onOpenChange={setShowAddCourseDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Course Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Introduction to Computer Science"
                  value={newCourse.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Course Code</Label>
                <Input
                  id="code"
                  name="code"
                  placeholder="e.g. CS101"
                  value={newCourse.code}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  name="department"
                  placeholder="e.g. Computer Science"
                  value={newCourse.department}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="credits">Credits</Label>
                <Input
                  id="credits"
                  name="credits"
                  type="number"
                  placeholder="e.g. 3"
                  value={newCourse.credits}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  name="instructor"
                  placeholder="e.g. Dr. Smith"
                  value={newCourse.instructor}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="term">Term</Label>
                <Select
                  defaultValue={newCourse.term}
                  onValueChange={(value) => setNewCourse({...newCourse, term: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                    <SelectItem value="Spring 2025">Spring 2025</SelectItem>
                    <SelectItem value="Summer 2025">Summer 2025</SelectItem>
                    <SelectItem value="Fall 2025">Fall 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter course description..."
                value={newCourse.description}
                onChange={handleInputChange}
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddCourseDialog(false)}>Cancel</Button>
            <Button onClick={handleAddCourse}>Add Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Course Dialog */}
      <Dialog open={showEditCourseDialog} onOpenChange={setShowEditCourseDialog}>
        {selectedCourse && (
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Edit Course</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Course Name</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    value={selectedCourse.name}
                    onChange={(e) => setSelectedCourse({...selectedCourse, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-code">Course Code</Label>
                  <Input
                    id="edit-code"
                    name="code"
                    value={selectedCourse.code}
                    onChange={(e) => setSelectedCourse({...selectedCourse, code: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-department">Department</Label>
                  <Input
                    id="edit-department"
                    name="department"
                    value={selectedCourse.department}
                    onChange={(e) => setSelectedCourse({...selectedCourse, department: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-credits">Credits</Label>
                  <Input
                    id="edit-credits"
                    name="credits"
                    type="number"
                    value={selectedCourse.credits}
                    onChange={(e) => setSelectedCourse({...selectedCourse, credits: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-instructor">Instructor</Label>
                  <Input
                    id="edit-instructor"
                    name="instructor"
                    value={selectedCourse.instructor}
                    onChange={(e) => setSelectedCourse({...selectedCourse, instructor: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-term">Term</Label>
                  <Select
                    defaultValue={selectedCourse.term}
                    onValueChange={(value) => setSelectedCourse({...selectedCourse, term: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                      <SelectItem value="Spring 2025">Spring 2025</SelectItem>
                      <SelectItem value="Summer 2025">Summer 2025</SelectItem>
                      <SelectItem value="Fall 2025">Fall 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  placeholder="Enter course description..."
                  value={selectedCourse.description || ''}
                  onChange={(e) => setSelectedCourse({...selectedCourse, description: e.target.value})}
                  className="min-h-[100px]"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditCourseDialog(false)}>Cancel</Button>
              <Button onClick={handleEditCourse}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default AdminCourses;
