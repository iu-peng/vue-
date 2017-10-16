<template>
    <div id="weather-box">
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="6" class="each-col" v-for="item,index in futureWeatherData" key="index">
                
                <div class="next-message">
                    <!-- 地点 -->
                    <p class="place">
                        <i class="icon iconfont icon-shouye"></i>
                        {{futureWeatherLocation.name}}
                    </p>
                    <!-- 白天天气 -->
                    <img class="weather-img" :src="weatherImg[index]" alt="">
                    <p class="wearth-text">{{item.text_day}}</p>
                    <!-- 温度 -->
                    <p class="temperature">{{item.low}}/{{item.high}}℃</p>

                    <!-- 风 -->
                    <el-row class="wind" style="margin-top:20px;">
                        <el-col :span="8">
                                <i class="icon iconfont icon-fengxiang"></i>
                                {{item.wind_direction}}风
                        </el-col>
                        <el-col :span="8">
                            <i class="icon iconfont icon-fengli"></i>
                            {{item.wind_scale}}级
                        </el-col>
                        <el-col :span="8">
                            <i class="icon iconfont icon-fengsu"></i>
                            {{item.wind_speed}}km/h
                        </el-col>
                    </el-row>
                    
                    <p class="wearth-date">{{item.date}}</p>
                    <!-- 晚间天气 -->
                    <div class="night-box">
                        <p class="wearth-text">晚间气象:{{item.text_night}}</p>
                    </div>
                </div>
            </el-col>
        </el-row>
        <ve-line 
            class="line-cavas"
            :data="chartData" 
            :toolbox="toolbox" 
            :settings="chartSettings"
        ></ve-line>
        <el-row type="flex" justify="space-around" style="margin:0 0 30px;">
            <el-col :span="10">
                <el-input placeholder="请输入地址" @keyup.enter.native="searchCity" v-model="inputValue">
                    <template slot="prepend">请输入拼音地址</template>
                    <el-button @click="searchCity" slot="append" icon="search"></el-button>
                </el-input>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios'
    export default{
        data(){
            return{
                weatherData:{},//请求的数据
                futureWeatherData:[],//循环数组
                futureWeatherLocation:{},//地区
                inputValue:'', //输入框数据
                weatherImg:[],//天气图片集合
                errorInput:'',
                tempData:[
                    { '日期': '今天', '最高温': 0, '最低温': 0},
                    { '日期': '明天', '最高温': 0, '最低温': 0},
                    { '日期': '后天', '最高温': 0, '最低温': 0}
                ],
                fn:function(data){
                    if(!data.data.results){
                        this.inputValue = '地名未识别'
                        return
                    }
                    this.weatherData = data.data.results[0]
                    this.futureWeatherLocation = this.weatherData.location //地区对象
                    this.futureWeatherData = this.weatherData.daily.filter((item,index)=>{
                        if(index === 0) item.date = '今  天'
                        if(index === 1) item.date = '明  天'
                        if(index === 2) item.date = '后  天'
                        return index>=0
                    })
                    //温度曲线
                    this.futureWeatherData.forEach((item,index)=>{
                        this.chartData.rows[index]['最高温'] = item.high
                        this.chartData.rows[index]['最低温'] = item.low
                    })
                    //图片地址数组
                    this.weatherData.daily.forEach((item,index)=>{
                        this.weatherImg[index] = require('../../../assets/img/img/'+item.code_day+'.png')
                    })
                }
            }
        },
        mounted(){
            axios.get('http://localhost:3100/api/weatherNext')
            .then((data)=>{
                this.fn(data)                
            })
        },
        computed:{
            imgSrc(code){
                return require('../../../assets/img/img/'+10+'.png')
            },
            tempDataAfter(){
                return this.tempData
            }
        },
        methods:{
            searchCity(){
                //验证是否合法输入
                let re = /^[A-Za-z]+$/
                if(!re.test(this.inputValue)){
                    this.$message({
                        showClose: true,
                        message: '请输入拼音地址',
                        type: 'warning'
                    });
                    return
                }

                axios.get('http://localhost:3100/api/weatherCity',{
                    params:{
                        cityname:this.inputValue
                    }
                })
                .then((data)=>{
                    this.fn(data)
                })
                //.catch((e)=>{
                    /*this.$message({
                        showClose: true,
                        message: e,
                        type: 'warning'
                    });*/
                //})
            },
            checkValue(){

            }
        },
        created() {
            this.chartData = {
                columns: ['日期', '最高温', '最低温'],
                rows:this.tempDataAfter
            }
            this.chartSettings = {
                metrics: ['最高温', '最低温'],
                dimension: ['日期'],
                yAxisName: ['℃'],
                area: false,
                label: {
                    normal: {
                        show: true
                    }
                }/*,
                lineStyle:{
                    normal:{
                        color:'red'
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
        }
    }
</script>

<style scoped>
.row-bg{
    margin-bottom:20px;
}
#weather-box{
    padding:20px;
    height:100%;
    overflow:auto;
}
.next-message{
    padding:20px;
    color:#fff;
    padding:50px 0 0px;
    text-align:center;
    position:relative;
    border-radius:10px;
    box-shadow:0 5px 25px #ccc,2px 5px 13px #cca;
    overflow:hidden;
    cursor:pointer;
    transition:.3s;
}
.next-message:hover{
    /*此处没有该样式时，hover时overflow无效，加上transform后overflow才有效 无解*/
    transform:translateY(-5px);
    box-shadow: 0 8px 18px rgba(0,0,0,.15);
}
.each-col{
    background:transparent;
}
.row-bg .each-col:nth-child(1) .next-message{
    background: linear-gradient(#f87461,#faeeb5);
}
.row-bg .each-col:nth-child(2) .next-message{
    background: linear-gradient(#35a69f,#acf0dc);
}
.row-bg .each-col:nth-child(3) .next-message{
    background: linear-gradient(#274376,#b5d0f5);
}
/*日期时间*/
.wearth-date{
    text-align:center;
    line-height:50px;
    color:  #778899;
    font-size:20px;
}

.wearth-text{
    font-size:17px;
    line-height:35px;
}
.each-col:nth-child(1) .weather-img{
    animation: imgmove 5s linear 0s infinite normal;
}
.each-col:nth-child(2) .weather-img{
    animation: imgmove 5s linear 1s infinite normal;
}
.each-col:nth-child(3) .weather-img{
    animation: imgmove 5s linear 2s infinite normal;
}
@keyframes imgmove {
    0%{
        transform: matrix(1,0,0,1, 0,0);
    }
    20%{
        transform: matrix(1,0,0,1, 5,-5);
    }
    40%{
        transform: matrix(1.1,0,0,1.1, 5,5);
    }
    60%{
        transform: matrix(1.1,0,0,1.1, -5,5);
    }
    80%{
        transform: matrix(1,0,0,1, -5,-5);
    }
    100%{
        transform: matrix(1,0,0,1, 0,0);
    }
}
.place{
    position:absolute;
    top:5px;
    left:5px;
    font-size:14px;
    line-height:20px;
}
.temperature{
    font-size:30px;
    line-height:40px;
    font-weight:bolder;
}
.night-box{
    background:rgba(111, 159, 184, 0.4);
    transform:translateY(50px);
    transition:.3s;
}
.next-message:hover .night-box{
    transform:translateY(0px);
}
.wind{
    background:;
    padding:10px 0;
}
.wind .el-col{
    border-right:1px dashed rgba(195, 215, 197, .7);
    font-size:15px;
    position:relative;
    overflow:hidden;
    line-height:40px;
}
.wind .el-col:last-child{
    border-right:none;
}
.wind .el-col:before{
    position:absolute;
    left:0;
    top:0;
    content:"";
    width:100%;
    height:100%;
    transform:translateY(100%);
    transition:.3s;
}
.each-col:nth-child(1) .next-message .wind .el-col:before{
    background:rgba(255, 99, 71, 0.2);
}
.each-col:nth-child(2) .wind .el-col:before{
    background:rgba(105, 99, 111, 0.2);
}
.each-col:nth-child(3) .wind .el-col:before{
    background:rgba(55, 99, 71, 0.2);
}
.wind .el-col:hover::before{
    transform:translateY(0%);
}
.wind .el-col i{
    display:block;
    font-size:20px;
}
.wind .el-col:last-child i{
    animation: irotate 3s linear infinite normal;
}
@keyframes irotate {
    0%{
        transform:rotate(0deg);
    }
    100%{
        transform:rotate(-360deg);
    }
}
.line-cavas{
    margin:0 10%;
    background:red;
}
</style>
