import { useState, useEffect } from 'react';

type ImageOptimizedProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
};

export default function ImageOptimized({ 
  src, 
  alt, 
  className, 
  width, 
  height 
}: ImageOptimizedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
  }, [src]);

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-obsidian-700 animate-pulse rounded-lg" />
      )}
      <img 
        src={src} 
        alt={alt}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
