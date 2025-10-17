// Main entry point for your application
console.log('TimedHabits app is starting...');

// You can import and use your existing components, hooks, services, etc. here
// Example:
// import { App } from './components/App.js';
// import { ThemeProvider } from './context/ThemeContext.js';

// For now, let's create a simple placeholder
const root = document.getElementById('root');
root.innerHTML = `
  <div style="padding: 20px; font-family: Arial, sans-serif;">
    <h1>TimedHabits</h1>
    <p>Your Vite development server is running!</p>
    <p>Your existing folder structure is preserved:</p>
    <ul>
      <li>📁 components/</li>
      <li>📁 context/</li>
      <li>📁 hooks/</li>
      <li>📁 pages/</li>
      <li>📁 services/</li>
      <li>📁 styles/</li>
    </ul>
    <p>You can now start building your application using these organized folders.</p>
  </div>
`;
