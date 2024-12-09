import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useMarqueeStore } from '../../store/useMarqueeStore';

export function MarqueeForm() {
  const [text, setText] = useState('');
  const addText = useMarqueeStore((state) => state.addText);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addText(text.trim());
      setText('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Add Running Text</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter running text"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <Plus size={20} />
          Add Text
        </button>
      </form>
    </div>
  );
}