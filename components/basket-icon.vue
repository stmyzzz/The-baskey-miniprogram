<template>
  <div @click="goBasket" class="basket-icon"  :class="isBasket ? 'basket-icon-active' : ''" >
    <img src="../static/basket.png" alt="">
  </div>
</template>

<script>
export default {
  props:{
    isBasket:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    goBasket() {
      uni.navigateTo({
        url: `/pages/basket/basket`
      })
    }
  }

}
</script>

<style>
  .basket-icon{
    position: fixed;
    bottom: 140px;
    left: -55px;
    background: #FF4136;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .5s;
  }
  img{
    width: 22px;
    height: 22px;
  }
  .basket-icon-active{
    left: 10px;
  }
</style>