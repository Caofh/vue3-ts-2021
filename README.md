# v3-ts-2021


## 一：安装
### 下载脚手架工具
```
npm install topay-cli -g
```
### 查看脚手架版本，验证安装成功
```
tp -v
```
### 初始化vue3.0 + ts + vue-x + vue-router项目
```
tp init ***(你的项目名称)
```
### 初始化项目依赖
```
cd ***(刚才输入的项目名) && npm i
```
## 二：指令
### 依赖安装
```
npm install
```

### 本地编辑热更新
```
npm run serve
```

### 三种环境发布
```
npm run build_test // 测试环境
npm run build_pre // pre环境(预发布)
npm run build_prod // prod环境(线上)
```

### 打印项目报告（依赖模块大小报告，性能优化可参考）
```
npm run report
```

### 单元测试（含有代码覆盖率报告）
```
npm run test:unit
```

### 端到端测试
```
npm run test:e2e
```

### 整体按照eslint规范过一下代码，全局调整代码规范
```
npm run lint
```

### vue.config.js自定义webpack配置文档
See [Configuration Reference](https://cli.vuejs.org/config/).

## 三：目录结构
### 一 public：不参与打包的部分，构建后会直接原样搬到dist中。
### 二 src：源码部分.
#### 1.src/assets：项目静态资源：svg、图片、公共css、字体...
#### 2.src/components：全局公共组件(.vue单模版组件)
#### 3.src/config：项目配置文件，目前包含（1.项目环境文件；2.项目第三方插件外链资源配置文件）
#### 4.src/router：vue-router文件夹
#### 5.src/service：封装公用api接口axios文件，接口api统一存放文件，各个页面调用的二次封装的接口
#### 6.src/store：vue-x文件夹（使用module模式，每个文件使用自己的module）
#### 7.src/type：ts自定义数据类型文件
#### 8.src/utils：公共方法文件
#### 9.src/views：页面文件（.vue但文件组件）；注：本页面组件不写在公共组件components中，写在本页面中，提倡多写setup，以逻辑为中心抽离页面逻辑。
#### 10.App.vue：页面主模版入口，vue-router的主入口
#### 11.main.ts：vue项目主入口
#### 13.shims-vue.d.ts：定义ts项目内引入.vue文件类型
#### 14.types.d.ts：定义项目内允许import引入的文件类型
#### 15.vue.d.ts：定义vue属性扩展数据结构（即：可以用this.$lodash方式调用，不引起ts报错）
### 三 test：单元测试部分.
#### 1.tests/e2e：端到端测试文件夹，可忽略。
#### 2.tests/unit：单元测试文件夹（执行后，含代码覆盖率报告），核心模块书写单元测试在这里面开发。
### 四 .browserslistrc：兼容目标浏览器([详解](https://blog.csdn.net/weixin_42418196/article/details/112216046))
### 五 .env.local ：本地构建配置
### 六 .env.pre ：预发布构建配置
### 七 .env.prod ：线上构建配置
### 八 .env.test ：测试环境构建配置
### 九 .eslintrc.js ：eslint规则配置
### 十 .prettierrc ：vscode编辑器用于自动格式化代码的配置文件
### 十一 babel.config.js ：babel配置文件
### 十二 cypress.json ：e2e端到端测试配置文件
### 十三 jest.config.js ：单元测试代码覆盖率报告配置
### 十四 package.json ：项目配置（包括：项目依赖配置、项目script指令配置...）
### 十五 package-lock.json ：锁定package项目依赖版本
### 十六 tsconfig.json ：ts配置
### 十七 vue.config.js ：自定义webpack配置（[参考文档](https://cli.vuejs.org/config/)）
### 十八 README.md ：项目介绍markdown文档

## 四 项目注意要点
### 一 项目多用setup，以逻辑为中心组织代码。参考Home.vue中的示例
### 二 utils/appFactory.ts，可以作为模版引擎使用，参考Home.vue中的示例
### 三 utils/eventHub.ts，事件总线：尽量少用，但是非常规场景可以使用此方法解决问题。参考Home.vue中的示例
### 四 utils/loadJs.ts，异步动态加载外链js、css方法，可酌情使用。参考Home.vue中的示例
### 五 lodash，尽量使用，含丰富的日常开发方法（好用）。（[文档](https://www.lodashjs.com/)）。参考Home.vue中的示例 
### 六 项目环境配置文件分两部分：1.根目录中的四个是构建所需环境配置，2.config/projectConfig是代码执行阶段所需环境配置。两者不建议完全通用。需要注意。
### 七 store中的vuex字段一定要分页面建立不同的module，方便日后维护。参考Home.vue中的示例
### 八 开发过程中，针对function的输入、输出、对象，一定要定义数据类型，放到type文件夹中，有利于后续维护、追溯数据结构和避免一些项目隐性问题。参考Home.vue中的示例
### 九 vscode编辑器配置文件失焦时，自动格式化文件，保证整个项目组代码风格、代码规范统一。[参考教程](https://note.youdao.com/s/H23AwUav)
### 十 组件<style></style>必须加上scoped，如需覆盖第三方框架样式，自行增加::v-deep(#ss) {}；来覆盖第三方插件样式。
### 十一 如有dom操作需求，项目已经自动引入n-zepto.js（vue.config.js中已配置，十几k很小，轻量化jquery）。可以使用。也可以使用原生dom操作，不做限制。按团队统一规则。
### 十二 文件夹命名：项目文件夹用小驼峰命名，文件命名：.vue文件用大驼峰，其他文件均用小驼峰
### 十三 图片类资源使用顺序(优先级从前到后)：svg > jpg > png > base64
### 十四 icon尽量使用svg文件，本项目使用svg-sprite-loader自动加载svg文件。参考Home.vue中的示例
### 十五 本项目使用ts，新建.vue单文件组件需要使用defineComponent将vue输出包一层，参考Home.vue中的示例
### 十六 增删改查 localStorage、cookie统一使用library中统一封装的方法（cookie使用的是js-cookie，文档：https://github.com/js-cookie/js-cookie）

