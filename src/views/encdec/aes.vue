<!--
 * aes加解密页面
 * @author: 若离
 * @since: 2022-12-23
 * aes.vue
-->
<template>
    <div class="rl-container">
        <div class="rl-alert">
            <a-alert type="success">该网站由若离提供维护，仅供公司内部加解密测试。如需json格式化请使用&emsp; <a-link href="https://www.json.cn/" target="_blank"><a-button status="warning" type="outline" size="mini">JSON.CN</a-button></a-link></a-alert>
            <a-alert type="warning">当您配置好相关加解密参数后请及时收藏本网页，从收藏页打开将自动填入相关参数！</a-alert>
        </div>
        <div class="rl-body">
            <div class="rl-query" v-for="info in queryInfo">
                <span>{{ info.label }}：</span>
                <a-select size="small" :style="{width:info.width}" v-model="info.value" placeholder="请选择">
                    <a-option :value="option.value" v-for="option in info.options">{{ option.label }}</a-option>
                </a-select>
            </div>
            <div class="rl-param">
                <div>
                    <span>密钥：</span>
                    <a-input v-model="paramInfo.key" size="small" ></a-input>
                </div>
                <div>
                    <span>偏移：</span>
                    <a-input v-model="paramInfo.iv" size="small"></a-input>
                </div>
            </div>
            <div class="rl-data">
                <div class="rl-textarea">
                    <a-textarea @input="changeText" v-model="sourceText" placeholder="请填入带加解密数据，自动加解密"  :auto-size="{minRows:8,maxRows:8}"/>
                </div>
                <div class="rl-textarea">
                    <a-textarea placeholder="加解密结果" v-model="result" :auto-size="{minRows:8,maxRows:8}"/>
                    <div class="rl-opr" v-show="result">
                        <span class="rl-copy">解析JSON</span>
                        <span class="rl-copy">复制</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { AES,enc,mode, pad } from 'crypto-js'
import { useRoute, useRouter } from 'vue-router';
const queryInfo = ref({
    mode:{
        label: '加密模式',
        type: 'select',
        value: 'CBC',
        width: '80px',
        options: [
            {
                label: 'ECB',
                value: 'ECB'
            },
            {
                label: 'CBC',
                value: 'CBC'
            },
            {
                label: 'CFB',
                value: 'CFB'
            },
            {
                label: 'OFB',
                value: 'OFB'
            }
        ]
    },
    fill:{
        label: '填充',
        type: 'select',
        value: 'Pkcs7.1',
        width: '150px',
        options: [
            {
                label: 'Pkcs5Padding',
                value: 'Pkcs7.1'
            },
            {
                label: 'Pkcs7Padding',
                value: 'Pkcs7.2'
            },
            {
                label: 'NoPadding',
                value: 'NoPadding'
            },
            {
                label: 'ZeroPadding',
                value: 'ZeroPadding'
            },
            {
                label: 'Iso10126',
                value: 'Iso10126'
            },
            {
                label: 'Iso97971',
                value: 'Iso97971'
            },
            {
                label: 'AnsiX923',
                value: 'Iso97971'
            }
        ]
    },
    type:{
        label: '格式',
        type: 'select',
        value: 'Base64',
        width: '110px',
        options: [
            {
                label: 'Base64',
                value: 'Base64'
            },
            {
                label: 'Hex',
                value: 'Hex'
            }
        ]
    }
})
const paramInfo = ref({
    key: 'm1xp9slgfa|su@m2',
    iv: 'pa!st17m@04h5u#0',
})
const result = ref('')
const sourceText = ref('')
let limitingPoint:any = 0;
// 写个防抖功能
const changeText = (val:string,event:any)=>{
    if(limitingPoint != 0 ){
        clearTimeout(limitingPoint)
    }
    if(val){
        limitingPoint = setTimeout(onSearch,500,val)
    }
}
/**
 * 加密函数
 * @param val 需要加密的数据
 */
