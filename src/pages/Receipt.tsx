import React, { useState } from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// import Layout2 from '../components/Layout'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

const styles = StyleSheet.create({
  page: { padding: 30 },
  logoSection: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  title: { textAlign: 'center', fontSize: 20, marginBottom: 10 },
  block: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  inputLabel: { fontSize: 12, fontWeight: 'bold' }
})

const ActaPDF = ({ formData }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.logoSection}>
        <Text>LOGO</Text>
        <Text>ACTA DE DESCARGA</Text>
        <View>
          <Text>F-I-CAL-02-01</Text>
          <Text>Rev.7 (08-12-2023)</Text>
        </View>
      </View>

      <View style={styles.block}>
        <View style={styles.row}>
          <Text style={styles.inputLabel}>Fecha: {formData.fecha}</Text>
          <Text style={styles.inputLabel}>Inicio de verificación: {formData.inicioVerificacion}</Text>
          <Text style={styles.inputLabel}>Término de verificación: {formData.terminoVerificacion}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.inputLabel}>O.C.: {formData.oc}</Text>
          <Text style={styles.inputLabel}>Proveedor: {formData.proveedor}</Text>
          <Text style={styles.inputLabel}>Especie: {formData.especie}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.inputLabel}>Variedades: {formData.variedades}</Text>
          <Text style={styles.inputLabel}>Frío de descarga: {formData.frioDescarga}</Text>
          <Text style={styles.inputLabel}>Cajas recibidas: {formData.cajasRecibidas}</Text>
        </View>
      </View>

      <View style={styles.block}>
        <View style={styles.row}>
          <Text style={styles.inputLabel}>Línea transportista: {formData.lineaTransportista}</Text>
          <Text style={styles.inputLabel}>Número de contenedor: {formData.numeroContenedor}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.inputLabel}>Placas camión: {formData.placasCamion}</Text>
          <Text style={styles.inputLabel}>Placas caja: {formData.placasCaja}</Text>
          <Text style={styles.inputLabel}>Chofer: {formData.chofer}</Text>
        </View>
      </View>

      <View style={styles.block}>
        <Text style={styles.inputLabel}>Condiciones de Transporte</Text>
        <View style={styles.row}>
          <Text style={styles.inputLabel}>Temperatura de set point: {formData.tempSetPoint}</Text>
          <Text style={styles.inputLabel}>Observaciones: {formData.observacionesSetPoint}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.inputLabel}>Temperatura de pantalla: {formData.tempPantalla}</Text>
          <Text style={styles.inputLabel}>Observaciones: {formData.observacionesPantalla}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.inputLabel}>Termógrafo: {formData.termografo}</Text>
          <Text style={styles.inputLabel}>Temperatura de origen: {formData.tempOrigen}</Text>
          <Text style={styles.inputLabel}>Temperatura de destino: {formData.tempDestino}</Text>
        </View>
      </View>

      <View style={styles.block}>
        <Text style={styles.inputLabel}>Limpio, libre de malos olores: {formData.limpio}</Text>
        <Text style={styles.inputLabel}>Caja cerrada, en buen estado: {formData.cajaCerrada}</Text>
        <Text style={styles.inputLabel}>Lona en buen estado: {formData.lona}</Text>
        <Text style={styles.inputLabel}>Libre de fauna nociva: {formData.fauna}</Text>
        <Text style={styles.inputLabel}>Carga en buen estado: {formData.carga}</Text>
        <Text style={styles.inputLabel}>Seguridad de carga: {formData.seguridadCarga}</Text>
        <Text style={styles.inputLabel}>Sellado: {formData.sellado}</Text>
        <Text style={styles.inputLabel}>Número de serie: {formData.numeroSerie}</Text>
      </View>
    </Page>
  </Document>
)

