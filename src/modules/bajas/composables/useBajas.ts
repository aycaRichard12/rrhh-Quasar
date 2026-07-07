import { ref, watch } from 'vue';
import { idusuario_md5 } from 'src/composables/funcionesGenerales';
import { prepararDatosFormulario } from 'src/utils/formUtils';
import { useNotificaciones } from 'src/composables/useNotificaciones';

import { bajasService } from '../services/bajas.service';
import type { Baja } from '../types/bajas.types';
import { date } from 'quasar';

export function useBajas() {
  const idUsuario = String(idusuario_md5());
  const listaBajas = ref<Baja[]>([]);

  const cargando = ref(false);
  const filtroBusqueda = ref('');
  const esModoEdicion = ref(false);
  const esVisibleDialogo = ref(false);

	const inputDias = ref<number | ''>('');
	const esMotivoDefinitivo = ref(false);

  const bajaActual = ref <Baja>({
		tipo: 0,
		fecha: '',
		observacion: '',
		idmotivo: 0,
		idtrabajador: 0,
		nombre: '',
		apellido: '',
		ci: 0,
		idcargo: 0,
		cargo: '',
		motivo: '',
		fechai: '',
		fechaf: '',
		idcontrato: 0,
  });

	const { notificarExitoAccion, notificarErrorAccion, notificarAdvertencia, confirmarEliminacionPredefinida } = useNotificaciones();

	const cargarBajas = async () => {
		cargando.value = true;
		try {
			listaBajas.value = await bajasService.listarBajas();
		} catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    } finally {
      cargando.value = false;
    }
	};

	const inicializarFechasPorDefecto = () => {
    const ahora = new Date();
    // Formato estándar que requiere Quasar e inputs de texto/fecha base (YYYY-MM-DD HH:mm)
    bajaActual.value.fecha = date.formatDate(ahora, 'YYYY-MM-DD');
    bajaActual.value.fechai = date.formatDate(ahora, 'YYYY-MM-DD');
    bajaActual.value.fechaf = '';
    inputDias.value = '';
  };

	const nuevaBaja = (idMotivo: number) => {
		bajaActual.value = {
			tipo: 0,
			fecha: '',
			observacion: '',
			idmotivo: idMotivo,
			idtrabajador: 0,
			nombre: '',
			apellido: '',
			ci: 0,
			idcargo: 0,
			cargo: '',
			motivo: '',
			fechai: '',
			fechaf: '',
			idcontrato: 0,
		};
		inicializarFechasPorDefecto();
    esMotivoDefinitivo.value = false;
		esModoEdicion.value = false;
		esVisibleDialogo.value = true;
	};

	const prepararEdicionBaja =async (id: number) => {
		try {
			const respuesta = await bajasService.editarBaja(id);
			if (respuesta.estado === 'exito' && respuesta.datos) {
				bajaActual.value = { ...respuesta.datos};
        esMotivoDefinitivo.value = Number(bajaActual.value.tipo) === 0; // Ajusta si 0=Definitivo o 1=Temporal
				esModoEdicion.value = true;
				esVisibleDialogo.value = true;
			} else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('cargar');
    }
	};

	// ==========================================
  // LOGICA AUTOMATICA DE CONTROL DE FECHAS (WATCHERS)
  // ==========================================

  // Escuchar si cambia el tipo/motivo de baja para resetear o congelar
  watch(() => bajaActual.value.tipo, (nuevoTipo) => {
    // Supongamos que tipo: 0 significa definitivo y tipo: 1 significa temporal
    if (Number(nuevoTipo) === 0) {
      esMotivoDefinitivo.value = true;
      bajaActual.value.fechaf = '';
      inputDias.value = '';
    } else {
      esMotivoDefinitivo.value = false;
      inicializarFechasPorDefecto();
    }
  });

  // Watcher 1: Si el usuario escribe los DÍAS, calculamos la Fecha Final automáticamente
  watch(inputDias, (nuevosDias) => {
    if (esMotivoDefinitivo.value || nuevosDias === '' || nuevosDias === null || nuevosDias < 0) return;
    
    if (bajaActual.value.fechai) {
      // Convertimos el string YYYY-MM-DD a objeto Date seguro
      const fechaInicioObj = date.extractDate(bajaActual.value.fechai, 'YYYY-MM-DD');
      // Sumamos los días usando el helper de Quasar
      const fechaFinalObj = date.addToDate(fechaInicioObj, { days: nuevosDias });
      
      const nuevaFechaFinalString = date.formatDate(fechaFinalObj, 'YYYY-MM-DD');
      
      // Evitamos bucles infinitos entre watchers asignando solo si cambió
      if (bajaActual.value.fechaf !== nuevaFechaFinalString) {
        bajaActual.value.fechaf = nuevaFechaFinalString;
      }
    }
  });

  // Watcher 2: Si el usuario cambia la FECHA FINAL, calculamos los Días transcurridos
  watch(() => bajaActual.value.fechaf, (nuevaFechaFinal) => {
    if (esMotivoDefinitivo.value || !nuevaFechaFinal || !bajaActual.value.fechai) return;

    const fechaInicioObj = date.extractDate(bajaActual.value.fechai, 'YYYY-MM-DD');
    const fechaFinalObj = date.extractDate(nuevaFechaFinal, 'YYYY-MM-DD');
    
    const diferenciaDias = date.getDateDiff(fechaFinalObj, fechaInicioObj, 'days');
    
    if (diferenciaDias >= 0 && inputDias.value !== diferenciaDias) {
      inputDias.value = diferenciaDias;
    }
  });

  // Watcher 3: Si cambia la FECHA INICIAL, recalculamos la final usando los días actuales
  watch(() => bajaActual.value.fechai, (nuevaFechaInicio) => {
    if (esMotivoDefinitivo.value || !nuevaFechaInicio || inputDias.value === '') return;

    const fechaInicioObj = date.extractDate(nuevaFechaInicio, 'YYYY-MM-DD');
    const fechaFinalObj = date.addToDate(fechaInicioObj, { days: Number(inputDias.value) });
    bajaActual.value.fechaf = date.formatDate(fechaFinalObj, 'YYYY-MM-DD');
  });

	const guardarBaja = async (datos: Baja) => {
		try {
// ver registrobaja (idusuario, idtrabajador, motivo, dias, fecha, fechai, fechaf, observacion, idcontrato, tipo)
// ver editarbaja   (idusuario, idtrabajador, motivo, dias, fecha, fechai, fechaf, observacion, id, idcontrato, tipo)
			const payload = {
				ver: esModoEdicion.value ? 'editarbaja':'registrobaja',
				...datos,
        idusuario: idUsuario,
				dias: inputDias.value,
			};
			const datosFormulario = prepararDatosFormulario(payload);
			const respuesta = await bajasService.guardarBaja(datosFormulario);
			if (respuesta.estado === 'exito') {
				notificarExitoAccion('guardar');
        esVisibleDialogo.value = false;
        void cargarBajas();
      } else {
        notificarAdvertencia(respuesta.mensaje);
      }
    } catch (error) {
      console.error(error);
      notificarErrorAccion('guardar');
    }
	};

	const confirmarEliminarBaja = (id: number) => {
		confirmarEliminacionPredefinida(async () => {
			try {
				const respuesta = await bajasService.eliminarBaja(id);
				if (respuesta.estado === 'exito') {
          notificarExitoAccion('eliminar');
          void cargarBajas();
        } else {
          notificarAdvertencia(respuesta.mensaje);
        }
      } catch (error) {
        console.error(error);
        notificarErrorAccion('eliminar');
      }
		});
	};

	return {
		listaBajas, bajaActual,
		cargando, filtroBusqueda, esModoEdicion, esVisibleDialogo,
		inputDias, esMotivoDefinitivo,
		cargarBajas, guardarBaja, nuevaBaja,
    prepararEdicionBaja, confirmarEliminarBaja,
	}
}