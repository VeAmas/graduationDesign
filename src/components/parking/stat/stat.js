const parking_stat = {
	template:`
		<section id = "parking-stat">
			<div id="right">
				<div class="panel">
					<div class="panel-head">
						车辆列表
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
					        <tr v-for="item in parkingSetList">
					        	<td v-text="item.set.name"></td>
					        	<td v-text="item.set.available ? '无车辆' : '有车辆'"></td>
					        	<td v-text="item.vehicle.license"></td>
					        	<td>
					          		<a @click='showAllSet.toModal()'>泊位一览</a>	
					        	</td>
					        	<td>
					          		<a @click='showAllVehicle.toModal()'>车辆一览</a>		
					        	</td>
					        	<td v-text="item.set.lastRecordTime"></td>
					        </tr>
					      </tbody>
				    	</table>
				    	
					</div>
					<div class="panel-footer">
						<div id="vehicle-stat-pagination"></div>
					</div>
				</div>
			</div>
			<modal v-if = "showAllSet.isShow" id="vehicle_delete">
				<div class="modal-header">
				</div>
				<div class="modal-footer">
					<button class="btn ok" @click="showAllSet.clear()">确认</button>
					<button class="btn cancle" @click="showAllSet.clear()">取消</button>
				</div>
			</modal>
			<modal v-if = "showAllVehicle.isShow" id="vehicle_delete">
				<div class="modal-header">
				</div>
				<div class="modal-footer">
					<button class="btn ok" @click="showAllVehicle.clear()">确认</button>
					<button class="btn cancle" @click="showAllVehicle.clear()">取消</button>
				</div>
			</modal>
		</section>
	`,
	data(){
		return {
			vehicleRoute:[],
			parkingSetList:[],
			showAllSet:{
				isShow:false
			},
			showAllVehicle:{
				isShow:false
			}
		};
	},
	methods:{
	},
	created(){
		this.showAllSet.obj={};
		this.showAllSet.toModal = function () {
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
		this.showAllSet.clear = function () {
			this.isShow = false;
		};
		this.showAllSet.execute = function () {
			this.isShow = false;
		};

		this.showAllVehicle.obj={};
		this.showAllVehicle.toModal = function (item) {
			this.obj = item;
			this.isShow = true;
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
		function handlePaginationClick(new_page_index, pagination_container) {
			console.log(new_page_index,pagination_container)
		    return false;
		}
		$("#vehicle-stat-pagination").pagination(1500, {
	        items_per_page:20,
	        prev_text:"上一页",
	        next_text:"下一页",
	        num_display_entries:7,
	        callback:handlePaginationClick
		});
		var _this_ = this;
		window.setTimeout(function(){

			_this_.vehicleRoute = [
				"sdfsef",
				"546",
				"sefsfe",
				"87874356",
				"sdfsef",
				"546",
				"sefsfe",
				"87874356",
				"sdfsef",
				"546",
				"sefsfe",
				"87874356",
				"sdfsef",
				"546",
				"sefsfe",
				"87874356",
				"sdfsef",
				"546",
				"sefsfe",
				"87874356",
				"sdfsef",
				"546",
				"sefsfe",
				"87874356",
				"sdfsef",
				"546",
				"sefsfe",
				"87874356",
			];
			_this_.parkingSetList = [{
				set: {
					name: '3D',
					available: false,
					lastRecordTime:"2016.2.2",
				},
				vehicle: {
					route:"123",
					license:"浙A·12345",
					photo:"img/avatar-default.png",
					model:"",
					purchasedDate:"2015-3-10",
					maintenance:"",
					km:"",
					lastRecordTime:"2016.2.2",
					curStat:"出车"
				}
			}];
			for(var i = 0;i<30;i++){
				_this_.parkingSetList.push(_this_.parkingSetList[0]);
			}
		},1000);
	}
};