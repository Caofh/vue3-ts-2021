import { App } from 'vue'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale'
// import 'element-plus/lib/theme-chalk/index.css'
// 引入element-plus组件
import {
  ElButton,
  ElCheckboxGroup,
  ElCheckbox,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElImage,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElTooltip,
  ElInput,
  ElSwitch,
  ElIcon,
  ElRadio,
  ElRadioGroup,
  ElDatePicker,
  ElInfiniteScroll,
  ElForm,
  ElFormItem,
  ElDialog,
  ElColorPicker,
  ElOption,
  ElSelect,
  ElTransfer,
  ElPopover
} from 'element-plus'

const components = [
  ElButton,
  ElCheckboxGroup,
  ElCheckbox,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElImage,
  ElTooltip,
  ElInput,
  ElSwitch,
  ElRadio,
  ElRadioGroup,
  ElDatePicker,
  ElIcon,
  ElForm,
  ElFormItem,
  ElDialog,
  ElColorPicker,
  ElOption,
  ElSelect,
  ElTransfer,
  ElPopover
]

const plugins = [ElInfiniteScroll, ElLoading, ElMessage, ElMessageBox]

export default {
  install: (app: App): void => {
    locale.use(lang)
    components.forEach((component) => {
      app.component(component.name, component)
    })
    plugins.forEach((plugin) => {
      app.use(plugin)
    })
  }
}
