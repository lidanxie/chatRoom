<template>
  <div id="app">
    <router-view></router-view>
    <!-- tab选项卡 -->
    <div class="bottom">
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value="tab1" icon="phone" title="RECENTS"/>
        <mu-tab value="tab2" icon="favorite" title="FAVORITES"/>
        <mu-tab value="tab3" icon="person_pin" title="NEARBY"/>
      </mu-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  width: 100%;
  min-height: 100%;
}
.bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
