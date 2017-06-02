Vue.component("ep-header",{
	template:`
		<section id="header">
			<div class="container">
				<div class="left">
					<div class="logo">
						
					</div>
				</div>
				<div class="right">				
					<div class="enterprise-name">
						杭州市公交管理有限公司
					</div>
					<div class="user">
						<div class="avatar"><img src="img/avatar-amas.jpg"></div>
						<span v-text='curUser.name'></span>
						<span class="glyphicon glyphicon-menu-down arrow"></span>
						<div class="sub-menu">
							<ul>
								<li>姓名：<span v-text='curUser.name'></span></li>
								<li>职位：<span v-text='curUser.userType'>管理员</span></li>
								<li>联系电话：<span v-text='curUser.cellPhone'>15988141526</span></li>
								<li>密码：<span><a @click="passwordModify.toModal">修改</a></span></li>
								<li>头像：<span><a @click="avatarModify.toModal">修改</a></span></li>
								<li><button class="btn btn-block" @click="logOut()">登出</button></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<modal v-show = "passwordModify.isShow" id="password_modify">
				<div class="modal-header">
					<h4 class="modal-title" id="mySmallModalLabel">Small modal</h4>
				</div>
				<div class="modal-body">
				</div>
				<div class="modal-footer">
					<button class="btn btn-default" @click="passwordModify.clear()">关闭</button>
				</div>
			</modal>
			<modal v-show = "avatarModify.isShow" id="avatar_modify">
				<div class="modal-header">
					<h4 class="modal-title" id="mySmallModalLabel">头像修改</h4>
				</div>
				<div class="modal-body">
				</div>
				<div class="modal-footer">
					<button class="btn btn-default" @click="avatarModify.clear()">关闭</button>
				</div>
			</modal>
		</section>
	`,
	data(){
		return{
			passwordModify:{
				isShow:false
			},
			avatarModify:{
				isShow:false
			},
			curUser: {}
		};
	},
	methods: {
		logOut: function(){
			this.$http.post('/user/logOut').then(function(v){
				location = '/src/index.html'				
			})
		}
	},
	created(){
		var scope = this;

		scope.passwordModify.toModal = function() {
			scope.passwordModify.isShow = true;
		};
		scope.passwordModify.clear = function() {
			scope.passwordModify.isShow = false;
		};

		scope.avatarModify.toModal = function() {
			scope.avatarModify.isShow = true;
			console.log(this)
		};
		scope.avatarModify.clear = function() {
			scope.avatarModify.isShow = false;
		};	
		
	},
	mounted(){
		var _this = this;
		this.$http.post('/user/getCurUser').then(function(res){
			if(!res.body){
				location = '/src/index.html'				
			}
			_this.curUser = res.body;
		},function(err){
			location = '/src/index.html'
		})
	}
});

