import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CalendarDays, LogOut, PlusCircle, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass-nav sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-[72px]">
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="bg-gradient-to-br from-brand-500 to-indigo-600 p-2 rounded-xl text-white shadow-md shadow-brand-500/30 group-hover:shadow-lg group-hover:shadow-brand-500/40 transition-all duration-300">
              <CalendarDays className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 font-outfit">
              Event<span className="text-brand-600">Hub</span>
            </span>
          </Link>

          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <Link to="/create-event" className="btn-primary flex items-center space-x-2 text-sm">
                  <PlusCircle className="w-4 h-4" />
                  <span>Create Event</span>
                </Link>
                <div className="flex items-center space-x-3 ml-2 pl-3 border-l border-slate-200">
                  <div className="flex items-center space-x-2 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/60">
                    <User className="w-3.5 h-3.5 text-brand-500" />
                    <span className="font-medium text-sm">{user.name}</span>
                  </div>
                  <button onClick={handleLogout} className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all duration-200" title="Logout">
                    <LogOut className="w-4.5 h-4.5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-slate-600 hover:text-brand-600 font-medium text-sm transition-colors">
                  Log in
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
