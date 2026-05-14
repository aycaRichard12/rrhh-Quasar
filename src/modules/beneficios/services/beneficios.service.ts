import { api } from 'src/boot/axios';
import type { Beneficio, BeneficioEstandar, RespuestaApi } from '../types/beneficios.types';

export const obtenerBeneficios = async (idEmpresa: string): Promise<Beneficio[]> => {
  const respuesta = await api.get<Beneficio[]>(`listabeneficio/${idEmpresa}`);
  return respuesta.data;
};

export const obtenerBeneficiosEstandar = async (): Promise<BeneficioEstandar[]> => {
  const urlAd = import.meta.env.VITE_URL_APIA as string;
  const respuesta = await api.get<BeneficioEstandar[]>(`${urlAd}api/listabeneficios`);
  return respuesta.data;
};

export const cambiarEstadoBeneficio = async (id: string, estado: string | number): Promise<RespuestaApi> => {
  const respuesta = await api.get<RespuestaApi>(`editarEstadobeneficio/${id}/${estado}`);
  return respuesta.data;
};

export const verificarIdBeneficio = async (id: string): Promise<RespuestaApi<Beneficio>> => {
  const respuesta = await api.get<RespuestaApi<Beneficio>>(`verificarIDbeneficio/${id}`);
  return respuesta.data;
};

export const eliminarBeneficio = async (id: string): Promise<RespuestaApi> => {
  const respuesta = await api.get<RespuestaApi>(`eliminarbeneficio/${id}`);
  return respuesta.data;
};

// Se envía al endpoint raíz porque el backend usa "ver: registrobeneficio" por dentro del FormData
export const guardarBeneficio = async (payload: FormData): Promise<RespuestaApi> => {
  const respuesta = await api.post<RespuestaApi>('', payload);
  return respuesta.data;
};

// Implementado exactamente como tu función "remplazarOcopiardatos"
export const ejecutarAccionEstandar = async (tipoAccion: 'reemplazar' | 'anadir', datosTemplate: BeneficioEstandar[], idEmpresa: string): Promise<RespuestaApi> => {
  const payload = new FormData();
  payload.append('ver', 'remplazarocopiardatosbeneficios');
  payload.append('idempresa', idEmpresa);
  payload.append('datos', JSON.stringify(datosTemplate));
  payload.append('tipo', tipoAccion === 'reemplazar' ? '1' : '2');
  
  // En tu código viejo: fetch(apiUrl(), { method: 'POST', body: datos }) -> va a la URL base
  const respuesta = await api.post<RespuestaApi>('', payload);
  return respuesta.data;
};