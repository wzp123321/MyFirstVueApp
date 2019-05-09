/**
 * 包含n个接口请求函数的模块
 */
import ajax from './ajax';
// 按照类别查找主题 good job ask 
export const reqTopicsTab = (tab) =>ajax("https://cnodejs.org/api/v1/topics",{tab})

// 主题列表 get /topics 
export const reqTopics = () =>ajax('https://cnodejs.org/api/v1/topics')

// 主题详情 get /topic/:id 
export const reqTopicsdetails = (id) =>ajax("https://cnodejs.org/api/v1/topic/"+id)

// 新建主题 post /topics 
export const reqAddTopic = () =>ajax('https://cnodejs.org/api/v1')

// 用户所收藏的主题 get /topic_collect/:loginname 
export const reqUserCollections = (loginname) =>ajax('https://cnodejs.org/api/v1/topic_collect/'+loginname)

// 用户详情 get /user/:loginname 
export const reqUserDetails = (loginname) =>ajax('https://cnodejs.org/api/v1/user/'+loginname)

// 为评论点赞 post /reply/:reply_id/ups 
export const reqAddups = (reply_id) =>ajax('https://cnodejs.org/api/v1/reply/'+reply_id+'/ups')
























