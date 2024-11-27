const API = import.meta.env.VITE_HOST_API as string

const CARRIERS: string = '/carrierLines'
const PURCHASES: string = '/purchases'
const ALL: string = '/all'
const ID: string = '/id'
const AGENTS: string = '/agents'
const PROVIDERS: string = '/providers'
const LOCATIONS: string = '/locations'
const SHIPMENTS: string = '/shipments'
const EVENTS: string = '/events'
const EVENTS_CATALOG: string = '/eventCatalog'
const LOGIN: string = '/login'
const AUTH: string = '/auth'
const CREATE: string = '/register'
const USERS: string = '/users'
const INTELISIS_USERS: string = '/intelisisUsers'

const PC: string = '/pc'
const MOV: string = '/mov'
const PCD: string = '/pc-details'
const ARTICLE: string = '/article'
const PRICE_LIST: string = '/price-list'
const PRICE_LIST_D: string = '/price-list-details'
const LOT_SERIES: string = '/lot-series'

const KEYS: string = '/keys'
const SERIE: string = '/serie'

const SPECIES: string = '/species'
const CATEGORIES: string = '/categories'
const SIZES: string = '/sizes'
const VARIETIES: string = '/varieties'
const LABELS: string = '/labels'
const PRICES: string = '/prices'
const QUALITY: string = '/qualities'
const PACKAGING: string = '/packaging'
const PRESENTATIONS: string = '/presentations'
const SPECIAL_PRICES: string = '/special-prices'
const INVENTORY: string = '/inventory'

const OC: string = '/oc'

export {
  AGENTS, ALL, API, ARTICLE, AUTH, CARRIERS, CATEGORIES, CREATE, EVENTS, EVENTS_CATALOG, ID, INTELISIS_USERS, INVENTORY, KEYS, LABELS, LOCATIONS, LOGIN, LOT_SERIES, MOV, PACKAGING, PC, PCD, PRESENTATIONS, PRICES, PRICE_LIST,
  PRICE_LIST_D, PROVIDERS, PURCHASES, QUALITY, SERIE, SHIPMENTS, SIZES, SPECIAL_PRICES, SPECIES, USERS, VARIETIES, OC
}
