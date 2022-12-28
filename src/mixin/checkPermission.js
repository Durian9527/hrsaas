import store from '@/store'
// 混入对象
export default {
  methods: {
    // key 要检查的权限点
    checkPermission(key) {
      // store.state.user.userInfo.roles.points
      const { userInfo } = store.state.user
      if (userInfo.roles && userInfo.roles.points) {
        return userInfo.roles.points.some(item => item === key)
      }
      return false
    }
  }
}
