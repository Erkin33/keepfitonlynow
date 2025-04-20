// src/components/VideoPlayer.tsx
interface VideoPlayerProps {
    videoUrl: string;
  }
  
  export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
    return (
      <div className="video-player">
        <video controls width="100%">
          <source src={videoUrl} type="video/mp4" />
          Ваш браузер не поддерживает HTML5 видео.
        </video>
      </div>
    );
  }
  