# React Shop

Bu, universitet təcrübəsi çərçivəsində hazırladığım tapşırıqdır. Login sistemi, qorunan səhifələr, səbət kimi hissələri olan kiçik bir e-ticarət tətbiqidir.

## Nə edir

Giriş edib çıxış etmək olur, sabit bir test istifadəçisi ilə (real qeydiyyat yoxdur). Login olmadan səbət səhifəsinə girmək mümkün deyil, avtomatik login səhifəsinə atır. Səhifəni yeniləyəndə də giriş yadda qalır, çünki məlumat localStorage-da saxlanılır. Məhsulları səbətə əlavə etmək, silmək və sayını dəyişmək olur, bu zaman UI dərhal yenilənir, serverin cavabını gözləmədən. Formada sadə validasiya var, email formatı və şifrə uzunluğu yoxlanılır. Bir yerdə xəta baş versə, bütün sayt yox, elə həmin hissə "sınır", qalan hissə işləməyə davam edir.

## Texnologiyalar

React və Vite ilə qurulub, naviqasiya üçün React Router istifadə olunub. Qlobal state Context API və useReducer ilə idarə olunur, Redux işlədilməyib. Backend əvəzinə json-server istifadə olunub.

## Necə işə salmaq

Əvvəlcə `npm install` ilə paketləri yüklə. Sonra iki ayrı terminalda `npm run server` (saxta API-ni port 4000-də açır) və `npm run dev` (tətbiqin özünü, adətən port 5173-də) işə sal. Login üçün email olaraq test@shop.com, şifrə olaraq isə parol123 istifadə et.

## Struktur

src/features qovluğu içində auth və cart bir-birindən ayrı saxlanılıb, hər birinin öz context-i, reducer-i və komponentləri var. src/api içində fetch sorğuları, src/components içində isə navbar və error boundary kimi ortaq komponentlər yerləşir.

## Demo

Frontend bu linkdə: https://react-shop-auth-idmtvtkj7-glr5.vercel.app. Backend Render-in pulsuz planında olduğu üçün, bir müddət istifadə olunmasa "yatır", ilk açılışda bir az gecikmə ola bilər.

## Qeyd

Səbətdəki miqdarı 1-dən aşağı endirəndə (yəni "-" basanda) məhsul avtomatik silinir. Register/qeydiyyat yoxdur, tapşırıqda tələb olunmurdu.