<template>
  <div id="poshome">
    <router-view name="head" @asideclose="changeAsideClose"></router-view>
    <el-row>
      <!-- 侧边页 -->
      <el-col :span="3" class="aside">
        <router-view name="left" :changeCollapse="isCollapse"></router-view>
      </el-col>
      <!-- 内容区 -->
      <el-col :span="21" class="content">
        <!-- <el-breadcrumb class="crumb" separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb> -->
        <router-view @inallprice="inallprice" :priceAll="priceAll" class="client-content"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isCollapse:false,
      priceAll:0
    }
  },
  methods:{
    changeAsideClose(a){
      this.isCollapse = !this.isCollapse
    },
    inallprice(n){
      this.priceAll = n
    }
  },
  mounted(){
    let neiH = (document.documentElement.clientHeight || document.body.clientHeight)-60
    document.querySelector('.content').style.height =  document.querySelector('.aside').style.height = neiH + 'px'
  }
}
</script>

<style>
.crumb{
  height:30px;
  line-height:30px;
  background:#fff;
  padding-left:15px;
  -color:#fff;
}
#poshome{
  position: absolute;
  height:100%;
  width:100%;
  background:rgb(245, 245, 255) url(../../assets/img/posbg.png);
}
.content{
  padding:20px;
}
.client-content{
  height:100%;
  overflow:hidden;
  border:1px solid #404853;
  border-radius:5px;
}
.client-content .box{
  margin-top:30px;
}
.aside{
  overflow:hidden;
}
</style>
