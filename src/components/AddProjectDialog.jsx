import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { addProject } from '@/store/slices/projectSlice';
import { toast } from '@/components/ui/use-toast';
import { Plus } from 'lucide-react';

const AddProjectDialog = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dueDate: '',
    priority: 'Medium',
    assignees: '',
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (e) => {
    setFormData((prev) => ({ ...prev, priority: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      id: Date.now(),
      status: 'Planning',
      progress: 0,
      vulnerabilities: 0,
      aiInsights: 'Awaiting initial scan and analysis.',
      ...formData,
      assignees: formData.assignees.split(',').map(name => name.trim()),
    };
    dispatch(addProject(newProject));
    toast({
      title: 'Project Created',
      description: `Project "${formData.name}" has been successfully created.`,
    });
    setOpen(false);
    setFormData({ name: '', dueDate: '', priority: 'Medium', assignees: '' });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Enter the details for the new security project. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right">
                Due Date
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <select
                id="priority"
                value={formData.priority}
                onChange={handleSelectChange}
                className="col-span-3 w-full p-2 border rounded-md bg-background"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assignees" className="text-right">
                Assignees
              </Label>
              <Input
                id="assignees"
                value={formData.assignees}
                onChange={handleChange}
                className="col-span-3"
                placeholder="John, Jane (comma-separated)"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectDialog;