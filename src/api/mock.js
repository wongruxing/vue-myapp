import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import user from './mockServeData/user'
import permission from './mockServeData/permission'

// 定义mock请求拦截
Mock.mock('/api/home/getData', homeApi.getStatisticalData)

// 增加用户列表数据
Mock.mock('/api/user/add', 'post', user.createUser)
    // 编辑用户列表数据
Mock.mock('/api/user/edit', 'post', user.updateUser)
    // 删除用户列表数据
Mock.mock('/api/user/del', 'post', user.deleteUser)
    // 出现404bug 用正则 可以分页切换
Mock.mock(/api\/user\/getUser/, user.getUserList)

Mock.mock(/api\/permission\/getMenu/, 'post', permission.getMenu)