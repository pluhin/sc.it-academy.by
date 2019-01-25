pipeline {
    agent any
    stages {
        stage('Create sanboxes') {
            steps { 
                sh 'printenv'
                sh "mkdir -p /var/www/sandbox/$CHANGE_BRANCH"
                //slackSend (color: '#FFFF00', message: "STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                sh "ln -s $WORKSPACE /var/www/sandbox/$CHANGE_BRANCH/$CHANGE_AUTHOR || echo 'sandbox is exist'"
            }
        }
    }
    post {
            success {
                slackSend (color: '#00FF00', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
            }
            failure {
                slackSend (color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
            }
        }
}