# Tarot Arcana: Lecturas del Abismo 🧛‍♂️🔮

Aplicación web de Tarot inmersiva con una estética gótica oscura y vampírica. Utiliza Inteligencia Artificial (Claude de Anthropic) para interpretar tu destino, o invoca un oráculo de respaldo cuando la conexión con el éter digital falla.

![Tarot Arcana](https://placeholder-image-url.com)

> [!WARNING]
> **NOTA DE SEGURIDAD IMPORTANTE**
> Este proyecto realiza llamadas a la API de Anthropic **desde el cliente (frontend)**.
>
> - **Uso Local**: Es seguro en `localhost` siempre que no subas el archivo `.env`.
> - **Producción**: NO despliegues esto públicamente sin un backend/proxy intermediario, o expondrás tu API Key.

## ✨ Características Principales

### 🌓 Dualidad Visual (Temas)

Cambia entre dos estados del alma desde la barra de navegación:

- **Sombra (Void Gothic)**: Fondo negro obsidiana, bordes rojo sangre, oscuridad profunda.
- **Luz (Vampiric Marble)**: Blancos de mármol antiguo, grises piedra y contrastes sangrientos.

### 📜 Tipografía Maldita

- **Títulos**: _Playfair Display SC_ - Estilo elegante y solemne. Reminiscencia de las portadas de novelas góticas del siglo XIX (estilo Drácula).
- **Textos**: _Crimson Text_ - Serif clásica para una lectura cómoda, como inscripciones en libros viejos.

### 🔮 Modo Demo Místico

¿No tienes créditos en la API? ¿Sin conexión?
El sistema detecta automáticamente los fallos y activa el **"Oráculo de Respaldo"**, permitiéndote experimentar la interfaz completa con lecturas simuladas poéticas.

### 🤖 Inteligencia Artificial

Conectado a **Claude 3 (Anthropic)** con un "System Prompt" diseñado para actuar como una tarotista mística, empática y solemne.

### 🖼️ Arte Arcano (IA)

Todas las ilustraciones de los Arcanos fueron generadas utilizando **Inteligencia Artificial** (Stable Diffusion), evocando el estilo de grabados antiguos y surrealismo oscuro para potenciar la atmósfera mística.

## 🛠️ Tecnologías

- **Core**: React 18, React Router.
- **Estilos**: TailwindCSS (con configuración avanzada de temas y `darkMode: 'class'`).
- **Fuentes**: Google Fonts (Playfair Display SC, Crimson Text).
- **Iconos**: Lucide React.

## 🚀 Instalación y Uso

1. **Clonar**:

   ```bash
   git clone https://github.com/tu-usuario/tarot-app.git
   ```

2. **Instalar**:

   ```bash
   cd tarot-app
   npm install
   ```

3. **Configurar (Opcional)**:
   Crea un archivo `.env` en la raíz con tu API Key. Si no lo haces, la app funcionará en **Modo Demo**.

   ```env
   REACT_APP_ANTHROPIC_API_KEY=sk-ant-api03-...
   ```

4. **Invocar**:
   ```bash
   npm start
   ```
   Abre [http://localhost:3000](http://localhost:3000).

## 🔮 Roadmap

- [ ] Persistencia de lecturas en LocalStorage ("Grimorio Personal").
- [ ] Efectos de sonido ambientales (lluvia, fuego crepitante).
- [ ] Más tiradas complejas (Cruz Celta).
- [ ] Backend en Next.js para asegurar la API Key.

## 📄 Licencia

MIT - El destino es libre, el código también.
