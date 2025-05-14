
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, BookOpen, PlusCircle, Search, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const FacultyClasses = () => {
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: 'Introduction to Computer Science',
      code: 'CS101',
      schedule: 'Mon, Wed, Fri 10:00 AM - 11:30 AM',
      room: 'Science Building, Room 305',
      students: 28,
      upcoming: 'Lecture: Arrays and Linked Lists',
      nextClass: '2025-05-10 10:00'
    },
    {
      id: 2,
      name: 'Data Structures and Algorithms',
      code: 'CS201',
      schedule: 'Tue, Thu 1:00 PM - 2:30 PM',
      room: 'Technology Hall, Room 210',
      students: 22,
      upcoming: 'Lab: Graph Implementation',
      nextClass: '2025-05-11 13:00'
    },
    {
      id: 3,
      name: 'Introduction to Web Development',
      code: 'CS150',
      schedule: 'Mon, Wed 3:00 PM - 4:30 PM',
      room: 'Engineering Building, Room 105',
      students: 35,
      upcoming: 'Project Presentations',
      nextClass: '2025-05-12 15:00'
    }
  ]);
  
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedClassStudents] = useState([
    { id: 1, name: 'Emma Thompson', email: 'emma.t@university.edu', image: 'https://i.pravatar.cc/150?u=emma', attendance: '95%', grade: 'A' },
    { id: 2, name: 'Michael Chen', email: 'mchen@university.edu', image: 'https://i.pravatar.cc/150?u=michael', attendance: '88%', grade: 'B+' },
    { id: 3, name: 'Sophia Garcia', email: 'sgarcia@university.edu', image: 'https://i.pravatar.cc/150?u=sophia', attendance: '92%', grade: 'A-' },
    { id: 4, name: 'James Wilson', email: 'jwilson@university.edu', image: 'https://i.pravatar.cc/150?u=james', attendance: '78%', grade: 'B' },
  ]);
  
  const [showClassDetails, setShowClassDetails] = useState(false);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newClass, setNewClass] = useState({
    name: '',
    code: '',
    schedule: '',
    room: '',
    students: 0
  });
  const [editingClass, setEditingClass] = useState(null);
  const [addingMaterial, setAddingMaterial] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    type: 'document',
    description: ''
  });
  
  const handleViewClass = (classItem) => {
    setSelectedClass(classItem);
    setShowClassDetails(true);
  };
  
  const handleStartClass = (classItem) => {
    toast({
      title: "Class Started",
      description: `${classItem.name} (${classItem.code}) has been started.`,
    });
  };

  const handleAddClass = () => {
    if (!newClass.name || !newClass.code || !newClass.schedule || !newClass.room) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const newClassObj = {
      id: classes.length + 1,
      ...newClass,
      upcoming: "First lecture",
      nextClass: new Date().toISOString().split('T')[0] + " 10:00"
    };

    setClasses([...classes, newClassObj]);
    setNewClass({
      name: '',
      code: '',
      schedule: '',
      room: '',
      students: 0
    });
    setShowAddClassModal(false);
    
    toast({
      title: "Class Added",
      description: `${newClass.name} (${newClass.code}) has been added to your classes.`,
    });
  };

  const handleEditClass = () => {
    if (!editingClass) return;
    
    const updatedClasses = classes.map(cls => 
      cls.id === selectedClass.id ? { ...cls, ...editingClass } : cls
    );
    
    setClasses(updatedClasses);
    setSelectedClass({ ...selectedClass, ...editingClass });
    setEditingClass(null);
    
    toast({
      title: "Class Updated",
      description: `Class details have been updated successfully.`,
    });
  };

  const handleAddMaterial = () => {
    if (!newMaterial.title) {
      toast({
        title: "Error",
        description: "Please enter a title for the material",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would typically call an API to add the material
    // For now, we'll just show a success message
    toast({
      title: "Material Added",
      description: `${newMaterial.title} has been added to the class materials.`,
    });
    
    setNewMaterial({
      title: '',
      type: 'document',
      description: ''
    });
    setAddingMaterial(false);
  };
  
  const filteredClasses = classes.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">My Classes</h1>
        <div className="flex space-x-2 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search classes..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog open={showAddClassModal} onOpenChange={setShowAddClassModal}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                New Class
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Class</DialogTitle>
                <DialogDescription>
                  Create a new class for your teaching schedule.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Class Name
                  </Label>
                  <Input
                    id="name"
                    value={newClass.name}
                    onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="code" className="text-right">
                    Class Code
                  </Label>
                  <Input
                    id="code"
                    value={newClass.code}
                    onChange={(e) => setNewClass({...newClass, code: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="schedule" className="text-right">
                    Schedule
                  </Label>
                  <Input
                    id="schedule"
                    value={newClass.schedule}
                    onChange={(e) => setNewClass({...newClass, schedule: e.target.value})}
                    placeholder="e.g. Mon, Wed, Fri 10:00 AM - 11:30 AM"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="room" className="text-right">
                    Room
                  </Label>
                  <Input
                    id="room"
                    value={newClass.room}
                    onChange={(e) => setNewClass({...newClass, room: e.target.value})}
                    placeholder="e.g. Science Building, Room 305"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="students" className="text-right">
                    Students
                  </Label>
                  <Input
                    id="students"
                    type="number"
                    value={newClass.students}
                    onChange={(e) => setNewClass({...newClass, students: parseInt(e.target.value) || 0})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddClassModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddClass}>Add Class</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClasses.map((classItem) => (
          <Card key={classItem.id} className="overflow-hidden hover:shadow-md transition-all">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{classItem.name}</CardTitle>
                  <CardDescription>{classItem.code}</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleViewClass(classItem)}>
                  Manage
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start">
                <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <span className="text-sm">{classItem.schedule}</span>
              </div>
              <div className="flex items-start">
                <Clock className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <span className="text-sm">{classItem.room}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{classItem.students} students enrolled</span>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/40 border-t px-6 py-3">
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium">Next Class</p>
                    <p className="text-sm">{classItem.upcoming}</p>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleStartClass(classItem)}
                  >
                    Start Class
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredClasses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No classes found</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your search to find what you're looking for.
          </p>
        </div>
      )}
      
      {/* Class Details Dialog */}
      <Dialog open={showClassDetails} onOpenChange={setShowClassDetails}>
        {selectedClass && (
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedClass.name}</DialogTitle>
              <DialogDescription>{selectedClass.code} • {selectedClass.room}</DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="details" className="mt-2">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="details">Class Details</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                {editingClass ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Class Name</Label>
                        <Input 
                          id="edit-name" 
                          value={editingClass.name} 
                          onChange={(e) => setEditingClass({...editingClass, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-code">Class Code</Label>
                        <Input 
                          id="edit-code" 
                          value={editingClass.code} 
                          onChange={(e) => setEditingClass({...editingClass, code: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-schedule">Schedule</Label>
                        <Input 
                          id="edit-schedule" 
                          value={editingClass.schedule} 
                          onChange={(e) => setEditingClass({...editingClass, schedule: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-room">Room</Label>
                        <Input 
                          id="edit-room" 
                          value={editingClass.room} 
                          onChange={(e) => setEditingClass({...editingClass, room: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setEditingClass(null)}>Cancel</Button>
                      <Button onClick={handleEditClass}>Save Changes</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Schedule</h4>
                        <div className="flex items-start mb-2">
                          <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                          <span className="text-sm">{selectedClass.schedule}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Enrollment</h4>
                        <div className="flex items-start">
                          <Users className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                          <span className="text-sm">{selectedClass.students} students</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Upcoming Sessions</h4>
                      <div className="space-y-3">
                        <div className="flex bg-muted/40 p-3 rounded-md">
                          <div className="mr-3 bg-primary text-primary-foreground text-center w-12 h-12 flex flex-col justify-center rounded-md">
                            <div className="text-xs">May</div>
                            <div className="text-lg font-bold">12</div>
                          </div>
                          <div>
                            <p className="font-medium">{selectedClass.upcoming}</p>
                            <p className="text-sm text-muted-foreground">{selectedClass.schedule.split(' ')[0]} at {selectedClass.schedule.split(' ')[3]} {selectedClass.schedule.split(' ')[4]}</p>
                          </div>
                        </div>
                        <div className="flex bg-muted/40 p-3 rounded-md">
                          <div className="mr-3 bg-muted text-foreground text-center w-12 h-12 flex flex-col justify-center rounded-md">
                            <div className="text-xs">May</div>
                            <div className="text-lg font-bold">14</div>
                          </div>
                          <div>
                            <p className="font-medium">Midterm Examination</p>
                            <p className="text-sm text-muted-foreground">{selectedClass.schedule.split(' ')[0]} at {selectedClass.schedule.split(' ')[3]} {selectedClass.schedule.split(' ')[4]}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setEditingClass({...selectedClass})}>Edit Class Details</Button>
                      <Button onClick={() => handleStartClass(selectedClass)}>Start Class Session</Button>
                    </div>
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="students" className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search students..." className="pl-9" />
                </div>
                
                <div className="border rounded-md">
                  <div className="grid grid-cols-4 font-medium text-sm p-3 border-b">
                    <div>Student</div>
                    <div>Email</div>
                    <div>Attendance</div>
                    <div>Grade</div>
                  </div>
                  
                  {selectedClassStudents.map((student) => (
                    <div key={student.id} className="grid grid-cols-4 text-sm p-3 border-b last:border-b-0 items-center hover:bg-muted/50">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.image} alt={student.name} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{student.name}</span>
                      </div>
                      <div>{student.email}</div>
                      <div>{student.attendance}</div>
                      <div>{student.grade}</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline">Export List</Button>
                  <Button asChild>
                    <a href="/faculty/attendance">Take Attendance</a>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="materials" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Course Materials</h4>
                  <Button size="sm" onClick={() => setAddingMaterial(true)}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Material
                  </Button>
                </div>
                
                {addingMaterial ? (
                  <div className="space-y-4 border p-4 rounded-md">
                    <div className="space-y-2">
                      <Label htmlFor="material-title">Title</Label>
                      <Input 
                        id="material-title" 
                        value={newMaterial.title} 
                        onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
                        placeholder="e.g. Lecture Slides Week 5"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="material-type">Type</Label>
                      <Select 
                        value={newMaterial.type} 
                        onValueChange={(value) => setNewMaterial({...newMaterial, type: value})}
                      >
                        <SelectTrigger id="material-type">
                          <SelectValue placeholder="Select material type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="document">Document</SelectItem>
                          <SelectItem value="presentation">Presentation</SelectItem>
                          <SelectItem value="assignment">Assignment</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="material-description">Description (Optional)</Label>
                      <Input 
                        id="material-description" 
                        value={newMaterial.description} 
                        onChange={(e) => setNewMaterial({...newMaterial, description: e.target.value})}
                        placeholder="Brief description of the material"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="material-file">Upload File</Label>
                      <Input 
                        id="material-file" 
                        type="file"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setAddingMaterial(false)}>Cancel</Button>
                      <Button onClick={handleAddMaterial}>Add Material</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Card className="flex items-center p-3">
                      <div className="mr-3">
                        <FileText className="h-8 w-8 text-blue-500" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium">Lecture Slides Week 5</p>
                        <p className="text-xs text-muted-foreground">Added on May 2, 2025</p>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </Card>
                    <Card className="flex items-center p-3">
                      <div className="mr-3">
                        <FileText className="h-8 w-8 text-green-500" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium">Lab Exercise 3</p>
                        <p className="text-xs text-muted-foreground">Added on May 5, 2025</p>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </Card>
                  </div>
                )}
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="flex justify-end sm:justify-end">
              <Button variant="outline" onClick={() => setShowClassDetails(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default FacultyClasses;
