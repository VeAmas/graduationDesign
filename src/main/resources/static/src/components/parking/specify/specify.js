const parking_specify = {
	template:`
		<section id = "parking-specify">
			<div id="left">
				<list-menu :data="parkingList" name = "停车场列表"></list-menu>
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
					          <th>泊位编号</th>
					          <th>泊位状态</th>
					          <th>当前停泊车辆</th>
					          <th>停泊线路</th>
					          <th>更新时间</th>
					          <th>操作</th>
					        </tr>
					      </thead>
					      <tbody>
					        <tr v-for="item in parkingSetList">
					        	<td v-text="item.name"></td>
					        	<td v-text="item.available ? '无车辆' : '有车辆'"></td>
					        	<td v-text="item.license"></td>
					        	<td v-text="item.route"></td>
					        	<td v-text="item.lastRecordTime"></td>
					        	<td class="operate-bar">
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
						<option v-for='item in parkingSetSpecify.vehicleList' v-text='item.license' :value='item.license'/>
					</select>
				</div>
				<div class="modal-footer">
					<button class="btn ok" @click="parkingSetSpecify.execute()">确认</button>
					<button class="btn cancle" @click="parkingSetSpecify.clear()">关闭</button>
				</div>
			</modal>
			<modal v-if = "parkingSetDelete.isShow" id="vehicle_delete">
				<div class="modal-header">
					<h4 class="modal-title">是否删除编号为&nbsp;<span class="high-light" v-text="parkingSetDelete.obj.set.name"></span>&nbsp;的车位？</h4>
				</div>
				<div class="modal-footer">
					<button class="btn ok" @click="parkingSetDelete.clear()">确认</button>
					<button class="btn cancle" @click="parkingSetDelete.clear()">取消</button>
				</div>
			</modal>
		</section>
	`,
	data(){
		return {
			curPage: 0,
			curParking: null,
			parkingList: [],
			vehicleRoute:[],
			parkingSetList:[],
			parkingSetSpecify:{
				isShow:false
			},
			parkingSetDelete:{
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
				name: _this_.curName,
				available: _this_.curAvailable,				
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
				name: _this_.curName,
				available: _this_.curAvailable,		
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
		this.parkingSetSpecify.obj={};
		this.parkingSetSpecify.toModal = function () {
			this.vehicleList = [{
				route:"123",
				license:"浙A·12345",
				photo:"img/avatar-default.png",
				model:"",
				purchasedDate:"2015-3-10",
				maintenance:"",
				km:"",
				lastRecordTime:"2016.2.2",
				curStat:"出车"
			},{
				route:"123",
				license:"浙A·12345",
				photo:"img/avatar-default.png",
				model:"",
				purchasedDate:"2015-3-10",
				maintenance:"",
				km:"",
				lastRecordTime:"2016.2.2",
				curStat:"出车"
			}];
			this.isShow = true;
		};
		this.parkingSetSpecify.clear = function () {
			this.isShow = false;
		};
		this.parkingSetSpecify.execute = function () {
			this.isShow = false;
		};

		this.parkingSetDelete.obj={};
		this.parkingSetDelete.toModal = function (item) {
			this.obj = item;
			this.isShow = true;
		};
		this.parkingSetDelete.execute = function () {
			this.obj = {};
			this.isShow = false;
		};
		this.parkingSetDelete.clear = function () {
			this.obj = {};
			this.isShow = false;
		};
	},
	mounted(){
		var _this_ = this;
		$(this.$el).find(".panel-body").niceScroll({
			grabcursorenabled: false
		});
		this.getParkings()
	}

};