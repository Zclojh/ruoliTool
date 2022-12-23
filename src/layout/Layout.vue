<!--
 * layout模板
 * @author: becomer
 * @since: 2022-12-22
 * Layout.vue
-->
<template>
  <div class="rl-layout">
    <a-layout>
      <a-layout-header class="rl-layout-header">
        <img src="/vite.svg" alt="" srcset="" />
        <h2>若离工具箱</h2>
      </a-layout-header>
      <a-layout class="rl-layout-body"
        ><a-layout-sider theme="light" class="rl-layout-body-sider" :width="sideBarWidth">
          <side-bar @change-collapse="changeCollapse" :collapsed="!collapse" :is-mobile="isMobile"/>
        </a-layout-sider>
        <a-layout>
          <a-layout-content class="rl-layout-body-content">
            <div class="crumbs">
              <div class="switchCollapse" @click="changeCollapse">
                <component :is="switchIcon" />
              </div>
              <!-- 面包屑导航部分 待完成 -->
            </div>
            <div class="rl-views">
              <router-view></router-view>
            </div>
          </a-layout-content>
          <a-layout-footer class="rl-layout-body-footer">
            <p class="rl-footer">若离工具箱 版权所有</p>
          </a-layout-footer>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import SideBar from "./SideBar.vue";

const getDeviceWidth = ()=>{
  let clientWidth = document.documentElement.clientWidth || document.body.clientWidth
  return clientWidth < 768
}
const isMobile = ref(getDeviceWidth())
const collapse = ref(!isMobile.value)
const sideBarWidth = computed(()=>{
  return isMobile.value ? 0 : collapse.value ? 220 : 60
})

const switchIcon = computed(()=>{
  return !isMobile.value && collapse.value ? 'icon-caret-left' : 'icon-caret-right'
})
addEventListener('resize',()=>{
  isMobile.value = getDeviceWidth()
})
const changeCollapse = ()=>{
  collapse.value = !collapse.value
}
</script>

<style scoped lang="less">
.rl-layout {
  min-height: 100vh;
  &-header {
    display: flex;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid #eee;
    user-select: none;
    // margin-bottom: 1px;
    img {
      width: 35px;
      margin-right: 7px;
    }
    h2 {
      line-height: 64px;
      color: #666;
      font-size: 20px;
    }
  }
  &-body {
    .rl-layout-body-sider{
      transition: width .5s !important;
    }
    min-height: 100%;
    :deep(&-sider) {
      display: block;
    }
    &-content {
      background-color: rgba(230, 230, 230, 0.3);
      padding: 15px;
      .crumbs{
        display: block;
        margin-bottom: 10px;
        .switchCollapse {
          display: inline-block;
          background-color: #fff;
          height: 32px;
          line-height: 32px;
          width: 40px;
          text-align: center;
          border-radius: 15px;
          border: 1px dashed #ccc;
          cursor: pointer;
          &:hover{
            box-shadow: 0px 5px 7px rgba(255, 255, 255, .4);
          }
          .arco-icon { 
            color: #666;
            font-size: 30px; 
            line-height: 32px;
            stroke-linecap: round; 
            stroke-linejoin: round; 
          }
        }
      }
      .rl-views{
        width: calc(100% - 20px);
        height: calc(100% - 60px);
        background-color: #fff;
        margin-bottom: 30px;
        padding: 10px;
        border-radius: 10px;
        border: 1px dashed #ccc;
      }
    }
    &-footer {
      height: 40px;
      padding: 6px 12px;
      user-select: none;
      .rl-footer {
        background-color: #fff;
        line-height: 36px;
        border-radius: 10px;
        border: 2px dotted #ccc;
        text-align: center;
        color: #999;
      }
    }
  }
}
.arco-layout {
  min-height: calc(100vh - 65px);
}
</style>
