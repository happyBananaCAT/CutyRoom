<template>
    <div class="item" @click="handleClick">
        <slot>{{text }}</slot>
    </div>

</template>

<script setup>
const props = defineProps({
text:{
    type:String,
    default:"Button"
}
})
const emit = defineEmits(["click"])
const handleClick = ()=>{
emit("click")
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
 }

 .item {
    display: inline-block;
    padding: 0;
    margin: 0;
    cursor: pointer;
     position: relative;
     margin: 10px 0;
     z-index: 1;
  }
  
 /***2.2.新增代码***/
.item:hover::before{
    content: '\00a0';
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    background-color: gray; /*蓝色*/
    z-index: -1; /*避免遮住文字*/
    mix-blend-mode: overlay;
    animation: bgBlue 1s ease-in infinite; /***2.3.新增代码***/
}
// .item:hover::after{
//     content: '\00a0';
//     width: 100%;
//     position: absolute;
//     top: 0;
//     left: 0;
//     background-color: black; /*红色*/
//     z-index: -1; 
    
//     mix-blend-mode: screen;
   
//     animation: bgRed 1s ease-out infinite;
// }

/***2.3.新增代码***/
@keyframes bgBlue {
    0% {top: 6%; transform: skew(-30deg, -2deg) scale(0.7);}
    20% {top: 3%; transform: skew(45deg, 4deg) scale(0.8);}
    40% {top: -2%; transform: skew(-20deg, -2deg) scale(0.9);}
    60% {top: -4%; transform: skew(20deg, 2deg) scale(1);}
    80% {top: 3%; transform: skew(-45deg, -4deg) scale(0.85);}
    100% {top: 6%; transform: skew(45deg, 4deg) scale(0.7);}
}

@keyframes bgRed {
    0% {top: -4%; transform: skew(45deg, 4deg) scale(1);}
    20% {top: -1%; transform: skew(-30deg, -3deg) scale(0.9);}
    40% {top: 2%; transform: skew(60deg, 6deg) scale(0.75);}
    60% {top: 3%; transform: skew(-20deg, -2deg) scale(0.7);}
    80% {top: -2%; transform: skew(30deg, 3deg) scale(0.85);}
    100% {top: -4%; transform: skew(45deg, 4deg) scale(1);}
}
</style>
