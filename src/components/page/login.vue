<template>
    <div id="login">
        <div class="login-box">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
                <h2 class="bt">用户登录</h2>
                <el-form-item prop="username">
                    <el-input 
                        type="text" 
                        v-model="ruleForm2.username" 
                        auto-complete="off"
                        icon="circle-check"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="pass">
                    <el-input 
                        type="password" 
                        v-model="ruleForm2.pass"
                        @keyup.enter="submitForm"
                        icon="circle-check"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button 
                        type="primary" 
                        style="width:100%"  
                        @click="submitForm"
                        v-loading.fullscreen.lock="fullscreenLoading" 
                        element-loading-text="正在登录···"
                    >登录</el-button>
                </el-form-item>
                <div class="error">{{error}}</div>
            </el-form>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        var validateUserName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'))
            } else {
                axios.post('http://localhost:3100/api/loginUserName',{username:value})
                .then((data)=>{
                    if(data.data.validate){
                        //this.userRight = true
                        //console.log(data.data.validate)

                        this.ruleForm2.username = value
                    }else{
                        callback(new Error('用户名不存在'))
                    }
                })
            }
        };
        var validatePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            }else {
                axios.post('http://localhost:3100/api/loginPassword',
                    {username:this.ruleForm2.username,password:value})
                .then((data)=>{
                    if(data.data.validate){
                        this.ruleForm2.pass = value
                    }else{
                        callback(new Error('密码错误'))
                    }
                })
            }
        };
        return {
            userRight:false,
            //提示信息
            error:'',
            //全屏加载
            fullscreenLoading:false,
            ruleForm2: {
                pass: '',
                username: '123456@yahoo.com'
            },
            rules2: {
                username: [
                    { validator: validateUserName, trigger: 'blur' }
                ],
                pass: [
                    { validator: validatePassword, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm() {
            this.fullscreenLoading = true;
            axios.post('http://localhost:3100/api/loginPassword',
                {username:this.ruleForm2.username,password:this.ruleForm2.pass})
            .then((data)=>{
                this.fullscreenLoading = false;
                if(data.data.validate){
                    this.$router.push({path:'/home'})
                    this.fullscreenLoading = false;
                    /*setTimeout(() => {
                        this.fullscreenLoading = false;
                        this.$router.push({path:'/home'})
                    }, 300);*/
                    
                }else{
                    this.error = '密码错误!'
                }
            })
        },
        openFullScreen() {
            
        }
    }
}
</script>

<style>
#login{
    position: absolute;
    height: 100vh;
    width: 100%;
    background-color: #2d3a4b;
    left: 0;
    top: 0;
}
.login-box{
    width:350px;
    padding:20px;
    margin:80px auto 0;
    -background:#fff;
}
.el-form{
    -border:1px solid #fff;
    animation: boxshadow 3s infinite;
    padding:20px;
    border-radius:10px;
}
@keyframes boxshadow{
    0%{
        box-shadow:0 0 0px #fff;
    }
    50%{
        box-shadow:0 0 15px #fff;
    }
    100%{
        box-shadow:0 0 0px #fff;
    }
}
.bt{
    text-align:center;
    color:#fff;
    font-weight:bolder;
    line-height:100px;
}
.el-input .el-icon-circle-check.green:before {
    color:#0ece61;
}
.error{
    text-align:center;
    color:red;
}
</style>
