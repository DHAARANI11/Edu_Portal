
export interface Course {
  id: string;
  name: string;
  code: string;
  instructor: string;
  schedule: string;
  credits: number;
}

export interface Assessment {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  type: 'quiz' | 'midterm' | 'final' | 'assignment';
  dueDate: string;
  status: 'upcoming' | 'completed';
  score?: number;
  maxScore: number;
  portions?: string;
}

export interface Attendance {
  courseId: string;
  courseName: string;
  date: string;
  status: 'present' | 'absent' | 'late';
}

export interface LeaveRequest {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submitDate: string;
}

export interface Homework {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  dueDate: string;
  status: 'completed' | 'pending' | 'late';
  submissionDate?: string;
  grade?: string;
  feedback?: string;
  file?: string;
}

export interface LearningMaterial {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  type: 'pdf' | 'video' | 'slide' | 'link';
  uploadDate: string;
  url: string;
}

export interface StudentProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  department: string;
  year: number;
  profileImage: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  github?: string;
  linkedin?: string;
}

export interface FacultyProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  facultyId: string;
  department: string;
  position: string;
  profileImage: string;
  phone?: string;
  address?: string;
  specialization?: string;
  github?: string;
  linkedin?: string;
}

// Mock data for student
export const studentCourses: Course[] = [
  {
    id: '1',
    name: 'Introduction to Computer Science',
    code: 'CS101',
    instructor: 'Dr. Jane Smith',
    schedule: 'Mon, Wed 10:00 - 11:30 AM',
    credits: 3
  },
  {
    id: '2',
    name: 'Calculus I',
    code: 'MATH201',
    instructor: 'Prof. Alan Johnson',
    schedule: 'Tue, Thu 2:00 - 3:30 PM',
    credits: 4
  },
  {
    id: '3',
    name: 'Physics: Mechanics',
    code: 'PHYS101',
    instructor: 'Dr. Robert Brown',
    schedule: 'Wed, Fri 9:00 - 10:30 AM',
    credits: 4
  },
  {
    id: '4',
    name: 'English Composition',
    code: 'ENG105',
    instructor: 'Prof. Emily Davis',
    schedule: 'Mon, Fri 1:00 - 2:30 PM',
    credits: 3
  }
];

export const studentAssessments: Assessment[] = [
  {
    id: '1',
    courseId: '1',
    courseName: 'Introduction to Computer Science',
    title: 'Midterm Examination',
    type: 'midterm',
    dueDate: '2025-06-15T14:00:00',
    status: 'upcoming',
    maxScore: 100,
    portions: 'Chapters 1-5: Data Structures, Algorithms, Programming Fundamentals'
  },
  {
    id: '2',
    courseId: '2',
    courseName: 'Calculus I',
    title: 'Assignment #3: Integration',
    type: 'assignment',
    dueDate: '2025-06-10T23:59:00',
    status: 'upcoming',
    maxScore: 50,
    portions: 'Integration techniques, U-substitution, Integration by parts'
  },
  {
    id: '3',
    courseId: '3',
    courseName: 'Physics: Mechanics',
    title: 'Quiz on Newton\'s Laws',
    type: 'quiz',
    dueDate: '2025-05-30T10:15:00',
    status: 'completed',
    score: 92,
    maxScore: 100
  },
  {
    id: '4',
    courseId: '4',
    courseName: 'English Composition',
    title: 'Essay Submission',
    type: 'assignment',
    dueDate: '2025-05-20T23:59:00',
    status: 'completed',
    score: 85,
    maxScore: 100
  }
];

