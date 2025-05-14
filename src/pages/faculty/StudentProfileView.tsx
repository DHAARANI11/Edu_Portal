
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Search, ChevronLeft, Filter, Download } from 'lucide-react';
import StudentProfileEditable from '@/components/student/StudentProfileEditable';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from '@/hooks/use-toast';

export const StudentProfileView = () => {
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const { user } = useAuth();
  
  // This would usually come from an API call
  const students = [
    {
      id: "ST12345",
      firstName: "Alex",
      lastName: "Johnson",
      email: "alex.johnson@university.edu",
      phone: "+1 (555) 123-4567",
      dateOfBirth: "2000-05-15",
      address: "123 Campus Drive, University City, CA 94105",
      program: "Bachelor of Science in Computer Science",
      admissionYear: "2022",
      graduationYear: "2026",
      status: "Active",
      gpa: "3.8",
      advisor: "Dr. Sarah Miller",
      emergencyContact: "Michael Johnson (Father) - +1 (555) 987-6543",
      profilePicture: ""
    },
    {
      id: "ST12346",
      firstName: "Emma",
      lastName: "Smith",
      email: "emma.smith@university.edu",
      phone: "+1 (555) 234-5678",
      dateOfBirth: "2001-08-22",
      address: "456 University Ave, College Town, CA 94106",
      program: "Bachelor of Arts in English Literature",
      admissionYear: "2022",
      graduationYear: "2026",
      status: "Active",
      gpa: "3.6",
      advisor: "Dr. James Wilson",
      emergencyContact: "Laura Smith (Mother) - +1 (555) 876-5432",
      profilePicture: ""
    },
    {
      id: "ST12347",
      firstName: "Michael",
      lastName: "Williams",
      email: "michael.williams@university.edu",
      phone: "+1 (555) 345-6789",
      dateOfBirth: "2000-11-10",
      address: "789 College Blvd, Academicville, CA 94107",
      program: "Bachelor of Engineering in Electrical Engineering",
      admissionYear: "2021",
      graduationYear: "2025",
      status: "Active",
      gpa: "3.9",
      advisor: "Dr. Sarah Miller",
      emergencyContact: "Robert Williams (Father) - +1 (555) 765-4321",
      profilePicture: ""
    },
    {
      id: "ST12348",
      firstName: "Sophia",
      lastName: "Garcia",
      email: "sophia.garcia@university.edu",
      phone: "+1 (555) 456-7890",
      dateOfBirth: "2001-03-25",
      address: "321 Scholar Street, University Park, CA 94108",
      program: "Bachelor of Science in Biology",
      admissionYear: "2021",
      graduationYear: "2025",
      status: "On Leave",
      gpa: "3.7",
      advisor: "Dr. Emily Chen",
      emergencyContact: "Maria Garcia (Mother) - +1 (555) 654-3210",
      profilePicture: ""
    },
    {
      id: "ST12349",
      firstName: "James",
      lastName: "Brown",
      email: "james.brown@university.edu",
      phone: "+1 (555) 567-8901",
      dateOfBirth: "2000-07-17",
      address: "567 Academic Drive, College Heights, CA 94109",
      program: "Bachelor of Business Administration",
      admissionYear: "2022",
      graduationYear: "2026",
      status: "Probation",
      gpa: "2.3",
      advisor: "Dr. Robert Johnson",
      emergencyContact: "Patricia Brown (Mother) - +1 (555) 543-2109",
      profilePicture: ""
    }
  ];
  
  const selectedStudent = id ? students.find(student => student.id === id) : null;
  
  // Filter students based on search query and active filter
  const filterStudents = () => {
    let result = students;
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(student => 
        student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (activeFilter !== 'all') {
      result = result.filter(student => 
        student.status.toLowerCase() === activeFilter.toLowerCase()
      );
    }
    
    return result;
  };
  
  const filteredStudents = filterStudents();

  const handleExportData = () => {
    toast({
      title: "Data Exported",
      description: "Student data has been exported successfully.",
    });
  };
  
  const handleContactStudent = (student) => {
    toast({
      title: "Email Sent",
      description: `An email has been sent to ${student.firstName} ${student.lastName}.`,
    });
  };

  const userRole = user?.role || 'faculty';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {selectedStudent ? "Student Profile" : "Student Directory"}
        </h1>
        <div className="flex gap-2">
          {selectedStudent ? (
            <Button variant="outline" asChild>
              <Link to={`/${userRole}/students`} className="flex items-center">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Directory
              </Link>
            </Button>
          ) : (
            <div className="flex space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem 
                      onClick={() => setActiveFilter('all')}
                      className={activeFilter === 'all' ? "bg-muted" : ""}
                    >
                      All Students
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => setActiveFilter('active')}
                      className={activeFilter === 'active' ? "bg-muted" : ""}
                    >
                      Active
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => setActiveFilter('on leave')}
                      className={activeFilter === 'on leave' ? "bg-muted" : ""}
                    >
                      On Leave
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => setActiveFilter('probation')}
                      className={activeFilter === 'probation' ? "bg-muted" : ""}
                    >
                      Probation
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" onClick={handleExportData}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {!selectedStudent ? (
        <>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students by name or ID..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={student.profilePicture || "/placeholder.svg"} alt={student.firstName} />
                      <AvatarFallback>{student.firstName.charAt(0)}{student.lastName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{student.firstName} {student.lastName}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ID:</span>
                      <span>{student.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Program:</span>
                      <span className="text-right">{student.program.split(' ').slice(0, 2).join(' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GPA:</span>
                      <span>{student.gpa}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className={
                        student.status === 'Active' ? 'text-green-600' : 
                        student.status === 'On Leave' ? 'text-yellow-600' : 
                        'text-red-600'
                      }>{student.status}</span>
                    </div>
                    <div className="pt-2 flex space-x-2">
                      <Button asChild className="w-full">
                        <Link to={`/${userRole}/student/${student.id}`}>View Profile</Link>
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleContactStudent(student)}>
                        <User className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredStudents.length === 0 && (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <User className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No students found</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </>
      ) : (
        <StudentProfileEditable student={selectedStudent} isEditable={userRole === 'admin' || userRole === 'faculty'} />
      )}
    </div>
  );
};

export default StudentProfileView;
