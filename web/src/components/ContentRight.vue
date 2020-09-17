<template>
    <div class="Content_right">
        <!--回答问题、发视频、写文章、写想法-->
        <div class="release">
            <div class="content" v-for="(item,index) in title_img" :key="index" @click="go({path:item.path})">
                <img :src="item.img"
                     style="width: 44px;height: 44px;border-radius: 22px;padding: 10px"
                     :style="{background:item.color}">
                <div style="margin: 5px 0;font-size: 12px">{{item.title}}</div>
            </div>
        </div>
        <!--创作中心-->
        <div class="create">
            <div>
                <img src="./img/user.png" style="width: 17px;height: 17px;margin: 0 10px 0 0">
                <span style="font-size: 15px;color: black">创作中心</span>
            </div>
            <div>
                <span style="font-size: 16px;margin: 0 5px 0 0;color: rgb(0, 132, 255)">去开通</span>
                <span>></span>
            </div>
        </div>
        <!--我的收藏-->
        <div class="others">
            <div class="othersa" v-for="(item,index) in title_img1" :key="index" @click="go({path:item.path})">
                <img :src="item.img" style="width: 17px;height: 17px;margin:0 10px 0 20px ">
                <div style="margin:0 10px 0 0 ;font-size: 14px;color: #8590A6">{{item.title}}</div>
            </div>
        </div>
        <!--广告-->
        <div class="advertisement">
            <img src="https://pic2.zhimg.com/v2-f6e36cf71c0a7f90bf7c024caf808119_540x450.jpeg"
            style="width: 100%;border-radius: 2px;">
        </div>
        <!--其他信息-->
        <div>
            <Info/>
        </div>
    </div>
</template>

<script>
    import Info from "./Info";
    export default {
        data(){
            return{
                title_img:[
                    {
                        img:require('./img/text.png'),
                        title:'回答问题',
                        color:'#E1F1FF',
                        path:'/qusetion'
                    },
                    {
                        img:require('./img/video.png'),
                        title:'发视频',
                        color:'#FFF3E2',
                        path: 'video'
                    },{
                        img:require('./img/article.png'),
                        title:'写文章',
                        color:'#FEF9E2',
                        path: '/article'
                    },{
                        img:require('./img/idea.png'),
                        title:'写想法',
                        color:'#E5F7F7'
                    },
                ],
                title_img1:[
                    {
                        img:require('./img/shoucang.png'),
                        title:'我的收藏',
                        path:'/shoucang'
                    },
                    {
                        img:require('./img/guanzhu.png'),
                        title:'我关注的问题',
                        path:'/guanzhu'

                    },
                    {
                        img:require('./img/yue.png'),
                        title:'我的余额',
                        path:'/yue'
                    },
                    {
                        img:require('./img/kefu.png'),
                        title:'帮助中心',
                        path:'/bangzhu'
                    },
                    {
                        img:require('./img/banquan.png'),
                        title:'版权服务中心',
                        path:'/banquan'
                    }
                ]
            }
        },
        components:{
            Info
        },
        methods:{
          go(path){
              let routes = this.$router.resolve(path);
              window.open(routes.href, '_blank');
          },
            go1(path){
                let routes = this.$router.resolve(path);
                window.open(routes.href, '_blank');
            }
        },
        name: "ContentRight"
    }
</script>

<style scoped lang="less">
.Content_right{
    width: 30%;
    .release{
        background: #fff;
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        box-shadow: 0 1px 3px rgba(26,26,26,.1);
        .content{
            display: flex;
            flex-direction: column;
            align-items: center;
            :hover{
                cursor: pointer;
            }
        }

    }
    .create{
        background: #fff;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 1px 3px rgba(26,26,26,.1);
        padding: 15px 20px;
        margin-bottom: 10px;
    }
    .create:hover{
        cursor: pointer;
    }
    .others{
        background: #fff;
        margin-bottom: 10px;
        box-shadow: 0 1px 3px rgba(26,26,26,.1);
        .othersa{
            display: flex;
            flex-direction: row;
            align-items: center;
            height: 40px;
        }
        .othersa:hover{
            background: #f6f6f6;
            cursor: pointer;
        }
    }
}
</style>
