document.addEventListener('DOMContentLoaded', () => {
    const estadosSelect = document.getElementById('estados');
    const cidadesSelect = document.getElementById('cidades');

   
    function carregarEstados() {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => response.json())
            .then(estados => {
                estados.forEach(estado => {
                    const option = document.createElement('option');
                    option.value = estado.id;
                    option.textContent = estado.nome;
                    estadosSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao carregar estados:', error));
    }

    function carregarCidades(estadoId) {
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`)
            .then(response => response.json())
            .then(cidades => {
                cidadesSelect.innerHTML = '<option value="">Selecione uma cidade</option>';
                cidades.forEach(cidade => {
                    const option = document.createElement('option');
                    option.value = cidade.id;
                    option.textContent = cidade.nome;
                    cidadesSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao carregar cidades:', error));
    }


    estadosSelect.addEventListener('change', (event) => {
        const estadoId = event.target.value;
        if (estadoId) {
            carregarCidades(estadoId);
        } else {
            cidadesSelect.innerHTML = '<option value="">Selecione uma cidade</option>';
        }
    });

    carregarEstados();
});
