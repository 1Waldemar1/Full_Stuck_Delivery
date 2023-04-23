export class Api {
  constructor(private baseUrl = 'http://localhost:3000/') {}

  async get(path: string, param?: { [key: string]: string} ) {
    const queryParam = param
      ? '?' +
        Object.entries(param)
          .map(el => {
            return `${el[0]}=${el[1]}`
          })
          .join('&')
      : ''
    
    const request = await fetch(this.baseUrl + path + queryParam)
    return await request.json()
  }
}

export const api = new Api()

export const productApi = {
  path: 'product/',
  async getAll<T>(): Promise<T> {
    return await api.get(this.path)
  },
  async getById(id: string) {
    return await api.get(this.path + id)
  },
}

export const clientApi = {
  path: 'client/',
  async getAll() {
    return await api.get(this.path)
  }
}

export const courierApi = {
  path: 'courier/',
  async getAll() {
    return await api.get(this.path)
  }
}

export const orderApi = {
  path: 'order/',
  async getAll() {
    return await api.get(this.path)
  }
}

export const ListOfProductsApi = {
  path: 'list-of-products/',
  async getAll() {
    return await api.get(this.path)
  }
}