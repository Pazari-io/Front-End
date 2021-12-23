import { useEffect, useState } from 'react';

function useDarkMode() {
  const [theme, setTheme] = useState('dark'); //typeof window !== 'undefined' ? localStorage.theme : 'dark' respect to system later
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);

    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return [colorTheme, setTheme];
}

export default useDarkMode;
