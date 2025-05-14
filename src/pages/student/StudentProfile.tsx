import React, { useState } from 'react';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import {
  Avatar, AvatarFallback, AvatarImage
} from "@/components/ui/avatar";
import { FileUploadField } from "@/components/forms/FileUploadField";
import { toast } from "@/hooks/use-toast";
import {
  User, Mail, Phone, MapPin, Building, GraduationCap, Shield
} from 'lucide-react';

export const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const student = {
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
  };

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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      toast({
        title: "Profile Picture Selected",
        description: "Click Save to update your profile picture.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Profile</h1>
      <p className="text-muted-foreground">View and manage your personal information.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage
                src={imagePreview || student.profilePicture || "/placeholder.svg"}
                alt={student.firstName}
              />
              <AvatarFallback className="text-2xl">
                {student.firstName.charAt(0)}{student.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <h3 className="text-xl font-medium">{student.firstName} {student.lastName}</h3>
            <p className="text-sm text-muted-foreground mb-4">{student.program}</p>

            <div className="w-full space-y-4 text-sm">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>Student ID: {student.id}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>{student.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>{student.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{student.address}</span>
              </div>
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-2" />
                <span>Campus: University Main Campus</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                <span>Status: {student.status}</span>
              </div>
            </div>

            <FileUploadField
              id="profile-image"
              label=""
              value={profileImage}
              onChange={handleProfileImageChange}
              accept="image/*"
            />

            <Button className="w-full mt-4" disabled={!profileImage}>
              Update Profile Picture
            </Button>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Card className="col-span-1 md:col-span-2">
          <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab}>
            <CardHeader>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="academic">Academic Info</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              {/* Personal Info */}
              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue={student.firstName} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue={student.lastName} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={student.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue={student.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" defaultValue={student.dateOfBirth} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue={student.address} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="emergency">Emergency Contact</Label>
                    <Input id="emergency" defaultValue={student.emergencyContact} />
                  </div>
                </div>
                <Button onClick={handleSavePersonal} className="mt-4">Save Changes</Button>
              </TabsContent>

              {/* Academic Info */}
              <TabsContent value="academic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input id="studentId" defaultValue={student.id} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="program">Program</Label>
                    <Input id="program" defaultValue={student.program} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admissionYear">Admission Year</Label>
                    <Input id="admissionYear" defaultValue={student.admissionYear} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expectedGraduation">Expected Graduation</Label>
                    <Input id="expectedGraduation" defaultValue={student.graduationYear} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gpa">Current GPA</Label>
                    <Input id="gpa" defaultValue={student.gpa} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="advisor">Academic Advisor</Label>
                    <Input id="advisor" defaultValue={student.advisor} readOnly />
                  </div>
                </div>
                <div className="flex items-center p-4 bg-muted/50 rounded-lg mt-4">
                  <GraduationCap className="h-6 w-6 mr-3 text-primary" />
                  <div>
                    <h4 className="text-sm font-medium">Academic Standing</h4>
                    <p className="text-xs text-muted-foreground">You are currently in good academic standing.</p>
                  </div>
                </div>
              </TabsContent>

              {/* Security */}
              <TabsContent value="security" className="space-y-4">
                <div className="space-y-4">
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

export default StudentProfile;
