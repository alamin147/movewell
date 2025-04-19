export default function ImagePlaceholder({ width, height, text }) {
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
  }

  return (
    <div style={style}>
      {text || 'Image'}
    </div>
  )
}