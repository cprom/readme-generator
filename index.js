const axios = require('axios')
const prompt = require('inquirer').createPromptModule()
const fs = require('fs')



const generateReadme = (username, projectTitle, contributors, install, tableOfContent, tests) => {

  const readme =
    `
![User Avatar](${username.avatar_url})

### Username
${ username.login}

### Email:
${ username.email}

# Project Title
  ${projectTitle.name}

### Project Description
  ${projectTitle.description}  

### Table of Content
${tableOfContent}

### Contributor
  ${contributors[0].login}
  ${contributors[1].login}
  ${contributors.login}
  

### Installation Instructions
${install}

### License
key: ${ projectTitle.license.key}
name: ${ projectTitle.license.name}

### Tests
${tests}


      `
  fs.writeFile('README.md', readme, e => e ? console.log(e) : null)

}

prompt([
  {
    type: 'input',
    name: 'username',
    message: 'Enter your username.'
  },
  {
    type: 'input',
    name: 'projectTitle',
    message: 'What is the name of your project?'
  },
  {
    type: 'input',
    name: 'install',
    message: 'Please describe the installation process'
  },
  {
    type: 'input',
    name: 'tableOfContent',
    message: 'Please create the table of content'
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Please describe your test'
  }

])



  .then(({ username, projectTitle, contributors, install, tableOfContent, tests }) => {
    axios.get(`https://api.github.com/users/${username}`)
      .then(({ data: user }) => {
        axios.get(`https://api.github.com/repos/${username}/${projectTitle}`)
          .then(({ data: title }) => {
            axios.get(`https://api.github.com/repos/${username}/${projectTitle}/contributors`)
              .then(({ data: contributors }) => {

                for (let i = 0; i < contributors.length; i++) {

                  console.log(contributors[i].login)

                  generateReadme(user, title, contributors, install, tableOfContent, tests)

                }

              })

          })


      })

  })

  .catch(e => console.error(e))

