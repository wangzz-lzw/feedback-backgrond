pipeline {
    agent any  // 在任何可用节点运行
    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'make build'  // 执行 Shell 命令
            }
        }
        stage('Test') {
            steps {
                sh 'make test'
            }
        }
    }
    post {
        success {
            echo 'Pipeline 成功完成！'
        }
        failure {
            echo 'Pipeline 失败！'
        }
    }
}