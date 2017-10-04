<template>
  <div>
    <router-view name="head"></router-view>
    <el-row>
      <!-- 侧边页 -->
      <el-col :span="3">
        <router-view name="left"></router-view>
      </el-col>
      <!-- 内容区 -->
      <el-col :span="21">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>

</script>

<style>



</style>
