import React, { useRef, useEffect } from 'react'
import { FaceMesh } from '@mediapipe/face_mesh'
import { Camera } from '@mediapipe/camera_utils'
import type { Results } from '@mediapipe/face_mesh'

function FaceLandmarkDetector() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    })

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    })

    faceMesh.onResults(onResults)

    if (!videoRef.current) return

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) {
          await faceMesh.send({ image: videoRef.current })
        }
      },
      width: 640,
      height: 480,
    })

    camera.start()

    return () => {
      camera.stop()
    }
  }, [])

  function onResults(results: Results) {
    const canvas = canvasRef.current
    if (!canvas || !results.image) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = results.image.width
    canvas.height = results.image.height

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height)

    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        for (const point of landmarks) {
          const x = point.x * canvas.width
          const y = point.y * canvas.height
          ctx.beginPath()
          ctx.arc(x, y, 1.5, 0, 2 * Math.PI)
          ctx.fillStyle = 'red'
          ctx.fill()
        }
      }
    }
  }

  return (
    <div>
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ width: '640px', height: '480px' }} />
    </div>
  )
}

export default FaceLandmarkDetector
