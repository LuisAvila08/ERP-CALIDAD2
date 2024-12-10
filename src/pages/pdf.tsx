import React from 'react'
import { Document, Page } from 'react-pdf'

// Componente para mostrar un PDF
const PdfViewer = ({ pdfUrl }) => {
  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center' }}>
      <Document
        file={pdfUrl}
        onLoadError={(error) => console.error('Error loading PDF: ', error)}
      >
        <Page pageNumber={1} scale={1.5} />
      </Document>
    </div>
  )
}

// Componente principal de la aplicación
function App () {
  return (
    <div className='App'>
      <h1>Visualizador de PDF</h1>
      {/* Reemplaza la URL del archivo PDF con la ruta de tu archivo */}
      <PdfViewer pdfUrl='prueba.pdf' />
    </div>
  )
}

export default App
