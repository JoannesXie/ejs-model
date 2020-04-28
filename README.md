# ejs-model

## 使用 webpack4 和 ejs 搭建快速开发静态

## Usage

> 1、在 ejs 中使用**vendor**中的静态资源需要使用 ejs 定义的 layout 中的**publicPath**进行引入  
> 2、在 ejs 中使用**require**引入图片需要添加**default** .例如`<%= require('@/public/icon.png').default %>`  
> 3、在 html 和 css 中图片引入问题，暂时将所有的文件夹放在外层。后期再寻找解决方案。

```
npm install
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run dev
```

### Compiles and minifies for production

```
npm run build
```
