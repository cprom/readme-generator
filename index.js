const axios = require('axios')
const prompt = require('inquirer').createPromptModule()
const fs = require('fs')

const generateReadme = username => {
  const readme =
    `
  # ${username.title}
  # ${username.login}
  
  ![](${username.avatar_url})
  
  `
  fs.writeFile('README.md', readme, e => e ? console.log(e) : null)

}

prompt([
  {
    type: 'input',
    name: 'username',
    message: 'Enter your username.'
  }
])

  .then(({ username }) => {
    axios.get(`https://api.github.com/users/${username}`)
      .then(({ data: user }) => {
        generateReadme(user)
      })
      .catch(e => console.error(e))
  })
  .catch(e => console.error(e))