const encrypt = (val:string) =>{
    const key = enc.Utf8.parse(paramInfo.value.key)
    const iv = enc.Utf8.parse(paramInfo.value.iv)
    const srcs = enc.Utf8.parse(val)
    const encrypted = AES.encrypt(srcs,key,{
        iv: iv,
        mode: ((mode as any)[queryInfo.value.mode.value] as any),
        padding: (pad as any)[queryInfo.value.fill.value.replaceAll(/\..*/g,"")]
    })
    return (enc as any)[queryInfo.value.type.value].stringify(encrypted.ciphertext);
}
/**
 * 解密函数
 * @param val 需要解密的值
 */
const decrypt = (val:string) =>{
    try{
        const key = enc.Utf8.parse(paramInfo.value.key)
        const iv = enc.Utf8.parse(paramInfo.value.iv)
        const decrypted = AES.decrypt(val,key,{
            iv:iv,
            mode: ((mode as any)[queryInfo.value.mode.value] as any),
            padding: (pad as any)[queryInfo.value.fill.value.replaceAll(/\..*/g,"")]
        })
        
        return decrypted.words.length !== 0 ?
            decrypted.toString(enc.Utf8) :
            false;
    }catch(err){
        return false;
    }

}

// AES加解密核心逻辑
const onSearch = (val:string) => {
    // AES.encrypt
    let data = decrypt(val) 
    result.value = data || encrypt(val)
}

const route = useRoute()
const router = useRouter()
/**
 * 监听参数变化，替换为route
 */
 watch(()=>[paramInfo.value,paramInfo.value],([tempVal,tempVal2])=>{
    let isChange = false
    const myQuery:any = JSON.parse(JSON.stringify(route.query))
    for(const key in tempVal){
        const val = tempVal[key].value
        if(val != route.query[key]){
            myQuery[key] = val
            isChange = true
        }
    }
    console.log("succ");
    
    router.push({query:Object.assign(myQuery,route.query as any)})
    if(isChange){
        changeText(sourceText.value,undefined)
    }
    
},{
    immediate: true,
    deep:true
})
watch(()=>[paramInfo.value,paramInfo.value],([tempVal,tempVal2])=>{
    let isChange = false
    const myQuery:any = JSON.parse(JSON.stringify(route.query))
    for(const key in tempVal){
        const val = tempVal[key]
        console.log(val);
        
        if(val != route.query[key]){
            myQuery[key] = val
            isChange = true
        }
    }
    console.log("succ2");

    console.log(myQuery);
    
    router.push({query:Object.assign(myQuery,route.query as any)})
    if(isChange){
        changeText(sourceText.value,undefined)
    }
},{
    immediate:true,
    deep:true
})
/**
 * 初始化参数
 */
const initParam = ()=>{
    const initInfo = JSON.parse(JSON.stringify(route.query))
    for(const infoKey in initInfo){
        const val = initInfo[infoKey]
        if((queryInfo.value as any)[infoKey]){
            if((queryInfo.value as any)[infoKey].options.map((item:any)=> item.value).includes(val)){
                (queryInfo.value as any)[infoKey].value = val
            }
        }
        else if((paramInfo.value as any)[infoKey]){
            (paramInfo.value as any)[infoKey] = val
        }
    }
    
}

onMounted(()=>{
    initParam()
})
</script>

<style scoped lang="less">
.rl-container{
    width: 85%;
    max-width: 900px;
    margin: 0 auto;
    min-height: 100%;
    .rl-alert{
        .arco-alert{
            margin-bottom: 5px !important;
        }
    }
    .rl-param{
        .arco-input-wrapper{
            width: 200px;
        }
        div{
            margin: 10px 0px;
            display: inline-block;
        }
    }
    .rl-query{
        margin: 10px 0px;
        margin-right: 10px;
        display: inline-block;
    }
    .arco-input-wrapper{
        margin-bottom: 10px;
    }
    .rl-data{
        .rl-textarea{
            position: relative;
            div.rl-opr{
                position: absolute;
                top: 0px;
                right: 0px;
                z-index: 9;
                color: #aaa;
                font-size: 12px;
                user-select: none;
                span.rl-copy{
                    display: inline-block;
                    cursor: pointer;
                    padding: 7px;
                    &:hover{
                        color: rgb(var(--primary-6));
                    }
                } 
            }
        }
    }
    
}
a:hover{
    text-decoration: none;
}
</style>
