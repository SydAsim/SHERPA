import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import {
  Bot,
  Calendar,
  Users,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Layout/Navbar';
import Sidebar from '@/components/Layout/Sidebar';
import AddProjectDialog from '@/components/AddProjectDialog';
import ProjectDetailsDialog from '@/components/ProjectDetailsDialog';

const AIProjectManagement = () => {
  const { projects } = useSelector((state) => state.projects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const aiRecommendations = [
    {
      type: 'Priority',
      message: 'Focus on SQL injection vulnerabilities first - they pose the highest risk',
      confidence: 95,
    },
    {
      type: 'Resource',
      message: 'Assign additional security engineer to Q1 Security Audit project',
      confidence: 87,
    },
    {
      type: 'Timeline',
      message: 'Infrastructure Hardening project may need 2 weeks extension',
      confidence: 78,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500';
      case 'In Progress':
        return 'bg-blue-500';
      case 'Planning':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'default';
      case 'Low':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setIsDetailsOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>AI Project Management - SHERPA AI Vulnerability Management</title>
        <meta name="description" content="Manage security projects with AI-powered insights and recommendations. Streamline vulnerability remediation workflows." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <Sidebar />
        
        <div className="ml-64 pt-16">
          <div className="p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold flex items-center gap-3">
                    <Bot className="h-8 w-8 text-primary" />
                    AI Project Management
                  </h1>
                  <p className="text-muted-foreground">
                    Intelligent project workflows powered by AI insights
                  </p>
                </div>
                <AddProjectDialog />
              </div>

              {/* AI Recommendations */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    AI Recommendations
                  </CardTitle>
                  <CardDescription>
                    Smart insights to optimize your security projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiRecommendations.map((rec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-lg bg-accent/30"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline">{rec.type}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {rec.confidence}% confidence
                            </span>
                          </div>
                          <p className="text-sm">{rec.message}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Project Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { title: 'Active Projects', value: projects.filter(p => p.status !== 'Completed').length, icon: Target, color: 'text-blue-500' },
                  { title: 'Total Vulnerabilities', value: projects.reduce((acc, p) => acc + p.vulnerabilities, 0), icon: AlertCircle, color: 'text-red-500' },
                  { title: 'Completed Projects', value: projects.filter(p => p.status === 'Completed').length, icon: CheckCircle, color: 'text-green-500' },
                  { title: 'Avg. Resolution Time', value: '3.2d', icon: Clock, color: 'text-yellow-500' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          {stat.title}
                        </CardTitle>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Projects List */}
              <Card>
                <CardHeader>
                  <CardTitle>Security Projects</CardTitle>
                  <CardDescription>
                    Manage and track your security remediation projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {projects.map((project) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border rounded-lg p-6 hover:bg-accent/50 transition-colors cursor-pointer"
                        onClick={() => handleViewProject(project)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div
                                className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`}
                              />
                              <h3 className="font-semibold text-lg">{project.name}</h3>
                              <Badge variant={getPriorityColor(project.priority)}>
                                {project.priority}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                Due: {project.dueDate}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Users className="h-4 w-4" />
                                {project.assignees.length} assignees
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <AlertCircle className="h-4 w-4" />
                                {project.vulnerabilities} vulnerabilities
                              </div>
                            </div>

                            <div className="mb-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>{project.progress}%</span>
                              </div>
                              <div className="w-full bg-secondary rounded-full h-2">
                                <div
                                  className="bg-primary h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${project.progress}%` }}
                                />
                              </div>
                            </div>

                            <div className="bg-accent/30 rounded-lg p-3">
                              <div className="flex items-start gap-2">
                                <Bot className="h-4 w-4 text-primary mt-0.5" />
                                <div>
                                  <p className="text-xs font-medium text-primary mb-1">AI Insight</p>
                                  <p className="text-sm">{project.aiInsights}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      <ProjectDetailsDialog
        project={selectedProject}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />
    </>
  );
};

export default AIProjectManagement;