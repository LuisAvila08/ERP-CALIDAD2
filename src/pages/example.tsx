import React, { useState } from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer'

// Crear estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 20
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    fontSize: 18
  }
})

// Componente del documento con múltiples páginas
const MyDocument = ({ currentPage }) => (
  <Document>
    {currentPage === 1 && (
      <Page size='A4' style={styles.page}>
        <View style={styles.section}>
          <Text>Página 1: Bienvenido a la primera sección del documento.</Text>
        </View>
      </Page>
    )}
    {currentPage === 2 && (
      <Page size='A4' style={styles.page}>
        <View style={styles.section}>
          <Text>Página 2: Has navegado a la segunda sección del documento.</Text>
        </View>
      </Page>
    )}
  </Document>
)

// Componente principal con navegación
const PDFView = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const goToNextPage = () => {
    setCurrentPage(2)
  }

  const goToPreviousPage = () => {
    setCurrentPage(1)
  }

  return (
    <div>
      <PDFViewer width='100%' height='500px'>
        <MyDocument currentPage={currentPage} />
      </PDFViewer>
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        {currentPage === 1 && (
          <button onClick={goToNextPage} style={{ padding: '10px 20px', fontSize: '16px' }}>
            Ir a la Página 2
          </button>
        )}
        {currentPage === 2 && (
          <button onClick={goToPreviousPage} style={{ padding: '10px 20px', fontSize: '16px' }}>
            Volver a la Página 1
          </button>
        )}
      </div>
    </div>
  )
}

export default PDFView
