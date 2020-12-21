# ipapk
一个用于生成ipa/apk静态下载页面的工具

# 截图
![参考](./screenshot.png)

# 安装
npm install -g ipapk

# 使用
+ 初始化
```
ipapk init 基准地址     
```
+ 放入ipa/apk 后,生成index.html
```
ipapk update     
```
+ 启动http服务器
```
ipapk run 端口     
```

# 下载
+ 打开 基准地址/index.html

# 备注
ipa的下载需要https的支持，相关证书请自行处理