import { useEffect, useState } from 'react';
import { useImageStore } from '../store/useImageStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { MarqueeText } from './MarqueeText';

export default function ImageSlideshow() {
  const settings = useSettingsStore((state) => state.settings);
  const images = useImageStore((state) => 
    state.images
      .filter(img => img.enabled)
      .sort((a, b) => a.order - b.order)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [redirectTriggered, setRedirectTriggered] = useState(false);

  useEffect(() => {
    if (images.length === 0) return;
    
    const imageInterval = setInterval(() => {
      if (settings.fadeEnabled) {
        setFadeOut(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % images.length);
          setFadeOut(false);
        }, settings.transitionDuration);
      } else {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    }, settings.slideDuration);

    return () => clearInterval(imageInterval);
  }, [images.length, settings.slideDuration, settings.transitionDuration, settings.fadeEnabled]);

  useEffect(() => {
    if (!settings.redirectEnabled) return;

    const handleInteraction = () => setRedirectTriggered(true);

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [settings.redirectEnabled]);

  useEffect(() => {
    if (redirectTriggered && settings.redirectEnabled) {
      window.location.href = settings.redirectUrl;
    }
  }, [redirectTriggered, settings.redirectEnabled, settings.redirectUrl]);

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-black text-white text-2xl">
        No active images to display
      </div>
    );
  }

  return (
    <>
      <img
        src={images[currentIndex].url}
        alt={images[currentIndex].title}
        className={`w-screen h-screen object-cover ${
          settings.fadeEnabled
            ? `transition-opacity duration-${settings.transitionDuration} ${
                fadeOut ? 'opacity-0' : 'opacity-100'
              }`
            : ''
        }`}
      />
      {settings.marqueeEnabled && <MarqueeText />}
    </>
  );
}