import './App.css';
import Header from './components/layout/Header.tsx';
import Navigation from './components/layout/Navigation.tsx';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col h-screen">
      {/* Fixed header */}
      <Header />

      {/* Main content area w/ fixed nav and scrollable content */}
      <div className="flex flex-1 overflow-hidden">
        <Navigation />

        {/* Scrollable main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
