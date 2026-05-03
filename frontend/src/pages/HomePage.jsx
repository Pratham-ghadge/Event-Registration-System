import { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import { Sparkles, ArrowRight, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/events`);
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-slate-200 border-t-brand-600"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      {/* Hero Section */}
      <div className="relative mb-16 text-center max-w-3xl mx-auto pt-10 pb-6">
        {/* Decorative blobs */}
        <div className="absolute -top-10 -left-20 w-64 h-64 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob pointer-events-none"></div>
        <div className="absolute -top-10 -right-20 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000 pointer-events-none"></div>
        <div className="absolute top-20 left-1/2 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 bg-brand-50 border border-brand-100 text-brand-700 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover premium experiences</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 mb-5 tracking-tight font-outfit leading-[1.1]">
            Find your next{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-purple-600 to-indigo-600">
              Unforgettable Event
            </span>
          </h1>
          
          <p className="text-lg text-slate-500 mb-8 max-w-xl mx-auto leading-relaxed">
            Explore, register, and manage upcoming events seamlessly. Join a community of creators and attendees.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/create-event" className="btn-primary py-3 px-7 text-base inline-flex items-center justify-center space-x-2 group">
              <CalendarDays className="w-4.5 h-4.5" />
              <span>Create an Event</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="relative z-10">
        {events.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200 shadow-sm">
            <CalendarDays className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg font-medium">No events yet</p>
            <p className="text-slate-400 text-sm mt-1">Be the first to create one!</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900 font-outfit">Upcoming Events</h2>
              <span className="text-sm text-slate-400 font-medium">{events.length} event{events.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
