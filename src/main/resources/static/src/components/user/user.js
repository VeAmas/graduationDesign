const user = {
	template:`
	<section id="user">
		<div class="top">
			<div class="panel">
				<div class="form-inline">
					<label for="">用户类型</label>
					<select name="" id="" v-model='query.userType'>
						<option v-for="item in common.userType" :value="item" v-text="item"></option>
					</select>
				</div>
				<div class="form-inline">
					<label for="">用户姓名</label>
					<input type="text"  v-model='query.name'/>
				</div>
				<div class="form-inline">
					<label for="">用户性别</label>
					<select name="" id="" v-model='query.gender'>
						<option v-for="item in common.gender" :value="item" v-text="item"></option>
					</select>
				</div>
				<div class="form-inline fr">
					<button @click = 'getUserNum();getUserList()'>筛选</button>
				</div>
				<div class="form-inline fr">
					<button @click = 'query = {}'>清空</button>
				</div>
			</div>
		</div>
		<div class="bottom">
			<div class="panel">
				<div class="panel-head">
					用户列表
					<div class="form-inline">
						<button @click="excelAdd.toModal()"><span class="glyphicon glyphicon-list-alt"></span>&nbsp;导入用户</button>
					</div>
					<div class="form-inline">
						<button @click="userAdd.toModal()"><span class="glyphicon glyphicon-user"></span>&nbsp;添加用户</button>
					</div>
				</div>
				<div class="panel-body">
					<table class="table table-striped table-hover">
				      <thead>
				        <tr>
				          <th>ID</th>
				          <th>姓名</th>
				          <th>用户类型</th>
				          <th>性别</th>
				          <th>当前车辆</th>
				          <th>更新时间</th>
				          <th>操作</th>
				        </tr>
				      </thead>
				      <tbody>
				        <tr v-for="item in userList">
				        	<td v-text="item.userId"></td>
				        	<td v-text="item.name"></td>
				        	<td v-text="item.userType"></td>
				        	<td v-text="item.gender"></td>
				        	<td v-text="item.curVehicle"></td>
				        	<td v-text="new Date(item.lastRecordTime*1000).toLocaleString()"></td>
				        	<td class="operate-bar">
								<a class = "operate" title="查看" @click="userCheck.toModal(item)">
									<span class="glyphicon glyphicon-file"></span>
								</a>
								<a class = "operate" title="编辑" @click="userModify.toModal(item)">
									<span class="glyphicon glyphicon-cog"></span>
								</a>
								<a class = "operate" title="删除" @click="userDelete.toModal(item)">
									<span class="glyphicon glyphicon-remove"></span>
								</a>
				        	</td>
				        </tr>
				      </tbody>
			    	</table>
				</div>
				<div class="panel-footer">
					<div id="user-pagination"></div>
				</div>
			</div>
		</div>
		<modal v-if = "userCheck.isShow" id="user_check">
			<div class="modal-header">
				<h4 class="modal-title">用户信息</h4>
			</div>
			<div class="modal-body">
				<table>
					<tr>
						<td rowspan="5" class="photo">
							<img :src="userCheck.obj.photo" />
						</td>
						<td>姓名</td>
						<td v-text="userCheck.obj.name"></td>
						<td>年龄</td>
						<td v-text="userCheck.obj.age">6</td>
						<td>性别</td>
						<td v-text="userCheck.obj.gender">8</td>						
					</tr>
					<tr>
						<td>用户编号</td>
						<td colspan="5" v-text="userCheck.obj.userId"></td>				
					</tr>
					<tr>
						<td>身份证号码</td>
						<td colspan="5" v-text="userCheck.obj.ID"></td>				
					</tr>
					<tr>		
						<td>联系电话</td>
						<td colspan="5" v-text="userCheck.obj.cellPhone"></td>		
					</tr>
					<tr>
						<td>地址</td>
						<td colspan="5" v-text="userCheck.obj.address"></td>				
					</tr>
					<tr>
						<td>出生日期</td>
						<td v-text="new Date(userCheck.obj.birth*1000).toLocaleString()"></td>	
						<td>邮箱地址</td>
						<td colspan="4" v-text="userCheck.obj.email"></td>						
					</tr>
					<tr>
						<td>入职时间</td>
						<td v-text="new Date(userCheck.obj.startDate*1000).toLocaleString()"></td>	
						<td>用户类型</td>
						<td colspan="4" v-text="userCheck.obj.userType"></td>						
					</tr>
					<tr>
						<td>最近更新时间</td>
						<td v-text="new Date(userCheck.obj.lastRecordTime*1000).toLocaleString()"></td>	
						<td>当前车辆</td>
						<td colspan="4" v-text="userCheck.obj.curVehicle"></td>						
					</tr>
				</table>
			</div>
			<div class="modal-footer">
				<button class="btn cancle" @click="userCheck.clear()">关闭</button>
			</div>
		</modal>
		<modal v-if = "userModify.isShow" id="user_modify">
			<div class="modal-header">
				<h4 class="modal-title">修改用户</h4>
			</div>
			<div class="modal-body">
				<table>
					<tr>
						<td rowspan="6" class="photo">
							<img :src="userModify.obj.photo" />
						</td>
						<td>性别</td>
						<td>
							<select v-model="userModify.obj.gender">
								<option v-for="item in common.gender" :value="item" v-text="item"></option>
							</select>
						</td>						
					</tr>
					<tr>
						<td>年龄</td>
						<td>
							<input type="text" v-model="userModify.obj.age"/>
						</td>		
					</tr>
					<tr>
						<td>姓名</td>
						<td>
							<input type="text" v-model="userModify.obj.name"/>
						</td>			
					</tr>
					<tr>			
						<td>用户类型</td>
						<td>
							<select v-model="userModify.obj.userType">
								<option v-for="item in common.userType" :value="item" v-text="item"></option>
							</select>
						</td>	
					</tr>
					<tr>
						<td>身份证号码</td>
						<td>
							<input type="text" v-model="userModify.obj.ID"/>
						</td>				
					</tr>
					<tr>
						<td>地址</td>
						<td>
							<input type="text" v-model="userModify.obj.address"/>
						</td>				
					</tr>
					<tr>
						<td class="photo-submit"><input type="text" /><button>提交</button></td>
						<td>出生日期</td>
						<td colspan="2">
							<datetime-picker :data="'userModify.obj.birth'"></datetime-picker>
						</td>		
					</tr>
					<tr>
						<td>联系电话</td>
						<td colspan="2">
							<input type="text" v-model="userModify.obj.cellPhone"/>
						</td>						
					</tr>
						<td>邮箱地址</td>
						<td colspan="2">
							<input type="text" v-model="userModify.obj.email"/>
						</td>	
					<tr>
					</tr>
					<tr>
						<td>入职时间</td>
						<td colspan="2">
							<datetime-picker :data="'userModify.obj.startDate'"></datetime-picker>
						</td>						
					</tr>	
				</table>
			</div>
			<div class="modal-footer">
				<button class="btn ok" @click="userModify.execute()">确认</button>
				<button class="btn cancle" @click="userModify.clear()">取消</button>
			</div>
		</modal>
		<modal v-if = "userDelete.isShow" id="user_delete">
			<div class="modal-header">
				<h4 class="modal-title">是否删除用户：&nbsp;<span class="high-light" v-text="userDelete.obj.name"></span>&nbsp;？</h4>
			</div>
			<div class="modal-footer">
				<button class="btn ok" @click="userDelete.execute()">确认</button>
				<button class="btn cancle" @click="userDelete.clear()">取消</button>
			</div>
		</modal>
		<modal v-if = "excelAdd.isShow" id="user_delete">
				<form method="POST" enctype="multipart/form-data" action="/user/importExcel">  
			<div class="modal-header">
				<h4 class="modal-title">批量导入用户</h4>
			</div>
			<div class="modal-body">
				File to upload: <input type="file" name="file" @change='excelAdd.onChange'><br />	 
				<a href = '/user/getExcel'>模板下载</a>
			</div>
			<div class="modal-footer">
				<input type="submit" class="btn ok"  value = '确认' />
				<button class="btn cancle" @click="excelAdd.clear()">取消</button>
			</div>
				</form>  
		</modal>
		<modal v-if = "userAdd.isShow" id="user_add">
			<div class="modal-header">
				<h4 class="modal-title">添加用户</h4>
			</div>
			<div class="modal-body">
				<table>
					<tr>
						<td rowspan="6" class="photo">
							<img :src="userAdd.obj.photo" />
						</td>
						<td>性别</td>
						<td>
							<select v-model="userAdd.obj.gender">
								<option v-for="item in common.gender" :value="item" v-text="item"></option>
							</select>
						</td>						
					</tr>
					<tr>
						<td>年龄</td>
						<td>
							<input type="text" v-model="userAdd.obj.age"/>
						</td>		
					</tr>
					<tr>
						<td>姓名</td>
						<td>
							<input type="text" v-model="userAdd.obj.name"/>
						</td>			
					</tr>
					<tr>			
						<td>用户类型</td>
						<td>
							<select v-model="userAdd.obj.userType">
								<option v-for="item in common.userType" :value="item" v-text="item"></option>
							</select>
						</td>	
					</tr>
					<tr>
						<td>身份证号码</td>
						<td>
							<input type="text" v-model="userAdd.obj.ID"/>
						</td>				
					</tr>
					<tr>
						<td>地址</td>
						<td>
							<input type="text" v-model="userAdd.obj.address"/>
						</td>				
					</tr>
					<tr>
						<td class="photo-submit"><input type="text" /><button>提交</button></td>
						<td>出生日期</td>
						<td colspan="2">
							<datetime-picker :data="'userAdd.obj.birth'"></datetime-picker>
						</td>		
					</tr>
					<tr>
						<td>联系电话</td>
						<td colspan="2">
							<input type="text" v-model="userAdd.obj.cellPhone"/>
						</td>						
					</tr>
						<td>邮箱地址</td>
						<td colspan="2">
							<input type="text" v-model="userAdd.obj.email"/>
						</td>	
					<tr>
					</tr>
					<tr>
						<td>入职时间</td>
						<td colspan="2">
							<datetime-picker :data="'userAdd.obj.startDate'"></datetime-picker>
						</td>						
					</tr>	
				</table>
			</div>
			<div class="modal-footer">
				<button class="btn ok" @click="userAdd.execute()">确认</button>
				<button class="btn cancle" @click="userAdd.clear()">取消</button>
			</div>
		</modal>
	</section>
	`,
	data(){
		return {
			query: {},
			userList:[],
			curPage: 0,
			excelAdd:{
				isShow:false
			},
			userDelete:{
				isShow:false
			},
			userCheck:{
				isShow:false
			},
			userModify:{
				isShow:false
			},
			userAdd:{
				isShow:false
			}
		};
	},
	methods:{
		getUserNum: function(){
			var _this_ = this;
			var handlePaginationClick = function (new_page_index, pagination_container) {
				_this_.curPage = new_page_index;
				_this_.getUserList();
			    return false;
			};
			this.$http.post('/user/getUserNum', {
				name: _this_.query.name,
				userType: _this_.query.userType,
				gender: _this_.query.gender	
			}).then(function(res){			
				$("#user-pagination").pagination(res.body, {
			        items_per_page:20,
			        prev_text:"上一页",
			        next_text:"下一页",
			        num_display_entries:7,
			        callback:handlePaginationClick
				});
			});
			
		},
		getUserList: function () {
			var _this_ = this;
			this.$http.post('/user/queryUser', {
				name: _this_.query.name,
				userType: _this_.query.userType,
				gender: _this_.query.gender,		
				curPage: _this_.curPage,
				itemsPrePage: 20				
			}).then(function(res){
				if (res.body) {
					_this_.userList = res.body;
				}
			},function(err){
				location = '/src/index.html'
			})
		}
	},
	created(){
		var _this = this;
		this.userCheck.obj = {};
		this.userCheck.toModal = function (item) {
			this.obj = item;
			this.isShow = true;
		};
		this.userCheck.clear=function () {
			this.isShow = false;
		};
		
		this.userModify.obj = {};
		this.userModify.toModal = function (item) {
			this.obj = item;
			this.isShow = true;
		};
		this.userModify.execute=function () {
			var __this = this;
			this.obj.lastRecordTime = new Date().getTime() / 1000;
			_this.$http.post('/user/updateUser', this.obj).then(function (res) {
				__this.isShow = false;
				_this.getUserNum();
				_this.getUserList();				
			}, function (err) {
				console.error(err);
				__this.isShow = false;
			})
		};
		this.userModify.clear=function () {
			this.isShow = false;
		};

		this.userDelete.obj = {};
		this.userDelete.toModal = function (item) {
			this.obj = item;
			this.isShow = true;
		};
		this.userDelete.execute=function () {
			var __this = this;
			_this.$http.post('/user/deleteUser', this.obj.userId).then(function (res) {
				__this.isShow = false;
				_this.getUserNum();
				_this.getUserList();				
			}, function (err) {
				console.error(err);
				__this.isShow = false;
			})
		};
		this.userDelete.clear=function () {
			this.isShow = false;
		};
		

		this.userAdd.obj = {};
		this.userAdd.toModal = function () {
			this.obj = {};
			this.isShow = true;
		};
		this.userAdd.execute=function () {
			var __this = this;
			this.obj.birth /= 1000;
			this.obj.startDate /= 1000;
			this.obj.lastRecordTime = new Date().getTime() / 1000;
			_this.$http.post('/user/addUser', this.obj).then(function (res) {
				__this.isShow = false;
				_this.getUserNum();
				_this.getUserList();				
			}, function (err) {
				console.error(err);
				__this.isShow = false;
			})
		};
		this.userAdd.clear=function () {
			this.isShow = false;
		};
		this.excelAdd.obj = {};
		this.excelAdd.toModal = function () {
			this.obj = {};
			this.isShow = true;
		};
		this.excelAdd.onChange = function (e) {
			var files = e.target.files || e.dataTransfer.files;
			if (!files.length) {
				_this.excelAdd.obj = null;
				return;				
			}
			_this.excelAdd.obj = files[0];
		};
		this.excelAdd.execute=function () {
			var __this = this;
			if (this.obj && this.obj.type === 'application/vnd.ms-excel') {
				_this.$http.post('/user/importExcel', __this.obj,{headers: {
			        'Content-Type': 'multipart/form-data;  boundary=-----asdfasdfasdfasdf '
			    }}).then(function(res){
					alert(res)
				}, function(error){
					console.error(error)
				})
			}
		};
		this.excelAdd.clear=function () {
			this.isShow = false;
		};
		
	},
	mounted(){
		$(this.$el).find(".panel-body").niceScroll({
			grabcursorenabled: false
		});

		this.getUserNum();
		this.getUserList();
	}
};