document.addEventListener('DOMContentLoaded', function () {
  // Gerenciamento de Tema
  const themeButtons = document.querySelectorAll('.theme-btn');
  const htmlRoot = document.documentElement;
  
  // Verificar tema do sistema
  function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  
  // Aplicar tema
  function applyTheme(theme) {
    if (theme === 'system') {
      const systemTheme = getSystemTheme();
      htmlRoot.dataset.theme = systemTheme;
    } else {
      htmlRoot.dataset.theme = theme;
    }
    
    // Atualizar botões ativos
    themeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
    
    // Salvar preferência do usuário
    if (theme !== 'system') {
      localStorage.setItem('preferredTheme', theme);
    } else {
      localStorage.setItem('preferredTheme', 'system');
    }
  }
  
  // Carregar tema salvo ou usar preferência do sistema
  function loadSavedTheme() {
    const savedTheme = localStorage.getItem('preferredTheme');
    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      // Se não há tema salvo, use a preferência do sistema
      applyTheme('system');
    }
  }
  
  // Adicionar event listeners para os botões de tema
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      applyTheme(theme);
    });
  });
  
  // Ouvir mudanças na preferência do sistema
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
      // Se o tema atual é 'system', atualize conforme a preferência do sistema
      if (localStorage.getItem('preferredTheme') === 'system') {
        htmlRoot.dataset.theme = e.matches ? 'light' : 'dark';
      }
    });
  }
  
  // Iniciar tema ao carregar a página
  loadSavedTheme();

  // Menu toggle para mobile
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('.nav-menu a');

  menuToggle.addEventListener('click', function () {
    nav.classList.toggle('active');

    // Animar linhas do menu
    const menuLines = document.querySelectorAll('.menu-line');
    if (nav.classList.contains('active')) {
      menuLines[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
      menuLines[1].style.opacity = '0';
      menuLines[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
      menuLines[0].style.transform = 'none';
      menuLines[1].style.opacity = '1';
      menuLines[2].style.transform = 'none';
    }
  });

  // Fechar menu ao clicar em um link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      const menuLines = document.querySelectorAll('.menu-line');
      menuLines[0].style.transform = 'none';
      menuLines[1].style.opacity = '1';
      menuLines[2].style.transform = 'none';
    });
  });

  // Animação de digitação no terminal
  const typingText = document.getElementById('typing-text');
  const texts = [
    "npm install cyberpunk-portfolio",
    "Starting development server...",
    "Compiling awesome features...",
    "Loading interactive elements...",
    "Portfolio successfully deployed!"
  ];

  let textIndex = 0;
  let charIndex = 0;

  function typeWriter() {
    if (charIndex < texts[textIndex].length) {
      typingText.textContent += texts[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 50);
    } else {
      setTimeout(eraseText, 2000);
    }
  }

  function eraseText() {
    if (charIndex > 0) {
      typingText.textContent = texts[textIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(eraseText, 30);
    } else {
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(typeWriter, 1000);
    }
  }

  // Iniciar a animação de digitação
  typeWriter();

  // Verificar estado da autenticação ao carregar
  let currentUser = null;
  
  auth.onAuthStateChanged(function(user) {
    currentUser = user;
    const adminControls = document.querySelector('.admin-controls');
    
    if (user) {
      // Usuário está logado, verificar se é admin
      if (isAdmin(user.email)) {
        // Se estiver na seção de projetos e não existir controles admin, adicionar
        if (document.getElementById('work') && !adminControls) {
          addAdminControls();
        }
        // Mostrar menu de admin no cabeçalho
        updateAdminMenu(true);
      } else {
        // Usuário logado não é admin
        if (adminControls) {
          adminControls.remove();
        }
        updateAdminMenu(false);
        
        // Esconder botões de edição nos projetos
        document.querySelectorAll('.edit-project-btn').forEach(btn => {
          btn.style.display = 'none';
        });
      }
    } else {
      // Usuário não está logado
      if (adminControls) {
        adminControls.remove();
      }
      updateAdminMenu(false);
      
      // Esconder botões de edição nos projetos
      document.querySelectorAll('.edit-project-btn').forEach(btn => {
        btn.style.display = 'none';
      });
    }
  });
  
  // Adicionar item de login/admin ao menu
  function updateAdminMenu(isLoggedIn) {
    const navMenu = document.querySelector('.nav-menu');
    
    // Remover itens existentes de login/admin
    const existingItems = document.querySelectorAll('.admin-menu-item');
    existingItems.forEach(item => item.remove());
    
    // Criar novo item
    const menuItem = document.createElement('li');
    menuItem.className = 'admin-menu-item';
    
    if (isLoggedIn) {
      menuItem.innerHTML = `
        <a href="#" class="admin-link">
          <i class="fas fa-user-shield"></i> Admin
        </a>
        <div class="admin-dropdown">
          <a href="#" class="logout-btn">Sair</a>
        </div>
      `;
      
      // Adicionar ao menu
      navMenu.appendChild(menuItem);
      
      // Adicionar evento de clique para logout
      document.querySelector('.logout-btn').addEventListener('click', function(e) {
        e.preventDefault();
        auth.signOut().then(() => {
          alert('Você saiu da sua conta.');
        }).catch(error => {
          console.error('Erro ao fazer logout:', error);
        });
      });
    } else {
      menuItem.innerHTML = `
        <a href="#" class="login-link">
          <i class="fas fa-user"></i> Login
        </a>
      `;
      
      // Adicionar ao menu
      navMenu.appendChild(menuItem);
      
      // Adicionar evento de clique para abrir modal de login
      document.querySelector('.login-link').addEventListener('click', function(e) {
        e.preventDefault();
        openLoginModal();
      });
    }
  }
  
  // Modal de login
  function openLoginModal() {
    // Verificar se já existe um modal aberto
    if (document.getElementById('login-modal')) {
      document.getElementById('login-modal').remove();
    }
    
    // Criar modal
    const modal = document.createElement('div');
    modal.id = 'login-modal';
    modal.className = 'modal';
    
    // HTML do modal com os botões de login social
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Login Admin</h3>
          <button class="close-modal">&times;</button>
        </div>
        <div class="login-container">
          <p class="login-message">Faça login com sua conta:</p>
          
          <button id="google-login" class="social-login-btn google-btn">
            <i class="fab fa-google"></i>
            <span>Entrar com Google</span>
          </button>
          
          <button id="github-login" class="social-login-btn github-btn">
            <i class="fab fa-github"></i>
            <span>Entrar com GitHub</span>
          </button>
          
          <div class="login-disclaimer">
            <p>Apenas administradores autorizados podem gerenciar projetos.</p>
          </div>
        </div>
      </div>
    `;
    
    // Adicionar à página
    document.body.appendChild(modal);
    
    // Mostrar modal com animação
    setTimeout(() => {
      modal.classList.add('open');
    }, 10);
    
    // Fechar modal ao clicar no X
    modal.querySelector('.close-modal').addEventListener('click', function() {
      closeModal(modal);
    });
    
    // Fechar modal ao clicar fora do conteúdo
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
    
    // Login com Google
    document.getElementById('google-login').addEventListener('click', function() {
      loginWithProvider(googleProvider, modal);
    });
    
    // Login com GitHub
    document.getElementById('github-login').addEventListener('click', function() {
      loginWithProvider(githubProvider, modal);
    });
  }
  
  // Função para lidar com login via provedor (Google ou GitHub)
  function loginWithProvider(provider, modal) {
    // Adicionar classe de loading ao botão
    const btn = provider === googleProvider ? 
      document.getElementById('google-login') : 
      document.getElementById('github-login');
    
    btn.classList.add('loading');
    btn.disabled = true;
    
    // Fazer login com Firebase Auth usando o provedor
    auth.signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        // Verificar se o usuário é um admin
        if (isAdmin(user.email)) {
          alert('Login realizado com sucesso!');
          closeModal(modal);
        } else {
          alert('Você não tem permissão de administrador.');
          auth.signOut();
        }
      })
      .catch(error => {
        console.error('Erro ao fazer login:', error);
        alert(`Erro ao fazer login: ${error.message}`);
      })
      .finally(() => {
        btn.classList.remove('loading');
        btn.disabled = false;
      });
  }
  
  // Carregar projetos do Firebase
  function loadProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    // Limpar projetos existentes
    projectsGrid.innerHTML = '';
    
    // Mostrar loader
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<div class="spinner"></div><p>Carregando projetos...</p>';
    projectsGrid.appendChild(loader);
    
    // Buscar projetos do Firestore
    db.collection('projetos').orderBy('ordem', 'asc').get()
      .then(snapshot => {
        // Remover loader
        projectsGrid.removeChild(loader);
        
        if (snapshot.empty) {
          // Se não houver projetos, exibir mensagem
          const emptyMessage = document.createElement('div');
          emptyMessage.className = 'empty-projects-message';
          emptyMessage.innerHTML = '<p>Nenhum projeto encontrado. Adicione seu primeiro projeto!</p>';
          projectsGrid.appendChild(emptyMessage);
          
          // Adicionar botão para adicionar projetos (apenas para admins)
          if (currentUser && isAdmin(currentUser.email) && document.querySelector('.admin-controls') === null) {
            addAdminControls();
          }
          return;
        }
        
        // Renderizar cada projeto do Firestore
        snapshot.forEach(doc => {
          const project = doc.data();
          const projectCard = createProjectCard(doc.id, project);
          projectsGrid.appendChild(projectCard);
        });
        
        // Adicionar efeito de hover nos cards de projeto
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
          card.addEventListener('mouseenter', function () {
            this.querySelector('.project-image').style.transform = 'scale(1.05)';
          });

          card.addEventListener('mouseleave', function () {
            this.querySelector('.project-image').style.transform = 'scale(1)';
          });
        });
        
        // Adicionar controles de admin se necessário
        if (currentUser && isAdmin(currentUser.email) && document.querySelector('.admin-controls') === null) {
          addAdminControls();
        }
      })
      .catch(error => {
        console.error('Erro ao carregar projetos:', error);
        projectsGrid.innerHTML = '<div class="error-message">Erro ao carregar projetos. Tente novamente mais tarde.</div>';
      });
  }
  
  // Criar card de projeto dinâmico
  function createProjectCard(id, project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-id', id);
    
    const iconClass = project.icon || 'fas fa-laptop-code';
    const cardColor = project.color || '#00F5FF';
    
    card.innerHTML = `
      <div class="project-image" style="--card-color: ${cardColor};">
        <div class="project-number">${String(project.ordem).padStart(2, '0')}</div>
        <i class="${iconClass}"></i>
      </div>
      <div class="project-detail">
        <h3>${project.titulo}</h3>
        <p>${project.descricao}</p>
        <div class="project-techs">
          ${project.tecnologias.map(tech => `<span>${tech}</span>`).join('')}
        </div>
        <a href="${project.link}" class="project-link" ${project.link.startsWith('http') ? 'target="_blank"' : ''}>
          <span>Ver Projeto</span>
          <i class="fas fa-arrow-right"></i>
        </a>
        <button class="edit-project-btn" data-id="${id}">
          <i class="fas fa-edit"></i>
        </button>
      </div>
    `;
    
    // Adicionar event listener para o botão de edição
    setTimeout(() => {
      const editBtn = card.querySelector('.edit-project-btn');
      if (editBtn) {
        // Esconder botão se usuário não é admin
        if (!currentUser || !isAdmin(currentUser.email)) {
          editBtn.style.display = 'none';
        }
        
        editBtn.addEventListener('click', function() {
          // Verificar novamente a autenticação antes de abrir o formulário
          if (currentUser && isAdmin(currentUser.email)) {
            openProjectForm(id);
          } else {
            alert('Você precisa estar logado como administrador para editar projetos.');
            openLoginModal();
          }
        });
      }
    }, 0);
    
    return card;
  }
  
  // Adicionar controles de administrador
  function addAdminControls() {
    // Verificar se os controles já existem
    if (document.querySelector('.admin-controls')) return;
    
    // Verificar se o usuário é admin
    if (!currentUser || !isAdmin(currentUser.email)) {
      return;
    }
    
    const workSection = document.getElementById('work');
    if (!workSection) return;
    
    const ctaContainer = workSection.querySelector('.cta-container');
    
    // Criar botão para adicionar novo projeto
    const adminControls = document.createElement('div');
    adminControls.className = 'admin-controls';
    adminControls.innerHTML = `
      <button class="add-project-btn">
        <i class="fas fa-plus"></i>
        <span>Adicionar Projeto</span>
      </button>
    `;
    
    // Inserir antes do container CTA
    if (ctaContainer) {
      workSection.insertBefore(adminControls, ctaContainer);
    } else {
      workSection.appendChild(adminControls);
    }
    
    // Adicionar event listener para o botão
    document.querySelector('.add-project-btn').addEventListener('click', function() {
      // Verificar novamente a autenticação antes de abrir o formulário
      if (currentUser && isAdmin(currentUser.email)) {
        openProjectForm();
      } else {
        alert('Você precisa estar logado como administrador para adicionar projetos.');
        openLoginModal();
      }
    });
  }
  
  // Abrir formulário para adicionar/editar projeto
  function openProjectForm(projectId = null) {
    // Verificar se o usuário é admin
    if (!currentUser || !isAdmin(currentUser.email)) {
      alert('Você precisa estar logado como administrador para gerenciar projetos.');
      openLoginModal();
      return;
    }
    
    // Verificar se já existe um formulário aberto
    if (document.getElementById('project-form-modal')) {
      document.getElementById('project-form-modal').remove();
    }
    
    // Criar modal
    const modal = document.createElement('div');
    modal.id = 'project-form-modal';
    modal.className = 'modal';
    
    // HTML do formulário
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>${projectId ? 'Editar Projeto' : 'Adicionar Novo Projeto'}</h3>
          <button class="close-modal">&times;</button>
        </div>
        <form id="project-form">
          <div class="form-group">
            <label for="titulo">Título</label>
            <input type="text" id="titulo" name="titulo" required>
          </div>
          <div class="form-group">
            <label for="descricao">Descrição</label>
            <textarea id="descricao" name="descricao" required></textarea>
          </div>
          <div class="form-group">
            <label for="ordem">Ordem</label>
            <input type="number" id="ordem" name="ordem" min="1" value="1" required>
          </div>
          <div class="form-group">
            <label for="link">Link do Projeto</label>
            <input type="url" id="link" name="link" required>
          </div>
          <div class="form-group">
            <label for="icon">Ícone (classe Font Awesome)</label>
            <input type="text" id="icon" name="icon" value="fas fa-laptop-code">
          </div>
          <div class="form-group">
            <label for="color">Cor do Card</label>
            <input type="color" id="color" name="color" value="#00F5FF">
          </div>
          <div class="form-group">
            <label for="tecnologias">Tecnologias (separadas por vírgula)</label>
            <input type="text" id="tecnologias" name="tecnologias" required>
          </div>
          <div class="form-actions">
            ${projectId ? '<button type="button" class="delete-btn">Excluir</button>' : ''}
            <button type="submit" class="save-btn">Salvar</button>
          </div>
        </form>
      </div>
    `;
    
    // Adicionar à página
    document.body.appendChild(modal);
    
    // Mostrar modal com animação
    setTimeout(() => {
      modal.classList.add('open');
    }, 10);
    
    // Fechar modal ao clicar no X
    modal.querySelector('.close-modal').addEventListener('click', function() {
      closeModal(modal);
    });
    
    // Fechar modal ao clicar fora do conteúdo
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
    
    // Se estiver editando, carregar dados do projeto
    if (projectId) {
      db.collection('projetos').doc(projectId).get()
        .then(doc => {
          if (doc.exists) {
            const project = doc.data();
            document.getElementById('titulo').value = project.titulo;
            document.getElementById('descricao').value = project.descricao;
            document.getElementById('ordem').value = project.ordem;
            document.getElementById('link').value = project.link;
            document.getElementById('icon').value = project.icon;
            document.getElementById('color').value = project.color;
            document.getElementById('tecnologias').value = project.tecnologias.join(', ');
            
            // Adicionar event listener para o botão de excluir
            const deleteBtn = modal.querySelector('.delete-btn');
            if (deleteBtn) {
              deleteBtn.addEventListener('click', function() {
                if (confirm('Tem certeza que deseja excluir este projeto?')) {
                  db.collection('projetos').doc(projectId).delete()
                    .then(() => {
                      alert('Projeto excluído com sucesso!');
                      closeModal(modal);
                      loadProjects();
                    })
                    .catch(error => {
                      console.error('Erro ao excluir projeto:', error);
                      alert('Erro ao excluir projeto. Tente novamente.');
                    });
                }
              });
            }
          }
        });
    }
    
    // Processar envio do formulário
    document.getElementById('project-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Coletar dados do formulário
      const projectData = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        ordem: parseInt(document.getElementById('ordem').value),
        link: document.getElementById('link').value,
        icon: document.getElementById('icon').value,
        color: document.getElementById('color').value,
        tecnologias: document.getElementById('tecnologias').value.split(',').map(tech => tech.trim()),
        dataAtualizacao: firebase.firestore.FieldValue.serverTimestamp()
      };
      
      // Salvar no Firestore
      if (projectId) {
        // Atualizar projeto existente
        db.collection('projetos').doc(projectId).update(projectData)
          .then(() => {
            alert('Projeto atualizado com sucesso!');
            closeModal(modal);
            loadProjects();
          })
          .catch(error => {
            console.error('Erro ao atualizar projeto:', error);
            alert('Erro ao atualizar projeto. Tente novamente.');
          });
      } else {
        // Adicionar novo projeto
        projectData.dataCriacao = firebase.firestore.FieldValue.serverTimestamp();
        
        db.collection('projetos').add(projectData)
          .then(() => {
            alert('Projeto adicionado com sucesso!');
            closeModal(modal);
            loadProjects();
          })
          .catch(error => {
            console.error('Erro ao adicionar projeto:', error);
            alert('Erro ao adicionar projeto. Tente novamente.');
          });
      }
    });
  }
  
  // Função para fechar modal
  function closeModal(modal) {
    modal.classList.remove('open');
    setTimeout(() => {
      modal.remove();
    }, 300);
  }

  // Carregar projetos ao iniciar
  loadProjects();

  // Scroll suave para links de navegação
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');

      // Verificar se targetId não é apenas "#" antes de tentar selecionar o elemento
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Revelação de elementos ao scrollar
  const revealElements = document.querySelectorAll('.project-card, .section-header, .about-text, .contact-info, .contact-form');

  function checkReveal() {
    const triggerBottom = window.innerHeight * 0.8;

    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < triggerBottom) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }

  // Aplicar estilos iniciais para animação
  revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Verificar elementos ao carregar a página
  window.addEventListener('load', checkReveal);

  // Verificar elementos ao scrollar
  window.addEventListener('scroll', checkReveal);

  // Formulário de contato
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simulação de envio do formulário
      const submitButton = this.querySelector('.submit-button');
      const originalText = submitButton.querySelector('span').textContent;

      submitButton.querySelector('span').textContent = 'Enviando...';
      submitButton.disabled = true;

      setTimeout(() => {
        alert('Mensagem enviada com sucesso!');
        submitButton.querySelector('span').textContent = originalText;
        submitButton.disabled = false;
        contactForm.reset();
      }, 1500);
    });
  }

  // Efeito paralax na seção hero
  document.addEventListener('mousemove', function (e) {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    const glitchTitle = document.querySelector('.glitch-title');
    if (glitchTitle) {
      glitchTitle.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  });

  // Detectar se a página está sendo visualizada em um dispositivo móvel
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  }

  // Desativar alguns efeitos em dispositivos móveis para melhor performance
  if (isMobile()) {
    document.querySelector('.noise-overlay').style.opacity = '0.01';
  }
});