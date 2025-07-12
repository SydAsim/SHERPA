import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Layout/Navbar';
import Sidebar from '@/components/Layout/Sidebar';
import AddVulnerabilityDialog from '@/components/AddVulnerabilityDialog';
import VulnerabilityDetailsDialog from '@/components/VulnerabilityDetailsDialog';

const Dashboard = () => {
  const { vulnerabilities } = useSelector((state) => state.vulnerabilities);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedVulnerability, setSelectedVulnerability] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-500';
      case 'High':
        return 'bg-orange-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'Low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'destructive';
      case 'In Progress':
        return 'default';
      case 'Resolved':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const stats = [
    {
      title: 'Total Vulnerabilities',
      value: vulnerabilities.length,
      icon: Shield,
      color: 'text-blue-500',
    },
    {
      title: 'Critical Issues',
      value: vulnerabilities.filter(v => v.severity === 'Critical').length,
      icon: AlertTriangle,
      color: 'text-red-500',
    },
    {
      title: 'Resolved',
      value: vulnerabilities.filter(v => v.status === 'Resolved').length,
      icon: CheckCircle,
      color: 'text-green-500',
    },
    {
      title: 'In Progress',
      value: vulnerabilities.filter(v => v.status === 'In Progress').length,
      icon: Clock,
      color: 'text-yellow-500',
    },
  ];

  const filteredVulnerabilities = vulnerabilities.filter(vuln => {
    const matchesSearch = vuln.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vuln.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === 'All' || vuln.severity === selectedSeverity;
    return matchesSearch && matchesSeverity;
  });

  const handleViewDetails = (vulnerability) => {
    setSelectedVulnerability(vulnerability);
    setIsDetailsOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - SHERPA AI Vulnerability Management</title>
        <meta name="description" content="Monitor and manage security vulnerabilities with SHERPA's AI-powered dashboard. Real-time insights and analytics." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <Sidebar />
        
        <div className="ml-64 pt-16">
          <div className="p-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold">Security Dashboard</h1>
                  <p className="text-muted-foreground">
                    Monitor and manage your organization's security posture
                  </p>
                </div>
                <AddVulnerabilityDialog />
              </motion.div>

              {/* Stats Cards */}
              <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div key={index} variants={itemVariants}>
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
              </motion.div>

              {/* Filters and Search */}
              <motion.div variants={itemVariants}>
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Vulnerability Management</CardTitle>
                    <CardDescription>
                      Track and manage security vulnerabilities across your infrastructure
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search vulnerabilities..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <div className="flex gap-2">
                        {['All', 'Critical', 'High', 'Medium', 'Low'].map((severity) => (
                          <Button
                            key={severity}
                            variant={selectedSeverity === severity ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedSeverity(severity)}
                          >
                            {severity}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Vulnerabilities List */}
                    <motion.div layout className="space-y-4">
                      <AnimatePresence>
                        {filteredVulnerabilities.map((vulnerability) => (
                          <motion.div
                            key={vulnerability.id}
                            layout
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                            onClick={() => handleViewDetails(vulnerability)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <div
                                    className={`w-3 h-3 rounded-full ${getSeverityColor(vulnerability.severity)}`}
                                  />
                                  <h3 className="font-semibold">{vulnerability.name}</h3>
                                  <Badge variant={getStatusColor(vulnerability.status)}>
                                    {vulnerability.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {vulnerability.description}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span>Severity: {vulnerability.severity}</span>
                                  <span>Assignee: {vulnerability.assignee}</span>
                                  <span>Found: {vulnerability.dateFound}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge variant="outline" className="mb-2">
                                  {vulnerability.severity}
                                </Badge>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>

                    {filteredVulnerabilities.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No vulnerabilities found matching your criteria.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Activity */}
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        'SQL Injection vulnerability detected in login form',
                        'XSS vulnerability patched in comment section',
                        'SSL certificate renewed for main domain',
                        'Security scan completed for production environment',
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-accent/30">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-sm">{activity}</span>
                          <span className="text-xs text-muted-foreground ml-auto">
                            {index + 1}h ago
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <VulnerabilityDetailsDialog
        vulnerability={selectedVulnerability}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />
    </>
  );
};

export default Dashboard;