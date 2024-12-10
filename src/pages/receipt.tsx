import { useState, useRef, useEffect } from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image, Font, pdf } from '@react-pdf/renderer'
import * as pdfjsLib from 'pdfjs-dist'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Layout from '../components/Layout'
import SignatureCanvas from 'react-signature-canvas'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import GothamNarrowMedium from '/fonts/GothamNarrow-Medium.otf'
import { fetchActas, insert } from '../../connections/querys'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@2.11.338/es5/build/pdf.worker.min.js'

Font.register({
  family: 'GothamNarrow',
  src: GothamNarrowMedium
})

const styles = StyleSheet.create({
  page: { padding: 20 },
  logoSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0
  },
  logo: {
    width: 100,
    height: 100,
    marginVertical: 5
  },
  inputLabel: { fontSize: 12, fontWeight: 'bold', fontFamily: 'GothamNarrow' },
  signatureCanvasContainer: {
    borderWidth: 1,
    borderColor: '#000',
    border: '1px solid #ccc',
    padding: '10px',
    marginTop: '20px'
  },
  table: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#000',
    marginTop: 4,
    height: 'auto'
  },
  tableRow: {
    flexDirection: 'row',
    height: 'auto'
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
    width: '100%', // Asegura que ocupe el 100% del espacio disponible
    fontFamily: 'GothamNarrow',
    flexWrap: 'wrap', // Permite que el texto se envuelva si no cabe
    overflow: 'hidden',
    height: 'auto'
  },
  cellValue: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    padding: 1,
    fontSize: 12,
    fontFamily: 'GothamNarrow',
    height: 'auto'
  },
  cellLabelWhite: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 3,
    fontSize: 10,
    paddingVertical: 6,
    paddingHorizontal: 3,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    flexWrap: 'wrap',
    fontFamily: 'GothamNarrow',
    minHeight: 20,
    height: 'auto'
  }
})

const ActaPDF = ({ formData, firmaBase64Inspector, firmaBase64Chofer, currentPage }) => (
  <Document>
    {currentPage === 1 && (

      <Page style={styles.page}>
        <View style={styles.logoSection}>
          {/* image */}

          <Image
             style={[styles.logo, { height: 60, width: 150 }]} // Ajusta el tamaño de la imagen según sea necesario
             src='/src/assets/images/LOGO.jpg'
           />
          <View style={{ alignItems: 'center' }}>
             {' '}
             <Text style={{ fontSize: 24, fontWeight: 'bold', fontFamily: 'GothamNarrow' }}>ACTA DE DESCARGA </Text>
             <View style={{ alignItems: 'center', marginTop: 5 }}>
            <Text style={{ fontSize: 14, fontFamily: 'GothamNarrow' }}>
              F-I-CAL-02-01
            </Text>
            <Text style={{ fontSize: 14, fontFamily: 'GothamNarrow' }}>
              Rev.7 (08-12-2024)
            </Text>
          </View>
           </View>
        </View>

<<<<<<< HEAD
        <View style={styles.table}>
          <View style={styles.tableRow}>
             <Text style={styles.cellLabel}>Fecha: </Text>
             <Text style={styles.cellValue}>{formData.fecha || ''}</Text>
             <Text style={[styles.cellLabel, { flex: 1.5 }]}>
            Inicio de{'\n'}verificación:
          </Text>
             <Text style={styles.cellValue}>
            {formData.inicioVerificacion || ''}
          </Text>
             <Text style={[styles.cellLabel, { flex: 1.5 }]}>
            Término de verificación:
          </Text>
             <Text style={styles.cellValue}>
            {formData.terminoVerificacion || ''}
          </Text>
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
             <Text style={styles.cellLabel}>Frío de descarga: </Text>
             <Text style={styles.cellValue}>{formData.frioDescarga || ''}</Text>
             <Text style={styles.cellLabel}>
            Cajas recibidas: {formData.cajasRecibidas}
          </Text>
             <Text style={styles.cellValue}>{formData.cajasRecibidas || ''}</Text>
           </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
             <Text style={[styles.cellLabel, { flex: 0.35 }]}>
            Línea Transportista
          </Text>
             <Text style={styles.cellValue}>
            {formData.lineaTransportista || ''}
          </Text>
           </View>
          <View style={styles.tableRow}>
             <Text style={[styles.cellLabel, { flex: 0.35 }]}>
            No. de Contenedor
          </Text>
             <Text style={styles.cellValue}>
            {formData.numeroContenedor || ''}
          </Text>
           </View>
          <View style={styles.tableRow}>
             <Text style={[styles.cellLabel, { flex: 0.35 }]}>
            Placas de Camión
          </Text>
             <Text style={styles.cellValue}>{formData.placasCamion || ''}</Text>
           </View>
          <View style={styles.tableRow}>
             <Text style={[styles.cellLabel, { flex: 0.35 }]}>Placas Caja</Text>
             <Text style={styles.cellValue}>{formData.placasCaja || ''}</Text>
           </View>
          <View style={styles.tableRow}>
             <Text style={[styles.cellLabel, { flex: 0.35 }]}>Chofer</Text>
             <Text style={styles.cellValue}>{formData.chofer || ''}</Text>
           </View>
        </View>
        <View style={{ marginBottom: 20 }} />

        <View style={{ width: '100%' }}>
          <Text style={[styles.cellLabel, { paddingVertical: 10, paddingTop: 1, width: '100%' }]}>
             Condiciones de transporte:
        </Text>

          <View style={styles.tableRow}>
             <Text style={{ width: '60%' }} />

             <Text style={styles.cellLabelWhite}>Observaciones</Text>
           </View>
          <View style={{ width: '100%', textAlign: 'center' }}>
             <View style={styles.tableRow}>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <View style={styles.tableRow}>
                <Text style={[styles.cellLabelWhite, { flex: 0.2 }]}>
                  Temperatura del set point:
                </Text>
                <Text style={[styles.cellValue, { flex: 0.4 }]}>
                  {'\n'}  {formData.tempSetPoint || ''}
                </Text>

                <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                  {formData.observacionesSetPoint || ''}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.cellLabelWhite, { flex: 0.2 }]}>
                  Temperatura de pantalla:
                </Text>
                <Text style={[styles.cellValue, { flex: 0.4 }]}>
                  {'\n'} {formData.tempPantalla || ''}
                </Text>
                <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                  {formData.observacionesPantalla || ''}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.cellLabel, { flex: 0.28 }]} />
                <Text style={[styles.cellLabel, { flex: 0.17 }]}>cumple</Text>
                <Text style={[styles.cellLabel, { flex: 0.17 }]}>
                  no cumple
                </Text>

                <Text style={[styles.cellLabel, { flex: 0.52 }]}>
                  observaciones
                </Text>
              </View>
              <View style={[styles.tableRow, { height: 'auto' }]}>
                <Text style={[styles.cellLabelWhite, { flex: 0.66 }]}>
                  Termografo:
                </Text>

                <View style={{ flex: 0.42 }}>
                  <Text style={styles.cellValue}>
                    {formData.option === 'Si' ? 'SI' : ''}
                  </Text>

                  <Text style={styles.cellValue}>
                    {formData.option2 === 'Si' ? 'SI' : ''}
                  </Text>
                </View>
                <View style={{ flex: 0.43 }}>
                  <Text style={styles.cellValue}>
                    {formData.option === 'No' ? 'No ' : ''}
                  </Text>
                  <Text style={styles.cellValue}>
                    {formData.option2 === 'No' ? 'No' : ''}
                  </Text>
                </View>

                <View style={{ flex: 0.3 }}>
                  <Text style={styles.cellValue}>Origen</Text>

                  <Text style={styles.cellValue}>Destino:</Text>
                </View>
                <View style={{ flex: 0.98, minHeight: 60 }}>
                  <Text style={styles.cellValue}>
                    {formData.tempOrigen || ''}
                  </Text>
                  <Text style={styles.cellValue}>
                    {formData.tempDestino || ''}
                  </Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                  Limpio,libre de malos olores:
                </Text>
                <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                  {formData.optionLimpio === 'Si' ? 'Si' : ''}
                </Text>
                <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                  {formData.optionLimpio === 'No' ? 'No' : ''}
                </Text>
                <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                  {' '}
                  {formData.limpio || ''}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                  Caja cerrada , en buen estado(sin hoyos o endiduras ):
                </Text>
                <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                  {formData.optionCaja === 'Si' ? 'Si' : ''}
                </Text>
                <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                  {formData.optionCaja === 'No' ? 'No' : ''}
                </Text>
                <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                  {formData.cajaCerrada || ''}
                </Text>
              </View>

              <View style={styles.tableRow}>
                <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                  Lona en buen estado:
                </Text>
                <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                  {formData.optionLona === 'Si' ? 'Si' : ''}
                </Text>
                <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                  {formData.optionLona === 'No' ? 'No' : ''}
                </Text>
                <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                  {formData.lona || ''}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                  Libre de fauna nociva:
                </Text>
                <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                  {formData.optionLibre === 'Si' ? 'Si' : ''}
                </Text>
                <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                  {formData.optionLibre === 'No' ? 'No' : ''}
                </Text>
                <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                  {formData.fauna || ''}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                  Carga en buen estado:
                </Text>
                <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                  {formData.optionCarga === 'Si' ? 'Si' : ''}
                </Text>
                <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                  {formData.optionCarga === 'No' ? 'No' : ''}
                </Text>
                <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                  {formData.carga || ''}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                  seguridad de carga
                </Text>
                <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                  {formData.optionSeguridad === 'Si' ? 'Si' : ''}
                </Text>
                <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                  {formData.optionSeguridad === 'No' ? 'No' : ''}
                </Text>
                <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                  {formData.seguridadCarga || ''}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                  sellado:
                </Text>
                <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                  {formData.optionSellado === 'Si' ? 'Si' : ''}
                </Text>
                <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                  {formData.optionSellado === 'No' ? 'No' : ''}
                </Text>
                <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                  {formData.sellado || ''}
                </Text>
              </View>
            </View>
          </View>
           </View>