export const studentAttendance: Attendance[] = [
  { courseId: '1', courseName: 'Introduction to Computer Science', date: '2025-05-05', status: 'present' },
  { courseId: '1', courseName: 'Introduction to Computer Science', date: '2025-05-07', status: 'present' },
  { courseId: '1', courseName: 'Introduction to Computer Science', date: '2025-05-12', status: 'present' },
  { courseId: '1', courseName: 'Introduction to Computer Science', date: '2025-05-14', status: 'absent' },
  { courseId: '1', courseName: 'Introduction to Computer Science', date: '2025-05-19', status: 'present' },

  { courseId: '2', courseName: 'Calculus I', date: '2025-05-04', status: 'present' },
  { courseId: '2', courseName: 'Calculus I', date: '2025-05-06', status: 'late' },
  { courseId: '2', courseName: 'Calculus I', date: '2025-05-11', status: 'present' },
  { courseId: '2', courseName: 'Calculus I', date: '2025-05-13', status: 'present' },
  { courseId: '2', courseName: 'Calculus I', date: '2025-05-18', status: 'present' },

  { courseId: '3', courseName: 'Physics: Mechanics', date: '2025-05-05', status: 'present' },
  { courseId: '3', courseName: 'Physics: Mechanics', date: '2025-05-07', status: 'present' },
  { courseId: '3', courseName: 'Physics: Mechanics', date: '2025-05-12', status: 'absent' },
  { courseId: '3', courseName: 'Physics: Mechanics', date: '2025-05-14', status: 'present' },
  { courseId: '3', courseName: 'Physics: Mechanics', date: '2025-05-19', status: 'present' },

  { courseId: '4', courseName: 'English Composition', date: '2025-05-03', status: 'present' },
  { courseId: '4', courseName: 'English Composition', date: '2025-05-07', status: 'present' },
  { courseId: '4', courseName: 'English Composition', date: '2025-05-10', status: 'absent' },
  { courseId: '4', courseName: 'English Composition', date: '2025-05-14', status: 'present' },
  { courseId: '4', courseName: 'English Composition', date: '2025-05-17', status: 'present' }
];

export const studentLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    startDate: '2025-04-05',
    endDate: '2025-04-07',
    reason: 'Family emergency',
    status: 'approved',
    submitDate: '2025-04-01'
  },
  {
    id: '2',
    startDate: '2025-05-15',
    endDate: '2025-05-15',
    reason: 'Medical appointment',
    status: 'approved',
    submitDate: '2025-05-10'
  },
  {
    id: '3',
    startDate: '2025-06-01',
    endDate: '2025-06-03',
    reason: 'Participating in academic conference',
    status: 'pending',
    submitDate: '2025-05-20'
  }
];

export const studentHomework: Homework[] = [
  {
    id: '1',
    courseId: '1',
    courseName: 'Introduction to Computer Science',
    title: 'Programming Assignment #2',
    dueDate: '2025-05-20T23:59:00',
    status: 'completed',
    submissionDate: '2025-05-19T14:30:00',
    grade: 'A',
    feedback: 'Excellent work! Your code is well structured and efficient.'
  },
  {
    id: '2',
    courseId: '2',
    courseName: 'Calculus I',
    title: 'Problem Set #3',
    dueDate: '2025-05-25T23:59:00',
    status: 'pending'
  },
  {
    id: '3',
    courseId: '3',
    courseName: 'Physics: Mechanics',
    title: 'Lab Report',
    dueDate: '2025-05-15T23:59:00',
    status: 'completed',
    submissionDate: '2025-05-15T22:45:00',
    grade: 'B+',
    feedback: 'Good analysis, but some calculations need correction.'
  }
];

export const learningMaterials: LearningMaterial[] = [
  {
    id: '1',
    courseId: '1',
    courseName: 'Introduction to Computer Science',
    title: 'Introduction to Algorithms',
    type: 'pdf',
    uploadDate: '2025-04-10',
    url: '#'
  },
  {
    id: '2',
    courseId: '1',
    courseName: 'Introduction to Computer Science',
    title: 'Data Structures Tutorial',
    type: 'video',
    uploadDate: '2025-04-15',
    url: '#'
  },
  {
    id: '3',
    courseId: '2',
    courseName: 'Calculus I',
    title: 'Limits and Continuity',
    type: 'slide',
    uploadDate: '2025-04-05',
    url: '#'
  },
  {
    id: '4',
    courseId: '3',
    courseName: 'Physics: Mechanics',
    title: 'Newton\'s Laws of Motion',
    type: 'pdf',
    uploadDate: '2025-04-03',
    url: '#'
  }
];

