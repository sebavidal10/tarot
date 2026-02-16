# Tarot Arcana

Una plataforma avanzada de consulta de Tarot que combina diseño premium con inteligencia artificial (Claude 3 de Anthropic) para ofrecer interpretaciones profundas y contextualizadas.

## Características Principales

### Interfaz de Lectura Estructurada

Diseño optimizado para la experiencia del usuario que simula una disposición profesional de cartas. Incorpora slots específicos para el análisis del **Pasado, Presente y Futuro**, garantizando una jerarquía visual clara y una navegación fluida.

### Sistema de Temas Dinámico

La aplicación permite alternar entre dos entornos visuales diseñados para maximizar el contraste y la legibilidad:

- **Modo Dark (Void)**: Uso de negros profundos y acentos en rojo sangre sobre una interfaz de alto contraste.
- **Modo Light (Marble)**: Estética minimalista basada en texturas de mármol blanco y tipografías oscuras.

### Ritual de Revelación y Animaciones

Implementación de flujos de interacción secuenciales para mejorar el engagement:

- **Selección de mazo**: Sistema de mazo dinámico con animaciones de respuesta al puntero.
- **Auto-revelación**: Secuencia automatizada de rotación de cartas (3D flips) que gestiona el tiempo de lectura antes de mostrar la interpretación final.

### Gestión de Historial (Grimorio)

Persistencia local de consultas anteriores. Permite a los usuarios acceder a sus registros históricos, recuperando tanto las cartas seleccionadas como las interpretaciones generadas por la IA.

### Integración con IA

Uso de la API de Anthropic para generar contenido dinámico. La IA está configurada para mantener un tono formal, analítico y empático, proporcionando interpretaciones que van más allá de los significados básicos del mazo.

---

## Especificaciones de Diseño

- **Tipografía de Títulos**: `Cinzel Decorative` - Para una identidad visual fuerte y clásica.
- **Cuerpo de Texto**: `Spectral` - Serif moderna optimizada para lectura prolongada.
- **Componentes**: Diseñados con un enfoque en el minimalismo y el alto contraste.

## Stack Tecnológico

- **Frontend**: React 18
- **Animaciones**: Framer Motion (Transiciones de layout y efectos 3D)
- **Estilos**: TailwindCSS (Configuración personalizada y gestión de temas)
- **Iconografía**: Lucide React

## Instalación

1. **Clonar e Instalar**:

   ```bash
   git clone https://github.com/sebavidal10/tarot.git
   cd tarot
   npm install
   ```

2. **Configurar API Key**:
   Crea un archivo `.env` en la raíz del proyecto:

   ```env
   REACT_APP_ANTHROPIC_API_KEY=tu_api_key
   ```

3. **Ejecutar en Desarrollo**:
   ```bash
   npm start
   ```

## Despliegue (GitHub Pages)

Para desplegar la aplicación:

```bash
npm run deploy
```

Este comando genera el build de producción y lo publica automáticamente en la rama `gh-pages`.

## Licencia

MIT License - El código es abierto para su uso y modificación.
