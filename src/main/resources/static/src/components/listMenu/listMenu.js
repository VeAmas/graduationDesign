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
	watch: {
		data: function (val, oldVal) {
			this.getItems();
			this.items[0].isActive = true;
		}
	},
	mounted(){
		$(this.$el).find("ul").niceScroll({
			grabcursorenabled: false
		});
		// console.log(this.$el).
		
	},
	  data(){
	      return{items:[]}
	  },
	methods:{
		click(v){
			this.$parent.$emit("select",v.name);

			this.items.forEach(i=>{
		          i.isActive = false;
		      })
		      v.isActive = true;
		},
		getItems(){
			var list = [];
			this.data.forEach(i=> {
	            list.push({
	                name:i,
	                isActive:false
	            });
	        });
			this.items = list;
	    }
	}
})