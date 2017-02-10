Vue.component("list-menu",{
	template:`
		<div class="list-menu panel">
			<div v-text='name' class = 'name panel-head'></div>
			<ul>
				<li @click="click(item)" v-for="item in items" :class="{active:item.isActive}">
					<div class="">
						<span v-text="item.name"></span>
						<span class="glyphicon glyphicon-ok-sign"></span>
					</div>
				</li>
			</ul>
		</div>	
	`,
	props:{
		"data":{
			"required":true
		},
		'name':{
			"required":true
		}
	},
	mounted(){
		$(this.$el).find("ul").niceScroll({
			grabcursorenabled: false
		});
		// console.log(this.$el).
	},
	methods:{
		click(v){
			this.$parent.$emit("select",v.name);
			for(var i = 0;i<this.items.length;i++){
				this.$set(this.items[i],"name","sdf");
				console.log(this.items[i]);
			}
		}
	},
	computed:{
		items(){
			var list = [];
			this.data.forEach(function (i) {
				list.push({
					name:i,
					isActive:false
				});
			});
			return list;			
		}
	}
})