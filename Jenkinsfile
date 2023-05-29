pipeline {
    agent any

    tools {nodejs "nodejs"}

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
                    sh 'npm install bootstrap reactstrap'
                    sh 'npm install axios'
                    sh 'npm install react react-dom react-scripts'
                    sh 'npm install --save-dev web-vitals'
                }

                dir("node-api-users"){
                    sh 'npm install nodemon'
                    sh 'npm install express'
                    sh 'npm install cors'
                    sh 'npm install mongoose'
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