<template>
    <div class="login-container">
        <el-form label-width="40px">
            <el-form-item label="账号">
                <el-input v-model="user.name" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="user.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-button type="primary" @click="onLogin">登录</el-button>
        </el-form>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                user:{
                    name:'',
                    mobile:''
                }
            }
        },
        methods:{
            onLogin(){}
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