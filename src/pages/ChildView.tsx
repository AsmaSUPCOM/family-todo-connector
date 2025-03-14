
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTask } from '../context/TaskContext';
import TaskItem from '../components/TaskItem';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

const ChildView = () => {
  const { tasks, completedTasksCount, totalTasksCount, toggleTask } = useTask();
  const [showCelebration, setShowCelebration] = useState(false);
  const [previousCompleted, setPreviousCompleted] = useState(completedTasksCount);
  const { toast } = useToast();
  
  // Only show incomplete tasks
  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  
  // Calculate progress percentage
  const progress = totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;
  
  // Track completion changes
  useEffect(() => {
    if (previousCompleted < completedTasksCount) {
      // Task was just completed
      toast({
        title: "Good job!",
        description: "You completed a task! Keep it up!",
      });
    }
    
    // Check if all tasks are completed and show celebration
    if (totalTasksCount > 0 && completedTasksCount === totalTasksCount && previousCompleted < completedTasksCount) {
      setShowCelebration(true);
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
    
    setPreviousCompleted(completedTasksCount);
  }, [completedTasksCount, totalTasksCount, previousCompleted, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pb-8">
      {/* Header */}
      <header className="glass-card p-4 mb-6 backdrop-blur-md sticky top-0 z-10 border-b border-gray-200">
        <div className="container max-w-md mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center text-family-child hover:text-family-child/80 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            <span>Back</span>
          </Link>
          <h1 className="text-xl font-semibold">My Tasks</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      </header>
      
      <main className="container max-w-md mx-auto px-4">
        {/* Progress bar */}
        {totalTasksCount > 0 && (
          <div className="glass-card p-4 mb-6 rounded-xl animate-fade-in">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Your Progress</span>
              <span className="text-sm text-gray-500">
                {completedTasksCount} of {totalTasksCount} completed
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-family-child rounded-full progress-bar-inner"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Task lists */}
        <div className="space-y-4">
          {/* To do tasks */}
          <div>
            <h2 className="text-lg font-medium mb-3 flex items-center">
              <div className="h-5 w-5 rounded-full border-2 border-gray-400 mr-2"></div>
              Tasks to do
            </h2>
            
            <AnimatePresence>
              {incompleteTasks.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-center py-6 text-gray-500 glass-card rounded-xl"
                >
                  {totalTasksCount === 0 
                    ? "No tasks assigned yet!" 
                    : "All tasks completed! Great job!"}
                </motion.div>
              ) : (
                incompleteTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TaskItem task={task} />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
          
          {/* Completed tasks (if any) */}
          {completedTasks.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-medium mb-3 flex items-center">
                <CheckCircle2 size={20} className="text-family-child mr-2" />
                Completed
              </h2>
              
              <AnimatePresence>
                {completedTasks.slice(0, 3).map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TaskItem task={task} />
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {completedTasks.length > 3 && (
                <div className="text-center mt-2">
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    +{completedTasks.length - 3} more completed
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Celebration overlay */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex flex-col items-center justify-center bg-black/70 z-50"
            >
              <motion.div
                initial={{ scale: 0.5, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.5, y: 50 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="bg-white rounded-xl p-8 text-center max-w-xs mx-auto"
              >
                <div className="mb-4 flex justify-center">
                  <div className="h-20 w-20 bg-yellow-100 rounded-full flex items-center justify-center animate-bounce-in">
                    <Trophy size={40} className="text-yellow-500" />
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-2">All Tasks Completed!</h2>
                <p className="text-gray-600 mb-6">
                  You've finished all your tasks! Great job!
                </p>
                <Button
                  onClick={() => setShowCelebration(false)}
                  className="w-full bg-family-child hover:bg-family-child/90"
                >
                  Thank you!
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ChildView;
