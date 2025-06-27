<template>
  <q-page class="home-page">
    <!-- ========================================= -->
    <!-- BLOQUE 1: HEADER/NAVEGACIÓN SUPERIOR -->
    <!-- ========================================= -->
    <!-- Barra de navegación fija en la parte superior con logo y menú principal -->
    <q-header elevated class="header-custom">
      <q-toolbar class="nav-container">
        <!-- Sección del logo y título institucional (movido a la izquierda) -->
        <div class="logo-section animate-slide-in-left">
          <div class="logo-placeholder">
            <img
              :src="LogoNegroImg"
              alt="Universidad Esan"
              class="logo-img animate-bounce-subtle"
            />
          </div>
          <div class="nav-title">
            <div class="title-line-1 animate-text-glow">VICERRECTORADO</div>
            <div class="title-line-2 animate-text-glow">DE INVESTIGACIÓN</div>
          </div>
        </div>

        <!-- Menú de navegación principal (movido a la derecha) -->
        <div class="nav-menu animate-slide-in-right">
          <q-btn flat label="UE Esan" @click="openUeEsan" class="nav-btn-enhanced" />
          <q-btn
            flat
            label="Portal Académico"
            @click="openPortalAcademico"
            class="nav-btn-enhanced"
          />
          <q-btn flat label="Nosotros" @click="scrollTo('nosotros')" class="nav-btn-enhanced" />
          <q-btn flat label="Recursos" @click="openRecursos" class="nav-btn-enhanced" />
          <div class="dropdown-container" @mouseenter="showDropdown" @mouseleave="hideDropdown">
            <q-btn-dropdown
              flat
              label="Publicaciones"
              v-model="dropdownVisible"
              auto-close
              class="nav-btn-enhanced"
            >
              <q-list class="dropdown-list-enhanced">
                <q-item clickable class="dropdown-item-enhanced">
                  <q-item-section>Publicaciones 2020</q-item-section>
                </q-item>
                <q-item clickable class="dropdown-item-enhanced">
                  <q-item-section>Publicaciones 2021</q-item-section>
                </q-item>
                <q-item clickable class="dropdown-item-enhanced">
                  <q-item-section>Publicaciones 2022</q-item-section>
                </q-item>
                <q-item clickable class="dropdown-item-enhanced">
                  <q-item-section>Publicaciones 2023</q-item-section>
                </q-item>
                <q-item clickable class="dropdown-item-enhanced">
                  <q-item-section>Publicaciones 2024</q-item-section>
                </q-item>
                <q-item clickable class="dropdown-item-enhanced">
                  <q-item-section>Publicaciones 2025</q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
          <q-btn class="login-btn login-btn-enhanced" label="Inicio sesión" @click="goToLogin" />
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
      <div class="hero-content animate-fade-in-up">
        <h1 class="hero-title animate-type-writer">Vicerrectorrado de Investigación</h1>
        <p class="hero-subtitle animate-fade-in-delay">
          Fomentamos una cultura de investigación e innovación en la comunidad universitaria
        </p>

        <!-- Tarjetas de acceso rápido a secciones principales -->
        <div class="hero-cards animate-cards-entrance">
          <q-card class="hero-card card-float-effect" @click="scrollTo('nosotros')">
            <q-card-section class="text-center">
              <q-icon name="assessment" size="48px" class="hero-card-icon animate-pulse" />
              <h3>Dirección de Investigación</h3>
            </q-card-section>
          </q-card>
          <q-card class="hero-card card-float-effect" @click="openEsanEdiciones">
            <q-card-section class="text-center">
              <q-icon name="menu_book" size="48px" class="hero-card-icon animate-pulse" />
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
    <section class="about-section animate-section-reveal" id="nosotros">
      <div class="container">
        <div class="row q-gutter-xl items-center no-wrap">
          <!-- Columna de contenido textual -->
          <div class="col-md-6 col-12 text-content animate-slide-in-left">
            <q-card class="queHace-content card-enhanced">
              <q-card-section class="content-section-enhanced">
                <div class="title-container">
                  <h2 class="section-title title-enhanced animate-title-reveal">¿QUÉ HACE?</h2>
                  <div class="title-decoration"></div>
                </div>

                <div class="text-content-wrapper">
                  <div class="text-block animate-text-slide-up" style="animation-delay: 0.2s">
                    <div class="text-number">01</div>
                    <p class="about-text text-enhanced highlight-text">
                      <span class="text-highlight">Promover, coordinar y supervisar</span> las
                      actividades de
                      <span class="keyword-highlight">investigación científica</span>,
                      <span class="keyword-highlight">tecnológica e innovación</span> dentro de la
                      universidad, estableciendo estándares de excelencia académica.
                    </p>
                  </div>

                  <div class="text-block animate-text-slide-up" style="animation-delay: 0.4s">
                    <div class="text-number">02</div>
                    <p class="about-text text-enhanced highlight-text">
                      <span class="text-highlight">Facilitar el desarrollo</span> de proyectos de
                      investigación de <span class="keyword-highlight">alto impacto</span>,
                      brindando apoyo integral a los
                      <span class="keyword-highlight">docentes investigadores</span> y gestionando
                      fondos y convenios estratégicos con entidades
                      <span class="emphasis-text">nacionales e internacionales</span>.
                    </p>
                  </div>

                  <div class="text-block animate-text-slide-up" style="animation-delay: 0.6s">
                    <div class="text-number">03</div>
                    <p class="about-text text-enhanced highlight-text">
                      <span class="text-highlight">Impulsar la formación académica</span> de
                      <span class="keyword-highlight">excelencia</span> a través de programas de
                      <span class="keyword-highlight">posgrado especializados</span> y la promoción
                      de <span class="emphasis-text">publicaciones científicas</span> de
                      reconocimiento internacional.
                    </p>
                  </div>
                </div>

                <div class="stats-container animate-fade-in" style="animation-delay: 0.8s">
                  <div class="stat-item">
                    <div class="stat-icon">
                      <q-icon name="trending_up" size="24px" />
                    </div>
                    <div class="stat-text">Investigación de Alto Impacto</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-icon">
                      <q-icon name="groups" size="24px" />
                    </div>
                    <div class="stat-text">Colaboración Internacional</div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <!-- Columna de imagen ilustrativa -->
          <div class="col-md-6 col-12 image-content animate-slide-in-right">
            <div class="about-image-container image-enhanced">
              <img
                :src="Vicerrectorado1Img"
                alt="Director del Vicerrectorado"
                class="about-img image-hover-effect"
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
    <section class="mission-section animate-section-reveal">
      <div class="container">
        <div class="row q-gutter-xl items-center no-wrap">
          <!-- Columna de imagen (orden invertido respecto a la sección anterior) -->
          <div class="col-md-6 col-12 animate-slide-in-left">
            <div class="mission-image-container image-enhanced">
              <img
                :src="MisionImg"
                alt="Imagen de Innovación"
                class="mission-img image-hover-effect"
              />
            </div>
          </div>

          <!-- Columna de contenido de misión en tarjeta estilizada -->
          <div class="col-md-6 col-12 animate-slide-in-right">
            <q-card class="mission-content card-enhanced">
              <q-card-section class="mission-section-enhanced">
                <div class="mission-header">
                  <div class="mission-icon-container">
                    <q-icon name="rocket_launch" size="48px" class="mission-icon-large" />
                  </div>
                  <h2 class="mission-title title-enhanced animate-title-reveal">Misión</h2>
                  <div class="mission-subtitle">
                    Transformando el Futuro a Través de la Investigación
                  </div>
                </div>

                <div class="mission-content-wrapper">
                  <div
                    class="mission-text-block animate-text-slide-up"
                    style="animation-delay: 0.3s"
                  >
                    <div class="mission-quote-mark">"</div>
                    <p class="mission-text text-enhanced mission-highlight">
                      <span class="mission-emphasis"
                        >Fomentar una cultura de investigación e innovación</span
                      >
                      en la <span class="keyword-highlight">comunidad universitaria</span>,
                      contribuyendo al
                      <span class="impact-text">desarrollo científico, tecnológico y social</span>
                      del país mediante la
                      <span class="excellence-text">generación de conocimiento de calidad</span> y
                      con <span class="impact-highlight">impacto positivo transformador</span> en la
                      sociedad.
                    </p>
                    <div class="mission-quote-mark closing">"</div>
                  </div>

                  <div class="mission-pillars animate-fade-in" style="animation-delay: 0.6s">
                    <div class="pillar-item">
                      <div class="pillar-icon">
                        <q-icon name="science" size="20px" />
                      </div>
                      <span>Excelencia Científica</span>
                    </div>
                    <div class="pillar-item">
                      <div class="pillar-icon">
                        <q-icon name="innovation" size="20px" />
                      </div>
                      <span>Innovación Tecnológica</span>
                    </div>
                    <div class="pillar-item">
                      <div class="pillar-icon">
                        <q-icon name="public" size="20px" />
                      </div>
                      <span>Impacto Social</span>
                    </div>
                  </div>

                  <div class="mission-cta animate-slide-up" style="animation-delay: 0.9s">
                    <div class="cta-text">Construyendo el futuro del conocimiento</div>
                    <div class="cta-underline"></div>
                  </div>
                </div>
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
    <section class="research-section animate-section-reveal" id="investigacion">
      <div class="container">
        <h2 class="research-title title-enhanced animate-fade-in">Líneas de Investigación</h2>
        <div class="research-grid animate-stagger-cards">
          <!-- PRIMERA FILA DE LÍNEAS DE INVESTIGACIÓN -->
          <q-card class="research-card research-card-enhanced">
            <q-card-section class="text-center">
              <q-icon name="groups" size="48px" class="research-icon icon-enhanced" />
              <h3>ADMINISTRACIÓN</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card research-card-enhanced">
            <q-card-section class="text-center">
              <q-icon name="gavel" size="48px" class="research-icon icon-enhanced" />
              <h3>DERECHO</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card research-card-enhanced">
            <q-card-section class="text-center">
              <q-icon name="account_balance" size="48px" class="research-icon icon-enhanced" />
              <h3>CONTABILIDAD, COSTOS Y/O TRIBUTACIÓN</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card research-card-enhanced">
            <q-card-section class="text-center">
              <q-icon name="hotel" size="48px" class="research-icon icon-enhanced" />
              <h3>TURISMO, HOTELERÍA Y GASTRONOMÍA</h3>
            </q-card-section>
          </q-card>

          <!-- SEGUNDA FILA DE LÍNEAS DE INVESTIGACIÓN -->
          <q-card class="research-card research-card-enhanced">
            <q-card-section class="text-center">
              <q-icon
                name="precision_manufacturing"
                size="48px"
                class="research-icon icon-enhanced"
              />
              <h3>DISEÑO INDUSTRIAL, AUTOMATIZACIÓN Y/O ROBÓTICA</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card research-card-enhanced">
            <q-card-section class="text-center">
              <q-icon name="trending_up" size="48px" class="research-icon icon-enhanced" />
              <h3>ECONOMÍA Y FINANZAS</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card research-card-enhanced">
            <q-card-section class="text-center">
              <q-icon name="school" size="48px" class="research-icon icon-enhanced" />
              <h3>EDUCACIÓN Y GESTIÓN DEL CONOCIMIENTO</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card research-card-enhanced">
            <q-card-section class="text-center">
              <q-icon name="lightbulb" size="48px" class="research-icon icon-enhanced" />
              <h3>EMPRENDIMIENTO E INNOVACIÓN</h3>
            </q-card-section>
          </q-card>

          <!-- TERCERA FILA DE LÍNEAS DE INVESTIGACIÓN -->
          <q-card class="research-card research-card-enhanced">
            <q-card-section class="text-center">
              <q-icon name="handshake" size="48px" class="research-icon icon-enhanced" />
              <h3>ÉTICA, COMPLIANCE Y GOBERNANZA</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card research-card-enhanced">
            <q-card-section class="text-center">
              <q-icon
                name="account_balance_wallet"
                size="48px"
                class="research-icon icon-enhanced"
              />
              <h3>GESTIÓN PÚBLICA Y POLÍTICAS PÚBLICAS</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card research-card-enhanced">
            <q-card-section class="text-center">
              <q-icon name="public" size="48px" class="research-icon icon-enhanced" />
              <h3>GLOBALIZACIÓN Y NEGOCIOS INTERNACIONALES</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card research-card-enhanced">
            <q-card-section class="text-center">
              <q-icon name="factory" size="48px" class="research-icon icon-enhanced" />
              <h3>INDUSTRIAS EXTRACTIVAS AGROINDUSTRIA, PESCA Y ENERGÍA</h3>
            </q-card-section>
          </q-card>

          <!-- CUARTA FILA DE LÍNEAS DE INVESTIGACIÓN -->
          <q-card class="research-card research-card-enhanced">
            <q-card-section class="text-center">
              <q-icon name="psychology" size="48px" class="research-icon icon-enhanced" />
              <h3>LIDERAZGO, COMPORTAMIENTO ORGANIZACIONAL DEL GRUPO</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card research-card-enhanced">
            <q-card-section class="text-center">
              <q-icon name="campaign" size="48px" class="research-icon icon-enhanced" />
              <h3>MARKETING</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card research-card-enhanced">
            <q-card-section class="text-center">
              <q-icon name="eco" size="48px" class="research-icon icon-enhanced" />
              <h3>MEDIO AMBIENTE</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card research-card-enhanced">
            <q-card-section class="text-center">
              <q-icon name="settings" size="48px" class="research-icon icon-enhanced" />
              <h3>PRODUCCIÓN, PROCESOS Y/O GESTIÓN DE LA CALIDAD</h3>
            </q-card-section>
          </q-card>

          <!-- QUINTA FILA DE LÍNEAS DE INVESTIGACIÓN -->
          <q-card class="research-card research-card-enhanced">
            <q-card-section class="text-center">
              <q-icon name="psychology_alt" size="48px" class="research-icon icon-enhanced" />
              <h3>PSICOLOGÍA</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card research-card-enhanced">
            <q-card-section class="text-center">
              <q-icon name="health_and_safety" size="48px" class="research-icon icon-enhanced" />
              <h3>EDUCACIÓN, INDUSTRIAL, SALUD OCUPACIONAL Y/O SERVICIOS DE SALUD</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card research-card-enhanced">
            <q-card-section class="text-center">
              <q-icon name="computer" size="48px" class="research-icon icon-enhanced" />
              <h3>SISTEMAS Y TECNOLOGÍAS DE INFORMACIÓN</h3>
            </q-card-section>
          </q-card>

          <q-card class="research-card research-card-enhanced">
            <q-card-section class="text-center">
              <q-icon name="local_shipping" size="48px" class="research-icon icon-enhanced" />
              <h3>SUPPLY CHAIN Y GESTIÓN LOGÍSTICA INTEGRAL</h3>
            </q-card-section>
          </q-card>

          <!-- LÍNEA DE INVESTIGACIÓN DESTACADA (ancho completo) -->
          <q-card class="research-card research-card-enhanced full-width">
            <q-card-section class="text-center">
              <q-icon name="recycling" size="48px" class="research-icon icon-enhanced" />
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
import LogoNegroImg from '../assets/Home_imagenes/LogoNegro.jpg'

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
      }, 5000) // Cambiar cada 4 segundos para dar más tiempo a ver cada imagen

      // Configurar el Intersection Observer para animaciones de scroll
      setupScrollAnimations()
    })

    onBeforeUnmount(() => {
      if (intervalId) clearInterval(intervalId)
    })

    // Función para configurar las animaciones al hacer scroll
    const setupScrollAnimations = () => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            // Para tarjetas de investigación, agregar delay escalonado
            if (entry.target.classList.contains('research-grid')) {
              const cards = entry.target.querySelectorAll('.research-card')
              cards.forEach((card, index) => {
                setTimeout(() => {
                  card.style.opacity = '1'
                  card.style.transform = 'translateY(0)'
                }, index * 100)
              })
            }
          }
        })
      }, observerOptions)

      // Observar secciones
      const sections = document.querySelectorAll('.animate-section-reveal')
      sections.forEach((section) => observer.observe(section))

      // Observar grid de investigación
      const researchGrid = document.querySelector('.research-grid')
      if (researchGrid) observer.observe(researchGrid)
    }

    return {
      goToLogin,
      currentHeroImage,
      heroImages, // Exponer heroImages para los indicadores
      // Exponer las imágenes importadas para el template
      Vicerrectorado1Img,
      MisionImg,
      LogoNegroImg,
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
<!-- BLOQUE 8: ESTILOS CSS/SCSS MEJORADOS -->
<!-- ========================================= -->
<style lang="scss" scoped>
/* IMPORTACIÓN DE GOOGLE FONTS PARA TIPOGRAFÍAS PROFESIONALES */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

/* VARIABLES CSS PARA COLORES PASTELES MODERNOS */
:root {
  /* Colores principales pasteles suaves */
  --primary-color: #e8a5a5;
  --primary-dark: #d49494;
  --primary-light: #f2c2c2;
  --secondary-color: #a8b8d8;
  --accent-color: #f8f9fa;

  /* Colores de texto suaves */
  --text-dark: #4a5568;
  --text-light: #6b7280;
  --text-medium: #374151;

  /* Colores base */
  --white: #ffffff;
  --off-white: #fefefe;
  --soft-gray: #f7f8fc;
  --light-gray: #e2e8f0;

  /* Gradientes pasteles modernos */
  --gradient-primary: linear-gradient(135deg, #e8a5a5 0%, #f2c2c2 100%);
  --gradient-secondary: linear-gradient(135deg, #a8b8d8 0%, #c8d5f0 100%);
  --gradient-accent: linear-gradient(135deg, #e0f2e0 0%, #f0f8f0 100%);
  --gradient-hero: linear-gradient(
    135deg,
    rgba(232, 165, 165, 0.1) 0%,
    rgba(168, 184, 216, 0.1) 100%
  );

  /* Sombras suaves */
  --shadow-soft: 0 2px 8px rgba(74, 85, 104, 0.06);
  --shadow-medium: 0 4px 16px rgba(74, 85, 104, 0.08);
  --shadow-heavy: 0 8px 32px rgba(74, 85, 104, 0.12);

  /* Border radius moderno */
  --border-radius: 16px;
  --border-radius-large: 24px;
  --border-radius-small: 8px;

  /* Transiciones suaves */
  --transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-medium: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  /* Colores pasteles adicionales */
  --pastel-mint: #e0f7e7;
  --pastel-blue: #e8f4f8;
  --pastel-lavender: #f0e8f8;
  --pastel-peach: #ffeee8;
  --pastel-yellow: #fff8e1;
}

/* ========================================= */
/* ANIMACIONES Y EFECTOS DE MOVIMIENTO */
/* ========================================= */

/* Animación de entrada desde la izquierda */
@keyframes slideInLeft {
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Animación de entrada desde la derecha */
@keyframes slideInRight {
  0% {
    opacity: 0;
    transform: translateX(50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Animación de aparición desde abajo */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animación de aparición gradual */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* Animación de máquina de escribir */
@keyframes typeWriter {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

/* Animación de pulso sutil */
@keyframes pulseSubtle {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Animación de rebote sutil */
@keyframes bounceSubtle {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-2px);
  }
}

/* Animación de brillo en texto */
@keyframes textGlow {
  0%,
  100% {
    text-shadow: 0 0 5px rgba(229, 62, 62, 0.3);
  }
  50% {
    text-shadow:
      0 0 20px rgba(229, 62, 62, 0.6),
      0 0 30px rgba(229, 62, 62, 0.4);
  }
}

/* Animación de flotación */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Nuevas animaciones para texto mejorado */
@keyframes textSlideUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes titleReveal {
  0% {
    opacity: 0;
    transform: translateX(-30px);
    letter-spacing: 10px;
  }
  100% {
    opacity: 1;
    transform: translateX(0);
    letter-spacing: -0.02em;
  }
}

@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes numberCounter {
  0% {
    opacity: 0;
    transform: scale(0.5) rotate(-180deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@keyframes highlightSweep {
  0% {
    background-size: 0 100%;
  }
  100% {
    background-size: 100% 100%;
  }
}

/* CLASES DE ANIMACIÓN */
.animate-slide-in-left {
  animation: slideInLeft 0.8s ease-out;
}

.animate-slide-in-right {
  animation: slideInRight 0.8s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 1.2s ease-out 0.3s both;
}

.animate-type-writer {
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid var(--primary-color);
  animation:
    typeWriter 2s steps(40) 0.5s both,
    blink 1s infinite;
}

@keyframes blink {
  0%,
  50% {
    border-color: transparent;
  }
  51%,
  100% {
    border-color: var(--primary-color);
  }
}

.animate-bounce-subtle {
  animation: bounceSubtle 2s infinite;
}

.animate-text-glow {
  animation: textGlow 3s ease-in-out infinite;
}

.animate-pulse {
  animation: pulseSubtle 2s ease-in-out infinite;
}

.animate-cards-entrance {
  animation: fadeInUp 1s ease-out 0.8s both;
}

.animate-stagger-cards {
  .research-card {
    opacity: 0;
    animation: fadeInUp 0.6s ease-out forwards;

    &:nth-child(1) {
      animation-delay: 0.1s;
    }
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.3s;
    }
    &:nth-child(4) {
      animation-delay: 0.4s;
    }
    &:nth-child(5) {
      animation-delay: 0.5s;
    }
    &:nth-child(6) {
      animation-delay: 0.6s;
    }
    &:nth-child(7) {
      animation-delay: 0.7s;
    }
    &:nth-child(8) {
      animation-delay: 0.8s;
    }
    &:nth-child(9) {
      animation-delay: 0.9s;
    }
    &:nth-child(10) {
      animation-delay: 1s;
    }
    &:nth-child(11) {
      animation-delay: 1.1s;
    }
    &:nth-child(12) {
      animation-delay: 1.2s;
    }
    &:nth-child(13) {
      animation-delay: 1.3s;
    }
    &:nth-child(14) {
      animation-delay: 1.4s;
    }
    &:nth-child(15) {
      animation-delay: 1.5s;
    }
    &:nth-child(16) {
      animation-delay: 1.6s;
    }
    &:nth-child(17) {
      animation-delay: 1.7s;
    }
    &:nth-child(18) {
      animation-delay: 1.8s;
    }
    &:nth-child(19) {
      animation-delay: 1.9s;
    }
    &:nth-child(20) {
      animation-delay: 2s;
    }
    &:nth-child(21) {
      animation-delay: 2.1s;
    }
  }
}

.animate-section-reveal {
  opacity: 0;
  transform: translateY(50px);
  animation: fadeInUp 1s ease-out forwards;

  &.in-view {
    animation-delay: 0.2s;
  }
}

.card-float-effect {
  animation: float 3s ease-in-out infinite;

  &:nth-child(2) {
    animation-delay: 1.5s;
  }
}

/* Nuevas clases de animación para texto mejorado */
.animate-text-slide-up {
  opacity: 0;
  animation: textSlideUp 0.8s ease-out forwards;
}

.animate-title-reveal {
  animation: titleReveal 1s ease-out forwards;
}

.animate-slide-up {
  opacity: 0;
  animation: slideUp 0.6s ease-out forwards;
}

/* ESTILOS GENERALES MEJORADOS */
.home-page {
  padding-top: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  line-height: 1.6;
  color: var(--text-dark);
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
  background: #ffffff;
}

/* ========================================= */
/* ESTILOS DEL HEADER/NAVEGACIÓN MODERNOS */
/* ========================================= */
.header-custom {
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  color: white;
  width: 100vw;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(232, 165, 165, 0.3);
  box-shadow: var(--shadow-soft);
}

.nav-container {
  max-width: 100%;
  margin: 0;
  padding: 8px 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  min-height: 70px;
  position: relative;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  order: 1;
  margin-right: auto;
  padding-left: 0;
  flex-shrink: 0;
  height: 100%;
  position: relative;
}

.logo-placeholder {
  width: 130px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: var(--transition-medium);
}

.logo-img {
  height: 45px;
  width: auto;
  filter: brightness(1.1) contrast(1.2);
  transition: var(--transition-medium);

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.3) contrast(1.3);
  }
}

.nav-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.1;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  letter-spacing: 0.5px;
}

.title-line-1 {
  color: #dc2626;
  margin-bottom: 2px;
  text-shadow: 0 2px 4px rgba(220, 38, 38, 0.6);
  font-weight: 800;
}

.title-line-2 {
  color: #dc2626;
  text-shadow: 0 2px 4px rgba(220, 38, 38, 0.6);
  font-weight: 600;
}

.nav-menu {
  display: flex;
  gap: 1rem;
  align-items: center;
  order: 2;
  margin-left: auto;
  padding-right: 0;
  flex-shrink: 0;
}

.nav-btn-enhanced {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
  color: white !important;
  transition: all var(--transition-medium);
  border-radius: var(--border-radius-small);
  padding: 10px 18px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: var(--gradient-primary);
    transition: var(--transition-medium);
    z-index: 0;
  }

  &:hover {
    color: white !important;
    transform: translateY(-1px);
    box-shadow: var(--shadow-medium);

    &::before {
      left: 0;
    }
  }

  .q-btn__content {
    position: relative;
    z-index: 1;
  }
}

.login-btn-enhanced {
  background: var(--gradient-primary) !important;
  color: white !important;
  border-radius: 30px !important;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 12px 28px !important;
  box-shadow: var(--shadow-soft);
  transition: all var(--transition-medium);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 100%);
    opacity: 0;
    transition: var(--transition-medium);
  }

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: var(--shadow-medium);

    &::before {
      opacity: 1;
    }
  }
}

.dropdown-container {
  position: relative;
  display: inline-block;
}

.dropdown-list-enhanced {
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(232, 165, 165, 0.3);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-heavy);
}

.dropdown-item-enhanced {
  color: white;
  transition: var(--transition-fast);

  &:hover {
    background: rgba(232, 165, 165, 0.2);
    color: var(--primary-light);
  }
}

/* ========================================= */
/* ESTILOS DE LA SECCIÓN HERO MEJORADOS */
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
  transition: all 3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: heroImageEntrance 3s ease-in-out;
  filter: brightness(0.8) contrast(1.1);
}

@keyframes heroImageEntrance {
  0% {
    opacity: 0;
    transform: scale(1.1) rotate(0.5deg);
    filter: blur(3px) brightness(0.6);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05) rotate(0deg);
    filter: blur(1px) brightness(0.7);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
    filter: blur(0) brightness(0.8);
  }
}

