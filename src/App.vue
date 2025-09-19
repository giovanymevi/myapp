<template>
  <div class="app-container">
    <header class="header">
      <div class="social-links">
        <a href="https://facebook.com" target="_blank" class="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="social-icon">
            <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
          </svg>
          Facebook
        </a>
        <a href="https://instagram.com" target="_blank" class="social-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="social-icon">
            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
          </svg>
          Instagram
        </a>
      </div>
      <button class="gmv-btn" @click="goToPortfolio">gmv</button>
    </header>

    <main class="main-content">
      <img :src="profileImage" alt="Desarrollador" class="profile-image" />
      <h1 class="title">DESARROLLADOR DEV</h1>
      <h2 class="subtitle">DE APLICACIONES</h2>
      <button class="portfolio-btn" @click="goToPortfolio">Ver Portafolio</button>
    </main>

    <footer class="footer">
      <p>&copy; 2023 GMV Desarrollador de Aplicaciones. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Imagen de perfil (reemplazar con la imagen real)
const profileImage = ref('https://media.licdn.com/dms/image/v2/D4E03AQFE9-V45JRLww/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1706183253457?e=2147483647&v=beta&t=DgkXJnBdoQEHca21lfRZnXkrHNGUhcwkvHGc3nTwxtk')

const goToPortfolio = () => {
  window.open('https://ejemplo-portafolio.com', '_blank')
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 5%;
  margin-bottom: 40px;
}

.social-links {
  display: flex;
  gap: 20px;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s;
}

.social-link:hover {
  opacity: 0.8;
}

.social-icon {
  width: 20px;
  height: 20px;
  fill: white;
}

.gmv-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  padding: 10px 25px;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.gmv-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 25px;
  flex-grow: 1;
  justify-content: center;
}

.profile-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid white;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin: 0;
}

.subtitle {
  font-size: 1.8rem;
  font-weight: 500;
  opacity: 0.9;
  margin: 0;
}

.portfolio-btn {
  margin-top: 20px;
  background: white;
  color: #1a2a6c;
  border: none;
  padding: 15px 40px;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.portfolio-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  background: #f8f8f8;
}

.footer {
  margin-top: 50px;
  text-align: center;
  opacity: 0.7;
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.4rem;
  }
  
  .profile-image {
    width: 170px;
    height: 170px;
  }
  
  .header {
    flex-direction: column;
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .profile-image {
    width: 150px;
    height: 150px;
  }
  
  .portfolio-btn {
    padding: 12px 30px;
    font-size: 1rem;
  }
  
  .social-links {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
