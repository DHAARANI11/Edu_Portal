
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, AlertCircle } from 'lucide-react';

const signInFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type SignInFormValues = z.infer<typeof signInFormSchema>;

export const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState<'student' | 'faculty' | 'admin'>('student');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await login(data.email, data.password);

      // Determine where to redirect based on the role
      if (data.email === 'student@example.com') {
        navigate('/student');
      } else if (data.email === 'faculty@example.com') {
        navigate('/faculty');
      } else if (data.email === 'admin@example.com') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = (value: string) => {
    setRole(value as 'student' | 'faculty' | 'admin');
    
    // Pre-fill email based on role for demo purposes
    switch(value) {
      case 'student':
        form.setValue('email', 'student@example.com');
        break;
      case 'faculty':
        form.setValue('email', 'faculty@example.com');
        break;
      case 'admin':
        form.setValue('email', 'admin@example.com');
        break;
      default:
        break;
    }
    form.setValue('password', 'password');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-muted/30">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-md">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Tabs defaultValue="student" onValueChange={handleRoleChange}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="faculty">Faculty</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
              <TabsContent value="student">
                <p className="text-sm text-muted-foreground mb-4">
                  Access your courses, assignments, and academic progress.
                </p>
              </TabsContent>
              <TabsContent value="faculty">
                <p className="text-sm text-muted-foreground mb-4">
                  Manage your classes, assessments, and student records.
                </p>
              </TabsContent>
              <TabsContent value="admin">
                <p className="text-sm text-muted-foreground mb-4">
                  Oversee all student and faculty members data and institution settings.
                </p>
              </TabsContent>
            </Tabs>

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
            
            {role === 'admin' && (
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  First time? <Link to="/signup" className="text-primary hover:underline">Create an admin account</Link>
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center pt-0">
            <div className="text-xs text-muted-foreground text-center">
              <p className="mb-1">Demo credentials are pre-filled for {role}.</p>
              <p>Just click "Sign In" to explore.</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
