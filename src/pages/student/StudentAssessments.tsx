
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { FileText, Calendar, Clock, AlertTriangle, Check, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Progress } from '@/components/ui/progress';

export const StudentAssessments = () => {
  const [assessments, setAssessments] = useState([
    {
      id: 1,
      title: 'Midterm Examination',
      course: 'CS101 - Introduction to Computer Science',
      type: 'Exam',
      date: '2025-05-15',
      time: '10:00 AM - 12:00 PM',
      location: 'Room 102, Science Building',
      weight: 30,
      status: 'Upcoming'
    },
    {
      id: 2,
      title: 'Research Paper',
      course: 'ENG101 - English Composition',
      type: 'Assignment',
      date: '2025-05-12',
      time: '11:59 PM',
      weight: 20,
      status: 'Upcoming'
    },
    {
      id: 3,
      title: 'Quiz 2',
      course: 'MATH201 - Calculus I',
      type: 'Quiz',
      date: '2025-05-08',
      time: '2:00 PM - 2:30 PM',
      location: 'Room 205, Mathematics Building',
      weight: 10,
      status: 'Completed',
      grade: 85
    },
    {
      id: 4,
      title: 'Lab Report 3',
      course: 'PHY105 - Physics for Engineers',
      type: 'Report',
      date: '2025-04-28',
      time: '11:59 PM',
      weight: 15,
      status: 'Completed',
      grade: 92
    },
    {
      id: 5,
      title: 'Quiz 1',
      course: 'CS101 - Introduction to Computer Science',
      type: 'Quiz',
      date: '2025-04-20',
      time: '9:00 AM - 9:30 AM',
      location: 'Room 102, Science Building',
      weight: 5,
      status: 'Completed',
      grade: 78
    }
  ]);
  
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [showAssessmentDetails, setShowAssessmentDetails] = useState(false);
  
  const upcomingAssessments = assessments.filter(a => a.status === 'Upcoming');
  const completedAssessments = assessments.filter(a => a.status === 'Completed');
  
  const handleViewDetails = (assessment) => {
    setSelectedAssessment(assessment);
    setShowAssessmentDetails(true);
  };
  
  const getOverallGrade = () => {
    if (completedAssessments.length === 0) return 0;
    
    const totalWeight = completedAssessments.reduce((sum, assessment) => sum + assessment.weight, 0);
    const weightedGrade = completedAssessments.reduce((sum, assessment) => 
      sum + (assessment.grade * assessment.weight), 0);
    
    return Math.round(weightedGrade / totalWeight);
  };
  
  const getAssessmentTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'exam': return <FileText className="h-5 w-5 text-blue-500" />;
      case 'quiz': return <FileText className="h-5 w-5 text-green-500" />;
      case 'assignment': return <FileText className="h-5 w-5 text-amber-500" />;
      case 'report': return <FileText className="h-5 w-5 text-purple-500" />;
      default: return <FileText className="h-5 w-5 text-primary" />;
    }
  };
  
  const getStatusBadge = (status) => {
    if (status === 'Upcoming') {
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Upcoming</Badge>;
    } else if (status === 'Completed') {
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
    }
    return <Badge variant="outline">{status}</Badge>;
  };
  
  const isDateClose = (dateString) => {
    const assessmentDate = new Date(dateString);
    const today = new Date();
    const diffTime = assessmentDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 3;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Assessments</h1>
          <p className="text-muted-foreground">View your upcoming and completed assessments.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assessments.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingAssessments.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getOverallGrade()}%</div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="upcoming" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="w-full border-b pb-0 mb-4">
          <TabsTrigger value="upcoming" className="flex-1">
            Upcoming ({upcomingAssessments.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex-1">
            Completed ({completedAssessments.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {upcomingAssessments.map((assessment) => (
            <Card key={assessment.id} className={`hover:border-primary/30 transition-colors cursor-pointer ${
              isDateClose(assessment.date) ? 'border-amber-200' : ''
            }`} onClick={() => handleViewDetails(assessment)}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    {getAssessmentTypeIcon(assessment.type)}
                    <CardTitle className="ml-2 text-lg">{assessment.title}</CardTitle>
                  </div>
                  <div className="flex items-center">
                    {getStatusBadge(assessment.status)}
                  </div>
                </div>
                <CardDescription>{assessment.course}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm">{new Date(assessment.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm">{assessment.time}</span>
                  </div>
                  {isDateClose(assessment.date) && (
                    <div className="flex items-center text-amber-600">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      <span className="text-sm">Coming soon</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="ml-auto" onClick={(e) => {
                  e.stopPropagation();
                  handleViewDetails(assessment);
                }}>
                  View Details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {upcomingAssessments.length === 0 && (
            <div className="text-center py-12">
              <Check className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Upcoming Assessments</h3>
              <p className="text-muted-foreground mt-2">
                You don't have any upcoming assessments at the moment.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4 mt-6">
          {completedAssessments.map((assessment) => (
            <Card key={assessment.id} className="hover:border-primary/30 transition-colors cursor-pointer" onClick={() => handleViewDetails(assessment)}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    {getAssessmentTypeIcon(assessment.type)}
                    <CardTitle className="ml-2 text-lg">{assessment.title}</CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(assessment.status)}
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {assessment.grade}%
                    </Badge>
                  </div>
                </div>
                <CardDescription>{assessment.course}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm">{new Date(assessment.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm">{assessment.time}</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Grade</span>
                    <span>{assessment.grade}%</span>
                  </div>
                  <Progress value={assessment.grade} className="h-2" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="ml-auto" onClick={(e) => {
                  e.stopPropagation();
                  handleViewDetails(assessment);
                }}>
                  View Details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {completedAssessments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Completed Assessments</h3>
              <p className="text-muted-foreground mt-2">
                You haven't completed any assessments yet.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <Dialog open={showAssessmentDetails} onOpenChange={setShowAssessmentDetails}>
        {selectedAssessment && (
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>{selectedAssessment.title}</DialogTitle>
              <DialogDescription>{selectedAssessment.course}</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Badge className="bg-primary/10 text-primary border-none">
                  {selectedAssessment.type}
                </Badge>
                {getStatusBadge(selectedAssessment.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium">{new Date(selectedAssessment.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Time</p>
                  <p className="font-medium">{selectedAssessment.time}</p>
                </div>
                {selectedAssessment.location && (
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-medium">{selectedAssessment.location}</p>
                  </div>
                )}
                <div>
                  <p className="text-muted-foreground">Weight</p>
                  <p className="font-medium">{selectedAssessment.weight}%</p>
                </div>
                
                {selectedAssessment.grade && (
                  <div>
                    <p className="text-muted-foreground">Grade</p>
                    <p className="font-medium">{selectedAssessment.grade}%</p>
                  </div>
                )}
              </div>
              
              {selectedAssessment.grade && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Performance</p>
                  <Progress value={selectedAssessment.grade} className="h-2" />
                </div>
              )}
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Description</p>
                <p className="text-sm">
                  This {selectedAssessment.type.toLowerCase()} will cover material from chapters 1-5 of the textbook
                  and all topics discussed in lectures up to May 1st. {selectedAssessment.type === 'Exam' && 'Please bring your student ID and arrive 15 minutes early.'}
                </p>
              </div>
              
              {selectedAssessment.status === 'Upcoming' && (
                <div className="bg-muted p-4 rounded-md flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    Make sure to prepare adequately and arrive on time. Check the course materials
                    for study resources and past examples.
                  </p>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAssessmentDetails(false)}>Close</Button>
              {selectedAssessment.status === 'Upcoming' && (
                <Button onClick={() => {
                  toast({
                    title: "Reminder Set",
                    description: `You will be reminded about ${selectedAssessment.title} one day before.`,
                  });
                  setShowAssessmentDetails(false);
                }}>
                  Set Reminder
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default StudentAssessments;
