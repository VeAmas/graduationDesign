var Scene = function () {
    var scope = this;
    this.canvas = document.getElementById("canvas");
    this.scene=null;
    this.camera=null;
    this.mouse=null;
    this.renderer=null;
    this.controller=null;
    this.setting = {
        user:{
            matrix:{
                width: 10,
                height:10
            },
            brushSize:{
                width:1,
                height:1
            }
        },
        system:{
            matrix:{
                size:5,

            },
            color:{
                floor:"#ffffff",
                safe:"#00ff00",
                warning:"#ff0000"
            }
        }
    };
    this.meshs = {
        floors:[],
    };

    this.model = {
        cur:{

        },
        temp:{
            geo:new THREE.CubeGeometry(8,8,8),
            mat:new THREE.MeshBasicMaterial({color:new THREE.Color("#123456")})
        }
    };

    this.recover = {
        list:[],
        allColor(){
            this.list.forEach(function (i) {
                i.material.color.set(i.recoverColor); 
                i.recoverColor = null;
            });
            this.list = [];
        },
        pushColor(t){
            this.list.push(t);
            t.recoverColor = t.material.color.getHex();
        }
    };

    this.timer = {
        clickTimer:{
            flag:false,
            x:null,
            z:null
        },
    };

    this.handler = {
        onMouseMove(e){
            scope.mouse.x =  ((e.clientX-scope.canvas.offsetLeft) / scope.canvas.offsetWidth) * 2 - 1;
            scope.mouse.y = -((e.clientY-scope.canvas.offsetTop) / scope.canvas.offsetHeight) * 2 + 1;
        },
        onMousedown(e){
            scope.timer.clickTimer.flag = true;
            scope.timer.clickTimer.x = e.clientX;
            scope.timer.clickTimer.z = e.clientY;
            if(scope.timer.clickTimer.timeout>0){
                clearTimeout(scope.timer.clickTimer.timeout);
            }
            scope.timer.clickTimer.timeout = setTimeout(function() {
                scope.timer.clickTimer.timeout = 0;
                scope.timer.clickTimer.flag = false;
            }, 100);
        },
        onMouseup(e){
            if(e.button === 0){
                var x = e.clientX;
                var z = e.clientY;
                var d = (x-scope.timer.clickTimer.x)*(x-scope.timer.clickTimer.x)+(z-scope.timer.clickTimer.z)*(z-scope.timer.clickTimer.z);
                if(scope.timer.clickTimer.flag && d < 20){
                    if(scope.state.leftClickMethod){ 
                        scope.state.leftClickMethod();
                    }
                }                
            }
            else if(e.button === 2){
                var t = scope.setting.user.brushSize.width;
                scope.setting.user.brushSize.width = scope.setting.user.brushSize.height;
                scope.setting.user.brushSize.height = t;
                //右键操作
            }
        },
        initAllHandler(){
            scope.canvas.children[0].addEventListener('mousemove', this.onMouseMove, false);
            scope.canvas.children[0].addEventListener('mousedown', this.onMousedown, false);
            scope.canvas.children[0].addEventListener('mouseup', this.onMouseup, false);
        }
    };

    this.raycaster = {
        object:null,
        target:"",
        targetList:null,
        targetSet(t){
            this.target = t;
            this.targetList = [];
            var targetList = this.targetList;
            scope.scene.children.forEach(function (i) {
                var temp = i;
                if(i.targetType){
                    i.targetType.forEach(function (j) {
                        if(j===t){
                            targetList.push(temp);
                        }
                    });
                } 
            });
        },
        intersect:null,
        intersectGet(){
            var target = this.target;
            if(target === ""){
                this.intersect = null;
                return;
            }
            scope.raycaster.object.setFromCamera(scope.mouse,scope.camera);
            this.intersect = scope.raycaster.object.intersectObjects(this.targetList)[0];
        }
    };

    this.state = {
        curState:null,
        leftClickMethod:null,
        getCurState(){},
        changeStateTo(s){
            var _this_ = this;
            this.curState = s;
            this.fn.clearStat();
            switch(s){
                case "floorHover": 
                    scope.raycaster.targetSet("floor");
                    scope.canvas.onmousemove = function () {
                       _this_.fn.floorHover(); 
                    };
                    break;
                case "modelHover": 
                    scope.raycaster.targetSet("floor");
                    this.leftClickMethod = this.fn.addObject;
                    scope.model.cur.mesh = new THREE.Mesh(scope.model.cur.geo.clone(),scope.model.cur.mat.clone());
                    scope.model.cur.mesh.position.y = 99999;
                    scope.model.cur.mesh.material.transparent = true;
                    scope.model.cur.mesh.material.opacity = 0.5;
                    scope.scene.add(scope.model.cur.mesh);
                    scope.canvas.onmousemove = function () {
                       _this_.fn.floorHover(); 
                       _this_.fn.modelHover(); 
                    };
                    break;
                default:
                    scope.raycaster.targetSet("");
                    scope.canvas.onmousemove = null;
                    scope.canvas.onmousedown = null;
                    scope.canvas.onmouseup = null;
                    this.clickMethod = null;
            }
        },
        fn:{
            addObject(){
                if(scope.raycaster.intersect){
                    var target = scope.raycaster.intersect.object;
                    var result = scope.state.fn.getSquare(target.floor.coord.x,target.floor.coord.z);
                    if(!result.valid){
                        return;
                    }
                    scope.state.fn.setToOccupied(target.floor.coord.x,target.floor.coord.z);
                    scope.recover.allColor();

                    //添加到物品队列
                    //

                    var mesh  = new THREE.Mesh(scope.model.cur.geo.clone(),scope.model.cur.mat.clone());
                    mesh.position.copy(scope.model.cur.mesh.position);
                    scope.scene.add(mesh);
                    scope.state.changeStateTo("");

                }
            },
            clearStat(){
                if(scope.model.cur.mesh){
                    scope.scene.remove(scope.model.cur.mesh);
                    scope.model.cur.mesh = null;
                }
            },
            getSquare(x,z){
                var flag = true;
                var x0 = x - Math.ceil(scope.setting.user.brushSize.width/2) + 1;
                var x1 = x + Math.floor(scope.setting.user.brushSize.width/2); 
                var z0 = z - Math.ceil(scope.setting.user.brushSize.height/2) + 1;
                var z1 = z + Math.floor(scope.setting.user.brushSize.height/2); 
                if( x0 < 0 ){
                    flag = false;
                    x0 = 0;
                }
                if( x1 > scope.setting.user.matrix.width - 1){
                    flag = false;
                    x1 = scope.setting.user.matrix.width - 1; 
                }
                if( z0 < 0 ){
                    flag = false;
                    z0 = 0;
                }
                if( z1 > scope.setting.user.matrix.height - 1){
                    flag = false;
                    z1 = scope.setting.user.matrix.height - 1; 
                }
                var arr = [];
                var counter = 0;
                for(var i = 0 ;i < x1-x0+1;i++){
                    for(var j = 0 ;j< z1-z0+1;j++,counter++){
                        arr[counter] = scope.meshs.floors[x0+i][z0+j].mesh;
                        if(arr[counter].occupied){
                            flag = false;
                        }
                    }
                }
                return {
                    valid:flag,
                    arr:arr
                };
            },

            setToOccupied(x,z){
                var arr = this.getSquare(x,z).arr;
                arr.forEach(function (i) {
                    i.occupied = true;
                });
            },

            floorHover(){
                //recover
                scope.recover.allColor();

                if(scope.raycaster.intersect){
                    var target = scope.raycaster.intersect.object;
                    var result = this.getSquare(target.floor.coord.x,target.floor.coord.z);
                    for(var i = 0;i<result.arr.length;i++){
                        scope.recover.pushColor(result.arr[i]);
                        if(result.valid){
                            result.arr[i].material.color.set(scope.setting.system.color.safe);
                        }
                        else{
                            result.arr[i].material.color.set(scope.setting.system.color.warning);
                        }
                    }
                }
            },
            modelHover(){
                scope.model.cur.mesh.position.y = 99999;
                if(scope.raycaster.intersect){
                    var target = scope.raycaster.intersect.object;
                    var result = this.getSquare(target.floor.coord.x,target.floor.coord.z);
                    var x0 = target.floor.coord.x - Math.ceil(scope.setting.user.brushSize.width/2) + 1;
                    var x1 = x0 + parseInt(scope.setting.user.brushSize.width) - 1;
                    var z0 = target.floor.coord.z - Math.ceil(scope.setting.user.brushSize.height/2) + 1;
                    var z1 = z0 + parseInt(scope.setting.user.brushSize.height) - 1;
                    scope.model.cur.mesh.position.set(
                        (x0 + 1 + x1) / 2 * scope.setting.system.matrix.size,
                        5,
                        (z0 + 1 + z1) / 2 * scope.setting.system.matrix.size);
                }
            }
        }
    };

    this.initScene = function(){
        this.scene = new THREE.Scene(); 

        this.meshs.floors = [];
        for(var i = 0; i < this.setting.user.matrix.width;i++){
            this.meshs.floors[i] = [];
            for(var j = 0; j < this.setting.user.matrix.height; j++){
                var geo =  new THREE.PlaneBufferGeometry(this.setting.system.matrix.size,this.setting.system.matrix.size);
                var mat = new THREE.MeshBasicMaterial({color:new THREE.Color(this.setting.system.color.floor)});
                var mesh = new THREE.Mesh(geo,mat);
                mesh.position.x = i * this.setting.system.matrix.size + this.setting.system.matrix.size / 2;
                mesh.position.z = j * this.setting.system.matrix.size + this.setting.system.matrix.size / 2;
                mesh.rotation.x = -0.5*Math.PI;
                mesh.targetType = ["floor"];
                this.scene.add(mesh);
                mesh.floor = {
                    mesh:mesh,
                    coord:{
                        x:i,
                        z:j
                    }
                };
                this.meshs.floors[i].push(mesh.floor);

                if(i===0 && j===0){
                    mesh.material.color.set(0xff0000);
                }
            }
        }
    };
    this.initCamera = function(){
        this.camera = new THREE.PerspectiveCamera(45, this.canvas.clientWidth/this.canvas.clientHeight, 0.01, 1000);
        this.scene.add(this.camera); 
        this.camera.position.set(this.setting.user.matrix.width / 2 * this.setting.system.matrix.size ,100, this.setting.user.matrix.height / 2 * this.setting.system.matrix.size +0.1);
    };
    this.initLight = function(){
        var ambientLight = new THREE.AmbientLight(0xffffff,0.5);                
        this.scene.add(ambientLight);
        
        var directionalLight = new THREE.DirectionalLight(0xffffff,0.5);
        directionalLight.position.set(200,80,50);
        this.scene.add(directionalLight);
    };
    this.initRenderer = function(){
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( this.canvas.clientWidth, this.canvas.clientHeight );    
        this.renderer.setClearColor(0xeeeeee);                                         
        this.canvas.appendChild(this.renderer.domElement);      
    };
    this.initController = function(){
        this.controller = new THREE.OrbitControls(this.camera,this.canvas);              
        this.controller.target.set(this.setting.user.matrix.width / 2 * this.setting.system.matrix.size ,0, this.setting.user.matrix.height / 2 * this.setting.system.matrix.size);
    };
    this.initRaycaster = function(){
        this.mouse = new THREE.Vector2();
        this.raycaster.object = new THREE.Raycaster();
    };
    this.reRender = function(){

        scope.render();
        requestAnimationFrame(scope.reRender);



    };
    this.render = function(){ 
        this.raycaster.intersectGet();
        this.renderer.render(this.scene, this.camera);                         
        this.controller.update();                                              
    };
    this.init = function(){
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initRenderer();
        this.initController();
        this.initRaycaster();
        this.reRender();
        this.handler.initAllHandler();
    };
};

