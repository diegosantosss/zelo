# Zêlo Desapego — site

Landing page mobile-first da loja de desapego da Verônica Santos.
HTML + CSS + JS puro, sem dependências além do Google Fonts.

## Rodar
Abra o `index.html` no navegador. Só isso. Para publicar, sobe a pasta inteira em qualquer hospedagem estática (Vercel, Netlify, GitHub Pages, hostinger etc.).

## Estrutura
```
zelo-desapego/
├── index.html
├── favicon.ico
├── css/styles.css
├── js/script.js
└── assets/
    ├── img/
    │   ├── logo.png        ← logo oficial
    │   ├── boneca.png      ← mascote (boneca)
    │   └── favicon-256.png
    └── video/              ← coloque aqui os vídeos dos depoimentos
```

## O que trocar depois (placeholders)

| Onde | O que fazer |
|------|-------------|
| **WhatsApp** | Em `js/script.js`, no bloco `CONFIG`, corrija `whatsappNumero` para o número COMPLETO (55 + DDD + número, só dígitos). O que veio está incompleto. |
| **Carrossel** | 3 quadros "Imagem 1/2/3" no topo. Troque os `<figure class="slide">` por `<img>` reais. |
| **Vitrine** | Cada card tem um bloco `.card__ph` (placeholder de imagem). Troque por foto do produto/categoria. |
| **Depoimentos** | 3 quadros "Vídeo 1/2/3". Troque cada `.video-ph` por um `<video>` ou embed do vídeo real. |
| **Foto da fundadora** | Bloco `.founder__ph` na seção "Por trás de cada venda". Troque por foto da Verônica. |
| **Instagram** | Já aponta para @zelodesapego. Confirme o handle em `CONFIG.instagram`. |
| **Favicon** | Gerei um a partir da logo. Se tiver um `favicon.ico` oficial, substitua o arquivo na raiz. |

## Notas
- Todos os botões de compra/desapego já abrem o WhatsApp com mensagem pronta.
- Botão verde flutuante fixo no canto inferior direito.
- Menu hambúrguer funcional no mobile, com overlay e swipe no carrossel.
