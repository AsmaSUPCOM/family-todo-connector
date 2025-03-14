
import { useEffect } from 'react';
import ProfileSelector from '../components/ProfileSelector';
import { TaskProvider } from '../context/TaskContext';

const Index = () => {
  // Add subtle parallax background effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      document.body.style.backgroundPosition = `${x * 10}px ${y * 10}px`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="w-full max-w-4xl">
        <TaskProvider>
          <ProfileSelector />
        </TaskProvider>
      </div>
    </div>
  );
};

export default Index;