.hero-indicators {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 3;
}

.indicator {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all var(--transition-medium);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border: 2px solid transparent;
    border-radius: 50%;
    transition: all var(--transition-medium);
  }

  &.active {
    background: var(--primary-color);
    transform: scale(1.3);
    box-shadow: 0 0 15px rgba(229, 62, 62, 0.6);

    &::before {
      border-color: rgba(229, 62, 62, 0.3);
    }
  }

  &:hover:not(.active) {
    background: rgba(255, 255, 255, 0.8);
    transform: scale(1.1);
  }
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(248, 249, 250, 0.4) 0%,
    rgba(232, 165, 165, 0.2) 50%,
    rgba(168, 184, 216, 0.3) 100%
  );
  backdrop-filter: blur(1px);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
  padding: 3rem;
}

.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.8rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
  text-shadow: 3px 6px 12px rgba(0, 0, 0, 0.6);
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: #cc0000;
  background-color: red !important;
  border: #000000;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 4px 8px rgba(204, 0, 0, 0.6));
  width: 100%;
  text-align: center;
  white-space: normal;
  overflow: visible;
}

.hero-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1.3rem;
  margin-bottom: 3rem;
  opacity: 1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  font-weight: 500;
  line-height: 1.6;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  color: #ffffff;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 240, 240, 0.9) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 4px rgba(255, 255, 255, 0.3));
  letter-spacing: 0.3px;
}

