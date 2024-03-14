<template>
  
  <div class="wrapper-main-page">
    <div class="main-page-block">
      <RegisterBlock v-if="!getId"/>
      <router-view/>
      <div class="wrapper-nav">
        <nav>
          <router-link to="/"><img src="static/wallet-logo.svg"></router-link>
          <router-link to="/middle"><img src="static/middle-logo.svg"></router-link>
          <router-link to="/settings"><img src="static/setting.svg"></router-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterBlock from './components/RegisterBlock.vue'
import { mapGetters, mapActions } from 'vuex';
// import axios from 'axios';

  export default {
    name: 'App',
    components: {
      RegisterBlock
    },

    computed: {
      ...mapGetters(['getId'])
    },
    data() {
      return {
        active_register_page: true
      }
    },
    methods: {
      ...mapActions([
        'updateBalanceTon',
        'updateBalance',
        'addIdUser'
      ]),
      // getCookie(name) {
      //   let matches = document.cookie.match(new RegExp(
      //       "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      //   ));
      //   console.log(matches ? decodeURIComponent(matches[1]) : undefined)
      //   return matches ? decodeURIComponent(matches[1]) : undefined;
      // },
      // setCookie(name, value, options = {}) {
      //   options = {
      //     path: '/',
      //     ...options
      //   };

      //   if (options.expires instanceof Date) {
      //     options.expires = options.expires.toUTCString();
      //   }

      //   let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

      //   for (let optionKey in options) {
      //     updatedCookie += "; " + optionKey;
      //     let optionValue = options[optionKey];
      //     if (optionValue !== true) {
      //         updatedCookie += "=" + optionValue;
      //     }
      //   }
      //   document.cookie = updatedCookie;
      // },
      // deleteCookie(name) {
      //     this.setCookie(name, "", {
      //         'max-age': -1
      //     })
      // },
      // async authUser() {
      //   const token = await axios.post('http://localhost:8080/UR/auth', {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json;charset=utf-8'
      //     },
      //     body: JSON.stringify(loginData)
      //   })
      //   .then(result => {
      //     return result.json();
      //   });

      //   this.setCookie('token', token, {'max-age': 3600})
      //   console.log(document.cookie)
      // },
    },
    mounted() {
      setInterval(() => {
        this.updateBalance([
          {
            'name': 'TON'
          },
          {
            'name': 'OPEN',
            'pairs': 1151
          },
        ])
      }, 5000);

      // if(document.cookie) {
      //   this.getConfirmToken(this.getCookie('token'))
      //   .then(result => {
      //       if(result.token) {
      //           this.token = result.token;
      //           console.log(result.token);
      //           this.addIdUser(result.id);
      //       } else {
      //           this.messageAuth.token = '';
      //       }
      //   })
      // } else {
      //   this.authUser();
      // }
    }
  }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
$base-font: 'Inter', sans-serif;


html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}
article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}
html{height:100%}
body{line-height:1}
ol,ul{list-style:none}
blockquote,q{quotes:none}
blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}
table{border-collapse:collapse;border-spacing:0}
* {
  user-select: none;
}
.wrapper-main-page {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100dvh;
  max-height: 100dvh;
  background-color: #161616;

  .main-page-block {
    max-width: 515px;
    width: 100%;
    padding: 0 24.5px;
    box-sizing: border-box;
    position: relative;
    background-color: #161616;
    .wrapper-nav {
      position: absolute;
      display: flex;
      justify-content: center;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      padding: 0 24.5px 17px;
      box-sizing: border-box;
      background-color: #161616;
      nav {
        display: flex;
        justify-content: space-between;
        align-items: end;
        max-width: 466px;
        width: 100%;
        box-sizing: border-box;
        padding: 14px 16.3%;
        border-radius: 20px;
        background: #222;
      }
    }
  }
}


</style>
