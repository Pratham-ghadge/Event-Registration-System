import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateEventPage from './pages/CreateEventPage';
import EventDetailsPage from './pages/EventDetailsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/create-event" element={<CreateEventPage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />
          </Routes>
        </main>
        <footer className="border-t border-slate-100 py-6 mt-auto">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} EventHub. All rights reserved.</p>
            <p className="mt-1 sm:mt-0">Built with ❤️ using MERN Stack</p>
          </div>
        </footer>
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: '500',
            },
            success: {
              style: { background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' },
            },
            error: {
              style: { background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
