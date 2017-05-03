Vue.component('modal',{
	template:`
		<div class="modal" tabindex="-1">
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
	methods:{
		dismiss(){
			this.isDismissed = true;
		}
	}
});
