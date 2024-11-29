import React, { useState, useRef } from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink, Image } from '@react-pdf/renderer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Layout from '../components/Layout'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import SignatureCanvas from 'react-signature-canvas' // Importa SignatureCanvas
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Bold } from 'lucide-react'
import { WidthIcon } from '@radix-ui/react-icons'

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
  logo: {
    width: 100,
    height: 100,
    marginVertical: 10
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  inputLabel: { fontSize: 12, fontWeight: 'bold' },
  signatureCanvasContainer: { border: '1px solid #ccc', padding: '10px', marginTop: '20px' },
  table: {
    display: 'table',
    width: '100%',
    borderWidth: 2,
    borderColor: '#000',
    marginTop: 15 // Adding space between tables
  },
  tableRow: {
    flexDirection: 'row'
  },
  tableRow2:
  {
    flexDirection: 'row',
    width: '100'

  },
  tableColumn: {
    flexDirection: 'column',
    flex:1
  },
  cellLabel: {
    flex: 1,
    backgroundColor: '#ccc',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 3,
    fontSize: 7,
    textAlign:'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 1,
    width: '100%',
    fontWeight: 'bold',
    flexWrap: 'wrap' // Permite que el texto se ajuste a varias líneas si es necesario
  },
  cellValue: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
    fontSize: 8,
    paddingVertical: 7,

    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center' // Centra el contenido verticalmente
  },
  cellLabelWhite: {
    backgroundColor: '#FFFFFF', // Fondo blanco
    borderWidth: 1, // Borde de 1px
    borderColor: '#000', // Borde negro
    borderRadius: 3, // Bordes redondeados
    fontSize: 7, // Aumenté el tamaño de la fuente
    paddingVertical: 6, // Relleno vertical para darle espacio al texto
    paddingHorizontal: 20, // Relleno horizontal para
    fontWeight: 'bold', // Texto en negrita
    flex: 1,

    textAlign: 'center', // Centra el texto dentro de la celda
    flexWrap: 'wrap' // Permite que el texto se ajuste a varias líneas si es necesario
  },
  cellLabelOptimizade: {
    flex: 1.3,
    backgroundColor: '#ccc',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 3,
    fontSize: 10,
    paddingVertical: 1,
    paddingHorizontal: 1,
    width: '70%',
    fontWeight: 'bold',
    flexWrap: 'wrap' // Permite que el texto se ajuste a varias líneas si es necesario
  },
  newTableRow: {
    flexDirection: 'row', // Asegura que las celdas estén en línea
    justifyContent: 'space-between', // Espacia las celdas equitativamente
    alignItems: 'center', // Centra verticalmente los elementos en la fila
    marginVertical: 5 // Agrega separación entre filas

  }

})

