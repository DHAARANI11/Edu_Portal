
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, FileText, Eye, Download, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const FacultySubmissions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [activeTab, setActiveTab] = useState('pending');
  
  // Sample data
  const courses = [
    { id: 'cs101', name: 'Introduction to Computer Science' },
    { id: 'math201', name: 'Calculus I' },
    { id: 'phy105', name: 'Physics for Engineers' },
  ];
  
  const submissions = [
    {
      id: 1,
      studentName: 'Alex Johnson',
      studentId: 'ST12345',
      title: 'Assignment 1: Programming Basics',
      course: 'cs101',
      submissionDate: '2025-05-08',
      dueDate: '2025-05-10',
      status: 'pending'
    },
    {
      id: 2,
      studentName: 'Maria Garcia',
      studentId: 'ST12346',
      title: 'Assignment 2: Loops and Arrays',
      course: 'cs101',
      submissionDate: '2025-05-07',
      dueDate: '2025-05-08',
      status: 'pending'
    },
    {
      id: 3,
      studentName: 'John Smith',
      studentId: 'ST12347',
      title: 'Problem Set 1: Integration',
      course: 'math201',
      submissionDate: '2025-05-09',
      dueDate: '2025-05-11',
      status: 'pending'
    },
    {
      id: 4,
      studentName: 'Emily Chen',
      studentId: 'ST12348',
      title: 'Lab Report: Force and Motion',
      course: 'phy105',
      submissionDate: '2025-05-06',
      dueDate: '2025-05-09',
      status: 'pending'
    },
    {
      id: 5,
      studentName: 'Alex Johnson',
      studentId: 'ST12345',
      title: 'Assignment 2: Data Structures',
      course: 'cs101',
      submissionDate: '2025-04-20',
      dueDate: '2025-04-22',
      status: 'graded',
      score: '85/100'
    },
    {
      id: 6,
      studentName: 'Maria Garcia',
      studentId: 'ST12346',
      title: 'Assignment 1: Introduction to Programming',
      course: 'cs101',
      submissionDate: '2025-04-15',
      dueDate: '2025-04-18',
      status: 'graded',
      score: '92/100'
    }
  ];

  // Filter submissions based on search term, course filter, and active tab
  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === 'all' || submission.course === filterCourse;
    const matchesStatus = submission.status === activeTab;
    
    return matchesSearch && matchesCourse && matchesStatus;
  });

  // Get course name by ID
  const getCourseName = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.name : courseId;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Student Submissions</h1>
      <p className="text-muted-foreground">Review and grade student homework submissions.</p>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Homework Submissions</CardTitle>
              <CardDescription>Review and grade submissions from your students</CardDescription>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="pending">Pending Review</TabsTrigger>
                <TabsTrigger value="graded">Graded</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search submissions..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filterCourse} onValueChange={setFilterCourse}>
                <SelectTrigger className="w-full md:w-[180px]">
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
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Submission Date</TableHead>
                  {activeTab === 'graded' && <TableHead>Score</TableHead>}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.length > 0 ? (
                  filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{submission.studentName}</p>
                          <p className="text-sm text-muted-foreground">{submission.studentId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{submission.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getCourseName(submission.course)}</TableCell>
                      <TableCell>
                        <div>
                          <p>{new Date(submission.submissionDate).toLocaleDateString()}</p>
                          <p className="text-xs text-muted-foreground">
                            Due: {new Date(submission.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </TableCell>
                      {activeTab === 'graded' && (
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                            {submission.score}
                          </Badge>
                        </TableCell>
                      )}
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            <span>View</span>
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            <span className="sr-only md:not-sr-only md:inline-flex">Download</span>
                          </Button>
                          {activeTab === 'pending' && (
                            <Button size="sm">
                              <Check className="h-4 w-4 mr-1" />
                              <span className="sr-only md:not-sr-only md:inline-flex">Grade</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={activeTab === 'graded' ? 6 : 5} className="text-center py-6 text-muted-foreground">
                      No submissions found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultySubmissions;
