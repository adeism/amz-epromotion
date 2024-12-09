import { useState } from 'react';
import { Save } from 'lucide-react';
import { useSettingsStore } from '../../store/useSettingsStore';
import type { SlideSettings } from '../../types/settings';

export function SettingsForm() {
  const { settings, updateSettings } = useSettingsStore();
  const [formData, setFormData] = useState<SlideSettings>(settings);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Advanced Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Slide Duration (seconds)
              <input
                type="number"
                name="slideDuration"
                value={formData.slideDuration / 1000}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  slideDuration: Number(e.target.value) * 1000
                }))}
                min="1"
                max="60"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Transition Duration (milliseconds)
              <input
                type="number"
                name="transitionDuration"
                value={formData.transitionDuration}
                onChange={handleChange}
                min="100"
                max="2000"
                step="100"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Marquee Speed (seconds)
              <input
                type="number"
                name="marqueeSpeed"
                value={formData.marqueeSpeed}
                onChange={handleChange}
                min="5"
                max="60"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Redirect URL
              <input
                type="url"
                name="redirectUrl"
                value={formData.redirectUrl}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="fadeEnabled"
              checked={formData.fadeEnabled}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Enable fade transition</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="redirectEnabled"
              checked={formData.redirectEnabled}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Enable redirect on interaction</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="marqueeEnabled"
              checked={formData.marqueeEnabled}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Enable marquee text</span>
          </label>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <Save size={20} />
          Save Settings
        </button>
      </form>
    </div>
  );
}