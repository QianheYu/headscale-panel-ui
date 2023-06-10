<template>
  <div>
    <div class="navbar">
      <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

      <div class="right-menu">
        <template v-if="device!=='mobile'">
          <search id="header-search" class="right-menu-item" />

          <error-log class="errLog-container right-menu-item hover-effect" />

          <screenfull id="screenfull" class="right-menu-item hover-effect" />

          <el-tooltip content="Global Size" effect="dark" placement="bottom">
            <size-select id="size-select" class="right-menu-item hover-effect" />
          </el-tooltip>

          <el-tooltip content="Language" effect="dark" placement="bottom">
            <lang-select id="lang-select" class="right-menu-item hover-effect" />
          </el-tooltip>
        </template>

        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper">
            <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/profile/index">
              <el-dropdown-item>{{ $t('pageName.profile') }}</el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item>{{ $t('pageName.home') }}</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/gnimli/go-web-mini/">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div id="notice">
      <span>{{ notice.content }}</span>
      <div style="margin-left: auto">
        <el-link href="#/message">查看更多</el-link>
        <el-link @click="hiddenNotice">忽略</el-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import Search from '@/components/HeaderSearch'
import { UtilEventSource } from '@/utils/event-source'

export default {
  name: 'Navbar',
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    Search
  },
  data() {
    return {
      notice: {
        type: '',
        content: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  created() {
    this.connectSSE(this.showNotice, this.hiddenNotice, this.notice)
  },
  methods: {
    showNotice(notice = {}) {
      this.notice = notice
      const elem = document.getElementById('notice')
      elem.style.transform = 'translateY(0%) translateX(0.6%)'
      elem.style.opacity = 1
      elem.style.zIndex = 1
    },
    hiddenNotice() {
      const elem = document.getElementById('notice')
      elem.style.transform = 'translateY(-120%) translateX(0.6%)'
      elem.style.opacity = 0
      elem.style.zIndex = -1
      this.notice = { type: '', data: '' }
    },
    connectSSE(show = () => {}, hidden = () => {}) {
      // const eventSource = UtilEventSource('/api/notice', { withCredentials: true })
      // eventSource.addEventListener('message', function(event) {
      //   // console.debug(event)
      //   const notice = JSON.parse(event.data)
      //   // console.debug(notice)
      //   if (event.type === 'message') {
      //     // this.showNotice()
      //     show(notice)
      //   } else {
      //     // this.closeNotice()
      //     hidden()
      //   }
      // })
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

  #notice {
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    min-width: 380px;
    box-sizing: border-box;
    //border: 1px solid #ebeef5;
    //border-color: #fde2e2;
    border: 1px solid #fde2e2;
    border-radius: 4px;
    position: absolute;
    width: 98%;
    opacity: 0;
    transform: translateY(-120%) translateX(0.6%);
    //transition: transform 2s;
    transition: opacity 0.3s, transform 0.4s, top 0.4s, -webkit-transform 0.4s;
    -webkit-transition: opacity 0.3s, transform 0.4s, top 0.4s, -webkit-transform 0.4s;
    overflow: hidden;
    margin: 5px;
    padding: 5px 5px 5px 10px;
    display: flex;
    align-items: center;
    color: #f56c6c;
    background-color: #fef0f0;
    //color: #fff;
    //background-color: #f56c6c;
    z-index: -1;
    justify-content:flex-start;

    a {
      color: #409EFF;
      @media screen {
        margin-left: 10px;
      };
      //@media screen and (min-width: 1440px) {
      //  margin-left: 10px;
      //}
    }
  }
</style>
