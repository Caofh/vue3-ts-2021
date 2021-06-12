import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('校验组件初始化内容', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
  // it('模拟点击事件', () => {
  //   const wrapper = shallowMount(HelloWorld)

  //   wrapper.find('.hello').trigger('click')

  //   setTimeout(() => {
  //     expect(wrapper.find('.msg').text()).toMatch(`8889`)
  //   })
  // })
})
