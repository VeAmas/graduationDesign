const s3dPark = {
	template:`
	<section id = 'scene3d'>
		<div id="canvas" ></div>
		<div class="leftPanel">
			<div class="sub-menu scene">
				<label>场景物品</label>
				<div class="item" v-for='item in model'>
					<span v-text='item.name' @click="selectModel(item.type),changeStat('modelHover'),setMenuState('addObject')"></span>
				</div>
			</div>
			<div class="sub-menu parkingSet">
				<label>车位</label>
				<div class="container">
					<div class="item" v-for = 'item in setList' v-show='!item.added' @click="selectModel('parkingSet', item.name),setMenuState('addObject'),changeStat('modelHover'),addSet(item)">
						车位号: <span v-text='item.name'></span>
					</div>
				</div>
			</div>

			<div class="bottomPanel">
				<div class="addObject" v-if='state.addObject'>		
					<button @click="scene().state.fn.cancelMove(),changeStat('selectObject'),setMenuState('normal')">取消</button>
				</div>
				<div class="selected" v-if='state.selected'>
					<button @click="scene().state.fn.deleteObject(),setMenuState('normal')">删除</button>
					<button @click="scene().state.fn.modifyObject(),setMenuState('addObject')">移动</button>
				</div>
			</div>
		</div>
		<button @click="changeStat('none')">none</button>
		<button @click="changeStat('floorHover')">floorHover</button>
		<button onclick='localStorage.clear()'>clear</button>
		<button onclick='console.dir(scene.saveData)'>saveData</button>
	</section>
	`,
	data:function(){
		return {
			state:{
				addObject:false,
				normal:true,
				selected:false
			},
			setList: [{
			    name: '3D',
			    id: '1568413'
			}, {
			    name: '4F',
			    id: '25438648'
			}, {
			    name: '3E',
			    id: '152483'
			}, {
			    name: '3F',
			    id: '483645836'
			},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'},{ name: '3F',id: '483645836'}
			],
			model: [{
				type: 'building1',
				name: '房子1',
				img: ''
			}, {
				type: 'building2',
				name: '房子2',
				img: ''
			}, {
				type: 'lamp',
				name: '路灯',
				img: ''
			}]
		}
	},
	methods:{
		changeStat(s){
			scene.state.changeStateTo(s);
		},
		selectModel(m, id){
			scene.model.cur.geo = scene.model[m].geo.clone();
			scene.model.cur.mat = scene.model[m].mat.clone();
			scene.model.cur.size = scene.model[m].size;			
			scene.model.cur.option = scene.model[m].option;
			scene.model.cur.height = scene.model[m].height;
			scene.model.cur.type = m;
			if (id) {scene.model.cur.id = id;}
		},
		setMenuState(s){
			for(var i in this.state){
				this.state[i] = false;
			}
			this.state[s] = true;
		},
		scene(){
			return scene;
		},
		addSet(set){
			this.cb = function () {						
				set.added = true;
			};
		},
		removeSet(id){
			this.setList.forEach(function (v) {
				if (v.name === id) {
					v.added = false;
					return false;
				}
			});
		}
	},
	created(){
	},
	mounted(){
		window.scene = new Scene();
		window.scene.load();
		window.root3D = this;
		this.parkingId = this.$route.query.parkingId;
	}
};