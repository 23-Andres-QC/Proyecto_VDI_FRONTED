<template>
  <q-page class="home-page">
    <!-- ========================================= -->
    <!-- BLOQUE 1: HEADER/NAVEGACIÓN SUPERIOR -->
    <!-- ========================================= -->
    <!-- Barra de navegación fija en la parte superior con logo y menú principal -->
    <q-header elevated class="header-custom">
      <q-toolbar class="nav-container">
        <!-- Sección del logo y título institucional (movido a la izquierda) -->
        <div class="logo-section">
          <div class="logo-placeholder">
            <img
              src="src/assets/Home_imagenes/LogoNegro.jpg"
              alt="Universidad Esan"
              class="logo-img"
            />
          </div>
          <div class="nav-title">
            <div class="title-line-1">VICERRECTORADO</div>
            <div class="title-line-2">DE INVESTIGACIÓN</div>
          </div>
        </div>

        <!-- Menú de navegación principal (movido a la derecha) -->
        <div class="nav-menu">
          <q-btn flat label="UE Esan" @click="openUeEsan" />
          <q-btn flat label="Portal Académico" @click="openPortalAcademico" />
          <q-btn flat label="Nosotros" @click="scrollTo('nosotros')" />
          <q-btn flat label="Recursos" @click="openRecursos" />
          <div class="dropdown-container" @mouseenter="showDropdown" @mouseleave="hideDropdown">
            <q-btn-dropdown flat label="Publicaciones" v-model="dropdownVisible" auto-close>
              <q-list>
                <q-item clickable>
                  <q-item-section>Publicaciones 2020</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Publicaciones 2021</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Publicaciones 2022</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Publicaciones 2023</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Publicaciones 2024</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Publicaciones 2025</q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
          <q-btn class="login-btn" label="Inicio sesión" @click="goToLogin" />
        </div>
      </q-toolbar>
    </q-header>

    <!-- ========================================= -->
    <!-- BLOQUE 2: SECCIÓN HERO/PORTADA PRINCIPAL -->
    <!-- ========================================= -->
    <!-- Imagen de fondo a pantalla completa con título principal y tarjetas de acceso rápido -->
    <section class="hero" id="inicio">
      <!-- Contenedor de imagen de fondo con overlay oscuro -->
      <div class="hero-background">
        <img
          :src="currentHeroImage"
          :key="currentHeroImage"
          alt="Estudiante investigando en biblioteca"
          class="hero-image"
        />
        <div class="hero-overlay"></div>

        <!-- Indicadores de imagen activa -->
        <div class="hero-indicators">
          <div
            v-for="(image, index) in heroImages"
            :key="index"
            :class="['indicator', { active: currentHeroImage === image }]"
          ></div>
        </div>
      </div>

      <!-- Contenido principal sobre la imagen -->
      <div class="hero-content">
        <h1 class="hero-title">Vicerrectorrado de Investigación</h1>
        <p class="hero-subtitle">
          Fomentamos una cultura de investigación e innovación en la comunidad universitaria
        </p>

        <!-- Tarjetas de acceso rápido a secciones principales -->
        <div class="hero-cards">
          <q-card class="hero-card" @click="scrollTo('nosotros')">
            <q-card-section class="text-center">
              <q-icon name="assessment" size="48px" class="hero-card-icon" />
              <h3>Dirección de Investigación</h3>
            </q-card-section>
          </q-card>
          <q-card class="hero-card" @click="openEsanEdiciones">
            <q-card-section class="text-center">
              <q-icon name="menu_book" size="48px" class="hero-card-icon" />
              <h3>Esan ediciones</h3>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <!-- ========================================= -->
    <!-- BLOQUE 3: SECCIÓN "¿QUÉ HACE?" -->
    <!-- ========================================= -->
    <!-- Información institucional con layout de texto e imagen lado a lado -->
    <section class="about-section" id="nosotros">
      <div class="container">
        <div class="row q-gutter-xl items-center no-wrap">
          <!-- Columna de contenido textual -->
          <div class="col-md-6 col-12 text-content">
            <q-card class="queHace-content">
              <q-card-section>
                <h2 class="section-title">¿QUE HACE?</h2>
                <p class="about-text">
                  El Vicerrectorado de Investigación se encarga de promover, coordinar y supervisar
                  las actividades de investigación científica, tecnológica e innovación dentro de la
                  universidad.
                </p>
                <p class="about-text">
                  Facilita el desarrollo de proyectos de investigación, apoya a los docentes
                  investigadores y gestiona fondos y convenios con entidades nacionales e
                  internacionales.
                </p>
                <p class="about-text">
                  Además, impulsa la formación académica a través de programas de posgrado y
                  publicaciones científicas.
                </p>
              </q-card-section>
            </q-card>
          </div>

          <!-- Columna de imagen ilustrativa -->
          <div class="col-md-6 col-12 image-content">
            <div class="about-image-container">
              <img
                src="src/assets/Home_imagenes/Vicerrectorado1.jpg"
                alt="Director del Vicerrectorado"
                class="about-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================= -->
    <!-- BLOQUE 4: SECCIÓN MISIÓN -->
    <!-- ========================================= -->
    <!-- Declaración de la misión institucional con imagen y tarjeta destacada -->
    <section class="mission-section">
      <div class="container">
        <div class="row q-gutter-xl items-center no-wrap">
          <!-- Columna de imagen (orden invertido respecto a la sección anterior) -->
          <div class="col-md-6 col-12">
            <div class="mission-image-container">
              <img
                src="src/assets/Home_imagenes/mision.jpg"
                alt="Imagen de Innovación"
                class="mission-img"
              />
            </div>
          </div>

          <!-- Columna de contenido de misión en tarjeta estilizada -->
          <div class="col-md-6 col-12">
            <q-card class="mission-content">
              <q-card-section>
                <h2 class="mission-title">Misión</h2>
                <p class="mission-text">
                  Fomentar una cultura de investigación e innovación en la comunidad universitaria,
                  contribuyendo al desarrollo científico, tecnológico y social del país mediante la
                  generación de conocimiento de calidad y con impacto positivo en la sociedad.
                </p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>
    <!-- ========================================= -->
    <!-- BLOQUE 5: LÍNEAS DE INVESTIGACIÓN -->
    <!-- ========================================= -->
    <!-- Grid de tarjetas mostrando todas las áreas de investigación disponibles -->
    <section class="research-section" id="investigacion">
      <div class="container">
        <h2 class="research-title">Líneas de Investigación</h2>

        <!-- Barra de navegación de facultades -->
        <div class="faculty-navigation">
          <div class="faculty-tabs">
            <button
              v-for="faculty in faculties"
              :key="faculty.id"
              @click="selectFaculty(faculty.id)"
              :class="['faculty-tab', { active: selectedFaculty === faculty.id }]"
            >
              {{ faculty.name }}
            </button>
          </div>
        </div>

        <div class="research-carousel-container">
          <!-- Botones de navegación -->
          <button
            class="carousel-btn carousel-btn-prev"
            @click="previousSlide"
            @mouseenter="pauseAutoplay"
            @mouseleave="resumeAutoplay"
            :disabled="currentSlide === 0"
          >
            <q-icon name="chevron_left" size="24px" />
          </button>
          <button
            class="carousel-btn carousel-btn-next"
            @click="nextSlide"
            @mouseenter="pauseAutoplay"
            @mouseleave="resumeAutoplay"
            :disabled="currentSlide >= totalSlides - 1"
          >
            <q-icon name="chevron_right" size="24px" />
          </button>

          <!-- Contenedor del carrusel -->
          <div
            class="research-carousel"
            ref="carousel"
            @mouseenter="pauseAutoplay"
            @mouseleave="resumeAutoplay"
          >
            <div
              class="research-track"
              :style="{ transform: `translateX(-${currentSlide * (cardWidth + 48)}px)` }"
            >
              <q-card
                v-for="item in filteredResearchSlides"
                :key="item.id"
                class="research-card"
                :class="{ 'full-width': item.fullWidth }"
                :style="{ minWidth: cardWidth + 'px', width: cardWidth + 'px' }"
              >
                <q-card-section class="text-center">
                  <q-icon :name="item.icon" size="48px" class="research-icon" />
                  <h3>{{ item.title }}</h3>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <!-- Indicadores de página -->
          <div class="carousel-indicators">
            <button
              v-for="(slide, index) in filteredResearchSlides"
              :key="index"
              class="indicator-dot"
              :class="{ active: currentSlide === index }"
              @click="goToSlide(index)"
              @mouseenter="pauseAutoplay"
              @mouseleave="resumeAutoplay"
            ></button>
          </div>
        </div>
      </div>
    </section>
    <!-- ========================================= -->
    <!-- BLOQUE 6: FOOTER INTEGRADO -->
    <!-- ========================================= -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-content">
          <!-- Primera columna: Logo, redes sociales e información institucional -->
          <div class="footer-section logo-info-section">
            <div class="footer-logo-section">
              <div class="footer-logo">
                <div class="footer-logo-icon">
                  <q-icon name="school" size="24px" color="white" />
                </div>
                <div class="footer-logo-text">
                  <div class="university-name">ESAN</div>
                  <div class="department-name">VICERRECTORADO DE INVESTIGACIÓN</div>
                </div>
              </div>
            </div>

            <!-- Sección de redes sociales movida aquí -->
            <div class="social-section-integrated">
              <h4 class="footer-subtitle">NUESTRAS REDES SOCIALES</h4>
              <p class="social-description">Mantente conectado con nosotros</p>
              <div class="social-links">
                <a href="#" class="social-link" aria-label="Facebook">
                  <i class="fa-brands fa-facebook-f"></i>
                </a>
                <a href="#" class="social-link" aria-label="Instagram">
                  <i class="fa-brands fa-instagram"></i>
                </a>
                <a href="#" class="social-link" aria-label="LinkedIn">
                  <i class="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="#" class="social-link" aria-label="X Twitter">
                  <i class="fa-brands fa-x-twitter"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Segunda columna: Enlaces institucionales -->
          <div class="footer-section links-section">
            <h3 class="footer-title">Sobre ESAN VDI</h3>
            <ul class="footer-links">
              <li><a href="#nosotros" @click="scrollTo('nosotros')">Nosotros</a></li>
              <li>
                <a href="#investigacion" @click="scrollTo('investigacion')"
                  >Líneas de Investigación</a
                >
              </li>
              <li><a href="#gestion-investigacion">Gestión de la Investigación</a></li>
              <li><a href="#esan-ediciones" @click="openEsanEdiciones">ESAN Ediciones</a></li>
            </ul>
          </div>

          <!-- Tercera columna: Información legal y recursos -->
          <div class="footer-section info-section">
            <h3 class="footer-title">Información de Interés</h3>
            <ul class="footer-links">
              <li><a href="#politica-privacidad">Política de Privacidad</a></li>
              <li><a href="#libro-reclamaciones">Libro de Reclamaciones</a></li>
              <li><a href="#terminos-condiciones">Términos y Condiciones</a></li>
            </ul>

            <div class="footer-icon-section">
              <q-icon name="menu_book" size="56px" color="rgba(255,255,255,0.3)" />
            </div>
          </div>
        </div>

        <!-- Línea divisoria y copyright -->
        <div class="footer-bottom">
          <div class="footer-divider"></div>
          <div class="footer-copyright">
            <p>
              &copy; 2025 Universidad ESAN - Vicerrectorado de Investigación. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>

    <!-- ChatBot flotante en la esquina inferior derecha -->
    <div class="chat-floating">
      <ChatBot />
    </div>
  </q-page>
