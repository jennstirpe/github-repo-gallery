//div with profile info
const overview = document.querySelector(".overview");
//github username
const username = "jennstirpe";
const repoList = document.querySelector(".repo-list");


//fetch user info from github
const githubInfo = async function() {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const userData = await res.json();

    //console.log(data);
    displayInfo(userData);
};
githubInfo();

//display user info
const displayInfo = function(info) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src="${info.avatar_url}" />
        </figure>
        <div>
            <p><strong>Name:</strong> ${info.name}</p>
            <p><strong>Bio:</strong> ${info.bio}</p>
            <p><strong>Location:</strong> ${info.location}</p>
            <p><strong>Number of public repos:</strong> ${info.public_repos}</p>
        </div>
    `;
    overview.append(div);
    getRepoInfo();
};

//fetch repo data
const getRepoInfo = async function() {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await res.json();

    //console.log(data);
    displayRepo(repoData);
}

//display repo names
const displayRepo = function(repos) {

    for(let repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }

}