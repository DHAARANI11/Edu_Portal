import React, { useState, useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Upload, FileUp, AlertCircle, FileText, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const StudentHomework = () => {
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Research Paper', course: 'English Composition', dueDate: '2025-05-15', status: 'Pending', description: 'Write a 5-page research paper on a topic of your choice related to modern literature.' },
    { id: 2, title: 'Problem Set 3', course: 'Calculus I', dueDate: '2025-05-12', status: 'Pending', description: 'Complete problems 15-30 from Chapter 4.' },
    { id: 3, title: 'Programming Assignment', course: 'Introduction to Computer Science', dueDate: '2025-05-18', status: 'Pending', description: 'Implement a binary search tree with insert, delete, and search operations.' },
    { id: 4, title: 'Lab Report', course: 'Physics for Engineers', dueDate: '2025-05-14', status: 'Submitted', submissionDate: '2025-05-10', description: 'Write a detailed report on the pendulum experiment conducted in lab.' }
  ]);

  const [showSubmissionDialog, setShowSubmissionDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [fileUploading, setFileUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filter, setFilter] = useState('all');
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const fileInputRef = useRef(null);

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true;
    return assignment.status.toLowerCase() === filter.toLowerCase();
  });

  const handleSubmitAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setShowSubmissionDialog(true);
  };

  const handleViewSubmission = (assignment) => {
    setSelectedAssignment(assignment);
    setShowDetailsDialog(true);
  };

  const simulateFileUpload = () => {
    setFileUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setFileUploading(false);
          const updatedAssignments = assignments.map(a =>
            a.id === selectedAssignment.id
              ? { ...a, status: 'Submitted', submissionDate: new Date().toISOString().split('T')[0] }
              : a
          );
          setAssignments(updatedAssignments);
          setShowSubmissionDialog(false);
          toast({ title: "Assignment Submitted", description: "Your assignment has been submitted successfully." });
          return 0;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Homework Assignments</h1>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter Assignments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Assignments</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredAssignments.map((assignment) => (
          <Card key={assignment.id} className={assignment.status === 'Submitted' ? 'border-green-200' : ''}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{assignment.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{assignment.course}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${assignment.status === 'Submitted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {assignment.status}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{assignment.description}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="mr-4">Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>11:59 PM</span>
              </div>
              {assignment.status === 'Submitted' && assignment.submissionDate && (
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <FileUp className="h-4 w-4 mr-1" />
                  <span>Submitted on: {new Date(assignment.submissionDate).toLocaleDateString()}</span>
                </div>
              )}
              {assignment.status === 'Pending' && isCloseToDeadline(assignment.dueDate) && (
                <div className="flex items-center mt-2 text-sm text-amber-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>Deadline approaching</span>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {assignment.status === 'Pending' ? (
                <Button className="w-full" onClick={() => handleSubmitAssignment(assignment)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Submit Assignment
                </Button>
              ) : (
                <Button variant="outline" className="w-full" onClick={() => handleViewSubmission(assignment)}>
                  View Submission
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Submission Dialog */}
      <Dialog open={showSubmissionDialog} onOpenChange={setShowSubmissionDialog}>
        {selectedAssignment && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Submit Assignment</DialogTitle>
              <DialogDescription>{selectedAssignment.title} - {selectedAssignment.course}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <Tabs defaultValue="upload">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="upload">Upload File</TabsTrigger>
                  <TabsTrigger value="text">Text Submission</TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="space-y-4 pt-4">
                  <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
                    <FileUp className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm font-medium">
                      Drag and drop your file here, or click to select
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Supported files: PDF, DOC, DOCX, ZIP (Max 10MB)
                    </p>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx,.zip"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={simulateFileUpload}
                    />
                    <Button className="mt-4" onClick={() => fileInputRef.current?.click()}>
                      Choose from My Documents
                    </Button>
                  </div>
                  {fileUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="text" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="comment">Assignment Text</Label>
                    <textarea className="min-h-[200px] w-full p-2 border rounded-md" placeholder="Type your submission here..." />
                  </div>
                  <Button className="w-full" onClick={() => simulateFileUpload()}>
                    Submit Text
                  </Button>
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Due: {new Date(selectedAssignment.dueDate).toLocaleDateString()} at 11:59 PM</span>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSubmissionDialog(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* View Submission Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        {selectedAssignment && selectedAssignment.status === 'Submitted' && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Submission Details</DialogTitle>
              <DialogDescription>{selectedAssignment.title} - {selectedAssignment.course}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="bg-muted p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Submission File</span>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="h-10 w-10 text-primary" />
                  <div>
                    <p className="text-sm font-medium">assignment_submission.pdf</p>
                    <p className="text-xs text-muted-foreground">
                      1.2 MB • Submitted {new Date(selectedAssignment.submissionDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Label>Submission Status</Label>
                <div className="mt-1 flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium">Submitted on time</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Your assignment was submitted before the deadline and is currently awaiting grading.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                Close
              </Button>
              <Button onClick={() => {
                setShowDetailsDialog(false);
                handleSubmitAssignment(selectedAssignment);
              }}>
                Resubmit
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

const isCloseToDeadline = (dateString) => {
  const dueDate = new Date(dateString);
  const today = new Date();
  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= 2;
};

export default StudentHomework;
