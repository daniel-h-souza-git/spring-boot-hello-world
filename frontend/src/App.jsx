import { useRef, useState } from 'react'
import FlapBoard from './FlapBoard.jsx'
import { ApiError, describeError, fetchHello } from './api.js'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'pt', label: 'Português' },
  { code: 'es', label: 'Español' },
]

export default function App() {
  const [board, setBoard] = useState({ text: 'Escolha um idioma', tone: 'idle' })
  const [request, setRequest] = useState(null) // { lang, status }
  const [problem, setProblem] = useState('')
  const [loading, setLoading] = useState(false)
  const [custom, setCustom] = useState('')
  const controller = useRef(null)

  async function load(rawLang) {
    const lang = rawLang.trim()
    if (!lang) return
    controller.current?.abort()
    controller.current = new AbortController()
    setLoading(true)
    setProblem('')
    try {
      const text = await fetchHello(lang, controller.current.signal)
      setBoard({ text, tone: 'ok' })
      setRequest({ lang, status: 200 })
    } catch (error) {
      if (error.name === 'AbortError') return
      const status = error instanceof ApiError && error.kind === 'http' ? error.status : null
      setBoard({ text: status ? `Erro ${status}` : 'Sem conexão', tone: 'error' })
      setRequest({ lang, status })
      setProblem(describeError(error, lang))
    } finally {
      setLoading(false)
    }
  }

  function submitCustom(event) {
    event.preventDefault()
    load(custom)
  }

  return (
    <main className="page">
      <header className="intro">
        <h1>Diga olá em outro idioma</h1>
        <p>
          Cada botão chama a API Spring Boot em <code>GET /hello/&#123;idioma&#125;</code> e a
          resposta aparece no painel.
        </p>
      </header>

      <FlapBoard text={board.text} tone={board.tone} />

      <p className="request" aria-hidden={!request}>
        {request
          ? `GET /hello/${request.lang}   ${request.status ?? 'sem resposta'}`
          : ' '}
      </p>

      <section className="controls" aria-label="Idiomas">
        <div className="languages">
          {LANGUAGES.map(({ code, label }) => (
            <button
              key={code}
              type="button"
              className="lang"
              aria-pressed={request?.lang === code && !problem}
              disabled={loading}
              onClick={() => load(code)}
            >
              <span className="code">{code}</span>
              {label}
            </button>
          ))}
        </div>

        <form className="custom" onSubmit={submitCustom}>
          <label htmlFor="custom-lang">Outro idioma</label>
          <div className="custom-row">
            <input
              id="custom-lang"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="fr"
              autoComplete="off"
              spellCheck="false"
            />
            <button type="submit" className="send" disabled={loading || !custom.trim()}>
              Buscar mensagem
            </button>
          </div>
        </form>
      </section>

      {problem && (
        <p className="problem" role="alert">
          {problem}
        </p>
      )}
    </main>
  )
}
