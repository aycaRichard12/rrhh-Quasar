<template>
  <q-input dense outlined
		class="componente-buscador"
    :model-value="modelValue"
		:placeholder="$t('common.actions.search')"
		@update:model-value="actualizarValor"
  >
   	<template v-slot:prepend>
   		<q-icon
				name="search"
			/>
   	</template>
   	
		<template v-slot:append>
   		<q-icon
   			v-if="modelValue !== ''"
   			name="close"
   			class="cursor-pointer"
   			@click="limpiarBusqueda"
   		/>
   	</template>
  </q-input>
</template>
 
<script setup lang="ts">

	defineProps<{
		modelValue: string;
	}>();

	const emits = defineEmits<{
		(e: 'update:modelValue', valor: string): void;
	}>();

	const actualizarValor = (valor: string | number | null): void => {
		emits('update:modelValue', String(valor || ''));
	};

	const limpiarBusqueda = (): void => {
		emits('update:modelValue', '');
	};
</script>

<style scoped>                                                                                             
.componente-buscador {                                                                                     
	width: 10px;                                                                                              
	min-width: 50px;                                                                                        
	max-width: 100px;                                                                                        
	transition: all 0.3s ease;                                                                           
}
@media (max-width: 599px) {                                                                               
.componente-buscador {                                                                                   
	max-width: 100px;                                                                                       
}                                                                                                       
}
@media (max-width: 409px) {                                                                                
.componente-buscador {                                                                                  
 max-width: 50px;                                                                                    
}                                                                                                      
}                                                                                                        
</style>