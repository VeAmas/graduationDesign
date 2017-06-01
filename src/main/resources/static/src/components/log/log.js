const log ={
	template:`
	<section id="log">
		<div class="top">
			<div class="panel">
				<div class="form-inline">
					<label for="">日志类型</label>
					<select name="" id="" v-model = 'query.type'>
						<option v-for="item in common.logType" :value="item" v-text="item"></option>
					</select>
				</div>
				<div class="form-inline">
					<label for="">开始时间</label>
					<datetime-picker :data="'$children.2.query.startTime'"></datetime-picker>
				</div>
				<div class="form-inline">
					<label for="">结束时间</label>
					<datetime-picker :data="'$children.2.query.endTime'"></datetime-picker>
				</div>
				<div class="form-inline fr">
					<button @click = 'getLogNum();getLogList()'>筛选</button>
				</div>
				<div class="form-inline fr">
					<button @click = 'query = {};clearDatetimePick()'>清空</button>
				</div>
			</div>
		</div>
		<div class="bottom">
			<div class="panel">
				<div class="panel-head">
					用户列表
				</div>
				<div class="panel-body">
					<table class="table table-striped table-hover">
				    	<thead>
				    		<tr>
				    			<th>日志类型</th>
				    			<th>用户</th>
				    			<th>时间</th>
				    			<th>停车场名称</th>
				    			<th>泊位名称</th>
				    			<th>日志内容</th>
				    		</tr>
				    	</thead>
				    	<tbody>
					        <tr v-for="log in logList">
					        	<td v-text="log.type"></td>
					        	<td v-text="log.user"></td>
					        	<td v-text="new Date(log.time*1000).toLocaleString()"></td>
					        	<td v-text="log.parking"></td>
					        	<td v-text="log.set"></td>
					        	<td v-text="log.content"></td>
					        </tr>
				      </tbody>
			    	</table>
				</div>
				<div class="panel-footer">
					<div id="log-pagination"></div>
				</div>
			</div>
		</div>
	</section>
	`,
	data(){
		return{
			query: {},
			curPage: 0,
			logList:[]
		};
	},
	methods: {
		getLogNum: function(){
			var _this_ = this;
			var handlePaginationClick = function (new_page_index, pagination_container) {
				_this_.curPage = new_page_index;
				_this_.getLogList();
			    return false;
			};
			if((this.query.startTime + '').length > 11)
				this.query.startTime /= 1000;
			if((this.query.endTime + '').length > 11)
				this.query.endTime /= 1000;
			
			this.$http.post('/log/getLogNum', {
				type: _this_.query.type,
				startTime: _this_.query.startTime,
				endTime: _this_.query.endTime,
			}).then(function(res){
			
				$("#log-pagination"	).pagination(res.body, {
			        items_per_page:20,
			        prev_text:"上一页",
			        next_text:"下一页",
			        num_display_entries:7,
			        callback:handlePaginationClick
				});
			});
			
		},
		clearDatetimePick: function(){
			$('#log input').val('');
		},
		getLogList: function () {
			var _this_ = this;
			
			this.$http.post('/log/queryLog', {
				type: _this_.query.type,
				startTime: _this_.query.startTime,
				endTime: _this_.query.endTime,
				curPage: _this_.curPage,
				itemsPrePage: 20
			}).then(function(res){
				if (res.body) {
					_this_.logList = res.body;
				}
			})
		}
	},
	created(){

	},
	mounted(){
		$(this.$el).find(".panel-body").niceScroll({
			grabcursorenabled: false
		});
		this.getLogNum();
		this.getLogList();
	}
};