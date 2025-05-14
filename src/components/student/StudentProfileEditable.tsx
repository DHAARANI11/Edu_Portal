
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { User, Mail, Phone, MapPin, Building, GraduationCap, Calendar, Shield } from 'lucide-react';

interface StudentData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  program: string;
  admissionYear: string;
  graduationYear: string;
  status: string;
  gpa: string;
  advisor: string;
  emergencyContact: string;
  profilePicture: string;
}

interface StudentProfileEditableProps {
  student: StudentData;
  isEditable?: boolean;
}

export const StudentProfileEditable: React.FC<StudentProfileEditableProps> = ({ 
  student,
  isEditable = false
}) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [studentData, setStudentData] = useState<StudentData>(student);
  
  const handleSavePersonal = () => {
    // Here you would implement the API call to save changes
    toast({
      title: "Profile Updated",
      description: "Student information has been updated successfully.",
    });
  };
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof StudentData
  ) => {
    setStudentData({
      ...studentData,
      [field]: e.target.value
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Student Profile</CardTitle>
            <CardDescription>Student information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={studentData.profilePicture || "/placeholder.svg"} alt={studentData.firstName} />
              <AvatarFallback className="text-2xl">{studentData.firstName.charAt(0)}{studentData.lastName.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <h3 className="text-xl font-medium">{studentData.firstName} {studentData.lastName}</h3>
            <p className="text-sm text-muted-foreground mb-4">{studentData.program}</p>
            
            <div className="w-full space-y-4 text-sm">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>Student ID: {studentData.id}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>{studentData.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>{studentData.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{studentData.address}</span>
              </div>
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-2" />
                <span>Campus: University Main Campus</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                <span>Status: {studentData.status}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="academic">Academic Info</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={studentData.firstName} 
                    onChange={(e) => handleInputChange(e, 'firstName')} 
                    readOnly={!isEditable}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={studentData.lastName} 
                    onChange={(e) => handleInputChange(e, 'lastName')} 
                    readOnly={!isEditable}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={studentData.email} 
                    onChange={(e) => handleInputChange(e, 'email')} 
                    readOnly={!isEditable}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    value={studentData.phone}
                    onChange={(e) => handleInputChange(e, 'phone')} 
                    readOnly={!isEditable}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input 
                    id="dob" 
                    type="date" 
                    value={studentData.dateOfBirth} 
                    onChange={(e) => handleInputChange(e, 'dateOfBirth')} 
                    readOnly={!isEditable}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    value={studentData.address} 
                    onChange={(e) => handleInputChange(e, 'address')} 
                    readOnly={!isEditable}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="emergency">Emergency Contact</Label>
                  <Input 
                    id="emergency" 
                    value={studentData.emergencyContact} 
                    onChange={(e) => handleInputChange(e, 'emergencyContact')} 
                    readOnly={!isEditable}
                  />
                </div>
              </div>
              {isEditable && (
                <Button onClick={handleSavePersonal} className="mt-4">Save Changes</Button>
              )}
            </TabsContent>
            
            <TabsContent value="academic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input 
                    id="studentId" 
                    value={studentData.id} 
                    readOnly 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="program">Program</Label>
                  <Input 
                    id="program" 
                    value={studentData.program} 
                    onChange={(e) => handleInputChange(e, 'program')} 
                    readOnly={!isEditable}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admissionYear">Admission Year</Label>
                  <Input 
                    id="admissionYear" 
                    value={studentData.admissionYear} 
                    onChange={(e) => handleInputChange(e, 'admissionYear')} 
                    readOnly={!isEditable}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedGraduation">Expected Graduation</Label>
                  <Input 
                    id="expectedGraduation" 
                    value={studentData.graduationYear} 
                    onChange={(e) => handleInputChange(e, 'graduationYear')} 
                    readOnly={!isEditable}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gpa">Current GPA</Label>
                  <Input 
                    id="gpa" 
                    value={studentData.gpa} 
                    onChange={(e) => handleInputChange(e, 'gpa')} 
                    readOnly={!isEditable}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="advisor">Academic Advisor</Label>
                  <Input 
                    id="advisor" 
                    value={studentData.advisor} 
                    onChange={(e) => handleInputChange(e, 'advisor')} 
                    readOnly={!isEditable}
                  />
                </div>
              </div>
              <div className="flex items-center p-4 bg-muted/50 rounded-lg mt-4">
                <GraduationCap className="h-6 w-6 mr-3 text-primary" />
                <div>
                  <h4 className="text-sm font-medium">Academic Standing</h4>
                  <p className="text-xs text-muted-foreground">Student is currently in good academic standing.</p>
                </div>
              </div>
              {isEditable && (
                <Button onClick={handleSavePersonal} className="mt-4">Save Changes</Button>
              )}
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4">
              {isEditable ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="resetPassword">Reset Student Password</Label>
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => toast({
                          title: "Password Reset",
                          description: "Password reset link has been sent to student's email."
                        })}
                      >
                        Send Reset Link
                      </Button>
                      <Button variant="outline"
                        onClick={() => toast({
                          title: "Password Generated",
                          description: "Temporary password has been generated and sent to student's email."
                        })}
                      >
                        Generate Temporary Password
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    <Label htmlFor="accountStatus">Account Status</Label>
                    <div className="flex space-x-2">
                      <Button 
                        variant={studentData.status === 'Active' ? 'default' : 'outline'}
                        onClick={() => {
                          setStudentData({...studentData, status: 'Active'});
                          toast({
                            title: "Account Activated",
                            description: "Student account has been activated."
                          });
                        }}
                      >
                        Activate
                      </Button>
                      <Button 
                        variant={studentData.status === 'Suspended' ? 'default' : 'outline'}
                        onClick={() => {
                          setStudentData({...studentData, status: 'Suspended'});
                          toast({
                            title: "Account Suspended",
                            description: "Student account has been suspended."
                          });
                        }}
                      >
                        Suspend
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center p-8">
                  <p className="text-muted-foreground">Security settings can only be managed by administrators.</p>
                </div>
              )}
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfileEditable;
