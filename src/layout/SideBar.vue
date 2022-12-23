<!--
 * 侧边栏
 * @author: becomer
 * @since: 2022-12-22
 * SideBar.vue
-->
<template>
  <a-menu v-if="!isMobile"
      class="rl-menu"
      :style="{ width: '220px', borderRadius: '10px'}"
      theme="light"
      :collapsed="isMobile || collapsed"
      mode="vertical"
      :collapsed-width="60"
      v-model:selectedKeys="defaultPath"
      v-model:openKeys="defaultExpandKeys"
      :accordion = "true"
      @menu-item-click="onMenuClick"
    >
    <template v-for="item of menuOptions" :key="item.key">
        <template v-if="!item.children">
          <a-menu-item :key="item.key">
            <template #icon>
              <component :is="item.icon || 'icon-menu'" />
            </template>
            {{ item.label }}
          </a-menu-item>
        </template>
        <template v-else>
          <SubMenu :key="item.key" :v-model-key="item.key" :menu-info="(item as BMenu)" />
        </template>
      </template>
  </a-menu>
  <a-drawer v-else :width="250" placement="left" :visible="!collapsed" :mask-closable="true" :closable="false"
    :footer="false"  :hide-cancel="true"
    @cancel="()=>{emits('ChangeCollapse')}"
  >
    <template #title>
      
    </template>
    <div>You can customize modal body text by the current situation. This modal will be closed immediately once you
      press the OK button.
    </div>
  </a-drawer>
</template>

<script setup lang="ts" name="SideBar">
import SubMenu from './SubMenu.vue';
import { menu } from '@/setting/menu'
import {onMounted, ref} from 'vue'
import { RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router';
import { BMenu } from '@/setting/types';
const props = defineProps<{
  collapsed: boolean
  isMobile: boolean
}>()
const emits = defineEmits(['ChangeCollapse'])


const router = useRouter()
const menuOptions = menu

const defaultPath = ref<string[]>([])
const defaultExpandKeys = ref<string[]>([])
const onMenuClick = (key: string) => {
  // 是url则弹出url
  if (isExternal(key)) {
    window.open(key)
  } else {
    //跳转对应路由
    router.push({ name: key })
    // 是手机模式则手机collapse
    // if (appStore.deviceType === DeviceType.MOBILE) {
    //   appStore.toggleCollapse(true)
    // }
  }
}

const route: RouteLocationNormalizedLoaded = useRoute()

onMounted(() => { 
  defaultPath.value.length = 0
  defaultPath.value.push(route.name as string)
  defaultExpandKeys.value.length = 0
  let parent = (route.meta?.parent as string) ?? ''
  defaultExpandKeys.value.push(parent)
})

const currentRoute = useRoute()
defaultPath.value.push(
  currentRoute.fullPath
)
const isExternal = (path: string) => {
  return /^(https?:|mailto:|tel:)/.test(path)
}
</script>

<style scoped lang="less">
.rl-menu{
  user-select: none;
}
</style>
