<template>
    <div>
        <navigate/>
        <div class="Content">
            <div class="top">
                <div class="fengmian">
                    <div class="bg_button">
                        <a-upload
                                name="avatar"
                                list-type="picture-card"
                                class="avatar-uploader"
                                :show-upload-list="false"
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                :before-upload="beforeUpload"
                                @change="handleChange"
                        >
                            <div style="display: flex;align-items: center;height: 30px;justify-content: space-around">
                                <a-icon :type="loading ? 'loading' : 'camera'" :style="{ fontSize: '20px', color: '#D3D3D3' }" />
                                <div class="ant-upload-text">
                                    编辑封面图片
                                </div>
                            </div>
                        </a-upload>
                    </div>
                    <img v-if="imageUrl" :src="imageUrl" class="bg">
                    <img v-else src="../assets/img/userbg.jpg" class="bg">
                </div>
                <div class="top_bottom">
                    <div class="avatar">
                        <img src="../assets/img/moren_avatar.jpg" style="height: 160px;width: 160px;border-radius: 5px">
                    </div>
                    <div class="information">
                        <div class="name">{{this.userinfoList.username}}</div>
                        <div class="oneinfo">{{this.userinfoList.headline}}</div>
                    </div>
                </div>
                <div class="edit_information">
                    <a-collapse accordion  :bordered="false" style="width: 100%">
                        <a-collapse-panel key="1" header="查看详细资料" :style="customStyle" >
                            <a-descriptions :column="1">
                                <a-descriptions-item label="性别" v-if="this.userinfoList.gender && this.userinfoList.gender !== ''">
                                    {{this.userinfoList.gender}}
                                </a-descriptions-item>
                                <a-descriptions-item label="居住地" v-if="this.userinfoList.locations && this.userinfoList.locations.length !== 0 ">
                                    <span v-for="(item,index) in this.userinfoList.locations" :key="index+'info1'">
                                        {{item}}
                                    </span>
                                </a-descriptions-item>
                                <a-descriptions-item label="所在行业" v-if="this.userinfoList.business && this.userinfoList.business !== ''">
                                    {{this.userinfoList.business}}
                                </a-descriptions-item>
                                <a-descriptions-item label="职业经历" v-if="this.userinfoList.employments && this.userinfoList.employments.length !== 0 ">
                                    <span v-for="(item,index) in this.userinfoList.employments" :key="index+'info2'">
                                        {{item.company}} · {{item.job}}
                                    </span>
                                </a-descriptions-item>
                                <a-descriptions-item label="教育经历" v-if="this.userinfoList.educations && this.userinfoList.educations.length !== 0 " >
                                    <span v-for="(item,index) in this.userinfoList.educations" :key="index+'info3'">
                                        {{item.school}} · {{item.major}}
                                    </span>
                                </a-descriptions-item>
                                <a-descriptions-item label="教育经历" v-if="this.userinfoList.educations && this.userinfoList.educations.length !== 0 ">
                                    <span v-for="(item,index) in this.userinfoList.educations" :key="index+'info4'">
                                        {{item.school}} · {{item.major}}
                                    </span>
                                </a-descriptions-item>
                                <a-descriptions-item label="个人简介" v-if="this.userinfoList.headline !== undefined ">
                                    <a-input  type="textarea" style="color: black;background: #fff;width:360px;height: 80px" :disabled="true" :defaultValue="this.userinfoList.headline"/>
                                </a-descriptions-item>
                            </a-descriptions>
                        </a-collapse-panel>
                    </a-collapse>
                    <a-button  style="margin: 10px 0"  @click="showModal">编辑个人资料</a-button>

                    <!--编辑资料-->
                    <div>
                        <a-modal
                                ref="form1"
                                title="编辑个人资料"
                                :visible="visible"
                                :confirm-loading="confirmLoading"
                                @ok="handleOk"
                                @cancel="handleCancel"
                        >
                            <a-form-model
                                    ref="updateForm"
                                    :model="form"
                                    :rules="rules"
                                    :label-col="labelCol"
                                    :wrapper-col="wrapperCol"
                            >
                                <a-form-model-item label="用户名">
                                    <a-input
                                            style="width: 100px"
                                            :disabled="true"
                                            :placeholder="this.userinfoList.username"
                                    >
                                    </a-input>
                                </a-form-model-item>
                                <a-form-model-item label="性别" required prop="gender">
                                    <a-radio-group v-model="form.gender" v-decorator="['radio-group']"  :defaultValue="this.userinfoList.gender ? this.userinfoList.gender : '男'">
                                        <a-radio value="男">
                                            男
                                        </a-radio>
                                        <a-radio value="女">
                                            女
                                        </a-radio>
                                    </a-radio-group>
                                </a-form-model-item>
                                <a-form-model-item  label="居住地" prop="register">
                                    <a-input
                                            style="width: 100px"
                                            allow-clear
                                            v-model="form.register"
                                            :placeholder="this.userinfoList.locations && this.userinfoList.locations.length !== 0 ? this.userinfoList.locations[0] : ''"
                                    >
                                    </a-input>
                                </a-form-model-item>
                                <a-form-model-item label="所在行业"prop="business">
                                    <a-select
                                            v-model="form.business"
                                            :placeholder="this.userinfoList.business ? this.userinfoList.business :''"
                                            style="width: 170px"
                                            @change="handleChangeOption"
                                            defa
                                    >
                                        <a-select-option  v-for="(item,index) in businessoption" :value="item" :key="index+'info6'">
                                            {{item}}
                                        </a-select-option>
                                    </a-select>
                                </a-form-model-item >
                                <a-form-model-item  prop="school" label="教育经历">
                                    <a-input
                                            style="width: 170px;margin-right: 20px"
                                            allow-clear
                                            v-model="form.school"
                                            v-decorator="[
          'userName',
          { ruleseducations: [{ required: true, message: 'Please input your 学习或教育机构名' }] },
        ]"
                                            :placeholder="this.userinfoList.educations && this.userinfoList.educations.length !== 0 ? this.userinfoList.educations[0].school : '学习或教育机构名'">
                                    </a-input>
                                </a-form-model-item>
                                <a-form-model-item  prop="major" label="    " :colon="false">
                                    <a-input
                                            style="width: 170px"
                                            allow-clear
                                            v-model="form.major"
                                            :placeholder="this.userinfoList.educations && this.userinfoList.educations.length !== 0 ? this.userinfoList.educations[0].major : '专业方向(选填)'"
                                    >
                                    </a-input>
                                </a-form-model-item>
                                <a-form-model-item prop="diploma" label="    " :colon="false">
                                    <a-select
                                            v-for="(item,index) in this.userinfoList.educations"
                                            :key="index+'info9'"
                                            v-model="form.diploma"
                                            placeholder="学历"
                                            style="width: 170px"
                                            @change="handleChangeOption"
                                            :defaultValue="item.diploma"
                                    >
                                        <a-select-option
                                                v-for="(item,index) in Educationsoption"
                                                :value="item.value"
                                                :key="item.value"
                                        >
                                            {{item.label}}
                                        </a-select-option>
                                    </a-select>
                                </a-form-model-item>
                                <a-form-model-item prop="years" label="    " :colon="false">
                                    <a-range-picker v-model="form.years"
                                                    @change="onChange"
                                                    :placeholder="['入学年份', '毕业年份']" v-decorator="['range-picker', rangeConfig]" />
                                </a-form-model-item>
                                <a-form-model-item label="一句话介绍" prop="introduce">
                                    <a-input
                                            style="width: 360px;"
                                            allow-clear
                                            v-model="form.introduce"
                                            v-decorator="[
          'userName',
          { ruleseducations: [{ required: true, message: 'Please input your 学习或教育机构名' }] },
        ]"
                                            :placeholder="this.userinfoList.headline ? this.userinfoList.headline : ''"
                                    >
                                    </a-input>
                                </a-form-model-item>
                                <a-form-model-item label="个人简介" prop="myintroduce">
                                    <a-textarea v-model="form.myintroduce" :placeholder="this.userinfoList.headline ? this.userinfoList.headline : ''" :rows="4" />
                                </a-form-model-item>
                            </a-form-model>
                        </a-modal>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="bottom_left">
                </div>
                <div class="bottom_right"></div>
            </div>
        </div>
    </div>

