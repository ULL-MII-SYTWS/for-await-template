async function* fetchCommits(repo) {
    let url = `https://api.github.com/repos/${repo}/commits`;

    while (url) {
      // fill the code
    }
}

export { fetchCommits };
