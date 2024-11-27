export interface OptionInterface {
  value: string | number
  label: string
}

export interface PurchaseInterface {
  ID: number
  Empresa: string
  Mov: string
  MovID: string
  FechaEmision: Date
  UltimoCambio: Date
  Concepto: string
  Proyecto: null
  Actividad: null
  UEN: null
  Moneda: string
  TipoCambio: number
  Usuario: string
  Autorizacion: null
  Referencia: string
  DocFuente: null
  Observaciones: null
  Estatus: string
  Situacion: null
  SituacionFecha: null
  SituacionUsuario: null
  SituacionNota: null
  Directo: boolean
  VerDestino: boolean
  Prioridad: string
  RenglonID: number
  Proveedor: string
  FormaEnvio: null
  FechaRequerida: Date
  Almacen: string
  Condicion: string
  Vencimiento: Date
  Manejo: null
  Fletes: null
  ActivoFijo: boolean
  Instruccion: null
  Agente: string
  Descuento: null
  DescuentoGlobal: null
  Importe: number
  Impuestos: number
  Saldo: null
  DescuentoLineal: number
  OrigenTipo: string
  Origen: string
  OrigenID: null
  Poliza: string
  PolizaID: string
  GenerarPoliza: boolean
  ContID: number
  Ejercicio: number
  Periodo: number
  FechaRegistro: Date
  FechaConclusion: Date
  FechaCancelacion: null
  Peso: number
  Volumen: number
  Conciliado: boolean
  Causa: null
  Atencion: null
  FechaEntrega: Date
  EmbarqueEstado: null
  Sucursal: number
  ZonaImpuesto: null
  Paquetes: number
  Idioma: null
  IVAFiscal: number
  IEPSFiscal: number
  ListaPreciosEsp: null
  EstaImpreso: boolean
  Mensaje: null
  Logico1: boolean
  Logico2: boolean
  Logico3: boolean
  Logico4: boolean
  Logico5: boolean
  Logico6: boolean
  Logico7: boolean
  Pagado: null
  ProrrateoAplicaID: null
  FormaEntrega: null
  CancelarPendiente: boolean
  LineaCredito: null
  TipoAmortizacion: null
  TipoTasa: null
  Comisiones: null
  ComisionesIVA: null
  OperacionRelevante: boolean
  VIN: null
  SubModulo: string
  AutoCargos: null
  TieneTasaEsp: boolean
  TasaEsp: null
  Cliente: null
  ContUso: null
  ContUso2: null
  ContUso3: null
  ContratoID: null
  ContratoMov: null
  ContratoMovID: null
  TipoComprobante: null
  SustentoComprobante: null
  TipoIdentificacion: null
  DerechoDevolucion: boolean
  Establecimiento: null
  PuntoEmision: null
  SecuencialSRI: null
  AutorizacionSRI: null
  VigenteA: null
  SecuenciaRetencion: null
  Comprobante: boolean
  FechaContableMov: null
  PuntoEmisionRetencion: null
  SecuencialSRIRetencion: null
  FechaProveedor: Date
  SincroID: SincroID
  SincroC: number
  SucursalOrigen: number
  SucursalDestino: null
  CFFTImportacionIGIAcreedor: null
  CFDFlexEstatus: null
  CFDTimbrado: boolean
  Entidad: null
  ReferenciaMES: null
  MovIntelisisMES: null
  PosicionWMS: null
  Retencion: null
  Posicion: null
  CrossDocking: boolean
  MesLanzamiento: null
  CFDRetencionTimbrado: boolean
  vicReferenciaExtra: null
  FormadePago: null
  CFFTeCllbID: null
  CFFTeCllbEmpresa: null
  CFFTeCllbModulo: null
  Notas: null
  CFFTPrioridad: null
  ETA: null
  DatosTransporte: null
  EstatusArribo: null
  HorarioCita: null
  FrioCamara: null
  Temperaturas: null
}

export interface LocationInterface {
  id: number
  location: string
  city: string
  estate: string
  code: string
  name: string
  identity: string
  address: string
  gps: string | null
  createdAt: string
  updatedAt: string
  comments: string
}

export interface ShipmentInterface {
  id: number
  agent: string
  purchase: any
  provider: string
  shipmentDate: string
  status: string
  orderPurchase: number
  arrivalDate: string
  origin: number
  destination: number
  createdAt: string
  updatedAt: string
  comments: string
}

export interface SincroID {
  type: string
  data: number[]
}

export interface ResponsePurchase {
  message: string
  purchases: PurchaseInterface[]
}

export interface ResponsePurchaseDetails {
  status: boolean
  message: string
  purchases: PurchaseInterface[]
}

export interface AgentInterface {
  Agente: string
  Nombre: string
}

export interface ResponseAgents {
  message: string
  agents: AgentInterface[]
}

export interface ResponseLocations {
  status: boolean
  message: string
  locations: LocationInterface[]
}

export interface ResponseShipments {
  status: boolean
  message: string
  shipments?: ShipmentInterface[]
}

export interface ResponseShipmentDetails {
  status: boolean
  message: string
  shipment?: ShipmentInterface
}
