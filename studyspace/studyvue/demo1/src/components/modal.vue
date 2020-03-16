<template>
  <div class="login-content" v-show="cardShow">
    <div class="outCont"></div>
    <div class="loginCont">
      <a @click.stop="cardShowChange()" class="loginShow-close">关闭</a>
      <slot name="message"></slot>
      <slot name="mess-btn"></slot>
    </div>
  </div>
</template>

<script>
    export default {
        name: "modal",
        props: ["cardShow"],
        methods: {
          cardShowChange(){
            this.$emit('cardClose')
          }
        }
    }
</script>


<style scoped>
  .outCont {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed;
    left:0;
    top: 0;
    bottom: 0;
    right: 0;
  }

  .loginCont {
    width: 500px;
    height: 300px;
    background: #ffffff;
    position:fixed;
    left:0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: 100;
    border-radius: 2px;
    padding: 30px 50px;
    text-align: left;
  }

  .loginShow-close {
    display: block;
    position: absolute;
    top: 20px;
    right: 20px;
  }

  .loginCont-p{
    width: 400px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }


  .loginCont-btn{
    width: 100%;
    padding: 10px 0px;
    text-align: center;
    background-color: #009de6;
    color: #ffffff;
    margin-top: 18px;
  }

  .loginCont-pbtn{
    display:inline-block;
    width: 49%;
    padding: 10px 0px;
    text-align: center;
    background-color: #009de6;
    color: #ffffff;
    margin-top: 18px;
  }
</style>

