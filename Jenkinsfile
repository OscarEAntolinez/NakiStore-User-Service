pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Clonar el repositorio
                git 'https://github.com/OscarEAntolinez/NakiStore-User-Service.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Instalar dependencias con npm
                //sh 'npm install'

                dir("node-front-end"){
                    sh 'npm install'
                }

                dir("node-api-users"){
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {

                dir("node-front-end"){
                    sh 'npm test'
                }

                /*dir("node-api-users"){
                    sh 'npm test'
                }*/
            }
        }

        stage('Build') {
            steps {
            // Construir la aplicación con npm run build
            //sh 'npm run build'

                dir("node-front-end"){
                    sh 'npm build'
                }

                /*dir("node-api-users"){
                    sh 'npm build'
                }*/
            }
        }

       stage('Deploy') {
            steps {
            // Desplegar la aplicación (puedes personalizar este paso según tus necesidades)
            // Ejemplo: copiar archivos al servidor de producción
            //sh 'rsync -avz ./dist user@servidor:/ruta/destino'

            
            echo "probando"
            }
        }
    }
}