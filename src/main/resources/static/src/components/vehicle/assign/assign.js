const vehicle_assign = {
	template:`
		<section id = "vehicle-assign">
			<div id="left">
				<list-menu :data="vehicleRoute" name = "公交路线"></list-menu>
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
					        	<td v-text="item.vehicle.route"></td>
					        	<td v-text="item.vehicle.license"></td>
					        	<td v-text="item.driver.name"></td>
					        	<td v-text="item.vehicle.curStat"></td>
					        	<td>
									<a v-text="item.nextStart" title="出车" @click="modifyNextStart.toModal(item)"></a>
					        	</td>
					        	<td class="operate-bar">
									<a class = "operate" title="出车" @click="startOut.toModal(item)">
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
					<h4 class="modal-title">是否派出车辆&nbsp;<span class="high-light" v-text="startOut.obj.vehicle.license"></span>&nbsp;？</h4>
				</div>
				<div class="modal-footer">
					<button class="btn ok" @click="startOut.clear()">确认</button>
					<button class="btn cancle" @click="startOut.clear()">取消</button>
				</div>
			</modal>
			<modal v-if = "modifyNextStart.isShow" id="modifyNextStart">
				<div class="modal-header">
					<h4 class="modal-title">修改车牌号为 &nbsp;<span class="high-light" v-text="modifyNextStart.obj.vehicle.license"></span>&nbsp;的车辆的下次发车时间至：</h4></br>
					<datetime-picker class='modifyNextStartDatetimePicker' :data="modifyNextStart.obj.nextStart"></datetime-picker>
				</div>
				<div class="modal-footer">
					<button class="btn ok" @click="modifyNextStart.clear()">确认</button>
					<button class="btn cancle" @click="modifyNextStart.clear()">取消</button>
				</div>
			</modal>
		</section>
	`,
	data(){
		return {
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
	methods:{
	},
	created(){
		this.$on("select",function (selected) {
			console.log(selected);
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
			this.obj = {};
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
			_this_.vehicleList = [{
				vehicle:{
					route:"123",
					license:"浙A·12345",
					photo:"img/avatar-default.png",
					model:"",
					purchasedDate:"2015-3-10",
					maintenance:"",
					km:"",
					lastRecordTime:"2016.2.2",
					curStat:"出车"
				},
				driver:{
					name:"张晓丽",
					age:"32",
					photo:"img/avatar-default.png",
					gender:"女",
					birth:"",
					ID:"",
					address:"",
					cellPhone:"",
					email:"",
					startDate:""
				},
				nextStart: '2016.2.2'

			}];
			for(var i = 0;i<30;i++){
				_this_.vehicleList.push(_this_.vehicleList[0]);
			}
		},1000);
	}
};