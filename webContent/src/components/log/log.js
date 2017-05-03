const log ={
	template:`
	<section id="user">
		<div class="top">
			<div class="panel">
				<div class="form-inline">
					<label for="">用户类型</label>
					<select name="" id="">
						<option v-for="item in common.userType" :value="item" v-text="item"></option>
					</select>
				</div>
				<div class="form-inline">
					<label for="">用户姓名</label>
					<input type="text" />
				</div>
				<div class="form-inline">
					<label for="">用户性别</label>
					<select name="" id="">
						<option v-for="item in common.gender" :value="item" v-text="item"></option>
					</select>
				</div>
				<div class="form-inline fr">
					<button>筛选</button>
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
				    			<th>登陆IP</th>
				    			<th>日志内容</th>
				    		</tr>
				    	</thead>
				    	<tbody>
					        <tr v-for="log in logList">
					        	<td v-text="log.type"></td>
					        	<td v-text="log.user"></td>
					        	<td v-text="log.time"></td>
					        	<td v-text="log.ip"></td>
					        	<td v-text="log.content"></td>
					        </tr>
				      </tbody>
			    	</table>
				</div>
				<div class="panel-footer">
					<div id="user-pagination"></div>
				</div>
			</div>
		</div>
	</section>
	`,
	data(){
		return{
			logList:[]
		};
	},
	created(){

	},
	mounted(){
		$(this.$el).find(".panel-body").niceScroll({
			grabcursorenabled: false
		});
		function handlePaginationClick(new_page_index, pagination_container) {
			console.log(new_page_index,pagination_container)
		    return false;
		}
		$("#user-pagination").pagination(1500, {
	        items_per_page:20,
	        prev_text:"上一页",
	        next_text:"下一页",
	        num_display_entries:7,
	        callback:handlePaginationClick
		});
		var _this_ = this;
		window.setTimeout(function () {
			_this_.logList.push({
				id:"00001",
				ip:"192.168.1.101",
				time:"2016.12.12",
				user:"张晓霞",
				type:"登陆",
				content:"登陆系统"
			});
			for(var i = 0;i<50;i++)
				_this_.logList.push(_this_.logList[0]);
		},500);
	}
};