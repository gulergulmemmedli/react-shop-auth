# 🛒 React Shop (Auth + Qlobal State)

Mock autentifikasiya, qorunan marşrutlar, qlobal state idarəetməsi (Context API + useReducer), form validasiyası və optimistic UI ilə CRUD əməliyyatları olan e-ticarət səbəti tətbiqi.

## 📦 İstifadə olunan texnologiyalar

- **React 18** (function components + hooks)
- **React Router** — naviqasiya və qorunan marşrutlar
- **Context API + useReducer** — auth və səbət üçün qlobal state
- **json-server** — mock REST API
- **Vite** — build tool / dev server

## 🚀 Quraşdırma və işə salma

1. Repozitoriyanı klonlayın:
```bash
git clone https://github.com/gulergulmemmedli/react-shop-auth.git
cd react-shop-auth
```

2. Asılılıqları yükləyin:
```bash
npm install
```

3. Mock API-ni işə salın (ayrıca terminalda):
```bash
npm run server
```
Bu, `http://localhost:4000` ünvanında `/products` və `/cart` endpoint-lərini açır.

4. Dev server-i işə salın (başqa bir terminalda):
```bash
npm run dev
```
Brauzerdə `http://localhost:5173` açın.

## 🔑 Test istifadəçisi

Bu tətbiqdə real qeydiyyat yoxdur (mock autentifikasiyadır). Giriş üçün:

- Email: `test@shop.com`
- Şifrə: `parol123`

## 📁 Layihə strukturu

```
src/
├── api/
│   ├── client.js       # Mərkəzi fetch wrapper, 401/token expiry idarəsi
│   ├── products.js
│   └── cart.js
├── features/
│   ├── auth/
│   │   ├── AuthContext.jsx    # Auth qlobal state (useReducer)
│   │   ├── authReducer.js
│   │   ├── LoginPage.jsx
│   │   └── ProtectedRoute.jsx
│   └── cart/
│       ├── CartContext.jsx    # Səbət qlobal state (useReducer)
│       ├── cartReducer.js
│       ├── ProductList.jsx
│       ├── ProductCard.jsx
│       └── CartPage.jsx
├── components/
│   ├── Navbar.jsx
│   └── ErrorBoundary.jsx
├── pages/
│   ├── HomePage.jsx
│   └── NotFoundPage.jsx
└── App.jsx
```

## ✨ Əsas funksionallıq

- **Qorunan marşrutlar:** `/cart` yalnız giriş etmiş istifadəçilər üçün açıqdır; `ProtectedRoute` login olmayanı `/login`-ə yönləndirir (`replace` ilə, "geri" düyməsi ilə qorunan səhifəyə qayıtmaq mümkün olmasın deyə).
- **Sessiya bərpası:** Token `localStorage`-da saxlanılır; səhifə yenilənəndə `AuthContext` sessiyanı avtomatik bərpa edir.
- **Token expiration:** Token ömrü test məqsədilə qəsdən qısa saxlanılıb (2 dəqiqə). Vaxtı bitmiş token aşkarlanan kimi (növbəti API sorğusunda və ya sessiya bərpasında) istifadəçi avtomatik logout olunur və login-ə yönləndirilir.
- **Logout təmizliyi:** Çıxış zamanı həm `localStorage`, həm də tətbiq daxili state tam sıfırlanır.
- **Optimistic UI:** Səbətə məhsul əlavə etmə/silmə/miqdar dəyişmə UI-da dərhal əks olunur, server sorğusu arxa planda gedir. Sorğu uğursuz olarsa, əvvəlki vəziyyətə geri qaytarılır (rollback).
- **Stale closure nümunəsi:** `CartPage`-də `useEffect`-in dependency array-i qəsdən nümayiş üçün izah olunub — asılılıq əskik olduqda funksiyanın köhnə state-i "yaddaşda saxlaması" probleminə düzgün həll göstərilib.
- **Error Boundary:** Class komponent kimi yazılıb; bir hissədə xəta baş versə, bütün tətbiq çökmür.

## 🔧 Bilinən məhdudiyyətlər

- Qeydiyyat (register) funksiyası yoxdur, yalnız əvvəlcədən müəyyən edilmiş test istifadəçisi mövcuddur.
- `json-server` real backend deyil, yalnız inkişaf/test məqsədi daşıyır.