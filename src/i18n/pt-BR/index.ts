import navigation from './navigation';

export default {
  common: {
    actions: {
      edit: 'Editar',
      delete: 'Excluir',
      save: 'Salvar',
      cancel: 'Cancelar',
      saveChanges: 'Salvar Alterações',
      register: 'Registrar',
      reload: 'Recarregar',
      search: 'Pesquisar',
      apply: 'Aplicar',
      clear: 'Limpar',
      download: 'Baixar',
      close: 'Fechar',
      confirm: 'Confirmar',
      deactivate: 'Desativar',
      activate: 'Ativar',
      add: 'Adicionar',
      update: 'Atualizar',
      report: 'Gerar Relatório'
    },
    notifications: {
      failed: 'Ação falhou',
      success: 'Ação realizada com sucesso',
    },
    labels: {
      actions: 'Ações',
      detail: 'Detalhe',
      mainMenu: 'MENU PRINCIPAL',
      reports: 'Relatórios',
      account: 'Conta',
    },
    rules: {
      required: 'Este campo é obrigatório'
    },
    messages: {
      noData: 'Não há registros',
      loading: 'Carregando',
      unknown: 'Desconhecido',
      items: 'item(ns)',
      downloadSuccess: 'Arquivo baixado com sucesso',
      all: 'Tudo',
      noSection: 'Sem seção',
      noResults: 'Sem resultados para "{query}"',
      more: 'Mais opções',
      generatingReport: 'Gerando relatório...',
      reportGenerated: 'Relatório gerado com sucesso',
    },
    report: {
      recordsPerPage: 'Registros por página',
      page: 'Página',
      of: 'de',
      dateTime: 'Data e hora do relatório',
      responsible: 'DADOS DO RESPONSÁVEL',
      from: 'De',
      to: 'Até',
      searchCriteria: 'Critérios de pesquisa',
      filtersApplied: 'Filtros aplicados',
      search: 'Pesquisa',
      type: 'Tipo',
      all: 'Tudo',
      totalRecords: 'Total de registros',
      valid: 'Válido',
      expired: 'Expirado',
      expiring: 'Próx. a vencer',
    },
    dialogs: {
      deleteTitle: 'Confirmar Exclusão',
    },
    timeUnits: {
      seconds: 'Segundos',
      minutes: 'Minutos',
      hours: 'Horas',
      days: 'Dias',
      weeks: 'Semanas',
      months: 'Meses',
      years: 'Anos',
    }
  },
  errors: {
    fetchData: 'Erro ao carregar os dados do servidor',
    saveData: 'Erro ao salvar os dados',
    deleteData: 'Erro ao excluir o registro',
    reportError: 'Erro ao gerar o relatório PDF',
  },
  navigation,
  welcome: {
    title: 'Bem-vindo ao Gestão de RH!',
    subtitle: 'Selecione uma opção no menu lateral para gerenciar o talento humano.',
  },
  ///////////////////////////////////////////////////////////////////////////////////
  tables:{
    description: 'Descrição',
    options: 'Opções',
  },
  areas: {
    title: 'Áreas',
    subtitle: 'Gestão de áreas e filiais da empresa',
    form: {
      formNew: 'Nova Área',
      formEdit: 'Editar Área',
      buttonRegister: 'Nova Área',
      name: 'Área',
      branch: 'Filial',
      noBranch: 'Sem filial',
    },
    table: {
      name: 'Área',
      branch: 'Filial',
    }
  },
};