</template>

<!-- ========================================= -->
<!-- BLOQUE 7: LÓGICA JAVASCRIPT DEL COMPONENTE -->
<!-- ========================================= -->
<script>
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { scroll } from 'quasar'
import { useRouter } from 'vue-router'

// Importar las imágenes del hero
import CampusEsanImg from '../assets/Home_imagenes/CampusEsan.jpg'
import EstudianteImg from '../assets/Home_imagenes/Estudiante.jpg'
import VicerrectoradoImg from '../assets/Home_imagenes/Vicerrectorado.jpg'
import Vicerrectorado1Img from '../assets/Home_imagenes/Vicerrectorado1.jpg'
import MisionImg from '../assets/Home_imagenes/mision.jpg'

const { getScrollTarget, setVerticalScrollPosition } = scroll
import ChatBot from '../components/ChatBot.vue'

export default defineComponent({
  name: 'HomePantalla',
  components: {
    ChatBot,
  },
  setup() {
    const router = useRouter()
    function goToLogin() {
      router.push('/login')
    }
    // Imagen hero transicionable - usando imports de todas las imágenes disponibles
    const heroImages = [
      CampusEsanImg,
      EstudianteImg,
      VicerrectoradoImg,
      Vicerrectorado1Img,
      MisionImg,
    ]
    const currentHeroImage = ref(heroImages[0])
    let intervalId = null

    onMounted(() => {
      let idx = 0
      intervalId = setInterval(() => {
        idx = (idx + 1) % heroImages.length
        currentHeroImage.value = heroImages[idx]
        console.log(
          'Cambiando imagen a:',
          currentHeroImage.value,
          'Índice:',
          idx + 1,
          'de',
          heroImages.length,
        ) // Debug mejorado
      }, 4000) // Cambiar cada 4 segundos para dar más tiempo a ver cada imagen
    })
    onBeforeUnmount(() => {
      if (intervalId) clearInterval(intervalId)
    })

    return {
      goToLogin,
      currentHeroImage,
      heroImages, // Exponer heroImages para los indicadores
    }
  },
  data() {
    return {
      dropdownVisible: false,
      dropdownTimer: null, // Timer para controlar el delay
      // Carrusel de investigación
      currentSlide: 0,
      slideWidth: 0,
      autoplayInterval: null,
      visibleCards: 4, // Número de tarjetas visibles al mismo tiempo
      cardWidth: 0, // Ancho de cada tarjeta individual
      // Navegación por facultades
      selectedFaculty: 'todas', // Facultad actualmente seleccionada
      faculties: [
        { id: 'todas', name: 'Todas las Facultades' },
        { id: 'economicas', name: 'Facultad de Ciencias Económicas y Administrativas' },
        { id: 'ingenieria', name: 'Facultad de Ingeniería' },
        { id: 'derecho', name: 'Facultad de Derecho y Ciencias Sociales' },
      ],
      researchSlides: [
        // Slide 1
        { id: 1, icon: 'groups', title: 'ADMINISTRACIÓN', faculty: 'economicas' },
        // Slide 2
        { id: 2, icon: 'gavel', title: 'DERECHO', faculty: 'derecho' },
        // Slide 3
        {
          id: 3,
          icon: 'account_balance',
          title: 'CONTABILIDAD, COSTOS Y/O TRIBUTACIÓN',
          faculty: 'economicas',
        },
        // Slide 4
        { id: 4, icon: 'hotel', title: 'TURISMO, HOTELERÍA Y GASTRONOMÍA', faculty: 'economicas' },
        // Slide 5
        {
          id: 5,
          icon: 'precision_manufacturing',
          title: 'DISEÑO INDUSTRIAL, AUTOMATIZACIÓN Y/O ROBÓTICA',
          faculty: 'ingenieria',
        },
        // Slide 6
        { id: 6, icon: 'trending_up', title: 'ECONOMÍA Y FINANZAS', faculty: 'economicas' },
        // Slide 7
        {
          id: 7,
          icon: 'school',
          title: 'EDUCACIÓN Y GESTIÓN DEL CONOCIMIENTO',
          faculty: 'derecho',
        },
        // Slide 8
        { id: 8, icon: 'lightbulb', title: 'EMPRENDIMIENTO E INNOVACIÓN', faculty: 'economicas' },
        // Slide 9
        { id: 9, icon: 'handshake', title: 'ÉTICA, COMPLIANCE Y GOBERNANZA', faculty: 'derecho' },
        // Slide 10
        {
          id: 10,
          icon: 'account_balance_wallet',
          title: 'GESTIÓN PÚBLICA Y POLÍTICAS PÚBLICAS',
          faculty: 'derecho',
        },
        // Slide 11
        {
          id: 11,
          icon: 'public',
          title: 'GLOBALIZACIÓN Y NEGOCIOS INTERNACIONALES',
          faculty: 'economicas',
        },
        // Slide 12
        {
          id: 12,
          icon: 'factory',
          title: 'INDUSTRIAS EXTRACTIVAS AGROINDUSTRIA, PESCA Y ENERGÍA',
          faculty: 'ingenieria',
        },
        // Slide 13
        {
          id: 13,
          icon: 'psychology',
          title: 'LIDERAZGO, COMPORTAMIENTO ORGANIZACIONAL DEL GRUPO',
          faculty: 'economicas',
        },
        // Slide 14
        { id: 14, icon: 'campaign', title: 'MARKETING', faculty: 'economicas' },
        // Slide 15
        { id: 15, icon: 'eco', title: 'MEDIO AMBIENTE', faculty: 'ingenieria' },
        // Slide 16
        {
          id: 16,
          icon: 'settings',
          title: 'PRODUCCIÓN, PROCESOS Y/O GESTIÓN DE LA CALIDAD',
          faculty: 'ingenieria',
        },
        // Slide 17
        { id: 17, icon: 'psychology_alt', title: 'PSICOLOGÍA', faculty: 'derecho' },
        // Slide 18
        {
          id: 18,
          icon: 'health_and_safety',
          title: 'EDUCACIÓN, INDUSTRIAL, SALUD OCUPACIONAL Y/O SERVICIOS DE SALUD',
          faculty: 'ingenieria',
        },
        // Slide 19
        {
          id: 19,
          icon: 'computer',
          title: 'SISTEMAS Y TECNOLOGÍAS DE INFORMACIÓN',
          faculty: 'ingenieria',
        },
        // Slide 20
        {
          id: 20,
          icon: 'local_shipping',
          title: 'SUPPLY CHAIN Y GESTIÓN LOGÍSTICA INTEGRAL',
          faculty: 'economicas',
        },
        // Slide 21 - Tarjeta destacada
        {
          id: 21,
          icon: 'recycling',
          title:
            'DESARROLLO SOSTENIBLE, RESPONSABILIDAD SOCIAL EMPRESARIAL (RSE) Y/O CRECIMIENTO COMUNITARIO',
          fullWidth: true,
          faculty: 'economicas',
        },
      ],
    }
  },
  computed: {
    totalSlides() {
      return this.filteredResearchSlides.length
    },
    filteredResearchSlides() {
      if (this.selectedFaculty === 'todas') {
        return this.researchSlides
      }
      return this.researchSlides.filter((slide) => slide.faculty === this.selectedFaculty)
    },
  },
  mounted() {
    this.calculateSlideWidth()
    this.startAutoplay()
    window.addEventListener('resize', this.calculateSlideWidth)
  },
  beforeUnmount() {
    this.stopAutoplay()
    window.removeEventListener('resize', this.calculateSlideWidth)
    // Limpiar el timer del dropdown al desmontar el componente
    if (this.dropdownTimer) {
      clearTimeout(this.dropdownTimer)
      this.dropdownTimer = null
    }
  },
  methods: {
    // Función para navegación suave entre secciones
    // Utiliza la API de scroll de Quasar para animaciones fluidas
    scrollTo(elementId) {
      const element = document.getElementById(elementId)
      const target = getScrollTarget(element)
      const offset = element.offsetTop
      const duration = 1000 // Duración de la animación en milisegundos
      setVerticalScrollPosition(target, offset, duration)
    },
    openEsanEdiciones() {
      console.log('Opening link: https://ediciones.esan.edu.pe/')
      window.open('https://ediciones.esan.edu.pe/', '_blank')
    },
    openPortalAcademico() {
      console.log(
        'Opening link: https://pa.uesan.edu.pe/index.php?msg3=El%20nombre%20de%20usuario%20y%20la%20contrase%C3%B1a%20no%20coinciden%20o%20no%20tienes%20acceso%20a%20esta%20plataforma%20virtual.',
      )
      window.open(
        'https://pa.uesan.edu.pe/index.php?msg3=El%20nombre%20de%20usuario%20y%20la%20contrase%C3%B1a%20no%20coinciden%20o%20no%20tienes%20acceso%20a%20esta%20plataforma%20virtual.',
        '_blank',
      )
    },
    openUeEsan() {
      console.log('Opening link: https://www.ue.edu.pe/pregrado/')
      window.open('https://www.ue.edu.pe/pregrado/', '_blank')
    },
    openRecursos() {
      console.log('Opening link: https://biblioteca.uesan.edu.pe/')
      window.open('https://biblioteca.uesan.edu.pe/', '_blank')
    },
    showDropdown() {
      // Limpiar cualquier timer existente
      if (this.dropdownTimer) {
        clearTimeout(this.dropdownTimer)
        this.dropdownTimer = null
      }
      this.dropdownVisible = true
    },
    hideDropdown() {
      // Agregar un pequeño delay antes de cerrar
      this.dropdownTimer = setTimeout(() => {
        this.dropdownVisible = false
        this.dropdownTimer = null
      }, 150) // 150ms de delay
    },
    // Métodos del carrusel de investigación
    calculateSlideWidth() {
      this.$nextTick(() => {
        const carousel = this.$refs.carousel
        if (carousel) {
          this.slideWidth = carousel.offsetWidth
          // Calcular el ancho de cada tarjeta considerando gaps
          const gap = 48 // 3rem = 48px (aumentado para mayor separación)
          this.cardWidth = (this.slideWidth - gap * (this.visibleCards - 1)) / this.visibleCards
        }
      })
    },
    nextSlide() {
      // Navegar hasta que la última tarjeta visible sea la última tarjeta del array
      const maxSlide = this.filteredResearchSlides.length - this.visibleCards
      if (this.currentSlide < maxSlide) {
        this.currentSlide++
      } else {
        this.currentSlide = 0 // Volver al inicio
      }
    },
    previousSlide() {
      const maxSlide = this.filteredResearchSlides.length - this.visibleCards
      if (this.currentSlide > 0) {
        this.currentSlide--
      } else {
        this.currentSlide = maxSlide // Ir al final
      }
    },
    goToSlide(index) {
      this.currentSlide = index
    },
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.nextSlide()
      }, 5000) // Cambiar cada 5 segundos
    },
    stopAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval)
        this.autoplayInterval = null
      }
    },
    pauseAutoplay() {
      this.stopAutoplay()
    },
    resumeAutoplay() {
      this.startAutoplay()
    },
    // Método para cambiar la facultad seleccionada
    selectFaculty(facultyId) {
      this.selectedFaculty = facultyId
      this.currentSlide = 0 // Reiniciar el carrusel al inicio
      this.stopAutoplay()
      this.startAutoplay()
    },
  },
})
</script>

