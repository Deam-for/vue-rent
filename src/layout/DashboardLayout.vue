<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/users/users">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>用户表</p>
      </sidebar-link>
      <sidebar-link to="/house/house_info">
        <i class="nc-icon nc-circle-09"></i>
        <p>房源信息</p>
      </sidebar-link>
      <sidebar-link to="/house/check">
        <i class="nc-icon nc-notes"></i>
        <p>房源审核</p>
      </sidebar-link>
      <sidebar-link to="/city/city_area">
        <i class="nc-icon nc-paper-2"></i>
        <p>城市区域</p>
      </sidebar-link>
      <sidebar-link to="/admin/admin_num">
        <i class="nc-icon nc-atom"></i>
        <p>管理员管理</p>
      </sidebar-link>
      <sidebar-link to="/banner/banner">
        <i class="nc-icon nc-pin-3"></i>
        <p>轮播图管理</p>
      </sidebar-link>
      <sidebar-link to="/report/report">
        <i class="nc-icon nc-bell-55"></i>
        <p>举报管理</p>
      </sidebar-link>

      <!-- <template slot="bottom-links">
        <sidebar-link class="active"
                      to="/admin/upgrade">
          <i class="nc-icon nc-alien-33"></i>
          <p>Upgrade to PRO</p>
        </sidebar-link>
      </template> -->
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <!-- <content-footer></content-footer> -->
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