.hero-cards {
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  margin-top: 4rem;
  perspective: 1000px;
}

.hero-card {
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.8) 0%, rgba(185, 28, 28, 0.9) 100%);
  color: #000000;
  cursor: pointer;
  transition: all var(--transition-medium);
  min-width: 220px;
  border-radius: var(--border-radius);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.15),
    0 4px 12px rgba(229, 62, 62, 0.1);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(229, 62, 62, 0.6);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: var(--gradient-primary);
    transition: var(--transition-slow);
    opacity: 0.1;
  }

  &:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: var(--shadow-heavy);
    color: #ffffff;
    background: linear-gradient(135deg, rgba(185, 28, 28, 0.95) 0%, rgba(153, 27, 27, 1) 100%);

    h3 {
      color: #ffffff;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }

    &::before {
      left: 0;
      opacity: 0.9;
    }
  }

  h3 {
    margin-top: 1.5rem;
    font-size: 1.2rem;
    color: #000000;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    line-height: 1.4;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3);
    transition: var(--transition-medium);
  }
}

.hero-card-icon {
  color: #e53e3e;
  transition: all var(--transition-medium);
  filter: drop-shadow(0 4px 8px rgba(229, 62, 62, 0.4));
  position: relative;
  z-index: 2;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(20, 20, 20, 0.9) 100%);
  border-radius: 50%;
  padding: 15px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(229, 62, 62, 0.6);
  box-shadow:
    0 6px 20px rgba(0, 0, 0, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #e53e3e, transparent, #e53e3e);
    border-radius: 50%;
    z-index: -1;
    opacity: 0;
    transition: all var(--transition-medium);
  }
}