=======
     

    
      <View style={{ marginBottom: 20 }} />

      <View style={{ width: '100%' }}>
        

  
>>>>>>> 781bb82178e014dcde26a9049402546b0ccdf655

          <View style={styles.table}>
             <View style={styles.tableRow}>
            <Text style={styles.cellLabel}>Fecha: </Text>
            <Text style={styles.cellValue}>{formData.fecha ?? ''}</Text>
            <Text style={[styles.cellLabel, { flex: 1.5 }]}>
              Inicio de{'\n'}verificación:
            </Text>
            <Text style={styles.cellValue}>
              {formData.inicioVerificacion ?? ''}
            </Text>
            <Text style={[styles.cellLabel, { flex: 1.5 }]}>
              Término de verificación:
            </Text>
            <Text style={styles.cellValue}>
              {formData.terminoVerificacion ?? ''}
            </Text>
            <Text style={styles.cellLabel}>O.C.: </Text>
            <Text style={styles.cellValue}>{formData.oc ?? ''}</Text>
          </View>
             <View style={styles.tableRow}>
            <Text style={[styles.cellLabel, { flex: 0.8 }]}>Proveedor:</Text>
            <Text style={styles.cellValue}>{formData.proveedor ?? ''}</Text>
            <Text style={styles.cellLabel}>Origen:</Text>
            <Text style={styles.cellValue}>{formData.origen ?? ''}</Text>
            <Text style={styles.cellLabel}>Factura: </Text>
            <Text style={styles.cellValue}>{formData.factura ?? ''}</Text>
          </View>
             <View style={styles.tableRow}>
            <Text style={[styles.cellLabel, { flex: 0.2 }]}>Especie:</Text>
            <Text style={styles.cellValue}>{formData.especie ?? ''}</Text>
          </View>
             <View style={styles.tableRow}>
            <Text style={[styles.cellLabel, { flex: 0.2 }]}>Variedades:</Text>
            <Text style={styles.cellValue}>{formData.variedades ?? ''}</Text>
          </View>

             <View style={styles.tableRow}>
            <Text style={styles.cellLabel}>Frío de descarga: </Text>
            <Text style={styles.cellValue}>{formData.frioDescarga ?? ''}</Text>
            <Text style={styles.cellLabel}>
              Cajas recibidas: {formData.cajasRecibidas}
            </Text>
            <Text style={styles.cellValue}>{formData.cajasRecibidas ?? ''}</Text>
          </View>
           </View>

          <View style={styles.table}>
             <View style={styles.tableRow}>
            <Text style={[styles.cellLabel, { flex: 0.35 }]}>
              Línea Transportista
            </Text>
            <Text style={styles.cellValue}>
              {formData.lineaTransportista ?? ''}
            </Text>
          </View>
             <View style={styles.tableRow}>
            <Text style={[styles.cellLabel, { flex: 0.35 }]}>
              No. de Contenedor
            </Text>
            <Text style={styles.cellValue}>
              {formData.numeroContenedor ?? ''}
            </Text>
          </View>
             <View style={styles.tableRow}>
            <Text style={[styles.cellLabel, { flex: 0.35 }]}>
              Placas de Camión
            </Text>
            <Text style={styles.cellValue}>{formData.placasCamion ?? ''}</Text>
          </View>
             <View style={styles.tableRow}>
            <Text style={[styles.cellLabel, { flex: 0.35 }]}>Placas Caja</Text>
            <Text style={styles.cellValue}>{formData.placasCaja ?? ''}</Text>
          </View>
             <View style={styles.tableRow}>
            <Text style={[styles.cellLabel, { flex: 0.35 }]}>Chofer</Text>
            <Text style={styles.cellValue}>{formData.chofer ?? ''}</Text>
          </View>
           </View>
          <View style={{ marginBottom: 20 }} />

<<<<<<< HEAD
          <View style={{ width: '100%' }}>
             <Text style={[styles.cellLabel, { paddingVertical: 10, paddingTop: 1, width: '100%' }]}>
            Condiciones de transporte:
=======
        <View style={{ width: '100%' }}>
          <Text style={[styles.cellLabel, { paddingVertical: 10, paddingTop: 1, width: '100%' }]}>
            Condiciones de transprte:
