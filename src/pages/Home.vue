<template>
  <q-page class="home-page">
    <!-- Header -->
    <q-header elevated class="header-custom">
      <q-toolbar class="nav-container">
        <div class="logo-section">
          <div class="logo-placeholder">
            <img
              src="src/assets/Home_imagenes/EsanLogo.jpg"
              alt="Universidad Esan"
              class="logo-img"
            />
          </div>
          <div class="nav-title">Vicerrectorrado<br />de Investigación</div>
        </div>
        <div class="nav-menu">
          <q-btn flat label="UE Esan" @click="scrollTo('inicio')" />
          <q-btn flat label="Portal Académico" @click="scrollTo('portal')" />
          <q-btn flat label="Nosotros" @click="scrollTo('nosotros')" />
          <q-btn flat label="Recursos" @click="scrollTo('recursos')" />
          <q-btn flat label="Publicaciones" @click="scrollTo('publicaciones')" />
          <q-btn class="login-btn" label="Inicio sesión" @click="scrollTo('login')" />
        </div>
      </q-toolbar>
    </q-header>

    <!-- Hero Section -->
    <section class="hero" id="inicio">
      <div class="hero-background">
        <img
          src="src/assets/Home_imagenes/Estudiante.jpg"
          alt="Estudiante investigando en biblioteca"
          class="hero-image"
        />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">Vicerrectorrado de Investigación</h1>
        <p class="hero-subtitle">
          Fomentamos una cultura de investigación e innovación en la comunidad universitaria
        </p>
      
        <div class="hero-cards">
          <q-card class="hero-card" @click="scrollTo('investigacion')">
            <q-card-section class="text-center">
              <q-icon name="assessment" size="48px" class="hero-card-icon" />
              <h3>Dirección de Investigación</h3>
            </q-card-section>
          </q-card>
          <q-card class="hero-card" @click="scrollTo('ediciones')">
            <q-card-section class="text-center">
              <q-icon name="menu_book" size="48px" class="hero-card-icon" />
              <h3>Esan ediciones</h3>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about-section" id="nosotros">
      <div class="container">
        <div class="row q-gutter-xl items-center">
          <div class="col-md-6 col-12">
            <h2 class="section-title">¿QUE HACE?</h2>
            <p class="about-text">
              El Vicerrectorado de Investigación se encarga de promover, coordinar y supervisar las
              actividades de investigación científica, tecnológica e innovación dentro de la
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
          </div>
          <div class="col-md-6 col-12">
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

    <!-- Mission Section -->
    <section class="mission-section">
      <div class="container">
        <div class="row q-gutter-xl items-center">
          <div class="col-md-6 col-12">
            <div class="mission-image-container">
              <img
                src="src/assets/Home_imagenes/mision.jpg"
                alt="Imagen de Innovación"
                class="mission-img"
              />
            </div>
          </div>
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

    <!-- Research Lines Section -->
    <section class="research-section" id="investigacion">
      <div class="container">
        <h2 class="research-title">Líneas de Investigación</h2>
        <div class="research-grid">
          <!-- Primera fila -->
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

          <!-- Segunda fila -->
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

          <!-- Tercera fila -->
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

          <!-- Cuarta fila -->
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

          <!-- Quinta fila -->
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

          <!-- Última fila -->
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

    <!-- Contact Section -->
    <section class="contact-section" id="contacto">
      <div class="container">
        <div class="row q-gutter-xl">
          <div class="col-md-6 col-12">
            <div class="contact-info">
              <h3 class="contact-title">Comuníquese con nosotros</h3>
              <div class="contact-item">
                <strong>Dirección:</strong>
                <span>Alonso de Molina 1652, Monterrico, Surco</span>
              </div>
              <div class="contact-item">
                <strong>Teléfono:</strong>
                <span>317-7200, 712-7200</span>
              </div>
              <div class="contact-item">
                <strong>Correo:</strong>
                <span>informes@esan.edu.pe</span>
              </div>
              <div class="social-links">
                <q-btn round color="grey-8" icon="facebook" />
                <q-btn round color="grey-8" icon="work" />
                <q-btn round color="grey-8" icon="video_library" />
                <q-btn round color="grey-8" icon="photo_camera" />
              </div>
            </div>
          </div>
          <div class="col-md-6 col-12">
            <div class="site-map">
              <h3 class="map-title">TEMA</h3>
              <div class="row">
                <div class="col-6">
                  <q-btn flat align="left" label="Inicio" @click="scrollTo('inicio')" />
                  <q-btn flat align="left" label="Esan ediciones" @click="scrollTo('ediciones')" />
                  <q-btn
                    flat
                    align="left"
                    label="Directorio de investigaciones"
                    @click="scrollTo('directorio')"
                  />
                </div>
                <div class="col-6">
                  <q-btn flat align="left" label="Comunícate" @click="scrollTo('comunicate')" />
                  <q-btn flat align="left" label="Biblioteca" @click="scrollTo('biblioteca')" />
                  <q-btn
                    flat
                    align="left"
                    label="Investigaciones"
                    @click="scrollTo('investigaciones')"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { scroll } from 'quasar'
const { getScrollTarget, setVerticalScrollPosition } = scroll

export default defineComponent({
  name: 'HomePantalla',
  methods: {
    scrollTo(elementId) {
      const element = document.getElementById(elementId)
      const target = getScrollTarget(element)
      const offset = element.offsetTop
      const duration = 1000
      setVerticalScrollPosition(target, offset, duration)
    },
  },
})
</script>

<style lang="scss" scoped>
.home-page {
  padding-top: 0;
}

/* Header Styles */
.header-custom {
  background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
  color: white;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-placeholder {
  width: 120px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  height: 40px;
  width: auto;
}

.nav-title {
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.2;
}

.nav-menu {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.login-btn {
  background: #666;
  border-radius: 25px;
}

/* Hero Section */
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
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  }
}

.hero-card-icon {
  color: white;
}

/* Sections */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.about-section {
  padding: 5rem 0;
  background: #f8f9fa;
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
}

.about-image-container {
  width: 100%;
  height: 400px;
}

.about-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
}

/* Mission Section */
.mission-section {
  padding: 5rem 0;
  background: white;
}

.mission-image-container {
  width: 100%;
  height: 350px;
}

.mission-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
}

.mission-content {
  background: linear-gradient(135deg, #e53e3e, #ff6b6b);
  color: white;
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

/* Research Section */
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
}

.research-card {
  background: white;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

  &.full-width {
    grid-column: 1 / -1;
    max-width: 400px;
    margin: 0 auto;
  }

  h3 {
    font-size: 1rem;
    margin-top: 1rem;
    color: #333;
    font-weight: 600;
  }
}

.research-icon {
  color: #e53e3e;
}

/* Contact Section */
.contact-section {
  background: #1a1a1a;
  color: white;
  padding: 4rem 0;
}

.contact-title {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: white;
}

.contact-item {
  margin-bottom: 1.5rem;

  strong {
    display: block;
    margin-bottom: 0.5rem;
    color: #e53e3e;
  }

  span {
    color: #ccc;
  }
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.map-title {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: white;
}

.site-map {
  .q-btn {
    color: #ccc;
    width: 100%;
    justify-content: flex-start;
    margin-bottom: 0.5rem;

    &:hover {
      color: #e53e3e;
    }
  }
}

/* Responsive */
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
}
</style>
