import { useUserRepositoriesType } from '@/type'
import { ref, onMounted, watch } from 'vue'



export default function useUserRepositories(): useUserRepositoriesType {
  const repositories = ref(['我', '是', '大', '好', '人'])

  onMounted(() => {
    console.log('mounted')
  })
  watch(repositories, () => {
    console.log('watch')
  })

  const setUepositor = (data: any) => {
    repositories.value = data
  }

  return {
    repositories,
    setUepositor
  }
}
