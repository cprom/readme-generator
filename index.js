const axios = require('axios')
const prompt = require('inquirer').createPromptModule()
const fs = require('fs')



const generateReadme = (username, projectTitle, contributors) => {


  const readme =
    `
  ![User Avatar](${username.avatar_url})

  # Project Title
  ${projectTitle.name}

  ### Project Description
  ${projectTitle.description}  

  ### Contributor
  ${contributors[0].login}
  ${contributors[1].login}
  ${contributors[2].login}
  

  ### License 
  key: ${projectTitle.license}
  name: ${projectTitle.license}

  ### Username
  ${username.login}
  
  
  ### Email: 
  ${username.email}

  * Title
  * Description
  * Table of Contents
  * Installation
  * Usage
  * License
  * Contributing
  * Tests
  * Questions
 
  
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

  }

])


  .then(({ username, projectTitle, contributors }) => {
    axios.get(`https://api.github.com/users/${username}`)
      .then(({ data: user }) => {
        axios.get(`https://api.github.com/repos/${username}/${projectTitle}`)
          .then(({ data: title }) => {
            axios.get(`https://api.github.com/repos/${username}/${projectTitle}/contributors`)
              .then(({ data: contributors }) => {
                for (let i = 0; i < contributors.length; i++) {

                  console.log(contributors[i].login)
                }
                // console.log('User call ---------------')
                // console.log(user)
                // console.log('Title/project call --------------')
                // console.log(title)
                // console.log('Contributor call -------------------')
                // console.log(contributors)


                generateReadme(user, title, contributors)

              })

          })
        // .catch(e => console.error(e))

      })

  })

  .catch(e => console.error(e))

