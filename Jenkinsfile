pipeline {
    agent any

    tools {
        nodejs 'Node18'
    }

    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/Vishal-Kawade00/Jenkins1.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Serve App') {
            steps {
                bat 'start /B npx serve -s dist -l 5173'
            }
        }

    }
}