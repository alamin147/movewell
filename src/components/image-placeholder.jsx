import { useState } from "react"

export default function ImagePlaceholder({ width, height, text, imageSrc }) {
  const [imageError, setImageError] = useState(false)
  
  const style = {
    width: `${width}px` || '100%',
    height: `${height}px` || '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
    fontSize: '0.875rem',
    fontWeight: 500,
    borderRadius: '0.5rem',
    overflow: 'hidden',
  }

  if (imageSrc && !imageError) {
    return (
      <div style={style}>
        <img 
          src={imageSrc} 
          alt={text || 'Image'} 
          style={{
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            objectPosition: 'center'
          }}
          onError={() => setImageError(true)}
        />
      </div>
    )
  }

  return (
    <div style={style}>
      {text || 'Image'}
    </div>
  )
}