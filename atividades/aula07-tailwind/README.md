# Aula 07 — Framework CSS Tailwind

Landing page responsiva de demonstração. Abra `index.html` com conexão à internet para carregar o Play CDN oficial do Tailwind CSS v4. O Play CDN é indicado para experimentação e desenvolvimento; não é a configuração recomendada para produção. Para publicar, configure Tailwind no processo de build (Vite/CLI) e gere CSS estático. [Documentação oficial — Play CDN](https://tailwindcss.com/docs/installation/play-cdn).

## Classes usadas (mais de 30)

| Categoria | Classes da página |
|---|---|
| Cores | `bg-slate-100`, `text-slate-800`, `bg-white`, `text-indigo-700`, `text-emerald-500`, `bg-indigo-50`, `text-slate-500`, `text-slate-900`, `text-indigo-600`, `text-slate-600`, `bg-emerald-50`, `text-emerald-800`, `bg-emerald-100`, `text-emerald-700`, `bg-amber-100`, `text-amber-700`, `bg-indigo-700`, `text-white`, `text-indigo-100` |
| Tipografia | `font-sans`, `text-xl`, `font-extrabold`, `tracking-tight`, `text-sm`, `font-semibold`, `text-xs`, `font-bold`, `uppercase`, `tracking-widest`, `text-4xl`, `font-black`, `leading-tight`, `text-base`, `leading-7`, `text-3xl`, `text-lg`, `leading-6` |
| Espaçamento e dimensões | `min-h-screen`, `mx-auto`, `max-w-6xl`, `px-6`, `py-5`, `px-4`, `py-2`, `py-12`, `md:py-20`, `mb-4`, `mt-5`, `mt-8`, `max-w-xl`, `mt-6`, `h-14`, `w-14`, `h-3`, `w-2/3`, `mt-3`, `space-y-3`, `p-3`, `mt-20`, `mt-2`, `mt-4`, `mt-16`, `px-7`, `py-10`, `sm:px-12`, `px-5`, `py-3` |
| Bordas e efeitos | `border-b`, `border-slate-200`, `rounded-full`, `rounded-xl`, `rounded-3xl`, `rounded-2xl`, `border`, `border-emerald-200`, `border-slate-300`, `shadow-lg`, `shadow-indigo-200`, `hover:bg-indigo-100`, `hover:bg-indigo-700`, `shadow-xl`, `shadow-slate-200/70`, `overflow-hidden`, `bg-gradient-to-r`, `from-indigo-500`, `to-emerald-400`, `shadow-sm`, `hover:border-indigo-300`, `hover:bg-indigo-50` |
| Flexbox e Grid | `flex`, `items-center`, `justify-between`, `flex-wrap`, `gap-3`, `grid`, `items-center`, `gap-10`, `md:grid-cols-2`, `place-items-center`, `ml-auto`, `gap-5`, `sm:grid-cols-2`, `lg:grid-cols-3`, `sm:col-span-2`, `lg:col-span-1`, `inline-flex`, `text-center` |
| Posicionamento e acessibilidade | `inline-block`, `aria-label`, `aria-hidden`, `hover:*` e links de âncora |

Exemplos de responsividade incluem `sm:`, `md:` e `lg:`. Classes responsivas mudam o grid e espaçamento conforme a largura da tela.

## Evidências

Capture a página aberta em navegador para comprovar a aplicação dos estilos e outra captura em largura móvel para mostrar as variantes responsivas.
