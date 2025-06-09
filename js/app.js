// Componentes do React
const { useState, useEffect, useRef } = React;

// Componente de Botão de Tema
const ThemeToggle = ({ setTheme, theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Gerencia a alteração de tema
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  // Retorna o ícone apropriado para o tema atual
  const getThemeIcon = () => {
    if (theme === 'dark') {
      return <i className="fas fa-moon text-yellow-300"></i>;
    } else if (theme === 'light') {
      return <i className="fas fa-sun text-yellow-500"></i>;
    } else {
      return <i className="fas fa-laptop text-blue-400"></i>;
    }
  };

  const themeOptions = [
    { key: 'light', label: 'Claro', icon: 'fas fa-sun', color: 'text-yellow-500' },
    { key: 'dark', label: 'Escuro', icon: 'fas fa-moon', color: 'text-yellow-300' },
    { key: 'system', label: 'Sistema', icon: 'fas fa-laptop', color: 'text-blue-400' }
  ];

  return (
    <div className="relative">      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/10"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Botão do tema */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="theme-toggle px-3 sm:px-4 py-1.5 sm:py-2 relative z-50"
        aria-label="Alternar tema"
      >
        {getThemeIcon()}
        <span className="ml-2 text-xs sm:text-sm font-medium">
          {theme === 'dark' ? 'Escuro' : theme === 'light' ? 'Claro' : 'Sistema'}
        </span>
        <i className={`fas fa-chevron-down ml-2 text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {/* Dropdown de opções */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 z-50 min-w-[140px] bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg shadow-xl overflow-hidden">
          {themeOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => handleThemeChange(option.key)}
              className={`w-full px-4 py-3 text-left flex items-center hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors duration-200 ${
                theme === option.key ? 'bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark' : ''
              }`}
            >
              <i className={`${option.icon} ${option.color} mr-3 text-sm`}></i>
              <span className="text-sm font-medium">{option.label}</span>
              {theme === option.key && (
                <i className="fas fa-check ml-auto text-primary-light dark:text-primary-dark text-xs"></i>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Componente de Navegação
const Navbar = ({ setTheme, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  // Detecta o scroll para alterar a aparência da barra de navegação
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detecta a seção ativa baseada no scroll
  useEffect(() => {
    const sections = ['inicio', 'sobre', 'habilidades', 'projetos', 'contato'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset para ativação antecipada
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Executa na inicialização
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'py-2 sm:py-3 bg-white/80 dark:bg-dark-800/90 shadow-lg backdrop-blur-md' : 'py-3 sm:py-5 bg-transparent'
    }`}>      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        <a 
          href="#inicio" 
          className={`text-xl sm:text-2xl font-display font-bold gradient-text ${
            activeSection === 'inicio' ? 'opacity-100' : 'opacity-90 hover:opacity-100'
          } transition-opacity`}
        >
          Portfolio<span className="text-primary-light dark:text-primary-dark">.</span>
        </a>
          {/* Menu para Desktop */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
          <a 
            href="#sobre" 
            className={`text-sm lg:text-base font-medium transition-colors relative after:absolute after:w-0 after:h-0.5 after:left-0 after:-bottom-1 after:transition-all ${
              activeSection === 'sobre' 
                ? 'text-primary-light dark:text-primary-dark after:w-full after:bg-primary-light dark:after:bg-primary-dark' 
                : 'hover:text-primary-light dark:hover:text-primary-dark after:bg-primary-light dark:after:bg-primary-dark hover:after:w-full'
            }`}
          >
            Sobre
          </a>
          <a 
            href="#habilidades" 
            className={`text-sm lg:text-base font-medium transition-colors relative after:absolute after:w-0 after:h-0.5 after:left-0 after:-bottom-1 after:transition-all ${
              activeSection === 'habilidades' 
                ? 'text-primary-light dark:text-primary-dark after:w-full after:bg-primary-light dark:after:bg-primary-dark' 
                : 'hover:text-primary-light dark:hover:text-primary-dark after:bg-primary-light dark:after:bg-primary-dark hover:after:w-full'
            }`}
          >
            Habilidades
          </a>
          <a 
            href="#projetos" 
            className={`text-sm lg:text-base font-medium transition-colors relative after:absolute after:w-0 after:h-0.5 after:left-0 after:-bottom-1 after:transition-all ${
              activeSection === 'projetos' 
                ? 'text-primary-light dark:text-primary-dark after:w-full after:bg-primary-light dark:after:bg-primary-dark' 
                : 'hover:text-primary-light dark:hover:text-primary-dark after:bg-primary-light dark:after:bg-primary-dark hover:after:w-full'
            }`}
          >
            Projetos
          </a>
          <a 
            href="#contato" 
            className={`text-sm lg:text-base font-medium transition-colors relative after:absolute after:w-0 after:h-0.5 after:left-0 after:-bottom-1 after:transition-all ${
              activeSection === 'contato' 
                ? 'text-primary-light dark:text-primary-dark after:w-full after:bg-primary-light dark:after:bg-primary-dark' 
                : 'hover:text-primary-light dark:hover:text-primary-dark after:bg-primary-light dark:after:bg-primary-dark hover:after:w-full'
            }`}
          >
            Contato
          </a>
          <ThemeToggle setTheme={setTheme} theme={theme} />
        </div>
        
        {/* Botão de Menu Mobile */}
        <button 
          className="md:hidden flex items-center"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl sm:text-2xl`}></i>
        </button>
      </div>
        {/* Menu Mobile */}
      <div className={`md:hidden absolute w-full bg-white/90 dark:bg-dark-800/95 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 py-3 sm:py-4' : 'max-h-0 py-0 overflow-hidden'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 flex flex-col space-y-3 sm:space-y-4">
          <a 
            href="#sobre" 
            className={`text-sm sm:text-base transition-colors py-1.5 sm:py-2 font-medium ${
              activeSection === 'sobre' 
                ? 'text-primary-light dark:text-primary-dark' 
                : 'hover:text-primary-light dark:hover:text-primary-dark'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Sobre
          </a>
          <a 
            href="#habilidades" 
            className={`text-sm sm:text-base transition-colors py-1.5 sm:py-2 font-medium ${
              activeSection === 'habilidades' 
                ? 'text-primary-light dark:text-primary-dark' 
                : 'hover:text-primary-light dark:hover:text-primary-dark'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Habilidades
          </a>
          <a 
            href="#projetos" 
            className={`text-sm sm:text-base transition-colors py-1.5 sm:py-2 font-medium ${
              activeSection === 'projetos' 
                ? 'text-primary-light dark:text-primary-dark' 
                : 'hover:text-primary-light dark:hover:text-primary-dark'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Projetos
          </a>
          <a 
            href="#contato" 
            className={`text-sm sm:text-base transition-colors py-1.5 sm:py-2 font-medium ${
              activeSection === 'contato' 
                ? 'text-primary-light dark:text-primary-dark' 
                : 'hover:text-primary-light dark:hover:text-primary-dark'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Contato
          </a>
          <div className="py-1.5 sm:py-2">
            <ThemeToggle setTheme={setTheme} theme={theme} />
          </div>
        </div>
      </div>
    </nav>
  );
};

// Componente Hero (Área de Destaque)
const Hero = () => {
  return (    <section id="inicio" className="relative min-h-screen flex items-center pt-20 grid-pattern overflow-hidden">
      {/* Formas de fundo */}
      <div className="blob-shape blob-shape-1 hidden sm:block"></div>
      <div className="blob-shape blob-shape-2 hidden sm:block"></div>
      <div className="blob-shape blob-shape-3 hidden sm:block"></div>
      
      <div className="container mx-auto px-4 sm:px-6 z-10 py-16 md:py-0">
        <div className="flex flex-col-reverse md:flex-row items-center">
          <div className="md:w-3/5 text-center md:text-left mt-10 md:mt-0">
            <p className="text-primary-light dark:text-primary-dark font-semibold text-base sm:text-lg mb-3 sm:mb-4 tracking-wider md:pl-1">
              👋 OLÁ MUNDO
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4 sm:mb-6">
              Eu sou <span className="gradient-text">Victor</span>,<br/>
              <span className="hidden sm:inline-flex typewriter overflow-hidden whitespace-nowrap md:pl-1">Dev Full Stack</span>
              <span className="sm:hidden">Dev Full Stack</span>
            </h1>
            <p className="text-sm sm:text-base md:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-10 max-w-2xl">
              Criando experiências digitais únicas e memoráveis através de código limpo e design moderno. Especializado em desenvolvimento web full stack e soluções interativas.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-5 justify-center md:justify-start">
              <a 
                href="#projetos" 
                className="btn-modern px-5 sm:px-8 py-3 sm:py-4 bg-primary-light hover:bg-primary-light/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90 text-white rounded-full shadow-lg shadow-primary-light/20 dark:shadow-primary-dark/20 hover:shadow-xl hover:shadow-primary-light/30 dark:hover:shadow-primary-dark/30 transition-all duration-300 text-sm sm:text-base font-semibold"
              >
                Meus Projetos
              </a>
              <a 
                href="#contato" 
                className="px-5 sm:px-8 py-3 sm:py-4 bg-white hover:bg-gray-50 dark:bg-dark-800 dark:hover:bg-dark-700 border border-gray-200 dark:border-dark-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base font-semibold"
              >
                Entre em Contato
              </a>
            </div>
            
            <div className="flex mt-8 sm:mt-12 justify-center md:justify-start space-x-5 sm:space-x-6">
              <a href="#" className="text-xl sm:text-2xl hover:text-primary-light dark:hover:text-primary-dark transition-colors hover-scale">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="text-xl sm:text-2xl hover:text-primary-light dark:hover:text-primary-dark transition-colors hover-scale">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-xl sm:text-2xl hover:text-primary-light dark:hover:text-primary-dark transition-colors hover-scale">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-xl sm:text-2xl hover:text-primary-light dark:hover:text-primary-dark transition-colors hover-scale">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
          
          <div className="md:w-2/5 flex justify-center mb-8 md:mb-0">
            <div className="border-gradient p-1 rounded-full h-40 w-40 sm:h-56 sm:w-56 md:h-80 lg:h-96 md:w-80 lg:w-96 animate-float">
              <div className="card-glassmorphism w-full h-full rounded-full relative overflow-hidden">
                <img 
                  src="images/profile.jpg" 
                  alt="Foto de Perfil" 
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 dark:to-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="w-full p-4 sm:p-5 text-center">
                    <p className="text-white font-semibold text-sm sm:text-base">Victor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente Sobre
const About = () => {
  return (
    <section id="sobre" className="py-24 bg-white dark:bg-dark-800 relative overflow-hidden">
      <div className="blob-shape blob-shape-2 opacity-30 right-0 left-auto"></div>
      <div className="blob-shape blob-shape-3 opacity-30 left-10 top-auto bottom-20"></div>
      
    <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold">
            Sobre <span className="gradient-text">Mim</span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-primary-light dark:bg-primary-dark mx-auto mt-4 sm:mt-6"></div>
        </div>
        
        <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12">
          <div className="lg:w-1/2">
            <div className="border-gradient p-1 rounded-xl shadow-xl">
              <div className="card-glassmorphism p-5 sm:p-8 rounded-xl h-full">
                <h3 className="text-xl sm:text-2xl font-display font-bold mb-4 sm:mb-6 gradient-text inline-block">Quem eu sou</h3>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                  Sou um desenvolvedor full-stack apaixonado por criar interfaces digitais modernas e intuitivas. Minha jornada no desenvolvimento web começou há 2 anos, e desde então tenho me dedicado a aprender novas tecnologias e aprimorar minhas habilidades.
                </p>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  Quando não estou codificando, você pode me encontrar lendo sobre novas tecnologias. Acredito que um equilíbrio entre trabalho e vida pessoal é essencial para manter a criatividade e a produtividade.
                </p>
                
                <div className="mt-6 sm:mt-8">
                  <a 
                    href="#contato" 
                    className="inline-flex items-center text-primary-light dark:text-primary-dark font-semibold hover-scale text-sm sm:text-base"
                  >
                    Vamos conversar <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0">
            <div className="border-gradient p-1 rounded-xl shadow-xl">
              <div className="card-glassmorphism p-5 sm:p-8 rounded-xl h-full">
                <h3 className="text-xl sm:text-2xl font-display font-bold mb-4 sm:mb-6 gradient-text inline-block">Minha Jornada</h3>
                
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex">
                    <div className="mr-3 sm:mr-4 flex flex-col items-center">
                      <div className="w-4 sm:w-5 h-4 sm:h-5 bg-primary-light dark:bg-primary-dark rounded-full shadow-lg shadow-primary-light/20 dark:shadow-primary-dark/20"></div>
                      <div className="w-0.5 sm:w-1 h-full bg-gradient-to-b from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold">2023 - Presente</h4>
                      <p className="text-primary-light dark:text-primary-dark font-medium text-sm sm:text-base">Bacharelado em Sistemas de Informação</p>
                      <p className="text-gray-700 dark:text-gray-300 mt-1 sm:mt-2 text-sm sm:text-base">Universidade Federal de Uberlândia (UFU) - Desenvolvimento de aplicações web modernas utilizando React, JQuery e Firebase.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-3 sm:mr-4 flex flex-col items-center">
                      <div className="w-4 sm:w-5 h-4 sm:h-5 bg-secondary-light dark:bg-secondary-dark rounded-full shadow-lg shadow-secondary-light/20 dark:shadow-secondary-dark/20"></div>
                      <div className="w-0.5 sm:w-1 h-full bg-gradient-to-b from-secondary-light to-accent-light dark:from-secondary-dark dark:to-accent-dark rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold">2025</h4>
                      <p className="text-secondary-light dark:text-secondary-dark font-medium text-sm sm:text-base">Hackatruck MakerSpace</p>
                      <p className="text-gray-700 dark:text-gray-300 mt-1 sm:mt-2 text-sm sm:text-base">Experiência em programação em Swift oferecida pela Eldorado em parceria com a IBM</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-3 sm:mr-4 flex flex-col items-center">
                      <div className="w-4 sm:w-5 h-4 sm:h-5 bg-accent-light dark:bg-accent-dark rounded-full shadow-lg shadow-accent-light/20 dark:shadow-accent-dark/20"></div>
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold">2022</h4>
                      <p className="text-accent-light dark:text-accent-dark font-medium text-sm sm:text-base">Curso Técnico em Logística integrado ao Ensino Médio</p>
                      <p className="text-gray-700 dark:text-gray-300 mt-1 sm:mt-2 text-sm sm:text-base">Instituto Federal de Ciência e Tecnologia do Triângulo Mineiro (IFTM) - Formação com foco em Logística.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente Habilidades
const Skills = () => {
  const skills = [
    { name: 'HTML5', icon: 'fab fa-html5', color: 'text-orange-500', level: 90 },
    { name: 'CSS3', icon: 'fab fa-css3-alt', color: 'text-blue-500', level: 85 },
    { name: 'JavaScript', icon: 'fab fa-js', color: 'text-yellow-400', level: 90 },
    { name: 'React', icon: 'fab fa-react', color: 'text-blue-400', level: 85 },
    { name: 'Node.js', icon: 'fab fa-node-js', color: 'text-green-500', level: 80 },
    { name: 'PHP', icon: 'fab fa-php', color: 'text-indigo-500', level: 75 },
    { name: 'Python', icon: 'fab fa-python', color: 'text-blue-600', level: 70 },
    { name: 'Git', icon: 'fab fa-git-alt', color: 'text-red-500', level: 85 },
    { name: 'Tailwind CSS', icon: 'fas fa-wind', color: 'text-cyan-400', level: 90 },
    { name: 'MongoDB', icon: 'fas fa-database', color: 'text-green-600', level: 75 },    { name: 'Figma', icon: 'fab fa-figma', color: 'text-purple-400', level: 50 },
    { name: 'Bootstrap', icon: 'fab fa-bootstrap', color: 'text-purple-600', level: 85 }
  ];

  return (    <section id="habilidades" className="py-16 sm:py-24 bg-gray-50 dark:bg-dark-900 relative overflow-hidden">
      <div className="blob-shape blob-shape-1 opacity-30 top-auto bottom-0 hidden sm:block"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold">
            Minhas <span className="gradient-text">Habilidades</span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-primary-light dark:bg-primary-dark mx-auto mt-4 sm:mt-6"></div>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-4 sm:mt-6 max-w-3xl mx-auto">
            Ao longo dos anos, desenvolvi e aprimorei diversas habilidades técnicas.
            Aqui estão as principais tecnologias com as quais trabalho diariamente.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="card-glassmorphism p-4 sm:p-6 rounded-xl hover-scale"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <div className={`text-2xl sm:text-4xl ${skill.color} mr-3 sm:mr-4`}>
                  <i className={skill.icon}></i>
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-base sm:text-xl">{skill.name}</h3>
                  <div className="w-full bg-gray-200 dark:bg-dark-700 h-1.5 sm:h-2 rounded-full mt-1 sm:mt-2">
                    <div 
                      className="bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark h-1.5 sm:h-2 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm mt-1 sm:mt-2">
                {skill.level >= 90 ? 'Especialista' : 
                  skill.level >= 80 ? 'Avançado' : 
                  skill.level >= 70 ? 'Intermediário' : 'Básico'}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-10 sm:mt-16 text-center">
          <h3 className="text-xl sm:text-2xl font-display font-bold mb-5 sm:mb-8">Outras Habilidades</h3>
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {['UI/UX Design', 'Spring', 'Firebase', 'JQuery', 'TypeScript', 'SASS', 'Swift', 'R', 'Java', 'Vue.js'].map((skill, index) => (
              <span 
                key={index}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover-scale text-xs sm:text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente de Projetos
const Projects = () => {
  const projects = [
    {
      title: 'Animu',
      description: 'Uma plataforma de comunidade de animes completa com recursos de visualização de animes, compartilhamento, sessão de discussão e painel administrativo para moderação e gerenciamento do site.',
      image: 'images/animu.png',
      tech: ['Tailwind CSS', 'Quill.js', 'Firebase/Firestore', 'JQuery'],
      link: 'https://victor-gabriel-barbosa.github.io/Animu/',
      sourceCode: 'https://github.com/Victor-Gabriel-Barbosa/Animu',
      featured: true
    },
    {
      title: 'Pinboard',
      description: 'Imagine um Pinterest personalizado! Essa aplicação permite que você crie sua conta, faça login e explore um universo de pins (imagens com título, descrição e tags). Você pode organizar tudo em pastas (boards), categorizando suas referências visuais por tema, interesse ou projeto. É como ter um painel de inspirações digital, só que do seu jeito!.',
      image: 'images/pinboard.png',
      tech: ['Spring Boot', 'H2 Database', 'JPA', 'Bootstrap'],
      link: 'https://github.com/TrabFinalPOO2/codigoFonte',
      sourceCode: 'https://github.com/TrabFinalPOO2/codigoFonte',
      featured: true
    }
  ];

  return (    <section id="projetos" className="py-16 sm:py-24 bg-white dark:bg-dark-800 relative overflow-hidden">
      <div className="blob-shape blob-shape-3 opacity-20 hidden sm:block"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold">
            Meus <span className="gradient-text">Projetos</span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-primary-light dark:bg-primary-dark mx-auto mt-4 sm:mt-6"></div>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-4 sm:mt-6 max-w-3xl mx-auto">
            Aqui estão alguns dos meus projetos recentes. Cada projeto é uma oportunidade de aprendizado e aprimoramento das minhas habilidades.
          </p>
        </div>
        
        {/* Projetos destacados */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 mb-12 sm:mb-16">
          {projects.filter(p => p.featured).map((project, index) => (
            <div key={index} className="border-gradient p-1 rounded-xl shadow-xl group">
              <div className="card-glassmorphism rounded-xl overflow-hidden h-full flex flex-col">
                <div className="h-48 sm:h-56 md:h-64 overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 sm:p-6 w-full">
                      <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
                        {project.tech.map((tech, idx) => (
                          <span 
                            key={idx}
                            className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-6 md:p-8 flex-grow">
                  <h3 className="text-xl sm:text-2xl font-display font-bold mb-2 sm:mb-3">{project.title}</h3>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 sm:mb-6">{project.description}</p>
                  
                  <div className="flex justify-between mt-auto">
                    <a 
                      href={project.link} 
                      className="btn-modern px-4 sm:px-6 py-1.5 sm:py-2 bg-primary-light hover:bg-primary-light/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90 text-white rounded-full shadow-md shadow-primary-light/20 dark:shadow-primary-dark/20 transition-all duration-300 text-xs sm:text-sm font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-external-link-alt mr-1 sm:mr-2"></i>
                      Ver Demo
                    </a>
                    <a 
                      href={project.sourceCode} 
                      className="px-4 sm:px-6 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 hover:border-primary-light dark:hover:border-primary-dark rounded-full transition-all duration-300 text-xs sm:text-sm font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github mr-1 sm:mr-2"></i>
                      Código
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>        
        {/* Outros Projetos */}
        <h3 className="text-xl sm:text-2xl font-display font-bold text-center mb-5 sm:mb-8">Outros Projetos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.filter(p => !p.featured).map((project, index) => (
            <div key={index} className="card-glassmorphism rounded-xl overflow-hidden shadow-lg hover-scale">
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{project.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                  {project.tech.slice(0, 3).map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 sm:py-1 bg-gray-100 dark:bg-dark-700 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-0.5 sm:py-1 bg-gray-100 dark:bg-dark-700 text-xs rounded-full">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex justify-between">
                  <a 
                    href={project.link} 
                    className="text-primary-light dark:text-primary-dark hover:underline text-xs sm:text-sm flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-external-link-alt mr-1"></i>
                    Demo
                  </a>
                  <a 
                    href={project.sourceCode} 
                    className="text-primary-light dark:text-primary-dark hover:underline text-xs sm:text-sm flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github mr-1"></i>
                    Código
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10 sm:mt-16">
          <a href="https://github.com/Victor-Gabriel-Barbosa" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center btn-modern px-6 sm:px-8 py-3 sm:py-4 bg-primary-light hover:bg-primary-light/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90 text-white rounded-full shadow-lg shadow-primary-light/20 dark:shadow-primary-dark/20 hover:shadow-xl hover:shadow-primary-light/30 dark:hover:shadow-primary-dark/30 transition-all duration-300 text-sm sm:text-base font-semibold"
          >
            <i className="fab fa-github mr-2 text-lg sm:text-xl"></i>
            Ver Mais no GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

// Componente de Contato
const Contact = () => {
  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Pega os dados do formulário
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Validação básica
    if (!name || !email || !subject || !message) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    // Cria o link mailto
    const emailBody = `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`;
    const mailtoLink = `mailto:victorgabrielbarbosa88@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Abre o cliente de email
    window.location.href = mailtoLink;
    
    // Limpa o formulário após o envio
    e.target.reset();
    
    // Feedback visual
    alert('Obrigado! Seu cliente de email será aberto para enviar a mensagem.');
  };

  return (    <section id="contato" className="py-16 sm:py-24 bg-gray-50 dark:bg-dark-900 relative overflow-hidden">
      <div className="blob-shape blob-shape-2 opacity-20 top-auto bottom-0 right-0 left-auto hidden sm:block"></div>
      <div className="blob-shape blob-shape-1 opacity-20 left-0 top-auto bottom-20 hidden sm:block"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold">
            Entre em <span className="gradient-text">Contato</span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-primary-light dark:bg-primary-dark mx-auto mt-4 sm:mt-6"></div>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mt-4 sm:mt-6 max-w-3xl mx-auto">
            Vamos trabalhar juntos? Envie-me uma mensagem e retornarei o mais breve possível.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12">
          <div className="lg:w-7/12">
            <div className="border-gradient p-1 rounded-xl shadow-xl h-full">
              <div className="card-glassmorphism p-4 sm:p-6 md:p-8 rounded-xl h-full">
                <h3 className="text-xl sm:text-2xl font-display font-bold mb-4 sm:mb-6 gradient-text inline-block">Envie uma mensagem</h3>
                
                <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="name" className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium">Nome</label>                      <input 
                        type="text" 
                        id="name" 
                        name="name"
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-all duration-200 text-sm"
                        placeholder="Seu nome"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-all duration-200 text-sm"
                        placeholder="seu.email@exemplo.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium">Assunto</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject"
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-all duration-200 text-sm"
                      placeholder="Assunto da mensagem"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium">Mensagem</label>
                    <textarea 
                      id="message" 
                      name="message"
                      rows="4" 
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-dark-600 bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-all duration-200 text-sm"
                      placeholder="Sua mensagem..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="btn-modern w-full py-2.5 sm:py-4 bg-primary-light hover:bg-primary-light/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90 text-white rounded-lg shadow-lg shadow-primary-light/20 dark:shadow-primary-dark/20 hover:shadow-xl hover:shadow-primary-light/30 dark:hover:shadow-primary-dark/30 transition-all duration-300 text-sm sm:text-base font-semibold"
                  >
                    Enviar Mensagem
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          <div className="lg:w-5/12">
            <div className="border-gradient p-1 rounded-xl shadow-xl h-full">
              <div className="card-glassmorphism p-4 sm:p-6 md:p-8 rounded-xl h-full">
                <h3 className="text-xl sm:text-2xl font-display font-bold mb-4 sm:mb-6 gradient-text inline-block">Informações de Contato</h3>
                
                <div className="space-y-5 sm:space-y-8">
                  <div className="flex items-start">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-primary-light/10 dark:bg-primary-dark/10 mr-3 sm:mr-4 shadow-lg shadow-primary-light/10 dark:shadow-primary-dark/10">
                      <i className="fas fa-map-marker-alt text-primary-light dark:text-primary-dark text-sm sm:text-xl"></i>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold mb-0.5 sm:mb-1">Localização</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">Monte Carmelo, MG - Brasil</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-secondary-light/10 dark:bg-secondary-dark/10 mr-3 sm:mr-4 shadow-lg shadow-secondary-light/10 dark:shadow-secondary-dark/10">
                      <i className="fas fa-envelope text-secondary-light dark:text-secondary-dark text-sm sm:text-xl"></i>
                    </div>                    <div>
                      <h4 className="text-base sm:text-lg font-semibold mb-0.5 sm:mb-1">Email</h4>
                      <a href="mailto:victorgabrielbarbosa88@gmail.com" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark transition-colors">victorgabrielbarbosa88@gmail.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-accent-light/10 dark:bg-accent-dark/10 mr-3 sm:mr-4 shadow-lg shadow-accent-light/10 dark:shadow-accent-dark/10">
                      <i className="fas fa-phone text-accent-light dark:text-accent-dark text-sm sm:text-xl"></i>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold mb-0.5 sm:mb-1">Telefone</h4>
                      <a href="tel:+5511999999999" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark transition-colors">(38) 99883-2804</a>
                    </div>
                  </div>
                  
                  <div className="pt-3 sm:pt-6">
                    <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Redes Sociais</h4>
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                      <a href="https://github.com/Victor-Gabriel-Barbosa" target="_blank" className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-dark-700 hover:bg-primary-light hover:text-white dark:hover:bg-primary-dark shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300">
                        <i className="fab fa-github text-base sm:text-lg"></i>
                      </a>
                      <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-dark-700 hover:bg-primary-light hover:text-white dark:hover:bg-primary-dark shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300">
                        <i className="fab fa-linkedin-in text-base sm:text-lg"></i>
                      </a>
                      <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-dark-700 hover:bg-primary-light hover:text-white dark:hover:bg-primary-dark shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300">
                        <i className="fab fa-twitter text-base sm:text-lg"></i>
                      </a>
                      <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-dark-700 hover:bg-primary-light hover:text-white dark:hover:bg-primary-dark shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300">
                        <i className="fab fa-instagram text-base sm:text-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente Footer
const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark-800 py-10 sm:py-16 relative overflow-hidden">
      <div className="grid-pattern absolute inset-0 z-0 opacity-50 sm:opacity-100"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 sm:mb-8 md:mb-0 text-center md:text-left">
            <a href="#" className="text-xl sm:text-2xl font-display font-bold gradient-text inline-block mb-3 sm:mb-4">Portfolio<span className="text-primary-light dark:text-primary-dark">.</span></a>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-md">
              Transformando ideias em experiências digitais modernas e memoráveis. Especializado em desenvolvimento full stack com foco em design e performance.
            </p>
          </div>
          
          <div className="mb-6 sm:mb-8 md:mb-0">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-center md:text-left">Links Rápidos</h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6">
              <a href="#sobre" className="text-xs sm:text-sm hover:text-primary-light dark:hover:text-primary-dark transition-colors">Sobre</a>
              <a href="#habilidades" className="text-xs sm:text-sm hover:text-primary-light dark:hover:text-primary-dark transition-colors">Habilidades</a>
              <a href="#projetos" className="text-xs sm:text-sm hover:text-primary-light dark:hover:text-primary-dark transition-colors">Projetos</a>
              <a href="#contato" className="text-xs sm:text-sm hover:text-primary-light dark:hover:text-primary-dark transition-colors">Contato</a>
            </div>
          </div>
          
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-center md:text-left">Redes Sociais</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://github.com/Victor-Gabriel-Barbosa" target="_blank" className="text-lg sm:text-xl hover:text-primary-light dark:hover:text-primary-dark transition-colors hover-scale">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="text-lg sm:text-xl hover:text-primary-light dark:hover:text-primary-dark transition-colors hover-scale">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-lg sm:text-xl hover:text-primary-light dark:hover:text-primary-dark transition-colors hover-scale">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-lg sm:text-xl hover:text-primary-light dark:hover:text-primary-dark transition-colors hover-scale">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-dark-700 mt-8 sm:mt-10 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Victor Gabriel Barbosa. Todos os direitos reservados.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 sm:mt-2">
            Desenvolvido com <i className="fas fa-heart text-primary-light dark:text-primary-dark mx-1"></i> usando React e Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

// Botão para voltar ao topo
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <button
      onClick={scrollToTop}
      className={`fixed right-4 sm:right-6 bottom-4 sm:bottom-6 p-3 sm:p-4 rounded-full bg-primary-light dark:bg-primary-dark text-white shadow-lg shadow-primary-light/20 dark:shadow-primary-dark/20 hover:shadow-xl hover:shadow-primary-light/30 dark:hover:shadow-primary-dark/30 transition-all duration-300 z-50 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
      }`}
      aria-label="Voltar ao topo"
    >
      <i className="fas fa-arrow-up text-sm sm:text-base"></i>
    </button>
  );
};

// Componente principal App
const App = () => {
  const [theme, setTheme] = useState('system');
  
  // Efeito para aplicar o tema escolhido
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'system') {
      // Verifica preferência do sistema
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', systemPrefersDark);
      
      // Adiciona listener para mudanças na preferência do sistema
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        root.classList.toggle('dark', e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Aplica tema manual
      root.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  return (
    <React.Fragment>
      <Navbar setTheme={setTheme} theme={theme} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <ScrollToTop />
    </React.Fragment>
  );
};

// Renderiza o aplicativo React
ReactDOM.render(<App />, document.getElementById('root'));