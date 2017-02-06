Vue.component('modal',{
	template:`
		<div class="modal fade in" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content">
					<slot></slot>
				</div>
			</div>
		</div>
	`,
	data(){
		return {
			isDismissed : false
		};
	},
	created(){
		this.$on('dismiss',function () {
			this.dismiss();
		});
	},
	methods:{
		dismiss(){
			this.isDismissed = true;
		}
	}
});

Vue.component('modal-footer',{
	template:`
		<div class="modal-footer">
			<slot></slot>
			<button class="btn btn-default" @click="dismiss()">关闭</button>
		</div>
	`,
	methods:{
		dismiss(){
			this.$parent.$emit('dismiss');
		}
	}
})