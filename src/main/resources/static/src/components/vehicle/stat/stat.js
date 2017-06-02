const vehicle_stat = {
	template:`
		<section id = "vehicle-stat">
			<div id="left">
				<list-menu :data="vehicleRoute" name = "公交路线"></list-menu>
			</div>
			<div id="top">
				<div class="panel">
					<div class="form-inline">
						<label for="">车辆牌照</label>
						<input v-model = 'query.license' type="text" />
					</div>
					<div class="form-inline">
						<label for="">当前状态</label>
						<select name="" id="" v-model='query.curStat'>
							<option v-for="item in common.vehicleStat" :value="item" v-text="item"></option>
						</select>
					</div>
					<div class="form-inline fr">
						<button @click = 'getVehicleNum();getVehicleList()'>筛选</button>
					</div>
					<div class="form-inline fr">
						<button @click = 'query = {}'>清空</button>
					</div>
				</div>
			</div>
			<div id="right">
				<div class="panel">
					<div class="panel-head">
						车辆列表
						<div class="form-inline">
							<button  @click = 'addVehicle.toModal()'><span class="glyphicon glyphicon-plus"></span>&nbsp;添加车辆</button>
						</div>
					</div>
					<div class="panel-body">
						<table class="table table-striped table-hover">
					      <thead>
					        <tr>
					          <th>线路</th>
					          <th>车牌号</th>
					          <th>当前驾驶员</th>
					          <th>当前状态</th>
					          <th>更新时间</th>
					          <th>操作</th>
					        </tr>
					      </thead>
					      <tbody>
					        <tr v-for="item in vehicleList">
					        	<td v-text="item.route"></td>
					        	<td v-text="item.license"></td>
					        	<td v-text="item.curUser"></td>
					        	<td v-text="item.curStat"></td>
					        	<td v-text="new Date(item.lastRecordTime*1000).toLocaleString()"></td>
					        	<td class="operate-bar">
									<a class = "operate" title="查看" @click="vehicleCheck.toModal(item)">
										<span class="glyphicon glyphicon-file"></span>
									</a>
									<a class = "operate" title="编辑" @click="vehicleModify.toModal(item)">
										<span class="glyphicon glyphicon-cog"></span>
									</a>
									<a class = "operate" title="删除" @click="vehicleDelete.toModal(item)">
										<span class="glyphicon glyphicon-remove"></span>
									</a>
					        	</td>
					        </tr>
					      </tbody>
				    	</table>
				    	
					</div>
					<div class="panel-footer">
						<div id="vehicle-stat-pagination"></div>
					</div>
				</div>
			</div>
			<modal v-if = "vehicleCheck.isShow" id="vehicle_check">
				<div class="modal-header">
					<h4 class="modal-title">车辆信息</h4>
				</div>
				<div class="modal-body">
					<div class="vehicle-info">
						<div class="photo">
							<img :src="vehicleCheck.obj.photo" />
						</div>
						<div class="stat">
							<table>
								<tr><td>车牌号</td><td v-text="vehicleCheck.obj.license"></td></tr>
								<tr><td>公交线路</td><td v-text="vehicleCheck.obj.route"></td></tr>
								<tr><td>车辆型号</td><td v-text="vehicleCheck.obj.model"></td></tr>
								<tr><td>购买日期</td><td v-text="new Date(vehicleCheck.obj.purchasedDate*1000).toLocaleString()"></td></tr>
								<tr><td>保养等级</td><td v-text="vehicleCheck.obj.maintenance"></td></tr>
								<tr><td>行驶公里数</td><td v-text="vehicleCheck.obj.km"></td></tr>
								<tr><td>上一次更新时间</td><td v-text="new Date(vehicleCheck.obj.lastRecordTime*1000).toLocaleString()"></td></tr>
								<tr><td>当前状态</td><td v-text="vehicleCheck.obj.curStat"></td></tr>
							</table>
						</div>
					</div>
					<div>当前驾驶员信息：<span v-text="vehicleCheck.obj.user?'':'无'"></span></div>
					<div class="driver-info" v-if='vehicleCheck.obj.user'>
						<div class="photo">
							<img :src="vehicleCheck.obj.user.photo" />
						</div>
						<div class="stat">
							<table>
								<tr>
									<td>姓名</td><td v-text="vehicleCheck.obj.user.name"></td>
									<td>年龄</td><td v-text="vehicleCheck.obj.user.age"></td>
									<td>性别</td><td v-text="vehicleCheck.obj.user.gender"></td>
								</tr>
								<tr><td>出生日期</td><td colspan="5" v-text="vehicleCheck.obj.user.birth"></td></tr>
								<tr><td>身份证号码</td><td colspan="5" v-text="vehicleCheck.obj.user.id"></td></tr>
								<tr><td>地址</td><td colspan="5" v-text="vehicleCheck.obj.user.address"></td></tr>
								<tr><td>联系电话</td><td colspan="5" v-text="vehicleCheck.obj.user.cellPhone"></td></tr>
								<tr><td>邮件</td><td colspan="5" v-text="vehicleCheck.obj.user.email"></td></tr>
								<tr><td>开始工作日期</td><td colspan="5" v-text="vehicleCheck.obj.user.startDate"></td></tr>
							</table>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn cancle" @click="vehicleCheck.clear()">关闭</button>
				</div>
			</modal>
			<modal v-if = "vehicleModify.isShow" id="vehicle_modify">
				<div class="modal-header">
					<h4 class="modal-title">车辆修改</h4>
				</div>
				<div class="modal-body">
					<div class="vehicle-info">
						<div class="photo">
							<img :src="vehicleModify.obj.photo" />
						</div>
						<div class="stat">
							<table>
								<tr>
									<td>车牌号</td>
									<td>
										<select class = 'license' v-model="vehicleModify.obj.license.front">
											<option v-for="p in common.province" :value="p" v-text="p"></option>
										</select>
										<input class = 'license end' type="text" v-model="vehicleModify.obj.license.end" maxlength="5"/>
										<input class = 'license middle' type="text" v-model="vehicleModify.obj.license.middle" maxlength="1"/>
									</td>
								</tr>
								<tr><td>公交线路</td>
									<td>
										<input type="text" v-model="vehicleModify.obj.route"/>
									</td>
								</tr>
								<tr><td>车辆型号</td>
									<td>
										<input type="text" v-model="vehicleModify.obj.model"/>
									</td>
								</tr>
								<tr><td>购买日期</td>
									<td>
										<datetime-picker class='purchasedDate' :data="'vehicleModify.obj.purchasedDate'"></datetime-picker>
									</td>
								</tr>
								<tr><td>保养等级</td>
									<td>
										<select v-model="vehicleModify.obj.maintenance">
											<option v-for="p in common.maintenanceLevel" :value="p" v-text="p"></option>
										</select>
									</td>
								</tr>
								<tr><td>行驶公里数</td>
									<td>
										<input type="text" v-model="vehicleModify.obj.km"/>
									</td>
								</tr>
								<tr><td>当前状态</td>
									<td>
										<select v-model="vehicleModify.obj.curStat">
											<option v-for="p in common.vehicleStat" :value="p" v-text="p"></option>
										</select>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn ok" @click="vehicleModify.execute()">确认</button>
					<button class="btn cancle" @click="vehicleModify.clear()">关闭</button>
				</div>
			</modal>
			<modal v-if = "vehicleDelete.isShow" id="vehicle_delete">
				<div class="modal-header">
					<h4 class="modal-title">是否删除车牌号为&nbsp;<span class="high-light" v-text="vehicleDelete.obj.license"></span>&nbsp;的车辆？</h4>
				</div>
				<div class="modal-footer">
					<button class="btn ok" @click="vehicleDelete.execute()">确认</button>
					<button class="btn cancle" @click="vehicleDelete.clear()">取消</button>
				</div>
			</modal>
			
			<modal v-if = "addVehicle.isShow" id="vehicle_modify">
				<div class="modal-header">
					<h4 class="modal-title">添加车辆</h4>
				</div>
				<div class="modal-body">
					<div class="vehicle-info">
						<div class="photo">
							<img :src="addVehicle.obj.photo" />
						</div>
						<div class="stat">
							<table>
								<tr>
									<td>车牌号</td>
									<td>
										<select class = 'license' v-model="addVehicle.obj.license.front">
											<option v-for="p in common.province" :value="p" v-text="p"></option>
										</select>
										<input class = 'license end' type="text" v-model="addVehicle.obj.license.end" maxlength="5"/>
										<input class = 'license middle' type="text" v-model="addVehicle.obj.license.middle" maxlength="1"/>
									</td>
								</tr>
								<tr><td>公交线路</td>
									<td>
										<input type="text" v-model="addVehicle.obj.route"/>
									</td>
								</tr>
								<tr><td>车辆型号</td>
									<td>
										<input type="text" v-model="addVehicle.obj.model"/>
									</td>
								</tr>
								<tr><td>购买日期</td>
									<td>
										<datetime-picker class='purchasedDate' :data="'addVehicle.obj.purchasedDate'"></datetime-picker>
									</td>
								</tr>
								<tr><td>保养等级</td>
									<td>
										<select v-model="addVehicle.obj.maintenance">
											<option v-for="p in common.maintenanceLevel" :value="p" v-text="p"></option>
										</select>
									</td>
								</tr>
								<tr><td>行驶公里数</td>
									<td>
										<input type="text" v-model="addVehicle.obj.km"/>
									</td>
								</tr>
								<tr><td>当前状态</td>
									<td>
										<select v-model="addVehicle.obj.curStat">
											<option v-for="p in common.vehicleStat" :value="p" v-text="p"></option>
										</select>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn ok" @click="addVehicle.execute()">确认</button>
					<button class="btn cancle" @click="addVehicle.clear()">关闭</button>
				</div>
			</modal>
		</section>
	`,
	data(){
		return {
			query: {},
			curRoute: null,
			curPage: 0,
			vehicleRoute:[],
			vehicleList:[],
			vehicleCheck:{
				isShow:false
			},
			vehicleModify:{
				isShow:false
			},
			vehicleDelete:{
				isShow:false
			},
			addVehicle:{
				isShow: false
			}
		};
	}, 
	watch: {
		curRoute: function (val, oldVal) {
			this.getVehicleList(true);	
		}
	},
	methods:{
		getVehicleNum: function(){
			var _this_ = this;
			var handlePaginationClick = function (new_page_index, pagination_container) {
				_this_.curPage = new_page_index;
				_this_.getVehicleList();
			    return false;
			};
			this.$http.post('/vehicle/getVehicleNum', {
				route: _this_.curRoute,
				license: _this_.query.license,
				curStat: _this_.query.curStat,				
			}).then(function(res){
			
				$("#vehicle-stat-pagination").pagination(res.body, {
			        items_per_page:20,
			        prev_text:"上一页",
			        next_text:"下一页",
			        num_display_entries:7,
			        callback:handlePaginationClick
				});
			});
			
		},
		getVehicleRoutes: function () {
			var _this_ = this;
			this.$http.post('/vehicle/getAllRoutes').then(function(res){
				if (res.body) {
					_this_.vehicleRoute = res.body;
					_this_.curRoute = res.body[0];
					_this_.getVehicleList();
					_this_.getVehicleNum();
				}
			})
		},
		getVehicleList: function () {
			var _this_ = this;
			this.$http.post('/vehicle/queryVehicle', {
					route: _this_.curRoute,
					license: _this_.query.license,
					curStat: _this_.query.curStat,			
					curPage: _this_.curPage,
					itemsPrePage: 20
					
				}).then(function(res){
				if (res.body) {
					_this_.vehicleList = res.body;					
				}
			},function(err){
				location = '/src/index.html'
			})
		}
		
	},
	created(){
		var _this = this;
		this.$on("select",function (selected) {
			this.curRoute = selected;
//			console.log("this.curRoute:" + selected)
		});

		this.vehicleCheck.obj={};
		this.vehicleCheck.toModal = function (item) {
			var __this = this;
			this.obj = item;
			if (item.curUser) {
				console.log(this)
				_this.$http.post('/user/getUserByCurVehicle', this.obj.license).then(function(res){
					__this.obj.user = res.body;
					__this.isShow = true;					
				})
			} else {
				this.isShow = true;
			}
		};
		this.vehicleCheck.clear = function () {
			this.obj = {};
			this.isShow = false;
		};

		this.vehicleModify.obj={};
		this.vehicleModify.toModal = function (item) {
			$.extend(this.obj ,item);
			this.obj.license={
				front:item.license.substr(0,1),
				middle:item.license.substr(1,1),
				end:item.license.substr(2)
			};
			this.isShow = true;
		};
		this.vehicleModify.clear = function () {
			this.isShow = false;
		};
		this.vehicleModify.execute = function () {
			var __this = this;
			this.obj.license = this.obj.license.front + this.obj.license.middle+this.obj.license.end;
			if(this.obj.purchasedDate){
				this.obj.purchasedDate /= 1000;
			}
			this.obj.lastRecordTime = new Date().getTime()/1000;
			console.log(this.obj)
			_this.$http.post('/vehicle/updateVehicle', this.obj).then(function(res){
				console.log(res)
				_this.getVehicleList();
				__this.isShow = false;
			}, function(err){
				console.error(err)
			})
		};

		this.vehicleDelete.obj={};
		this.vehicleDelete.toModal = function (item) {
			this.obj = item;
			this.isShow = true;
		};
		this.vehicleDelete.execute = function () {
			var __this = this;
			_this.$http.post('/vehicle/deleteVehicle', this.obj.license).then(function(res){
				console.log(res)
				_this.getVehicleList();
				_this.getVehicleNum();	
				__this.isShow = false;
			}, function(err){
				console.error(err)
			})
			this.isShow = false;
		};
		this.vehicleDelete.clear = function () {
			this.obj = {};
			this.isShow = false;
		};
		
		this.addVehicle.obj={};
		this.addVehicle.toModal = function () {
			console.log(this)
			this.obj.license = {
				front:'',
				middle: '',
				end: ''
			};	
			this.isShow = true;
		};
		this.addVehicle.execute = function () {
			var __this = this;
			this.obj.license = this.obj.license.front + this.obj.license.middle+this.obj.license.end;
			if(this.obj.purchasedDate){
				this.obj.purchasedDate /= 1000;
			}
			this.obj.lastRecordTime = this.obj.purchasedDate;
			_this.$http.post('/vehicle/addVehicle', this.obj).then(function(res){
				console.log(res)
				_this.getVehicleRoutes();
			}, function(err){
				console.error(err)
			})
			this.isShow = false;
		};
		this.addVehicle.clear = function () {
			this.obj = {};
			this.isShow = false;
		};
	},
	mounted(){
		var _this_ = this;
		$(this.$el).find(".panel-body").niceScroll({
			grabcursorenabled: false
		});
		this.getVehicleRoutes()

	}
};