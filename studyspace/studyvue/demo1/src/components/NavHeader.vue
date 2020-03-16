<template>
  <header class="header">
    <symbol id="icon-cart" viewBox="0 0 38 32">
      <title>cart</title>
      <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
      <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
      <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
      <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
    </symbol>
    <div class="navbar">
      <div class="navbar-left-container">
        <a href="/">
          <img class="navbar-brand-logo" src="static/logo.png"></a>
      </div>
      <div class="navbar-right-container" style="display: flex;">
        <div class="navbar-menu-container">
          <!--<a href="/" class="navbar-link">我的账户</a>-->
          <span class="navbar-link">{{vNsereName}}</span>
          <a @click="loginShow=true" href="javascript:void(0)" class="navbar-link" v-if="!vNsereName">Login</a>
          <a @click.stop="loginOut()" href="javascript:void(0)" class="navbar-link">Logout</a>
          <div class="navbar-cart-container">
            <span class="navbar-cart-count"></span>
            <a class="navbar-link navbar-cart-link" href="/#/cart">
              <svg class="navbar-cart-logo" width="30">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="login-content" v-show="loginShow">
      <div class="outCont"></div>
      <div class="loginCont">
        <a @click.stop="loginShow=false" class="loginShow-close">关闭</a>
        <p class="loginCont-title">Login in</p>
        <p class="loginCont-error" v-show="loginerr">
          <span><svg t="1578557713116" class="icon" viewBox="0 0 1029 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2022" width="14" height="14"><path d="M511.936318 0A512 512 0 0 0 0 512 512 512 0 1 0 511.936318 0z m319.936319 576H192A63.872637 63.872637 0 0 1 128 512c0-35.406965 28.529353-63.936318 64-63.936318h639.872637c35.470647 0 64 28.593035 64 63.936318 0 35.406965-28.529353 64-64 64z m0 0" fill="#F74040" p-id="2023"></path></svg></span>
          用户名或密码错误
        </p>
        <p class="loginCont-input"><span class="login-icon"></span><input type="text" @keyup.enter="login()" v-model="userName" placeholder="User Name"/></p>
        <p class="loginCont-input"><span class="login-icon"></span><input type="password" v-model="userPwd" placeholder="PassWord"/></p>
        <button @click.stop="login()" class="loginCont-btn">登录</button>
      </div>
    </div>
  </header>
</template>

<script>
  import './../assets/css/login.css'
    export default {
        name: "NavHeader",
        data: function () {
          return {
            loginShow: false,
            loginerr: false,
            vNsereName: "",
            userName: '',
            userPwd: ''
          }
        },
      created() {
          this.getCookie()
      },
      methods: {
          getCookie(){
            var aa = localStorage.getItem("Uname")
            if (aa) {
              this.vNsereName = aa
            } else {
              this.vNsereName = ''
            }
          },
          login() {
            if (this.userName == "" || this.userPwd == "") {
              this.loginerr = true
            }else {
              localStorage.setItem("Uname",this.userName); //存入 参数： 1.调用的值 2.所要存入的数据
              this.loginShow = false
              this.vNsereName = this.userName
            }
          },
          loginOut() {
            if (this.vNsereName) {
              window.localStorage.removeItem('Uname')
              this.vNsereName = this.userName = this.userPwd  = ''
            }
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
  .loginCont-title{
    line-height: 38px;
    font-size: 18px;
    color: #605F5F;
  }
  .loginShow-close {
    display: block;
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .loginCont-error {
    font-size: 12px;
    color: #d1434a;
  }
  .loginCont-error span {
    display: inline-block;
    position: relative;
    top: 3px;
  }
  .loginCont-input{
    width: 400px;
    height: 66px;
    line-height: 66px;
    position: relative;
  }
  .login-icon {
    display: inline-block;
    width: 50px;
    height: 48px;
    background-color: #cccccc;
    position: absolute;
    top: 8px;
  }
  .loginCont-input input {
    display: inline-block;
    width: 340px;
    height: 48px;
    position: absolute;
    left: 50px;
    top: 8px;
  }

  .loginCont-btn{
    width: 100%;
    padding: 10px 0px;
    text-align: center;
    background-color: #009de6;
    color: #ffffff;
    margin-top: 18px;
  }
</style>

