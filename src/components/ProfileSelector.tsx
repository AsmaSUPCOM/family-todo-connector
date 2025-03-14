
import { Link } from 'react-router-dom';
import { User, UserRound } from 'lucide-react';
import { useTask } from '../context/TaskContext';

const ProfileSelector = () => {
  const { completedTasksCount, totalTasksCount } = useTask();
  const progress = totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;

  return (
    <div className="max-w-md mx-auto p-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Family Task Manager</h1>
        <p className="text-gray-600">Select your profile to continue</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Link to="/parent" className="profile-btn parent">
          <div className="h-16 w-16 bg-family-parent/20 rounded-full flex items-center justify-center mb-3">
            <User size={30} className="text-family-parent" />
          </div>
          <span className="text-lg font-medium">Parent</span>
          <span className="text-sm text-gray-600 mt-1">Manage tasks</span>
        </Link>

        <Link to="/child" className="profile-btn child">
          <div className="h-16 w-16 bg-family-child/20 rounded-full flex items-center justify-center mb-3">
            <UserRound size={30} className="text-family-child" />
          </div>
          <span className="text-lg font-medium">Child</span>
          <span className="text-sm text-gray-600 mt-1">Complete tasks</span>
          
          {totalTasksCount > 0 && (
            <div className="mt-3 w-full">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-family-child rounded-full progress-bar-inner"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {completedTasksCount} of {totalTasksCount} tasks completed
              </div>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default ProfileSelector;
