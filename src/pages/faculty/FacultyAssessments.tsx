import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Calendar, FileText, Check, Clock, Eye, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const FacultyAssessments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showGradeDialog, setShowGradeDialog] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('all');
  
  const { toast } = useToast();

  const [newAssessment, setNewAssessment] = useState({
    title: '',
    course: 'cs101',
    type: 'Assignment',
    dueDate: '',
    totalPoints: 100, // Make sure this is initialized as a number
    instructions: ''
  });
  
  const courses = [
    { id: 'cs101', name: 'CS101 - Introduction to Computer Science' },
    { id: 'cs202', name: 'CS202 - Data Structures and Algorithms' },
    { id: 'cs305', name: 'CS305 - Database Systems' }
  ];
  
  const assessments = [
    { 
      id: 1, 
      title: 'Midterm Exam', 
      course: 'CS101',
      courseFullName: 'Introduction to Computer Science',
      type: 'Exam',
      dueDate: '2025-05-20',
      totalPoints: 100,
      status: 'Scheduled',
      submissions: 0,
      totalStudents: 45,
      instructions: 'This exam will cover all topics from weeks 1-7. No notes or electronic devices allowed.'
    },
    { 
      id: 2, 
      title: 'Programming Assignment #3', 
      course: 'CS202',
      courseFullName: 'Data Structures and Algorithms',
      type: 'Assignment',
      dueDate: '2025-05-15',
      totalPoints: 50,
      status: 'Active',
      submissions: 12,
      totalStudents: 38,
      instructions: 'Implement the sorting algorithms discussed in class. Submit your code with proper documentation.'
    },
    { 
      id: 3, 
      title: 'Quiz on Database Design', 
      course: 'CS305',
      courseFullName: 'Database Systems',
      type: 'Quiz',
      dueDate: '2025-05-12',
      totalPoints: 25,
      status: 'Active',
      submissions: 20,
      totalStudents: 28,
      instructions: 'Short quiz on ER diagrams and normalization concepts.'
    },
    { 
      id: 4, 
      title: 'Homework #2', 
      course: 'CS101',
      courseFullName: 'Introduction to Computer Science',
      type: 'Homework',
      dueDate: '2025-05-10',
      totalPoints: 20,
      status: 'Completed',
      submissions: 42,
      totalStudents: 45,
      instructions: 'Complete exercises 3.1-3.10 from the textbook.'
    },
    { 
      id: 5, 
      title: 'Final Project Proposal', 
      course: 'CS305',
      courseFullName: 'Database Systems',
      type: 'Project',
      dueDate: '2025-05-08',
      totalPoints: 30,
      status: 'Completed',
      submissions: 26,
      totalStudents: 28,
      instructions: 'Submit a 2-page proposal for your final database project.'
    }
  ];
  
  // Mock student submissions for grading dialog
  const studentSubmissions = [
    { id: 1, studentId: 'S1001', studentName: 'Emma Wilson', submittedDate: '2025-05-09', status: 'Submitted', grade: null },
    { id: 2, studentId: 'S1002', studentName: 'James Taylor', submittedDate: '2025-05-08', status: 'Submitted', grade: null },
    { id: 3, studentId: 'S1003', studentName: 'Sophia Martinez', submittedDate: '2025-05-10', status: 'Submitted', grade: null },
    { id: 4, studentId: 'S1004', studentName: 'Benjamin Chen', submittedDate: '2025-05-07', status: 'Submitted', grade: 18 },
    { id: 5, studentId: 'S1005', studentName: 'Olivia Johnson', submittedDate: '', status: 'Not Submitted', grade: null }
  ];

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = 
      assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assessment.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assessment.courseFullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assessment.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCourse = selectedCourse === 'all' || assessment.course === selectedCourse.toUpperCase();
    const matchesTab = activeTab === 'all' || assessment.status.toLowerCase() === activeTab.toLowerCase();
    
    return matchesSearch && matchesCourse && matchesTab;
  });

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Scheduled':
        return <Calendar className="h-4 w-4 mr-1" />;
      case 'Active':
        return <Clock className="h-4 w-4 mr-1" />;
      case 'Completed':
        return <Check className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  const handleCreateAssessment = () => {
    if (!newAssessment.title || !newAssessment.dueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would be an API call
    const newId = Math.max(...assessments.map(a => a.id)) + 1;
    const courseDetails = courses.find(c => c.id === newAssessment.course);
    
    // Ensure totalPoints is a number
    const totalPoints = Number(newAssessment.totalPoints);
    
    const newAssessmentItem = {
      id: newId,
      title: newAssessment.title,
      course: newAssessment.course.toUpperCase(),
      courseFullName: courseDetails ? courseDetails.name.split(' - ')[1] : '',
      type: newAssessment.type,
      dueDate: newAssessment.dueDate,
      totalPoints: totalPoints, // Use the converted number
      status: 'Scheduled',
      submissions: 0,
      totalStudents: newAssessment.course === 'cs101' ? 45 : newAssessment.course === 'cs202' ? 38 : 28,
      instructions: newAssessment.instructions
    };
    
    assessments.push(newAssessmentItem);
    
    toast({
      title: "Assessment Created",
      description: `${newAssessment.title} has been created successfully.`
    });
    
    // Reset form and close dialog
    setNewAssessment({
      title: '',
      course: 'cs101',
      type: 'Assignment',
      dueDate: '',
      totalPoints: 100, // Reset to a number
      instructions: ''
    });
    setShowCreateDialog(false);
  };
  
  const handleViewDetails = (assessment) => {
    setSelectedAssessment(assessment);
    setShowDetailsDialog(true);
  };
  
  const handleGradeSubmissions = (assessment) => {
    setSelectedAssessment(assessment);
    setShowGradeDialog(true);
  };
  
  const handleEditAssessment = (assessment) => {
    setNewAssessment({
      title: assessment.title,
      course: assessment.course.toLowerCase(),
      type: assessment.type,
      dueDate: assessment.dueDate,
      totalPoints: assessment.totalPoints, // This is already a number
      instructions: assessment.instructions
    });
    setShowCreateDialog(true);
  };
  
  const handlePublishNow = (assessment) => {
    const assessmentIndex = assessments.findIndex(a => a.id === assessment.id);
    if (assessmentIndex >= 0) {
      assessments[assessmentIndex].status = 'Active';
      
      toast({
        title: "Assessment Published",
        description: `${assessment.title} is now active and visible to students.`
      });
    }
  };

  const renderAssessmentCard = (assessment) => (
    <Card key={assessment.id}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{assessment.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{assessment.course} - {assessment.courseFullName}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm flex items-center ${getStatusClass(assessment.status)}`}>
            {getStatusIcon(assessment.status)}
            {assessment.status}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-sm text-muted-foreground">Type</div>
            <div>{assessment.type}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Due Date</div>
            <div>{new Date(assessment.dueDate).toLocaleDateString()}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Total Points</div>
            <div>{assessment.totalPoints} points</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-full bg-muted rounded-full h-2.5">
            <div 
              className="bg-primary h-2.5 rounded-full" 
              style={{ width: `${(assessment.submissions / assessment.totalStudents) * 100}%` }}
            ></div>
          </div>
          <span className="text-sm">
            {assessment.submissions}/{assessment.totalStudents} submissions
          </span>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => handleEditAssessment(assessment)}>
            <FileText className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => handleViewDetails(assessment)}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
            {assessment.status === 'Scheduled' ? (
              <Button onClick={() => handlePublishNow(assessment)}>Publish Now</Button>
            ) : assessment.status === 'Active' ? (
              <Button onClick={() => handleGradeSubmissions(assessment)}>Grade Submissions</Button>
            ) : (
              <Button onClick={() => handleGradeSubmissions(assessment)}>View Results</Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Assessments</h1>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Assessment
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assessments..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {courses.map(course => (
                <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-4">
          {filteredAssessments.length > 0 ? (
            filteredAssessments.map(assessment => renderAssessmentCard(assessment))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground mb-4">No assessments match your search criteria.</p>
                <Button onClick={() => setShowCreateDialog(true)}>Create New Assessment</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="active" className="space-y-4 mt-4">
          {filteredAssessments.filter(a => a.status === 'Active').length > 0 ? (
            filteredAssessments.filter(a => a.status === 'Active').map(assessment => renderAssessmentCard(assessment))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground mb-4">No active assessments match your search criteria.</p>
                <Button onClick={() => setShowCreateDialog(true)}>Create New Assessment</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="scheduled" className="space-y-4 mt-4">
          {filteredAssessments.filter(a => a.status === 'Scheduled').length > 0 ? (
            filteredAssessments.filter(a => a.status === 'Scheduled').map(assessment => renderAssessmentCard(assessment))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground mb-4">No scheduled assessments match your search criteria.</p>
                <Button onClick={() => setShowCreateDialog(true)}>Create New Assessment</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4 mt-4">
          {filteredAssessments.filter(a => a.status === 'Completed').length > 0 ? (
            filteredAssessments.filter(a => a.status === 'Completed').map(assessment => renderAssessmentCard(assessment))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <p className="text-muted-foreground mb-4">No completed assessments match your search criteria.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Create/Edit Assessment Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{newAssessment.title ? 'Edit Assessment' : 'Create New Assessment'}</DialogTitle>
            <DialogDescription>
              {newAssessment.title ? 'Update assessment details' : 'Add a new assessment for your students'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input
                id="title"
                placeholder="Assessment title"
                value={newAssessment.title}
                onChange={(e) => setNewAssessment({...newAssessment, title: e.target.value})}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="course" className="text-right">Course</Label>
              <div className="col-span-3">
                <Select 
                  value={newAssessment.course}
                  onValueChange={(value) => setNewAssessment({...newAssessment, course: value})}
                >
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
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">Type</Label>
              <div className="col-span-3">
                <Select 
                  value={newAssessment.type}
                  onValueChange={(value) => setNewAssessment({...newAssessment, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Assignment">Assignment</SelectItem>
                    <SelectItem value="Quiz">Quiz</SelectItem>
                    <SelectItem value="Exam">Exam</SelectItem>
                    <SelectItem value="Project">Project</SelectItem>
                    <SelectItem value="Homework">Homework</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={newAssessment.dueDate}
                onChange={(e) => setNewAssessment({...newAssessment, dueDate: e.target.value})}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="points" className="text-right">Total Points</Label>
              <Input
                id="points"
                type="number"
                value={newAssessment.totalPoints}
                onChange={(e) => setNewAssessment({...newAssessment, totalPoints: Number(e.target.value)})}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="instructions" className="text-right">Instructions</Label>
              <Textarea
                id="instructions"
                placeholder="Provide detailed instructions for the assessment"
                value={newAssessment.instructions}
                onChange={(e) => setNewAssessment({...newAssessment, instructions: e.target.value})}
                className="col-span-3"
                rows={4}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateAssessment}>{newAssessment.title ? 'Update' : 'Create'} Assessment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Assessment Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Assessment Details</DialogTitle>
          </DialogHeader>
          
          {selectedAssessment && (
            <>
              <div className="grid gap-4 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">{selectedAssessment.title}</h2>
                  <div className={`px-3 py-1 rounded-full text-sm flex items-center ${getStatusClass(selectedAssessment.status)}`}>
                    {getStatusIcon(selectedAssessment.status)}
                    {selectedAssessment.status}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Course</p>
                    <p>{selectedAssessment.course} - {selectedAssessment.courseFullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p>{selectedAssessment.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Due Date</p>
                    <p>{new Date(selectedAssessment.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Points</p>
                    <p>{selectedAssessment.totalPoints} points</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Instructions</p>
                  <p className="mt-1 p-3 bg-muted rounded-md">{selectedAssessment.instructions}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Submission Status</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${(selectedAssessment.submissions / selectedAssessment.totalStudents) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm whitespace-nowrap">
                      {selectedAssessment.submissions}/{selectedAssessment.totalStudents} submissions
                    </span>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => handleEditAssessment(selectedAssessment)}>Edit Assessment</Button>
                {selectedAssessment.status === 'Scheduled' ? (
                  <Button onClick={() => handlePublishNow(selectedAssessment)}>Publish Now</Button>
                ) : (
                  <Button onClick={() => handleGradeSubmissions(selectedAssessment)}>
                    {selectedAssessment.status === 'Completed' ? 'View Results' : 'Grade Submissions'}
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Grade Submissions Dialog */}
      <Dialog open={showGradeDialog} onOpenChange={setShowGradeDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedAssessment?.status === 'Completed' ? 'Submission Results' : 'Grade Submissions'}
            </DialogTitle>
            <DialogDescription>
              {selectedAssessment && (
                <div className="mt-2">
                  <p><strong>{selectedAssessment.title}</strong> ({selectedAssessment.course})</p>
                  <p>Due: {new Date(selectedAssessment.dueDate).toLocaleDateString()} • {selectedAssessment.totalPoints} points</p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 border rounded-md">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="p-2 text-left">Student</th>
                  <th className="p-2 text-left">Submitted</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Grade</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentSubmissions.map(submission => (
                  <tr key={submission.id} className="border-t">
                    <td className="p-2">
                      <div>
                        <p className="font-medium">{submission.studentName}</p>
                        <p className="text-xs text-muted-foreground">{submission.studentId}</p>
                      </div>
                    </td>
                    <td className="p-2">
                      {submission.submittedDate ? new Date(submission.submittedDate).toLocaleDateString() : '-'}
                    </td>
                    <td className="p-2">
                      <div className={`px-2 py-1 text-xs rounded-full inline-block ${
                        submission.status === 'Submitted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {submission.status}
                      </div>
                    </td>
                    <td className="p-2">
                      {submission.grade !== null ? (
                        <span>{submission.grade}/{selectedAssessment?.totalPoints}</span>
                      ) : (
                        submission.status === 'Submitted' ? (
                          <span className="text-muted-foreground">Not graded</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )
                      )}
                    </td>
                    <td className="p-2">
                      {submission.status === 'Submitted' && (
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm">
                            {submission.grade !== null ? 'Update Grade' : 'Grade'}
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowGradeDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FacultyAssessments;
