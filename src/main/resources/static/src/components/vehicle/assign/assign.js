const vehicle_assign = {
	template:`
		<section id = "vehicle-assign">
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
					</div>
					<div class="panel-body">
						<table class="table table-striped table-hover">
					      <thead>
					        <tr>
					          <th>线路</th>
					          <th>车牌号</th>
					          <th>当前驾驶员</th>
					          <th>当前状态</th>
					          <th>下次出车时间</th>
					          <th>操作</th>
					        </tr>
					      </thead>
					      <tbody>
					        <tr v-for="item in vehicleList">
					        	<td v-text="item.route"></td>
					        	<td v-text="item.license"></td>
					        	<td v-text="item.curUser"></td>
					        	<td v-text="item.curStat"></td>
					        	<td>
									<a v-text="item.nextStart" title="出车" @click="modifyNextStart.toModal(item)"></a>
					        	</td>
					        	<td class="operate-bar">
									<a v-show='item.curStat === "停车"' class = "operate" title="出车" @click="startOut.toModal(item)">
										出车
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
			<modal v-if = "startOut.isShow" id="startOut">
				<div class="modal-header">
					<h4 class="modal-title">是否派出车辆&nbsp;<span class="high-light" v-text="startOut.obj.license"></span>&nbsp;？</h4>
				</div>
				<div class="modal-footer">
					<button class="btn ok" @click="startOut.execute()">确认</button>
					<button class="btn cancle" @click="startOut.clear()">取消</button>
				</div>
			</modal>
			<modal v-if = "modifyNextStart.isShow" id="modifyNextStart">
				<div class="modal-header">
					<h4 class="modal-title">修改车牌号为 &nbsp;<span class="high-light" v-text="modifyNextStart.obj.license"></span>&nbsp;的车辆的下次发车时间至：</h4></br>
					<datetime-picker class='modifyNextStartDatetimePicker' :data="modifyNextStart.obj.nextStart"></datetime-picker>
				</div>
				<div class="modal-footer">
					<button class="btn ok" @click="modifyNextStart.execute()">确认</button>
					<button class="btn cancle" @click="modifyNextStart.clear()">取消</button>
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
			startOut:{
				isShow:false
			},			
			modifyNextStart:{
				isShow:false
			}
		};
	},
	watch: {
		curRoute: function (val, oldVal) {
			this.getVehicleList(true);	
			console.log(val)
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
				curStat: _this_.query.curStat		
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
		});

		this.startOut.obj={};
		this.startOut.toModal = function (item) {
			this.obj = item;
			this.isShow = true;
		};
		this.startOut.clear = function () {
			this.obj = {};
			this.isShow = false;
		};
		this.startOut.execute = function () {
			this.obj.curStat = '出车';
			this.obj.lastRecordTime = new Date().getTime()/1000;
			_this.$http.post('/vehicle/updateVehicle', this.obj).then(function(res){
				_this.getVehicleList();
			}, function(error){
				console.error(error)
			})
			this.isShow = false;
		};

		this.modifyNextStart.obj={};
		this.modifyNextStart.toModal = function (item) {
			this.obj = item;
			this.isShow = true;
		};
		this.modifyNextStart.clear = function () {
			this.obj = {};
			this.isShow = false;
		};
		this.modifyNextStart.execute = function () {
			this.obj.nextStart = new Date(this.obj.nextStart).getTime();
			console.log(this.obj)
			_this.$http.post('/vehicle/updateVehicle', this.obj).then(function(res){
				_this.getVehicleList();
			}, function(error){
				console.error(error)
			})
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