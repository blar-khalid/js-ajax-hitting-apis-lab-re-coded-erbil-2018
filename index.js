const url = "https://github.com/blar-khalid"

// repos
function getRepositories() {
  const name = document.getElementById("username").value
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", R)
  xhr.open("GET",url+ "/users/" + name + "/repos")
  xhr.send();
}
function showR() {
  const repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(repo => {
    const username = 'username="' + repo.owner.login + '"'
    const repoName = 'repository="' + repo.name + '"'
    return(`
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${repoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
          </li>`
          )
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}


// Commits
function getCommits(el) {
  const repoName = el.dataset.repository
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", showC)
  xhr.open("GET", url+ "/repos/" + el.dataset.username + "/" + repoName + "/commits")
  xhr.send()
}
function showC() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

// branches

function getBranches(el) {
  const repoName = el.dataset.repository
  
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", showb)
  xhr.open("GET", url + "/repos/" + el.dataset.username + "/" + repoName + "/branches")
  xhr.send()
}
function showb() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}