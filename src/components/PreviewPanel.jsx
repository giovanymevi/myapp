// components/PreviewPanel.jsx
import React, { useState } from 'react'
import { toPng, toJpeg } from 'html-to-image'
import jsPDF from 'jspdf'

const PreviewPanel = ({ entrepreneur, onBack }) => {
  const [format, setFormat] = useState('instagram') // instagram, whatsapp, stories, a4, public

  const exportImage = async (formatType) => {
    const node = document.getElementById('preview-card')
    
    try {
      let dataUrl
      switch (formatType) {
        case 'png':
          dataUrl = await toPng(node)
          break
        case 'jpeg':
          dataUrl = await toJpeg(node)
          break
        case 'pdf':
          const pdf = new jsPDF({
            orientation: format === 'a4' ? 'portrait' : 'landscape',
            unit: 'mm',
            format: format === 'a4' ? 'a4' : [1080, 1080] // Tamaño personalizado para redes
          })
          dataUrl = await toPng(node)
          pdf.addImage(dataUrl, 'PNG', 0, 0, 210, 297) // A4 size
          pdf.save(`${entrepreneur.name}-catalogo.pdf`)
          return
        default:
          dataUrl = await toPng(node)
      }
      
      const link = document.createElement('a')
      link.download = `${entrepreneur.name}-${format}.${formatType}`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error('Error exporting image:', error)
    }
  }

  return (
    <div className="preview-panel">
      <div className="preview-controls">
        <button onClick={onBack} className="btn-secondary">
          Volver a editar
        </button>
        
        <div className="format-selector">
          <label>Formato:</label>
          <select value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="instagram">Instagram (Cuadrado)</option>
            <option value="whatsapp">WhatsApp (Horizontal)</option>
            <option value="stories">Historias (Vertical)</option>
            <option value="a4">A4 (Imprimir)</option>
            <option value="public">Pantalla Pública</option>
          </select>
        </div>
        
        <div className="export-options">
          <button onClick={() => exportImage('png')} className="btn-primary">
            Exportar PNG
          </button>
          <button onClick={() => exportImage('jpeg')} className="btn-primary">
            Exportar JPEG
          </button>
          <button onClick={() => exportImage('pdf')} className="btn-primary">
            Exportar PDF
          </button>
        </div>
      </div>
      
      <div className={`preview-container ${format}`}>
        <div id="preview-card" className="preview-card">
          <div className="preview-header">
            <h2>{entrepreneur.name}</h2>
            <p>{entrepreneur.description}</p>
          </div>
          
          {entrepreneur.images.length > 0 && (
            <div className="preview-images">
              <img src={entrepreneur.images[0]} alt={entrepreneur.name} />
            </div>
          )}
          
          <div className="preview-products">
            <h3>Productos y Servicios</h3>
            {entrepreneur.products.map((product, index) => (
              <div key={index} className="product">
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <span className="price">{product.price}</span>
              </div>
            ))}
          </div>
          
          <div className="preview-contact">
            <h3>Contacto</h3>
            <p>Teléfono: {entrepreneur.contact_phone}</p>
            <p>Email: {entrepreneur.contact_email}</p>
            <p>Instagram: @{entrepreneur.contact_instagram}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewPanel