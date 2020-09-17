<template>
    <div class="container">
        <div class="logo">
            <div class="title">知道</div>
            <div class="content">有问题 上知道</div>
        </div>
        <div class="spin">
            <a-spin style="margin: 20px 0" :spinning="spinning"/>
        </div>
        <!--登录-->
        <div class="login">
            <a-tabs default-active-key="1" @change="callback">
                <a-tab-pane key="1" tab="密码登录">
                    <div style="width: 100%;display: flex;flex-direction:column;align-items: center">
                    <a-form-model
                            ref="loginForm"
                            :model="loginForm"
                            :rules="rulesLogin"
                            :label-col="labelCol"
                            :wrapper-col="wrapperCol "
                    >
                        <a-form-model-item ref="name"  prop="name">
                            <a-input
                                    allow-clear
                                    v-model="loginForm.name"
                                    @blur="
                                  () => {
                                    $refs.name.onFieldBlur();
                                  }
                                "
                                    v-decorator="[
          'userName',
          { rulesLogin: [{ required: true, message: 'Please input your username!' }] },
        ]"
                                    placeholder="用户名"
                            >
                                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
                            </a-input>
                        </a-form-model-item>
                        <a-form-model-item ref="password"  prop="password">
                            <a-input-password
                                    v-model="loginForm.password"
                                    @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
                                    v-decorator="[
          'password',

          { rulesLogin: [{ required: true, message: 'Please input your Password!' }] },
        ]"
                                    type="password"
                                    placeholder="密码"
                            >
                                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
                            </a-input-password>
                        </a-form-model-item>
                        <a-form-item>
                            <a-checkbox
                                    v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
                            >
                                Remember me
                            </a-checkbox>
                            <a class="login-form-forgot" href="">
                                Forgot password
                            </a>
                            <a-button type="primary" html-type="submit" class="login-form-button" @click.native.prevent="handleLogin">
                                Log in
                            </a-button>
                        </a-form-item>
                    </a-form-model>
                    </div>
                </a-tab-pane>
                <a-tab-pane key="2" tab="账号注册" force-render>
                    <div style="width: 100%;display: flex;flex-direction:column;align-items: center">
                        <a-form-model
                                ref="registerForm"
                                :model="registerForm"
                                :rules="rulesRegister"
                                :label-col="labelCol"
                                :wrapper-col="wrapperCol "
                        >
                            <a-form-model-item ref="name"  prop="name">
                                <a-input
                                        allow-clear
                                        v-model="registerForm.name"
                                        @blur="
                                  () => {
                                    $refs.name.onFieldBlur();
                                  }
                                "
                                        v-decorator="[
          'userName',
          { rulesRegister: [{ required: true, message: 'Please input your username!' }] },
        ]"
                                        placeholder="请输入你的用户名"
                                >
                                </a-input>
                            </a-form-model-item>
                            <a-form-model-item ref="password"  prop="password">
                                <a-input-password
                                        v-model="registerForm.password"
                                        @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
                                        v-decorator="[
          'password',

          { rulesRegister: [{ required: true, message: 'Please input your Password!' }] },
        ]"
                                        type="password"
                                        placeholder="密码"
                                >
                                </a-input-password>
                            </a-form-model-item>
                            <a-form-item>
                                <a-button type="primary" html-type="submit" class="login-form-button" @click.native.prevent="handleRegister">
                                    立即注册
                                </a-button>
                            </a-form-item>
                        </a-form-model>
                    </div>
                </a-tab-pane>
            </a-tabs>
        </div>
        <div class="footer">

        </div>
    </div>
</template>