export const studentProfile: StudentProfile = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@university.edu',
  studentId: 'S12345',
  department: 'Computer Science',
  year: 2,
  profileImage: 'https://i.pravatar.cc/300?u=student',
  phone: '(555) 123-4567',
  address: '123 University Ave, College Town, CT 12345',
  dateOfBirth: '2000-06-15'
};

// Mock data for faculty
export const facultyClasses = [
  {
    id: '101',
    name: 'Introduction to Computer Science',
    code: 'CS101',
    schedule: 'Mon, Wed 10:00 - 11:30 AM',
    students: 35,
    room: 'Science Building 301'
  },
  {
    id: '102',
    name: 'Data Structures and Algorithms',
    code: 'CS201',
    schedule: 'Tue, Thu 1:00 - 2:30 PM',
    students: 28,
    room: 'Engineering Hall 105'
  },
  {
    id: '103',
    name: 'Database Systems',
    code: 'CS310',
    schedule: 'Mon, Fri 3:00 - 4:30 PM',
    students: 22,
    room: 'Computer Lab 204'
  }
];

export const facultyStudents = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@university.edu',
    studentId: 'S12345',
    courses: ['CS101', 'CS201'],
    profileImage: 'https://i.pravatar.cc/150?u=s1'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@university.edu',
    studentId: 'S12346',
    courses: ['CS101'],
    profileImage: 'https://i.pravatar.cc/150?u=s2'
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael.j@university.edu',
    studentId: 'S12347',
    courses: ['CS201', 'CS310'],
    profileImage: 'https://i.pravatar.cc/150?u=s3'
  },
  {
    id: '4',
    name: 'Emily Brown',
    email: 'emily.b@university.edu',
    studentId: 'S12348',
    courses: ['CS101', 'CS310'],
    profileImage: 'https://i.pravatar.cc/150?u=s4'
  }
];

export const facultyAssessments = [
  {
    id: '101',
    courseId: '101',
    courseName: 'Introduction to Computer Science',
    title: 'Midterm Examination',
    dueDate: '2025-06-15T14:00:00',
    type: 'midterm',
    maxScore: 100,
    created: '2025-05-01',
    status: 'scheduled'
  },
  {
    id: '102',
    courseId: '102',
    courseName: 'Data Structures and Algorithms',
    title: 'Assignment #3: Trees and Graphs',
    dueDate: '2025-05-25T23:59:00',
    type: 'assignment',
    maxScore: 50,
    created: '2025-05-10',
    status: 'active'
  },
  {
    id: '103',
    courseId: '103',
    courseName: 'Database Systems',
    title: 'Quiz on SQL',
    dueDate: '2025-05-18T15:30:00',
    type: 'quiz',
    maxScore: 20,
    created: '2025-05-05',
    status: 'active'
  }
];

export const studentSubmissions = [
  {
    id: '201',
    studentId: '1',
    studentName: 'John Doe',
    courseId: '101',
    courseName: 'Introduction to Computer Science',
    assignmentTitle: 'Programming Assignment #1',
    submissionDate: '2025-05-05T14:30:00',
    file: 'assignment1_johndoe.zip',
    grade: 'A',
    feedback: 'Excellent work!'
  },
  {
    id: '202',
    studentId: '2',
    studentName: 'Jane Smith',
    courseId: '101',
    courseName: 'Introduction to Computer Science',
    assignmentTitle: 'Programming Assignment #1',
    submissionDate: '2025-05-06T09:15:00',
    file: 'assignment1_janesmith.zip',
    grade: 'B+',
    feedback: 'Good work but could improve code efficiency'
  },
  {
    id: '203',
    studentId: '4',
    studentName: 'Emily Brown',
    courseId: '103',
    courseName: 'Database Systems',
    assignmentTitle: 'ER Diagram Project',
    submissionDate: '2025-05-10T22:45:00',
    file: 'erdiagram_emilybrown.pdf',
    grade: null,
    feedback: null
  }
];

