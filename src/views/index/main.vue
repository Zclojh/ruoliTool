<!--
 * 首页
 * @author: becomer
 * @since: 2022-12-22
 * main.vue
-->
<template>
  <div class="rl-container">
     <div class="rl-tags" v-for="item in toolList">
        <h3 class="rl-title">{{ item.title }}</h3>
        <div class="rl-cards">
          <a-card @click="gotoTool(toolInfo.url)" v-for="toolInfo in item.data" hoverable class="rl-card">
            <div class="rl-tag-body">
              <span>
                <a-avatar class="rl-tag-avator" :size="40">
                  {{ toolInfo.avator }}
                </a-avatar>
                <a-typography-text>
                  {{ toolInfo.title }}
                </a-typography-text>
              </span>
            </div>
          </a-card>
        </div>
        
     </div>
     <div class="rl-tags">
      <h3 class="rl-title">更新日志</h3>
      <a-timeline mode="alternate" labelPosition="relative" class="rl-update-log">
        <a-timeline-item :label="updateInfo.time" v-for="updateInfo in updateList">
          {{ updateInfo.log }}
        </a-timeline-item>
      </a-timeline>
     </div>
    <div
      :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }"
    >
      
    </div>
  </div>
</template>

<script setup lang="ts">

const updateList = [
  {
    time: '2022-12-23',
    log: '网站再次改版'
  },{
    time: '2022-9-16',
    log: '网站改版完成'
  },
  {
    time: '2022-8-11',
    log: '网站创建完成'
  }
]
const toolList = [
  {
    title: '加解密工具',
    data:[
      {
        title: '在线AES加解密',
        avator: 'AES',
        url: '/encdec/AES'
      },
      {
        title: '在线DES加解密',
        avator: 'DES',
        url: '/encdec/DES'
      },
      {
        title: '在线DES加解密',
        avator: 'DES',
        url: '/encdec/DES'
      },
      {
        title: '在线DES加解密',
        avator: 'DES',
        url: '/encdec/DES'
      },
      {
        title: '在线DES加解密',
        avator: 'DES',
        url: '/encdec/DES'
      },
      {
        title: '在线DES加解密',
        avator: 'DES',
        url: '/encdec/DES'
      }
    ]
  }
]

const gotoTool = (url:string) => {
  location.href = url
}
</script>

<style scoped lang="less">
.rl-tags{
  margin: 10px 0px;
  .rl-title{
    font-size: 20px;
    // background-color: aqua;
    padding-left: 15px;
    position: relative;
    line-height: 30px;
    margin-bottom: 15px;
    color: #FF6600;
    user-select: none;
    &::before{
      position: absolute;
      top: 5px;
      left: 0;
      content: '';
      width: 4px;
      height: 20px;
      background-color: #FF6666;
      border-radius: 4px;
    }
  }
  .rl-cards{
    // display: table-cell;
    .rl-card{
      display: inline-block;
      min-width: 210px;
      max-width: 300px;
      width: 25%;
      margin-bottom: 20px;
      cursor: pointer;
      margin-right: 10px;
      .rl-tag-body{
        span{
          justify-content: space-evenly;
          display: flex;
          align-items: center;
          color: #FF6600;
          .rl-tag-avator{
            background-color: #FFCC99;
            size: "20px"
          }
        }
      }
      &:hover{
        background-color: #FFCC99;
        color: #fff;
        .rl-tag-body{
          span{
            color: #fff;
          }
          .rl-tag-avator{
            background-color: #99CCFF;
            color: #FFF;
          }
        }
      }
    }
  }
  
}

@media only screen and (max-width: 768px){
  .rl-card{
    min-width: calc(50% - 12px) !important;
  }
}
</style>
