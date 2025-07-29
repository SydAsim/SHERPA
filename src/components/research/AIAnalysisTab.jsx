import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Globe, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import VulnerabilityReportUpload from './VulnerabilityReportUpload';

const AIAnalysisTab = () => {
  const handleMapClick = () => {
    toast({
      title: "Interactive Map Coming Soon!",
      description: "A real-time global threat map is in development.",
    });
  };

  return (
    <div className="space-y-6">
      <VulnerabilityReportUpload />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Trend Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-accent/30">
                <span className="font-medium">SQL Injection Attacks</span>
                <Badge variant="destructive">↑ 45%</Badge>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-accent/30">
                <span className="font-medium">Ransomware Activity</span>
                <Badge variant="default">↑ 23%</Badge>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-accent/30">
                <span className="font-medium">Phishing Campaigns</span>
                <Badge variant="secondary">↓ 12%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-primary transition-colors" onClick={handleMapClick}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Global Threat Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center py-8 text-muted-foreground">
                <Globe className="h-16 w-16 mx-auto mb-4 text-primary" />
                <p>Interactive threat map visualization</p>
                <p className="text-sm mt-2">Click to view real-time global security events</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            AI-Generated Insights
          </CardTitle>
          <CardDescription>
            Automated analysis and recommendations based on current threat landscape
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              'Critical vulnerabilities in web applications have increased by 45% this month. Focus on input validation and secure coding practices.',
              'Zero-day exploits targeting container environments are emerging. Implement runtime security monitoring.',
              'Supply chain attacks are becoming more sophisticated. Enhance vendor security assessments.',
              'AI-powered attacks are on the rise. Consider implementing AI-based defense mechanisms.',
            ].map((insight, index) => (
              <motion.div
                key={index}
.                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-lg bg-accent/30"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <p className="text-sm">{insight}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAnalysisTab;