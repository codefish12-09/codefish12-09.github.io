# isc_site

重点实验室网站，私有项目，www.isc.ynu.edu.cn

## 一、配置Gitpod环境

每次新打开Gitpod，记得先在Pod里安装环境；

```bash
bash install_jekyll.sh
```

## 二、配置服务器端环境

自动部署程序到`/workspace/isc_site/`并安装自动持续集成守护进程

```bash
bash install_service.sh
```

检查服务状态

```bash
systemctl status
```

注意，如果守护进程正确执行，那么可以看到`isc_site_auto_ci.service`，例如：

```txt
├─user.slice 
           │ └─user-1000.slice 
           │   ├─user@1000.service 
           │   │ ├─isc_site_auto_ci.service 
           │   │ │ ├─2283 /bin/bash /workspaces/isc_site/auto_sync.sh
           │   │ │ └─2343 sleep 5s
```


## 三、在Gitpod中用Jekyll编写页面，并push到Github


## 四、查看服务器端网页

[http://10.50.0.148:65522](http://10.50.0.148:65522)


## change log
1. 2022-02-18 05:35
    完成持续集成。
    TODO：exclude 各种非html文件