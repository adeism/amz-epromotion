import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Eye, EyeOff } from 'lucide-react';
import { useImageStore } from '../store/useImageStore';
import { SlideImage } from '../types/image';

interface ImageItemProps {
  image: SlideImage;
}

export function ImageItem({ image }: ImageItemProps) {
  const { removeImage, toggleImage } = useImageStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
    >
      <button {...attributes} {...listeners} className="cursor-grab">
        <GripVertical className="text-gray-400" />
      </button>
      
      <img
        src={image.url}
        alt={image.title}
        className="w-32 h-20 object-cover rounded"
      />
      
      <div className="flex-1">
        <h3 className="font-medium">{image.title}</h3>
        <p className="text-sm text-gray-500 truncate">{image.url}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => toggleImage(image.id)}
          className={`p-2 rounded ${
            image.enabled ? 'text-green-600' : 'text-gray-400'
          }`}
        >
          {image.enabled ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
        
        <button
          onClick={() => removeImage(image.id)}
          className="p-2 text-red-500 rounded hover:bg-red-50"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}