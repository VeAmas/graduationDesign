const parking_stat = {
	template:`
		<section id = "parking-stat">		
			<div id="top">
				<div class="panel">
					<div class="form-inline">
						<label for="">停车场名称</label>
						<input v-model = 'query.name' type="text" />
					</div>
					<div class="form-inline fr">
						<button @click = 'getSetList()'>筛选</button>
					</div>
					<div class="form-inline fr">
						<button @click = 'query = {}'>清空</button>
					</div>
				</div>
			</div>
			<div id='bottom'>
				<div class="panel">
					<div class="panel-head">
						停车场列表
						<div class="form-inline">
							<button  @click = 'addParking.toModal()'><span class="glyphicon glyphicon-plus"></span>&nbsp;添加停车场</button>
						</div>
					</div>
					<div class="panel-body">
						<table class="table table-striped table-hover">
					      <thead>
					        <tr>
					          <th>停车场名称</th>
					          <th>泊位数量</th>
					          <th>占用数量</th>
					          <th>泊位一览</th>	
					          <th>车辆一览</th>				          
					          <th>3D显示</th>
					        </tr>
					      </thead>
					      <tbody>
					        <tr v-for="item in parkingList">
					        	<td v-text="item.name"></td>
					        	<td v-text="item.setNum"></td>
					        	<td v-text="item.vehicleNum"></td>
					        	<td>
					          		<a @click='showAllSet.toModal(item.parkingId)'>泊位一览</a>	
					        	</td>
					        	<td>
					          		<a @click='showAllVehicle.toModal(item.parkingId)'>车辆一览</a>		
					        	</td>
					        	<td></td>
					        </tr>
					      </tbody>
				    	</table>
				    	
					</div>
					<div class="panel-footer">
						<div id="vehicle-stat-pagination"></div>
					</div>
				</div>
			</div>
			<modal v-show = "showAllSet.isShow" id="showAllSet">
				<div class="modal-header">
					<h4>停车场 <span class="high-light" v-text = 'showAllSet.obj.name'></span> 中的车位列表：</h4>
				</div>
				<div class="modal-body">
					<div class="scroll1">
						<table class="table">
							<thead>
								<tr>
						          <th>泊位编号</th>
						          <th>泊位状态</th>
						          <th>当前停泊车辆</th>
						          <th>上次更新时间</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for='item in showAllSet.obj'>
						        	<td v-text="item.name"></td>
						        	<td v-text="item.available ? '无车辆' : '有车辆'"></td>
						        	<td v-text="item.curVehicle"></td>
						        	<td v-text="item.lastRecordTime"></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn ok" @click="showAllSet.clear()">确认</button>
				</div>
			</modal>
			<modal v-show = "showAllVehicle.isShow" id="showAllVehicle">
				<div class="modal-header">
					<h4>停车场 <span class="high-light" v-text = 'showAllSet.obj.name'></span> 中的车辆列表：</h4>
				</div>
				<div class="modal-body">
					<div class="scroll2">
						<table class="table">
							<thead>
								<tr>
									<th>线路</th>
									<th>车牌号</th>
									<th>当前状态</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for='item in showAllVehicle.obj'>
						        	<td v-text="item.route"></td>
						        	<td v-text="item.license"></td>
						        	<td v-text="item.curStat"></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn ok" @click="showAllVehicle.clear()">确认</button>
				</div>
			</modal>
			
			<modal v-show = "addParking.isShow" id="showAllVehicle">
				<div class="modal-header">
					添加停车场
				</div>
				<div class="modal-body">
					<div>
						<div class="form-inline">
							<label for="">停车场名称</label>
							<input v-model = 'addParking.obj.name' type="text" />
						</div>	
					</div>	<div>
						<div class="form-inline">
							<label for="">停车场地址</label>
							<input v-model = 'addParking.obj.address' type="text" />
						</div>
					</div>						
				</div>
				<div class="modal-footer">
					<button class="btn ok" @click="addParking.execute()">确认</button>
					<button class="btn ok" @click="addParking.clear()">取消</button>
				</div>
			</modal>
		</section>
	`,
	data(){
		return {
			query: {},
			parkingList:[],
			addParking:{
				isShow:false
			},
			showAllSet:{
				isShow:false
			},
			showAllVehicle:{
				isShow:false
			}
		};
	},
	methods:{
		getParkingNum: function(){
			var _this_ = this;
			var handlePaginationClick = function (new_page_index, pagination_container) {
				_this_.curPage = new_page_index;
				_this_.getSetList();
			    return false;
			};
			this.$http.post('/parking/getParkingNum', {
				name: _this_.curName			
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
			this.$http.post('/parking/queryParking', {
				name: _this_.curName			
			}).then(function(res){
				if (res.body) {
					_this_.parkingList = res.body;
				}
			})
		}
	},
	created(){
		var _this_ = this;
		this.addParking.obj={};
		this.addParking.toModal = function (parkingId) {
			this.obj = {};
			this.isShow = true;
		};
		this.addParking.clear = function () {
			this.isShow = false;
		};
		this.addParking.execute = function () {	
			var __this = this;
			_this_.$http.post('/parking/addParking', this.obj).then(function (res) {
				_this_.getParkingNum(),
				_this_.getParkings()
				__this.isShow = false;
			}, function (err) {
				console.error(err);
			})
		};
		
		this.showAllSet.obj={};
		this.showAllSet.toModal = function (parkingId) {
			var __this = this;
			_this_.$http.post('/parkingSet/queryParkingSet', {
				parkingId: parkingId
			}).then(function (res) {
				__this.obj = res.body;
				__this.isShow = true;
			}, function (err) {
				console.error(err);
			})
		};
		this.showAllSet.clear = function () {
			this.isShow = false;
		};
		this.showAllSet.execute = function () {
			this.isShow = false;
		};

		this.showAllVehicle.obj={};
		this.showAllVehicle.toModal = function (parkingId) {
			var __this = this;
			_this_.$http.post('/vehicle/queryVehicle', {
				parkingId: parkingId
			}).then(function (res) {
				__this.obj = res.body;
				__this.isShow = true;
			}, function (err) {
				console.error(err);
			})
		};
		this.showAllVehicle.execute = function () {
			this.obj = {};
			this.isShow = false;
		};
		this.showAllVehicle.clear = function () {
			this.obj = {};
			this.isShow = false;
		};
	},
	mounted(){
		$(this.$el).find(".panel-body").niceScroll({
			grabcursorenabled: false
		});
		$(this.$el).find(".scroll1").niceScroll({
			grabcursorenabled: false
		});
		$(this.$el).find(".scroll2").niceScroll({
			grabcursorenabled: false
		});
		this.getParkings();
		this.getParkingNum();

	}
};