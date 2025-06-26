// Funcionalidades de navegação por abas e interatividade
document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const navTabs = document.querySelectorAll('.nav-tab');
    const contentSections = document.querySelectorAll('.content-section');
    const cards = document.querySelectorAll('.course-card, .tool-card, .chatbot-card');
    
    // Sistema de navegação por abas
    function initTabNavigation() {
        navTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetSection = this.getAttribute('data-section');
                
                // Remove classe active de todas as abas
                navTabs.forEach(t => t.classList.remove('active'));
                
                // Remove classe active de todas as seções
                contentSections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Adiciona classe active na aba clicada
                this.classList.add('active');
                
                // Mostra a seção correspondente
                const targetElement = document.getElementById(targetSection);
                if (targetElement) {
                    targetElement.classList.add('active');
                    
                    // Scroll suave para a seção
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
                
                // Adiciona efeito de loading temporário
                addLoadingEffect();
            });
        });
    }
    
    // Efeito de loading temporário
    function addLoadingEffect() {
        const activeSection = document.querySelector('.content-section.active');
        if (activeSection) {
            activeSection.style.opacity = '0.6';
            setTimeout(() => {
                activeSection.style.opacity = '1';
            }, 200);
        }
    }
    
    // Animações de entrada para cards
    function initCardAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, observerOptions);
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            cardObserver.observe(card);
        });
    }
    
    // Funcionalidade de busca/filtro
    function initSearchFilter() {
        // Criar campo de busca
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="search-wrapper">
                <i class="fas fa-search search-icon"></i>
                <input type="text" class="search-input" placeholder="Buscar cursos, ferramentas ou chatbots...">
                <button class="search-clear" style="display: none;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Inserir antes da navegação
        const navigation = document.querySelector('.navigation');
        navigation.parentNode.insertBefore(searchContainer, navigation);
        
        const searchInput = searchContainer.querySelector('.search-input');
        const searchClear = searchContainer.querySelector('.search-clear');
        
        // Funcionalidade de busca
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            if (searchTerm.length > 0) {
                searchClear.style.display = 'block';
                filterContent(searchTerm);
            } else {
                searchClear.style.display = 'none';
                showAllContent();
            }
        });
        
        // Limpar busca
        searchClear.addEventListener('click', function() {
            searchInput.value = '';
            this.style.display = 'none';
            showAllContent();
            searchInput.focus();
        });
    }
    
    // Filtrar conteúdo baseado na busca
    function filterContent(searchTerm) {
        let hasResults = false;
        
        contentSections.forEach(section => {
            const sectionCards = section.querySelectorAll('.course-card, .tool-card, .chatbot-card');
            let sectionHasResults = false;
            
            sectionCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : '';
                const link = card.querySelector('a') ? card.querySelector('a').textContent.toLowerCase() : '';
                
                if (title.includes(searchTerm) || description.includes(searchTerm) || link.includes(searchTerm)) {
                    card.style.display = 'flex';
                    sectionHasResults = true;
                    hasResults = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Mostrar/ocultar seção baseado nos resultados
            if (sectionHasResults) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
        
        // Mostrar mensagem se não houver resultados
        showNoResultsMessage(!hasResults, searchTerm);
    }
    
    // Mostrar todo o conteúdo
    function showAllContent() {
        cards.forEach(card => {
            card.style.display = 'flex';
        });
        
        contentSections.forEach(section => {
            section.style.display = 'block';
        });
        
        // Mostrar apenas a seção ativa
        const activeTab = document.querySelector('.nav-tab.active');
        if (activeTab) {
            const targetSection = activeTab.getAttribute('data-section');
            contentSections.forEach(section => {
                if (section.id === targetSection) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        }
        
        removeNoResultsMessage();
    }
    
    // Mostrar mensagem de "nenhum resultado"
    function showNoResultsMessage(show, searchTerm) {
        removeNoResultsMessage();
        
        if (show) {
            const noResultsDiv = document.createElement('div');
            noResultsDiv.className = 'no-results';
            noResultsDiv.innerHTML = `
                <div class="no-results-content">
                    <i class="fas fa-search"></i>
                    <h3>Nenhum resultado encontrado</h3>
                    <p>Não encontramos resultados para "<strong>${searchTerm}</strong>"</p>
                    <p>Tente usar termos diferentes ou navegue pelas categorias.</p>
                </div>
            `;
            
            document.querySelector('.main-content').appendChild(noResultsDiv);
        }
    }
    
    // Remover mensagem de "nenhum resultado"
    function removeNoResultsMessage() {
        const noResults = document.querySelector('.no-results');
        if (noResults) {
            noResults.remove();
        }
    }
    
    // Funcionalidade de scroll para o topo
    function initScrollToTop() {
        const scrollButton = document.createElement('button');
        scrollButton.className = 'scroll-to-top';
        scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollButton.setAttribute('aria-label', 'Voltar ao topo');
        document.body.appendChild(scrollButton);
        
        // Mostrar/ocultar botão baseado no scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollButton.classList.add('visible');
            } else {
                scrollButton.classList.remove('visible');
            }
        });
        
        // Funcionalidade do botão
        scrollButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Efeitos de hover aprimorados
    function initEnhancedHoverEffects() {
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Funcionalidade de cópia de links
    function initCopyLinkFeature() {
        const links = document.querySelectorAll('.course-link, .chatbot-link');
        
        links.forEach(link => {
            // Adicionar ícone de cópia
            const copyIcon = document.createElement('i');
            copyIcon.className = 'fas fa-copy copy-icon';
            copyIcon.style.marginLeft = '0.5rem';
            copyIcon.style.opacity = '0.6';
            copyIcon.style.cursor = 'pointer';
            copyIcon.setAttribute('title', 'Copiar link');
            
            link.appendChild(copyIcon);
            
            // Funcionalidade de cópia
            copyIcon.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const linkText = link.href;
                navigator.clipboard.writeText(linkText).then(() => {
                    showCopyFeedback(copyIcon);
                });
            });
        });
    }
    
    // Feedback visual para cópia
    function showCopyFeedback(element) {
        const originalClass = element.className;
        element.className = 'fas fa-check copy-icon';
        element.style.color = 'var(--accent-green)';
        
        setTimeout(() => {
            element.className = originalClass;
            element.style.color = '';
        }, 2000);
    }
    
    // Contador de recursos
    function initResourceCounter() {
        const sections = [
            { id: 'principais', name: 'Principais Cursos' },
            { id: 'certificados', name: 'Com Certificado' },
            { id: 'ferramentas', name: 'Ferramentas IA' },
            { id: 'chatbots', name: 'Chatbots & Assistentes' },
            { id: 'outros', name: 'Outros Cursos' }
        ];
        
        sections.forEach(section => {
            const sectionElement = document.getElementById(section.id);
            const cards = sectionElement.querySelectorAll('.course-card, .tool-card, .chatbot-card');
            const header = sectionElement.querySelector('.section-header h2');
            
            if (header && cards.length > 0) {
                const counter = document.createElement('span');
                counter.className = 'resource-counter';
                counter.textContent = ` (${cards.length})`;
                header.appendChild(counter);
            }
        });
    }
    
    // Inicializar todas as funcionalidades
    function init() {
        initTabNavigation();
        initCardAnimations();
        initSearchFilter();
        initScrollToTop();
        initEnhancedHoverEffects();
        initCopyLinkFeature();
        initResourceCounter();
        
        // Adicionar estilos CSS dinâmicos
        addDynamicStyles();
        
        console.log('Tech Learning Hub inicializado com sucesso!');
    }
    
    // Adicionar estilos CSS dinâmicos
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .search-container {
                margin: 2rem 0;
                display: flex;
                justify-content: center;
            }
            
            .search-wrapper {
                position: relative;
                max-width: 500px;
                width: 100%;
            }
            
            .search-input {
                width: 100%;
                padding: 1rem 3rem 1rem 3rem;
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: 0.75rem;
                color: var(--text-primary);
                font-size: 1rem;
                transition: var(--transition);
            }
            
            .search-input:focus {
                outline: none;
                border-color: var(--accent-blue);
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }
            
            .search-input::placeholder {
                color: var(--text-muted);
            }
            
            .search-icon {
                position: absolute;
                left: 1rem;
                top: 50%;
                transform: translateY(-50%);
                color: var(--text-muted);
                pointer-events: none;
            }
            
            .search-clear {
                position: absolute;
                right: 1rem;
                top: 50%;
                transform: translateY(-50%);
                background: none;
                border: none;
                color: var(--text-muted);
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 0.25rem;
                transition: var(--transition-fast);
            }
            
            .search-clear:hover {
                color: var(--text-primary);
                background: var(--bg-card-hover);
            }
            
            .no-results {
                text-align: center;
                padding: 4rem 2rem;
                color: var(--text-muted);
            }
            
            .no-results-content i {
                font-size: 3rem;
                margin-bottom: 1rem;
                opacity: 0.5;
            }
            
            .no-results-content h3 {
                font-size: 1.5rem;
                margin-bottom: 1rem;
                color: var(--text-secondary);
            }
            
            .scroll-to-top {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                width: 3rem;
                height: 3rem;
                background: var(--accent-blue);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transition: var(--transition);
                z-index: 1000;
                box-shadow: var(--shadow-lg);
            }
            
            .scroll-to-top.visible {
                opacity: 1;
                visibility: visible;
            }
            
            .scroll-to-top:hover {
                background: var(--accent-purple);
                transform: translateY(-2px);
            }
            
            .copy-icon {
                transition: var(--transition-fast);
            }
            
            .copy-icon:hover {
                opacity: 1 !important;
                color: var(--accent-blue) !important;
            }
            
            .resource-counter {
                color: var(--text-muted);
                font-weight: 400;
                font-size: 0.9em;
            }
            
            @media (max-width: 768px) {
                .search-container {
                    margin: 1.5rem 0;
                    padding: 0 1rem;
                }
                
                .scroll-to-top {
                    bottom: 1rem;
                    right: 1rem;
                    width: 2.5rem;
                    height: 2.5rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Inicializar aplicação
    init();
});

