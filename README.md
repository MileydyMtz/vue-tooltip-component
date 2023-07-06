# Documentacion del componente Tooltip
## Descripcion:
El Tooltip es un componente reutilizable desarrollado en Vue que muestra un cuadro de texto (tooltip) cuando el usuario coloca el cursor sobre el elemento contenido en el componente. El tooltip es controlado y estilizado usando el marco Popper.js y CSS, respectivamente.

## Tecnologias usadas
A continuación se enlistan las tecnologías y librerías utilizadas en el desarrollo de este componente:
* Vue 3
* Popper.js
* Preprocesador SCSS
* Vue Test Utils
* Vitest

## Caracteristicas del componente
### Props
* **Content** (requerido): Es el contenido del tooltip que será mostrado. Debe ser un string.
* **Delay** (opcional): Es el retraso (en milisegundos) antes de que se muestre el tooltip después de que el usuario coloque el cursor sobre el elemento. Si no se proporciona, el valor predeterminado es 500 milisegundos.

### CSS
- Los estilos del tooltip están definidos en la seccion de <style> y usan la extencion .scss.
- Se pueden modificar las variables *$tooltip-content-background* y *$tooltip-text-color* para cambiar el color de fondo y el color del texto del tooltip, respectivamente.
- Los estilos están "scoped", lo que significa que solo se aplicarán a este componente y no afectarán a otros componentes de la aplicación donde se reutilice.

### Notas
Este componente:
- Utiliza el hook onMounted para inicializar la instancia de Popper.js, que se encarga de controlar la posición y visibilidad del tooltip.
- Utiliza el hook onBeforeUnmount para destruir la instancia de Popper.js cuando el componente se desmonta, asegurando una limpieza adecuada de los recursos.
- Se apoya en las refs de Vue para tener acceso directo a los elementos del DOM y poder manipularlos con Popper.js.

## Uso del componente
Para utilizar este componente, primero se debe descargar el archivo *TheTooltip.vue* que se encuentra dentro de *src/components* y agregarlo al proyecto donde se reutilizara. 
Dentro del proyecto se debe de importar e incluir en los componentes de la instancia de Vue, para posteriormente usar la etiqueta del componente dentro de la plantilla (template) de Vue y pasar el contenido del tooltip y el retraso de aparición (opcional) como atributos del componente. A continuacion un ejemplo:

```vue
<template>
<div>
    <Tooltip content="Este es un tooltip" delay="600">
        <button>Hover sobre mí</button>
    </Tooltip>
</div>
</template>

<script>
import Tooltip from './components/TheTooltip.vue';

export default {
    components: {
        Tooltip
    },
}
</script>
```

## Demostracion
Siguiendo con el ejemplo anterior, mismo que se encuentra en el archivo *App.vue*, donde se importa y utiliza el Tooltip en un boton, se visualiza de la siguiente manera:

**Visualización del boton**

![tooltip](https://github.com/MileydyMtz/vue-tooltip-component/assets/85470047/e81e720d-6212-4382-8b10-6b1ca3a46577)

**Visualizacion del Tooltip al pasar el mouse sobre el boton**

![tooltip-hover](https://github.com/MileydyMtz/vue-tooltip-component/assets/85470047/172210a3-ed80-419a-be38-cd96645320e6)


## Pruebas
Las pruebas se han implementado utilizando vitest y vue-test-utils. 
A continuación se presentan las pruebas implementadas:

- **renders tooltip content properly**: Verifica que el contenido del tooltip se renderice correctamente cuando se pasa el prop content.
- **delays the tooltip visibility**: Verifica que el tooltip no se muestre inmediatamente después de que el cursor pasa sobre el componente, pero después del retraso especificado.
- **hides the tooltip on mouse out**: Verifica que el tooltip se oculta cuando el cursor deja el componente.
- **does not show tooltip when content is empty**: Verifica que el tooltip no se muestre si la prop content está vacía.
- **does not show tooltip without mouseover**: Verifica que el tooltip no se muestre si el cursor no ha pasado sobre el componente.
