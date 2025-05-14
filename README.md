# EduPortal - Education Management System

EduPortal is a comprehensive education management system designed to facilitate interactions between students, faculty, and administrators in educational institutions.

## Features

- **Role-based Access Control**: Separate dashboards and functionalities for students, faculty, and administrators
- **Course Management**: View and manage courses, materials, and schedules
- **Attendance Tracking**: Record and monitor student attendance
- **Assessment Management**: Create, assign, and grade assessments
- **Leave Request System**: Submit and process leave requests
- **Homework Management**: Assign, submit, and grade homework
- **User Profiles**: Manage personal information and settings

## Demo Credentials

You can access the system with the following demo accounts:

| Role | Email | Password |
|------|-------|----------|
| Student | student@example.com | password |
| Faculty | faculty@example.com | password |
| Admin | admin@example.com | password |

## Technologies Used

- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- shadcn/ui component library
- Recharts for data visualization
- React Query for data fetching
- Vite as the build tool

## Getting Started

### Prerequisites

- Node.js & npm

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd eduportal

# Install dependencies
npm i

# Start the development server
npm run dev
```

## Project Structure

- `/src`: Source code
  - `/components`: Reusable UI components
    - `/layout`: Layout components like navbar and sidebar
    - `/ui`: Basic UI components from shadcn/ui
  - `/contexts`: React context providers
  - `/data`: JSON data files for the mock backend
  - `/hooks`: Custom React hooks
  - `/lib`: Utility functions and libraries
  - `/pages`: Page components organized by user role
    - `/auth`: Authentication pages (sign in, sign up)
    - `/student`: Student dashboard and related pages
    - `/faculty`: Faculty dashboard and related pages
    - `/admin`: Admin dashboard and related pages
  - `/services`: Services for data fetching and business logic


## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [React Router](https://reactrouter.com/) for the routing solution
- [Recharts](https://recharts.org/) for the charting library
- [Lucide Icons](https://lucide.dev/) for the icons
- [Lovable](https://lovable.dev/) for the development environment

