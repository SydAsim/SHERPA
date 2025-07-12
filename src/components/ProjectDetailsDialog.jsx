import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
  Target,
  Bot,
  Calendar,
  Users,
  AlertCircle,
  TrendingUp,
  CheckCircle,
  Clock,
} from 'lucide-react';

const ProjectDetailsDialog = ({ project, open, onOpenChange }) => {
  if (!project) return null;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'In Progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'Planning':
        return <Calendar className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            {project.name}
          </DialogTitle>
          <DialogDescription>
            Detailed information for the selected project.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Badge variant={getPriorityColor(project.priority)} className="text-sm px-3 py-1">
                {project.priority} Priority
              </Badge>
              <div className="flex items-center gap-2">
                {getStatusIcon(project.status)}
                <span className="text-sm font-medium">{project.status}</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Due Date:</span>
              <span>{project.dueDate}</span>
            </div>
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Vulnerabilities:</span>
              <span>{project.vulnerabilities}</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Assignees:</span>
              <div className="flex flex-wrap gap-2">
                {project.assignees.map((assignee, index) => (
                  <Badge key={index} variant="outline">{assignee}</Badge>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Progress</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-4">
              <div
                className="bg-primary h-4 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground"
                style={{ width: `${project.progress}%` }}
              >
                {project.progress}%
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Bot className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">AI Insights:</span>
            </div>
            <p className="text-muted-foreground pl-8">{project.aiInsights}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsDialog;