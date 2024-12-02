import React, { useState, useRef,useEffect  } from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink, Image, Font } from '@react-pdf/renderer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Layout from '../components/Layout'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import SignatureCanvas from 'react-signature-canvas' 
import { IconCheck } from '@tabler/icons-react'
import { Accordion,  AccordionContent,  AccordionItem,  AccordionTrigger} from '@/components/ui/accordion'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Bold } from 'lucide-react'
import { WidthIcon } from '@radix-ui/react-icons'

import GothamNarrowMedium from '../../public/fonts/GothamNarrow-Medium.otf'

// import { InputNumber } from 'primereact/inputnumber';
// import '../App.css';

Font.register({
  family: 'GothamNarrow',
  src: GothamNarrowMedium,
});

const styles = StyleSheet.create({
  page: { padding: 30 },
  logoSection: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },

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
  inputLabel: { fontSize: 12, fontWeight: 'bold',fontFamily:'GothamNarrow'  },
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
    flex: 1
  },
  cellLabel: {
    flex: 1,
    backgroundColor: '#ccc',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 3,
    fontSize: 12,
    textAlign: 'center',
    justifyContent: 'center',
    paddingHorizontal: 1,
    paddingVertical: 1,  // Ajuste para mejor separación
    width: '100%',       // Asegura que ocupe el 100% del espacio disponible
    fontFamily: 'GothamNarrow',
    flexWrap: 'wrap',    // Permite que el texto se envuelva si no cabe
    overflow: 'hidden',  // Evita que el texto desborde el contenedor
  },
  cellValue: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
    fontSize: 8,
    paddingVertical: 7,

    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center',fontFamily:'GothamNarrow'  // Centra el contenido verticalmente
  },
  cellLabelWhite: {
    backgroundColor: '#FFFFFF', // Fondo blanco
    borderWidth: 1, // Borde de 1px
    borderColor: '#000', // Borde negro
    borderRadius: 3, // Bordes redondeados
    fontSize: 10, // Aumenté el tamaño de la fuente
    paddingVertical:10,
    paddingHorizontal: 20, // Relleno horizontal para
    fontWeight: 'bold', // Texto en negrita
    flex: 1,

    textAlign: 'center', // Centra el texto dentro de la celda
    flexWrap: 'wrap',fontFamily:'GothamNarrow'  // Permite que el texto se ajuste a varias líneas si es necesario
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
    flexWrap: 'wrap',fontFamily:'GothamNarrow'  // Permite que el texto se ajuste a varias líneas si es necesario
  },
  newTableRow: {
    flexDirection: 'row', // Asegura que las celdas estén en línea
    justifyContent: 'space-between', // Espacia las celdas equitativamente
    alignItems: 'center', // Centra verticalmente los elementos en la fila
    marginVertical: 5 ,
    fontFamily:'GothamNarrow' // Agrega separación entre filas

  }

})