<script>

    import {Form, Input, Checkbox, Button, Icon, FormModel, Menu, Tabs,message,Spin} from 'ant-design-vue'

    export default {
        data() {
            return {
                spinning: false,
                labelCol: { span: 4 },
                wrapperCol: { span: 24 },
                loginForm: {
                    name: 'admin',
                    password:'123456'
                },
                registerForm:{
                    name:'',
                    password:''
                },
                rulesLogin:{
                    name: [
                            { required: true, message: '用户名不得为空', trigger: 'blur' },
                        { min:3, max: 11, message: '请输入正确的用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '密码不得为空', trigger: 'blur' },
                        { min: 3, max: 8, message: '请输入正确的密码', trigger: 'blur' },
                    ],
                },
                rulesRegister:{
                    name: [
                        { required: true, message: '用户名不得为空', trigger: 'blur' },
                        { min:3, max: 11, message: '请输入3~11个字符', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '密码不得为空', trigger: 'blur' },
                        { min: 3, max: 8, message: '请输入3~8个字符', trigger: 'blur' },
                    ],
                }
            }
        },
        components: {
            AForm: Form,
            AFormItem: Form.Item,
            AFormModel:FormModel,
            AFormModelItem:FormModel.Item,
            AInput: Input,
            AInputPassword: Input.Password,
            ACheckbox: Checkbox,
            AButton: Button,
            AIcon: Icon,
            AMenu:Menu,
            AMenuItem:Menu.Item,
            ATabs:Tabs,
            ATabPane:Tabs.TabPane,
            message,
            ASpin:Spin
        },
        name: "login",
        beforeCreate() {
            this.form = this.$form.createForm(this, {name: 'normal_login'});
        },
        methods: {
            handleLogin() {

                // const vm = this;
                this.$refs.loginForm.validate(valid => {
                    this.spinning = !this.spinning;
                    if (valid) {
                        this.$store.dispatch('user/login', this.loginForm).then(() => {
                            console.log(66666666666)
                            this.$router.push('/index')
                        }).catch(() => {
                            this.spinning = !this.spinning;
                            console.log(666666666777766)
                        })
                    } else {
                        console.log('error submit!!')
                        this.spinning = !this.spinning;
                        return false
                    }
                })
            },
            handleRegister() {
                this.$refs.registerForm.validate(valid => {
                    this.spinning = !this.spinning;
                    if (valid) {
                        this.$store.dispatch('user/Register', this.registerForm).then(() => {
                            this.$message.success('注册成功')
                        }).catch(() => {
                            this.spinning = !this.spinning;
                        })
                    } else {
                        console.log('error submit!!')
                        this.spinning = !this.spinning;
                        return false
                    }
                })
            },
            callback(key) {
                console.log(key);
            },
        }
    }
</script>

<style lang="less" scoped>
    .container {
        width: 100%;
        background: url('./img/bg.png') no-repeat;
        background-size: cover;
        height: 800px;
        overflow: auto;
        position: fixed;
        background-color: #b8e5f8;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .logo {
            width: 20%;
            height: 100px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .title{
                font-size: 60px;
                letter-spacing: 10px;
                color:#0084FF ;
            }
            .content{
                color: #484B4C;
                letter-spacing: 5px;
                font-size: 13px;
                font-weight: bolder;
            }
        }
        .spin{
            width: 60px;
            height: 50px;
        }
        .login {
            margin-bottom: 110px;
            width: 350px;
            height: 450px;
            background: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            .ant-form{
                width: 80%;
            }
        }
    }

</style>
<style lang="less">
    .ant-tabs-nav{
        margin: 10px 20px;
        padding: 0 20px;
        font-size: 16px;
    .ant-tabs-tab-active{
        font-weight: 800;
        color: #000;
    }
    }
    .ant-tabs-ink-bar{
        height: 4px;
    }
    .ant-tabs-nav .ant-tabs-tab:hover{
        color:#000;
    }

    #components-form-demo-normal-login .login-form {
        max-width: 300px;
    }

    #components-form-demo-normal-login .login-form-forgot {
        float: right;
    }

    #components-form-demo-normal-login .login-form-button {
        width: 100%;
    }
</style>
