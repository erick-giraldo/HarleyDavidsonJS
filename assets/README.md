**\*\***\*\***\*\*** CAMBIOS EN SEO **\*\*\*\***\***\*\*\*\***

- Se agregó la etiqueta meta de description --> da información sobre el contenido de la página.

 <meta 
name="description"
content="¡Consulte nuestro blog para obtener artículos interesantes e informativos sobre motocicletas! ¡Entonces, visítenos cerca de Buffalo, NY para obtener más información!"
/>

- Se modifico la etiqueta title.
- <title>Harley-Davidson® - Inicio</title>
- Se optimizaron las imágenes cambiando el formato a .webp.
- Se cambio el color de fondo del main por "box-shadow", para acelerar el rendimiento.

**\*\***\*\***\*\*** CAMBIO EN SASS **\*\*\*\***\***\*\*\*\***
-Mapas
Se agregó un mapa para agregar colores cuando se haga un "hover" a los iconos de redes sociales.
-Mapas-Get
Se agregó un mapa para agregar formato al texto del menú.
-Extend
Se agregaron 5 extends, para reutilizarlas en todas las páginas. - Se globalizo la clase "main-container" que se reutilizara en todas las páginas. - Se globalizo la clase "breadcrumb" -> miga de pan, cambiando propiedades para poder ser reutilizados en todas las paginas - ambas clases aplican en responsive
-Mixin

- se agregó 2 mixin, para reutilizarlos en todas las paginas
  - se agregó 1 mixin para aplicar las propiedades en el body.
  - se agregó 1 mixin para importarlas dentro del contenido del main en cada página, modificando sus valores de entrada según se requería.

**\*\***\*\***\*\*** LOADING **\*\*\*\***\***\*\*\*\***
- Se cambio el loading 'CARGANDO.....', por el logo, texto y un spinner
- se agergo animación fadeIn para el logo y texto en forma secuencial.
- se agergo animación opacity, transform y stroke-dasharray para el spinner.  

**\*\***\*\***\*\*** CHAT **\*\*\*\***\***\*\*\*\***

- se agego un boton de chat que dirige directo al Whatsapp Web con texto personalizado.
- se agrego animación al hacer hover en el boton de Whatsapp se abre un modal y se puede 
  mandar un texto personalizado hacia Whatsapp Web.