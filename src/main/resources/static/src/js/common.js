Vue.prototype.common = {
	province:[
		"京","沪","津","渝","冀","晋","蒙","辽","吉","黑","苏","浙","皖","闽","赣","鲁",
		"豫","鄂","湘","粤","桂","琼","川","贵","云","藏","陕","甘","青","宁","新"],
	vehicleStat:[
		"出车",
		"停车"
	],
	maintenanceLevel:[
		"新车",
		"一级",
		"二级"
	],
	userType:[
		"管理员",
		"司机"
	],
	gender:[
		"男",
		"女"
	],
	available: [
		"无车辆",
		"有车辆"
	],
	logType: [
		"",
		"登录",
		"出车",
		"停车",
		"移车"
	],
	reportType: [
		"车辆",
		"泊位"
	]
};
$.datetimepicker.setLocale('ch');

Vue.use(VeeValidate);

var root = new Vue({
    el: "#root",
	router:router,
    data:{
    	test:"sdfs"
    }
});
		
	