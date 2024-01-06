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
    mostrarModalSucesso(data);
  })
  .catch(error => {
    document.getElementById('resultado').innerHTML = `Erro: ${error.message}`;
  });
}


function mostrarModalSucesso(data) {
    // Crie um modal verde ou exiba uma mensagem de sucesso no DOM
    const modalSucesso = document.createElement('div');
    modalSucesso.classList.remove('modal-sucesso');
    modalSucesso.classList.add('modal-sucesso');
    modalSucesso.innerHTML = `
      <p>Campanha cadastrada com sucesso!</p>
      <p>ID: ${data.id}</p>
      <p>Link de Acesso: ${data.linkDeAcesso}</p>
    `;
    document.body.appendChild(modalSucesso);
  }