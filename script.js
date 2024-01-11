let linksArray = [];

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

    // const itensCriadosElement = document.getElementById('itensCriados')

    // var itemCriadoParagraph = document.createElement('tr')
    // itemCriadoParagraph.textContent = `ID: ${data.id} | Link de Acesso: ${data.linkDeAcesso}`
    
    // itensCriadosElement.append(itemCriadoParagraph)

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