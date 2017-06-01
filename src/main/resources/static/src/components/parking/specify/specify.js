const parking_specify = {
	template:`
		<section id = "parking-specify">
			<div id="left">
				<list-menu :data="parkingList" name = "停车场列表"></list-menu>
			</div>
			<div id="top">
				<div class="panel">
					<div class="form-inline">
						<label for="">泊位名称</label>
						<input v-model = 'query.name' type="text" />
					</div>
					<div class="form-inline">
						<label for="">泊位状态</label>
						<select name="" id="" v-model='query.available'>
							<option v-for="item in common.available" :value="item==='无车辆'" v-text="item"></option>
						</select>
					</div>
					<div class="form-inline fr">
						<button @click = 'getSetList()'>筛选</button>
					</div>
					<div class="form-inline fr">
						<button @click = 'query = {}'>清空</button>
					</div>
				</div>
			</div>
			<div id="right">
				<div class="panel">
					<div class="panel-head">
						泊位列表
						<div class="form-inline">
							<button @click="autoSpecify.toModal()"><span class="glyphicon glyphicon-refresh"></span>&nbsp;自动分配</button>
						</div>
						<div class="form-inline">
							<button  @click = 'parkingSetAdd.toModal()'><span class="glyphicon glyphicon-plus"></span>&nbsp;添加泊位</button>
						</div>
					</div>
					<div class="panel-body">
						<table class="table table-striped table-hover">
					      <thead>
					        <tr>
					          <th>泊位编号</th>
					          <th>泊位状态</th>
					          <th>当前停泊车辆</th>
					          <th>更新时间</th>
					          <th>操作</th>
					        </tr>
					      </thead>
					      <tbody>
					        <tr v-for="item in parkingSetList">
					        	<td v-text="item.name"></td>
					        	<td v-text="item.curVehicle ? '有车辆' : '无车辆'"></td>
					        	<td v-text="item.curVehicle"></td>
					        	<td v-text="new Date(item.lastRecordTime*1000).toLocaleString()"></td>
					        	<td class="operate-bar">
									<a class = "operate" title="修改泊位" @click="parkingSetModify.toModal(item)">
										<span class="glyphicon glyphicon-file"></span>
									</a>
									<a class = "operate" title="指派泊位" @click="parkingSetSpecify.toModal(item)">
										<span class="glyphicon glyphicon-cog"></span>
									</a>
									<a class = "operate" title="删除泊位" @click="parkingSetDelete.toModal(item)">
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
			<modal v-if = "parkingSetSpecify.isShow" id="parkingSetSpecify">
				<div class="modal-header">
					<h4 class="modal-title">车辆修改</h4>
				</div>
				<div class="modal-body">
					您将把该车位指派给&nbsp;<span class="high-light">车辆&nbsp;</span> 
					<select  v-model="parkingSetSpecify.obj.specifyVehicle">
						<option v-for='item in parkingSetSpecify.obj' v-text='item.license' :value='item.license'/>
					</select>
				</div>
				<div class="modal-footer">
					<button class="btn ok" @click="parkingSetSpecify.execute()">确认</button>
					<button class="btn cancle" @click="parkingSetSpecify.clear()">关闭</button>
				</div>
			</modal>
			<modal v-if = "parkingSetDelete.isShow" id="vehicle_delete">
				<div class="modal-header">
					<h4 class="modal-title">是否删除编号为&nbsp;<span class="high-light" v-text="parkingSetDelete.obj.name"></span>&nbsp;的车位？</h4>
				</div>
				<div class="modal-footer">
					<button class="btn ok" @click="parkingSetDelete.execute()">确认</button>
					<button class="btn cancle" @click="parkingSetDelete.clear()">取消</button>
				</div>
			</modal>
			<modal v-if = "parkingSetAdd.isShow" id="vehicle_delete">
				<div class="modal-header">
					<h4 class="modal-title">添加泊位</h4>
				</div>
				<div class="modal-body">
					<div class="form-inline">
						<label for="">泊位名称</label>
						<input type="text" v-model = 'parkingSetAdd.obj'/>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn ok" @click="parkingSetAdd.execute()">确认</button>
					<button class="btn cancle" @click="parkingSetAdd.clear()">取消</button>
				</div>
			</modal>
			<modal v-if = "parkingSetModify.isShow" id="vehicle_delete">
				<div class="modal-header">
					<h4 class="modal-title">添加泊位</h4>
				</div>
				<div class="modal-body">
					<div class="form-inline">
						<label for="">泊位名称</label>
						<input type="text" v-model = 'parkingSetModify.obj.name'/>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn ok" @click="parkingSetModify.execute()">确认</button>
					<button class="btn cancle" @click="parkingSetModify.clear()">取消</button>
				</div>
			</modal>
			<modal v-if = "autoSpecify.isShow" id="vehicle_delete">
				<div class="modal-header">
					<h4 class="modal-title">是否要自动分配泊位？</h4>
				</div>
				<div class="modal-footer">
					<button class="btn ok" @click="autoSpecify.execute()">确认</button>
					<button class="btn cancle" @click="autoSpecify.clear()">取消</button>
				</div>
			</modal>
		</section>
	`,
	data(){
		return {
			query: {},
			curPage: 0,
			curParking: null,
			parkingList: [],
			vehicleRoute:[],
			parkingSetList:[],
			autoSpecify:{
				isShow:false
			},
			parkingSetSpecify:{
				isShow:false
			},
			parkingSetDelete:{
				isShow:false
			},
			parkingSetAdd:{
				isShow:false
			},
			parkingSetModify:{
				isShow:false
			}
		};
	},
	watch: {
		curParking: function (val, oldVal) {
			this.getSetList(true);	
		}
	},
	methods:{
		getSetNum: function(){
			var _this_ = this;
			var handlePaginationClick = function (new_page_index, pagination_container) {
				_this_.curPage = new_page_index;
				_this_.getSetList();
			    return false;
			};
			this.$http.post('/parkingSet/getSetNum', {
				parkingId: _this_.curParking.parkingId,
				name: _this_.query.name,
				available: _this_.query.available			
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
		getParkings: function () {
			var _this_ = this;
			this.$http.post('/parking/queryParking', {}).then(function(res){
				if (res.body) {
					_this_.parkings = res.body;
					_this_.parkingList = res.body.map(function(v){
						return v.name;
					});
					_this_.curParking = res.body[0];
					_this_.getSetList();
					_this_.getSetNum();
				}
			})
		},
		getSetList: function () {
			var _this_ = this;
			var query = {
				parkingId: _this_.curParking.parkingId,
				name: _this_.query.name,
				available: _this_.query.available,		
				curPage: _this_.curPage,
				itemsPrePage: 20
				
			};
			this.$http.post('/parkingSet/queryParkingSet', query).then(function(res){
				if (res.body) {
					_this_.parkingSetList = res.body;					
				}
			})
		}	
	},
	created(){
		var _this = this;
		this.parkingSetSpecify.obj={};
		this.parkingSetSpecify.toModal = function (set) {
			this.curSet = set;
			var __this = this;
			_this.$http.post('/vehicle/queryVehicle', {
				parkingId: _this.curParking.parkingId
			}).then(function (res) {
				__this.obj = [{}].concat(res.body);
				__this.obj.specifyVehicle = set.curVehicle
				__this.isShow = true;
			}, function (err) {
				console.error(err);
			})
		};
		this.parkingSetSpecify.clear = function () {
			this.isShow = false;
		};
		this.parkingSetSpecify.execute = function () {
			var __this = this;
			_this.$http.post('/parkingSet/specify', {
				setId: this.curSet.setId,
				license: this.obj.specifyVehicle
			}).then(function (res) {
				__this.obj = [{}].concat(res.body);
				__this.isShow = false;
				_this.getSetList();
			}, function (err) {
				console.error(err);
				this.isShow = false;
			})
		};

		this.parkingSetDelete.obj={};
		this.parkingSetDelete.toModal = function (item) {
			this.obj = item;
			this.isShow = true;
		};
		this.parkingSetDelete.execute = function () {
			var __this = this;
			_this.$http.post('/parkingSet/deleteParkingSet', this.obj.setId).then(function (res) {
				__this.isShow = false;
				_this.getSetList();
			}, function (err) {
				console.error(err);
				this.isShow = false;
			})
		};
		this.parkingSetDelete.clear = function () {
			this.obj = {};
			this.isShow = false;
		};
		
		this.parkingSetAdd.obj={};
		this.parkingSetAdd.toModal = function (item) {
			this.obj = item;
			this.isShow = true;
		};
		this.parkingSetAdd.execute = function () {
			var __this = this;
			_this.$http.post('/parkingSet/addParkingSet', {
				name: this.obj,
			    available: true,
			    curVehicle: null,
			    parkingId: _this.curParking.parkingId,
			    lastRecordTime: new Date().getTime()/1000
			}).then(function (res) {
				__this.isShow = false;
				_this.getSetList();
			}, function (err) {
				console.error(err);
				this.isShow = false;
			})
		};
		this.parkingSetAdd.clear = function () {
			this.obj = {};
			this.isShow = false;
		};
		
		this.parkingSetModify.obj={};
		this.parkingSetModify.toModal = function (item) {
			this.obj = item;
			this.isShow = true;
		};
		this.parkingSetModify.execute = function () {
			var __this = this;
			this.obj.lastRecordTime = new Date().getTime()/1000; 
			_this.$http.post('/parkingSet/updateParkingSet', this.obj ).then(function (res) {
				__this.isShow = false;
				_this.getSetList();
			}, function (err) {
				console.error(err);
				this.isShow = false;
			})
		};
		this.parkingSetModify.clear = function () {
			this.obj = {};
			this.isShow = false;
		};
		
		this.autoSpecify.obj={};
		this.autoSpecify.toModal = function (item) {
			this.obj = item;
			this.isShow = true;
		};
		this.autoSpecify.execute = function () {
			var __this = this;
			_this.$http.post('/parking/autoSpecify', _this.curParking.name ).then(function (res) {
				__this.isShow = false;
				_this.getSetList();
			}, function (err) {
				console.error(err);
				this.isShow = false;
			})
		};
		this.autoSpecify.clear = function () {
			this.obj = {};
			this.isShow = false;
		};
	},
	mounted(){
		var _this_ = this;
		this.$on("select",function (selected) {
			var p;
			this.parkings.forEach(function(v){
				if(v.name === selected){
					p = v
				}
			})
			this.curParking = p;
		});
		$(this.$el).find(".panel-body").niceScroll({
			grabcursorenabled: false
		});
		this.getParkings()
	}

};