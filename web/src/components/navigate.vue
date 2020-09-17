<template>
    <div class="container">
        <a-row class="navigate"  type="flex" justify="start">
            <a-col :span="3">
                <div class="logo" @click="logo">知道</div>
            </a-col>
            <a-col :span="6">
                <a-menu
                        theme="dark"
                        mode="horizontal"
                        :default-selected-keys="[$route.path]"
                        :style="{ lineHeight: '52px'}"
                >
                    <a-menu-item  v-for="(item,index) in nav_title" :key="item.path" >
                        <div @click="$router.push({path:item.path})">{{item.name}}</div>
                    </a-menu-item>
                </a-menu>
            </a-col>
            <a-col :span="8">
                <div class="nav_middle">
                    <a-input-search placeholder="input search text"
                                    enter-button
                                    @search="onSearch"
                                    style="width: 300px;"/>


                    <a-button type="primary" @click="showModal" style="margin-left:15px">
                        提问
                    </a-button>
                    <a-modal v-model="visible" title="Basic Modal" @ok="handleOk">
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </a-modal>
                </div>
            </a-col>
            <a-col :span="7">
                <div class="nav_right">
                    <div  id="components-popover-demo-placement">
                        <div :style="{ marginLeft: `${buttonWidth}px`, clear: 'both', whiteSpace: 'nowrap' }">
                            <a-popover placement="bottom"  trigger="click">
                                <template slot="content">
                                    <p>
                                        <a-icon type="user" style="margin-right: 10px" />
                                        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">我的主页</a>
                                    </p>
                                    <p>
                                        <a-icon type="setting" style="margin-right: 10px"/>
                                        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">设置</a>
                                    </p>
                                    <p>
                                        <a-icon type="logout" style="margin-right: 10px"/>
                                        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">退出</a>
                                    </p>
                                </template>
                                <img :src="imgurl1" style="width: 30px;height: 30px;margin: 0 10px">
                            </a-popover>
                        </div>
                    </div>
                    <div :style="{ marginLeft: `${buttonWidth}px`, clear: 'both', whiteSpace: 'nowrap' }">
                        <a-popover placement="bottom"  trigger="click">
                            <template slot="content">
                                <p>
                                    <a-icon type="user" style="margin-right: 10px" />
                                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">我的主页</a>
                                </p>
                                <p>
                                    <a-icon type="setting" style="margin-right: 10px"/>
                                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">设置</a>
                                </p>
                                <p>
                                    <a-icon type="logout" style="margin-right: 10px"/>
                                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">退出</a>
                                </p>
                            </template>
                            <img :src="imgurl2" style="width: 30px;height: 30px;margin: 0 10px">
                        </a-popover>
                    </div>
                    <div :style="{ marginLeft: `${buttonWidth}px`, clear: 'both', whiteSpace: 'nowrap' }">
                        <a-popover  placement="bottom"  trigger="click">
                            <template slot="content">
                                <p>
                                    <a-icon type="user" style="margin-right: 10px" />
                                    <a @click="$router.push('/people')">我的主页</a>
                                </p>
                                <p>
                                    <a-icon type="setting" style="margin-right: 10px"/>
                                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">设置</a>
                                </p>
                                <p>
                                    <a-icon type="logout" style="margin-right: 10px"/>
                                    <a @click="logout">退出</a>
                                </p>
                            </template>
                            <img :src="imgurl3" style="width: 30px;height: 30px;margin: 0 10px;">
                        </a-popover>
                    </div>
                </div>
            </a-col>
        </a-row>
        <div style="height: 66px;background:#F6F6F6"/>
        <router-view/>
    </div>
</template>

<script>
    // @ is an alias to /src

    import { Layout,Menu,Breadcrumb,Dropdown,Icon,Avatar,Button,Popover,Input,Modal,
        Row,Col} from 'ant-design-vue';

    export default {
        data(){
            return{
                nav_title:[
                    {
                        name:'首页',
                        path:'/index'
                    },
                    {
                        name:'发现',
                        path:'/find'
                    },
                    {
                        name:'等你来答',
                        path:'/wait'
                    },
                ],
                placements: ['bottomCenter'],
                buttonWidth:'',
                key:this.index,
                // defaultselectedkeys:this.$route.path,
                visible: false,
                activePath:'',//激活的链接地址
                imgurl1:require('./img/naoling-.png'),
                imgurl2:require('./img/xiaoxi.png'),
                imgurl3:require('../assets/img/moren_avatar.jpg'),
            }
        },
        components: {
            ALayout:Layout,
            ALayoutHeader:Layout.Header,
            ALayoutContent:Layout.Content,
            AMenu:Menu,
            AMenuItem:Menu.Item,
            ABreadcrumbItem:Breadcrumb.Item,
            ABreadcrumb:Breadcrumb,
            ALayoutFooter:Layout.Footer,
            ADropdown:Dropdown,
            AMenuDivider:Dropdown,
            AIcon:Icon,
            AAvatar:Avatar,
            AButton:Button,
            APopover:Popover,
            AInputSearch:Input.Search,
            AModal:Modal,
            ARow:Row,
            ACol:Col
        },

        methods: {
            onSearch(value) {
                console.log(value);
            },
            showModal() {
                this.visible = true;
            },
            handleOk(e) {
                console.log(e);
                this.visible = false;
            },
            // saveNavState(activePath){
            //     window.sessionStorage.setItem('activePath',activePath)
            //     this.activePath = activePath
            // },
            logo(){
                this.$router.push('/index')
                // window.sessionStorage.setItem('activePath','/index')
                window.location.reload()
            },
            async logout(){
                window.sessionStorage.clear()
                this.$router.push('/login')
            }
        },
        // created() {
        //     this.activePath = window.sessionStorage.getItem('activePath')
        // },
        beforeCreate () {
            document.querySelector('body').setAttribute('style', 'background-color:#F6F6F6')
            // if (this.activePath = 'undefined'){
            //     window.sessionStorage.setItem('activePath','/index')
            //     this.activePath = window.sessionStorage.getItem('activePath')
            //     console.log(this.activePath,66666666)
            // }
        },

    }
</script>

<style lang="less" scoped>
    .container{
        .navigate{
            width: 100%;
            height: 52px;
            position:fixed;
            z-index: 999;
            padding:0 15%;
            background: #fff;
            box-shadow: 0 1px 3px rgba(26,26,26,.1);
            .logo{
                height: 52px;
                line-height: 52px;
                letter-spacing: 10px;
                font-size: 33px;
                text-align: left;
                color: #0084FF;
            }
            .logo:hover{
                cursor: pointer;
            }
            .nav_middle{
                height: 52px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }
            .nav_right{
                height: 52px;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                align-items: center;
                div{
                    margin-left: 20px;
                }
                img:hover{
                    opacity: 0.9;
                }
                :hover{
                    cursor: pointer;
                }
            }
        }
    }
    .ant-menu-dark, .ant-menu-dark .ant-menu-sub{
        background: #fff;
    }
    .ant-menu-dark .ant-menu-item-selected{
        color: #000;
        background: none;
    }
    .ant-menu-dark .ant-menu-item:hover{
        background:none;
        color: #000;
    }
    .ant-menu-item {
        color: #8590A6;
        height: 52px;
        div{
            height: 52px;
            line-height: 52px;
        }
    }
    .ant-menu.ant-menu-dark .ant-menu-item-selected div{
        background: none;
        font-weight: bolder;
        border-bottom: 3px solid #0084ff;
    }
</style>
