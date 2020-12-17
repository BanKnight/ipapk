module.exports = (one = {}) => 
`<a href="${one.url}" class="list-group-item">
    <h4 class="list-group-item-heading">${one.name}</h4>
    <span class="label label-primary">${one.version}</span>
    <span class="label label-success">${one.build}</span>
    <span class="label label-warning">${one.size}</span>
    <span class="label label-danger">${one.mtime}</span>
    <span class="label label-info">${one.filename}</span>
  </a>`