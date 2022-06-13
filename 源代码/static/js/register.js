const Login = {
    data() {
        return {
            welcome: "Welcome to Rain Home",
        }
    },
    methods: {
        register() {
            let forms = document.forms["login_form"]
            var a = "123"
            if (forms["username"].value.length < 6 || forms["passwd"].value.length < 6) {
                alert("用户名或密码必须大于等于6位！")
                return
            } else if (forms["username"].value.length >= 20 || forms["passwd"].value.length >= 20) {
                alert("用户名或密码超过20位！")
                return
            }

            var request = new XMLHttpRequest();
            request.open("POST", 'http://127.0.0.1:5500/putRegister');
            //发送合适的请求头信息
            request.setRequestHeader("content-type", "application/json");
            request.onload = function () {
                // 请求结束后,在此处写处理代码
                var res = JSON.parse(request.responseText)
                if (res.status == true) {
                    location.assign("http://127.0.0.1:5500/loginPage")
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
        }
    }
}
Vue.createApp(Login).mount("#Rain")