const ActaPDF = ({ formData, firmaBase64Inspector, firmaBase64Chofer }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.logoSection}>
        {/* image */}
        
        <Image
          style={[styles.logo, { height: 60, width: 150 }]} // Ajusta el tamaño de la imagen según sea necesario
          src='/src/assets/images/LOGO.jpg'
        />
        <View style={{ alignItems: 'center' }}> {/* Centra los textos */}
          <Text style={{ fontSize: 24, fontWeight: 'bold',fontFamily:'GothamNarrow' }}>ACTA DE DESCARGA</Text>
          <View style={{ alignItems: 'center', marginTop: 5 }}>
            <Text style={{ fontSize: 14,fontFamily:'GothamNarrow'  }}>F-I-CAL-02-01</Text>
            <Text style={{ fontSize: 14,fontFamily:'GothamNarrow'  }}>Rev.7 (08-12-2024)</Text>
          </View>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.cellLabel}>Fecha: </Text>
          <Text style={styles.cellValue}>{formData.fecha || ''}</Text>
          <Text style={[styles.cellLabel, { flex: 1.5 }]}>Inicio de{'\n'}verificación:</Text>
          <Text style={styles.cellValue}>{formData.inicioVerificacion || ''}</Text>
          <Text style={[styles.cellLabel, { flex: 1.5 }]}>Término de verificación:</Text>
          <Text style={styles.cellValue}>{formData.terminoVerificacion || ''}</Text>
          <Text style={styles.cellLabel}>O.C.: </Text>
          <Text style={styles.cellValue}>{formData.oc || ''}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.cellLabel, { flex: 0.8 }]}>Proveedor:</Text>
          <Text style={styles.cellValue}>{formData.proveedor || ''}</Text>
          <Text style={styles.cellLabel}>Origen:</Text>
          <Text style={styles.cellValue}>{formData.origen || ''}</Text>
          <Text style={styles.cellLabel}>Factura: </Text>
          <Text style={styles.cellValue}>{formData.factura || ''}</Text>

        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.cellLabel, { flex: 0.2 }]}>Especie:</Text>
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
          <Text style={[styles.cellLabel, { flex: 0.35 }]}>Línea Transportista</Text>
          <Text style={styles.cellValue}>{formData.lineaTransportista || ''}</Text>
        </View>
        {/* Fila 2 */}
        <View style={styles.tableRow}>
          <Text style={[styles.cellLabel, { flex: 0.35 }]}>No. de Contenedor</Text>
          <Text style={styles.cellValue}>{formData.numeroContenedor || ''}</Text>
        </View>
        {/* Fila 3 */}
        <View style={styles.tableRow}>
          <Text style={[styles.cellLabel, { flex: 0.35 }]}>Placas de Camión</Text>
          <Text style={styles.cellValue}>{formData.placasCamion || ''}</Text>
        </View>
        {/* Fila 4 */}
        <View style={styles.tableRow}>
          <Text style={[styles.cellLabel, { flex: 0.35 }]}>Placas Caja</Text>
          <Text style={styles.cellValue}>{formData.placasCaja || ''}</Text>
        </View>
        {/* Fila 5 */}
        <View style={styles.tableRow}>
          <Text style={[styles.cellLabel, { flex: 0.35 }]}>Chofer</Text>
          <Text style={styles.cellValue}>{formData.chofer || ''}</Text>
        </View>
      </View>
      <View style={{ marginBottom: 20 }} />

      

      <View style={{ width: '100%' }}>
       

          <Text style={[styles.cellLabel, { width: '100%' }]}>Condiciones de transporte:</Text>
          
          <View style={styles.tableRow}>
          <Text />
          <Text style={{ width: '24%' }} />

          <Text style={styles.cellLabelWhite}>Observaciones</Text>

        </View>
          <View style={{ width: '100%' }}>

            <View style={styles.tableRow}>
              <View style={{ flex: 1 }}>

                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.20}]}>Temperatura del set point:</Text>
                  <Text style={[styles.cellValue, { flex: 0.40}]}>{formData.tempSetPoint || ''}</Text>

                  <Text style={[styles.cellLabelWhite, { flex: 0.40}]}>{formData.observacionesSetPoint || ''}</Text>

                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.20}]}>Temperatura de pantallat:</Text>
                  <Text style={[styles.cellValue, { flex: 0.40}]}>{formData.tempPantalla || ''}</Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.40}]}>{formData.observacionesPantalla || ''}</Text>

                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabel, { flex: 0.25}]} />
                  <Text style={[styles.cellLabel, { flex: 0.17 }]}>cumple</Text>
                  <Text style={[styles.cellLabel, { flex: 0.18 }]}>no cumple</Text>

                  <Text style={[styles.cellLabel, { flex: 0.40 }]}>observaciones</Text>

                </View>
                {/* concatenacion */}
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 1.7 }]}>Termografo:</Text>

                  <View style={{ flex: 1.8 }}>

                  <Text style={styles.cellLabelWhite}>{formData.option === 'Si' ? 'SI' : ''}</Text>
                    <Text style={styles.cellLabelWhite} >{formData.option2 === 'Si' ? 'SI' : ''}</Text>
                  </View>
                  <View style={{ flex: 1.8 }}>
                    <Text style={styles.cellLabelWhite}>{formData.option === 'Si' ? 'Si ' : ''}</Text>
                    <Text style={styles.cellLabelWhite}>{formData.option2 === 'No' ? 'No' : ''}</Text>
                  </View>

                  <View style={{ flex: 2 }}>
                    <Text style={styles.cellLabelWhite}>Origen</Text>
       
                    <Text style={styles.cellLabelWhite}>Destino:</Text>

                  </View>
                  <View style={{ flex: 2 }}>
                    <Text style={styles.cellLabelWhite}>{formData.tempOrigen || ''}</Text>
                    <Text style={styles.cellLabelWhite}>{formData.tempDestino || ''}</Text>
                  </View>
                </View>

                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>Limpio,libre de malos olores:</Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]} >{formData.optionLimpio==='Si'?"Si":""}</Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]} >{formData.optionLimpio==='No'?"No":""}</Text>
                  <Text style={[styles.cellLabelWhite, { flex: 1.3 }]} > {formData.limpio|| '' }</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>Caja cerrada , en buen estado(sin hoyos o endiduras ):</Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]} >{formData.optionCaja==='Si'?"Si":""}</Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]} >{formData.optionCaja==='No'?"No":""}</Text>
                  <Text style={[styles.cellLabelWhite, { flex: 1.3 }]} >{formData.cajaCerrada|| ''}</Text>
                </View>

                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>Lona en buen estado:</Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]} >{formData.optionLona==='Si'?"Si":""}</Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]} >{formData.optionLona==='No'?"No":""}</Text>
                  <Text style={[styles.cellLabelWhite, { flex: 1.3 }]} >{formData.lona|| '' }</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>Libre de fauna nociva:</Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]} >{formData.optionLibre==='Si'?"Si":""}</Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]} >{formData.optionLibre==='No'?"No":""}</Text>
                  <Text style={[styles.cellLabelWhite, { flex: 1.3 }]} >{formData.fauna|| '' }</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>Carga en buen estado:</Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]} >{formData.optionCarga==='Si'?"Si":""}</Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]} >{formData.optionCarga==='No'?"No":""}</Text>
                  <Text style={[styles.cellLabelWhite, { flex: 1.3 }]} >{formData.carga|| '' }</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>seguridad de carga</Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]} >{formData.optionSeguridad==='Si'?"Si":""}</Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]} >{formData.optionSeguridad==='No'?"No":""}</Text>
                  <Text style={[styles.cellLabelWhite, { flex: 1.3 }]} >{formData.seguridadCarga|| '' }</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>sellado:</Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]} >{formData.optionSellado==='Si'?"Si":""}</Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]} >{formData.optionSellado==='No'?"No":""}</Text>
                  <Text style={[styles.cellLabelWhite, { flex: 1.3 }]} >{formData.sellado|| '' }</Text>
                </View>

              </View>
            </View>

          </View>
      
      
          <Text style={styles.cellLabel}>Placas caja:</Text>
          <View style={{ width: '100%' }}>
            <View style={styles.tableRow}>
              <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>Hay tarimas dañadas :</Text>
              <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>SI</Text>
              <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>NO</Text>
              <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>#</Text>

            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>Cajas identificadas :</Text>
              <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>SI</Text>
              <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>NO</Text>
              <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>#</Text>

            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>Cajas dañadas por maniobra:</Text>
              <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}> ✔️ </Text>

              <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>NO</Text>
              <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>#</Text>

            </View>
          </View>

     
      </View>
      <View style={{ marginBottom: 20 }} />

      <View style={[styles.tableRow, { marginBottom: 15, width: '100%' }]}>
        <View style={[ {height:100, width: '26%' }]}>
          <Text style={[styles.cellLabel,{} ] }>Temperatura de pulpa</Text>
          <Text style={styles.cellValue}>A</Text>
          <Text style={styles.cellValue}>M</Text>
          <Text style={styles.cellValue}>B</Text>
        </View>
        <View style={[ { width: '10%' }]}>
          <Text style={[styles.cellLabel,{height:20} ] }>Puerta</Text>
          <Text style={styles.cellValue}>{formData.tempAPuerta}</Text>
          <Text style={styles.cellValue}>{formData.tempMPuerta}</Text>
          <Text style={styles.cellValue}>{formData.tempBPuerta}</Text>
        </View>
        <View style={[ { width: '10%' }]}>
          <Text style={[styles.cellLabel,{height:20} ] }>Medio</Text>
          <Text style={styles.cellValue}>{formData.tempAMedio}</Text>
          <Text style={styles.cellValue}>{formData.tempMMedio}</Text>
          <Text style={styles.cellValue}>{formData.tempBMedio}</Text>
        </View>
        <View style={[ { width: '10%' }]}>
          <Text style={[styles.cellLabel,{height:20} ] }>Fondo</Text>
          <Text style={styles.cellValue}>{formData.tempAFondo}</Text>
          <Text style={styles.cellValue}>{formData.tempMFondo}</Text>
          <Text style={styles.cellValue}>{formData.tempBFondo}</Text>
        </View>
        <View style={[ { width: '30%' }]}>
          <Text style={[styles.cellLabel,{height:20} ] }>Rango de Temperatura</Text>
          <View style={styles.tableRow}>
            <Text style={styles.cellValue}>Min:{formData.tempMin}</Text>
            <Text style={styles.cellValue}>Max:{formData.tempMax}</Text>
          </View>

        </View>
        <View style={[ { width: '30%' }]}>
          <Text style={styles.cellLabel}>Ideal</Text>
          <Text style={styles.cellValue}> {formData.tempIdeal}°C </Text>
        </View>
      </View>

      <View style={[styles.tableRow, { marginBottom: 15 }]}>
        {/* Parte en negritas y más grande */}
        <Text style={[styles.cellLabel, { flex: 0.35, fontSize: 11, fontWeight: 'bold' }]}>
          Resultados de la {'\n'}Investigación{'\n'}

          <Text style={{ fontSize: 6 }}>
            (PRODUCTO DAÑADO DESEMPLEADO SE ENVIAN A PISO O SE ARREGLAN)
          </Text>
        </Text>
        <Text style={styles.cellValue}>{formData.resultadosInv || ''}</Text>
      
      </View>

      <Text style={[styles.cellLabel, {flex:0.15, fontSize:14}]}>Hago constar que estoy de acuerdo con lo verificado y registrado en el presente{'\n'}documento</Text>
      
      <View >
      
    
          <View style={styles.tableRow}>
              <Text style={[styles.cellLabel,{width:'12%',textAlign:'center', fontSize:10, height:200 }]}> Verifico descarga{'\n'} (Inspector de Calidad)</Text>
              <View style={{width:'38%'}}> 
                <Text style={[styles.cellValue,{flex:0.3} ]}>Nombre:{formData.nombreInspector}</Text>
                
                <View style={[styles.cellValue,{} ]}>
                  <Text style={[styles.inputLabel,{paddingBottom:10} ]}>Firma:</Text>
                  {firmaBase64Inspector && (
                    <Image src={firmaBase64Inspector} style={{ width: 200, height: 150 }} />
                  )}

                </View>
              </View>
              <Text style={[styles.cellLabel,{width:'12%', fontSize:10} ]}> Chofer</Text>
              <View style={{width:'38%'} }> 
                <Text style={[styles.cellValue,{flex:0.3} ]}>Nombre:{formData.nombreChofer}</Text>
                <View style={[styles.cellValue,{}]}>
                  <Text style={[styles.inputLabel,{paddingBottom:10} ]}>Firma:</Text>
                  {firmaBase64Chofer && (
                    <Image src={firmaBase64Chofer} style={{ width: 200, height: 150  }} />
                  )}

                </View>
              </View>
          </View>
      </View>


      <Text style={[styles.cellLabelWhite, { flex: 0.1}]}>Limpio,libre de malos olores:</Text>
      {formData.image1 && (
    <Image
      source={{ uri: formData.image1 }} 
      style={{ width: '200px', marginTop: '20px' }}
    
    />
  )}
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
    resultadosInv: '',
    tempAPuerta: '',
    tempAMedio: '',
    tempAFondo: '',
    tempMPuerta: '',
    tempMMedio: '',
    tempMFondo: '',
    tempBPuerta: '',
    tempBMedio: '',
    tempBFondo: '',
    tempMax: '',
    tempMin: '',
    tempIdeal: '',
    nombreInspector: '',
    nombreChofer: '',
    option: '',
    option2:'',
    optionLimpio:'',
    optionCaja:'',
    optionLona:'',
    optionLibre:'',
    optionCarga:'',
    optionSeguridad:'',
    optionSellado:'',
    image1:''
  })

  const [firmaBase64Inspector, setFirmaBase64Inspector] = useState(null)
  const [firmaBase64Chofer, setFirmaBase64Chofer] = useState(null)

  const [temperatureRange, setTemperatureRange] = useState(null)

  const signaturePadInspector = useRef<any>(null) // Refs para el signature pad
  const signaturePadChofer = useRef<any>(null)
  const [image, setImage] = useState(null);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Obtener el primer archivo seleccionado
    if (file) {
      // Crear una URL temporal para el archivo seleccionado
      var  imageUrl = URL.createObjectURL(file);
      setImage(imageUrl); // Guardar la URL temporal de la imagen en el estado
      formData.image1=imageUrl
    }
  };
  

  useEffect(() => {
    const allTemperatures = [
      formData.tempAPuerta, formData.tempAMedio, formData.tempAFondo,
      formData.tempMPuerta, formData.tempMMedio, formData.tempMFondo,
      formData.tempBPuerta, formData.tempBMedio, formData.tempBFondo
    ].map(temp => Number(temp) || null) // Convierte a número o `null` si no es un número
      .filter(temp => temp !== null) /// Aseguramos que sean números válidos

    // Si no hay temperaturas válidas, no hacer nada
    if (allTemperatures.length === 0) return

    const maxTemp = Math.max(...allTemperatures)
    const minTemp = Math.min(...allTemperatures)

    // Actualizar el estado con los valores de tempMax y tempMin
    setFormData(prevData => ({
      ...prevData,
      tempMax: maxTemp,
      tempMin: minTemp
    }))

    // Actualizar el rango
    setTemperatureRange({ max: maxTemp, min: minTemp })
  }, [
    formData.tempAPuerta, formData.tempAMedio, formData.tempAFondo,
    formData.tempMPuerta, formData.tempMMedio, formData.tempMFondo,
    formData.tempBPuerta, formData.tempBMedio, formData.tempBFondo
  ])

  // Función para limpiar ambas firmas
  const clearSignature = () => {
    if (signaturePadInspector.current) {
      signaturePadInspector.current.clear()
    }
    setFirmaBase64Inspector(null) // Estado para la firma del inspector

    if (signaturePadChofer.current) {
      signaturePadChofer.current.clear()
    }
    setFirmaBase64Chofer(null) // Estado para la firma del chofer
  }

  // Función para guardar ambas firmas
  const saveSignature = () => {
    if (signaturePadInspector.current) {
      const dataUrlInspector = signaturePadInspector.current.toDataURL()
      setFirmaBase64Inspector(dataUrlInspector) // Guarda la firma del inspector
    }

    if (signaturePadChofer.current) {
      const dataUrlChofer = signaturePadChofer.current.toDataURL()
      setFirmaBase64Chofer(dataUrlChofer) // Guarda la firma del chofer
    }
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
                  <label>Inicio de verificación:  </label>
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

                  <div style={{ marginBottom: 10 }}>
                    <label>Termógrafo: </label>
                    <Input type='text' name='termografo' value={formData.termografo} onChange={handleInputChange} />
                  </div>

                  <div style={{ marginBottom: 30 }}>
                    <label>Cumple termografo  </label>

                    <div style={{ marginBottom: 20 }}>
                 
                    <Button  style={{ flex: 5, marginRight: "10px" }} name="option" value="Si"onClick={handleInputChange}>
                      Sí
                    </Button>
                    <Button   name="option" value="No"onClick={handleInputChange}>
                      No
                    </Button>
                  </div>
                  </div>

                  <div style={{ marginBottom: 30 }}>
                    <label>Cumple termografo2  </label>

                    <div style={{ marginBottom: 20 }}>
                 
                    <Button  style={{ flex: 5, marginRight: "10px" }} name="option2" value="Si"onClick={handleInputChange}>
                      Sí
                    </Button>
                    <Button   name="option2" value="No"onClick={handleInputChange}>
                      No
                    </Button>
                  </div>
                  </div>

                  <div style={{ marginBottom: 10 }}>
                    <label>Temperatura de origen: </label>
                    <Input type='text' name='tempOrigen' value={formData.tempOrigen} onChange={handleInputChange} />
                  </div>

                  <label>Temperatura de destino: </label>
                  <Input type='text' name='tempDestino' value={formData.tempDestino} onChange={handleInputChange} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type='single' collapsible>
              <AccordionItem value='item-2'>
                <AccordionTrigger>Inspección de Transporte</AccordionTrigger>
                <AccordionContent>
                <div style={{ marginBottom: 30 }}>
                    <label>Cumple termografo  </label>
                    <div style={{ marginBottom: 20 }}>
                    <Button  style={{ flex: 5, marginRight: "10px" }} name="optionLimpio" value="Si"onClick={handleInputChange}> Sí </Button>
                    <Button   name="optionLimpio" value="No"onClick={handleInputChange}>  No </Button>
                  </div>
                 </div>

                  <label>Descripcion: </label>
                  
                  <Input type='text' name='limpio' value={formData.limpio} onChange={handleInputChange} />

                  <div style={{ marginBottom: 30 }}>
                    <label>Caja cerrada, en buen estado  </label>
                    <div style={{ marginBottom: 20 }}>
                    <Button  style={{ flex: 5, marginRight: "10px" }} name="optionCaja" value="Si"onClick={handleInputChange}> Sí </Button>
                    <Button   name="optionCaja" value="No"onClick={handleInputChange}>  No </Button>
                  </div>
                 </div>


                  <label>DEscription</label>
                  <Input type='text' name='cajaCerrada' value={formData.cajaCerrada} onChange={handleInputChange} />

                  <div style={{ marginBottom: 30 }}>
                    <label>Lona en buen estado:   </label>
                    <div style={{ marginBottom: 20 }}>
                    <Button  style={{ flex: 5, marginRight: "10px" }} name="optionLona" value="Si"onClick={handleInputChange}> Sí </Button>
                    <Button   name="optionLona" value="No"onClick={handleInputChange}>  No </Button>
                  </div>
                 </div>

                  <label>Descripcion</label>
                  <Input type='text' name='lona' value={formData.lona} onChange={handleInputChange} />

                  <div style={{ marginBottom: 30 }}>
                    <label>Libre de fauna nociva:   </label>
                    <div style={{ marginBottom: 20 }}>
                    <Button  style={{ flex: 5, marginRight: "10px" }} name="optionLibre" value="Si"onClick={handleInputChange}> Sí </Button>
                    <Button   name="optionLibre" value="No"onClick={handleInputChange}>  No </Button>
                  </div>
                 </div>
                  
                  

                  <label>DEscripcion: </label>
                  <Input type='text' name='fauna' value={formData.fauna} onChange={handleInputChange} />
                  
                  <div style={{ marginBottom: 30 }}>
                    <label>Carga en buen estado:  </label>
                    <div style={{ marginBottom: 20 }}>
                    <Button  style={{ flex: 5, marginRight: "10px" }} name="optionCarga" value="Si"onClick={handleInputChange}> Sí </Button>
                    <Button   name="optionCarga" value="No"onClick={handleInputChange}>  No </Button>
                  </div>
                 </div>
                  

                  <label>DEscripcion: </label>
                  <Input type='text' name='carga' value={formData.carga} onChange={handleInputChange} />

                  <div style={{ marginBottom: 30 }}>
                    <label>Seguridad de carga:  </label>
                    <div style={{ marginBottom: 20 }}>
                    <Button  style={{ flex: 5, marginRight: "10px" }} name="optionSeguridad" value="Si"onClick={handleInputChange}> Sí </Button>
                    <Button   name="optionSeguridad" value="No"onClick={handleInputChange}>  No </Button>
                  </div>
                 </div>
                  

                  <label>Descripcion: </label>
                  <Input type='text' name='seguridadCarga' value={formData.seguridadCarga} onChange={handleInputChange} />
         

                  <div style={{ marginBottom: 30 }}>
                    <label>Sellado:  </label>
                    <div style={{ marginBottom: 20 }}>
                    <Button  style={{ flex: 5, marginRight: "10px" }} name="optionSellado" value="Si"onClick={handleInputChange}> Sí </Button>
                    <Button   name="optionSellado" value="No"onClick={handleInputChange}>  No </Button>
                  </div>
                 </div> 
                 <label>Descripcion: </label>
                 <Input type='text' name='sellado' value={formData.sellado} onChange={handleInputChange} />

                 <div>
      <Button>
        <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
          Seleccionar Imagen
        </label>
      </Button>
      <input
        type="file"
        id="file-input"
        accept="image/*" // Solo imágenes
        style={{ display: 'none' }} // Ocultar el input real
        onChange={handleFileChange}
      />
      
      {image && <img src={image} alt="Selected" style={{ width: '300px', marginTop: '20px' }} />}
    </div>

                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type='single' collapsible>
              <AccordionItem value='item-2'>
                <AccordionTrigger>Temperatura de Pulpa</AccordionTrigger>
                <AccordionContent>
                <table>
                <thead>
                  <tr>
                    <th colspan="2"><h3>Puerta</h3></th>
                    <th ><h3>Medio</h3></th>
                    <th ><h3>Fondo</h3></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><label>A   </label></td>
                    {/* <td><InputNumber value={formData.tempAPuerta} prefix="&uarr; " suffix="℃" min={0} max={40} /></td> */}
                    <td><Input type='number' name='tempAPuerta' value={formData.tempAPuerta} onChange={(e) => { handleInputChange(e); calculateTemperatureRange(); }} /></td>
                    <td><Input type='number' name='tempAMedio' value={formData.tempAMedio} onChange={(e) => { handleInputChange(e); calculateTemperatureRange(); }} /></td>
                    <td><Input type='number' name='tempAFondo' value={formData.tempAFondo} onChange={(e) => { handleInputChange(e); calculateTemperatureRange(); }} /></td>
                  </tr>
                  <tr>
                    <td><label>M   </label></td>
                    <td><Input type='number' name='tempMPuerta' value={formData.tempMPuerta} onChange={(e) => { handleInputChange(e); calculateTemperatureRange(); }} /></td>
                    <td><Input type='number' name='tempMMedio' value={formData.tempMMedio} onChange={(e) => { handleInputChange(e); calculateTemperatureRange(); }} /></td>
                    <td><Input type='number' name='tempMFondo' value={formData.tempMFondo} onChange={(e) => { handleInputChange(e); calculateTemperatureRange(); }} /></td>
                  </tr>
                  <tr>
                    <td><label>B   </label></td>
                    <td><Input type='number' name='tempBPuerta' value={formData.tempBPuerta} onChange={(e) => { handleInputChange(e); calculateTemperatureRange(); }} /></td>
                    <td><Input type='number' name='tempBMedio' value={formData.tempBMedio} onChange={(e) => { handleInputChange(e); calculateTemperatureRange(); }} /></td>
                    <td><Input type='number' name='tempBFondo' value={formData.tempBFondo} onChange={(e) => { handleInputChange(e); calculateTemperatureRange(); }} /></td>
                  </tr>
                </tbody>
              </table>
              <div style={{paddingTop:10}}>

              <h3> <strong>Temperatura Ideal</strong></h3>
              <Select name="tempIdeal" onValueChange={(value) => handleInputChange({ target: { name: 'tempIdeal', value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una fruta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">Manzanas (4°C)</SelectItem>
                  <SelectItem value="7">Plátanos (7°C)</SelectItem>
                  <SelectItem value="1">Uvas (1°C)</SelectItem>
                  <SelectItem value="0">Fresas (0°C)</SelectItem>
                  <SelectItem value="-1">Mango (-1°C)</SelectItem>
                </SelectContent>
              </Select>
              </div>
              

                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <h2>Resultados de la Investigación</h2>
            <Input type='text' name='resultadosInv' value={formData.resultadosInv} onChange={handleInputChange} />

            <label>Nombre Inspector de Calidad: </label>
            <Input type='text' name='nombreInspector' value={formData.nombreInspector} onChange={handleInputChange} />
            <h2>Firma Inspector de Calidad</h2>
            <div className={styles.signatureCanvasContainer}>
              <SignatureCanvas
                ref={signaturePadInspector}
                penColor='black'
                canvasProps={{ width: 500, height: 200, className: 'signature-canvas' }}
              />
            </div>

            <label>Nombre Chofer: </label>
            <Input type='text' name='nombreChofer' value={formData.nombreChofer} onChange={handleInputChange} />
            <h2>Firma del Chofer</h2>
            <div className={styles.signatureCanvasContainer}>
              <SignatureCanvas
                ref={signaturePadChofer}
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
              <ActaPDF formData={formData} firmaBase64Inspector={firmaBase64Inspector} firmaBase64Chofer={firmaBase64Chofer} />
            </PDFViewer>
            <div style={{ padding: '10px', display: 'flex', justifyContent: 'center' }}>
              <PDFDownloadLink document={<ActaPDF formData={formData} firmaBase64Inspector={firmaBase64Inspector} />} fileName='acta_de_llegada.pdf'>
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
