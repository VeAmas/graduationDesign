Vue.component('datetime-picker',{
	template:`
		<div>
			<input type="text" v-model="data"/>
		</div>
	`,
	props:{
		data:{
			required:"true"
		}
	},
	mounted(){
		$(this.$el).find("input").datetimepicker({theme:'dark'});
	}
});