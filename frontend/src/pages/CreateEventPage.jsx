import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { UploadCloud, CalendarDays, ImageIcon } from 'lucide-react';

const CreateEventPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Redirect if not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error('Please select an image');
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('date', formData.date);
    data.append('location', formData.location);
    data.append('image', image);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/events`, data, config);
      toast.success('Event created successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100">
        <div className="flex items-center space-x-3 mb-8 pb-5 border-b border-slate-100">
          <div className="bg-gradient-to-br from-brand-50 to-indigo-50 border border-brand-100 p-3 rounded-2xl text-brand-600">
            <CalendarDays className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-outfit">Create New Event</h2>
            <p className="text-slate-400 text-sm mt-0.5">Fill in the details to publish your event</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Event Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              required
              placeholder="e.g., Tech Conference 2026"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="input-field resize-none"
              required
              placeholder="What is this event about?"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input-field"
                required
                placeholder="e.g., New York, NY"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Event Image</label>
            <div className="mt-1 relative flex justify-center px-6 py-8 border-2 border-slate-200 border-dashed rounded-xl hover:border-brand-400 hover:bg-brand-50/30 transition-all duration-200 cursor-pointer">
              <div className="text-center">
                {image ? (
                  <>
                    <ImageIcon className="mx-auto h-10 w-10 text-brand-500 mb-2" />
                    <p className="text-sm text-brand-600 font-semibold">{image.name}</p>
                    <p className="text-xs text-slate-400 mt-1">Click to change</p>
                  </>
                ) : (
                  <>
                    <UploadCloud className="mx-auto h-10 w-10 text-slate-300 mb-2" />
                    <p className="text-sm text-slate-500">
                      <span className="text-brand-600 font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP up to 10MB</p>
                  </>
                )}
                <input type="file" name="image" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageChange} accept="image/*" required />
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 mt-2 flex justify-center items-center text-base">
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-[3px] border-white/30 border-t-white"></div>
            ) : (
              'Publish Event'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
