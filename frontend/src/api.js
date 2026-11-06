// A API responde text/plain, por isso usamos response.text() (e não .json()).

export class ApiError extends Error {
  constructor(kind, status) {
    super(kind === 'http' ? `HTTP ${status}` : 'Falha de rede')
    this.kind = kind // 'http' | 'network'
    this.status = status
  }
}

export async function fetchHello(lang, signal) {
  let response
  try {
    response = await fetch(`/hello/${encodeURIComponent(lang)}`, { signal })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new ApiError('network')
  }
  if (!response.ok) throw new ApiError('http', response.status)
  return response.text()
}

export function describeError(error, lang) {
  if (error.kind === 'http' && error.status === 400) {
    return `O idioma "${lang}" não é suportado. Use en, pt ou es.`
  }
  if (error.kind === 'http') {
    return `A API respondeu com erro ${error.status}. Veja o log do servidor.`
  }
  return 'Não foi possível falar com a API em localhost:8080. Inicie-a com "mvn spring-boot:run".'
}
