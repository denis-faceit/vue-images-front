pipeline {
  agent any 
  
  stages {
    stage("build") {
      steps {
        echo 'Hello from build stage!'
        sh 'npm i'
      }
    }
    stage("scanner") {
      steps {
        echo 'Hello from run scanner'
        sh 'sonar-scanner'
      }
    }
  }
}