</template>

<script>
    import navigate from "../components/navigate";
    import {Upload, Icon, Collapse, Button, Descriptions, Input, Modal, FormModel, Checkbox,DatePicker,
    Radio,Select} from 'ant-design-vue'


    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    export default {
        data(){
            return{
                text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
                customStyle:
                    'background: #fff;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden;',
                loading: false,
                imageUrl: '',
                labelCol: { span: 4 },
                wrapperCol: { span: 20 },
                ModalText: 'Content of the modal',
                visible: false,
                confirmLoading: false,
                userForm:{
                    name: JSON.parse(window.sessionStorage.getItem('userAccount')).username,
                    password:JSON.parse(window.sessionStorage.getItem('userAccount')).password
                },
                form:{
                    name:'',
                    gender:'',
                    register:'',
                    business:undefined,
                    school:'',
                    major:'',
                    years:undefined,
                    diploma:undefined,
                    introduce:'',
                    myintroduce:''
                },
                userinfoList:[],
                rules: {
                    // business: [{ required: true, message: 'Please select Activity zone', trigger: 'blur' }],
                    // diploma: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
                    // date1: [{ required: true, message: 'Please pick a date', trigger: 'change' }],
                    // type: [
                    //     {
                    //         type: 'array',
                    //         required: true,
                    //         message: 'Please select at least one activity type',
                    //         trigger: 'change',
                    //     },
                    // ],
                    // gender: [
                    //     { required: true, message: 'Please select activity resource', trigger: 'change' },
                    // ],
                    // desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
                },
                Educationsoption:[{
                    label : '高中及以下',
                    value:1
                },{
                    label : '大专',
                    value:2
                },{
                    label : '本科',
                    value:3
                },{
                    label : '硕士',
                    value:4
                },{
                    label : '博士及以上',
                    value:5
                },
                ],
                businessoption:['保险业','采矿','能源','餐饮','宾馆','电讯业','房地产','服务','服装业','公益组织','广告业','航空航天','化学','健康','保健','建筑业','教育','培训','计算机','金属冶炼','警察','消防','军人','会计','美容','媒体','出版','木材','造纸','零售','批发','农业','旅游业','司法','律师','司机','体育运动','学术研究','演艺','医疗服务','艺术','设计','银行','金融','因特网','音乐舞蹈','邮政快递','运输业','政府机关','机械制造','咨询'],
                rangeConfig: {
                    rules: [{ type: 'array', required: true, message: 'Please select time!' }],
                }
            }
        },
        components:{
            AUpload:Upload,
            AIcon:Icon,
            navigate,
            ACollapse:Collapse,
            ACollapsePanel:Collapse.Panel,
            AButton:Button,
            ADescriptions:Descriptions,
            ADescriptionsItem:Descriptions.Item,
            AInput:Input,
            ATextarea:Input.TextArea,
            AModal:Modal,
            AFormModel:FormModel,
            AFormModelItem:FormModel.Item,
            AInputPassword: Input.Password,
            ACheckbox: Checkbox,
            ARangePicker:DatePicker.RangePicker,
            ARadio:Radio,
            ARadioGroup:Radio.Group,
            ASelect:Select,
            ASelectOption:Select.Option,
        },
        created() {
            this.getUserList()
        },
        methods: {
            getUserList(){
                this.$store.dispatch('user/info',this.userForm).then(() => {
                    this.userinfoList = JSON.parse(window.sessionStorage.getItem('getuserInfo'))
                    this.$message.success('更新成功')
                    console.log(this.userinfoList,'userinfoList')
                }).catch(() => {
                    this.$message.error('更新失败')
                })

            },
            updateUserList(){
                this.$store.dispatch('user/info',this.userForm).then(() => {
                    this.userinfoList = JSON.parse(window.sessionStorage.getItem('updateuserinfo'))
                    this.$message.success('更新成功')
                }).catch(() => {
                    this.$message.error('更新失败')
                })

            },
            handleChange(info) {
                if (info.file.status === 'uploading') {
                    this.loading = true;
                    return;
                }else {
                    this.$message.error('上传失败');
                    this.loading = false;
                }
                if (info.file.status === 'done') {
                    // Get this url from response in real world.
                    getBase64(info.file.originFileObj, imageUrl => {
                        this.imageUrl = imageUrl;
                        this.loading = false;
                    });
                }
            },
            beforeUpload(file) {
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isJpgOrPng) {
                    this.$message.error('You can only upload JPG file!');
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('Image must smaller than 2MB!');
                }
                return isJpgOrPng && isLt2M;
            },
            edit(){
                this.$message.info('66666')
            },
            showModal() {
                this.visible = true;
            },
            handleOk(e) {
                this.$refs.updateForm.validate(valid => {
                    if (valid) {
                        console.log(this.form,'form')
                        this.$store.dispatch('user/updateInfo',this.form).then(() => {
                            console.log('成功')
                            this.visible = false;
                            this.$refs.updateForm.resetFields()
                            console.log(this.userinfoList,'business11')
                            this.getUserList()
                        }).catch(() => {
                            console.log('失败')
                            console.log(this.form,'form')
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })

            },
            handleCancel(e) {
                this.$refs.updateForm.resetFields()
                console.log('Clicked cancel button');
                this.visible = false;
            },
            handleChangeOption(value) {
                console.log(value); // { key: "lucy", label: "Lucy (101)" }
            },
            onChange(date, dateString) {
                this.form.years = dateString
                console.log(this.form.years,6666);
            },
    },
    }
</script>

<style lang="less">
    .Content {
        width: 70%;
        height: 100%;
        margin: 0 auto 50px auto;
        display: flex;
        flex-direction: column;
        .top{
            width: 100%;
            background: #fff;
            box-shadow: 0 1px 3px rgba(26,26,26,.1);
            display: flex;
            flex-direction: column;
            align-items: center;
            .fengmian{
                width: 100%;
                height: 240px;
                position: relative;
                .bg_button{
                    position: absolute;
                    top: 20px;
                    right: 10px;
                    z-index: 100;
                }
                .bg{
                    width: 100%;
                    height: 240px;
                    position: absolute;
                    top:0;
                    left: 0;
                }
            }
            .edit_information{
                width: 70%;
                margin: 10px 0 0 15%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: flex-start;
            }
            .top_bottom{
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                position: relative;
                .avatar{
                    width: 176px;
                    height: 176px;
                    background: #fff;
                    position: absolute;
                    top:-50px;
                    left: 20px;
                    padding: 8px;
                    border-radius: 10px;
                }
                .information{
                    width: 60%;
                    height: 90px;
                    display: flex;
                    align-items: center;
                    .oneinfo{
                        width: 70%;
                        margin-top: 10px;
                        font-size: 20px;
                        padding-left: 10px;
                        color: #000;
                    }
                    .name{
                        height: 90px;
                        padding: 0 20px 0 40px;
                        line-height: 90px;
                        text-align: center;
                        font-size: 45px;
                        color: #000;
                        font-weight: bold;
                    }
                }
            }
        }
        .bottom{
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin: 10px 0;
            .bottom_left{
                width: 69%;
                height: 250px;
                background: skyblue;
                box-shadow: 0 1px 3px rgba(26,26,26,.1);
            }
            .bottom_right{
                width: 30%;
                height: 50px;
                background: pink;
                box-shadow: 0 1px 3px rgba(26,26,26,.1);
            }

        }
    }
    .avatar-uploader > .ant-upload {
        width: 150px;
        height: 30px;
        background: none;
    }
    .ant-upload-select-picture-card i {
        font-size: 30px;
        color: #999;
    }

    .ant-upload-select-picture-card .ant-upload-text {
        color: #D3D3D3;
    }
    .ant-collapse-item{
        margin-bottom: 0 !important;
    }
    .ant-descriptions-item-label{
        font-size: 16px;
        font-weight: 600;
    }
    .ant-descriptions-item{

    }
    .ant-descriptions-item-content{
        font-size: 16px;
        color: #121212;
    }
    .ant-collapse > .ant-collapse-item > .ant-collapse-header{
        color: #8590a6;
    }
    .ant-btn:hover{
        background: rgba(0, 132, 255, 0.07);
        color: #0084ff;
    }
    .ant-descriptions-row:last-child .ant-descriptions-item{
        display: flex;
        flex-direction: row;
        align-items: flex-end;
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
    /*.ant-collapse-header:hover{*/
    /*    cursor:default !important;*/
    /*}*/
</style>