export const facultyProfile: FacultyProfile = {
  id: '1',
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane.smith@university.edu',
  facultyId: 'F54321',
  department: 'Computer Science',
  position: 'Assistant Professor',
  profileImage: 'https://i.pravatar.cc/300?u=faculty',
  phone: '(555) 987-6543',
  address: '456 Faculty Row, College Town, CT 12345',
  specialization: 'Database Systems, Machine Learning',
  github: 'https://github.com/janesmith',
  linkedin: 'https://linkedin.com/in/janesmith'
};

// Mock data for admin
export const allStudents = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@university.edu',
    studentId: 'S12345',
    department: 'Computer Science',
    year: 2,
    courses: ['CS101', 'CS201', 'MATH201', 'PHYS101']
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@university.edu',
    studentId: 'S12346',
    department: 'Biology',
    year: 3,
    courses: ['BIO301', 'CHEM201', 'MATH201']
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.j@university.edu',
    studentId: 'S12347',
    department: 'Computer Science',
    year: 4,
    courses: ['CS310', 'CS405', 'PHYS201']
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Brown',
    email: 'emily.b@university.edu',
    studentId: 'S12348',
    department: 'Mathematics',
    year: 1,
    courses: ['MATH101', 'PHYS101', 'CS101']
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.w@university.edu',
    studentId: 'S12349',
    department: 'Chemistry',
    year: 2,
    courses: ['CHEM201', 'BIO101', 'MATH201']
  }
];

export const allFaculty = [
  {
    id: '1',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@university.edu',
    facultyId: 'F54321',
    department: 'Computer Science',
    position: 'Assistant Professor',
    courses: ['CS101', 'CS201']
  },
  {
    id: '2',
    firstName: 'Robert',
    lastName: 'Brown',
    email: 'robert.brown@university.edu',
    facultyId: 'F54322',
    department: 'Physics',
    position: 'Professor',
    courses: ['PHYS101', 'PHYS201']
  },
  {
    id: '3',
    firstName: 'Alan',
    lastName: 'Johnson',
    email: 'alan.j@university.edu',
    facultyId: 'F54323',
    department: 'Mathematics',
    position: 'Associate Professor',
    courses: ['MATH101', 'MATH201']
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@university.edu',
    facultyId: 'F54324',
    department: 'English',
    position: 'Professor',
    courses: ['ENG101', 'ENG105']
  }
];

export const allCourses = [
  ...studentCourses,
  {
    id: '5',
    name: 'Biology 101',
    code: 'BIO101',
    instructor: 'Dr. Sarah Johnson',
    schedule: 'Tue, Thu 11:00 - 12:30 PM',
    credits: 4
  },
  {
    id: '6',
    name: 'Chemistry 201',
    code: 'CHEM201',
    instructor: 'Prof. Michael Lee',
    schedule: 'Mon, Wed 3:00 - 4:30 PM',
    credits: 4
  },
  {
    id: '7',
    name: 'Advanced Physics',
    code: 'PHYS201',
    instructor: 'Dr. Robert Brown',
    schedule: 'Tue, Thu 9:00 - 10:30 AM',
    credits: 4
  },
  {
    id: '8',
    name: 'Biology 301',
    code: 'BIO301',
    instructor: 'Dr. Sarah Johnson',
    schedule: 'Wed, Fri 1:00 - 2:30 PM',
    credits: 3
  }
];

export const departments = [
  { id: '1', name: 'Computer Science' },
  { id: '2', name: 'Mathematics' },
  { id: '3', name: 'Physics' },
  { id: '4', name: 'Biology' },
  { id: '5', name: 'Chemistry' },
  { id: '6', name: 'English' }
];
