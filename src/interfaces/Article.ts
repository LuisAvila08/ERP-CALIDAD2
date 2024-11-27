export interface Article {
  ID?: number
  Articulo: string
  Nuevo?: number
  Categoria?: string
}

export interface Specie {
  NombreCorto: string
}

export interface Size {
  Grupo: string
}

export interface Variety {
  Familia: string
}

export interface Label {
  Fabricante: string
}

export interface Quality {
  Calidad: string
}

export interface Packaging {
  TipoEmpaque: string
}

export interface Presentation {
  Presentacion: string
}

export interface ResponsePresentations {
  message: string
  presentations: Presentation[]
}

export interface ResponsePackaging {
  message: string
  packaging: Packaging[]
}

export interface ResponseQuality {
  message: string
  qualities: Quality[]
}

export interface ResponseSpecies {
  message: string
  species: Specie[]
}

export interface ResponseSizes {
  message: string
  sizes: Size[]
}

export interface ResponseVarieties {
  message: string
  varieties: Variety[]
}

export interface OptionInterface {
  value: string
  label: string
}

export interface ResponseLabels {
  message: string
  labels: Label[]
}
