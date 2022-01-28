//div with profile info
const overview = document.querySelector(".overview");
//github username
const username = "jennstirpe";
const repoList = document.querySelector(".repo-list");
//div with search and repo UL
const reposContainer = document.querySelector(".repos");
//individual repo data
const repoData = document.querySelector(".repo-data");
//back to repo button
const viewReposBtn = document.querySelector(".view-repos");
//search by name input
const filterInput = document.querySelector(".filter-repos");

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
    filterInput.classList.remove("hide");

    for(let repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }

}

//click event targeting repo list
repoList.addEventListener("click", function(e) {
    if(e.target.matches("h3")) {
        const repoName = e.target.innerText;
        repoInfo(repoName);
    };
});

//get repo language
const repoInfo = async function(repoName) {
    const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await res.json();
    //fetch languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    
    //make list of languages
    let languages = [];
    for (let key in languageData) {
        languages.push(key);
    };

    displayRepoInfo(repoInfo, languages);
};

//display specific repo info
const displayRepoInfo = function(repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    reposContainer.classList.add("hide");
    viewReposBtn.classList.remove("hide");

    const repoDiv = document.createElement("div");
    repoDiv.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
            <p>Description: ${repoInfo.description}</p>
            <p>Default Branch: ${repoInfo.default_branch}</p>
            <p>Languages: ${languages.join(", ")}</p>
            <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(repoDiv);
    
};

//return to all repos list
viewReposBtn.addEventListener("click", function() {
    repoData.classList.add("hide");
    reposContainer.classList.remove("hide");
    viewReposBtn.classList.add("hide");
});


filterInput.addEventListener("input", function(e) {
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const lowercaseSearchText = searchText.toLowerCase();

    for(const repo of repos) {
        const lowercaseRepo = repo.innerText.toLowerCase();
        if(lowercaseRepo.includes(lowercaseSearchText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }


});