const ImageFunc = {
    data() {
        return {
            image1: false,
            image2: false,
            wait: false,
            result_image: null,
            image: "/static/temp/image2.jpg",
            show: false,
        }
    },
    methods: {
        upload: function() {
            this.show = false
            this.wait = true
            var file1 = document.getElementById("first")
            var file2 = document.getElementById("second")
            this.image2 = file2.files[0]
            this.image1 = file1.files[0]

            var fr1 = new FileReader()
            fr1.onload = (f1)=> {
                var fr2 = new FileReader()
                fr2.onload = (f2) => {
                    var request = new XMLHttpRequest()
                    request.open("POST", "http://127.0.0.1:5500/imageFunc")
                    request.setRequestHeader("content-type", "application/json")
                    request.onload = () => {
                        // 请求结束后,在此处写处理代码
                        var res = JSON.parse(request.responseText)
                        if (res.status == true) {
                            // let a = document.getElementById("result")
                            this.result_image = res.result_image
                            this.image1 = res.image1
                            this.image2 = res.image2
                            this.show = true
                            this.wait = false
                            alert("融合完成")
                        } else {
                            alert("some error")
                        }
                        
                    };
                    request.onerror = function(){
                        alert("error: " + request.responseText)
                    }
                    request.send(JSON.stringify({
                        first_image: f1.target.result,
                        second_image: f2.target.result,
                    }));
                    
                    alert("融合需要30秒左右的时间")
                }
                fr2.readAsDataURL(file2.files[0])
            }
            
            fr1.readAsDataURL(file1.files[0])
        },      
        go_login: function() {
            location.assign("http://127.0.0.1:5500/loginPage")   
        },
        log() {
            console.log(this.show2, this.result_image)
        }
    }
}
Vue.createApp(ImageFunc).mount("#ImageFunc")


