<!--
 * 子菜单模板
 * @author: becomer
 * @since: 2022-11-06
 * index.vue
-->
<template>
    <a-sub-menu :key="menuInfo.key">
      <template #title>
        <span class="sub-menu-lable">{{ menuInfo.label }}</span>
      </template>
      <template #icon>
        <component
          :is="menuInfo.icon || 'icon-menu'"
          style="font-size: 16px; vertical-align: middle"
        />
      </template>
      <template v-if="menuInfo.children" v-for="item in menuInfo.children" :key="item.key">
        <template v-if="!item.children">
          <a-menu-item :key="item.key">
            <template #icon>
              <component :is="item.icon || 'icon-menu'" />
            </template>
            {{ item.label }}
          </a-menu-item>
        </template>
        <template v-else>
          <!-- <SubMenu :menu-info="item" :key="item.key" /> -->
        </template>
      </template>
    </a-sub-menu>
  </template>
  
  <script setup lang="ts" name="SubMenu">
  import { BMenu } from '@/setting/types'
  import { onMounted } from 'vue'
  defineProps<{ menuInfo: BMenu }>()
  </script>
  
  <style scoped lang="less" name="SubMenu"></style>
  