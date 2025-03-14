
import { useState } from 'react';
import { Task, useTask } from '../context/TaskContext';
import { Check, Trash, Pencil, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  isParentView?: boolean;
}

const TaskItem = ({ task, isParentView = false }: TaskItemProps) => {
  const { toggleTask, deleteTask, editTask } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');
  const [isCheckmarkAnimating, setIsCheckmarkAnimating] = useState(false);

  const handleToggle = () => {
    if (!task.completed) {
      setIsCheckmarkAnimating(true);
      // Add a slight delay to make the animation visible before toggling the state
      setTimeout(() => {
        toggleTask(task.id);
      }, 200);
    } else {
      toggleTask(task.id);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedTitle.trim()) {
      editTask(task.id, editedTitle, editedDescription || undefined);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description || '');
    setIsEditing(false);
  };

  if (isEditing && isParentView) {
    return (
      <div className="glass-card p-4 mb-3 rounded-xl animate-scale-in">
        <form onSubmit={handleEditSubmit} className="space-y-3">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none"
            placeholder="Task title"
            autoFocus
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none resize-none"
            placeholder="Task description (optional)"
            rows={2}
          />
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCancelEdit}
              className="flex items-center gap-1"
            >
              <X size={16} /> Cancel
            </Button>
            <Button type="submit" size="sm" className="flex items-center gap-1">
              <Check size={16} /> Save
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "task-item glass-card p-4 mb-3 rounded-xl flex items-start gap-3",
        task.completed ? "bg-secondary/50" : "bg-white/80",
        "animate-scale-in"
      )}
    >
      <div className="flex-shrink-0 pt-0.5">
        <button
          onClick={handleToggle}
          className={cn(
            "checkbox-container w-6 h-6 rounded-full border-2 transition-all duration-300",
            task.completed 
              ? "bg-primary/10 border-primary" 
              : "bg-white border-gray-300 hover:border-primary"
          )}
        >
          {task.completed && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                "text-primary",
                isCheckmarkAnimating ? "animate-check-mark" : ""
              )}
              onAnimationEnd={() => setIsCheckmarkAnimating(false)}
            >
              <polyline points="6 12 10 16 18 8" />
            </svg>
          )}
        </button>
      </div>
      
      <div className="flex-grow">
        <h3 
          className={cn(
            "text-base font-medium transition-all duration-300",
            task.completed && "line-through text-gray-500"
          )}
        >
          {task.title}
        </h3>
        {task.description && (
          <p 
            className={cn(
              "text-sm text-gray-600 mt-1 transition-all duration-300",
              task.completed && "text-gray-400"
            )}
          >
            {task.description}
          </p>
        )}
      </div>
      
      {isParentView && (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-primary hover:bg-primary/10"
            onClick={() => setIsEditing(true)}
          >
            <Pencil size={16} />
          </Button>
          <Button
            variant="ghost" 
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-destructive hover:bg-destructive/10"
            onClick={() => deleteTask(task.id)}
          >
            <Trash size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
