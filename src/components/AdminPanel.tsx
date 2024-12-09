import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ImageForm } from './admin/ImageForm';
import { ImageList } from './admin/ImageList';
import { MarqueeForm } from './admin/MarqueeForm';
import { MarqueeList } from './admin/MarqueeList';
import { SettingsForm } from './admin/SettingsForm';

export default function AdminPanel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
        onClick={() => navigate('/')}
        className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft size={20} />
        Back to Slideshow
      </button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Content Management</h1>
        <SettingsForm />
        <ImageForm />
        <ImageList />
        <div className="mt-12">
          <MarqueeForm />
          <MarqueeList />
        </div>
      </div>
    </div>
  );
}