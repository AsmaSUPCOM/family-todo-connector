
import { useState } from 'react';
import { useTask } from '../context/TaskContext';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

const AddTaskForm = () => {
  const { addTask } = useTask();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title, description || undefined);
      setTitle('');
      setDescription('');
      setIsExpanded(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <Button
        onClick={() => setIsExpanded(true)}
        className="w-full py-6 mb-6 flex items-center justify-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 shadow-sm animate-scale-in"
      >
        <Plus size={20} />
        <span>Add New Task</span>
      </Button>
    );
  }

  return (
    <div className="glass-card p-4 mb-6 rounded-xl shadow-md animate-scale-in">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none"
            placeholder="What needs to be done?"
            autoFocus
          />
        </div>
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none resize-none"
            placeholder="Add details (optional)"
            rows={3}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="flex items-center gap-1"
          >
            <X size={16} /> Cancel
          </Button>
          <Button type="submit" className="flex items-center gap-1">
            <Plus size={16} /> Add Task
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
