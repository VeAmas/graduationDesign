const report = {
	template:`
	<section id="report">
		<div id="left">
			<list-menu :data="leftList" :name = 'leftName'></list-menu>
		</div>
		<div id="top">
			<div class="panel">
				<div class="form-inline">
					<label for="">月份</label>
					<select name="" id="" v-model='query.month'>
						<option v-for="item in month" :value="item.value" v-text="item.text"></option>
					</select>
				</div>
				<div class="form-inline">
					<label for="">停车场</label>
					<select name="" id="" v-model='query.parkingId'>
						<option v-for="item in parkingList" :value="item.name" v-text="item.name"></option>
					</select>
				</div>
				<div class="form-inline">
					<label for="">类型</label>
					<select name="" id="" v-model='query.reportType'>
						<option v-for="item in common.reportType" :value="item" v-text="item"></option>
					</select>
				</div>
				<div class="form-inline fr">
					<button @click = 'queryList()'>查询</button>
				</div>
				<div class="form-inline fr">
					<button @click = 'query = {}'>清空</button>
				</div>
			</div>
		</div>
		<div id="right">
			<div class="panel">
				<div class="panel-head">
					统计报表				
				</div>
				<div class="panel-body">
					<div id='echarts'></div>
				</div>
				<div class="panel-footer">
					<div id="report-pagination"></div>
				</div>
			</div>
		</div>
	</section>
	`,
	data(){
		return {
			query: {},
			curItem: null,
			parkingList:[],
			leftList: [],
			leftName: '',
			month: [{},
				{text: '七月', value: -7},
				{text: '八月', value: -8},
				{text: '九月', value: -9},
				{text: '十月', value: -10},
				{text: '十一月', value: -11},
				{text: '十二月', value: -12},
				{text: '一月', value: 1},
				{text: '二月', value: 2},
				{text: '三月', value: 3},
				{text: '四月', value: 4},
				{text: '五月', value: 5},
				{text: '六月', value: 6}]
		};
	},
	watch: {
		curItem: function (val, oldVal) {
			var _this = this;
			if (this.query.reportType === '车辆') {
				this.$http.post('/parking/getReportVehicle', {
					parking: this.query.parkingId,
					month: this.query.month,
					license: val
				}).then(function(res){
					var d = [];
					for(var i = 1;i<32;i++){
						d.push(i+'日');
					}
					option = {
					    tooltip: { trigger: 'axis' },
					    grid: {
					        left: '4%',
					        right: '4%',
					        bottom: '3%',
					    },
					    xAxis: {
					        boundaryGap: false,
					        data: d
					    },
					    yAxis: {
					        type: 'value'
					    },
					    series: [
					        {
					            name:'发车次数',
					            type:'line',
					            smooth: true,
					            data:res.body
					        }
					    ]
					};
					_this.myChart.dispose();
					_this.myChart = echarts.init(document.getElementById('echarts'));
					_this.myChart.setOption(option); 
				})
			} else {
				this.$http.post('/parking/getReportSet', {
					parking: this.query.parkingId,
					month: this.query.month,
					setName: val
				}).then(function(res){
					var m = _this.query.month;
					var a = m<0?-1:0;
					var ms = Math.abs(m)
					if(m<10) ms = '0' + m
					var startTime = new Date((2017 +a) + '-' + ms + '-01').getTime() / 1000;
					var endTime = startTime + 2678400;
					var formatter = function(p){
					    return p.seriesName
					}
					var colors= [
						'#fe6471',   
						'#f4b2a6', 
						'#ecccb3',  
						'#bcefd0',  
						'#a1e8e4',   
						'#22c8b2',  
						'#c3ecee']
					var getOption = function(label, value,color){
						return {
				            name: label,
				            type: 'bar',
				            stack: '总量',
				            label: {
				                normal: {
				                    formatter: formatter,
				                    show: true,
				                    position: 'inside',
				                    textStyle: {
				                        fontSize: 24
				                    }
				                }
				            },
				            itemStyle:{
				                normal:{
				                    color:color
				                }
				                
				            },
				            data: [value]
				        }
					}
					var series = [];
					if (res.body.length === 0){
						var s = getOption('无', 100, '#999');
						series = [s]
					} else {
						if (res.body[0].logId==='-1') {
							var s = getOption(res.body[0].license, Math.abs(res.body.length>0?res.body[1].time - startTime:100), colors[0])
							series.push(s)
						} 
						for (var i = 1; i<res.body.length;i++) {
							if (res.body[i].logId==='-2') {
								var s = getOption(res.body[i].license, Math.abs(endTime - res.body[i-1].time), colors[i%7])
								series.push(s)
							} else {
								var s = getOption(res.body[i].license, Math.abs(res.body[i].time - res.body[i-1].time), colors[i%7])
								series.push(s)
							}
						}
					}
					option = {
					    grid: {
					        left: '0%',
					        right: '4%',
					        bottom: '3%',
					        containLabel: true
					    },
					    dataZoom: [					        
					        { type: 'inside'},
					    ],
					    xAxis:  {
					        type: 'value'
					    },
					    yAxis: {
					        type: 'category',
					        data: ['1']
					    },
					    series: series
					};

					_this.myChart.dispose();
					_this.myChart = echarts.init(document.getElementById('echarts'));
					_this.myChart.setOption(option); 
				})
			}
		}
	},
	methods:{
		getUserNum: function(){
			var _this_ = this;
			var handlePaginationClick = function (new_page_index, pagination_container) {
				_this_.curPage = new_page_index;
				_this_.getUserList();
			    return false;
			};
			this.$http.post('/user/getUserNum', {
				name: _this_.query.name,
				userType: _this_.query.userType,
				gender: _this_.query.gender	
			}).then(function(res){			
				$("#user-pagination").pagination(res.body, {
			        items_per_page:20,
			        prev_text:"上一页",
			        next_text:"下一页",
			        num_display_entries:7,
			        callback:handlePaginationClick
				});
			});
			
		},
		queryList : function(){
			var _this = this;
			if (this.query.month && this.query.parkingId && this.query.reportType) {
				var parkingId;
				this.parkingList.forEach(function(v){
					if(v.name === _this.query.parkingId){
						parkingId = v.parkingId;
					}
				})
				if(this.query.reportType === '车辆') {
					this.$http.post('/vehicle/queryVehicle', {parkingId :parkingId}).then(function(res){
						_this.vehicleList = res.body;
						_this.leftList = res.body.map(function(v){
							return v.license;
						})
					})					
				} else {
					this.$http.post('/parkingSet/queryParkingSet', {parkingId :parkingId}).then(function(res){
						_this.vehicleList = res.body;
						_this.leftList = res.body.map(function(v){
							return v.name;
						})
					})					
				}
			}
		}
	},
	created(){
		var _this = this;
//		this.userCheck.obj = {};
//		this.userCheck.toModal = function (item) {
//			this.obj = item;
//			this.isShow = true;
//		};
//		this.userCheck.clear=function () {
//			this.isShow = false;
//		};
//		
		
	},
	mounted(){
		var _this = this;
		this.$on("select",function (selected) {
			this.curItem = selected;
		});
		$(this.$el).find(".panel-body").niceScroll({
			grabcursorenabled: false
		});

		this.$http.post('/parking/queryParking', {}).then(function(res){
			_this.parkingList = [{}].concat(res.body);
		})

		this.myChart = echarts.init(document.getElementById('echarts'));
//		this.getUserNum();
//		this.getUserList();
	}
};