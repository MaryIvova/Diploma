pipline {
  agent any
  stages{
  stage('e2e-tests') {
    nodejs('NodeJS2290'){
    step {
      nodejs('NodeJS2290'){
      sh 'npm i'
      sh 'npx playwright install --with-deps'
      sh 'npm t'
      }
     }
    }
  }
}

