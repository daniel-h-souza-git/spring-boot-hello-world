import { afterEach, describe, expect, it, vi } from 'vitest'
import { ApiError, describeError, fetchHello } from '../src/api.js'

afterEach(() => vi.unstubAllGlobals())

describe('fetchHello', () => {
  it('devolve o corpo text/plain quando a API responde 200', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('Olá, Mundo!', { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)

    await expect(fetchHello('pt')).resolves.toBe('Olá, Mundo!')
    expect(fetchMock).toHaveBeenCalledWith('/hello/pt', expect.anything())
  })

  it('lança ApiError http com status 400 para idioma não suportado', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 400 })))

    await expect(fetchHello('fr')).rejects.toMatchObject({ kind: 'http', status: 400 })
  })

  it('lança ApiError de rede quando a API está fora do ar', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))

    await expect(fetchHello('en')).rejects.toMatchObject({ kind: 'network' })
  })

  it('codifica o idioma na URL', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('x', { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)

    await fetchHello('a/b')
    expect(fetchMock).toHaveBeenCalledWith('/hello/a%2Fb', expect.anything())
  })
})

describe('describeError', () => {
  it('explica o 400 citando o idioma digitado', () => {
    expect(describeError(new ApiError('http', 400), 'fr')).toContain('"fr"')
  })

  it('orienta a iniciar a API em caso de falha de rede', () => {
    expect(describeError(new ApiError('network'), 'en')).toContain('mvn spring-boot:run')
  })
})
