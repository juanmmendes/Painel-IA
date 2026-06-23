# Tech Learning Hub — Cursos e Ferramentas de IA (Painel-IA)

![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-page-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-styles-1572B6?logo=css3&logoColor=white)
![Status](https://img.shields.io/badge/status-funcional-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## Visão Geral

Painel estático (landing page) que reúne e organiza os **principais cursos e ferramentas de Inteligência Artificial** — incluindo cursos gratuitos com certificado de instituições como Harvard, Stanford, Google Cloud, AWS, IBM e DeepLearning.AI. O projeto resolve o problema de centralizar referências de aprendizado em IA em uma interface única, navegável e pesquisável, ideal como ponto de partida para estudantes e profissionais que desejam se capacitar na área.

## Arquitetura e Fluxo Lógico

A aplicação é totalmente client-side, com separação clássica entre estrutura, estilo e comportamento:

- **Camada de Estrutura:** `index.html` define as seções de conteúdo (cursos, ferramentas e cursos gratuitos com certificado) e os cards de cada recurso.
- **Camada de Estilo:** `styles.css` controla layout, responsividade e tema visual; ícones são fornecidos pelo **Font Awesome** via CDN.
- **Camada de Comportamento:** `script.js` concentra a interatividade: navegação por abas (`initTabNavigation`), filtro de busca em tempo real (`initSearchFilter` / `filterContent`), animações de cards (`initCardAnimations`), botão "voltar ao topo" (`initScrollToTop`) e tratamento de estado vazio (`showNoResultsMessage`).

Fluxo: o navegador carrega `index.html` → aplica `styles.css` → o `script.js` inicializa as abas, animações e o filtro de busca → o usuário navega entre categorias e pesquisa recursos dinamicamente, sem recarregar a página.

## Tecnologias Utilizadas

- **HTML5** — estrutura semântica do painel
- **CSS3** — estilização e layout responsivo
- **JavaScript (Vanilla)** — navegação por abas, filtro de busca e animações
- **Font Awesome** (via CDN) — biblioteca de ícones
- **Sem frameworks de front-end**

## Pré-requisitos

- Um navegador web moderno.
- Conexão com a internet (para carregar os ícones do Font Awesome via CDN).
- Nenhuma instalação ou build necessário.

## Instalação e Configuração

Clone o repositório:

```bash
git clone https://github.com/juanmmendes/Painel-IA.git
cd Painel-IA
```

Não há dependências a instalar via gerenciador de pacotes nem variáveis de ambiente.

## Como Usar

Abra o `index.html` no navegador ou sirva localmente:

```bash
# Abrir diretamente
start index.html      # Windows
open index.html       # macOS
xdg-open index.html   # Linux

# Ou servir como site estático
npx serve .
```

Na interface:

1. Use as **abas** para alternar entre as categorias (cursos, ferramentas, certificados).
2. Utilize o **campo de busca** para filtrar recursos por nome em tempo real.
3. Clique nos cards para acessar os links dos cursos e ferramentas.

## Estrutura do Projeto

```
Painel-IA/
├── index.html    # Estrutura da página e seções de cursos/ferramentas
├── styles.css    # Estilos, layout responsivo e tema visual
└── script.js     # Abas, filtro de busca, animações e scroll-to-top
```

## Contribuição e Licença

Contribuições são bem-vindas — especialmente novos cursos e ferramentas de IA. Faça um fork, crie uma branch (`git checkout -b feature/novo-recurso`), faça commit e abra um Pull Request detalhando o que foi adicionado.

Distribuído sob a licença **MIT**.
