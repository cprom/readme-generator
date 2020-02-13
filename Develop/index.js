const axios = require('axios')
const inquirer = require('inquirer')
const prompt = inquirer.createPromptModule()
const fs = require('fs')

// axios.get('https://api.github.com/users/cprom')
//   .then(({ data }) => {
//     console.log(data)
//   })
//   .catch(e => console.log(e))


prompt([
  {
    type: 'input',
    name: 'username',
    message: 'What is your username?'

  }

])

  .then(({ username }) => {
    axios.get(`https://api.github.com/users/${username}`)
      .then(({ data: user }) => {
        console.log(user)
      })
  })
  .catch(e => console.log(e))
function writeToFile(fileName, data) {
}

function init() {

}

init();
