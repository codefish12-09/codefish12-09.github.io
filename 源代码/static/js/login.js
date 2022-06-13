const Login = {
    data() {
        return {
            username: null,
            password: null,
        }
    },
    methods: {
        login() {
            let forms = document.forms["login_form"]
            
            var request = new XMLHttpRequest();
            request.open("POST", 'http://127.0.0.1:5500/login');
            //发送合适的请求头信息
            request.setRequestHeader("content-type", "application/json");
            request.onload = function () {
                // 请求结束后,在此处写处理代码
                var res = JSON.parse(request.responseText)
                if (res.status == true) {
                    location.assign("http://127.0.0.1:5500/home")
                } else {
                    alert(res.message)
                }
            };
            request.onerror = function(){
                alert("error: " + request.responseText)
            }
            request.send(JSON.stringify({
                name: forms["username"].value,
                password: forms["passwd"].value
            }));
        },
        go_register: function() {
            location.assign("http://127.0.0.1:5500/register")
        }

    }
}
Vue.createApp(Login).mount("#Rain")
