<template>
         <div class="site-header" style="clear:both;">
        <div class="container">
            <div class="header-logo">
                <a href="index.php" title="小米官网"><img src="/static/img/vn-logo.png" /></a>
            </div>
            <div class="header-nav">
                <ul class="nav-list">
                 	<li class="nav-category">
                        <a class="btn-category-list" href="catalog.php" style="display:none;">全部商品分类</a>
                    </li>
                    <li class="nav-item">
                        <a class="link" href="category.php?id=76"><span>购买电视与平板</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="link" href="category.php?id=69"><span>购买手机</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="link" href="category.php?id=101"><span>耳机音箱与存储卡</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="link" href="category.php?id=108"><span>保护套与贴膜</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="link" href="category.php?id=118"><span>小米生活方式</span></a>
                    </li>
                </ul>
            </div>
            <!-- <div class="container-user"> -->
			<div class="topbar-cart" id="ECS_CARTINFO">
                <a class="cart-mini " >
                    <!-- <i class="iconfont">&#xe60c;</i>  -->
                    <router-link to="/cart" class="iconfont">&#xe60c;购物车车</router-link>
                    <span class="mini-cart-num J_cartNum" id="hd_cartnum">(0)</span>
                </a>
            </div>
            <div class="topbar-info J_userInfo" id="ECS_MEMBERZONE">
                <span v-text="nickName" > </span>
                <a class="link" @click="logout" v-if="!nickName" rel="nofollow">注册</a>
                <span class="sep" >|</span>
                <a class="link"  rel="nofollow" v-if="!nickName" @click="loginModalFlag = true">登录</a>


                <a class="link" @click="logout" v-if="nickName" rel="nofollow">退出</a>
            </div>
            <!-- </div> -->
        </div>
        <div id="J_navMenu" class="header-nav-menu" style="display: none;">
            <div class="container"></div>
        </div>


        <!-- 登录框 -->
      <div class="md-modal modal-msg md-modal-transition " :class="{'md-show':loginModalFlag}">
        <div class="md-modal-inner">
          <div class="md-top">
            <div class="md-title" >登录</div>
            <button class="md-close" @click="loginModalFlag = false">关闭</button>
          </div>
          <div class="md-content">
            <div class="confirm-tips">
              <div class="error-wrap">
                <span class="error error-show" >用户名或密码错误</span>
              </div>
              <ul>
                <li class="regi_form_input">
                  <input type="text" tabindex="1" name="loginname" v-model="userName" placeholder="User Name" data-type="loginname" class="regi_login_input regi_login_input_left">
                </li>
                <li class="regi_form_input noMargin">
                  <i class="icon IconPwd"></i>
                  <input type="password" tabindex="2" name="password" v-model="userPwd" placeholder="Password" class="regi_login_input regi_login_input_left login-input-no input_text" @keyup.enter="login">
                </li>
              </ul>

            </div>
            <div class="login-wrap">
              <a href="javascript:;" class="btn-login" @click="login">登录</a>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-if="loginModalFlag" @click="loginModalFlag = false">
      </div>

    </div>
</template>
<script>
 	import axios from 'axios'
	export default{
		data(){
			return{
				nickName:'',
                userName:'',
                userPwd:'',
                loginModalFlag:false
			}
		},
	 	created(){
        	this.checkLogin();
        },
		methods:{
			//登录
			login(){
                this.$http.post('/users/login',{
                    userName:this.userName,
                    userPwd:this.userPwd
                }).then(result=>{
                    let res = result.data;
                    this.nickName = res.result.userName;
                    this.loginModalFlag = false;
                })
            },   //检查是否登录
            checkLogin(){
            	this.$http.post('/users/checkLogin').then(result=>{
            		let res = result.data;
            		this.nickName = res.result;
            	})
            }, //退出登录
            logout(){
            	this.$http.post('/users/logout').then(result=>{
            		let res = result.data;
            		this.nickName = "";
            	})
            }
		}
	}
</script>

<style type="text/css">
			.input-sub,
    .input-add {
        min-width: 40px;
        height: 100%;
        border: 0;
        color: #605F5F;
        text-align: center;
        font-size: 16px;
        overflow: hidden;
        display: inline-block;
        background: #f0f0f0;
    }
    .item-quantity{
    	margin-top: 12px;
    }
    .item-quantity .select-self-area {
        background: none;
        border: 1px solid #f0f0f0;
    }
    
    .item-quantity .select-self-area .select-ipt {
        display: inline-block;
        padding: 0 3px;
        width: 30px;
        min-width: 30px;
        text-align: center;
    }
</style>