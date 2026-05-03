import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Calendar, MapPin, User, Trash2, Users, CheckCircle } from 'lucide-react';

const EventDetailsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/events/${id}`);
        setEvent(data);
        
        // If user is the creator, fetch registrations
        if (user && data.createdBy._id === user._id) {
          const regRes = await axios.get(`${import.meta.env.VITE_API_URL}/events/${id}/registrations`, {
            headers: { Authorization: `Bearer ${user.token}` }
          });
          setRegistrations(regRes.data);
        }
      } catch (error) {
        toast.error('Failed to load event details');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEventData();
  }, [id, user, navigate]);

  const handleRegister = async () => {
    if (!user) {
      toast.error('Please login to register for this event');
      navigate('/login');
      return;
    }

    setRegistering(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/events/${id}/register`,
        { tickets: 1 },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success('Successfully registered for the event!');
      setRegistered(true);
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed';
      if (msg.includes('already registered')) {
        setRegistered(true);
      }
      toast.error(msg);
    } finally {
      setRegistering(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/events/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        toast.success('Event deleted successfully');
        navigate('/');
      } catch (error) {
        toast.error('Failed to delete event');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-slate-200 border-t-brand-600"></div>
      </div>
    );
  }

  if (!event) return null;

  const isCreator = user && event.createdBy._id === user._id;

  return (
    <div className="max-w-4xl mx-auto mt-4 animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {/* Hero Image */}
        <div className="h-56 md:h-80 w-full relative">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
            <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-3 font-outfit drop-shadow-sm">{event.title}</h1>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center space-x-1.5 bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-lg text-white/90 text-sm font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-lg text-white/90 text-sm font-medium">
                <MapPin className="w-3.5 h-3.5" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-indigo-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
                {event.createdBy.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <p className="text-xs text-slate-400">Organized by</p>
                <p className="font-semibold text-slate-900">{event.createdBy.name}</p>
              </div>
            </div>
            
            <div className="flex space-x-3 w-full sm:w-auto">
              {isCreator ? (
                <button onClick={handleDelete} className="btn-secondary text-red-600 hover:bg-red-50 hover:border-red-200 flex items-center justify-center space-x-2 w-full sm:w-auto">
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Event</span>
                </button>
              ) : registered ? (
                <button disabled className="btn-secondary text-green-600 border-green-200 bg-green-50 flex items-center justify-center space-x-2 w-full sm:w-auto cursor-default">
                  <CheckCircle className="w-4 h-4" />
                  <span>Registered</span>
                </button>
              ) : (
                <button 
                  onClick={handleRegister} 
                  disabled={registering}
                  className="btn-primary py-3 px-8 flex items-center justify-center space-x-2 w-full sm:w-auto"
                >
                  {registering ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-[3px] border-white/30 border-t-white"></div>
                  ) : (
                    <span>Register Now</span>
                  )}
                </button>
              )}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 font-outfit">About this event</h3>
            <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">{event.description}</p>
          </div>
          
          {isCreator && (
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center space-x-2 font-outfit">
                <Users className="w-5 h-5 text-brand-600" />
                <span>Registrations ({registrations.length})</span>
              </h3>
              
              {registrations.length === 0 ? (
                <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-400 text-sm">No registrations yet</p>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <ul className="divide-y divide-slate-100">
                    {registrations.map(reg => (
                      <li key={reg._id} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                            {reg.userId.name?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 text-sm">{reg.userId.name}</p>
                            <p className="text-xs text-slate-400">{reg.userId.email}</p>
                          </div>
                        </div>
                        <span className="bg-brand-50 text-brand-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-brand-100">
                          {reg.tickets} Ticket{reg.tickets > 1 ? 's' : ''}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
