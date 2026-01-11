---
title: 'FAQ audiovisual'
description: 'Una glosario técnico para editar'
updatedDate: 2026-01-10
image: ''
tags: ["blog", "astro"]
---

> TL;DR Esta guía pretende resolver dudas frecuentes y básicas sobre el ámbito audiovisual. Todo lo que explico a continuación tiene como base DaVinci Resolve. Aunque muchas reglas se aplican a otros editores no-lineales como Adobe Premiere Pro, Final Cut Pro o Avid Media Composer. Pero las funciones específicas que se mencionan igual pueden no tener equivalencia en otros programas. Si quieres saber más sobre [Final Cut Pro](https://castro.eus/blog/fcpx/), tienes una guía también.

## ¿Qué formato uso para mis discos duros?

La manera en el que formateas tus discos es extremadamente importante. El sistema de archivos es algo con la que mucha gente se suele confundir y que luego causa problemas, bien por lentitud o compatibilidad. El resumen simple es:

- Si **solo** usas macOS: [APFS](https://support.apple.com/es-es/guide/disk-utility/dsku19ed921c/mac) es el más rápido, pero macOS Extended Journaled funciona muy bien.
- Si **solo** usas Windows: [NTFS](https://es.wikipedia.org/wiki/NTFS) es lo más rápido y sencillo.
- Y si usas los dos sistemas todo el rato = usa exFAT.

Un par de notas sobre [exFAT](https://learn.microsoft.com/en-gb/windows/win32/fileio/exfat-specification). Este sistema de archivos es más lento que los demás y no tiene funciones de seguridad (carece de [Journaling](https://es.wikipedia.org/wiki/Journaling)). Es más propenso a corrupción de archivos y DaVinci siempre suele imprimir el aviso "exFAT drive detected". A veces no queda más remedio porque ciclamos mucho entre sistemas diferentes. Pero pudiéndolo evitar, es preferible usar sistemas de archivos más modernos y seguros.

Incluyo a Linux porque igual hay alguien que edita en DaVinci así. exFAT también es compatible con sus peros. NTFS también funciona instalando un paquete extra y si quieres algo nativo, [BTRFS](https://es.wikipedia.org/wiki/Btrfs) funciona bien también.

Si buscas lo mejor, más óptimo y seguro sin ningún tipo de compromiso, un servidor con 3-4 discos en [RAID 5](https://es.wikipedia.org/wiki/RAID) con [ZFS](https://es.wikipedia.org/wiki/ZFS_%28sistema_de_archivos%29) es la mejor opción. ZFS es un sistema de archivos con maneras eficientes de conseguir redundancia y sin mucho sacrificio de velocidad. RAID 5 además nos permite perder hasta 1 disco por cada 4 y no perder ni un solo archivo.
</details>

## ¿Copias de seguridad? ¿Qué hago?

Los backups son exactamente igual de importantes que los discos y formatos que usamos. La regla óptima sobre esto debería de ser el 3-2-1.

- 3 copias diferentes del mismo archivo.
- 2 medios diferentes como mínimo.
- 1 medio de estos en otro sitio.

No es obligatorio seguir este método al pie de la letra. Pero por lo menos tener un clon del disco en el que estés trabajando me parece lo más efectivo. En estos casos, sí que sí es extremadamente recomendable no usar exFAT para tus discos en los que quieras guardar copias de seguridad.


## Me organizo fatal, ¿Qué hago?

Tengo una guía sobre eso. Léela [aquí](https://castro.eus/blog/organizar)

## ¿Cómo organizo mis proyectos en DaVinci?

DaVinci usa librerías de proyecto para organizar sus archivos. Como hemos visto antes en los formatos de discos, lo ideal es no cambiar el tipo de formato y trabajar, si se puede de un mismo sistema o de un servidor común para múltiples sistemas.

Para mí, solo tengo una regla de oro. **1 proyecto = 1 biblioteca**. No es inamovible, pero jamás he tenido ningún problema haciéndolo así.
La estructura general suele verse de la siguiente manera:
- **BIBLIOTECA A**:
  - Proyecto 1
  	- Timeline, bins, clips asociados
  - Proyecto 2
  	- Timeline, bins, clips asociados
  - Power bins
---
- **BIBLIOTECA B**:
  - Proyecto 1
  	- Timeline, bins, clips asociados
  - Proyecto 2
  	- Timeline, bins, clips asociados
  - Power bins

Las **Power bins** se merecen su propia explicación. Son una serie de recursos que puedes acceder en múltiples proyectos contenidos, **una misma biblioteca**. Ej. Tu biblioteca de proyectos de vídeos para la empresa B, tiene disponibles en un Power bin: su logo, su música e imágenes corporativas. Esto evita que tengas que importar muchas veces los mismos recursos y los tengas organizados en un mismo sitio.

Si quieres saber cómo organizar bien tus bibliotecas de Final Cut Pro, consulta [mi guía](https://castro.eus/blog/fcpx/) al respecto.



## ¿Color Management? ¿LOG?

También tengo una guía sobre eso. Es densa, pero puedes leerlo [aquí](https://castro.eus/color)
</details>


## El ordenador va lento ¿Qué hago?

- Playback -> Render Cache -> User -> Líneas de tiempo pre-renderizadas. Mejor rendimiento y mejores tiempos de renderizado.
- Haz proxies, versiones más pequeñas de archivos


## El ordenador va lento ¿Qué hago?

- Playback -> Render Cache -> User -> Líneas de tiempo pre-renderizadas. Mejor rendimiento y mejores tiempos de renderizado.
- Haz proxies, versiones más pequeñas de archivos


## ¿Audio demasiado bajo o alto? ¿Qué hago?
Tener un volumen consistente en tu máster final es muy importante. Aquí adjunto unos cuanto concepto y procedimientos para que el mix final del vídeo tenga sentido y se adecúe a los estándares finales de distribución de contenido en plataformas digitales.

**dBFS** significa "[decibelios](https://es.wikipedia.org/wiki/Decibelio) a escala completa" ("decibels full scale"). Es una abreviatura utilizada para definir los niveles de amplitud en decibelios en sistemas digitales en relación con el máximo nivel disponible.

**LUFS** son las siglas de **L**oudness **U**nits relative to **F**ull **S**cale o **Loudness Units Full Scale** (es decir, el nivel máximo que puede manejar un sistema). Se trata de una medida estandarizada de la sonoridad del audio que tiene en cuenta la percepción humana y la intensidad de la señal eléctrica. Para simplificar, significa que los LUFS son la forma más reciente y precisa de medir la sonoridad en el audio, diseñada para ayudar a hacer posible un sonido consistente.

La medición de LUFS se leerá en un número negativo, como -6 LUFS, -11 LUFS y -16 LUFS. A medida que se aleja de 0, se vuelve más silencioso. Cuanto más se acerque a 0, mayor será la sonoridad.

LFKS y LUFS son **sinónimos** = ‘LUFS’ (que se ajusta a los acuerdos de denominación internacionales) es equivalente a ‘LKFS’ (la cual se usa en la ITU-R BS.1770-2) [cita página 3](https://tech.ebu.ch/docs/r/r128_2011_ES.pdf)

*[Fuente de la información](https://moises.ai/es/blog/consejos/lufs-volumen/)

**Normalizar**: ajustar los niveles del audio al target de volumen especificado.
Para normalizar volumen y saber más sobre exportación, aquí adjunto otro vídeo de [Teams2Films](https://www.youtube.com/watch?v=nZJkcca7vJ4)
Otro buen vídeo de [EposVox](https://www.youtube.com/watch?v=q-pcO9jqpZ4)

## ¿WTF es un codec?

Un codec es la manera en que se codifican y descodifican archivos de vídeo o audio. Hay muchos tipos de codecs (Prores, DNxHR, H.264) y todos ellos pueden ir en contenedores diversos (.mp4, .mov, .mkv...).  Esta manera de codificar y descodificar puede variar tanto en compresión como en resolución y bitrate. Y, por tanto, ser más o menos útiles en depende qué procesos.

Codecs con pérdida o "lossy",  como H.264 o AV1, guardan 1 de cada X cantidad de frames capturados en su contenedor. Dejando al ordenador descomprimir el resto del vídeo. Ocupan menos y son muy buenos para distribución, pero son mucho más lentos a la hora de editar. Dado que el ordenador tiene que generar esa información al vuelo para poder cortar y reposicionar clips.

Codecs sin perdida o "lossless" como ProRes o DnxHR, guardan cada frame capturado en el contenedor. Ocupan más, pero son mucho mejores para grabar y editar. Dado que capturan mucha más información y detalle, a su vez consiguiendo un rendimiento excelente para editar.

Resumen: lossy para distribuir, lossless para grabar y editar.

## Quiero asegurarme de que exporto bien todo ¿Cómo lo hago?

Antes de comenzar, es recomendable tener una exportación máster en la calidad más grande posible. Por ejemplo: Apple ProRes 4444 o DnxHR 444.

Si bien en un ámbito profesional lo óptimo sería guardar el proyecto entero tal y como está, a veces podemos tomarnos la libertad de optimizar espacio y borrar ciertos brutos. Aparte del vídeo final, es recomendable tener otras variantes guardadas que no ocupan demasiado espacio. DaVinci (al igual que otros programas de exportación) nos da muchas opciones para renderizar muchos másteres para entrega. Podemos aprovechar esta característica para renderizar a la vez estas 6 variantes:

- PROYECTO MÁSTER
- PROYECTO MÁSTER SIN GRÁFICOS
- PROYECTO MÁSTER SOLO GRÁFICOS
- PROYECTO MÁSTER SOLO MÚSICA
- PROYECTO MÁSTER SOLO EFECTOS DE SONIDO
- PROYECTO MÁSTER SOLO VOZ EN OFF

Con estas 5 variantes nos aseguramos que si hay que cambiar algo en el vídeo, tenemos las piezas esenciales del puzzle que no ocupan mucho espacio y que, a su vez, nos dejan hacer cambios significativos. He elegido estas versiones porque son las que suele pedir normalmente el cliente. Además de eso, el cliente **jamás** debería de poder pedir solo los brutos de un proyecto.


## ¿Sabes algunos trucos?
- Fondo desenfocado para mostrar fotos = [Blanking fill effect](https://www.youtube.com/watch?v=nQ0hLKVw1ZU)
- Shift ⇧ + Z = Zoom out al timeline entero
- Amplía marcadores (pulsa "m") y haz secciones para organizarte mejor. Solo cambia el código de tiempo del marcador y los colores. Útil para vídeos largos con muchos temas
- Aprende shortcuts como: las teclas **I** y **O** para marcar In & Out points en los clips. **J K** y **L** para el playback...


