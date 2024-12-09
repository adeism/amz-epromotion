import { useState, useRef } from 'react';
import { Plus, Upload } from 'lucide-react';
import { useImageStore } from '../../store/useImageStore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';

export function ImageForm() {
  const addImage = useImageStore((state) => state.addImage);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageTitle, setNewImageTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddImage = () => {
    if (newImageUrl && newImageTitle) {
      addImage({
        url: newImageUrl,
        title: newImageTitle,
        enabled: true,
      });
      setNewImageUrl('');
      setNewImageTitle('');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const storageRef = ref(storage, `images/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setNewImageUrl(url);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Add New Image</h2>
      <div className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Image URL (1920x1080 recommended)"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            <Upload size={20} />
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        <input
          type="text"
          placeholder="Image Title"
          value={newImageTitle}
          onChange={(e) => setNewImageTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleAddImage}
          disabled={!newImageUrl || !newImageTitle}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          <Plus size={20} />
          Add Image
        </button>
      </div>
    </div>
  );
}