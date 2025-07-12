
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { loginSuccess } from '@/store/slices/authSlice';
import { toast } from '@/components/ui/use-toast';
import Navbar from '@/components/Layout/Navbar';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'password123') {
        dispatch(loginSuccess({
          id: 1,
          username: 'admin',
          email: 'admin@sherpa.ai',
          role: 'Administrator',
        }));
        
        toast({
          title: "Login successful!",
          description: "Welcome back to SHERPA.",
        });
        
        navigate('/dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials. Use admin/password123",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Login - SHERPA AI Vulnerability Management</title>
        <meta name="description" content="Access your SHERPA AI vulnerability management dashboard. Secure login for cybersecurity professionals." />
      </Helmet>

      <div className="min-h-screen gradient-bg">
        <Navbar />
        
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="glass-effect border-0">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Shield className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Welcome Back</CardTitle>
                  <CardDescription>
                    Sign in to your SHERPA account
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium mb-2">
                        Username
                      </label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        value={credentials.username}
                        onChange={(e) => setCredentials(prev => ({
                          ...prev,
                          username: e.target.value
                        }))}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={credentials.password}
                          onChange={(e) => setCredentials(prev => ({
                            ...prev,
                            password: e.target.value
                          }))}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </form>
                  
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-center text-muted-foreground">
                      Demo Credentials:
                    </p>
                    <p className="text-sm text-center font-mono">
                      Username: <strong>admin</strong>
                    </p>
                    <p className="text-sm text-center font-mono">
                      Password: <strong>password123</strong>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