.hero-card:hover .hero-card-icon {
  transform: scale(1.2);
  color: #ff6b6b;
  filter: drop-shadow(0 6px 12px rgba(255, 107, 107, 0.6));
  border-color: #ff6b6b;
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.9) 0%, rgba(50, 50, 50, 0.95) 100%);
  box-shadow:
    0 8px 25px rgba(255, 107, 107, 0.4),
    inset 0 2px 4px rgba(255, 255, 255, 0.2);

  &::before {
    opacity: 1;
    animation: rotate 3s linear infinite;
  }
}

/* ========================================= */
/* ESTILOS GENERALES DE SECCIONES MEJORADOS */
/* ========================================= */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* CLASES MEJORADAS PARA ELEMENTOS */
.title-enhanced {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  letter-spacing: -0.02em;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: var(--gradient-primary);
    border-radius: 2px;
  }
}

.text-enhanced {
  font-family: 'Inter', sans-serif;
  line-height: 1.8;
  font-weight: 400;
  color: var(--text-dark);
}

.card-enhanced {
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-medium);
  transition: all var(--transition-medium);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-heavy);
  }
}

.image-enhanced {
  border-radius: var(--border-radius);
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(229, 62, 62, 0.1) 70%);
    opacity: 0;
    transition: var(--transition-medium);
    z-index: 1;
  }

  &:hover::before {
    opacity: 1;
  }
}

