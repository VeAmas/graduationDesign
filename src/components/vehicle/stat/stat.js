const vehicle_stat = {
	template:`
		<section id = "vehicle-stat">
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
					          <th>更新时间</th>
					          <th>操作</th>
					        </tr>
					      </thead>
					      <tbody>
					        <tr v-for="item in vehicleList">
					        	<td v-text="item.vehicle.route"></td>
					        	<td v-text="item.vehicle.license"></td>
					        	<td v-text="item.driver.name"></td>
					        	<td v-text="item.vehicle.curStat"></td>
					        	<td v-text="item.vehicle.lastRecordTime"></td>
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
							<img :src="vehicleCheck.obj.vehicle.photo" />
						</div>
						<div class="stat">
							<table>
								<tr><td>车牌号</td><td v-text="vehicleCheck.obj.vehicle.license"></td></tr>
								<tr><td>公交线路</td><td v-text="vehicleCheck.obj.vehicle.route"></td></tr>
								<tr><td>车辆型号</td><td v-text="vehicleCheck.obj.vehicle.model"></td></tr>
								<tr><td>购买日期</td><td v-text="vehicleCheck.obj.vehicle.purchasedDate"></td></tr>
								<tr><td>保养等级</td><td v-text="vehicleCheck.obj.vehicle.maintenance"></td></tr>
								<tr><td>行驶公里数</td><td v-text="vehicleCheck.obj.vehicle.km"></td></tr>
								<tr><td>上一次更新时间</td><td v-text="vehicleCheck.obj.vehicle.lastRecordTime"></td></tr>
								<tr><td>当前状态</td><td v-text="vehicleCheck.obj.vehicle.curStat"></td></tr>
							</table>
						</div>
					</div>
					<div>当前驾驶员信息：</div>
					<div class="driver-info">
						<div class="photo">
							<img :src="vehicleCheck.obj.driver.photo" />
						</div>
						<div class="stat">
							<table>
								<tr>
									<td>姓名</td><td v-text="vehicleCheck.obj.driver.name"></td>
									<td>年龄</td><td v-text="vehicleCheck.obj.driver.age"></td>
									<td>性别</td><td v-text="vehicleCheck.obj.driver.gender"></td>
								</tr>
								<tr><td>出生日期</td><td colspan="5" v-text="vehicleCheck.obj.driver.birth"></td></tr>
								<tr><td>身份证号码</td><td colspan="5" v-text="vehicleCheck.obj.driver.ID"></td></tr>
								<tr><td>地址</td><td colspan="5" v-text="vehicleCheck.obj.driver.address"></td></tr>
								<tr><td>联系电话</td><td colspan="5" v-text="vehicleCheck.obj.driver.cellPhone"></td></tr>
								<tr><td>邮件</td><td colspan="5" v-text="vehicleCheck.obj.driver.email"></td></tr>
								<tr><td>开始工作日期</td><td colspan="5" v-text="vehicleCheck.obj.driver.startDate"></td></tr>
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
							<img :src="vehicleModify.obj.vehicle.photo" />
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
										<input type="text" v-model="vehicleModify.obj.vehicle.route"/>
									</td>
								</tr>
								<tr><td>车辆型号</td>
									<td>
										<input type="text" v-model="vehicleModify.obj.vehicle.model"/>
									</td>
								</tr>
								<tr><td>购买日期</td>
									<td>
										<datetime-picker class='purchasedDate' :data="vehicleModify.obj.vehicle.purchasedDate"></datetime-picker>
									</td>
								</tr>
								<tr><td>保养等级</td>
									<td>
										<select v-model="vehicleModify.obj.vehicle.maintenance">
											<option v-for="p in common.maintenanceLevel" :value="p" v-text="p"></option>
										</select>
									</td>
								</tr>
								<tr><td>行驶公里数</td>
									<td>
										<input type="text" v-model="vehicleModify.obj.vehicle.km"/>
									</td>
								</tr>
								<tr><td>当前状态</td>
									<td>
										<select v-model="vehicleModify.obj.vehicle.curStat">
											<option v-for="p in common.vehicleStat" :value="p" v-text="p"></option>
										</select>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn cancle" @click="vehicleModify.clear()">关闭</button>
				</div>
			</modal>
			<modal v-if = "vehicleDelete.isShow" id="vehicle_delete">
				<div class="modal-header">
					<h4 class="modal-title">是否删除车牌号为&nbsp;<span class="high-light" v-text="vehicleDelete.obj.vehicle.license"></span>&nbsp;的车辆？</h4>
				</div>
				<div class="modal-footer">
					<button class="btn ok" @click="vehicleDelete.clear()">确认</button>
					<button class="btn cancle" @click="vehicleDelete.clear()">取消</button>
				</div>
			</modal>
		</section>
	`,
	data(){
		return {
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
			}
		};
	},
	methods:{
	},
	created(){
		this.$on("select",function (selected) {
			console.log(selected);
		});

		this.vehicleCheck.obj={};
		this.vehicleCheck.toModal = function (item) {
			this.obj = item;
			this.isShow = true;
		};
		this.vehicleCheck.clear = function () {
			this.obj = {};
			this.isShow = false;
		};

		this.vehicleModify.obj={};
		this.vehicleModify.toModal = function (item) {
			$.extend(this.obj ,item);
			this.obj.license={
				front:item.vehicle.license.substr(0,1),
				middle:item.vehicle.license.substr(1,1),
				end:item.vehicle.license.substr(3)
			};
			this.isShow = true;
		};
		this.vehicleModify.clear = function () {
			this.isShow = false;
		};

		this.vehicleDelete.obj={};
		this.vehicleDelete.toModal = function (item) {
			this.obj = item;
			this.isShow = true;
		};
		this.vehicleDelete.execute = function () {
			this.obj = {};
			this.isShow = false;
		};
		this.vehicleDelete.clear = function () {
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

			}];
			for(var i = 0;i<100;i++){
				_this_.vehicleList.push(_this_.vehicleList[0]);
			}
		},1000);
	}
};