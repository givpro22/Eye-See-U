import { useRef, useEffect, useState } from 'react'
import { FaceMesh } from '@mediapipe/face_mesh'
import { Camera } from '@mediapipe/camera_utils'
import type { Results, NormalizedLandmarkList } from '@mediapipe/face_mesh'
import { preprocessImage } from '../processors/preprocessImage'

const leftEyeIndexes = [33, 133, 160, 159, 158, 157, 173]
const rightEyeIndexes = [362, 263, 387, 386, 385, 384, 398]

function getBoundingBox(
  landmarks: NormalizedLandmarkList,
  indexes: number[],
  width: number,
  height: number
) {
  const points = indexes.map(i => landmarks[i])
  const xs = points.map(p => p.x)
  const ys = points.map(p => p.y)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)
  return {
    x: minX * width,
    y: minY * height,
    width: (maxX - minX) * width,
    height: (maxY - minY) * height,
  }
}

function cropEyeRegion(video: HTMLVideoElement, box: { x: number; y: number; width: number; height: number }) {
  const tempCanvas = document.createElement('canvas')
  tempCanvas.width = box.width
  tempCanvas.height = box.height
  const ctx = tempCanvas.getContext('2d')
  if (!ctx) return null

  ctx.drawImage(video, box.x, box.y, box.width, box.height, 0, 0, box.width, box.height)
  return tempCanvas.toDataURL('image/png')
}

export default function CameraFaceMesh() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [leftEyePreview, setLeftEyePreview] = useState<string | null>(null)
  const [rightEyePreview, setRightEyePreview] = useState<string | null>(null)

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

  async function onResults(results: Results) {
    const canvas = canvasRef.current
    const video = videoRef.current
    if (!canvas || !results.image || !video) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = results.image.width
    canvas.height = results.image.height

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height)

    if (results.multiFaceLandmarks) {
      const landmarks = results.multiFaceLandmarks[0]

      const leftBox = getBoundingBox(landmarks, leftEyeIndexes, canvas.width, canvas.height)
      const rightBox = getBoundingBox(landmarks, rightEyeIndexes, canvas.width, canvas.height)

      const leftEyeImg = cropEyeRegion(video, leftBox)
      const rightEyeImg = cropEyeRegion(video, rightBox)

      if (leftEyeImg && rightEyeImg) {
        setLeftEyePreview(leftEyeImg)
        setRightEyePreview(rightEyeImg)

        const tensor = await preprocessImage(leftEyeImg)
        console.log('📦 왼쪽 눈 텐서:', tensor)
      }
    }
  }

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          width: '200px',
          height: '150px',
          border: '2px solid #ccc',
          borderRadius: '8px',
          overflow: 'hidden',
          zIndex: 1000,
        }}
      >
        <video ref={videoRef} autoPlay muted playsInline style={{ display: 'none' }} />
        <canvas ref={canvasRef} width={640} height={480} style={{ width: '100%', height: '100%' }} />
      </div>

      {/* 👁 잘린 눈 이미지 시각화 */}
      {leftEyePreview && (
        <img
          src={leftEyePreview}
          alt="Left Eye"
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '220px',
            width: '60px',
            height: '36px',
            border: '1px solid black',
            zIndex: 1001,
          }}
        />
      )}
      {rightEyePreview && (
        <img
          src={rightEyePreview}
          alt="Right Eye"
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '150px',
            width: '60px',
            height: '36px',
            border: '1px solid black',
            zIndex: 1001,
          }}
        />
      )}
    </>
  )
}
