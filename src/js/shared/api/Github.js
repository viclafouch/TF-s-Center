import Release from "@shared/models/Release.class";

export const fetchGithubReleased = () =>
  fetch('https://api.github.com/repos/viclafouch/TFs-Center/releases')
    .then(e => e.json())
    .then(json => json.map(e => new Release(e)))
    .catch(error => {
      throw error
    })