.image-hover-effect {
  transition: all var(--transition-slow);

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.1) contrast(1.1);
  }
}

/* ========================================= */
/* ESTILOS DE LA SECCIÓN "¿QUÉ HACE?" MODERNOS */
/* ========================================= */
.about-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="0.5" fill="%23e8a5a5" opacity="0.1"/><circle cx="75" cy="75" r="0.5" fill="%23a8b8d8" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.2;
  }
}

.about-section .row {
  display: flex;
  align-items: center;
  min-height: 500px;
  position: relative;
  z-index: 1;
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
  color: var(--primary-light);
  font-size: 3rem;
  margin-bottom: 2rem;
  font-weight: 800;
  text-shadow: 0 4px 8px rgba(242, 194, 194, 0.4);
}

.about-text {
  font-size: 1.15rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: #e2e8f0;
  text-align: justify;
  position: relative;
  padding-left: 20px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 4px;
    height: 20px;
    background: var(--gradient-primary);
    border-radius: 2px;
  }
}

.queHace-content {
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(0, 0, 0, 0.95) 100%);
  color: #e2e8f0;
  height: 100%;
  display: flex;
  align-items: center;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(232, 165, 165, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(232, 165, 165, 0.08) 0%, transparent 70%);
    animation: rotate 30s linear infinite;
  }
}

/* Estilos mejorados para el contenido de "¿QUÉ HACE?" */
.content-section-enhanced {
  padding: 3rem 2.5rem;
  position: relative;
  z-index: 2;
}

.title-container {
  margin-bottom: 2.5rem;
  position: relative;
}

.title-decoration {
  width: 80px;
  height: 4px;
  background: var(--gradient-primary);
  border-radius: 2px;
  margin-top: 1rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    background: var(--primary-color);
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(229, 62, 62, 0.5);
  }
}

.text-content-wrapper {
  margin-bottom: 2rem;
}

