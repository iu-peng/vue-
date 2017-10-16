<template>
    <div id="weather-box">
        <div class="line-cavas">
            <ve-line 
                :data="chartData" 
                :toolbox="toolbox" 
                :settings="chartSettings"
            ></ve-line>
        </div>
        
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
    import axios from 'axios'
    export default{
        data(){
            return{
                chartSettings:{},
                chartData:{},
                toolbox:{},
                tempData:[]
            }
        },
        mounted(){
            
        },
        computed:{
            tempDataAfter(){
                return this.tempData
            }
        },
        created(){
            axios.get('http://localhost:3100/api/weather')
            .then((data)=>{
                let resVal = data.data.list //返回的总对象
                let tempVal = resVal.forecastHourly.temperature.value //温度数组
                let nowHours = (new Date()).getHours() //当前小时时间

                tempVal.forEach((item,index)=>{
                    this.tempData.push( { '日期':nowHours+index,'温度': item } )
                })                
                return this.tempData
            })
            .then((data)=>{
                this.chartData = {
                    columns: ['日期', '温度'],
                    rows:data
                }

                this.chartSettings = {
                    metrics: ['温度'],
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
    margin:0 10%;
    background:rgba(0,0,0,0.36);
}
</style>
