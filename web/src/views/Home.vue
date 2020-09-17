<template>
    <div class="container">
     <navigate/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Find from "../views/Find";
    import WaitYou from "../views/WaitYou";
    import navigate from "../components/navigate";
    import {
        Layout, Menu, Breadcrumb, Dropdown, Icon, Avatar, Button, Popover, Input, Modal,
        Row, Col
    } from 'ant-design-vue';

    export default {
        data() {
            return {}
        },
        name: 'Home',
        components: {
            ALayout: Layout,
            ALayoutHeader: Layout.Header,
            ALayoutContent: Layout.Content,
            AMenu: Menu,
            AMenuItem: Menu.Item,
            ABreadcrumbItem: Breadcrumb.Item,
            ABreadcrumb: Breadcrumb,
            ALayoutFooter: Layout.Footer,
            ADropdown: Dropdown,
            AMenuDivider: Dropdown,
            AIcon: Icon,
            AAvatar: Avatar,
            AButton: Button,
            APopover: Popover,
            AInputSearch: Input.Search,
            AModal: Modal,
            ARow: Row,
            ACol: Col,
            navigate
        },
        methods: {},

    }
</script>

<style lang="less" >

</style>
