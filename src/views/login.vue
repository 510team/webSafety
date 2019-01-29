<template>
    <div class="login-container">
        <el-form :model="loginForm" label-width="60px" :rules="formRules" ref="loginForm">
            <el-form-item label="账号" prop="user">
                <el-input v-model="loginForm.user" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-button type="primary" @click="onLogin">登录</el-button>
        </el-form>
    </div>
</template>
<script>
import axios from "axios";
import service from '@/service';
    export default{
        data(){
            return {
                loginForm:{
                    user:'',
                    password:''
                },
                formRules: {
                    user: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            onLogin(){
                this.$refs.loginForm.validate((valid) => {
                    if(valid){
                        service.login({user:this.loginForm.user,password:this.loginForm.password}).then(res=>{
                            if(res.status === 'success'){
                                this.$router.push('/list')
                            }
                        })
                    }
                })
            }
        }
    }
</script>
<style lang="less">
.login-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    padding: 40px 40px;
    border: 1px solid #eee;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    button {
        width: 160px;
        margin: 0 auto;
    }
}
</style>