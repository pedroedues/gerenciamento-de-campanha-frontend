  let linksArray = [];

  function salvarDadoNoCache(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function buscarDadoDoCache(key) {
    var dado = JSON.parse(localStorage.getItem(key));
    return dado;
  }

  function adicionarLink() {
    const linksContainer = document.getElementById('linksContainer');
    const newLinkInput = document.createElement('div');
    newLinkInput.classList.add('link-input');

    const newLink = document.createElement('input');
    newLink.type = 'text';
    newLink.name = 'links';
    newLink.required = true;
    newLink.placeholder = 'Digite o link';
    newLinkInput.appendChild(newLink);

    linksContainer.appendChild(newLinkInput);
  }

  function cadastrarCampanha() {
    const maxCliques = document.getElementById('maxCliques').value;

    const linkInputs = document.querySelectorAll('.link-input input');
    linksArray = Array.from(linkInputs).map(input => input.value);

    const campanhaData = {
      maximoDeCliques: parseInt(maxCliques),
      links: linksArray
    };

    fetch('https://campanhas-api.azurewebsites.net/Campanha', {
      method: 'POST',
      headers: {
          'origin': 'any',
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(campanhaData)
    })
    .then(response => {
      if (response.status === 201) {
        return response.json();
      } else {
        throw new Error('Erro ao cadastrar campanha');
      }
    })
    .then(data => {
      gerarEventoSucesso(data);
    })
    .catch(error => {
      alert(error.message);
    });
  }


  function gerarEventoSucesso(data) {
      alert('Criado campanha com id:' + data.id +  ' com sucesso')

      addTableRow(data.id, data.linkDeAcesso)
    }

    function addTableRow(id, link) {
      var tableBody = document.getElementById('itensTable').getElementsByTagName('tbody')[0];

      var newRow = tableBody.insertRow(tableBody.rows.length);
      var cell1 = newRow.insertCell(0);
      var cell2 = newRow.insertCell(1);

      cell1.textContent = id;
      cell2.textContent = link;
    }

    document.addEventListener('DOMContentLoaded', function() {
      carregarCampanhasDropdown();
    });
    
    function carregarCampanhasDropdown() {
      const campanhaDropdown = document.getElementById('campanhaDropdown');
      const selectedCampanhaLink = campanhaDropdown.value;

      fetch('https://campanhas-api.azurewebsites.net/Campanha')
        .then(response => response.json())
        .then(data => {
          campanhaDropdown.innerHTML = '<option value="" disabled selected>Selecione uma campanha</option>';
          
          salvarDadoNoCache('listaCampanhas', data)

          data.forEach(campanha => {
            const option = document.createElement('option');
            option.value = campanha.linkDeAcesso;
            option.textContent = campanha.linkDeAcesso;
            campanhaDropdown.appendChild(option);
          });
          
          campanhaDropdown.value = selectedCampanhaLink;
        })
        .catch(error => {
          console.error('Erro ao carregar campanhas:', error);
        });
    }
    
    function carregarCampanha() {
      const campanhaDropdown = document.getElementById('campanhaDropdown');
      const selectedCampanhaLink = campanhaDropdown.value;
    
      const campanhaDetails = document.getElementById('campanhaDetails');
    
      campanhaDetails.innerHTML = '';
    
      if (selectedCampanhaLink) {
        fetch(`https://campanhas-api.azurewebsites.net/Campanha`)
        .then(response => response.json())
        .then(data => {
          let campanhasFilter = data.filter(function(x) {
            return x.linkDeAcesso === selectedCampanhaLink;
          })          
          
          let campanha = campanhasFilter[0]
          
          const detailsParagraph = document.createElement('p');
          detailsParagraph.textContent = `${campanha.linkDeAcesso}`;
          campanhaDetails.appendChild(detailsParagraph);
          
          const urisList = document.createElement('ul');
          
          campanha.links.forEach(link => {
            const listItem = document.createElement('li');
            
            listItem.innerHTML = `<span style="float: left;">${link.url}</span><span style="float: right;">${link.cliquesRecebidos}/${campanha.maximoDeCliques}</span>`;
            urisList.appendChild(listItem);
            campanhaDetails.appendChild(urisList);
          })

          salvarDadoNoCache('listaCampanhas', data)

          const btnRedirect = document.createElement('button');
          btnRedirect.id = 'btnRedirect';
          btnRedirect.textContent = 'Acessar Campanha';

          btnRedirect.addEventListener("click", RedirecionarCampanha);
          campanhaDetails.appendChild(btnRedirect);
        })
        .catch(error => {
          console.error('Erro ao carregar campanhas:', error);
        });
      }
    }
    
 function RedirecionarCampanha() {
  
  const campanhaDropdown = document.getElementById('campanhaDropdown');
  const selectedCampanhaLink = campanhaDropdown.value;

  const campanhaData = {
    linkDeAcesso: selectedCampanhaLink
  };

  fetch('https://campanhas-api.azurewebsites.net/Campanha/Redirecionar', {
    method: 'PUT',
    headers: {
      'origin': 'any',
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(campanhaData)
  })
  .then(response => {
    if (response.status === 200) {
      carregarCampanha()
    } else {
      throw new Error('Erro ao cadastrar campanha');
    }
  })
  .catch(error => {
    alert('Erro ao fazer redirecionamento de campanha');
  });

 }