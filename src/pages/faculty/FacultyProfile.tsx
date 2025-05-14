import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileUploadField } from "@/components/forms/FileUploadField";
import { toast } from "@/hooks/use-toast";
import { User, Mail, Phone, MapPin, Building, GraduationCap, Calendar, Book, Award, BookOpen } from 'lucide-react';

export const FacultyProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [faculty, setFaculty] = useState({
    id: "FAC12345",
    firstName: "Sarah",
    lastName: "Miller",
    email: "sarah.miller@university.edu",
    phone: "+1 (555) 987-6543",
    department: "Computer Science",
    designation: "Associate Professor",
    joinDate: "2018-08-15",
    officeHours: "Mon, Wed 2-4 PM",
    officeLocation: "Science Building, Room 305",
    research: "Artificial Intelligence, Machine Learning, Natural Language Processing",
    education: [
      { degree: "Ph.D. Computer Science", institution: "Stanford University", year: "2015" },
      { degree: "M.S. Computer Science", institution: "MIT", year: "2010" },
      { degree: "B.S. Computer Science", institution: "University of California, Berkeley", year: "2008" }
    ],
    publications: [
      { title: "Advanced Machine Learning Algorithms for Education", journal: "Journal of AI in Education", year: "2023" },
      { title: "Natural Language Processing in Classroom Settings", journal: "Educational Technology Review", year: "2022" }
    ],
    coursesTeaching: [
      { code: "CS101", name: "Introduction to Computer Science" },
      { code: "CS301", name: "Artificial Intelligence Fundamentals" },
      { code: "CS405", name: "Advanced Machine Learning" }
    ],
    profilePicture: ""
  });

  const handleSavePersonal = () => {
    toast({
      title: "Profile Updated",
      description: "Your personal information has been updated successfully.",
    });
  };

  const handleSavePassword = () => {
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
  };

  const handleProfileImageChange = (file: File | null) => {
    setProfileImage(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFaculty(prev => ({
        ...prev,
        profilePicture: imageUrl
      }));
      toast({
        title: "Profile Picture Selected",
        description: "Click Save to update your profile picture.",
      });
    }
  };

  const handleSaveProfileImage = () => {
    if (profileImage) {
      toast({
        title: "Profile Picture Updated",
        description: "Your profile picture has been updated successfully.",
      });
      // TODO: You can upload `profileImage` to the backend here
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Faculty Profile</h1>
      <p className="text-muted-foreground">View and manage your professional information.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your professional information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={faculty.profilePicture || "/placeholder.svg"} alt={faculty.firstName} />
              <AvatarFallback className="text-2xl">
                {faculty.firstName.charAt(0)}{faculty.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <h3 className="text-xl font-medium">{faculty.firstName} {faculty.lastName}</h3>
            <p className="text-sm text-muted-foreground mb-2">{faculty.designation}</p>
            <p className="text-sm text-muted-foreground mb-4">{faculty.department} Department</p>

            <div className="w-full space-y-4 text-sm">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>Faculty ID: {faculty.id}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>{faculty.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>{faculty.phone}</span>
              </div>
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-2" />
                <span>{faculty.officeLocation}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Office Hours: {faculty.officeHours}</span>
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-2" />
                <span>Joined: {new Date(faculty.joinDate).toLocaleDateString()}</span>
              </div>
            </div>

            <FileUploadField
              id="profile-image"
              label=""
              value={profileImage}
              onChange={handleProfileImageChange}
              accept="image/*"
            />

            <Button className="w-full mt-4" disabled={!profileImage} onClick={handleSaveProfileImage}>
              Update Profile Picture
            </Button>
          </CardContent>
        </Card>

        {/* Tabs Card */}
        <Card className="col-span-1 md:col-span-2">
          <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <CardHeader>
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="teaching">Teaching</TabsTrigger>
                <TabsTrigger value="research">Research</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              {/* Personal Tab */}
              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue={faculty.firstName} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue={faculty.lastName} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={faculty.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue={faculty.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" defaultValue={faculty.department} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input id="designation" defaultValue={faculty.designation} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="officeLocation">Office Location</Label>
                    <Input id="officeLocation" defaultValue={faculty.officeLocation} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="officeHours">Office Hours</Label>
                    <Input id="officeHours" defaultValue={faculty.officeHours} />
                  </div>
                </div>
                <Button onClick={handleSavePersonal} className="mt-4">Save Changes</Button>
              </TabsContent>

              {/* Teaching Tab */}
              <TabsContent value="teaching" className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Current Courses</h3>
                  <div className="space-y-2">
                    {faculty.coursesTeaching.map((course, index) => (
                      <div key={index} className="flex items-center p-3 border rounded-md">
                        <BookOpen className="h-5 w-5 mr-2 text-primary" />
                        <div>
                          <p className="font-medium">{course.name}</p>
                          <p className="text-sm text-muted-foreground">{course.code}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Add New Course</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="courseCode">Course Code</Label>
                      <Input id="courseCode" placeholder="CS101" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="courseName">Course Name</Label>
                      <Input id="courseName" placeholder="Introduction to Computer Science" />
                    </div>
                  </div>
                  <Button className="mt-4">Add Course</Button>
                </div>
              </TabsContent>

              {/* Research Tab */}
              <TabsContent value="research" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="researchInterests">Research Interests</Label>
                  <Textarea id="researchInterests" defaultValue={faculty.research} rows={3} />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Education</h3>
                  <div className="space-y-2">
                    {faculty.education.map((edu, index) => (
                      <div key={index} className="flex items-center p-3 border rounded-md">
                        <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                        <div>
                          <p className="font-medium">{edu.degree}</p>
                          <p className="text-sm text-muted-foreground">{edu.institution}, {edu.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Publications</h3>
                  <div className="space-y-2">
                    {faculty.publications.map((pub, index) => (
                      <div key={index} className="flex items-center p-3 border rounded-md">
                        <Book className="h-5 w-5 mr-2 text-primary" />
                        <div>
                          <p className="font-medium">{pub.title}</p>
                          <p className="text-sm text-muted-foreground">{pub.journal}, {pub.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button onClick={handleSavePassword} className="mt-4">Update Password</Button>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default FacultyProfile;
