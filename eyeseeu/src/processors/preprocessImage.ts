export async function preprocessImage(base64: string): Promise<Float32Array> {
    const img = await loadImageFromBase64(base64)
    const resized = resizeImageToCanvas(img, 60, 36)
    const imageData = getImageDataFromCanvas(resized)
  
    return convertImageDataToTensor(imageData)
  }
  
  function loadImageFromBase64(base64: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = base64
    })
  }
  
  function resizeImageToCanvas(img: HTMLImageElement, width: number, height: number): HTMLCanvasElement {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, 0, 0, width, height)
    return canvas
  }
  
  function getImageDataFromCanvas(canvas: HTMLCanvasElement): ImageData {
    const ctx = canvas.getContext('2d')!
    return ctx.getImageData(0, 0, canvas.width, canvas.height)
  }
  
  function convertImageDataToTensor(imageData: ImageData): Float32Array {
    const { data, width, height } = imageData
    const floatArray = new Float32Array(3 * height * width)
  
    for (let i = 0; i < width * height; i++) {
      const r = data[i * 4] / 255
      const g = data[i * 4 + 1] / 255
      const b = data[i * 4 + 2] / 255
  
      floatArray[i] = r
      floatArray[i + width * height] = g
      floatArray[i + 2 * width * height] = b
    }
  
    return floatArray
  }
  