
const Home = Vue.createApp({
    data() {
        return {
            HomeHost: "http://10.100.65.194:5500",
            user: {
                name: "rain",
                avatar: "/static/images/暗恋.jpg"
            },
            articles: [{
                title: "加载中1",
                content: "加载中1"
            },{
                title: "加载中2",
                content: "加载中2"
            },{
                title: "加载中3",
                content: "加载中3"
            }],

        }
    },
    methods: {
        start: function() {
            // 获取文章数据
            var result = new XMLHttpRequest
            result.open("post", this.HomeHost + "/homeData")
            result.onload = ()=>{
                if (result.responseText.length != 0) {
                    var ins = JSON.parse(result.responseText)
                    if (ins.status != false) {
                        // ins.create_time = ins.create_time.substring(0, 10)
                        this.articles = ins.articles
                        // this.user = ins.user
                        // console.log(ins)
                    }
                }
            }
            result.send(JSON.stringify({
                command: "get article",
            }))
        }
    }
}).mount("#Rain")

// Home.start()
