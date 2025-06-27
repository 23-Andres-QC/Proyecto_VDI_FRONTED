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
        <div class="research-grid">
          <!-- PRIMERA FILA DE LÍNEAS DE INVESTIGACIÓN -->
          <q-card class="research-card">
            <q-card-section class="text-center">
              <q-icon name="groups" size="48px" class="research-icon" />
              <h3>ADMINISTRACIÓN</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card">
            <q-card-section class="text-center">
              <q-icon name="gavel" size="48px" class="research-icon" />
              <h3>DERECHO</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card">
            <q-card-section class="text-center">
              <q-icon name="account_balance" size="48px" class="research-icon" />
              <h3>CONTABILIDAD, COSTOS Y/O TRIBUTACIÓN</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card">
            <q-card-section class="text-center">
              <q-icon name="hotel" size="48px" class="research-icon" />
              <h3>TURISMO, HOTELERÍA Y GASTRONOMÍA</h3>
            </q-card-section>
          </q-card>

          <!-- SEGUNDA FILA DE LÍNEAS DE INVESTIGACIÓN -->
          <q-card class="research-card">
            <q-card-section class="text-center">
              <q-icon name="precision_manufacturing" size="48px" class="research-icon" />
              <h3>DISEÑO INDUSTRIAL, AUTOMATIZACIÓN Y/O ROBÓTICA</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card">
            <q-card-section class="text-center">
              <q-icon name="trending_up" size="48px" class="research-icon" />
              <h3>ECONOMÍA Y FINANZAS</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card">
            <q-card-section class="text-center">
              <q-icon name="school" size="48px" class="research-icon" />
              <h3>EDUCACIÓN Y GESTIÓN DEL CONOCIMIENTO</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card">
            <q-card-section class="text-center">
              <q-icon name="lightbulb" size="48px" class="research-icon" />
              <h3>EMPRENDIMIENTO E INNOVACIÓN</h3>
            </q-card-section>
          </q-card>

          <!-- TERCERA FILA DE LÍNEAS DE INVESTIGACIÓN -->
          <q-card class="research-card">
            <q-card-section class="text-center">
              <q-icon name="handshake" size="48px" class="research-icon" />
              <h3>ÉTICA, COMPLIANCE Y GOBERNANZA</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card">
            <q-card-section class="text-center">
              <q-icon name="account_balance_wallet" size="48px" class="research-icon" />
              <h3>GESTIÓN PÚBLICA Y POLÍTICAS PÚBLICAS</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card">
            <q-card-section class="text-center">
              <q-icon name="public" size="48px" class="research-icon" />
              <h3>GLOBALIZACIÓN Y NEGOCIOS INTERNACIONALES</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card">
            <q-card-section class="text-center">
              <q-icon name="factory" size="48px" class="research-icon" />
              <h3>INDUSTRIAS EXTRACTIVAS AGROINDUSTRIA, PESCA Y ENERGÍA</h3>
            </q-card-section>
          </q-card>

          <!-- CUARTA FILA DE LÍNEAS DE INVESTIGACIÓN -->
          <q-card class="research-card">
            <q-card-section class="text-center">
              <q-icon name="psychology" size="48px" class="research-icon" />
              <h3>LIDERAZGO, COMPORTAMIENTO ORGANIZACIONAL DEL GRUPO</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card">
            <q-card-section class="text-center">
              <q-icon name="campaign" size="48px" class="research-icon" />
              <h3>MARKETING</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card">
            <q-card-section class="text-center">
              <q-icon name="eco" size="48px" class="research-icon" />
              <h3>MEDIO AMBIENTE</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card">
            <q-card-section class="text-center">
              <q-icon name="settings" size="48px" class="research-icon" />
              <h3>PRODUCCIÓN, PROCESOS Y/O GESTIÓN DE LA CALIDAD</h3>
            </q-card-section>
          </q-card>

          <!-- QUINTA FILA DE LÍNEAS DE INVESTIGACIÓN -->
          <q-card class="research-card">
            <q-card-section class="text-center">
              <q-icon name="psychology_alt" size="48px" class="research-icon" />
              <h3>PSICOLOGÍA</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card">
            <q-card-section class="text-center">
              <q-icon name="health_and_safety" size="48px" class="research-icon" />
              <h3>EDUCACIÓN, INDUSTRIAL, SALUD OCUPACIONAL Y/O SERVICIOS DE SALUD</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card">
            <q-card-section class="text-center">
              <q-icon name="computer" size="48px" class="research-icon" />
              <h3>SISTEMAS Y TECNOLOGÍAS DE INFORMACIÓN</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card">
            <q-card-section class="text-center">
              <q-icon name="local_shipping" size="48px" class="research-icon" />
              <h3>SUPPLY CHAIN Y GESTIÓN LOGÍSTICA INTEGRAL</h3>
            </q-card-section>
          </q-card>

          <!-- LÍNEA DE INVESTIGACIÓN DESTACADA (ancho completo) -->
          <q-card class="research-card full-width">
            <q-card-section class="text-center">
              <q-icon name="recycling" size="48px" class="research-icon" />
              <h3>
                DESARROLLO SOSTENIBLE, RESPONSABILIDAD SOCIAL EMPRESARIAL (RSE) Y/O CRECIMIENTO
                COMUNITARIO
              </h3>
            </q-card-section>
          </q-card>
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
  },
  beforeUnmount() {
    // Limpiar el timer del dropdown al desmontar el componente
    if (this.dropdownTimer) {
      clearTimeout(this.dropdownTimer)
      this.dropdownTimer = null
    }
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

.research-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  perspective: 1000px; /* Agregar perspectiva para efectos 3D sutiles */
}

.research-card {
  background: #c1c0c0 !important; /* Forzar el color solicitado */
  box-shadow: none !important; /* Asegurar que no haya sombras que alteren la percepción del color */
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); /* Transición suave con easing personalizado */
  cursor: pointer; /* Indicar que es interactivo */
  transform-origin: center; /* Punto de origen para la transformación */
  border-radius: 8px; /* Bordes redondeados */

  &:hover {
    background: #f7c0c0 !important;
    transform: scale(0.85) translateY(-5px); /* Contracción más pronunciada y elevar más */
    box-shadow: 0 12px 35px rgba(229, 62, 62, 0.35) !important; /* Sombra más intensa */
  }

  &.full-width {
    grid-column: 1 / -1;
    max-width: 400px;
    margin: 0 auto;
    justify-self: center; /* Centrar la tarjeta en el grid */
  }

  h3 {
    font-size: 1rem;
    margin-top: 1rem;
    color: #333;
    font-weight: 600;
    transition: all 0.3s ease; /* Transición suave para el color del texto */
  }

  &:hover h3 {
    color: #e53e3e; /* Cambiar color del texto en hover */
    transform: scale(1.08); /* Aumentar más el tamaño del texto */
  }
}

.research-icon {
  color: #e53e3e;
  transition: all 0.3s ease; /* Transición suave para el ícono */
}

.research-card:hover .research-icon {
  transform: scale(1.2) rotate(8deg); /* Aumentar más el tamaño y rotar más */
  color: #c53030; /* Color más oscuro en hover */
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
