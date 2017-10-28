<template>
    <div id="login">
        <canvas-login></canvas-login>
        <div class="login-box">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
                <h2 class="bt">用户登录</h2>
                <el-form-item prop="username">
                    <el-input 
                        type="text" 
                        v-model="ruleForm2.username" 
                        auto-complete="off"
                        icon="icon iconfont icon-xuanzhong1"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="pass">
                    <el-input 
                        type="password" 
                        v-model="ruleForm2.pass"
                        @keyup.enter.native="submitForm"
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

import api from '../api/api'
import { setStore } from '../../config/utils'
import canvasLogin from '@/components/page/canvaslogin/canvaslogin2'

//元素居中方法
function _center(dom){
    dom.style.position = 'absolute';
    dom.style.top = '50%';
    dom.style.left = '50%';
    dom.style['margin-top'] = - dom.offsetHeight / 2 + 'px';
    dom.style['margin-left'] = - dom.offsetWidth / 2 + 'px';
}
export default {
    components:{
        canvasLogin
    },
    data() {
        //邮箱正则
        let emailRex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        var validateUserName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'))
            }else if(!emailRex.test(value)){
                callback(new Error('请输入正确的邮箱'))
            } else {
                api.haveParams('loginUserName',{username:value})
                .then((data)=>{
                    if(data.data.validate){
                        this.ruleForm2.username = value
                    }else{
                        callback(new Error('用户名将自动注册'))
                    }
                })
            }
        };
        //密码正则
        let passRex = /^[a-zA-Z]\w{5,17}$/
        var validatePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            }else if(!passRex.test(value)){
                callback(new Error('密码为字母开头的6-18个字符'))
            }else {
                api.haveParams('loginPassword',
                    {username:this.ruleForm2.username,password:value,check:true})
                .then((data)=>{
                    if(data.data.validate){
                        this.ruleForm2.pass = value
                    }else{
                        callback(new Error('密码错误'))
                    }
                })
            }
        };
        var validatePasswordOninput = (rule, value, callback) => {
            callback(new Error('sdfsdfsd'));
        }
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
            this.error = ''
            this.fullscreenLoading = true;
            api.haveParams('loginPassword',
                {username:this.ruleForm2.username,password:this.ruleForm2.pass})
            .then((data)=>{
                this.fullscreenLoading = false;
                if(data.data.validate){
                    // 将登录用户缓存到本地
                    setStore('username',this.ruleForm2.username)
                    this.$router.push({path:'/home'})
                    this.fullscreenLoading = false;
                }else{
                    this.error = '密码错误!'
                }
            })
        }
    },
    mounted(){
        let w = document.documentElement.offsetWidth;
        let h = document.documentElement.offsetHeight;

        let loginBox = document.querySelector('.login-box')
        _center(loginBox)
    }
}
</script>

<style>
#login{
    position: absolute;
    height: 100vh;
    width: 100%;
    -background-color: #2d3a4b;
    left: 0;
    top: 0;
}
.login-box{
    position:absolute;
    left:50%;
    top:50%;
    width:350px;
    animation: boxshadow 3s infinite;
    border-radius:10px;
    background:rgba(112, 128, 144, 0.2);
}
.el-form{
    padding:20px;
    
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
