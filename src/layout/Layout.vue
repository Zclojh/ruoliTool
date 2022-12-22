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
        <img src="vite.svg" alt="" srcset="" />
        <h2>若离工具箱</h2>
      </a-layout-header>
      <a-layout class="rl-layout-body"
        ><a-layout-sider theme="light" class="rl-layout-body-sider">
          <side-bar />
        </a-layout-sider>
        <a-layout>
          <a-layout-content class="rl-layout-body-content">
            主体
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
import SideBar from "./SideBar.vue";
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
    min-height: 100%;
    :deep(&-sider) {
      display: block;
    }
    &-content {
      background-color: rgba(230, 230, 230, 0.3);
      padding: 15px;
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