.text-block {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 45px;
    top: 50px;
    width: 2px;
    height: calc(100% - 30px);
    background: linear-gradient(to bottom, rgba(229, 62, 62, 0.3), transparent);
  }

  &:last-child::before {
    display: none;
  }
}

.text-number {
  background: var(--gradient-primary);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  font-family: 'Inter', sans-serif;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(229, 62, 62, 0.3);
  animation: numberCounter 0.6s ease-out forwards;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: linear-gradient(45deg, transparent, rgba(229, 62, 62, 0.4), transparent);
    animation: rotate 3s linear infinite;
    z-index: -1;
  }
}

.highlight-text {
  position: relative;
}

.text-highlight {
  background: linear-gradient(120deg, rgba(232, 165, 165, 0.2) 0%, rgba(232, 165, 165, 0.2) 100%);
  background-repeat: no-repeat;
  background-size: 100% 40%;
  background-position: 0 85%;
  font-weight: 600;
  color: #e2e8f0;
  padding: 2px 4px;
  border-radius: 3px;
}

.keyword-highlight {
  color: var(--secondary-color);
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(168, 184, 216, 0.3);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--gradient-secondary);
    border-radius: 1px;
    transform: scaleX(0);
    animation: scaleIn 0.6s ease-out 0.5s forwards;
  }
}

@keyframes scaleIn {
  to {
    transform: scaleX(1);
  }
}

.emphasis-text {
  color: #7cb342;
  font-weight: 600;
  font-style: italic;
  text-shadow: 0 1px 2px rgba(124, 179, 66, 0.2);
}

.stats-container {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  opacity: 0.9;
  transition: var(--transition-medium);

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }
}

.stat-icon {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-text {
  font-size: 0.9rem;
  font-weight: 500;
  color: #e2e8f0;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.about-image-container {
  width: 100%;
  height: 450px;
  overflow: hidden;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-heavy);
  transition: all var(--transition-medium);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 60%, rgba(229, 62, 62, 0.1) 100%);
    opacity: 0;
    transition: var(--transition-medium);
  }

  &:hover {
    transform: translateY(-8px) rotateY(2deg);

    &::after {
      opacity: 1;
    }
  }
}

.about-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: all var(--transition-slow);
}

/* ========================================= */
/* ESTILOS DE LA SECCIÓN MISIÓN MODERNOS */
/* ========================================= */
.mission-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at center, rgba(232, 165, 165, 0.08) 0%, transparent 70%);
  }
}

.mission-section .row {
  display: flex;
  align-items: center;
  min-height: 500px;
  position: relative;
  z-index: 1;
}

.mission-image-container {
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-heavy);
  transition: all var(--transition-medium);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, transparent 40%, rgba(229, 62, 62, 0.15) 100%);
    opacity: 0;
    transition: var(--transition-medium);
  }

  &:hover {
    transform: translateY(-8px) rotateY(-2deg);

    &::after {
      opacity: 1;
    }
  }
}

.mission-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: all var(--transition-slow);
}

.mission-content {
  background: var(--gradient-primary);
  color: white;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -100%;
    left: -100%;
    width: 300%;
    height: 300%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    animation: shimmer 15s ease-in-out infinite;
  }
}

/* Estilos mejorados para el contenido de Misión */
.mission-section-enhanced {
  padding: 3rem 2.5rem;
  position: relative;
  z-index: 2;
}

.mission-header {
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;
}

.mission-icon-container {
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
}

.mission-icon-large {
  color: rgba(255, 255, 255, 0.9);
  filter: drop-shadow(0 4px 12px rgba(255, 255, 255, 0.3));
  animation: pulseSubtle 3s ease-in-out infinite;
}

.mission-subtitle {
  font-size: 1rem;
  opacity: 0.85;
  font-style: italic;
  margin-top: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  letter-spacing: 0.5px;
}

.mission-content-wrapper {
  position: relative;
}

.mission-text-block {
  position: relative;
  margin-bottom: 2rem;
  padding: 0 1rem;
}

.mission-quote-mark {
  font-size: 4rem;
  font-family: 'Playfair Display', serif;
  color: rgba(255, 255, 255, 0.3);
  position: absolute;
  font-weight: 700;
  line-height: 1;

  &.closing {
    right: 1rem;
    bottom: -1rem;
    transform: rotate(180deg);
  }

  &:not(.closing) {
    left: 1rem;
    top: -1rem;
  }
}

.mission-highlight {
  font-size: 1.2rem;
  line-height: 1.9;
  text-align: justify;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.mission-emphasis {
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%);
  background-repeat: no-repeat;
  background-size: 100% 40%;
  background-position: 0 85%;
  font-weight: 700;
  color: #ffffff;
  padding: 2px 6px;
  border-radius: 4px;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.impact-text {
  color: #81c784;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(129, 199, 132, 0.4);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #81c784, #4caf50);
    border-radius: 1px;
    transform: scaleX(0);
    animation: scaleIn 0.8s ease-out 1s forwards;
  }
}

.excellence-text {
  color: #ffeb3b;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(255, 235, 59, 0.4);
}

.impact-highlight {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
  font-size: 1.1em;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, rgba(255, 107, 107, 0.1), rgba(254, 202, 87, 0.1));
    border-radius: 4px;
    z-index: -1;
  }
}

.mission-pillars {
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.pillar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  transition: var(--transition-medium);
  padding: 1rem 0.5rem;
  border-radius: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
  }

  span {
    font-size: 0.85rem;
    font-weight: 600;
    text-align: center;
    font-family: 'Inter', sans-serif;
  }
}

.pillar-icon {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
}

.mission-cta {
  text-align: center;
  margin-top: 2rem;
  position: relative;
}

.cta-text {
  font-size: 1.1rem;
  font-weight: 600;
  font-family: 'Playfair Display', serif;
  font-style: italic;
  opacity: 0.9;
  margin-bottom: 0.5rem;
}

.cta-underline {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
  margin: 0 auto;
  border-radius: 1px;
  animation: pulseWidth 2s ease-in-out infinite;
}

@keyframes pulseWidth {
  0%,
  100% {
    width: 60px;
    opacity: 0.6;
  }
  50% {
    width: 100px;
    opacity: 1;
  }
}

@keyframes shimmer {
  0%,
  100% {
    transform: translate(-100%, -100%) scale(0);
    opacity: 0;
  }
  50% {
    transform: translate(0%, 0%) scale(1);
    opacity: 1;
  }
}

