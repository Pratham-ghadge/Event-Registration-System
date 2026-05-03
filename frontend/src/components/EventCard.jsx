import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, MapPin, ArrowRight } from 'lucide-react';

const EventCard = ({ event }) => {
  return (
    <div className="card group flex flex-col h-full">
      <div className="relative h-52 overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm text-brand-700 text-xs font-bold px-3 py-1 rounded-lg shadow-sm">
            Upcoming
          </span>
        </div>
        <div className="absolute bottom-4 left-4 flex items-center space-x-1.5 text-white/90 text-sm font-medium">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>{new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1 font-outfit group-hover:text-brand-600 transition-colors duration-300">
          {event.title}
        </h3>
        
        <div className="flex items-center text-sm text-slate-500 mb-3 space-x-1.5">
          <MapPin className="w-3.5 h-3.5 text-brand-500/60" />
          <span className="line-clamp-1">{event.location}</span>
        </div>
        
        <p className="text-slate-500 text-sm mb-5 line-clamp-2 flex-grow leading-relaxed">
          {event.description}
        </p>
        
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              {event.createdBy?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <span className="text-xs font-medium text-slate-500">{event.createdBy?.name || 'Unknown'}</span>
          </div>
          <Link to={`/events/${event._id}`} className="text-brand-600 font-semibold text-sm hover:text-brand-700 flex items-center group/link transition-colors">
            View
            <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover/link:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
