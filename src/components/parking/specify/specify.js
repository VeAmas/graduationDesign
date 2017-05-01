const parking_specify = {
	template:`
		<section id = "vehicle-stat">
			<div id="left">
				<list-menu :data="vehicleRoute" name = "停车场列表"></list-menu>
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
					        	<td v-text="item.set.name"></td>
					        	<td v-text="item.set.available ? '无车辆' : '有车辆'"></td>
					        	<td v-text="item.vehicle.license"></td>
					        	<td v-text="item.vehicle.route"></td>
					        	<td v-text="item.set.lastRecordTime"></td>
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
			<modal v-if = "parkingSetSpecify.isShow" id="vehicle_modify">
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
	methods:{
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