>>>>>>> 781bb82178e014dcde26a9049402546b0ccdf655
          </Text>

             <View style={styles.tableRow}>
            <Text style={{ width: '60%' }} />

            <Text style={styles.cellLabelWhite}>Observaciones</Text>
          </View>
             <View style={{ width: '100%', textAlign: 'center' }}>
            <View style={styles.tableRow}>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.2 }]}>
                    Temperatura del set point:
                  </Text>
                  <Text style={[styles.cellValue, { flex: 0.4 }]}>
                    {'\n'}  {formData.tempSetPoint ?? ''}
                  </Text>

                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.observacionesSetPoint ?? ''}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.2 }]}>
                    Temperatura de pantalla:
                  </Text>
                  <Text style={[styles.cellValue, { flex: 0.4 }]}>
                    {'\n'} {formData.tempPantalla ?? ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.observacionesPantalla ?? ''}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabel, { flex: 0.28 }]} />
                  <Text style={[styles.cellLabel, { flex: 0.17 }]}>cumple</Text>
                  <Text style={[styles.cellLabel, { flex: 0.17 }]}>
                    no cumple
                  </Text>

                  <Text style={[styles.cellLabel, { flex: 0.52 }]}>
                    observaciones
                  </Text>
                </View>
                <View style={[styles.tableRow, { height: 'auto' }]}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.66 }]}>
                    Termografo:
                  </Text>

                  <View style={{ flex: 0.42 }}>
                    <Text style={styles.cellValue}>
                      {formData.option === 'Si' ? 'SI' : ''}
                    </Text>

                    <Text style={styles.cellValue}>
                      {formData.option2 === 'Si' ? 'SI' : ''}
                    </Text>
                  </View>
                  <View style={{ flex: 0.43 }}>
                    <Text style={styles.cellValue}>
                      {formData.option === 'No' ? 'No ' : ''}
                    </Text>
                    <Text style={styles.cellValue}>
                      {formData.option2 === 'No' ? 'No' : ''}
                    </Text>
                  </View>

                  <View style={{ flex: 0.3 }}>
                    <Text style={styles.cellValue}>Origen</Text>

                    <Text style={styles.cellValue}>Destino:</Text>
                  </View>
                  <View style={{ flex: 0.98, minHeight: 60 }}>
                    <Text style={styles.cellValue}>
                      {formData.tempOrigen ?? ''}
                    </Text>
                    <Text style={styles.cellValue}>
                      {formData.tempDestino ?? ''}
                    </Text>
                  </View>
                </View>

                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                    Limpio,libre de malos olores:
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionLimpio === 'Si' ? 'Si' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionLimpio === 'No' ? 'No' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                    {' '}
                    {formData.limpio ?? ''}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                    Caja cerrada , en buen estado(sin hoyos o endiduras ):
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionCaja === 'Si' ? 'Si' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionCaja === 'No' ? 'No' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                    {formData.cajaCerrada ?? ''}
                  </Text>
                </View>

                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                    Lona en buen estado:
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionLona === 'Si' ? 'Si' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionLona === 'No' ? 'No' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                    {formData.lona ?? ''}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                    Libre de fauna nociva:
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionLibre === 'Si' ? 'Si' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionLibre === 'No' ? 'No' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                    {formData.fauna ?? ''}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                    Carga en buen estado:
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionCarga === 'Si' ? 'Si' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionCarga === 'No' ? 'No' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                    {formData.carga ?? ''}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                    seguridad de carga
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionSeguridad === 'Si' ? 'Si' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionSeguridad === 'No' ? 'No' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                    {formData.seguridadCarga ?? ''}
                  </Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                    sellado:
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionSellado === 'Si' ? 'Si' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>
                    {formData.optionSellado === 'No' ? 'No' : ''}
                  </Text>
                  <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                    {formData.sellado ?? ''}
                  </Text>
                </View>
              </View>
            </View>
          </View>

             <Text style={[styles.cellLabel, { paddingTop: 4, fontSize: 10 }]}>
            Condiciones de Carga (Maniobra)
          </Text>
             <View style={{ width: '100%' }}>
            <View style={styles.tableRow}>
              <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                Hay tarimas dañadas :
              </Text>
              <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>SI</Text>
              <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>NO</Text>
              <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                #{formData.tarimasDanadas}{' '}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                Cajas identificadas :
              </Text>
              <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>SI</Text>
              <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>NO</Text>
              <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                #{formData.cajasIdentificadas}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.cellLabelWhite, { flex: 0.7 }]}>
                Cajas dañadas por maniobra:
              </Text>
              <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}> SI </Text>

              <Text style={[styles.cellLabelWhite, { flex: 0.4 }]}>NO</Text>
              <Text style={[styles.cellLabelWhite, { flex: 1.3 }]}>
                #{formData.danadasManiobra}
              </Text>
            </View>
          </View>
           </View>

          <View style={{ marginBottom: 20 }} />

          <View style={[styles.tableRow, { marginBottom: 15, width: '100%' }]}>
             <View style={[{ height: 100, width: '26%' }]}>
            <Text style={[styles.cellLabel, {}]}>Temperatura de pulpa</Text>
            <Text style={styles.cellValue}>A</Text>
            <Text style={styles.cellValue}>M</Text>
            <Text style={styles.cellValue}>B</Text>
          </View>
             <View style={[{ width: '10%' }]}>
            <Text style={[styles.cellLabel, { height: 20 }]}>Puerta</Text>
            <Text style={styles.cellValue}>{formData.tempAPuerta}</Text>
            <Text style={styles.cellValue}>{formData.tempMPuerta}</Text>
            <Text style={styles.cellValue}>{formData.tempBPuerta}</Text>
          </View>
             <View style={[{ width: '10%' }]}>
            <Text style={[styles.cellLabel, { height: 20 }]}>Medio</Text>
            <Text style={styles.cellValue}>{formData.tempAMedio}</Text>
            <Text style={styles.cellValue}>{formData.tempMMedio}</Text>
            <Text style={styles.cellValue}>{formData.tempBMedio}</Text>
          </View>
             <View style={[{ width: '10%' }]}>
            <Text style={[styles.cellLabel, { height: 20 }]}>Fondo</Text>
            <Text style={styles.cellValue}>{formData.tempAFondo}</Text>
            <Text style={styles.cellValue}>{formData.tempMFondo}</Text>
            <Text style={styles.cellValue}>{formData.tempBFondo}</Text>
          </View>
             <View style={[{ width: '30%' }]}>
            <Text style={[styles.cellLabel]}>Rango de Temperatura</Text>
            <View style={[styles.tableRow, { height: 50 }]}>
              <Text style={styles.cellValue}>Min:{formData.tempMin}</Text>
              <Text style={styles.cellValue}>Max:{formData.tempMax}</Text>
            </View>
          </View>
             <View style={[{ width: '30%' }]}>
            <Text style={styles.cellLabel}>Ideal</Text>
            <View style={[styles.tableRow, { height: 50 }]}>
              <Text style={styles.cellValue}> {formData.tempIdeal}°C </Text>
            </View>
          </View>
           </View>

          <View style={[styles.tableRow, { marginBottom: 15 }]}>
             {/* Parte en negritas y más grande */}
             <Text
            style={[
              styles.cellLabel,
              { flex: 0.35, fontSize: 11, fontWeight: 'bold' }
            ]}
          >
            Resultados de la {'\n'}Investigación{'\n'}
            <Text style={{ fontSize: 6 }}>
              (PRODUCTO DAÑADO DESEMPLEADO SE ENVIAN A PISO O SE ARREGLAN)
            </Text>
          </Text>
             <Text style={styles.cellValue}>{formData.resultadosInv ?? ''}</Text>
           </View>

          <Text style={[styles.cellLabel, { flex: 0.15, fontSize: 14 }]}>
             Hago constar que estoy de acuerdo con lo verificado y registrado en el
             presente{'\n'}documento
           </Text>

          <View>
             <View style={styles.tableRow}>
            <Text style={[styles.cellLabel, { width: '12%', textAlign: 'center', fontSize: 10, height: 200 }]}>
              {' '}
              Verifico descarga{'\n'} (Inspector de Calidad)
            </Text>
            <View style={{ width: '38%' }}>
              <Text style={[styles.cellValue, { flex: 0.3 }]}>
                Nombre:{formData.nombreInspector}
              </Text>

              <View style={[styles.cellValue, {}]}>
                <Text style={[styles.inputLabel, { paddingBottom: 10 }]}>
                  Firma:
                </Text>
                {firmaBase64Inspector && (
                  <Image
                    src={firmaBase64Inspector}
                    style={{ width: 200, height: 150 }}
                  />
                )}
              </View>
            </View>
            <Text style={[styles.cellLabel, { width: '12%', fontSize: 10 }]}>
              {' '}
              Chofer
            </Text>
            <View style={{ width: '38%' }}>
              <Text style={[styles.cellValue, { flex: 0.3 }]}>
                Nombre:{formData.nombreChofer}
              </Text>
              <View style={[styles.cellValue, {}]}>
                <Text style={[styles.inputLabel, { paddingBottom: 10 }]}>
                  Firma:
                </Text>
                {firmaBase64Chofer && (
                  <Image
                    src={firmaBase64Chofer}
                    style={{ width: 200, height: 150 }}
                  />
                )}
              </View>
            </View>
          </View>
           </View>
        </View>

      </Page>

    )}
    {currentPage == 2 && (
      <Page>
        <View style={{ marginBottom: 20 }} />

        <View style={[styles.tableRow, { marginBottom: 15, width: '100%' }]}>
           <View style={[{ height: 100, width: '26%' }]}>
            <Text style={[styles.cellLabel, {}]}>Temperatura de pulpa</Text>
            <Text style={styles.cellValue}>A</Text>
            <Text style={styles.cellValue}>M</Text>
            <Text style={styles.cellValue}>B</Text>
          </View>
           <View style={[{ width: '10%' }]}>
            <Text style={[styles.cellLabel, { height: 20 }]}>Puerta</Text>
            <Text style={styles.cellValue}>{formData.tempAPuerta}</Text>
            <Text style={styles.cellValue}>{formData.tempMPuerta}</Text>
            <Text style={styles.cellValue}>{formData.tempBPuerta}</Text>
          </View>
           <View style={[{ width: '10%' }]}>
            <Text style={[styles.cellLabel, { height: 20 }]}>Medio</Text>
            <Text style={styles.cellValue}>{formData.tempAMedio}</Text>
            <Text style={styles.cellValue}>{formData.tempMMedio}</Text>
            <Text style={styles.cellValue}>{formData.tempBMedio}</Text>
          </View>
           <View style={[{ width: '10%' }]}>
            <Text style={[styles.cellLabel, { height: 20 }]}>Fondo</Text>
            <Text style={styles.cellValue}>{formData.tempAFondo}</Text>
            <Text style={styles.cellValue}>{formData.tempMFondo}</Text>
            <Text style={styles.cellValue}>{formData.tempBFondo}</Text>
          </View>
           <View style={[{ width: '30%' }]}>
            <Text style={[styles.cellLabel]}>Rango de Temperatura</Text>
            <View style={[styles.tableRow, { height: 50 }]}>
                <Text style={styles.cellValue}>Min:{formData.tempMin}</Text>
                <Text style={styles.cellValue}>Max:{formData.tempMax}</Text>
              </View>
          </View>
           <View style={[{ width: '30%' }]}>
            <Text style={styles.cellLabel}>Ideal</Text>
            <View style={[styles.tableRow, { height: 50 }]}>
                <Text style={styles.cellValue}> {formData.tempIdeal}°C </Text>
              </View>
          </View>
         </View>

        <View style={[styles.tableRow, { marginBottom: 15 }]}>
           {/* Parte en negritas y más grande */}
           <Text
            style={[
                styles.cellLabel,
                { flex: 0.35, fontSize: 11, fontWeight: 'bold' }
              ]}
          >
            Resultados de la {'\n'}Investigación{'\n'}
            <Text style={{ fontSize: 6 }}>
                (PRODUCTO DAÑADO DESEMPLEADO SE ENVIAN A PISO O SE ARREGLAN)
          </Text>
          </Text>
           <Text style={styles.cellValue}>{formData.resultadosInv || ''}</Text>
         </View>
        <Text style={[styles.cellLabel, { flex: 0.15, fontSize: 14 }]}>
           Hago constar que estoy de acuerdo con lo verificado y registrado en el
           presente{'\n'}documento
         </Text>

        <View>
           <View style={styles.tableRow}>
            <Text style={[styles.cellLabel, { width: '12%', textAlign: 'center', fontSize: 10, height: 200 }]}>
            {' '}
            Verifico descarga{'\n'} (Inspector de Calidad)
          </Text>
            <View style={{ width: '38%' }}>
            <Text style={[styles.cellValue, { flex: 0.3 }]}>
              Nombre:{formData.nombreInspector}
            </Text>

            <View style={[styles.cellValue, {}]}>
              <Text style={[styles.inputLabel, { paddingBottom: 10 }]}>
                Firma:
              </Text>
              {firmaBase64Inspector && (
                <Image
                  src={firmaBase64Inspector}
                  style={{ width: 200, height: 150 }}
                />
              )}
            </View>
          </View>
            <Text style={[styles.cellLabel, { width: '12%', fontSize: 10 }]}>
            {' '}
            Chofer
          </Text>
            <View style={{ width: '38%' }}>
            <Text style={[styles.cellValue, { flex: 0.3 }]}>
              Nombre:{formData.nombreChofer}
            </Text>
            <View style={[styles.cellValue, {}]}>
              <Text style={[styles.inputLabel, { paddingBottom: 10 }]}>
                Firma:
              </Text>
              {firmaBase64Chofer && (
                <Image
                  src={firmaBase64Chofer}
                  style={{ width: 200, height: 150 }}
                />
              )}
            </View>
          </View>
          </View>
         </View>

      </Page>

    )}
    {currentPage === 3 &&
          (formData.option === 'No' ||
            formData.option2 === 'No' ||
            formData.optionLibre === 'No' ||
            formData.optionCaja === 'No' ||
            formData.optionLona === 'No' ||
            formData.optionCarga === 'No' ||
            formData.optionSeguridad === 'No' ||
            formData.optionSellado === 'No' ||
            formData.optionLimpio === 'No') && (
              <Page size='A4' style={styles.page}>
                <View>
                  <Text
                    style={{
                    justifyContent: 'center',
                    textAlign: 'center',
                    borderWidth: 1,
                    borderColor: '#000',
                    backgroundColor: '#ccc'
                  }}
                  >
                    Anexos
                </Text>
                </View>

                <View>

                  {formData.optionLimpio === 'No' && (
                    <>
                    <View style={{ borderWidth: 1, borderColor: '#000' }}>

                      <Text style={{ fontSize: '15px' }}>  Evidencia No cumple con Limpio, libre de malos olores  </Text>

                      <Text style={{ fontSize: '10px', paddingTop: 10 }}> {formData.limpio || ''} </Text>

                      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start' }}>

                    {formData.imageLimpio.map((imageUrl, index) => (

                      <div key={index} style={{ padding: '4px', borderRadius: '10px', textAlign: 'center' }}>
                        <Image
                          src={imageUrl}
                          alt={`Imagen ${index + 1}`}
                          style={{ width: '150px', height: '150px', borderRadius: '5px', marginBottom: '10px' }}
                        />
                      </div>
                    ))}
                  </div>
                    </View>
                  </>
                  )}

                  {formData.optionLibre === 'No' && (
                    <>
                    <View style={{ borderWidth: 1, borderColor: '#000' }}>

                      <Text style={{ fontSize: '15px' }}>  Evidencia No cumple libre de Fauna nociva  </Text>

                      <Text style={{ fontSize: '10px', paddingTop: 10 }}> {formData.limpio || ''} </Text>

                      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start' }}>

                    {formData.imageLibreFauna.map((imageUrl, index) => (

                      <div key={index} style={{ padding: '4px', borderRadius: '10px', textAlign: 'center' }}>

                        <Image
                          src={imageUrl}
                          alt={`Imagen ${index + 1}`}
                          style={{ width: '150px', height: '150px', borderRadius: '5px', marginBottom: '10px' }}
                        />
                      </div>
                    ))}
                  </div>
                    </View>
                  </>
                  )}

                  {formData.optionCaja === 'No' && (
                    <>
                    <View style={{ borderWidth: 1, borderColor: '#000' }}>
                      <Text style={{ fontSize: '15px' }}>  Evidencia No cumple Caja cerrada, en buen estado(sin hoyos o endiduras ):  </Text>

                      <Text style={{ fontSize: '10px', paddingTop: 10 }}> {formData.cajaCerrada || ''} </Text>

                      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start' }}>

                    {formData.imageCajaCerrada.map((imageUrl, index) => (
                      <div key={index} style={{ margin: '10px' }}>
                        <Image
                        src={imageUrl}
                        alt={`Imagen ${index + 1}`}
                        style={{ width: '150px', height: '150px', borderRadius: '5px', marginBottom: '10px' }}
                      />
                      </div>
                    ))}
                  </div>
                    </View>
                  </>
                  )}
                  {formData.optionLona === 'No' && (
                    <>
                    <View style={{ borderWidth: 1, borderColor: '#000' }}>

                      <Text style={{ fontSize: '15px' }}>  Evidencia No cumple  Lona en buen estado  </Text>

                      <Text style={{ fontSize: '10px', paddingTop: 10 }}> {formData.lona || ''} </Text>

                      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start' }}>

                    {formData.imageLonaBuenEstado.map((imageUrl, index) => (
                      <div key={index} style={{ margin: '10px' }}>
                        <Image
                        src={imageUrl}
                        alt={`Imagen ${index + 1}`}
                        style={{ width: '150px', height: '150px', borderRadius: '5px', marginBottom: '10px' }}
                      />
                      </div>
                    ))}
                  </div>
                    </View>
                  </>
                  )}
                  {formData.optionCarga === 'No' && (
                    <>
                    <View style={{ borderWidth: 1, borderColor: '#000' }}>

                      <Text style={{ fontSize: '15px' }}>  Evidencia No cumple Carga en buen estado</Text>

                      <Text style={{ fontSize: '10px', paddingTop: 10 }}> {formData.carga || ''} </Text>

                      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start' }}>

                    {formData.imageCargaBuenEstado.map((imageUrl, index) => (
                      <div key={index} style={{ margin: '10px' }}>
                        <Image
                        src={imageUrl}
                        alt={`Imagen ${index + 1}`}
                        style={{ width: '150px', height: '150px', borderRadius: '5px', marginBottom: '10px' }}
                      />
                      </div>
                    ))}
                  </div>
                    </View>
                  </>
                  )}
                  {formData.optionSeguridad === 'No' && (
                    <>
                    <View style={{ borderWidth: 1, borderColor: '#000' }}>

                      <Text style={{ fontSize: '15px' }}>  Evidencia No cumple seguridad de carga </Text>

                      <Text style={{ fontSize: '10px', paddingTop: 10 }}> {formData.seguridadCarga || ''} </Text>

                      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start' }}>

                    {formData.imageSeguridadCarga.map((imageUrl, index) => (
                      <div key={index} style={{ margin: '10px' }}>
                        <Image
                        src={imageUrl}
                        alt={`Imagen ${index + 1}`}
                        style={{ width: '150px', height: '150px', borderRadius: '5px', marginBottom: '10px' }}
                      />
                      </div>
                    ))}
                  </div>
                    </View>
                  </>
                  )}

                  {formData.optionSellado === 'No' && (
                    <>
                    <View style={{ borderWidth: 1, borderColor: '#000' }}>

                      <Text style={{ fontSize: '15px' }}>  Evidencia No cumple con el sellado  </Text>

                      <Text style={{ fontSize: '10px', paddingTop: 10 }}> {formData.sellado || ''} </Text>

                      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start' }}>

                    {formData.imageSellado.map((imageUrl, index) => (
                      <div key={index} style={{ margin: '10px' }}>
                        <Image
                        src={imageUrl}
                        alt={`Imagen ${index + 1}`}
                        style={{ width: '150px', height: '150px', borderRadius: '5px', marginBottom: '10px' }}
                      />
                      </div>
                    ))}
                  </div>
                    </View>
                  </>
                  )}

                </View>

              </Page>
    )}

  </Document>
)
const handlePDFDownload = async (formData, firmaBase64) => {
  try {
    const pdfDocument = <ActaPDF formData={formData} firmaBase64={firmaBase64} />
    const pdfBlob = await pdf(pdfDocument).toBlob() // Obtener el PDF como Blob

    // Convertir el Blob del PDF a imagen
    // const imageUrl = await convertPDFToImage(pdfBlob);
    // console.log("Imagen generada desde el PDF:", imageUrl);}
    console.log('holssssss')

    convertPDFToImage('C:/Users/Sistemas/Downloads/documento.pdf')
      .then((image) => {
        if (image) {
          console.log('Imagen generada desde el PDF:', image)
        } else {
          console.error('No se pudo generar la imagen')
        }
      })

    // Convertir el Blob del PDF a imagen
    // const imageUrl = await convertPDFToImage(pdfBlob);
    // console.log("Imagen generada desde el PDF:", imageUrl);}
    console.log('holssssss')

    convertPDFToImage('C:/Users/Sistemas/Downloads/documento.pdf')
      .then((image) => {
        if (image) {
          console.log('Imagen generada desde el PDF:', image)
        } else {
          console.error('No se pudo generar la imagen')
        }
      })
  } catch (error) {
    console.error('Error al generar el PDF o convertir a imagen:', error)
  }
}