<!-- ========================================= -->
<!-- BLOQUE 8: ESTILOS CSS/SCSS -->
<!-- ========================================= -->
<style lang="scss" scoped>
/* ESTILOS GENERALES DE LA PÁGINA */
.home-page {
  padding-top: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Ocultar barra de scroll completamente */
:global(html) {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

:global(html::-webkit-scrollbar) {
  display: none; /* Safari and Chrome */
}

:global(body) {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

:global(body::-webkit-scrollbar) {
  display: none; /* Safari and Chrome */
}

:global(*) {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

:global(*::-webkit-scrollbar) {
  display: none; /* Safari and Chrome */
}

/* Asegurar que no haya espacios en blanco */
:global(html, body) {
  margin: 0;
  padding: 0;
  height: 100%;
  background: #000000;
}

/* ========================================= */
/* ESTILOS DEL HEADER/NAVEGACIÓN */
/* ========================================= */
.header-custom {
  background: #000000;
  color: white;
  width: 100vw;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow-x: hidden; /* Eliminar scroll horizontal */
}

.nav-container {
  max-width: 100%;
  margin: 0;
  padding: 5px 3px; /* Reducir padding vertical para header más corto */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden; /* Eliminar scroll horizontal */
  min-height: 60px; /* Reducir altura mínima del header */
}

.logo-section {
  display: flex;
  align-items: center; /* Centrado vertical dentro de la sección */
  gap: 0.5rem;
  order: 1;
  margin-right: auto;
  padding-left: 0;
  flex-shrink: 0; /* Evitar que se comprima */
  height: 100%; /* Ocupar toda la altura del contenedor */
}

.logo-placeholder {
  width: 120px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-img {
  height: 40px;
  width: auto;
}

.nav-title {
  font-size: 1.6rem; /* Aumentar tamaño de fuente */
  font-weight: bold;
  line-height: 1.1;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.title-line-1 {
  color: #cc3333; /* Rojo medio oscuro */
  margin-bottom: 2px;
}

.title-line-2 {
  color: #ff6666; /* Rojo más claro */
}

.nav-menu {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  order: 2;
  margin-left: auto;
  padding-right: 0;
  flex-shrink: 0; /* Evitar que se comprima */
}

.login-btn {
  background: #e53e3e !important;
  color: white !important;
  border-radius: 25px;
}

/* Efectos hover para los botones del menú */
.nav-menu .q-btn {
  color: white;
  transition: all 0.3s ease;
}

.nav-menu .q-btn:hover {
  color: white !important;
  background: rgba(229, 62, 62, 0.1) !important;
  border: 2px solid #ff3333 !important;
  border-radius: 6px;
}

.login-btn:hover {
  background: #c53030 !important;
  transform: translateY(-2px);
}

/* Estilos para el dropdown de publicaciones */
.dropdown-container {
  position: relative;
  display: inline-block;
}

.dropdown-container .q-btn-dropdown {
  transition: all 0.3s ease;
}

.dropdown-container:hover .q-btn-dropdown {
  background: rgba(229, 62, 62, 0.1) !important;
  color: #e53e3e !important;
}

/* ========================================= */
/* ESTILOS DE LA SECCIÓN HERO */
/* ========================================= */
.hero {
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 2s ease-in-out; /* Transición más larga para múltiples imágenes */
  animation: fadeInScale 2s ease-in-out; /* Animación de entrada con escala */
}

/* Animación mejorada de fade in con escala para múltiples imágenes */
@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(1.1);
    filter: blur(2px);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
    filter: blur(1px);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
}

/* Indicadores de imagen activa */
.hero-indicators {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 3;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: #e53e3e;
  transform: scale(1.2);
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.8);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 2rem;
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.hero-cards {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 3rem;
}

.hero-card {
  background: linear-gradient(135deg, #e53e3e, #ff6b6b);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(229, 62, 62, 0.3);
  }

  h3 {
    margin-top: 1rem;
    font-size: 1.1rem;
    color: white;
  }
}

.hero-card-icon {
  color: white;
}

/* ========================================= */
/* ESTILOS GENERALES DE SECCIONES */
/* ========================================= */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ========================================= */
/* ESTILOS DE LA SECCIÓN "¿QUÉ HACE?" */
/* ========================================= */
.about-section {
  padding: 5rem 0;
  background: #fbfbfb;
}

.about-section .row {
  display: flex;
  align-items: center;
  min-height: 500px;
}

.text-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 2rem;
}

.image-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-title {
  color: #e53e3e;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

.about-text {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1rem;
  color: #333;
  text-align: justify;
}
.queHace-content {
  background: linear-gradient(135deg, #9b9898, #ebe7e7);
  color: white;
  height: 100%;
  display: flex;
  align-items: center;
}

.about-image-container {
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.about-image-container:hover {
  transform: scale(1.02);
}

.about-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* ========================================= */
/* ESTILOS DE LA SECCIÓN MISIÓN */
/* ========================================= */
.mission-section {
  padding: 5rem 0;
  background: rgba(255, 169, 169, 0.723);
}

.mission-section .row {
  display: flex;
  align-items: center;
  min-height: 450px;
}

.mission-image-container {
  width: 100%;
  height: 350px;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.mission-image-container:hover {
  transform: scale(1.02);
}

.mission-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.mission-content {
  background: linear-gradient(135deg, #e53e3e, #ff6b6b);
  color: white;
  height: 100%;
  display: flex;
  align-items: center;
}

.mission-title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

.mission-text {
  font-size: 1.1rem;
  line-height: 1.8;
}

/* ========================================= */
/* ESTILOS DE LAS LÍNEAS DE INVESTIGACIÓN */
/* ========================================= */
.research-section {
  padding: 5rem 0;
  background: #f8f9fa;
}

.research-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
  font-weight: bold;
}

/* Estilos de la barra de navegación de facultades */
.faculty-navigation {
  margin-bottom: 3rem;
  display: flex;
  justify-content: center;
}

.faculty-tabs {
  display: flex;
  gap: 1rem;
  background: #000000;
  padding: 8px;
  border-radius: 50px;
  flex-wrap: wrap;
  justify-content: center;
}

.faculty-tab {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  background: transparent;
  color: #ffffff;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  min-width: fit-content;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    transform: translateY(-2px);
  }

  &.active {
    background: #e53e3e;
    color: white;
    transform: translateY(-2px);
  }
}

/* Responsive para tablets */
@media (max-width: 768px) {
  .faculty-tabs {
    padding: 6px;
    gap: 0.5rem;
  }

  .faculty-tab {
    padding: 10px 16px;
    font-size: 0.8rem;
  }
}

/* Responsive para móviles */
@media (max-width: 480px) {
  .faculty-tabs {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    gap: 0.5rem;
  }

  .faculty-tab {
    width: 100%;
    text-align: center;
    padding: 12px 16px;
  }
}

/* Estilos del carrusel de investigación */
.research-carousel-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 60px; /* Espacio para los botones */
}

.research-carousel {
  overflow: hidden;
  width: 100%;
  position: relative;
}

.research-track {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.research-slide {
  min-width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem; /* Aumentado de 2rem a 3rem para mayor separación */
  padding: 1rem;
}

.research-slide:has(.research-card.full-width) {
  grid-template-columns: 1fr;
  place-items: center;
}

.research-card {
  background: #c1c0c0 !important;
  box-shadow: none !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  transform-origin: center;
  border-radius: 8px;
  height: 150px; /* Altura fija para todas las tarjetas */
  display: flex;
  flex-direction: column;
  min-height: 150px; /* Altura mínima garantizada */

  &:hover {
    background: #f7c0c0 !important;
    transform: scale(0.85) translateY(-5px);
    box-shadow: 0 12px 35px rgba(229, 62, 62, 0.35) !important;
  }

  &.full-width {
    max-width: 400px;
    width: 100%;
    height: 150px; /* Misma altura para la tarjeta destacada */
  }

  .q-card-section {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    text-align: center;
  }

  h3 {
    font-size: 1rem;
    margin-top: 1rem;
    color: #333;
    font-weight: 600;
    transition: all 0.3s ease;
    line-height: 1.4;
    text-align: center;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* Limitar a 3 líneas máximo */
    line-clamp: 3; /* Propiedad estándar para compatibilidad */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover h3 {
    color: #e53e3e;
    transform: scale(1.08);
  }
}

.research-icon {
  color: #e53e3e;
  transition: all 0.3s ease;
}

.research-card:hover .research-icon {
  transform: scale(1.2) rotate(8deg);
  color: #c53030;
}

/* Botones de navegación del carrusel */
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(229, 62, 62, 0.9);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  color: white;

  &:hover {
    background: rgba(229, 62, 62, 1);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 4px 15px rgba(229, 62, 62, 0.4);
  }

  &:disabled {
    background: rgba(150, 150, 150, 0.5);
    cursor: not-allowed;
    transform: translateY(-50%);
  }
}

.carousel-btn-prev {
  left: 10px;
}

.carousel-btn-next {
  right: 10px;
}

/* Indicadores del carrusel */
.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 2rem;
}

.indicator-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(150, 150, 150, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;

  &.active {
    background: #e53e3e;
    transform: scale(1.2);
  }

  &:hover {
    background: rgba(229, 62, 62, 0.7);
  }
}

/* Responsive para el carrusel */
@media (max-width: 768px) {
  .research-slide {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem; /* Aumentado de 1rem a 1.5rem para mayor separación */
  }

  .research-carousel-container {
    padding: 0 50px;
  }

  .carousel-btn {
    width: 40px;
    height: 40px;
  }

  .research-card {
    height: 180px; /* Altura ligeramente menor en tablets */
    min-height: 180px;
  }

  .research-card h3 {
    font-size: 0.9rem; /* Texto ligeramente más pequeño */
  }
}

@media (max-width: 480px) {
  .research-slide {
    grid-template-columns: 1fr;
  }

  .research-carousel-container {
    padding: 0 45px;
  }

  .research-card {
    height: 160px; /* Altura más compacta en móviles */
    min-height: 160px;
  }

  .research-card h3 {
    font-size: 0.85rem; /* Texto más pequeño para móviles */
    -webkit-line-clamp: 4; /* Permitir 4 líneas en móviles */
    line-clamp: 4;
  }
}

/* ========================================= */
/* ESTILOS DEL FOOTER MEJORADO */
/* ========================================= */
.footer {
  background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
  color: white;
  padding: 40px 0 15px;
  margin-top: auto;
  width: 100%;
  min-height: 200px;
}

/* ========================================= */
/* ESTILOS DEL CHAT FLOTANTE */
/* ========================================= */
.chat-floating {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: 1.8fr 1fr 1fr;
  gap: 30px;
  margin-bottom: 25px;
}

/* Sección del logo e información institucional */
.logo-info-section {
  padding-right: 20px;
}

.footer-logo-section {
  margin-bottom: 20px;
}

.footer-logo {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 20px;
}

.footer-logo-icon {
  background: rgba(229, 62, 62, 0.2);
  border-radius: 50%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 48px;
}

.footer-logo-text .university-name {
  font-size: 28px;
  font-weight: bold;
  color: #e53e3e;
  margin-bottom: 5px;
}

.footer-logo-text .department-name {
  font-size: 14px;
  opacity: 0.9;
  line-height: 1.4;
  color: #ffffff;
}

/* Sección de redes sociales integrada */
.social-section-integrated {
  margin: 15px 0;
  padding: 15px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.social-section-integrated .footer-subtitle {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #e53e3e;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.social-section-integrated .social-description {
  font-size: 13px;
  opacity: 0.8;
  margin-bottom: 15px;
  line-height: 1.5;
  color: #ffffff;
}

.social-section-integrated .social-links {
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  flex-wrap: wrap;
}

.social-section-integrated .social-link {
  width: 40px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.social-section-integrated .social-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #e53e3e, #ff6b6b);
  transition: all 0.4s ease;
  z-index: 0;
}

.social-section-integrated .social-link:hover::before {
  left: 0;
}

.social-section-integrated .social-link:hover {
  border-color: #e53e3e;
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 15px rgba(229, 62, 62, 0.3);
}

.social-section-integrated .social-link i {
  font-size: 16px;
  position: relative;
  z-index: 1;
}

.footer-subtitle {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #e53e3e;
  text-transform: uppercase;
}

/* Secciones de enlaces */
.links-section,
.info-section {
  padding-top: 10px;
}

.footer-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #e53e3e;
  text-transform: uppercase;
  position: relative;
}

.footer-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 2px;
  background: #e53e3e;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links li a {
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
  position: relative;
  padding-left: 0;
}

.footer-links li a:hover {
  color: #e53e3e;
  padding-left: 10px;
}

.footer-links li a::before {
  content: '→';
  position: absolute;
  left: -15px;
  opacity: 0;
  transition: all 0.3s ease;
}

.footer-links li a:hover::before {
  opacity: 1;
  left: -10px;
}

/* Sección del icono decorativo */
.footer-icon-section {
  text-align: center;
  margin-top: 30px;
  opacity: 0.3;
}

/* Sección de redes sociales */
.social-section {
  text-align: center;
  padding-top: 10px;
}

.social-description {
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 25px;
  line-height: 1.5;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.social-link {
  width: 45px;
  height: 45px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.social-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #e53e3e, #ff6b6b);
  transition: all 0.4s ease;
  z-index: 0;
}

.social-link:hover::before {
  left: 0;
}

.social-link:hover {
  border-color: #e53e3e;
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 8px 20px rgba(229, 62, 62, 0.3);
}

.social-link i {
  font-size: 18px;
  position: relative;
  z-index: 1;
}

/* Footer bottom */
.footer-bottom {
  margin-top: 15px;
}

.footer-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  margin-bottom: 20px;
}

.footer-copyright {
  text-align: center;
  padding: 10px 0;
}

.footer-copyright p {
  font-size: 12px;
  opacity: 0.7;
  margin: 0;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .social-links {
    justify-content: center;
  }

  .footer-section {
    text-align: center;
  }

  .logo {
    justify-content: center;
  }

  .contact-info {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 30px 0 15px;
  }

  .footer-container {
    padding: 0 15px;
  }

  .footer-content {
    gap: 25px;
  }

  .logo-text {
    font-size: 20px;
  }
}

.contact-section {
  padding: 2rem 0; // Reducir el espacio superior e inferior
}

.contact-title {
  margin-bottom: 1rem; // Reducir el margen inferior del título
}

.social-links {
  margin-top: 1rem; // Reducir el margen superior de los enlaces sociales
}

/* ========================================= */
/* MEDIA QUERIES PARA RESPONSIVIDAD */
/* ========================================= */

/* Tablets */
@media (max-width: 1023px) {
  .text-content {
    padding-right: 0;
    padding-bottom: 2rem;
  }

  .about-section .row,
  .mission-section .row {
    min-height: auto;
    flex-direction: column;
  }

  .about-image-container,
  .mission-image-container {
    height: 300px;
    margin-top: 1rem;
  }

  /* Footer responsive para tablets */
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .logo-info-section {
    grid-column: 1 / -1;
    text-align: center;
    padding-right: 0;
  }

  .social-section-integrated .social-links {
    justify-content: center;
  }
}

/* Dispositivos móviles */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-cards {
    flex-direction: column;
    align-items: center;
  }

  .research-grid {
    grid-template-columns: 1fr;
  }

  .about-image-container,
  .mission-image-container {
    height: 300px;
  }

  .section-title {
    font-size: 2rem;
    text-align: center;
  }

  .about-text {
    text-align: left;
  }

  /* Footer responsivo para móviles */
  .footer-content {
    grid-template-columns: 1fr;
    gap: 25px;
    text-align: center;
  }

  .footer-logo {
    justify-content: center;
  }

  .footer-links li a::before {
    display: none;
  }

  .footer-links li a:hover {
    padding-left: 0;
  }

  .social-section-integrated .social-links {
    justify-content: center;
  }

  .social-links {
    justify-content: center;
  }
}

/* Dispositivos muy pequeños */
@media (max-width: 480px) {
  .about-image-container,
  .mission-image-container {
    height: 250px;
  }

  .container {
    padding: 0 1rem;
  }

  .contact-title,
  .map-title {
    font-size: 1.5rem;
  }

  /* Footer para dispositivos muy pequeños */
  .footer {
    padding: 25px 0 10px;
  }

  .footer-container {
    padding: 0 15px;
  }

  .footer-content {
    gap: 20px;
  }

  .footer-logo-text .university-name {
    font-size: 24px;
  }

  .footer-logo-text .department-name {
    font-size: 12px;
  }

  .social-link {
    width: 40px;
    height: 40px;
  }

  .social-section-integrated .social-link {
    width: 35px;
    height: 35px;
  }

  .social-section-integrated .social-link i {
    font-size: 14px;
  }
}
</style>
