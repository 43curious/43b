---
title: 'Blogs con Astro'
description: 'Una guía explicativa sobre cómo construí este blog'
updatedDate: 2026-01-10
image: ''
tags: ["blog", "astro"]
---

Documentar me ha ayudado en todos los proyectos que he realizado. [Obsidian](obsidian.md) ha sido mi herramienta de notas predeterminada durante los últimos años y aquí es donde tengo toda la base de mi conocimiento. Algo menos ordenada de lo que me gustaría, pero por lo menos sigue la estructura "cerebral" de unir todo ese conocimiento en forma de "links". Inspirado por [Kepano](https://stephango.com), [DHH](https://world.hey.com/dhh) y [Rauno](https://rauno.me), decidí crear un blog simple en el que poder alojar tanto mi progreso como pequeños experimentos que haga en mis ámbitos.


## Problema

Quiero un blog simple. Algo que pueda modificar a mi antojo, que soporte Markdown, que tenga el mínimo JavaScript posible y que sea rápido y extensible a la larga por si la necesito. Me gusta programar front-end, pero prefiero escribir y crear. No quiero tener que ocuparme de mantener el blog más que de escribir. Así que teniendo esos requerimientos, he aquí el resultado.


## Solución

Usé [Astro](https://astro.build) como framework principal, dado que no carga casi JavaScript y soporta Markdown, mi tipo de archivo favorito para escribir. Es muy versátil y fácil de configurar. Soporta casi todos los extras posibles (como Tailwind o React si es que lo necesitas) y, sobre todo, es rápido.

La página está estructura con dos *Layouts* o plantillas. El *Main* es para las páginas principales como el _home_ y el _about_. Y la plantilla blog es para leer cada artículo. He intentado adaptar con *responsive* lo mejor que he podido para que la experiencia de lectura sea fácil y cómoda en todo los dispositivos, tanto en modo claro y oscuro.

Astro usa una característica llamada [Content Collections](https://docs.astro.build/en/guides/content-collections/) para organizar los posts de un blog. Se define la colección en un archivo *.ts* con datos relevantes (título, descripción, etiquetas...) y esos datos se escriben en el [frontmatter](https://frontmatter.codes/docs/markdown) de cada archivo Markdown. Esto asegura orden y claridad. El producto final está desplegado en [Netlify](https://www.netlify.com/) y se actualiza automáticamente según añado o modifico archivos en el [repositorio de GitHub](https://github.com/43hershel/43b) donde está alojado.


## Detalles

Después de unas cuantas iteraciones, estoy bastante contento con el resultado final. Todavía veo mucho margen de mejora, pero poco a poco. Me lo paso muy bien añadiendo extras y manteniendo este pequeño rincón de internet. He aprendido mucho y ahora queda lo más difícil, llenarlo de contenido de calidad. Enseñar me ayuda a aprender. Y espero que cualquiera que pase por aquí pueda disfrutar de alguien a quien le gusta mucho aprender.
