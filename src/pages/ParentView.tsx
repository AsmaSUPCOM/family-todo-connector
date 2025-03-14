
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTask } from '../context/TaskContext';
import TaskItem from '../components/TaskItem';
import AddTaskForm from '../components/AddTaskForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ParentView = () => {
  const { tasks, completedTasksCount, totalTasksCount } = useTask();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [showBadge, setShowBadge] = useState(false);
  
  // Calculate progress percentage
  const progress = totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;
  
  // Show completion badge with animation when all tasks are completed
  useEffect(() => {
    if (totalTasksCount > 0 && completedTasksCount === totalTasksCount) {
      setShowBadge(true);
      const timer = setTimeout(() => {
        setShowBadge(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [completedTasksCount, totalTasksCount]);
  
  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-8">
      {/* Header */}
      <header className="glass-card p-4 mb-6 backdrop-blur-md sticky top-0 z-10 border-b border-gray-200">
        <div className="container max-w-md mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            <span>Back</span>
          </Link>
          <h1 className="text-xl font-semibold">Parent Dashboard</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      </header>
      
      <main className="container max-w-md mx-auto px-4">
        {/* Progress bar */}
        {totalTasksCount > 0 && (
          <div className="glass-card p-4 mb-6 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Task Progress</span>
              <span className="text-sm text-gray-500">
                {completedTasksCount} of {totalTasksCount} completed
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-family-parent rounded-full progress-bar-inner"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Add task form */}
        <AddTaskForm />
        
        {/* Filters */}
        <div className="flex space-x-2 mb-4">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
            className="flex-1"
          >
            All
          </Button>
          <Button
            variant={filter === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('active')}
            className="flex-1"
          >
            Active
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('completed')}
            className="flex-1"
          >
            Completed
          </Button>
        </div>
        
        {/* Task list */}
        <div className="space-y-1">
          <AnimatePresence>
            {filteredTasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-center py-12 text-gray-500"
              >
                {filter === 'all' 
                  ? "No tasks yet. Add your first task above!" 
                  : filter === 'active' 
                    ? "No active tasks" 
                    : "No completed tasks"}
              </motion.div>
            ) : (
              filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TaskItem task={task} isParentView={true} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
        
        {/* Completion badge */}
        <AnimatePresence>
          {showBadge && totalTasksCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed bottom-6 left-1/2 transform -translate-x-1/2 
                        bg-green-500 text-white px-4 py-2 rounded-full
                        flex items-center shadow-lg"
            >
              <CheckCircle2 size={20} className="mr-2" />
              <span>All tasks completed!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ParentView;
