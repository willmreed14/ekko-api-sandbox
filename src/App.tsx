import './App.css';
import Header from './components/layout/Header.tsx';
import ApiSandboxLayout from './components/layout/ApiSandboxLayout.tsx';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        {/* Navigation sidebar will go here */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
          <p className="text-gray-500 text-sm font-medium">API SECTIONS (nav coming soon)</p>
        </div>

        {/* Main content area with Outlet for child routes */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
