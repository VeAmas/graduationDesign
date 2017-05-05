var router = new VueRouter({
	routes:[{
		path:"",
		redirect: '/vehicle/stat'
	},{
		path:'/vehicle/stat',
		component:vehicle_stat
	},{
		path:'/vehicle/assign',
		component:vehicle_assign
	},{
		path:"/user",
		component:user
	},{
		path:"/log",
		component:log
	},{
		path:"/parking/specify",
		component:parking_specify
	},{
		path:"/parking/stat",
		component:parking_stat
	}]
});
