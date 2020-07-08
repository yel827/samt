import API from '../utils/axios'
				let api = {
					// 登录
          login(params) { 
            return API("/api/auth/login", params, "post");  
					},
					// 注册
					register(params){
						return API('/api/auth/web/register',params,'post')
					},
					// 忘记密码
					forgetPassword(params){
						return API("/api/auth/forgetPassword",params,'post')
					},
					// 请求验证码
					verification(params){
						return API('/api/auth/get/captcha',params,'post')
					},
					// 用户信息
					userInfo(params){
						return API('/api/system/user/info',params)
					},
					// 读取全部项目模块
					projectModular(params){
						return API("/api/system/project/findAllProjectMenus",params)
					},
					// 项目信息列表
					projectInfoList(params){
						return API('/api/system/project/findAllProject',params)
					},
					// 添加项目信息
					addProjectInfo(params){
						return API('/api/system/project/addProject',params,'post')
					},
					// 查询项目信息
					searchProject(params){
						return API('/api/system/project/findProjectByCondition',params,'post')
					},
					// 查询参建单位列表
					findAllPartUnit(params){
						return API('/api/system/groupWorkType/findAllPartUnit',params,'post')
					},
					// 修改项目信息
					updataProject(params){
						return API('/api/system/project/updateProject',params,'post')
					},
					// 添加参建单位
					addParticipation(params){
						return API('/api/system/project/updateProjectUnit',params,'post')
					},
					// projectList搜索
					seacrhProjectList(params){
						return API('/api/system/project/findProjectByNameOrId',params,'post')
					},
					// 员工管理列表
					getStaffList(params){
						return API('/api/system/emp/list',params)
					},
					// 添加员工管理数据
					addStaff(params){
						return API('/api/system/emp',params,'post')
					},
					// 修改员工管理数据
					editStaff(params){
						return API('/api/system/emp/edit',params,'put')
					},
					// 查询员工列表
					searchStaff(params){
						return API('/api/system/emp/list',params)
					},
					// 查询员工列表详情
					searchStaffDetails(params){
						return API('/api/system/emp/'+params+'')
					},
					// 查看单个项目信息
					onlyProject(params){
						return API('/api/system/project/findProjectById/'+params+'')
					},
					// 批量导出员工
					exportEmployees(params){
						return API('/api/system/emp/export',params)
					},
					// 违章记录列表
					violation(params){
						return API('/api/system/builder/illegalrecord/list',params)
					},
					// 编辑违章上限
					editViolation(params){
						return API('/api/system/builder/illegalrecord/limit',params,'put')
					},
					// 查询违章详情
					violationDetails(params){
						return API('/api/system/builder/illegalrecord/'+params+'')
					},
					// 新增违章
					addViolation(params){
						return API('/api/system/builder/illegalrecord',params)
					},
					// 查询施工人员列表
					construction(params){
						return API('/api/system/builder/list',params)
					},
					// 查询部门列表
					deptList(params){
						return API('/api/system/dept/list',params)
					},
					// 部门层级
					deptsearch(params){
						return API('/api/system/dept/list',params)
					},
					// 新增保存部门
					addDeptList(params){
						return API('/api/system/dept/save',params,'post')
					},
					// 修改保存部门
					updateDept(params){
						return API('/api/system/dept/update',params,'post')
					},
					// 简介树形结构
					conciesDept(params){
						return API('/api/system/dept/treeselect',params)
					},
					// 删除组织
					deleteDept(params){
						return API('/api/system/dept/remove/'+params+'',params,'post')
					},
					// 施工人员列表
					constructionPerson(params){
						return API('/api/system/builder/list',params)
					},
					// 查询施工人员列表
					searchConstructionPerson(params){
						return API('/api/system/builder/list',params)
					},
					// 编辑施工人员列表
					editConstructionPerson(params){
						return API('/api/system/builder',params,'put')
					},
					// 查询企业统计列表
					companyInfo(){
						return API('/api/system/enterprise/findEnterpriseList')
					},
					// 根据id查询企业信息详情
					idCompanyInfo(params,data){
						return API('/api/system/enterprise/findByUserId/'+params+'',params,"get")
					},
					// 添加企业信息
					addCompanyInfo(params){
						return API('/api/system/enterprise/saveEnterprise',params,'post')
					},
					// 修改企业信息
					updateCompany(params){
						return API('/api/system/enterprise/updateEnterprise',params,'post')
					},
					// 上传图片企业信息logo
					upload(params){
						return API('/api/system/oss/upload',params,'post')
					},
					// 修改密码
					uploadPassword(params){
						return API('/api/system/user/editPwd',params,'post')
					},
					// 施工人员退场
					exitConstructionPerson(params){
						return API('/api/system/builder/status',params,'put')
					},
					// 访客列表
					visitorList(params){
						return API('/api/system/system/visitor/list',params)
					},
					addVisitor(params){
						return API('/api/system/system/visitor',params,'post')
					}
				}
export default api