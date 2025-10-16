pipeline {
    agent any

    environment {
        APP_SERVER = 'ubuntu@<App_Server_IP>'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/ishansingh7/TravelGo.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t backend:latest ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t frontend:latest ./frontend'
            }
        }

        stage('Deploy to App Server') {
            steps {
                sshagent(['app-server']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no $APP_SERVER '
                        # Save Docker images as tar
                        docker save backend:latest -o backend.tar
                        docker save frontend:latest -o frontend.tar
                    '

                    # Copy images to app server
                    scp backend.tar $APP_SERVER:~
                    scp frontend.tar $APP_SERVER:~

                    ssh $APP_SERVER '
                        # Load images on server
                        docker load -i backend.tar
                        docker load -i frontend.tar

                        # Remove old containers if exist
                        docker stop backend || true
                        docker rm backend || true
                        docker stop frontend || true
                        docker rm frontend || true

                        # Run new containers
                        docker run -d -p 5000:5000 --name backend backend:latest
                        docker run -d -p 80:80 --name frontend frontend:latest

                        # Clean up tar files
                        rm -f backend.tar frontend.tar
                    '
                    """
                }
            }
        }
    }
}
