Vue.component('epNav',{
	template:`
	<section>
		<div class="container">
			<ul class="menu">
				<li class="level1" v-for="menu in menus" :class="{expanded:menu.expanded,active:menu.active}">
					<div class="item" @click="toggle(menu),activate(menu)">
						<router-link :to="menu.link" class="plain link"></router-link>
						<span class="icon glyphicon" :class="menu.icon"></span>
						<span v-text="menu.data"></span>
						<span v-if="menu.children" class="arrow glyphicon glyphicon-menu-right" aria-hidden="true"></span>
					</div>
					<ul v-if="menu.children" :style="menu.style">
						<li class="level2" v-for="subMenu in menu.children" :class="{active:subMenu.active}">
							<div class="item" @click="activate(subMenu,menu)">
								<router-link :to="subMenu.link" class="plain link"></router-link>
								<span class="indent1 icon glyphicon" :class="subMenu.icon"></span>
								<span v-text="subMenu.data"></span>
							</div>
						</li>
					</ul>
				</li>
			</ul>
			<hr />
			<div class="version">
				<span class="icon glyphicon glyphicon-fire"></span>&nbsp;Version<span>&nbsp;0.0.1</span>
			</div>
		</div>
	</section>
	`,
	data(){
		return {
			menus:[],
			dom:null
		};
	},
	methods:{
		toggle(item){	
			if(!item.children){
				return;
			}
			if(item.expanded){
				item.expanded = false;
				item.style = "height:0";
			}else{
				this.menus.forEach(function (index) {
					index.expanded = false;
					index.style = "height:0";
				});
				item.expanded = true;
				item.style = "height:"+item.children.length*50+"px";
			}			
			return;
		},
		clearActive(){
			this.menus.forEach(function (index) {
				index.active = false;
				if(index.children){
					index.children.forEach(function (subIndex) {
						subIndex.active = false;
					});
				}
			});
		},
		activate(item,parent){
			if(!parent){
				if(!item.children){
					this.clearActive();
					item.active = true;					
				}
			}
			else{
				this.clearActive();
				item.active = true;
				parent.active = true;
			}
		},
		createInk(e){
			console.log("click");
			var target = $(e.target).closest("li");
			var width = target.width()/2;
			$(this.dom).find(".ink").remove();
			var ink = `<div class="ink" 
						style="width:`+width*2+`px;
							height:`+width*2+`px;
							position:absolute;
							top:`+(-width+e.pageY-target.offset().top)+`px;
							left:`+(-width+e.pageX)+`px">
						</div>`;
			target.children(".item").append($(ink));
		}
	},
	mounted(){
		var _this_ = this;
		this.dom = $(this.$el);
		window.setTimeout(function() {
		var menus = [{
			data:"车辆管理",
			icon:"glyphicon-search",
			link:"",
			children:[{
				data:"车辆信息",
				icon:"glyphicon-heart",
				link:"/vehicle/stat"
			},{
				data:"保养编排",
				icon:"glyphicon-star",
				link:"/vehicle/assign"
			}]
		},{
			data:"泊位管理",
			icon:"glyphicon-star-empty",
			link:"",
			children:[{
				data:"泊位指定",
				icon:"glyphicon-user",
				link:""
			},{
				data:"泊位概况",
				icon:"glyphicon-film",
				link:""
			}]
		},{
			data:"统计报表",
			icon:"glyphicon-th-large",
			link:"",
			children:null
		},{
			data:"用户管理",
			icon:"glyphicon-th",
			link:"/user",
			children:null
		},{
			data:"日志管理",
			icon:"glyphicon-th-list",
			link:"",
			children:null
		}];
		for(var i = 0;i<menus.length;i++){
			menus[i].expanded = false;
			menus[i].active = false;
			menus[i].style = "height:0";
		}
		_this_.menus = menus;
		}, 200);
	},
	updated(){
		if(!this.rendered){
			this.li = this.dom.find(".item");
			this.li.on("click",this.createInk);
		}
		this.rendered = true;
	}
});

