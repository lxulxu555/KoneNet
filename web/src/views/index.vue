<template>
    <div class="Content">
        <div class="Content_left">
            <div>
                <a-tabs default-active-key="1" @change="callback" tabPosition=top :animated='false'>
                    <a-tab-pane key="1" tab="推荐" style="padding:0 15px">
                      <Recommend/>
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="关注" style="padding:0 15px">
                        Content of Tab Pane 2
                    </a-tab-pane>
                    <a-tab-pane key="3" tab="热榜" style="padding:0 15px">
                        Content of Tab Pane 3
                    </a-tab-pane>
                </a-tabs>
            </div>
        </div>
    <ContentRight/>
    </div>
</template>

<script>
    import {Form, Input, Checkbox, Button, Icon, FormModel, Menu, Tabs,message,Skeleton} from 'ant-design-vue'
    import Recommend from "./recommend/recommend";
    import ContentRight from "../components/ContentRight";
    export default {
        data() {
            return {};
        },
        components:{
            Recommend,
            ContentRight,
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
            ASkeleton:Skeleton,
        },
        methods: {
            callback(key) {
                console.log(key);
            },
        }
    }
</script>

<style lang="less" scoped>
    .Content {
        width: 70%;
        height: 100%;
        margin: 0 auto 50px auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    .Content_left{
        width: 69%;
        box-shadow: 0 1px 3px rgba(26,26,26,.1);
        background: #fff;
    }
    }
</style>
<style lang="less">
    .ant-tabs-nav{
        font-size: 16px;
        .ant-tabs-tab-active{
            color: #0084ff;
            font-weight: normal;
        }
        .ant-tabs-tab{
            margin: 0;
        }
        .ant-tabs-tab:hover{
            color:#000;
        }
        .ant-tabs-tab-active:hover{
            color: #0084FF !important;
        }

    }

    .ant-tabs-ink-bar{
        height: 4px;
        background: none;
    }
</style>
