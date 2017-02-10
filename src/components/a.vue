//test
<template>  
  <div class="head">  
    <input type = "text" value = "{{ title }}"></input>  
    <input type = "submit" v-on:click="golist()" ></input>  
  </div>  
</template>  
  
<script type="text/javascript">  
  export default {  
      data() {  
        return {  
          title: "这是登录界面"  
        }  
      },  
      methods :{  
          golist () {//方法，定义路由跳转，注意这里必须使用this，不然报错  
              this.$route.router.go({path:"/register"});  
          }  
      }  
  }  
</script> 