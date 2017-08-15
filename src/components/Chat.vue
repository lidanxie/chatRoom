<template>
  <transition name="fade">
    <div class="container" v-show="getchattoggle">
      <div class="title">
        <mu-appbar title="Title">
            <mu-icon-button icon="chevron_left" slot="left" @click="closechat"/>
            <div class="center">
                聊天({{Object.keys(getusers).length}})
            </div>
            <mu-icon-button icon="expand_more" slot="right" @click="shownotice"/>
        </mu-appbar>
      </div>
      <div class="all-chat">
          <div style="height:70px"></div>
          <div>在线人员</div>
          <div v-for="obj in getusers" class="online">
              <img :src="obj.src" alt="">
          </div>
      </div>
      <div class="chat">
        <div v-for="obj in getmesshistoryinfos">
          <othermsg v-if="obj.username!=getusername" :name="obj.username" :head="obj.src" :msg="obj.msg" :img="obj.img"></othermsg>
          <mymsg v-if="obj.username==getusername" :name="obj.username" :head="obj.src" :msg="obj.msg" :img="obj.img"></mymsg>
        </div>
        <div v-for="obj in getinfos">
          <othermsg v-if="obj.username!=getusername" :name="obj.username" :head="obj.src" :msg="obj.msg" :img="obj.img"></othermsg>
          <mymsg v-if="obj.username==getusername" :name="obj.username" :head="obj.src" :msg="obj.msg" :img="obj.img"></mymsg>
        </div>
        <div style="height:120px"></div>
      </div>

      <div class="bottom">
        <div class="chat">
            <div class="input">
                <input type="text" id="message" v-model="message">
            </div>
            <mu-raised-button label="发送" class="demo-raised-button" primary @click="submess"/>
        </div>
        <div class="functions">
            <div class="fun-li" @click="imgupload"></div>
        </div>
        <input id="inputFile" name='inputFile' type='file' multiple='mutiple' accept="image/*;capture=camera" style="display: none" @change="fileup" v-model="upload">
      </div>
    </div>
  </transition>
</template>

<script>
  import Mymsg from './Mymsg.vue';
  import Othermsg from './Othermsg.vue';
  import { mapGetters } from 'vuex';
  export default {
    name: 'chat',
    data () {
      return {
        socket:'',
        upload:'',
        message:''
      }
    },
    created() {
      const that = this;
      this.getsocket.on('message', (obj) => {
        console.log(obj);
        this.$store.commit('addroomdetailinfos', obj);
        window.scrollTo(0, 900000);
      })
      this.getsocket.on('logout', (obj) => {
        this.$store.commit('setusers', obj);
      })
    },
    methods: {
      closechat() {
        this.$store.commit('changechattoggle');
        var obj = {
          name: this.getusername;
          roomid: this.getuserroom
        }
        this.getsocket.emit('logout', obj);
      },
      imgupload(){
        this.upload.click();
      },
      fileup() {
        var that = this;
        var file1 = document.getElementById('inputFile').files[0];
        if(file1) {
          var formData = new window.FormData();
          formData.append('file', file1);
          formData.append('username', that.getusername);
          formData.append('src', that.getusersrc);
          formData.append('roomid', that.getuserroom);

          this.$store.dispatch('uploadimg', formData);
          var fr = new window.FileReader();

          fr.onload = function() {
            var obj = {
              username: that.getusername,
              src: that.getusersrc,
              img: fr.result,
              msg: '',
              room: that.getuserroom
            }
            console.log(obj);
            that.getsocket.emit('message', obj);
          }
          fr.readAsDataURL(file1);
        }else {
          console.log('必须要有文件');
        }
      },

      shownotice() {
        this.$store.commit('changedialog');
        this.$store.commit('changedialoginfo', '增加图片上传的功能');
      },

      submess() {
        if(this.message !== '') {
          var obj = {
            username: this.getusername,
            src: this.getusersrc,
            img: '',
            msg: this.message,
            room: this.getuserroom
          }
          this.getsocket.emit('message', obj);
          this.message = '';
        }else {
          this.$store.commit('changedialog');
          this.$store.commit('changedialoginfo', '消息不能为空');
        }
      }
    },
    computed: {
      ...mapGetters([
        'getsocket',
        'getusername',
        'getusersrc',
        'getusers',
        'getuserroom',
        'getinfos',
        'getchattoggle',
        'getmesshistoryinfos'
      ])
    },
    components: {
      Mymsg,
      Othermsg
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.2s linear;
    transform: translate3d(0, 0, 0);
  }
  &.fade-enter, &.fade-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    min-height: 100%;
    background: #ffffff;
    .title {
      position: fixed;
      height: 50px;
      top: 0;
      width: 100%;
      z-index: 1;
        .center{
          -webkit-box-flex: 1;
          -webkit-flex: 1;
          -ms-flex: 1;
          flex: 1;
          padding-left: 8px;
          padding-right: 8px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 20px;
          font-weight: 400;
          line-height: 56px;
          text-align: center;
        }
    }
    .chat .all-chat {
      .online {
        display: inline-block;
        margin: 5px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 100%;
        }
      }
    }
    .bottom {
      position: fixed;
      height: 80px;
      bottom: 0;
      background: #eeeff3;
      .chat {
        width: 100%;
        display: flex;
        .input {
          flex: 1;
          background: #eeeff3;
          padding: 4px;
          input {
            width: 100%;
            height: 42px;
            box-sizing: border-box;
            border-radius: 1px solid #8c8c96;
            color: #333333;
            font-size: 18px
            padding-left: 5px
          }
          .mu-text-field {
            width: 100%;
          }
        }
        .demo-raised-button {
          flex-basis: 88px;
          margin-top: 4px;
          height: 40px;
          background: #eeeff3
          color: #8c8c96
        }
      }
      .functions {
        width: 100%;
        .fun-li {
          width: 40px;
          height: 30px;
          display: inline-block;
        }
        .fun-li:nth-child(1) {
          background-image: url(../assets/images.png);
          background-repeat: no-repeat;
          background-size: 25px 25px;
          background-position: center center;
        }
      }
    }
  }
</style>
