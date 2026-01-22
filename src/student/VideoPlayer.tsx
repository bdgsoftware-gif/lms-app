interface Props {
  lesson: {
    title: string;
    video_url: string;
    duration: number;
  };
}

const VideoPlayer = ({ lesson }: Props) => {
  return (
    <div className="bg-bg-accent rounded-xl overflow-hidden">
      <video controls controlsList="nodownload" className="w-full h-[70vh]">
        <source src={lesson.video_url} type="video/mp4" />
      </video>

      <div className="mt-4 text-white">
        <h1 className="text-xl font-semibold">{lesson.title}</h1>
      </div>
    </div>
  );
};

export default VideoPlayer;
