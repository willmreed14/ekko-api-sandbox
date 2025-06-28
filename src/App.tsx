import './App.css';
import Header from './components/layout/Header.tsx';
import Navigation from './components/layout/Navigation.tsx';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Navigation />

        {/* Main content area with Outlet for child routes */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
