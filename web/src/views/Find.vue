<template>
    <div class="Content">
        <div class="Content_left">111</div>
        <div class="Content_right">222</div>
    </div>
</template>

<script>
    export default {
        name: "Find"
    }
</script>

<style lang="less" scoped>
.container{

    .Content {
        width: 70%;
        height: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        .Content_left{
            width: 70%;
            height: 100px;
            background: skyblue;
        }
        .Content_right{
            width: 30%;
            height: 100px;
            background: green;
        }
    }
}
</style>