.mission-title {
  font-size: 3rem;
  margin-bottom: 2rem;
  font-weight: 800;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.mission-text {
  font-size: 1.15rem;
  line-height: 1.8;
  font-weight: 400;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* ========================================= */
/* ESTILOS DE LAS LÍNEAS DE INVESTIGACIÓN MODERNOS */
/* ========================================= */
.research-section {
  padding: 6rem 0;
  background: linear-gradient(
    135deg,
    var(--soft-gray) 0%,
    var(--white) 50%,
    var(--pastel-mint) 100%
  );
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 30% 20%, rgba(232, 165, 165, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(168, 184, 216, 0.03) 0%, transparent 50%);
  }
}

.research-title {
  text-align: center;
  font-size: 3.5rem;
  margin-bottom: 4rem;
  color: var(--text-dark);
  font-weight: 800;
  font-family: 'Playfair Display', serif;
  position: relative;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: var(--gradient-primary);
    border-radius: 2px;
  }
}

.research-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
  perspective: 1200px;
  position: relative;
  z-index: 1;
}

.research-card-enhanced {
  background: linear-gradient(135deg, var(--white) 0%, var(--soft-gray) 100%);
  box-shadow: var(--shadow-soft);
  transition: all var(--transition-slow) cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  transform-origin: center;
  border-radius: var(--border-radius);
  border: 2px solid rgba(229, 62, 62, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(229, 62, 62, 0.05) 0%, rgba(255, 107, 107, 0.1) 100%);
    opacity: 0;
    transition: var(--transition-medium);
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(229, 62, 62, 0.1) 0%, transparent 70%);
    transform: scale(0);
    transition: var(--transition-slow);
    z-index: 0;
  }

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow:
      0 20px 40px rgba(229, 62, 62, 0.3),
      0 10px 20px rgba(0, 0, 0, 0.1);
    border-color: #e53e3e;

    &::before {
      opacity: 1;
    }

    &::after {
      transform: scale(1);
    }
  }

  &.full-width {
    grid-column: 1 / -1;
    max-width: 450px;
    margin: 0 auto;
    justify-self: center;
  }

  .q-card-section {
    position: relative;
    z-index: 2;
    padding: 3rem 1.5rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  h3 {
    font-size: 1.15rem;
    margin-top: 1.5rem;
    color: var(--text-dark);
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    transition: all var(--transition-medium);
    line-height: 1.4;
    text-align: center;
  }

  &:hover h3 {
    color: #e53e3e;
    transform: scale(1.05);
    text-shadow: 0 2px 4px rgba(229, 62, 62, 0.3);
  }
}

.icon-enhanced {
  color: #e53e3e;
  transition: all var(--transition-medium);
  filter: drop-shadow(0 6px 12px rgba(229, 62, 62, 0.4));
  position: relative;
  z-index: 2;
  font-size: 56px !important;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(20, 20, 20, 0.9) 100%);
  border-radius: 50%;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(229, 62, 62, 0.6);
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.3),
    inset 0 1px 2px rgba(255, 255, 255, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #e53e3e, transparent, #e53e3e);
    border-radius: 50%;
    z-index: -1;
    opacity: 0;
    transition: all var(--transition-medium);
  }
}

.research-card-enhanced:hover .icon-enhanced {
  transform: scale(1.2) rotate(10deg);
  color: #ff6b6b;
  filter: drop-shadow(0 10px 20px rgba(255, 107, 107, 0.6));
  animation: iconBounce 0.6s ease-in-out;
  border-color: #ff6b6b;
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.9) 0%, rgba(50, 50, 50, 0.95) 100%);
  box-shadow:
    0 12px 35px rgba(255, 107, 107, 0.4),
    inset 0 2px 4px rgba(255, 255, 255, 0.2);

  &::before {
    opacity: 1;
    animation: rotate 3s linear infinite;
  }
}

@keyframes iconBounce {
  0%,
  100% {
    transform: scale(1.3) rotate(10deg);
  }
  50% {
    transform: scale(1.4) rotate(12deg);
  }
}

/* ========================================= */
/* ESTILOS DEL FOOTER MODERNO */
/* ========================================= */
.footer {
  background: linear-gradient(135deg, #e53e3e 0%, #dc2626 50%, #b91c1c 100%);
  color: white;
  padding: 50px 0 20px;
  margin-top: auto;
  width: 100%;
  min-height: 200px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at top, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  }
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

.footer-content {
  display: grid;
  grid-template-columns: 1.8fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 30px;
}

.logo-info-section {
  padding-right: 20px;
}

.footer-logo {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 25px;
}

.footer-logo-icon {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 48px;
  transition: var(--transition-medium);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: white;
    transform: scale(1.1);
  }
}

.footer-logo-text .university-name {
  font-size: 32px;
  font-weight: 900;
  color: white;
  margin-bottom: 5px;
  font-family: 'Playfair Display', serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.footer-logo-text .department-name {
  font-size: 14px;
  opacity: 0.9;
  line-height: 1.4;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

.social-section-integrated {
  margin: 20px 0;
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.social-section-integrated .footer-subtitle {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Inter', sans-serif;
}

.social-section-integrated .social-description {
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 18px;
  line-height: 1.5;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
}

.social-section-integrated .social-links {
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  flex-wrap: wrap;
}

.social-section-integrated .social-link {
  width: 42px;
  height: 42px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all var(--transition-medium);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
    transition: all var(--transition-medium);
    z-index: 0;
  }

  &:hover {
    border-color: white;
    transform: translateY(-3px) scale(1.1);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);

    &::before {
      left: 0;
    }
  }

  i {
    font-size: 18px;
    position: relative;
    z-index: 1;
    transition: var(--transition-fast);
  }

  &:hover i {
    transform: rotate(360deg);
  }
}

.footer-title {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 20px;
  color: white;
  text-transform: uppercase;
  position: relative;
  font-family: 'Inter', sans-serif;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%);
    border-radius: 2px;
  }
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links li a {
  color: #ffffff;
  text-decoration: none;
  font-size: 15px;
  transition: all var(--transition-medium);
  position: relative;
  padding-left: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 400;

  &::before {
    content: '→';
    position: absolute;
    left: -20px;
    opacity: 0;
    transition: all var(--transition-medium);
    color: white;
  }

  &:hover {
    color: white;
    padding-left: 15px;
    transform: translateX(5px);

    &::before {
      opacity: 1;
      left: -15px;
    }
  }
}

.footer-icon-section {
  text-align: center;
  margin-top: 30px;
  opacity: 0.2;
  transition: var(--transition-medium);

  &:hover {
    opacity: 0.4;
    transform: scale(1.1);
  }
}

.footer-bottom {
  margin-top: 20px;
}

.footer-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
  margin-bottom: 25px;
}

.footer-copyright {
  text-align: center;
  padding: 15px 0;
}

.footer-copyright p {
  font-size: 13px;
  opacity: 0.7;
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}