const ActaPDF = ({ formData, firmaBase64 }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.logoSection}>
        {/* image */}
        <Image
          style={[styles.logo, { height: 60, width: 150 }]} // Ajusta el tamaño de la imagen según sea necesario
          src='/src/assets/images/LOGO.jpg'
        />
        <View style={{ alignItems: 'center' }}> {/* Centra los textos */}
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>ACTA DE DESCARGA</Text>
          <View style={{ alignItems: 'center', marginTop: 5 }}>
            <Text style={{ fontSize: 14 }}>F-I-CAL-02-01</Text>
            <Text style={{ fontSize: 14 }}>Rev.7 (08-12-2024)</Text>
          </View>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.cellLabel}>Fecha: </Text>
          <Text style={styles.cellValue}>{formData.fecha || ''}</Text>
          <Text style={[styles.cellLabel, { flex: 1.5 }]}>Inicio de verificación:</Text>
          <Text style={styles.cellValue}>{formData.inicioVerificacion || ''}</Text>
          <Text style={[styles.cellLabel, { flex: 1.5 }]}>Término de verificación:</Text>
          <Text style={styles.cellValue}>{formData.terminoVerificacion || ''}</Text>
          <Text style={styles.cellLabel}>O.C.: </Text>
          <Text style={styles.cellValue}>{formData.oc || ''}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.inputLabel}>Proveedor: {formData.proveedor}</Text>
          <Text style={styles.inputLabel}>O.C.: {formData.oc}</Text>
          <Text style={styles.inputLabel}>Factura: </Text>

        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cellLabel}>Especie:</Text>
          <Text style={styles.cellValue}>{formData.especie || ''}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.cellLabel, { flex: 0.2 }]}>Variedades:</Text>
          <Text style={styles.cellValue}>{formData.variedades || ''}</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.cellLabel}>Frío de descarga: {formData.frioDescarga}</Text>
          <Text style={styles.cellValue}>{formData.frioDescarga || ''}</Text>
          <Text style={styles.cellLabel}>Cajas recibidas: {formData.cajasRecibidas}</Text>
          <Text style={styles.cellValue}>{formData.cajasRecibidas || ''}</Text>
        </View>
      </View>

      {/* Tabla */}
      <View style={styles.table}>
        {/* Fila 1 */}
        <View style={styles.tableRow}>
          <Text style={styles.cellLabel}>LÍNEA TRANSPORTISTA</Text>
          <Text style={styles.cellValue}>{formData.lineaTransportista || ''}</Text>
        </View>
        {/* Fila 2 */}
        <View style={styles.tableRow}>
          <Text style={styles.cellLabel}>No. DE CONTENEDOR</Text>
          <Text style={styles.cellValue}>{formData.numeroContenedor || ''}</Text>
        </View>
        {/* Fila 3 */}
        <View style={styles.tableRow}>
          <Text style={styles.cellLabel}>PLACAS CAMIÓN</Text>
          <Text style={styles.cellValue}>{formData.placasCamion || ''}</Text>
        </View>
        {/* Fila 4 */}
        <View style={styles.tableRow}>
          <Text style={styles.cellLabel}>PLACAS CAJA</Text>
          <Text style={styles.cellValue}>{formData.placasCaja || ''}</Text>
        </View>
        {/* Fila 5 */}
        <View style={styles.tableRow}>
          <Text style={styles.cellLabel}>CHOFER</Text>
          <Text style={styles.cellValue}>{formData.chofer || ''}</Text>
        </View>
      </View>
      <View style={{ marginBottom: 20 }} />

      {/* Tabla */}

      <View style={{ marginBottom: 20 }} />

      <View style={{ width: '100%' }}>
      <View style={styles.tableRow}>
                   <Text ></Text>
                   <Text style={{width:'53.5%'}}></Text>
                   
                   <Text style={styles.cellLabelWhite}>Observaciones</Text>
                   
                </View>

        <View style={styles.tableRow}>
          
          <Text style={[styles.cellLabel, { width: '100%' }]}>Condiciones de transporte:</Text>
          <View style={{ width: '70%' }}>

            <View style={styles.tableRow}>
            <View style={{flex:1}}>
          
                <View style={styles.tableRow}>
                   <Text style={styles.cellLabelWhite}>Temperatura del set point:</Text>
                   <Text style={styles.cellLabelWhite}></Text>
                   
                   <Text style={styles.cellLabelWhite}></Text>
                   
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.cellLabelWhite}>Temperatura de pantallat:</Text>
                  <Text style={styles.cellLabelWhite}></Text>
                  <Text style={styles.cellLabelWhite}></Text>

                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabel,{flex:0.20} ]}></Text>
                  <Text style={[styles.cellLabel,{flex:0.20} ]}>cumple</Text>
                  <Text style={[styles.cellLabel,{flex:0.20} ]}>no cumple</Text>
                  
                  <Text style={[styles.cellLabel,{flex:0.40} ]}>observaciones</Text>

                </View>
                {/*concatenacion*/}
                <View style={styles.tableRow}>
                    <Text style={[styles.cellLabelWhite,{flex:1.5} ]}>Termografo:</Text>

                    <View style={{flex:2}}>
                        <Text style={styles.cellLabelWhite}></Text>
                        <Text style={styles.cellLabelWhite}></Text>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={styles.cellLabelWhite}></Text>
                        <Text style={styles.cellLabelWhite}></Text>
                    </View>
                    

                    <View style={{flex:2}}>
                    <Text style={styles.cellLabelWhite}>Origen</Text>
                    <Text style={styles.cellLabelWhite}>Destino:</Text>
                    

                    </View>
                      <View style={{flex:2}}>
                        <Text style={styles.cellLabelWhite}></Text>
                        <Text style={styles.cellLabelWhite}></Text>
                      </View>
                    </View>

                    <View style={styles.tableRow}>
                        <Text style={[styles.cellLabelWhite,{flex:0.7} ]}>Limpio,libre de malos olores:</Text>
                        <Text style={[styles.cellLabelWhite,{flex:0.4} ]}></Text>
                        <Text style={[styles.cellLabelWhite,{flex:0.4} ]}></Text>
                        <Text style={[styles.cellLabelWhite,{flex:1.3} ]}></Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={[styles.cellLabelWhite,{flex:0.7} ]}>Caja cerrada , en buen estado(sin hoyos o endiduras ):</Text>
                        <Text style={[styles.cellLabelWhite,{flex:0.4} ]}></Text>
                        <Text style={[styles.cellLabelWhite,{flex:0.4} ]}></Text>
                        <Text style={[styles.cellLabelWhite,{flex:1.3} ]}></Text>
                    </View>
                    
                    <View style={styles.tableRow}>
                        <Text style={[styles.cellLabelWhite,{flex:0.7} ]}>Lona en buen estado:</Text>
                        <Text style={[styles.cellLabelWhite,{flex:0.4} ]}></Text>
                        <Text style={[styles.cellLabelWhite,{flex:0.4} ]}></Text>
                        <Text style={[styles.cellLabelWhite,{flex:1.3} ]}></Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={[styles.cellLabelWhite,{flex:0.7} ]}>Libre de fauna nociva:</Text>
                        <Text style={[styles.cellLabelWhite,{flex:0.4} ]}></Text>
                        <Text style={[styles.cellLabelWhite,{flex:0.4} ]}></Text>
                        <Text style={[styles.cellLabelWhite,{flex:1.3} ]}></Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={[styles.cellLabelWhite,{flex:0.7} ]}>Carga en buen estado:</Text>
                        <Text style={[styles.cellLabelWhite,{flex:0.4} ]}></Text>
                        <Text style={[styles.cellLabelWhite,{flex:0.4} ]}></Text>
                        <Text style={[styles.cellLabelWhite,{flex:1.3} ]}></Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={[styles.cellLabelWhite,{flex:0.7} ]}>seguridad de carga</Text>
                        <Text style={[styles.cellLabelWhite,{flex:0.4} ]}></Text>
                        <Text style={[styles.cellLabelWhite,{flex:0.4} ]}></Text>
                        <Text style={[styles.cellLabelWhite,{flex:1.3} ]}></Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={[styles.cellLabelWhite,{flex:0.7} ]}>sellado:</Text>
                        <Text style={[styles.cellLabelWhite,{flex:0.4} ]}></Text>
                        <Text style={[styles.cellLabelWhite,{flex:0.4} ]}></Text>
                        <Text style={[styles.cellLabelWhite,{flex:1.3} ]}></Text>
                    </View>
                   
                 
                     </View>
                    </View>
           

          </View>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cellLabel}>Placas caja:</Text>
          <View style={{ width: '70%' }}>
              <View style={styles.tableRow}> 
                <Text style={[styles.cellLabelWhite,{flex:0.7} ]}>Hay tarimas dañadas :</Text>
                <Text style={[styles.cellLabelWhite,{flex:0.4} ]}>SI</Text>
                        <Text style={[styles.cellLabelWhite,{flex:0.4} ]}>NO</Text>
                        <Text style={[styles.cellLabelWhite,{flex:1.3} ]}>#</Text>

              </View>
              <View style={styles.tableRow}> 
                <Text style={[styles.cellLabelWhite,{flex:0.7} ]}>Cajas identificadas :</Text>
                <Text style={[styles.cellLabelWhite,{flex:0.4} ]}>SI</Text>
                        <Text style={[styles.cellLabelWhite,{flex:0.4} ]}>NO</Text>
                        <Text style={[styles.cellLabelWhite,{flex:1.3} ]}>#</Text>

              </View>
              <View style={styles.tableRow}> 
                <Text style={[styles.cellLabelWhite,{flex:0.7} ]}>Cajas dañadas por maniobra:</Text>
                <Text style={[styles.cellLabelWhite,{flex:0.4} ]}>SI</Text>
                        <Text style={[styles.cellLabelWhite,{flex:0.4} ]}>NO</Text>
                        <Text style={[styles.cellLabelWhite,{flex:1.3} ]}>#</Text>

              </View>
          </View>
      
        </View>
      </View>
      <View style={{ marginBottom: 20 }} />

      <View style={[styles.tableRow, { marginBottom: 15, width: '100%' }]}>
        <View style={[styles.tableHeaderCell, { width: '25%' }]}>
          <Text style={styles.cellLabel}>TEMPERATURA DE PULPA</Text>
          <Text style={styles.cellValue}>A</Text>
          <Text style={styles.cellValue}>M</Text>
          <Text style={styles.cellValue}>B</Text>
        </View>
        <View style={[styles.tableHeaderCell, { width: '10%' }]}>
          <Text style={styles.cellLabel}>PUERTA</Text>
          <Text style={styles.cellValue}>{formData.puertaA}</Text>
          <Text style={styles.cellValue}>{formData.puertaM}</Text>
          <Text style={styles.cellValue}>{formData.puertaB}</Text>
        </View>
        <View style={[styles.tableHeaderCell, { width: '10%' }]}>
          <Text style={styles.cellLabel}>MEDIO</Text>
          <Text style={styles.cellValue}>{formData.medioA}</Text>
          <Text style={styles.cellValue}>{formData.medioM}</Text>
          <Text style={styles.cellValue}>{formData.medioB}</Text>
        </View>
        <View style={[styles.tableHeaderCell, { width: '10%' }]}>
          <Text style={styles.cellLabel}>FONDO</Text>
          <Text style={styles.cellValue}>{formData.fondoA}</Text>
          <Text style={styles.cellValue}>{formData.fondoM}</Text>
          <Text style={styles.cellValue}>{formData.fondoB}</Text>
        </View>
        <View style={[styles.tableHeaderCell, { width: '30%' }]}>
          <Text style={styles.cellLabel}>RANGO DE TEMPERATURA</Text>
          <View style={styles.tableRow}>
            <Text style={styles.cellValue}>Min:{formData.fondoM}</Text>
            <Text style={styles.cellValue}>Max:{formData.fondoB}</Text>
          </View>

        </View>
        <View style={[styles.tableHeaderCell, { width: '30%' }]}>
          <Text style={styles.cellLabel}>IDEAL</Text>
          <Text style={styles.cellValue}>Limpio</Text>
        </View>
      </View>

      <View style={[styles.tableRow, { marginBottom: 15 }]}>
        {/* Parte en negritas y más grande */}
        <Text style={[styles.cellLabel, { flex: 0.85, fontSize: 11, fontWeight: 'bold' }]}>
          Resultados de la Investigación{'\n'}

          <Text style={{ fontSize: 6 }}>
            (PRODUCTO DAÑADO DESEMPLEADO SE ENVIAN A PISO O SE ARREGLAN)
          </Text>
        </Text>
        <Text style={styles.cellValue}>{formData.resultadosInv || ''}</Text>
      </View>

      <View style={[styles.tableRow, { marginBottom: 15, width: '100%'  }]}>
        
        <View style={[styles.tableHeaderCell, { width: '100%' }]}>

        <Text style={[styles.cellLabel, { fontSize: 10, fontWeight: 'bold', paddingVertical:20 }]}>Hago constar que estoy de acuerdo con lo verificado y registrado en el presente documento</Text>
          

            <View style={styles.tableRow}>
                <Text style={[styles.cellLabel,{width:'12%',textAlign:'center', fontSize:10, height:200 }]}> Verifico descarga{'\n'} (Inspector de Calidad)</Text>
                <View style={{width:'38%'}}> 
                  <Text style={[styles.cellValue,{flex:0.3} ]}>Nombre:{}</Text>
                  
                  <View style={[styles.cellValue,{} ]}>
                    <Text style={[styles.inputLabel,{paddingBottom:10} ]}>Firma:</Text>
                    {firmaBase64 && (
                      <Image src={firmaBase64} style={{ width: 200, height: 150 }} />
                    )}

                  </View>
                </View>
                <Text style={[styles.cellLabel,{width:'12%', fontSize:10} ]}> Chofer</Text>
                <View style={{width:'38%'} }> 
                  <Text style={[styles.cellValue,{flex:0.3} ]}>Nombre:{formData.fondoM}</Text>
                  <View style={[styles.cellValue,{}]}>
                    <Text style={[styles.inputLabel,{paddingBottom:10} ]}>Firma:</Text>
                    {firmaBase64 && (
                      <Image src={firmaBase64} style={{ width: 200, height: 150  }} />
                    )}

                  </View>
                </View>
            </View>
        </View>
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
    numeroSerie: '',
    resultadosInv: ''
  })
  const signaturePad = useRef(null)

  const [firmaBase64, setFirmaBase64] = useState(null)

  const signaturePadRef = useRef<any>(null) // Refs para el signature pad

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const clearSignature = () => {
    signaturePadRef.current.clear()
    setFirmaBase64(null)
  }

  const saveSignature = () => {
    const dataUrl = signaturePadRef.current.toDataURL()
    setFirmaBase64(dataUrl)
  }

  return (
    <Layout>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel defaultSize={50}>
          <div style={{ padding: '20px' }}>
            <h1>Acta de Llegada</h1>

            {/* Formulario con campos de entrada */}
            <h2 />

            <Accordion type='single' collapsible>
              <AccordionItem value='item-1'>
                <AccordionTrigger>Fecha y Verificación</AccordionTrigger>
                <AccordionContent>
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type='single' collapsible>
              <AccordionItem value='item-2'>
                <AccordionTrigger>Transporte</AccordionTrigger>
                <AccordionContent>
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type='single' collapsible>
              <AccordionItem value='item-2'>
                <AccordionTrigger>Condiciones de Transporte</AccordionTrigger>
                <AccordionContent>
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type='single' collapsible>
              <AccordionItem value='item-2'>
                <AccordionTrigger>Inspección de Transporte</AccordionTrigger>
                <AccordionContent>
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

                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <h2>Firma del Responsable</h2>
            <div className={styles.signatureCanvasContainer}>
              <SignatureCanvas
                ref={signaturePadRef}
                penColor='black'
                canvasProps={{ width: 500, height: 200, className: 'signature-canvas' }}
              />
            </div>
            <Button onClick={clearSignature}>Limpiar Firma</Button>
            <Button onClick={saveSignature}>Guardar Firma</Button>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <PDFViewer width='100%' height='100%'>
              <ActaPDF formData={formData} firmaBase64={firmaBase64} />
            </PDFViewer>
            <div style={{ padding: '10px', display: 'flex', justifyContent: 'center' }}>
              <PDFDownloadLink document={<ActaPDF formData={formData} firmaBase64={firmaBase64} />} fileName='acta_de_llegada.pdf'>
                <Button variant='primary'>Descargar PDF</Button>
              </PDFDownloadLink>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Layout>
  )
}

export default ActaDeLlegada
