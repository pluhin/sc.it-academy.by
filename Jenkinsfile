@@ -1,19 +0,0 @@
pipeline {
    agent any
    stages {
        stage('Create sanboxes') {
            steps { 
<<<<<<< HEAD
                sh 'printenv'

=======
                sh """
                printenv
                echo "========================================================================================"
                if [ ! -z $CHANGE_BRANCH ]; then
                    sh "mkdir -p /var/www/sandbox/$CHANGE_BRANCH"
                    sh "ln -s $WORKSPACE /var/www/sandbox/$CHANGE_BRANCH/$CHANGE_AUTHOR || echo 'sandbox is exist'"
                fi
                """
>>>>>>> Jenkis changes
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
