import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './features/auth/AuthContext.jsx'
import { CartProvider } from './features/cart/CartContext.jsx'
import { ProtectedRoute } from './features/auth/ProtectedRoute.jsx'
import { LoginPage } from './features/auth/LoginPage.jsx'
import { Navbar } from './components/Navbar.jsx'
import { ErrorBoundary } from './components/ErrorBoundary.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'
import { CartPage } from './features/cart/CartPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ErrorBoundary>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App