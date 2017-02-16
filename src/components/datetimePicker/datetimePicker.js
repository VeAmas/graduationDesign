Vue.component('datetime-picker',{
	template:`
		<div class="datetime-picker">
			<input type="text" v-model="data"/>
			<span class="glyphicon glyphicon-calendar"></span>
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