const ActaDeLlegada = () => {
  const [formData, setFormData] = useState({
    fecha: '',
    inicioVerificacion: '',
    terminoVerificacion: '',
    oc: '',
    proveedor: '',
    especie: '',
    variedades: '',
    frioDescarga: '',
    cajasRecibidas: '',
    lineaTransportista: '',
    numeroContenedor: '',
    placasCamion: '',
    placasCaja: '',
    chofer: '',
    tempSetPoint: '',
    observacionesSetPoint: '',
    tempPantalla: '',
    observacionesPantalla: '',
    termografo: '',
    tempOrigen: '',
    tempDestino: '',
    limpio: '',
    cajaCerrada: '',
    lona: '',
    fauna: '',
    carga: '',
    seguridadCarga: '',
    sellado: '',
    numeroSerie: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  return (
    <ResizablePanelGroup direction='horizontal'>
      <ResizablePanel defaultSize={50}>
        <div style={{ padding: '20px' }}>
          <h1>Acta de Llegada</h1>

          <h2>Fecha y Verificación</h2>
          <label>Fecha: </label>
          <Input type='date' name='fecha' value={formData.fecha} onChange={handleInputChange} />

          <label>Inicio de verificación: </label>
          <Input type='text' name='inicioVerificacion' value={formData.inicioVerificacion} onChange={handleInputChange} />

          <label>Término de verificación: </label>
          <Input type='text' name='terminoVerificacion' value={formData.terminoVerificacion} onChange={handleInputChange} />

          <label>O.C.: </label>
          <Input type='text' name='oc' value={formData.oc} onChange={handleInputChange} />

          <label>Proveedor: </label>
          <Input type='text' name='proveedor' value={formData.proveedor} onChange={handleInputChange} />

          <label>Especie: </label>
          <Input type='text' name='especie' value={formData.especie} onChange={handleInputChange} />

          <label>Variedades: </label>
          <Input type='text' name='variedades' value={formData.variedades} onChange={handleInputChange} />

          <label>Frío de descarga: </label>
          <Input type='text' name='frioDescarga' value={formData.frioDescarga} onChange={handleInputChange} />

          <label>Cajas recibidas: </label>
          <Input type='text' name='cajasRecibidas' value={formData.cajasRecibidas} onChange={handleInputChange} />

          <h2>Transporte</h2>
          <label>Línea transportista: </label>
          <Input type='text' name='lineaTransportista' value={formData.lineaTransportista} onChange={handleInputChange} />

          <label>Número de contenedor: </label>
          <Input type='text' name='numeroContenedor' value={formData.numeroContenedor} onChange={handleInputChange} />

          <label>Placas camión: </label>
          <Input type='text' name='placasCamion' value={formData.placasCamion} onChange={handleInputChange} />

          <label>Placas caja: </label>
          <Input type='text' name='placasCaja' value={formData.placasCaja} onChange={handleInputChange} />

          <label>Chofer: </label>
          <Input type='text' name='chofer' value={formData.chofer} onChange={handleInputChange} />

          <h2>Condiciones de Transporte</h2>
          <label>Temperatura de set point: </label>
          <Input type='text' name='tempSetPoint' value={formData.tempSetPoint} onChange={handleInputChange} />

          <label>Observaciones set point: </label>
          <Input type='text' name='observacionesSetPoint' value={formData.observacionesSetPoint} onChange={handleInputChange} />

          <label>Temperatura de pantalla: </label>
          <Input type='text' name='tempPantalla' value={formData.tempPantalla} onChange={handleInputChange} />

          <label>Observaciones pantalla: </label>
          <Input type='text' name='observacionesPantalla' value={formData.observacionesPantalla} onChange={handleInputChange} />

          <label>Termógrafo: </label>
          <Input type='text' name='termografo' value={formData.termografo} onChange={handleInputChange} />

          <label>Temperatura de origen: </label>
          <Input type='text' name='tempOrigen' value={formData.tempOrigen} onChange={handleInputChange} />

          <label>Temperatura de destino: </label>
          <Input type='text' name='tempDestino' value={formData.tempDestino} onChange={handleInputChange} />

          <h2>Inspección de Transporte</h2>
          <label>Limpio, libre de malos olores: </label>
          <Input type='text' name='limpio' value={formData.limpio} onChange={handleInputChange} />

          <label>Caja cerrada, en buen estado: </label>
          <Input type='text' name='cajaCerrada' value={formData.cajaCerrada} onChange={handleInputChange} />

          <label>Lona en buen estado: </label>
          <Input type='text' name='lona' value={formData.lona} onChange={handleInputChange} />

          <label>Libre de fauna nociva: </label>
          <Input type='text' name='fauna' value={formData.fauna} onChange={handleInputChange} />

          <label>Carga en buen estado: </label>
          <Input type='text' name='carga' value={formData.carga} onChange={handleInputChange} />

          <label>Seguridad de carga: </label>
          <Input type='text' name='seguridadCarga' value={formData.seguridadCarga} onChange={handleInputChange} />

          <label>Sellado: </label>
          <Input type='text' name='sellado' value={formData.sellado} onChange={handleInputChange} />

          <label>Número de serie: </label>
          <Input type='text' name='numeroSerie' value={formData.numeroSerie} onChange={handleInputChange} />
        </div>
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <PDFViewer width='100%' height='100%'>
            <ActaPDF formData={formData} />
          </PDFViewer>
          <div style={{ padding: '10px', display: 'flex', justifyContent: 'center' }}>
            <PDFDownloadLink document={<ActaPDF formData={formData} />} fileName='acta_de_llegada.pdf'>
              <Button variant='primary'>Descargar PDF</Button>
            </PDFDownloadLink>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default ActaDeLlegada
