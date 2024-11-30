import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
      title={theme === 'light' ? 'Gece moduna geç' : 'Gündüz moduna geç'}
    >
      {theme === 'light' ? (
        <Moon className="w-6 h-6 text-purple-900 dark:text-white" />
      ) : (
        <Sun className="w-6 h-6 text-purple-900 dark:text-white" />
      )}
    </button>
  );
}