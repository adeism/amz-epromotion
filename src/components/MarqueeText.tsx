import { useMarqueeStore } from '../store/useMarqueeStore';
import { useSettingsStore } from '../store/useSettingsStore';

export function MarqueeText() {
  const texts = useMarqueeStore((state) => 
    state.texts.filter(text => text.enabled)
  );
  const { marqueeSpeed } = useSettingsStore((state) => state.settings);

  if (texts.length === 0) return null;

  const combinedText = texts.map(t => t.text).join(' • ');

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-2 overflow-hidden">
      <div 
        className="whitespace-nowrap"
        style={{
          animation: `marquee ${marqueeSpeed}s linear infinite`
        }}
      >
        {combinedText}
      </div>
    </div>
  );
}