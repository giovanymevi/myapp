// components/EntrepreneurForm.jsx
import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

const EntrepreneurForm = ({ entrepreneur, onSave, onCancel, onPreview }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    products: [],
    contact_phone: '',
    contact_email: '',
    contact_instagram: '',
    images: []
  })
  
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (entrepreneur) {
      setFormData(entrepreneur)
    }
  }, [entrepreneur])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...formData.products]
    updatedProducts[index][field] = value
    setFormData(prev => ({ ...prev, products: updatedProducts }))
  }

  const addProduct = () => {
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, { name: '', description: '', price: '' }]
    }))
  }

  const removeProduct = (index) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index)
    }))
  }

  const uploadImage = async (e) => {
    try {
      setUploading(true)
      
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('Debes seleccionar una imagen')
      }
      
      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`
      
      let { error: uploadError } = await supabase.storage
        .from('entrepreneur-images')
        .upload(filePath, file)
      
      if (uploadError) throw uploadError
      
      // Obtener URL pública
      const { publicURL } = supabase.storage
        .from('entrepreneur-images')
        .getPublicUrl(filePath)
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, publicURL]
      }))
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="entrepreneur-form">
      <h2>{entrepreneur ? 'Editar' : 'Nuevo'} Emprendimiento</h2>
      
      <div className="form-section">
        <h3>Información básica</h3>
        <div className="form-group">
          <label>Nombre del emprendimiento</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="form-group">
          <label>Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
          />
        </div>
        
        <div className="form-group">
          <label>Categoría</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Seleccionar categoría</option>
            <option value="food">Comida</option>
            <option value="crafts">Artesanías</option>
            <option value="clothing">Ropa</option>
            <option value="services">Servicios</option>
            <option value="other">Otro</option>
          </select>
        </div>
      </div>
      
      <div className="form-section">
        <h3>Productos/Servicios</h3>
        {formData.products.map((product, index) => (
          <div key={index} className="product-item">
            <div className="form-group">
              <label>Nombre del producto</label>
              <input
                type="text"
                value={product.name}
                onChange={(e) => handleProductChange(index, 'name', e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>Descripción</label>
              <textarea
                value={product.description}
                onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                rows="2"
              />
            </div>
            
            <div className="form-group">
              <label>Precio</label>
              <input
                type="text"
                value={product.price}
                onChange={(e) => handleProductChange(index, 'price', e.target.value)}
              />
            </div>
            
            <button 
              type="button" 
              className="btn-remove"
              onClick={() => removeProduct(index)}
            >
              Eliminar
            </button>
          </div>
        ))}
        
        <button type="button" onClick={addProduct} className="btn-add">
          + Añadir producto
        </button>
      </div>
      
      <div className="form-section">
        <h3>Imágenes</h3>
        <div className="image-upload">
          <input
            type="file"
            id="upload"
            accept="image/*"
            onChange={uploadImage}
            disabled={uploading}
            style={{ display: 'none' }}
          />
          <label htmlFor="upload" className="btn-upload">
            {uploading ? 'Subiendo...' : 'Subir imagen'}
          </label>
        </div>
        
        <div className="image-preview">
          {formData.images.map((img, index) => (
            <div key={index} className="image-item">
              <img src={img} alt="Preview" />
            </div>
          ))}
        </div>
      </div>
      
      <div className="form-section">
        <h3>Contacto</h3>
        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="text"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="form-group">
          <label>Instagram</label>
          <input
            type="text"
            name="contact_instagram"
            value={formData.contact_instagram}
            onChange={handleInputChange}
          />
        </div>
      </div>
      
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancelar
        </button>
        <button 
          type="button" 
          onClick={onPreview} 
          className="btn-primary"
          disabled={!formData.name}
        >
          Vista previa
        </button>
        <button 
          type="button" 
          onClick={() => onSave(formData)} 
          className="btn-primary"
        >
          Guardar
        </button>
      </div>
    </div>
  )
}

export default EntrepreneurForm