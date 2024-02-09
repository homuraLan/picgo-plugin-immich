
# picgo-plugin-immich

[PicGo](https://github.com/PicGo/PicGo-Core) [immich](https://immich.app/) 上传插件。  

![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)

<br>

## 安装

- 对于 GUI: 搜索 `immich` 并安装
- 对于 Core: 运行 `picgo add immich`
- 对于 Typora: 查看[这里](#对于-typora)

<br>

## 配置

对于 Core 用户，你可以运行 `picgo set uploader immich` 进入交互式配置。

对于 GUI 用户，你可以在“图床设置”中进行配置。

### `url`

- `Required`
- 示例: `https://myimmich.com`

immich 网页地址，需包含协议。

### `token`

- `Required`
- Example: `xxxxxxxxxxxxx`

immich API token.  
![image](https://github.com/homuraLan/picgo-plugin-immich/assets/96775034/87197ca6-a5bd-4533-bfe5-0477f24a078b)   
你可以在设置中生成 API Token。  


### `albumId`

- Default: `unsorted`
- Example: `mTmo_j9SVEie3ETcCMY3YruI`

### `shareLinkId`

- Default: `unsorted`
- Example: `mTmo_j9SVEie3ETcCMY3YruI`

你需要获取**共享链接编号**和**相册编号**，二者缺一不可。
<br>
进入相册后，你可以在 url 上找到相册编号。
<br>
![image](https://github.com/homuraLan/picgo-plugin-immich/blob/main/assets/shareid.png)  
<br>
![albumId](https://github.com/homuraLan/picgo-plugin-immich/blob/main/assets/albumId.png) 
<br>

## 对于 Typora

Typora 内置的 PicGo-Core 打包了 Node.js `v12.13.0` 和 PicGo-Core `v1.4.7`。该版本已经过时，无法兼容本工具所需的新 API。

请自行下载最新版本的 [PicGo-Core](https://github.com/PicGo/PicGo-Core)，并在 Typora 中使用`自定义命令`来指定使用最新版本的 PicGo-Core。

<br>

## LICENSE

MIT
