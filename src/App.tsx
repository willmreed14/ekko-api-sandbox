import './App.css';
import Header from './components/layout/Header.tsx';
import Navigation from './components/layout/Navigation.tsx';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="flex h-screen">
      {/* Navigation that extends full height */}
      <Navigation />

      {/* Right side content with header and main content */}
      <div className="flex flex-col flex-1">
        {/* Fixed header */}
        <Header />

        {/* Scrollable main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
