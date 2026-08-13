import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // Real layihədə burda xətanı bir monitorinq servisinə (Sentry və s.) göndərərdik
    console.error('ErrorBoundary tutdu:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Nəsə səhv getdi 😕</h2>
          <p>Bu hissədə xəta baş verdi, amma tətbiqin qalan hissəsi işləyir.</p>
          <button onClick={this.handleReset}>Yenidən cəhd et</button>
        </div>
      )
    }

    return this.props.children
  }
}