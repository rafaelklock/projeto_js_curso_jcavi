function executaAJAX(url, callback) {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.setRequestHeader('Cache-Control', 'no-cache');
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {
        if (this.status == 200) {
            let resultadoObjetos = JSON.parse(this.response);
            callback(resultadoObjetos);
        } else {
            console.log('erro')
        }
    };
    request.onerror = function() { console.log('erro') };
    request.send();
}




function consultarMunicipios() {
    let selected_uf = document.getElementById('select_uf').selectedOptions[0];

    if (selected_uf.value == "") {
        alert("Sem UF selecionada!");
    } else {
        //TODO: removeLinhasTabela('tabela_municipios');
        //TODO: document.getElementById("mensagem_consulta").innerHTML = "Buscando municípios...";

        let url_api = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios";
        let url = url_api.replace("{UF}", selected_uf.value);

        executaAJAX(url, function(resultado) {
            // TODO: document.getElementById("mensagem_consulta").innerHTML = `${resultado.length} municípios localizados na UF ${selected_uf.innerHTML}`;
        
            resultado.sort(function(a, b) {
                return a.nome > b.nome ? 1 : -1;
            })

            let tabela_municipios = document.getElementById('select_cidade');

            resultado.forEach(function(item) {
              tabela_municipios.appendChild(new Option(item.nome, item.id))
            })
        });
    }
}



function limpaUF(){
    document.getElementById('select_uf').innerHTML = '<option value="">Selecione...</option>';
}

function limpaCidades() {
    document.getElementById('select_cidade').innerHTML = '<option value="">Selecione...</option>';
}


function limparCampos() {
    document.getElementById('nome').value = '';
    document.getElementById("cpf").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("endereco").value = "";
    document.getElementById("cep").value = "";

    limpaUF(); //Limpa o input select
    limpaCidades() //Limpa o input select
    carregarUFs() //Carrega novamente a tabela dos Estados
}



function carregarUFs() {
    let select_lista_UFs = document.getElementById('select_uf');
    let url_api = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

    executaAJAX(url_api, function(resultado) {

        resultado.sort(function(a, b) {
            return a.nome > b.nome ? 1 : -1;
        })

        resultado.forEach(function(uf) {
            select_lista_UFs.appendChild(new Option(uf.nome, uf.sigla));
        })
    });
}



function carregaJSON(text_string) {
    let resultado = JSON.parse(text_string);
    return resultado;
}



function exibeProdutos(event) {
    let input_component = event.target;
    let file = input_component.files[0];

    console.log("+ Nome: " + file.name)

    
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
        resultado = carregaJSON(reader.result)

        resultado.forEach(function(pr) {
            console.log(pr.produto)
        })
    };
}

