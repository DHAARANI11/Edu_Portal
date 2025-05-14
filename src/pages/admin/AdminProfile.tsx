import React, { useEffect, useState } from 'react';
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
import { toast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import {
  User, Mail, Phone, Building, Shield, Clock, Settings
} from 'lucide-react';

export const AdminProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [admin, setAdmin] = useState({
    id: "ADM12345",
    firstName: "James",
    lastName: "Wilson",
    email: "james.wilson@university.edu",
    phone: "+1 (555) 765-4321",
    role: "System Administrator",
    department: "IT Administration",
    joinDate: "2020-03-10",
    officeLocation: "Admin Building, Room 101",
    profilePicture: "",
    permissions: [
      { name: "User Management", enabled: true },
      { name: "Course Management", enabled: true },
      { name: "Faculty Management", enabled: true },
      { name: "Student Management", enabled: true },
      { name: "Financial Records", enabled: false },
      { name: "System Settings", enabled: true },
    ],
    recentActivity: [
      { action: "User account updated", timestamp: "2025-05-11T10:30:00Z" },
      { action: "New course added", timestamp: "2025-05-10T14:15:00Z" },
      { action: "System backup performed", timestamp: "2025-05-09T08:45:00Z" },
      { action: "Faculty record updated", timestamp: "2025-05-08T11:20:00Z" }
    ]
  });

  // Load image from localStorage if exists
  useEffect(() => {
    const storedImage = localStorage.getItem("adminProfilePic");
    if (storedImage) {
      setAdmin((prev) => ({ ...prev, profilePicture: storedImage }));
    }
  }, []);

  const handleProfileImageChange = (file: File | null) => {
    setProfileImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      toast({
        title: "Profile Picture Selected",
        description: "Click 'Update Profile Picture' to apply.",
      });
    }
  };

  const handleSaveProfileImage = () => {
    if (previewUrl) {
      setAdmin((prev) => ({
        ...prev,
        profilePicture: previewUrl,
      }));
      localStorage.setItem("adminProfilePic", previewUrl);
      toast({
        title: "Profile Picture Updated",
        description: "Your profile picture has been updated.",
      });
      setProfileImage(null);
      setPreviewUrl(null);
    }
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

  const handleSavePermissions = () => {
    toast({
      title: "Permissions Updated",
      description: "Your access permissions have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Profile</h1>
      <p className="text-muted-foreground">View and manage your profile information.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your administrative information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={previewUrl || admin.profilePicture || "/placeholder.svg"} alt={admin.firstName} />
              <AvatarFallback className="text-2xl">
                {admin.firstName.charAt(0)}{admin.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <h3 className="text-xl font-medium">{admin.firstName} {admin.lastName}</h3>
            <p className="text-sm text-muted-foreground mb-2">{admin.role}</p>
            <p className="text-sm text-muted-foreground mb-4">{admin.department}</p>

            <div className="w-full space-y-4 text-sm">
              <div className="flex items-center"><User className="h-4 w-4 mr-2" />Admin ID: {admin.id}</div>
              <div className="flex items-center"><Mail className="h-4 w-4 mr-2" />{admin.email}</div>
              <div className="flex items-center"><Phone className="h-4 w-4 mr-2" />{admin.phone}</div>
              <div className="flex items-center"><Building className="h-4 w-4 mr-2" />{admin.officeLocation}</div>
              <div className="flex items-center"><Shield className="h-4 w-4 mr-2" />Admin Access</div>
            </div>

            <div className="w-full mt-6 space-y-2">
              <Label htmlFor="profile-image">Choose Profile Picture</Label>
              <Input
                id="profile-image"
                type="file"
                accept="image/*"
                onChange={(e) => handleProfileImageChange(e.target.files?.[0] || null)}
              />
              <Button className="w-full mt-2" onClick={handleSaveProfileImage} disabled={!previewUrl}>
                Update Profile Picture
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Manage personal details, security, and more.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 w-full mb-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="permissions">Permissions</TabsTrigger>
              </TabsList>

              {/* Personal Tab */}
              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue={admin.firstName} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue={admin.lastName} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={admin.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue={admin.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue={admin.role} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" defaultValue={admin.department} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="officeLocation">Office Location</Label>
                    <Input id="officeLocation" defaultValue={admin.officeLocation} />
                  </div>
                </div>
                <Button onClick={handleSavePersonal} className="mt-4">Save Changes</Button>
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
                <div className="space-y-4 mt-6">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <div className="flex items-center space-x-2">
                    <Switch id="2fa" />
                    <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Enhance your account security by enabling two-factor authentication.</p>
                </div>
                <Button onClick={handleSavePassword} className="mt-4">Update Security Settings</Button>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-4">
                <h3 className="text-lg font-medium mb-2">Recent Activity</h3>
                <div className="space-y-4">
                  {admin.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start justify-between p-3 border rounded-md">
                      <p className="font-medium">{activity.action}</p>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-4">View All Activity</Button>
              </TabsContent>

              {/* Permissions Tab */}
              <TabsContent value="permissions" className="space-y-4">
                <h3 className="text-lg font-medium mb-2">Access Permissions</h3>
                <div className="space-y-4">
                  {admin.permissions.map((permission, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <Settings className="h-5 w-5 mr-2 text-primary" />
                        <span>{permission.name}</span>
                      </div>
                      <Switch id={`permission-${index}`} checked={permission.enabled} />
                    </div>
                  ))}
                </div>
                <Button onClick={handleSavePermissions} className="mt-4">Update Permissions</Button>
              </TabsContent>

            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminProfile;
