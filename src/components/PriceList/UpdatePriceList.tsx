/*
import { useEffect, useState } from 'react'
import axios from 'axios'

import ModalUpdatePriceList from './ModalUpdatePriceList'

import PC from '../../interfaces/PC'
import Mov from '../../interfaces/Mov'
import Specie from '../../interfaces/Specie'
import Article from '../../interfaces/Article'
import Category from '../../interfaces/Category'
import PriceList from '../../interfaces/PriceList'

import {
  API,
  PRICE_LIST,
  PC as PCR, MOV,
  ARTICLE,
  ALL,
  CATEGORIES, CREATE,
  PCD as PCDR, SPECIES
} from '../../config/Constants'

const UpdatePriceList = () => {
  const [priceLists, setPriceLists] = useState<PriceList[]>([])
  const [priceList, setPriceList] = useState<string>('')
  const [currency, setCurrency] = useState<string>('')
  const [exchangeRate, setExchangeRate] = useState<string>('')
  const [user, setUser] = useState<string>('')
  const [branch, setBranch] = useState<string>('')
  const [reference, setReference] = useState<string>('')
  const [articles, setArticles] = useState<Article[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [articleObjs, setArticleObjs] = useState<Article[]>([])
  const [articleKeys, setArticleKeys] = useState<Article[]>([])
  const [articleKey, setArticleKey] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [categories, setCategories] = useState<Category[]>([])
  const [category, setCategory] = useState<string>('')
  const [species, setSpecies] = useState<Specie[]>([])

  useEffect(() => {
    getPriceLists()
    getArticles()
    getCategories()
    getSpecies()
  }, [])

  const getPriceLists = async (): Promise<void> => {
    const res = await axios.get(`${API}${PRICE_LIST}${ALL}`)
    if (res.status === 200) {
      setPriceLists(res.data.priceLists)
    }
  }

  const getArticles = async (): Promise<void> => {
    const res = await axios.get(`${API}${ARTICLE}${ALL}`)
    setArticleObjs(res.data.articles)
  }

  const setClgPriceList = (string: string): void => {
    setPriceList(string)
  }

  const getCategories = async (): Promise<void> => {
    const res = await axios.get(`${API}${ARTICLE}${CATEGORIES}${ALL}`)
    setCategories(res.data.categories)
  }

  const getSpecies = async (): Promise<void> => {
    const res = await axios.get(`${API}${ARTICLE}${SPECIES}${ALL}`)
    setSpecies(res.data.species)
  }
  // const getArticleKeys = async(): Promise<void> => {
  //     const res = await axios.get(`${API}${ARTICLE}${KEYS}/${categorie}`);
  //     setArticleKeys(res.data.keys);
  // }

  const getArticleKeys = (value: string): void => {
    setCategory(value)
    const artKeys: Article[] = articleObjs.filter(
      (art: Article) => art.Categoria === value
    )
    setArticleKeys(artKeys)
  }

  const resetVariables = (): void => {
    setExchangeRate('')
    setUser('')
    setBranch('')
    setReference('')
    setPrice('')
    setArticles([])
  }

  // const filterArticle = (searchValue: string): void => {
  //     const articles
  // }

  const updateArticles = async (): Promise<void> => {
    if (articleKey === '' || price === '') {
      alert('Por favor, completa todos los campos obligatorios.')
      return
    }

    if (articles.some((art: Article) => art.Articulo === articleKey)) {
      alert(`El Articulo: ${articleKey} ya se encuentra insertado`)
      return
    }

    const article: Article = {
      Articulo: articleKey,
      Nuevo: Number(price)
    }

    setArticles([...articles, article])
    closeModal()
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const storePC = async (): Promise<any> => {
    const pc: PC = {
      Moneda: currency,
      TipoCambio: Number(exchangeRate),
      Usuario: user,
      Sucursal: Number(branch),
      Referencia: reference,
      ListaModificar: priceList
    }
    const res = await axios.post(`${API}${PCR}${CREATE}`, pc)
    return res
  }

  const storeMov = async (id: number): Promise<any> => {
    const mov: Mov = {
      Modulo: 'PC',
      ID: id
    }
    const res = await axios.post(`${API}${MOV}${CREATE}`, mov)
    return res
  }

  // const storeArticles = async(id: number): Promise<boolean> => {
  //     articles.forEach(async(art: Article) => {
  //         const resPCD = await axios.post(
  //             `${API}${PCD}${CREATE}`,
  //             {
  //                 ID: id,
  //                 Articulo: art.Articulo,
  //                 Nuevo: art.Nuevo
  //             }
  //         );
  //         console.log({
  //             ID: id,
  //             Articulo: art.Articulo,
  //             Nuevo: art.Nuevo
  //         })

  //         console.log(resPCD)
  //         if (resPCD.status !== 201){
  //             alert('Error al registrar los articulos en PCD');
  //             return false;
  //         };

  //         const resPriceListD = await axios.post(
  //             `${API}${PRICE_LISTD}${CREATE}`,
  //             {
  //                 ID: id,
  //                 Articulo: art.Articulo
  //             }
  //         );
  //         console.log({
  //             ID: id,
  //             Articulo: art.Articulo
  //         })
  //         if ([200, 201].includes(resPriceListD.status)){
  //             alert('Error al registrar los articulos en ListaPreciosD');
  //             return false;
  //         }
  //     });
  //     return true;
  // }

  const storeArticles = async (id: number): Promise<boolean> => {
    for (const art of articles) {
      try {
        const resPCD = await axios.post(
                    `${API}${PCDR}${CREATE}`,
                    {
                      ID: id,
                      Articulo: art.Articulo,
                      Nuevo: art.Nuevo
                    }
        )
        console.log({
          ID: id,
          Articulo: art.Articulo,
          Nuevo: art.Nuevo
        })

        console.log(resPCD)
        if (resPCD.status !== 201) {
          alert('Error al registrar los articulos en PCD')
          return false
        };

        const resPriceListD = await axios.post(
                    `${API}${PRICE_LISTD}${CREATE}`,
                    {
                      ID: id,
                      Articulo: art.Articulo
                    }
        )
        console.log({
          ID: id,
          Articulo: art.Articulo
        })
        if (![200, 201].includes(resPriceListD.status)) {
          alert('Error al registrar los articulos en ListaPreciosD')
          return false
        }
      } catch (error) {
        alert('Error al registrar los articulos')
        return false
      }
    }
    return true
  }

  const store = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currency === '' && exchangeRate === '') {
      alert('Por favor, completa todos los campos obligatorios')
      return
    }

    const resPC = await storePC()

    if (resPC.status !== 201) {
      alert('Ocurrio un error al guardar')
      return
    };

    const resMov = await storeMov(resPC.data.pc.ID)

    if (resMov.status !== 201) {
      alert('Error al registrar el movimiento')
      return
    };

    const resArticles: boolean = await storeArticles(resPC.data.pc.ID)

    if (resArticles) {
      resetVariables()
      alert(resPC.data.message)
    } else {

    }
  }

  return (
    <div className='container-sm'>
      <h1>Actualizar Lista De Precios</h1>
      <form onSubmit={store}>
        <div className='row'>
          <div className='col'>
            <label className='form-label mt-3'>Lista *</label>
            <select className='form-select' onChange={e => { setClgPriceList(e.target.value) }}>
              <option key='' value='' selected>Selecciona una lista</option>
              {
                                priceLists.map(pl => {
                                  return (
                                    <option value={pl.Lista}>{pl.Lista}</option>
                                  )
                                })
                            }
            </select>
          </div>
          <div className='col'>
            <label className='form-label mt-3'>Moneda</label>
            <select className='form-select' onChange={e => { setCurrency(e.target.value) }}>
              <option value='' selected>Selecciona una moneda</option>
              <option value='Pesos'>Pesos</option>
              <option value='USD'>Dolares</option>
            </select>
          </div>
          <div className='col'>
            <label className='form-label mt-3'>Tipo de cambio</label>
            <input
              type='number'
              min={0}
              value={exchangeRate}
              onChange={(e) => { setExchangeRate(e.target.value) }}
              className='form-control'
            />
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <label className='form-label mt-3'>Usuario</label>
            <input
              type='text'
              value={user}
              onChange={(e) => { setUser(e.target.value) }}
              className='form-control'
            />
          </div>
          <div className='col'>
            <label className='form-label mt-3'>Sucursal</label>
            <input
              type='number'
              min={0}
              value={branch}
              onChange={(e) => { setBranch(e.target.value) }}
              className='form-control'
            />
          </div>
          <div className='col'>
            <label className='form-label mt-3'>Referencia</label>
            <textarea
              value={reference}
              onChange={(e) => { setReference(e.target.value) }}
              className='form-control'
              rows={1}
              maxLength={50}
            />
          </div>
        </div>

        <div className='row'>

          <div className='col'>
            <label className='form-label mt-3'>Especie</label>
            <select className='form-select'>
              <option key='' value=''>Selecciona una especie</option>
              {
                                species.map((item: Specie) => {
                                  return (
                                    <option key={item.NombreCorto} value={item.NombreCorto}>
                                      {item.NombreCorto}
                                    </option>
                                  )
                                })
                            }
            </select>
          </div>

          <div className='col'>
            <label className='form-label mt-3'>Categoria</label>
            <select className='form-select' onChange={e => { getArticleKeys(e.target.value) }}>
              <option key='' value=''>Selecciona una categoria</option>
              {
                                categories.map((item: Category) => {
                                  return (
                                    <option key={item.Categoria} value={item.Categoria}>
                                      {item.Categoria}
                                    </option>
                                  )
                                })
                            }
            </select>
          </div>

          <div className='col'>
            <label className='form-label mt-3'>Articulo</label>
            <select className='form-select' onChange={e => { setArticleKey(e.target.value) }}>
              <option key='' value=''>Selecciona un articulo</option>
              {
                                articleKeys.map((key: Article) => {
                                  return (
                                    <option key={key.Articulo} value={key.Articulo}>
                                      {key.Articulo}
                                    </option>
                                  )
                                })
                            }
            </select>
          </div>

          <div className='col'>
            <label className='form-label mt-3'>Nuevo Precio</label>
            <input
              type='number'
              min={0}
              value={price}
              onChange={e => { setPrice(e.target.value) }}
              className='form-control'
            />
          </div>

          <div className='col'>
            <button
              type='button'
              className='btn btn-primary mt-5'
              onClick={updateArticles}
            >
              Agregar Articulo
            </button>
          </div>
        </div>

        <table className='table table-striped mt-3'>
          <thead className='thead-dark'>
            <tr>
              <th>Articulo</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {
                            articles.map((article: Article) => {
                              return (
                                <tr key={article.Articulo}>
                                  <td>{article.Articulo}</td>
                                  <td>{article.Nuevo}</td>
                                </tr>
                              )
                            })
                        }
          </tbody>
        </table>

        {/* <button type="submit" className="btn btn-primary mt-3">Guardar</button> */
/* }
      </form>
      {showModal && <ModalUpdatePriceList
        articles={articles}
        setShowModal={setShowModal}
        setArticles={setArticles}
                    />}
    </div>
  )
}

export default UpdatePriceList
*/
