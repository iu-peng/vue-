<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="7"><div class="grid-content bg-purple">1</div></el-col>
      <el-col :span="17"><div class="grid-content bg-purple">2</div></el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :xs="6" :sm="8" :md="12" :lg="18"><div class="grid-content bg-purple">1</div></el-col>
      <el-col :xs="18" :sm="16" :md="12" :lg="6"><div class="grid-content bg-purple">2</div></el-col>
    </el-row>

    <el-button type="primary" icon="search">搜索</el-button>
    <b class="el-icon-delete"></b>
    <b class="el-icon-delete2"></b>
    <b class="el-icon-check"></b>
    <hr>
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="text">文字按钮</el-button>
    <hr>
    <el-button :plain="true" :disabled="true">默认按钮</el-button>
    <el-button type="primary" :disabled="true">主要按钮</el-button>
    <el-button type="text" :disabled="true">文字按钮</el-button>
    <hr>
    <el-button type="success">success</el-button>
    <el-button type="warning">warning</el-button>
    <el-button type="danger">danger</el-button>
    <el-button type="info">info</el-button>
    <hr>
    <el-button :plain="true" type="success">success</el-button>
    <el-button :plain="true" type="warning">warning</el-button>
    <el-button :plain="true" type="danger">danger</el-button>
    <el-button :plain="true" type="info">info</el-button>
    <hr>

    <el-button type="primary" icon="edit">编辑</el-button>
    <el-button type="primary" icon="share">分享</el-button>
    <el-button type="primary" icon="delete">删除</el-button>
    <el-button type="success" icon="search">搜索</el-button>
    <!-- 默认字在图标的右侧 -->
    <el-button type="primary">搜索<i class="el-icon-search el-icon--right"></i></el-button>
    <!-- 在字的后面添加一个标签定义图标即可 -->
    <hr>
    按钮组
    <el-button-group>
      <el-button type="primary" icon="arrow-left">上一页</el-button>
      <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </el-button-group>
    <hr>
    
    <el-button type="primary" :loading="onoff" @click="onoff =!onoff">点击后变加载</el-button>
    <hr>
    设置按钮尺寸
    <el-button size="large">大图标</el-button>
    <el-button>正常图标</el-button>
    <el-button size="small">小图标</el-button>
    <el-button size="mini">mini图标</el-button>
    <hr>
    <el-button :autofocus="true" type="success">正常图标</el-button>
    <hr>
    <hr>
    单选按钮
    <el-radio disabled class="radio" v-model="radio" label="1">1</el-radio>
    <el-radio class="radio" v-model="radio" label="100">{{radio}}</el-radio>
    <el-radio class="radio" v-model="radio" label="222">{{radio}}</el-radio>
    <hr>
    单选按钮组
    <el-radio-group v-model="radio">
      <el-radio :label="1"></el-radio>
      <el-radio :label="2"></el-radio>
      <el-radio :label="3"></el-radio>
    </el-radio-group>
    <el-radio-group size="large" text-color="red" v-model="radio">
      <el-radio-button :label="1"></el-radio-button>
      <el-radio-button :label="2"></el-radio-button>
      <el-radio-button :label="3"></el-radio-button>
    </el-radio-group>
    <hr>
    {{checbox}}
    <hr>
    多选框
    <el-checkbox v-model="checbox" label="a"></el-checkbox>
    <el-checkbox v-model="checbox" label="b"></el-checkbox>
    <el-checkbox v-model="checbox" label="c"></el-checkbox>
    <hr>
    多选框组
    <el-checkbox-group v-model="checbox">
      <el-checkbox label="a"></el-checkbox>
      <el-checkbox label="b"></el-checkbox>
      <el-checkbox label="c"></el-checkbox>
    </el-checkbox-group>
    <hr>
    多选个数限制
    <el-checkbox-group v-model="checkedCity" :min="1" :max="2">
      <el-checkbox v-for="city in cities" :label="city"></el-checkbox>
    </el-checkbox-group>
    input输入框
    <el-input placeholder="请输入" icon="search" v-model="input"></el-input>
    <el-input placeholder="请输入" v-model="input"></el-input>
    <el-input placeholder="请输入" disabled v-model="input"></el-input>
    <el-input placeholder="请输入" v-model="input" type="textarea" :row="2"></el-input>
    <hr>
    复合型输入框
    <el-input placeholder="请输入内容" v-model="input2">
    <el-select v-model="select" slot="prepend" placeholder="请选择">
      <el-option label="餐厅名" value="1"></el-option>
      <el-option label="订单号" value="2"></el-option>
      <el-option label="用户电话" value="3"></el-option>
    </el-select>
    <el-button slot="append" icon="search"></el-button>
  </el-input>
  <hr>
  尺寸
  <el-row>
    <el-input size="large"></el-input>
    <el-input size="small"></el-input>
    <el-input size="mini"></el-input>
  </el-row>
  </div>
</template>

<script>
let cities = ['北京','上海','深圳']
export default {
  data(){
    return {
      onoff:false,
      radio:1,
      checbox:['a','b'],
      cities:cities,
      checkedCity:['北京','上海'],
      input:'',
      input2:'',
      select:''
    }
  }
}
</script>

<style>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
