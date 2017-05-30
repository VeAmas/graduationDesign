Vue.component('datetime-picker',{
	template:`
		<div class="datetime-picker">
			<input type="text" v-model="value"/>
			<span class="glyphicon glyphicon-calendar"></span>
		</div>
	`,
	data() {
		return {
			value: ''			
		}
	},
	methods: {
		setV: function(path, v){
			var o = this.$parent.$parent;
			var str = 'o'
			path.split('.').forEach(function(v){
				str += '["' + v + '"]';
			})
			str += ('='+v)
			eval(str)
		},
		getV: function(path) {
			if (!path) return null;
			var o = this.$parent.$parent;
			path.split('.').forEach(function(v){
				o = o[v];
			})
			return o;
		}
	}, 
	props:{
		data:{
			required:"true"
		}
	},
	mounted(){
		var _this = this;
		$(this.$el).find("input").datetimepicker({
			theme:'dark',
			onClose: function(selectedDate) {
               _this.setV(_this.data, new Date(selectedDate).getTime())
            }
		});
		this.value = this.getV(this.data);
		if (this.value) {
			this.value = new Date(this.value *1000).toLocaleString();
		}
	}
});