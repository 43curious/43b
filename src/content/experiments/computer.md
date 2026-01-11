---
title: 'Cómo uso mi ordenador'
description: 'La biblia de mi productividad: Sistema Declarativo y Navegación'
updatedDate: 2026-01-10
image: ''
tags: ["blog", "astro"]
---

Hay pocos programas instaladas en mi ordenador. Me gusta usar lo mínimo, optimizado y esencial. Uso herramientas que cambian cada día. Y de todas las que he probado, las mejores, son las que pasan desapercibidas. Las que siguen ese slogan tan icónico de "it just works". Me gusta saber cómo funcionan los objetos que uso pero no quiero que me estorben. 

macOS es mi sistema principal. También uso Linux en mi servidor, Windows poco ya. Me quedo en macOS de momento por Apple Silicon. Muchísima potencia, batería de sobra y, sobre todo, silencio. Es discreto, no estorba en uso diario y puede con todo lo que le pido. Sobre todo con edición de vídeo y programación.

Para conseguir que mi ordenador sea una extensión de mi mente y no un obstáculo, me baso en dos pilares fundamentales: **El Sistema** (cómo se instala y mantiene el software) y **El Flujo** (cómo interactúo con él).

---

## El Sistema Declarativo

Tengo el Mac lleno de mierda. Caché, aplicaciones, documentos, ajustes... Cada vez que instalo un programa, descargo un dichoso `.dmg` que luego tengo que borrar. Si borro la aplicación, se quedan carpetas restantes. Si quiero evitar eso, tengo que usar [herramientas de terceros](https://freemacsoft.net/appcleaner/). Es muy pesado, lento y quiero algo mejor.

Por fortuna, este problema tiene una solución, se llama sistema declarativo. En lugar de instalar cosas a mano (sistema imperativo), usamos un sistema declarativo. Imagina que en lugar de ir al súper a buscar cada pasillo, le das una lista de la compra a un robot: él se encarga de traer lo que falta y tirar lo que ya no quieres.

Este es el paradigma de una distribución de Linux llamada [NixOS ](https://nixos.org/). Pero es compleja, necesita un lenguaje específico y no es amable para nuevos usuarios. Proyectos como [nix-darwin](https://github.com/LnL7/nix-darwin) intentan traer esto a macOS, pero la curva de aprendizaje es vertical.

### La Solución: Brewsync

He creado mi propia solución intermedia: **Brewsync**. Una mezcla entre [Homebrew](https://brew.sh/) (el administrador de paquetes de macOS) y la filosofía declarativa.

La idea es sencilla. Homebrew permite usar un archivo *[Brewfile](https://docs.brew.sh/Brew-Bundle-and-Brewfile)*. Un archivo de texto plano donde listas todas tus aplicaciones. Si añado una línea, se instala. Si la borro, se desinstala.

Aquí un ejemplo de mi *Brewfile*:
```bash
# CLI tools
brew "neovim"
brew "mas"
brew "stow"
tap "asmvik/formulae"
brew "asmvik/formulae/skhd"

# GUI Applications
cask "zen"
cask "qobuz"
cask "ghostty"
cask "obsidian"
cask "tailscale-app"

# Mac App Store
mas "DaVinci Resolve", id: 571213070
```

Para automatizar la magia, uso una función en mi `.zshrc` llamada `brewsync`. Al ejecutarla, abre mi Brewfile en Neovim. Al guardar y cerrar, compara el archivo antes y después. Si hay cambios, Homebrew se encarga de sincronizar el sistema automáticamente.

```bash
function brewsync() {
    # Referencia mi brewfile en el directorio de .dotfiles
    local BREWFILE="$HOME/.dotfiles/brewfile"
    
    # Verificar si el archivo existe
    [[ ! -f "$BREWFILE" ]] && echo "$fg[red] Error: Brewfile no encontrado" && return 1
	
    # Calcular el hash inicial, abrir Nvim y calcular el hash final
    local OLD_HASH=$(shasum -a 256 "$BREWFILE")
    nvim "$BREWFILE"
    local NEW_HASH=$(shasum -a 256 "$BREWFILE")
	
    # Comparar y ejecutar si hubo cambios
    if [[ "$OLD_HASH" != "$NEW_HASH" ]]; then
        echo "$fg[cyan]Cambios detectados. Sincronizando Brewfile..."
        
        # Entrar al directorio para que brew bundle detecte el archivo
        cd "$(dirname "$BREWFILE")" || return
        
        # Ejecutar instalación y limpieza
        brew bundle --quiet
        brew bundle cleanup --force --quiet
        brew update
        brew upgrade
        brew cleanup --prune=all

        # Volver al directorio anterior
        cd - > /dev/null
        echo "$fg[green] Sincronización completada."
    else
        echo "No hubo cambios en el archivo. Actualizando."
        brew update
        brew upgrade
        brew cleanup --prune=all
    fi
}
```

Es simple, efectivo, y mantiene mi Mac limpio sabiendo exactamente qué hay instalado en cada momento.


## El Flujo: SKHD

Una vez que el sistema está limpio, necesito moverme por él sin pensar. Aquí entra **[SKHD](https://github.com/koekeishiya/skhd)**.

SKHD es la columna vertebral de mi uso diario. Es un proceso de fondo ("[daemon](https://en.wikipedia.org/wiki/Daemon_(computing))") que permite asignar atajos de teclado globales. Está inspirado en los *Window Managers* de Linux. Creo firmemente que si repites una tarea muchas veces, debe convertirse en un atajo de teclado. Y lo que más repito es cambiar de aplicación.

### Mi Filosofía de Ventanas

En lugar de escritorios virtuales complejos, uso un enfoque más directo:
1. **Un solo escritorio**.
2. **Todas las aplicaciones maximizadas**.
3. **Acceso directo por atajo de teclado**.

He programado SKHD para asignar `OPTION + LETRA` para traer al frente mis aplicaciones esenciales. No busco iconos en el Dock, no uso `CMD + TAB` para rotar. Voy directamente a lo que quiero.

```bash
# Bindings for Cmd + Option (first layer)
alt - q : open -a "/Applications/Things3.app" # Tareas
alt - w : open -a Zen # Navegador
alt - e : open -a Ghostty # Terminal

alt - r : open -a Obsidian # Notas  
alt - a : open -a Finder # Finder
alt - f : open -a Calendar # Calendario

# Bindings for Cmd + Shift + Option (second layer)
alt + shift - q : open -a "DaVinci Resolve" # Video
alt + shift - w : open -a "Soundly" # Buscador de efectos de sonido
alt + shift - e : open -a "Logic Pro" # Audio

# Volume quick-switch toggle
ctrl - e : SwitchAudioSource -s "iFi (by AMR) HD USB Audio Output" # Auriculares
ctrl - r : SwitchAudioSource -s "BenQ EX2780Q" # Altavoces
```

## Conclusión

Esta combinación de **Sistema Declarativo** (para instalación/mantenimiento) y **Navegación por Teclado** (para uso diario) es lo que compone mi uso diario informático. No es para todo el mundo, pero una vez que te acostumbras a que tu ordenador esté siempre limpio y responda instantáneamente, es difícil volver atrás.
