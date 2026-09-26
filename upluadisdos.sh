#!/usr/bin/env bash
# =============================================================
#  GESTOR DE DESPLIEGUE QUASAR (versión Linux/macOS)
#  Migrado desde upluadisdos.bat
# =============================================================

set -o pipefail

# Ir siempre al directorio donde vive este script
cd "$(dirname "$(readlink -f "$0")")" || {
  echo "❌ No se pudo cambiar al directorio del script"
  exit 1
}

# -------------------------------------------------------------
# Colores (deshabilitados si no es una TTY)
# -------------------------------------------------------------
if [ -t 1 ]; then
  C_RESET="\033[0m"
  C_BOLD="\033[1m"
  C_RED="\033[31m"
  C_GREEN="\033[32m"
  C_YELLOW="\033[33m"
  C_BLUE="\033[34m"
  C_CYAN="\033[36m"
else
  C_RESET="" C_BOLD="" C_RED="" C_GREEN="" C_YELLOW="" C_BLUE="" C_CYAN=""
fi

# -------------------------------------------------------------
# Detección de Python
# -------------------------------------------------------------
if command -v python3 >/dev/null 2>&1; then
  PYTHON=python3
elif command -v python >/dev/null 2>&1; then
  PYTHON=python
else
  echo -e "${C_RED}❌ No se encontró python3 ni python en el PATH${C_RESET}"
  exit 1
fi

# -------------------------------------------------------------
# Utilidades
# -------------------------------------------------------------
pause() {
  echo
  read -r -p "Presione ENTER para continuar..." _
}

mostrar_menu() {
  clear 2>/dev/null || printf '\033c'
  echo "==========================================="
  echo "       GESTOR DE DESPLIEGUE QUASAR"
  echo "==========================================="
  echo "  1. [Todo] Clean + Build + Limpiar Assets + Subir"
  echo "  2. [Build] Quasar Clean + Quasar Build"
  echo "  3. [Limpiar] Solo borrar Assets en Servidor"
  echo "  4. [Subir] Solo subir carpeta dist/spa"
  echo "  5. [Limpiar Dist] Limpiar carpeta dist local"
  echo "  6. Salir"
  echo "==========================================="
}

error() {
  echo
  echo -e "${C_RED}❌ Algo falló durante el proceso.${C_RESET}"
  pause
}

fin() {
  echo
  echo -e "${C_GREEN}✅ Tarea completada con éxito.${C_RESET}"
  pause
}

# -------------------------------------------------------------
# Acciones
# -------------------------------------------------------------
accion_todo() {
  echo
  echo -e "${C_CYAN}🔹 Iniciando proceso completo...${C_RESET}"
  npx quasar clean || return 1
  npx quasar build -m pwa || return 1
  "$PYTHON" pyLimpiarCarpetaAssets.py || return 1
  "$PYTHON" pySubirDistAlServidor.py || return 1
  return 0
}

accion_build() {
  echo
  echo -e "${C_CYAN}🔹 Ejecutando Quasar Clean y Build...${C_RESET}"
  npx quasar clean || return 1
  npx quasar build -m pwa || return 1
  return 0
}

accion_limpiar_assets() {
  echo
  echo -e "${C_CYAN}🔹 Limpiando carpeta assets en el servidor...${C_RESET}"
  "$PYTHON" pyLimpiarCarpetaAssets.py || return 1
  return 0
}

accion_limpiar_dist() {
  echo
  echo -e "${C_CYAN}🔹 Limpiando carpeta dist local...${C_RESET}"
  npx quasar clean || return 1
  echo -e "${C_GREEN}✅ Tarea completada con éxito.${C_RESET}"
  return 0
}

accion_subir() {
  echo
  echo -e "${C_CYAN}🔹 Subiendo archivos de dist/spa al servidor...${C_RESET}"
  "$PYTHON" pySubirDistAlServidor.py || return 1
  return 0
}

# -------------------------------------------------------------
# Loop principal
# -------------------------------------------------------------
while true; do
  mostrar_menu
  read -r -p "Seleccione una opcion (1-6): " opcion

  case "$opcion" in
    1)
      if accion_todo; then fin; else error; fi
      ;;
    2)
      if accion_build; then fin; else error; fi
      ;;
    3)
      if accion_limpiar_assets; then fin; else error; fi
      ;;
    4)
      if accion_subir; then fin; else error; fi
      ;;
    5)
      if accion_limpiar_dist; then fin; else error; fi
      ;;
    6)
      exit 0
      ;;
    *)
      echo
      echo -e "${C_YELLOW}⚠️  Opción no válida. Intente de nuevo.${C_RESET}"
      sleep 1
      ;;
  esac
done
