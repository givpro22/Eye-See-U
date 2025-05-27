import { useGaze } from '../contexts/GazeContext';

function WebcamOverlay() {

  const {cursorPos } = useGaze();


  return (
    <>
      {/* <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
        autoPlay
        muted
        playsInline
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      /> */}
      {cursorPos && (
        <div
          className="absolute z-50 w-6 h-6 bg-red-500 rounded-full opacity-70 pointer-events-none"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            transform: 'translate(-50%, -50%)',
            position: 'fixed',
          }}
        />
      )}
      {cursorPos && (
        <div className="fixed bottom-4 left-4 bg-black text-white text-sm px-4 py-2 rounded z-50">
          보정된 시선: X {cursorPos.x.toFixed(3)}, Y {cursorPos.y.toFixed(3)}
        </div>
      )}
    </>
  );
}

export default WebcamOverlay;