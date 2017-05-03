const parking_stat = {
	template:`
		<section id = "parking-stat">
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
				        <tr v-for="item in parkingList">
				        	<td v-text="item.name"></td>
				        	<td v-text="item.setNum"></td>
				        	<td v-text="item.vehicleNum"></td>
				        	<td>
				          		<a @click='showAllSet.toModal(item)'>泊位一览</a>	
				        	</td>
				        	<td>
				          		<a @click='showAllVehicle.toModal(item)'>车辆一览</a>		
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
						          <th>停泊线路</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for='item in showAllSet.obj.sets'>
						        	<td v-text="item.name"></td>
						        	<td v-text="item.available ? '无车辆' : '有车辆'"></td>
						        	<td v-text="item.vehicle.license"></td>
						        	<td v-text="item.vehicle.route"></td>
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
								<tr v-for='item in showAllVehicle.obj.vehicles'>
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
		</section>
	`,
	data(){
		return {
			parkingList:[],
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
		this.showAllSet.toModal = function (parking) {
			this.obj = parking;
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
		$(this.$el).find(".scroll1").niceScroll({
			grabcursorenabled: false
		});
		$(this.$el).find(".scroll2").niceScroll({
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

			_this_.parkingList = [{
				name: '中心停车场',
				setNum: 30,
				vehicleNum: 15,
				sets: [{
					name: '3D',
					available: false,
					lastRecordTime:"2016.2.2",
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
				},],
				vehicles: [{
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
				},]
			}];
			for(var i = 0;i<30;i++){
				_this_.parkingList.push(_this_.parkingList[0]);
				_this_.parkingList[0].sets.push(_this_.parkingList[0].sets[0]);
				_this_.parkingList[0].vehicles.push(_this_.parkingList[0].vehicles[0]);
			}
		},1000);
	}
};