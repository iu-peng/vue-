<template>
    <div id="weather-box">
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="6">
                <div class="wea-item-box">
                    <!-- 今天的天气 -->
                    <div class="today-message" v-for="each,index in todayWeatherData" key="index">
                    <img class="weather-img" src="../../../assets/img/img/0.png" alt="">
                        <p class="wearth-text">{{each.now.text}}</p>
                        <p class="place">{{each.location.name}}</p>
                        <p class="temperature">{{each.now.temperature}}℃</p>
                    </div>
                    <!-- 未来几天的天气 -->
                    <div class="next-message">
                        <ul>
                            <router-link tag="li" :to="{name:'Weathernextpage'}" class="next-day clearfix" v-for="item,n in futureWeatherData" key="n">
                                <span class="next-date">{{item.date}}</span>
                                <i class="next-icon">{{item.text_day}}</i>
                                <span class="next-temp">{{item.low}}/{{item.high}}℃</span>
                            </router-link>
                        </ul>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row type="flex" justify="space-around">
            <el-col :span="10">
                <el-input placeholder="请输入地址" v-model="inputValue">
                    <template slot="prepend">请输入查询地址</template>
                    <el-button slot="append" icon="search"></el-button>
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
                weatherData:{},
                futureWeatherData:[],
                todayWeather:{},

                inputValue:''
            }
        },
        mounted(){
            axios.get('http://localhost:3100/api/weatherToday')
            .then((data)=>{
                this.todayWeather = data.data.results //当日天气
            })
            axios.get('http://localhost:3100/api/weatherNext')
            .then((data)=>{
                this.weatherData = data.data.results[0] //包含地区 上次更新时间 未来三天天气
                //是一个未来2天天气的数组
                this.futureWeatherData = this.weatherData.daily.filter((item,index)=>{
                    if(index === 1) item.date = '明天'
                    if(index === 2) item.date = '后天'
                    return index>0
                })
            })
        },
        computed:{
            todayWeatherData(){
                return this.todayWeather
            }
        }
    }
</script>

<style scoped>
#weather-box{
    padding:20px;
    height:100%;
}
.today-message{
    padding:20px;
    color:#fff;
    padding:50px 0 70px;
    text-align:center;
}
.wea-item-box{
    background: linear-gradient(#f87461,#faeeb5);
    border-radius:10px;
    overflow:hidden;
    box-shadow:0 5px 25px #ccc,2px 5px 13px #cca;
    margin-bottom:30px;
}

.wearth-text{
    font-size:17px;
    line-height:35px;
}
.place{
    font-size:14px;
    line-height:20px;
}
.temperature{
    font-size:30px;
    line-height:40px;
    font-weight:bolder;
}
.next-message{
    background:#fff;
    line-height:30px;
    padding:20px 0 20px;
}
.next-day{
    border-left:5px solid transparent;
    line-height:30px;
    font-size:16px;
    padding:0 20px;
    transition:.2s;
}
.next-day:hover{
    border-left:5px solid #f87461;
    background:#fff9f9;
    cursor:pointer;
}
.next-day span,.next-day i{
    float:left;
}
.next-date{
    width:50%;
}
.next-icon{
    font-style:normal;
}
span.next-temp{
    float:right;
}
.weather-img{
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
</style>
