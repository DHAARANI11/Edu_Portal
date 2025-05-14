
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Layout components
import { Layout } from "@/components/layout/Layout";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

// Public pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import NotFound from "@/pages/NotFound";

// Student pages
import StudentDashboard from "@/pages/student/StudentDashboard";
import StudentCourses from "@/pages/student/StudentCourses";
import StudentAssessments from "@/pages/student/StudentAssessments";
import StudentAttendance from "@/pages/student/StudentAttendance";
import StudentLeaves from "@/pages/student/StudentLeaves";
import StudentHomework from "@/pages/student/StudentHomework";
import StudentMaterials from "@/pages/student/StudentMaterials";
import StudentProfile from "@/pages/student/StudentProfile";

// Faculty pages
import FacultyDashboard from "@/pages/faculty/FacultyDashboard";
import FacultyClasses from "@/pages/faculty/FacultyClasses";
import FacultyAttendance from "@/pages/faculty/FacultyAttendance";
import FacultyAssessments from "@/pages/faculty/FacultyAssessments";
import FacultySubmissions from "@/pages/faculty/FacultySubmissions";
import FacultyProfile from "@/pages/faculty/FacultyProfile";
import StudentProfileView from "@/pages/faculty/StudentProfileView";

// Admin pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminStudents from "@/pages/admin/AdminStudents";
import AdminFaculty from "@/pages/admin/AdminFaculty";
import AdminCourses from "@/pages/admin/AdminCourses";
import AdminProfile from "@/pages/admin/AdminProfile";

// Icons for navigation
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Calendar,
  Clock,
  Upload,
  FileUp,
  User,
  Users,
  GraduationCap,
  School
} from "lucide-react";

const queryClient = new QueryClient();

const App = () => {
  // Navigation items for each role
  const studentNavItems = [
    { label: "Dashboard", href: "/student", icon: <LayoutDashboard /> },
    { label: "Courses", href: "/student/courses", icon: <BookOpen /> },
    { label: "Assessments", href: "/student/assessments", icon: <FileText /> },
    { label: "Attendance", href: "/student/attendance", icon: <Calendar /> },
    { label: "Leave Requests", href: "/student/leaves", icon: <Clock /> },
    { label: "Homework", href: "/student/homework", icon: <Upload /> },
    { label: "Learning Materials", href: "/student/materials", icon: <FileUp /> },
    { label: "Profile", href: "/student/profile", icon: <User /> }
  ];

  const facultyNavItems = [
    { label: "Dashboard", href: "/faculty", icon: <LayoutDashboard /> },
    { label: "Classes", href: "/faculty/classes", icon: <BookOpen /> },
    { label: "Attendance", href: "/faculty/attendance", icon: <Calendar /> },
    { label: "Assessments", href: "/faculty/assessments", icon: <FileText /> },
    { label: "Submissions", href: "/faculty/submissions", icon: <Upload /> },
    { label: "Students", href: "/faculty/students", icon: <GraduationCap /> },
    { label: "Profile", href: "/faculty/profile", icon: <User /> }
  ];

  const adminNavItems = [
    { label: "Dashboard", href: "/admin", icon: <LayoutDashboard /> },
    { label: "Students", href: "/admin/students", icon: <GraduationCap /> },
    { label: "Faculty", href: "/admin/faculty", icon: <Users /> },
    { label: "Courses", href: "/admin/courses", icon: <School /> },
    { label: "Profile", href: "/admin/profile", icon: <User /> }
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Route>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Student Routes */}
                <Route 
                  element={<DashboardLayout role="student" navItems={studentNavItems} />}
                >
                  <Route path="/student" element={<StudentDashboard />} />
                  <Route path="/student/courses" element={<StudentCourses />} />
                  <Route path="/student/assessments" element={<StudentAssessments />} />
                  <Route path="/student/attendance" element={<StudentAttendance />} />
                  <Route path="/student/leaves" element={<StudentLeaves />} />
                  <Route path="/student/homework" element={<StudentHomework />} />
                  <Route path="/student/materials" element={<StudentMaterials />} />
                  <Route path="/student/profile" element={<StudentProfile />} />
                </Route>

                {/* Faculty Routes */}
                <Route 
                  element={<DashboardLayout role="faculty" navItems={facultyNavItems} />}
                >
                  <Route path="/faculty" element={<FacultyDashboard />} />
                  <Route path="/faculty/classes" element={<FacultyClasses />} />
                  <Route path="/faculty/attendance" element={<FacultyAttendance />} />
                  <Route path="/faculty/assessments" element={<FacultyAssessments />} />
                  <Route path="/faculty/submissions" element={<FacultySubmissions />} />
                  <Route path="/faculty/profile" element={<FacultyProfile />} />
                  <Route path="/faculty/students" element={<StudentProfileView />} />
                  <Route path="/faculty/student/:id" element={<StudentProfileView />} />
                </Route>

                {/* Admin Routes */}
                <Route 
                  element={<DashboardLayout role="admin" navItems={adminNavItems} />}
                >
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/students" element={<AdminStudents />} />
                  <Route path="/admin/faculty" element={<AdminFaculty />} />
                  <Route path="/admin/courses" element={<AdminCourses />} />
                  <Route path="/admin/profile" element={<AdminProfile />} />
                  <Route path="/admin/student/:id" element={<StudentProfileView />} />
                  <Route path="/admin/students" element={<StudentProfileView />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
