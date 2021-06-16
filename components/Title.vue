<template>
  <view class="title">
    {{title}}({{count}})
  </view>
</template>

<script>
export default {
  name:'title',
  props:{
    title:{
      type:String,
      required:true
    },
    count:{
      type:Number,
      default:0
    }
  }
}
</script>

<style>
  .title{
    font-weight: bold;
  }

</style>