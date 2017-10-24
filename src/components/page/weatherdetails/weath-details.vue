<template>
    <div id="weather-box">
        <el-row type="flex" justify="space-around">
            <el-col :span="11">
                <el-card class="box-card" body-style="padding:1px 20px;">
                    <div slot="header" class="clearfix">
                        <span>未来24小时气温变化</span>
                        <el-button 
                            style="float: right; padding:6px 10px;margin-right:10px;" 
                            plain
                            @click="hourStatus=!hourStatus"
                        >—</el-button>
                    </div>
                    <el-collapse-transition>
                        <div v-show="hourStatus">
                            <div class="line-cavas">
                                <ve-line 
                                    height="300px"
                                    :data="chartData" 
                                    :toolbox="toolbox" 
                                    :settings="chartSettings"
                                ></ve-line>
                            </div>
                        </div>
                    </el-collapse-transition>
                    
                </el-card>
            </el-col>
            <el-col :span="11">
                <el-card class="box-card" body-style="padding:1px 20px;">
                    <div slot="header" class="clearfix">
                        <span>未来15天气温变化</span>
                        <el-button 
                            style="float: right; padding:6px 10px;margin-right:10px;" 
                            plain
                            @click="dayStatus=!dayStatus"
                        >—</el-button>
                    </div>
                    <el-collapse-transition>
                        <div v-show="dayStatus">
                            <div class="line-cavas">
                                <ve-line 
                                    height="300px"
                                    :data="chartData2" 
                                    :toolbox="toolbox2" 
                                    :settings="chartSettings2"
                                ></ve-line>
                            </div>
                        </div>
                    </el-collapse-transition>
                    
                </el-card>
            </el-col>
        </el-row>

        <!-- <div class="line-cavas">
            <p class="tips">未来24小时气温变化</p>
            <ve-line 
                :data="chartData" 
                :toolbox="toolbox" 
                :settings="chartSettings"
            ></ve-line>
        </div>
        <div class="line-cavas">
            <p class="tips">未来15天气温变化</p>
            <ve-line 
                :data="chartData2" 
                :toolbox="toolbox2" 
                :settings="chartSettings2"
            ></ve-line>
        </div>
         -->
        <!-- <el-row type="flex" justify="space-around" style="margin:0 0 30px;">
            <el-col :span="10">
                <el-input placeholder="请输入地址" @keyup.enter.native="searchCity" v-model="inputValue">
                    <template slot="prepend">请输入拼音地址</template>
                    <el-button @click="searchCity" slot="append" icon="search"></el-button>
                </el-input>
            </el-col>
        </el-row> -->
    </div>
</template>

<script>
    import api from '../../api/api'
    export default{
        data(){
            return{
                chartSettings:{},
                chartData:{},
                toolbox:{},
                tempDataHour:[],

                chartSettings2:{},
                chartData2:{},
                toolbox2:{},
                tempDataDay:[],
                //按钮状态
                hourStatus:true,
                dayStatus:true
            }
        },
        mounted(){
            /*axios.get('http://localhost:3100/api/aaa')
            .then((data)=>{
                console.log(data.data)
            })*/
        },
        computed:{
            tempDataAfter(){
                return this.tempData
            }
        },
        created(){
            //axios.get('http://localhost:3100/api/24hours')
            api.noParams('24hours')
            .then((data)=>{
                let resVal = data.data //返回的总对象
                //24小时
                let tempVal = resVal.forecastHourly.temperature.value //温度数组
                let nowHours = (new Date()).getHours() //当前小时时间

                tempVal.forEach((item,index)=>{
                    let n = (nowHours+index+1)%24
                    this.tempDataHour.push( { '日期':n,'温度': item } )
                })
                //未来15天气温
                let tempValDay = resVal.forecastDaily.temperature.value //未来15天温度数组
                let nowDates = (new Date()).getDate() //当前日期几号时间
                
                tempValDay.forEach((item,index)=>{
                    let n = (nowDates+index+1)%30
                    this.tempDataDay.push( { '日期':n,'最高温': item.from ,'最低温': item.to } )
                })       
                //console.log(this.tempDataDay)
                return {
                    tempHour:this.tempDataHour,
                    tempDay:this.tempDataDay
                }
            })
            .then((data)=>{
                this.chartData = {
                    columns: ['日期', '温度'],
                    rows:data.tempHour
                }

                this.chartSettings = {
                    metrics: ['温度'],
                    //stack: { '温度': ['成本', '利润'] },
                    dimension: ['日期'],
                    yAxisName: ['℃'],
                    area: true,
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    lineStyle:{
                        normal:{
                            color:'rgba(125, 50, 72, 0.7)'
                        }
                    }/*,
                    areaStyle:{
                        normal:{
                            areaColor:'rgba(125, 50, 72, 0.7)'
                        }
                    }*/
                }
                //图形转换
                this.toolbox = {
                    feature: {
                        magicType: {type: ['line', 'bar']},
                        saveAsImage: {}
                    }
                }
                return data 
            })
            //未来15天天气
            .then((data)=>{
                this.chartData2 = {
                    columns: ['日期', '最高温','最低温'],
                    rows:data.tempDay
                }

                this.chartSettings2 = {
                    //metrics: ['最高温','最低温'],
                    dimension: ['日期'],
                    yAxisName: ['℃'],
                    area: true,
                    label: {
                        normal: {
                            show: true
                        }
                    }
                }
                //图形转换
                this.toolbox2 = {
                    feature: {
                        magicType: {type: ['line', 'bar']},
                        saveAsImage: {}
                    }
                }
            })
        }
    }
</script>

<style scoped>
#weather-box{
    padding:20px;
    height:100%;
    overflow:auto;
}

.line-cavas{
    padding:10px 0;
    -background:rgba(0,0,0,0.36);
}
.tips{
    text-align:center;
    color:#fff;
    line-height:40px;
}
.el-card__body{
    padding:0 20px;
}
</style>
