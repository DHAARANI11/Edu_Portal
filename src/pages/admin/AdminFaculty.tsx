
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Search, MoreVertical, Mail, Phone } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const AdminFaculty = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const facultyMembers = [
    { 
      id: 1, 
      firstName: 'John', 
      lastName: 'Smith', 
      email: 'john.smith@university.edu', 
      department: 'Computer Science',
      position: 'Professor',
      phone: '(555) 123-4567',
      courses: 3
    },
    { 
      id: 2, 
      firstName: 'Sarah', 
      lastName: 'Johnson', 
      email: 'sarah.johnson@university.edu', 
      department: 'Mathematics',
      position: 'Associate Professor',
      phone: '(555) 234-5678',
      courses: 2
    },
    { 
      id: 3, 
      firstName: 'Michael', 
      lastName: 'Williams', 
      email: 'michael.williams@university.edu', 
      department: 'Physics',
      position: 'Assistant Professor',
      phone: '(555) 345-6789',
      courses: 4
    },
    { 
      id: 4, 
      firstName: 'Emily', 
      lastName: 'Davis', 
      email: 'emily.davis@university.edu', 
      department: 'English',
      position: 'Professor',
      phone: '(555) 456-7890',
      courses: 3
    },
    { 
      id: 5, 
      firstName: 'Robert', 
      lastName: 'Brown', 
      email: 'robert.brown@university.edu', 
      department: 'Chemistry',
      position: 'Associate Professor',
      phone: '(555) 567-8901',
      courses: 2
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Faculty</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Faculty Member
        </Button>
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
          <Card key={faculty.id}>
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
                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                    <DropdownMenuItem>Assign Courses</DropdownMenuItem>
                    <DropdownMenuItem>View Schedule</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete Account</DropdownMenuItem>
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
                  <div>{faculty.courses}</div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button variant="outline" size="sm">View Profile</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminFaculty;