// Función para convertir el PDF a imagen
const convertPDFToImage = async (pdfBlob) => {
  try {
    // Convertir el Blob a ArrayBuffer (pdf.js necesita este formato)
    const pdfData = await pdfBlob.arrayBuffer()

    // Cargar el PDF en pdf.js
    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise

    // Obtener la primera página del PDF
    const page = await pdf.getPage(1)

    // Configurar el viewport (escala) de la página
    const viewport = page.getViewport({ scale: 1.5 })

    // Crear un canvas para renderizar la página
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = viewport.width
    canvas.height = viewport.height

    // Renderizar la página del PDF en el canvas
    await page.render({ canvasContext: context, viewport }).promise

    // Convertir el canvas a una imagen base64
    const image = canvas.toDataURL()
    return image // Retorna la imagen en formato base64
  } catch (error) {
    console.error('Error al convertir el PDF a imagen:', error)
    return null
  }
}

const ActaDeLlegada = () => {
  const [formData, setFormData] = useState({
    id: null,
    fecha: '',
    inicioVerificacion: '',
    terminoVerificacion: '',
    oc: '',
    proveedor: '',
    origen: '',
    factura: '',
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
    option2: '',
    optionLimpio: '',
    optionCaja: '',
    optionLona: '',
    optionLibre: '',
    optionCarga: '',
    optionSeguridad: '',
    optionSellado: '',
    imageTermografo: [],
    imageLimpio: [],
    imageMalosOlores: [],
    imageCajaCerrada: [],
    imageLonaBuenEstado: [],
    imageLibreFauna: [],
    imageCargaBuenEstado: [],
    imageSeguridadCarga: [],
    imageSellado: [],
    tarimasDanadas: '',
    cajasIdentificadas: '',
    danadasManiobra: '',
    image2: [],
    image3: []
  })
  const [currentPage, setCurrentPage] = useState(1)
  const goToNextPage = () => {
    setCurrentPage(2)
  }

  const goToNextPage2 = () => {
    setCurrentPage(1)
  }

  const goToPreviousPage = () => {
    setCurrentPage(3)
  }

  const handleInsert = () => {
    insert(formData) // Llama a la función insert y pasa formData
  }

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  interface Acta {
    id: number
    fecha: string
    start_verification: string
    end_verification: string
    oc: string
    provider: string
    origin: string
    bill: string
    varieties: string
    cold_disc: string
    boxes_received: string
    carrier_line: string
    num_cont: string
    truck_plt: string
    box_plt: string
    driver: string
    setpoint_temp: string
    setpoint_obs: string
    screen_temp: string
    screen_obs: string
    therm_org: string
    therm_dst: string
    clean_free: string
    close: string
    tarp_state: string
    pest_free: string
    load_state: string
    load_sec: string
    seal: string
    box_id: string
    invest_res: string
    tempa_door: string
    tempa_mid: string
    tempa_back: string
    tempm_door: string
    tempm_mid: string
    tempm_back: string
    tempb_door: string
    tempb_mid: string
    tempb_back: string
    temp_max: string
    temp_min: string
    temp_ideal: string
    insp_name: string
    clean_obs: string
    close_obs: string
    tarp_obs: string
    pest_obs: string
    load_obs: string
    sec_obs: string
    seal_obs: string
    pallet_dmg: string
    box_num: string
    dmg_num: string

  }

  const [actasList, setActasList] = useState<Acta[]>([])
  const [actaDetails, setActaDetails] = useState(null)

  const [firmaBase64Inspector, setFirmaBase64Inspector] = useState(null)
  const [firmaBase64Chofer, setFirmaBase64Chofer] = useState(null)
  const [temperatureRange, setTemperatureRange] = useState(null)
  const signaturePadInspector = useRef<any>(null) // Refs para el signature pad
  const signaturePadChofer = useRef<any>(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSelect = (idActa) => {
    setValue(idActa)
    setOpen(false)

    // Buscar detalles del acta seleccionada
    const selectedActa = actasList.find((acta) => acta.id === idActa)

    if (selectedActa != null) {
      // Actualizar formData con los datos del acta seleccionada
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: selectedActa.id,
        fecha: selectedActa.fecha ?? '',
        inicioVerificacion: selectedActa.start_verification ?? '',
        terminoVerificacion: selectedActa.end_verification ?? '',
        oc: selectedActa.oc ?? '',
        proveedor: selectedActa.provider ?? '',
        origen: selectedActa.origin ?? '',
        factura: selectedActa.bill ?? '',
        // especie: "", hace falta especie en la bd
        variedades: selectedActa.varieties ?? '',
        frioDescarga: selectedActa.cold_disc ?? '',
        cajasRecibidas: selectedActa.boxes_received ?? '',
        lineaTransportista: selectedActa.carrier_line ?? '',
        numeroContenedor: selectedActa.num_cont ?? '',
        placasCamion: selectedActa.truck_plt ?? '',
        placasCaja: selectedActa.box_plt ?? '',
        chofer: selectedActa.driver ?? '',
        tempSetPoint: selectedActa.setpoint_temp ?? '',
        observacionesSetPoint: selectedActa.setpoint_obs ?? '',
        tempPantalla: selectedActa.screen_temp ?? '',
        observacionesPantalla: selectedActa.screen_obs ?? '',
        termografo: selectedActa.therm_org ?? '',
        tempOrigen: selectedActa.therm_org ?? '',
        tempDestino: selectedActa.therm_dst ?? '',
        limpio: selectedActa.clean_free ?? '',
        cajaCerrada: selectedActa.close ?? '',
        lona: selectedActa.tarp_state ?? '',
        fauna: selectedActa.pest_free ?? '',
        carga: selectedActa.load_state ?? '',
        seguridadCarga: selectedActa.load_sec ?? '',
        sellado: selectedActa.seal ?? '',
        numeroSerie: selectedActa.box_id ?? '',
        resultadosInv: selectedActa.invest_res ?? '',
        tempAPuerta: selectedActa.tempa_door ?? '',
        tempAMedio: selectedActa.tempa_mid ?? '',
        tempAFondo: selectedActa.tempa_back ?? '',
        tempMPuerta: selectedActa.tempm_door ?? '',
        tempMMedio: selectedActa.tempm_mid ?? '',
        tempMFondo: selectedActa.tempm_back ?? '',
        tempBPuerta: selectedActa.tempb_door ?? '',
        tempBMedio: selectedActa.tempb_mid ?? '',
        tempBFondo: selectedActa.tempb_back ?? '',
        tempMax: selectedActa.temp_max ?? '',
        tempMin: selectedActa.temp_min ?? '',
        tempIdeal: selectedActa.temp_ideal ?? '',
        nombreInspector: selectedActa.insp_name ?? '',
        nombreChofer: selectedActa.driver ?? '',
        // option: "",
        // option2: "", buscar estas opciones en la bd
        optionLimpio: selectedActa.clean_obs ?? '',
        optionCaja: selectedActa.close_obs ?? '',
        optionLona: selectedActa.tarp_obs ?? '',
        optionLibre: selectedActa.pest_obs ?? '',
        optionCarga: selectedActa.load_obs ?? '',
        optionSeguridad: selectedActa.sec_obs ?? '',
        optionSellado: selectedActa.seal_obs ?? '',
        // Imagenes y otros campos específicos
        // imageTermografo: [],
        // imageLimpio: [],
        // imageMalosOlores: [],
        // imageCajaCerrada: [],
        // imageLonaBuenEstado: [],
        // imageLibreFauna: [],
        // imageCargaBuenEstado: [],
        // imageSeguridadCarga: [],
        // imageSellado: [],
        tarimasDanadas: selectedActa.pallet_dmg ?? '',
        cajasIdentificadas: selectedActa.box_num ?? '',
        danadasManiobra: selectedActa.dmg_num ?? ''
        // image2: [],
        // image3: []
      }))
    }
  }

  const handleFileChange3 = (event, key) => {
    const files = event.target.files
    const fileArray = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    )
    console.log(key)

    // Actualizar dinámicamente el conjunto de imágenes
    setFormData((prevData) => ({
      ...prevData,
      [key]: [...prevData[key], ...fileArray] // Actualiza solo el conjunto específico (image2, image3, etc.)
    }))
    console.log(
      'la longitud imageCajacerrada es ',
      formData.imageCajaCerrada.length + 1
    )
  }

  useEffect(() => {
    const getActasData = async () => {
      const data = await fetchActas()
      if (data != null) {
        setActasList(data)
      }
    }

    getActasData()

    const allTemperatures = [
      formData.tempAPuerta,
      formData.tempAMedio,
      formData.tempAFondo,
      formData.tempMPuerta,
      formData.tempMMedio,
      formData.tempMFondo,
      formData.tempBPuerta,
      formData.tempBMedio,
      formData.tempBFondo
    ]
      .map((temp) => Number(temp) || null) // Convierte a número o `null` si no es un número
      .filter((temp) => temp !== null) /// Aseguramos que sean números válidos

    // Si no hay temperaturas válidas, no hacer nada
    if (allTemperatures.length === 0) return

    const maxTemp = Math.max(...allTemperatures)
    const minTemp = Math.min(...allTemperatures)

    // Actualizar el estado con los valores de tempMax y tempMin
    setFormData((prevData) => ({
      ...prevData,
      tempMax: maxTemp,
      tempMin: minTemp
    }))

    // Actualizar el rango
    setTemperatureRange({ max: maxTemp, min: minTemp })
  }, [
    formData.tempAPuerta,
    formData.tempAMedio,
    formData.tempAFondo,
    formData.tempMPuerta,
    formData.tempMMedio,
    formData.tempMFondo,
    formData.tempBPuerta,
    formData.tempBMedio,
    formData.tempBFondo
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
          <div style={{ padding: '20px' }}>
            <h1>Acta de Llegada</h1>

            <div>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className='w-[200px] justify-between'
                  >
                    {value
                      ? actasList.find((acta) => acta.id === value)?.oc
                      : 'Select Acta...'}
                    <ChevronsUpDown className='w-4 h-4 ml-2 opacity-50 shrink-0' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                  <Command>
                    <CommandInput placeholder='Search Acta...' />
                    <CommandList>
                      <CommandEmpty>No Acta found.</CommandEmpty>
                      <CommandGroup>
                        {actasList.map((acta) => (
                          <CommandItem
                            key={acta.id}
                            value={acta.id}
                            onSelect={() => handleSelect(acta.id)}
                          >

                            <Check
                              className={`mr-2 h-4 w-4 ${value === acta.id ? 'opacity-100' : 'opacity-0'}`}
                            />
                            {acta.oc}{' '}
                            {/* Aquí puedes mostrar la fecha o cualquier otra información relevante */}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* Mostrar los detalles de la acta seleccionada */}
              {actaDetails && (
                <div className='mt-4'>
                  <h3>Acta Details:</h3>
                  <p>
                    <strong>ID Acta:</strong> {actaDetails.id}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {actaDetails.fecha}
                  </p>
                  {/* Aquí puedes agregar más detalles de la acta según sea necesario */}
                </div>
              )}
            </div>

            {/* Formulario con campos de entrada */}
            <h2 />

            <Accordion type='single' collapsible style={{ padding: '8px 0' }}>
              <AccordionItem value='item-1'>
                <AccordionTrigger
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '2px solid #7A2A1E',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                >
                  Datos Pedido
                </AccordionTrigger>
                <AccordionContent style={{ padding: '8px' }}>
                  <Card style={{ padding: '8px' }}>

                    <CardContent>
                      {[
                        { label: 'Fecha:', type: 'date', name: 'fecha' },
                        { label: 'Inicio de verificación:', type: 'text', name: 'inicioVerificacion' },
                        { label: 'Término de verificación:', type: 'text', name: 'terminoVerificacion' },
                        { label: 'O.C.:', type: 'text', name: 'oc' },
                        { label: 'Proveedor:', type: 'text', name: 'proveedor' },
                        { label: 'Origen:', type: 'text', name: 'origen' },
                        { label: 'Factura:', type: 'text', name: 'factura' },
                        { label: 'Especie:', type: 'text', name: 'especie' },
                        { label: 'Variedades:', type: 'text', name: 'variedades' },
                        { label: 'Frío de descarga:', type: 'text', name: 'frioDescarga' },
                        { label: 'Cajas recibidas:', type: 'text', name: 'cajasRecibidas' }
                      ].map(({ label, type, name }) => (
                        <div key={name} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                          <label style={{ flex: '0 0 200px', fontWeight: 'bold' }}>{label}</label>
                          <Input
                            type={type}
                            name={name}
                            value={formData[name]}
                            onChange={handleInputChange}
                            style={{ flex: '1', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                          />
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter>
                      {/* Puedes agregar botones o acciones adicionales en el footer */}
                    </CardFooter>
                  </Card>
                </AccordionContent>

              </AccordionItem>
            </Accordion>

            <Accordion type='single' collapsible style={{ padding: '8px 0' }}>
              <AccordionItem value='item-2'>
                <AccordionTrigger
                  style={{
                    fontSize: '20px', // Tamaño de fuente grande
                    fontWeight: 'bold', // Negrita para mayor visibilidad
                    padding: '12px 16px', // Más espacio alrededor del texto
                    // backgroundColor: '#9A3324', // Fondo destacado (puedes cambiar el color si es necesario)
                    // color: '#fff', // Texto en color blanco para contraste
                    borderRadius: '8px', // Bordes redondeados para un diseño moderno
                    border: '2px solid #7A2A1E', // Borde para resaltar el elemento
                    textAlign: 'center', // Centrar el texto
                    cursor: 'pointer' // Cambia el cursor para que parezca un botón
                  }}
                >
                  Transporte
                </AccordionTrigger>
                <AccordionContent>
                  {[
                    { label: 'Línea transportista:', name: 'lineaTransportista' },
                    { label: 'Número de contenedor:', name: 'numeroContenedor' },
                    { label: 'Placas camión:', name: 'placasCamion' },
                    { label: 'Placas caja:', name: 'placasCaja' },
                    { label: 'Chofer:', name: 'chofer' }
                  ].map(({ label, name }) => (
                    <div key={name} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <label style={{ flex: '0 0 200px', fontWeight: 'bold' }}>{label}</label>
                      <Input
                        type='text'
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                        style={{ flex: '1', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type='single' collapsible style={{ padding: '8px 0' }}>
              <AccordionItem value='item-2'>
                <AccordionTrigger
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '2px solid #7A2A1E',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                >
                  Condiciones de transporte
                </AccordionTrigger>
                <AccordionContent>
                  {[
                    { label: 'Temperatura de set point:', name: 'tempSetPoint' },
                    { label: 'Observaciones set point:', name: 'observacionesSetPoint' },
                    { label: 'Temperatura de pantalla:', name: 'tempPantalla' },
                    { label: 'Observaciones pantalla:', name: 'observacionesPantalla' },
                    { label: 'Temperatura de origen:', name: 'tempOrigen' },
                    { label: 'Temperatura de destino:', name: 'tempDestino' }
                  ].map(({ label, name }) => (
                    <div key={name} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <label style={{ flex: '0 0 250px', fontWeight: 'bold' }}>{label}</label>
                      <Input
                        type='text'
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                        style={{ flex: '1', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                      />
                    </div>
                  ))}

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ flex: '0 0 250px', fontWeight: 'bold' }}>Termógrafo:</label>
                    <Input
                      type='text'
                      name='termografo'
                      value={formData.termografo}
                      onChange={handleInputChange}
                      style={{ flex: '1', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                  </div>

                  {[
                    { label: 'Cumple termógrafo:', name: 'option' },
                    { label: 'Cumple termógrafo2:', name: 'option2' }
                  ].map(({ label, name }) => (
                    <div key={name} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                      <label style={{ flex: '0 0 250px', fontWeight: 'bold' }}>{label}</label>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <Button
                          style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: '#9A3324', cursor: 'pointer' }}
                          name={name}
                          value='Si'
                          onClick={handleInputChange}
                        >
                          Sí
                        </Button>
                        <Button
                          style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: '#ccc', color: '#000', cursor: 'pointer' }}
                          name={name}
                          value='No'
                          onClick={handleInputChange}
                        >
                          No
                        </Button>
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type='single' collapsible style={{ padding: '8px 0' }}>
              <AccordionItem value='item-2'>
                <AccordionTrigger
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '2px solid #7A2A1E',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                >
                  Inspección de transporte
                </AccordionTrigger>
                <AccordionContent>
                  <div style={{ marginBottom: 30 }}>
                    <label>Limpio </label>
                    <div style={{ marginBottom: 20 }}>
                      <Button
                        style={{ flex: 5, marginRight: '10px' }}
                        name='optionLimpio'
                        value='Si'
                        onClick={handleInputChange}
                      >
                        {' '}
                        Sí{' '}
                      </Button>
                      <Button
                        name='optionLimpio'
                        value='No'
                        onClick={handleInputChange}
                      >
                        {' '}
                        No{' '}
                      </Button>

                      {formData.optionLimpio === 'No' && (
                        <div>
                          <div style={{ marginBottom: 30 }}>
                            <Button>
                              <label
                                htmlFor='file-input-limpio'
                                style={{ cursor: 'pointer' }}
                              >
                                Seleccionar Imagen
                              </label>
                            </Button>
                            {formData.imageLimpio.length < 8
                              ? (
                                <input
                                  type='file'
                                  id='file-input-limpio'
                                  accept='image/*'
                                  multiple
                                  style={{ display: 'none' }}
                                  onChange={(e) =>
                                    handleFileChange3(e, 'imageLimpio')}
                                />
                                )
                              : <p style={{ color: 'red', marginTop: '10px' }}>
                                No puedes agregar más de 8 imágenes
                                </p>}
                            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                              {formData.imageLimpio.map((imageUrl, index) => (
                                <img
                                  key={index}
                                  src={imageUrl}
                                  alt='imageLimpio'
                                  style={{
                                    width: '200px',
                                    height: '200px',
                                    margin: '10px',
                                    objectFit: 'cover'
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <label style={{ marginBottom: 30 }}>
                    Pon una descripcion{' '}
                  </label>
                  <Input
                    type='text'
                    name='limpio'
                    value={formData.limpio}
                    onChange={handleInputChange}
                  />
                  <div style={{ marginBottom: 30 }}>
                    <label>Caja cerrada, en buen estado </label>
                    <div style={{ marginBottom: 20 }}>
                      <Button
                        style={{ flex: 5, marginRight: '10px' }}
                        name='optionCaja'
                        value='Si'
                        onClick={handleInputChange}
                      >
                        {' '}
                        Sí{' '}
                      </Button>
                      <Button
                        name='optionCaja'
                        value='No'
                        onClick={handleInputChange}
                      >
                        {' '}
                        No{' '}
                      </Button>
                      {formData.optionCaja === 'No' && (
                        <div>
                          <div style={{ marginBottom: 30 }}>
                            <Button>
                              <label
                                htmlFor='file-input-caja'
                                style={{ cursor: 'pointer' }}
                              >
                                Seleccionar Imagen
                              </label>
                            </Button>
                            {formData.imageCajaCerrada.length < 8
                              ? (

                                <input
                                  type='file'
                                  id='file-input-caja'
                                  accept='image/*'
                                  multiple
                                  style={{ display: 'none' }}
                                  onChange={(e) =>
                                    handleFileChange3(e, 'imageCajaCerrada')}
                                />
                                )
                              : <p style={{ color: 'red', marginTop: '10px' }}>
                                No puedes agregar más de 8 imágenes
                              </p>}

                            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                              {formData.imageCajaCerrada.map(
                                (imageUrl, index) => (
                                  <img
                                    key={index}
                                    src={imageUrl}
                                    alt='imageCajaCerrada'
                                    style={{ width: '200px', height: '200px', margin: '10px', objectFit: 'cover' }}
                                  />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <label>Description</label>
                  <Input
                    type='text'
                    name='cajaCerrada'
                    value={formData.cajaCerrada}
                    onChange={handleInputChange}
                  />
                  <div style={{ marginBottom: 30 }}>
                    <label>Lona en buen estado: </label>
                    <div style={{ marginBottom: 20 }}>
                      <Button
                        style={{ flex: 5, marginRight: '10px' }}
                        name='optionLona'
                        value='Si'
                        onClick={handleInputChange}
                      >
                        {' '}
                        Sí{' '}
                      </Button>
                      <Button
                        name='optionLona'
                        value='No'
                        onClick={handleInputChange}
                      >
                        {' '}
                        No{' '}
                      </Button>
                      {formData.optionLona === 'No' && (
                        <div>
                          <div style={{ marginBottom: 30 }}>
                            <Button>
                              <label htmlFor='file-input-lona' style={{ cursor: 'pointer' }}>
                                Seleccionar Imagen
                              </label>
                            </Button>

                            <input
                              type='file'
                              id='file-input-lona'
                              accept='image/*'
                              multiple
                              style={{ display: 'none' }}
                              onChange={(e) =>
                                handleFileChange3(e, 'imageLonaBuenEstado')}
                            />

                            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                              {formData.imageLonaBuenEstado.map(
                                (imageUrl, index) => (
                                  <img
                                    key={index}
                                    src={imageUrl}
                                    alt={`imageLonaBuenEstado-${index}`}
                                    style={{
                                      width: '200px',
                                      height: '200px',
                                      margin: '10px',
                                      objectFit: 'cover'
                                    }}
                                  />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <label>Descripcion</label>
                  <Input
                    type='text'
                    name='lona'
                    value={formData.lona}
                    onChange={handleInputChange}
                  />
                  <div style={{ marginBottom: 30 }}>
                    <label>Libre de fauna nociva: </label>
                    <div style={{ marginBottom: 20 }}>
                      <Button
                        style={{ flex: 5, marginRight: '10px' }}
                        name='optionLibre'
                        value='Si'
                        onClick={handleInputChange}
                      >
                        {' '}
                        Sí{' '}
                      </Button>
                      <Button
                        name='optionLibre'
                        value='No'
                        onClick={handleInputChange}
                      >
                        {' '}
                        No{' '}
                      </Button>
                      {formData.optionLibre === 'No' && (
                        <div>
                          <div style={{ marginBottom: 30 }}>
                            <Button>
                              <label
                                htmlFor='file-input-libre'
                                style={{ cursor: 'pointer' }}
                              >
                                Seleccionar Imagen
                              </label>
                            </Button>

                            <input
                              type='file'
                              id='file-input-libre'
                              accept='image/*'
                              multiple
                              style={{ display: 'none' }}
                              onChange={(e) =>
                                handleFileChange3(e, 'imageLibreFauna')}
                            />

                            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                              {formData.imageLibreFauna.map(
                                (imageUrl, index) => (
                                  <img
                                    key={index}
                                    src={imageUrl}
                                    alt={`Selected ${index}`}
                                    style={{
                                      width: '200px',
                                      height: '200px',
                                      margin: '10px',
                                      objectFit: 'cover'
                                    }}
                                  />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <label>Descripcion: </label>
                  <Input
                    type='text'
                    name='fauna'
                    value={formData.fauna}
                    onChange={handleInputChange}
                  />
                  <div style={{ marginBottom: 30 }}>
                    <label>Carga en buen estado: </label>
                    <div style={{ marginBottom: 20 }}>
                      <Button
                        style={{ flex: 5, marginRight: '10px' }}
                        name='optionCarga'
                        value='Si'
                        onClick={handleInputChange}
                      >
                        {' '}
                        Sí{' '}
                      </Button>
                      <Button
                        name='optionCarga'
                        value='No'
                        onClick={handleInputChange}
                      >
                        {' '}
                        No{' '}
                      </Button>
                      {formData.optionCarga === 'No' && (
                        <div>
                          <div style={{ marginBottom: 30 }}>
                            <Button>
                              <label htmlFor='file-input' style={{ cursor: 'pointer' }}>
                                Seleccionar Imagen
                              </label>
                            </Button>

                            <input
                              type='file'
                              id='file-input'
                              accept='image/*'
                              multiple
                              style={{ display: 'none' }}
                              onChange={(e) =>
                                handleFileChange3(e, 'imageCargaBuenEstado')}
                            />

                            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                              {formData.imageCargaBuenEstado.map(
                                (imageUrl, index) => (
                                  <img
                                    key={index}
                                    src={imageUrl}
                                    alt={`Selected ${index}`}
                                    style={{
                                      width: '200px',
                                      height: '200px',
                                      margin: '10px',
                                      objectFit: 'cover'
                                    }}
                                  />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <label>Descripcion: </label>
                  <Input
                    type='text'
                    name='carga'
                    value={formData.carga}
                    onChange={handleInputChange}
                  />
                  <div style={{ marginBottom: 30 }}>
                    <label>Seguridad de carga: </label>
                    <div style={{ marginBottom: 20 }}>
                      <Button
                        style={{ flex: 5, marginRight: '10px' }}
                        name='optionSeguridad'
                        value='Si'
                        onClick={handleInputChange}
                      >
                        {' '}
                        Sí{' '}
                      </Button>
                      <Button
                        name='optionSeguridad'
                        value='No'
                        onClick={handleInputChange}
                      >
                        {' '}
                        No{' '}
                      </Button>
                      {formData.optionSeguridad === 'No' && (
                        <div>
                          <div style={{ marginBottom: 30 }}>
                            <Button>
                              <label
                                htmlFor='file-input-seguridad'
                                style={{ cursor: 'pointer' }}
                              >
                                Seleccionar Imagen
                              </label>
                            </Button>

                            <input
                              type='file'
                              id='file-input-seguridad'
                              accept='image/*'
                              multiple
                              style={{ display: 'none' }}
                              onChange={(e) =>
                                handleFileChange3(e, 'imageSeguridadCarga')}
                            />

                            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                              {formData.imageSeguridadCarga.map(
                                (imageUrl, index) => (
                                  <img
                                    key={index}
                                    src={imageUrl}
                                    alt={`Selected ${index}`}
                                    style={{
                                      width: '200px',
                                      height: '200px',
                                      margin: '10px',
                                      objectFit: 'cover'
                                    }}
                                  />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <label>Descripcion: </label>
                  <Input
                    type='text'
                    name='seguridadCarga'
                    value={formData.seguridadCarga}
                    onChange={handleInputChange}
                  />
                  <div style={{ marginBottom: 30 }}>
                    <label>Sellado: </label>
                    <div style={{ marginBottom: 20 }}>
                      <Button
                        style={{ flex: 5, marginRight: '10px' }}
                        name='optionSellado'
                        value='Si'
                        onClick={handleInputChange}
                      >
                        {' '}
                        Sí{' '}
                      </Button>
                      <Button
                        name='optionSellado'
                        value='No'
                        onClick={handleInputChange}
                      >
                        {' '}
                        No{' '}
                      </Button>
                      {formData.optionSellado === 'No' && (
                        <div>
                          <div style={{ marginBottom: 30 }}>
                            <Button>
                              <label htmlFor='file-input-sellado' style={{ cursor: 'pointer' }}>
                                Seleccionar Imagen
                              </label>
                            </Button>

                            <input
                              type='file'
                              id='file-input-sellado'
                              accept='image/*'
                              multiple
                              style={{ display: 'none' }}
                              onChange={(e) =>
                                handleFileChange3(e, 'imageSellado')}
                            />

                            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                              {formData.imageSellado.map((imageUrl, index) => (
                                <img
                                  key={index}
                                  src={imageUrl}
                                  alt={`Selected ${index}`}
                                  style={{ width: '200px', height: '200px', margin: '10px', objectFit: 'cover' }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <label>Descripcion: </label>
                  <Input
                    type='text'
                    name='sellado'
                    value={formData.sellado}
                    onChange={handleInputChange}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type='single' collapsible style={{ padding: '8px 0' }}>
              <AccordionItem value='item-6'>
                <AccordionTrigger
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '2px solid #7A2A1E',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                >
                  Placas Caja
                </AccordionTrigger>
                <AccordionContent>
                  <label>Hay tarimas dañadas?: </label>
                  <Input
                    type='number'
                    name='tarimasDanadas'
                    value={formData.tarimasDanadas}
                    onChange={handleInputChange}
                  />
                  <label>Cajas Identificadas: </label>
                  <Input
                    type='number'
                    name='cajasIdentificadas'
                    value={formData.cajasIdentificadas}
                    onChange={handleInputChange}
                  />
                  <label>Cajas Dañadas por Maniobra: </label>
                  <Input
                    type='number'
                    name='danadasManiobra'
                    value={formData.danadasManiobra}
                    onChange={handleInputChange}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type='single' collapsible style={{ padding: '8px 0' }}>
              <AccordionItem value='item-2'>
                <AccordionTrigger
                  style={{
                    fontSize: '20px', // Tamaño de fuente grande
                    fontWeight: 'bold', // Negrita para mayor visibilidad
                    padding: '12px 16px', // Más espacio alrededor del texto
                    // backgroundColor: '#9A3324', // Fondo destacado (puedes cambiar el color si es necesario)
                    // color: '#fff', // Texto en color blanco para contraste
                    borderRadius: '8px', // Bordes redondeados para un diseño moderno
                    border: '2px solid #7A2A1E', // Borde para resaltar el elemento
                    textAlign: 'center', // Centrar el texto
                    cursor: 'pointer' // Cambia el cursor para que parezca un botón
                  }}
                >
                  Temperatura de Pulpa
                </AccordionTrigger>
                <AccordionContent>
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <h3>Puerta</h3>
                        </th>
                        <th>
                          <h3>Medio</h3>
                        </th>
                        <th>
                          <h3>Fondo</h3>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <label>A </label>
                        </td>
                        {/* <td><InputNumber value={formData.tempAPuerta} prefix="&uarr; " suffix="℃" min={0} max={40} /></td> */}
                        <td>
                          <Input
                            type='number'
                            name='tempAPuerta'
                            value={formData.tempAPuerta}
                            onChange={(e) => {
                              handleInputChange(e)
                            }}
                          />
                        </td>
                        <td>
                          <Input
                            type='number'
                            name='tempAMedio'
                            value={formData.tempAMedio}
                            onChange={(e) => {
                              handleInputChange(e)
                            }}
                          />
                        </td>
                        <td>
                          <Input
                            type='number'
                            name='tempAFondo'
                            value={formData.tempAFondo}
                            onChange={(e) => {
                              handleInputChange(e)
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>M </label>
                        </td>
                        <td>
                          <Input
                            type='number'
                            name='tempMPuerta'
                            value={formData.tempMPuerta}
                            onChange={(e) => {
                              handleInputChange(e)
                            }}
                          />
                        </td>
                        <td>
                          <Input
                            type='number'
                            name='tempMMedio'
                            value={formData.tempMMedio}
                            onChange={(e) => {
                              handleInputChange(e)
                            }}
                          />
                        </td>
                        <td>
                          <Input
                            type='number'
                            name='tempMFondo'
                            value={formData.tempMFondo}
                            onChange={(e) => {
                              handleInputChange(e)
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>B </label>
                        </td>
                        <td>
                          <Input
                            type='number'
                            name='tempBPuerta'
                            value={formData.tempBPuerta}
                            onChange={(e) => {
                              handleInputChange(e)
                            }}
                          />
                        </td>
                        <td>
                          <Input
                            type='number'
                            name='tempBMedio'
                            value={formData.tempBMedio}
                            onChange={(e) => {
                              handleInputChange(e)
                            }}
                          />
                        </td>
                        <td>
                          <Input
                            type='number'
                            name='tempBFondo'
                            value={formData.tempBFondo}
                            onChange={(e) => {
                              handleInputChange(e)
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={{ paddingTop: 10 }}>
                    <h3>
                      {' '}
                      <strong>Temperatura Ideal</strong>
                    </h3>
                    <Select
                      name='tempIdeal'
                      onValueChange={(value) =>
                        handleInputChange({
                          target: { name: 'tempIdeal', value }
                        })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona una fruta' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='4'>Manzanas (4°C)</SelectItem>
                        <SelectItem value='7'>Plátanos (7°C)</SelectItem>
                        <SelectItem value='1'>Uvas (1°C)</SelectItem>
                        <SelectItem value='0'>Fresas (0°C)</SelectItem>
                        <SelectItem value='-1'>Mango (-1°C)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <h2>Resultados de la Investigación</h2>
            <Input
              type='text'
              name='resultadosInv'
              value={formData.resultadosInv}
              onChange={handleInputChange}
            />

<Card>
      <CardHeader>
        <CardTitle>Datos de Calidad y Transporte</CardTitle>
        <CardDescription>Proporcione los datos requeridos y firme en los campos indicados.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Names and Signatures Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
            {/* Inspector Section */}
            <div style={{ flex: 1, textAlign: 'center' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                Nombre Inspector de Calidad
              </label>
              <Input
                type="text"
                name="nombreInspector"
                value={formData.nombreInspector}
                onChange={handleInputChange}
                style={{ marginBottom: '10px', width: '100%' }}
              />
              <h2 style={{ margin: '10px 0' }}>Firma Inspector de Calidad</h2>
              <div
                style={{
                  border: '2px solid black',
                  padding: 10,
                  display: 'inline-block',
                  boxSizing: 'border-box',
                }}
              >
                <SignatureCanvas
                  ref={signaturePadInspector}
                  penColor="black"
                  canvasProps={{ width: 250, height: 100, className: 'signature-canvas' }}
                />
              </div>
            </div>

            {/* Chofer Section */}
            <div style={{ flex: 1, textAlign: 'center' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Nombre Chofer</label>
              <Input
                type="text"
                name="nombreChofer"
                value={formData.nombreChofer}
                onChange={handleInputChange}
                style={{ marginBottom: '10px', width: '100%' }}
              />
              <h2 style={{ margin: '10px 0' }}>Firma del Chofer</h2>
              <div
                style={{
                  border: '2px solid black',
                  padding: 10,
                  display: 'inline-block',
                  boxSizing: 'border-box',
                }}
              >
                <SignatureCanvas
                  ref={signaturePadChofer}
                  penColor="black"
                  canvasProps={{ width: 250, height: 100, className: 'signature-canvas' }}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p style={{ textAlign: 'center' }}>
          Revise los datos y asegúrese de que las firmas sean claras antes de proceder.
        </p>
      </CardFooter>
    </Card>
            <div style={{ paddingTop: 5 }} />
            <Button onClick={clearSignature}>Limpiar Firma</Button>
            <Button onClick={saveSignature}>Guardar Firma</Button>

            <Button onClick={handleInsert}>Guardar datos en la Bd</Button>
          </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Ver PDF</Button>
          </DialogTrigger>
        <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Vista del Documento</DialogTitle>
          <DialogDescription>
            Navega por el documento PDF y haz clic en los botones para moverte entre las páginas.
          </DialogDescription>
        </DialogHeader>

        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {currentPage === 1 && (
            <Button onClick={goToNextPage} style={{ padding: '10px 20px', fontSize: '16px' }}>
              Ir a la Página 2
            </Button>
          )}
          {currentPage === 2 && (
            <Button onClick={goToPreviousPage} style={{ padding: '10px 20px', fontSize: '16px' }}>
              Ir a la Página 3
            </Button>
          )}

          {currentPage === 3 && (
            <Button onClick={goToNextPage2} style={{ padding: '10px 20px', fontSize: '16px' }}>
              Volver a la Página 1
            </Button>
          )}

          <PDFViewer width='100%' height='500px'>
            <ActaPDF
              formData={formData}
              firmaBase64Inspector={firmaBase64Inspector}
              firmaBase64Chofer={firmaBase64Chofer}
              currentPage={currentPage}
            />
          </PDFViewer>

          <div style={{ padding: '10px', display: 'flex', justifyContent: 'center' }} />
          <div style={{ marginTop: 20, textAlign: 'center' }} />
        </div>

        <DialogFooter>
          <Button variant="outline">Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </Layout>
  )
}

export default ActaDeLlegada
