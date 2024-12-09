import { Eye, EyeOff, Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { useMarqueeStore } from '../../store/useMarqueeStore';

export function MarqueeList() {
  const { texts, removeText, toggleText, updateText } = useMarqueeStore();
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (id: string, text: string) => {
    setEditId(id);
    setEditText(text);
  };

  const handleSave = (id: string) => {
    if (editText.trim()) {
      updateText(id, editText.trim());
      setEditId(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Running Text List</h2>
      <div className="space-y-4">
        {texts.map((text) => (
          <div key={text.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            {editId === text.id ? (
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 p-2 border rounded"
                />
                <button
                  onClick={() => handleSave(text.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditId(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <p className="flex-1">{text.text}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(text.id, text.text)}
                    className="p-2 text-blue-500 rounded hover:bg-blue-50"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => toggleText(text.id)}
                    className={`p-2 rounded ${
                      text.enabled ? 'text-green-600' : 'text-gray-400'
                    }`}
                  >
                    {text.enabled ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                  <button
                    onClick={() => removeText(text.id)}
                    className="p-2 text-red-500 rounded hover:bg-red-50"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}