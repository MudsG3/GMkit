let links = [];
let profileName = "Nome do Perfil";
let profileBio = "Biografia do perfil";
let profilePicUrl = "https://example.com/dog-profile.jpg";

function showDashboard() {
    document.getElementById('main-content').innerHTML = `
        <h1>Dashboard Linktree</h1>
        <div id="link-editor">
            <input type="text" id="link-title" placeholder="Título do Link">
            <input type="text" id="link-url" placeholder="URL do Link">
            <button onclick="addLink()">Adicionar Link</button>
        </div>
        <div id="link-list"></div>
    `;
    updateLinkList();
}

function showAddLink() {
    document.getElementById('main-content').innerHTML = `
        <h1>Adicionar Novo Link</h1>
        <input type="text" id="new-link-title" placeholder="Título do Novo Link">
        <input type="text" id="new-link-url" placeholder="URL do Novo Link">
        <button onclick="addNewLink()">Adicionar</button>
    `;
}

function showEditProfile() {
    document.getElementById('main-content').innerHTML = `
        <h1>Editar Perfil</h1>
        <input type="text" id="profile-name" placeholder="Nome do Perfil" value="${profileName}">
        <input type="text" id="profile-bio" placeholder="Biografia" value="${profileBio}">
        <input type="text" id="profile-pic-url" placeholder="URL da Foto de Perfil" value="${profilePicUrl}">
        <button onclick="updateProfile()">Atualizar Perfil</button>
    `;
}

function addLink() {
    const title = document.getElementById('link-title').value;
    const url = document.getElementById('link-url').value;
    if (title && url) {
        links.push({ title, url });
        updateLinkList();
        updatePreview();
        document.getElementById('link-title').value = '';
        document.getElementById('link-url').value = '';
    }
}

function addNewLink() {
    const title = document.getElementById('new-link-title').value;
    const url = document.getElementById('new-link-url').value;
    if (title && url) {
        links.push({ title, url });
        updatePreview();
        showDashboard();
    }
}

function updateProfile() {
    profileName = document.getElementById('profile-name').value;
    profileBio = document.getElementById('profile-bio').value;
    profilePicUrl = document.getElementById('profile-pic-url').value;
    updatePreview();
    showDashboard();
}

function updateLinkList() {
    const linkList = document.getElementById('link-list');
    linkList.innerHTML = '';
    links.forEach((link, index) => {
        const linkItem = document.createElement('div');
        linkItem.className = 'link-item';
        linkItem.innerHTML = `
            <strong>${link.title}</strong> - ${link.url}
            <button onclick="editLink(${index})">Editar</button>
            <button onclick="deleteLink(${index})">Excluir</button>
        `;
        linkList.appendChild(linkItem);
    });
}

function updatePreview() {
    document.getElementById('preview-profile-pic').src = profilePicUrl;
    document.getElementById('preview-profile-name').textContent = profileName;
    document.getElementById('preview-profile-bio').textContent = profileBio;

    const previewLinks = document.getElementById('preview-links');
    previewLinks.innerHTML = '';
    links.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.className = 'preview-link';
        linkElement.textContent = link.title;
        previewLinks.appendChild(linkElement);
    });
}

function editLink(index) {
    const link = links[index];
    document.getElementById('main-content').innerHTML = `
        <h1>Editar Link</h1>
        <input type="text" id="edit-link-title" value="${link.title}">
        <input type="text" id="edit-link-url" value="${link.url}">
        <button onclick="saveEditedLink(${index})">Salvar</button>
    `;
}

function saveEditedLink(index) {
    const title = document.getElementById('edit-link-title').value;
    const url = document.getElementById('edit-link-url').value;
    if (title && url) {
        links[index] = { title, url };
        updateLinkList();
        updatePreview();
        showDashboard();
    }
}

function deleteLink(index) {
    links.splice(index, 1);
    updateLinkList();
    updatePreview();
}

// Inicializar a dashboard
showDashboard();
updatePreview();
