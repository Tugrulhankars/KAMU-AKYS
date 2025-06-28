pipeline {
    agent any 
    environment {
        IMAGE_NAME = "kamu-akys-web-sitesi"
        IMAGE_TAG = "latest"
        DOCKER_HUB_REPO = "tugrulhan/kamu-akys-web-sitesi"
        DOCKER_HUB_CREDENTIALS = "docker-hub-credentials"
    }
    stages {
        stage('Checkout Branch') {
            steps {
                checkout scm
            }
        }

        stage('Build Project') {
            steps {
                dir('Kamu-AKYS/kamu-akys') {
                    bat 'npm install'
                }
            }
        }

        stage('Docker Build') {
            steps {
                dir('Kamu-AKYS/kamu-akys') {
                    bat "docker build -t  $DOCKER_HUB_REPO:$IMAGE_TAG ."
                }
            }
        }

         stage('Docker Login & Push') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "$DOCKER_HUB_CREDENTIALS") {
                        docker.image("$DOCKER_HUB_REPO:$IMAGE_TAG").push()
                    }
                }
            }
        }
    }
}