/* ========================================= */
/* ESTILOS DEL CHAT FLOTANTE MEJORADO */
/* ========================================= */
.chat-floating {
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 99999;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-heavy);
  transition: var(--transition-medium);
  pointer-events: auto;
  isolation: isolate;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);

  &:hover {
    transform: translateY(-5px) scale(1.05) translateZ(0);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  }

  /* Asegurar que el contenido del chat también tenga z-index alto */
  * {
    z-index: inherit;
    position: relative;
  }

  /* Prevenir cualquier interferencia de animaciones */
  &,
  * {
    animation-fill-mode: both;
    -webkit-animation-fill-mode: both;
  }
}

/* Estilos adicionales para overlays y modales del ChatBot */
:global(.q-dialog),
:global(.q-menu),
:global(.q-popup-proxy),
:global(.q-tooltip),
:global(.chat-overlay),
:global(.chat-modal),
:global(.chat-popup) {
  z-index: 99999 !important;
  position: fixed !important;
  isolation: isolate !important;
  will-change: auto !important;
  backface-visibility: hidden !important;
  -webkit-backface-visibility: hidden !important;
  transform: translateZ(0) !important;
  -webkit-transform: translateZ(0) !important;
}

/* Asegurar que el backdrop del chat tenga prioridad */
:global(.q-dialog__backdrop),
:global(.chat-backdrop) {
  z-index: 99998 !important;
  backdrop-filter: blur(5px) !important;
  -webkit-backdrop-filter: blur(5px) !important;
}

/* ========================================= */
/* MEDIA QUERIES PARA RESPONSIVIDAD MEJORADAS */
/* ========================================= */

/* Tablets */
@media (max-width: 1023px) {
  .nav-container {
    padding: 8px 1.5rem;
  }

  .nav-title {
    font-size: 1.6rem;
  }

  .hero-title {
    font-size: 3.2rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-cards {
    gap: 2rem;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .research-title {
    font-size: 3rem;
  }

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
    height: 350px;
    margin-top: 1.5rem;
  }

  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 25px;
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
  .nav-container {
    padding: 8px 1rem;
    min-height: 65px;
  }

  .nav-menu {
    display: none;
  }

  .nav-title {
    font-size: 1.4rem;
  }

  .title-line-1,
  .title-line-2 {
    text-align: center;
  }

  .hero-title {
    font-size: 2.8rem;
    text-align: center;
    white-space: normal;
    border-right: none;
    color: #e8a5a5; /* Mantener el color rosa pastel suave en móvil */
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .hero-content {
    padding: 2rem 1rem;
  }

  .hero-cards {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .hero-card {
    min-width: 250px;
  }

  .research-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .research-title {
    font-size: 2.5rem;
  }

  .about-image-container,
  .mission-image-container {
    height: 300px;
  }

  .section-title {
    font-size: 2.2rem;
    text-align: center;
  }

  .mission-title {
    font-size: 2.2rem;
  }

  .about-text,
  .mission-text {
    text-align: left;
    font-size: 1.1rem;
  }

  /* Mejoras para texto móvil */
  .content-section-enhanced,
  .mission-section-enhanced {
    padding: 2rem 1.5rem;
  }

  .text-block {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    text-align: center;

    &::before {
      display: none;
    }
  }

  .text-number {
    margin-bottom: 0.5rem;
  }

  .stats-container {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .mission-pillars {
    flex-direction: column;
    gap: 1rem;
  }

  .mission-quote-mark {
    font-size: 3rem;

    &.closing {
      right: 0.5rem;
      bottom: -0.5rem;
    }

    &:not(.closing) {
      left: 0.5rem;
      top: -0.5rem;
    }
  }

  .mission-highlight {
    font-size: 1.1rem;
    text-align: left;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
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
    transform: none;
  }

  .social-section-integrated .social-links {
    justify-content: center;
  }

  .chat-floating {
    bottom: 20px;
    right: 15px;
  }
}

/* Dispositivos muy pequeños */
@media (max-width: 480px) {
  .nav-container {
    padding: 5px 0.5rem;
  }

  .nav-title {
    font-size: 1.2rem;
  }

  .logo-img {
    height: 35px;
  }

  .hero-title {
    font-size: 2.2rem;
    line-height: 1.2;
    color: #e8a5a5; /* Mantener el color rosa pastel suave */
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-content {
    padding: 1.5rem 0.75rem;
  }

  .hero-card {
    min-width: 200px;
  }

  .about-image-container,
  .mission-image-container {
    height: 250px;
  }

  .container {
    padding: 0 1rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .mission-title {
    font-size: 1.8rem;
  }

  .research-title {
    font-size: 2rem;
  }

  .about-text,
  .mission-text {
    font-size: 1rem;
  }

  .footer {
    padding: 35px 0 15px;
  }

  .footer-container {
    padding: 0 15px;
  }

  .footer-content {
    gap: 25px;
  }

  .footer-logo-text .university-name {
    font-size: 26px;
  }

  .footer-logo-text .department-name {
    font-size: 13px;
  }

  .social-section-integrated .social-link {
    width: 38px;
    height: 38px;
  }

  .social-section-integrated .social-link i {
    font-size: 16px;
  }

  .chat-floating {
    bottom: 15px;
    right: 10px;
    transform: scale(0.9);
  }
}

/* Dispositivos ultra pequeños */
@media (max-width: 360px) {
  .hero-title {
    font-size: 1.9rem;
    color: #e8a5a5; /* Mantener el color rosa pastel suave */
  }

  .hero-cards {
    padding: 0 0.5rem;
  }

  .hero-card {
    min-width: 180px;
  }

  .section-title,
  .mission-title {
    font-size: 1.6rem;
  }

  .research-title {
    font-size: 1.8rem;
  }

  .research-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

/* Mejoras para dispositivos con orientación paisaje */
@media (max-height: 500px) and (orientation: landscape) {
  .hero {
    height: auto;
    min-height: 100vh;
    padding: 2rem 0;
  }

  .hero-title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .hero-subtitle {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }

  .hero-cards {
    margin-top: 2rem;
    gap: 1rem;
  }
}

/* Mejoras para pantallas de alta resolución */
@media (min-width: 1440px) {
  .container {
    max-width: 1400px;
  }

  .nav-container {
    padding: 10px 4rem;
  }

  .hero-title {
    font-size: 4.5rem;
  }

  .hero-subtitle {
    font-size: 1.5rem;
  }

  .section-title {
    font-size: 3.5rem;
  }

  .research-title {
    font-size: 4rem;
  }

  .about-image-container,
  .mission-image-container {
    height: 500px;
  }
}

/* Mejoras para pantallas ultra anchas */
@media (min-width: 1920px) {
  .container {
    max-width: 1600px;
  }

  .research-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2.5rem;
  }
}
</style>
