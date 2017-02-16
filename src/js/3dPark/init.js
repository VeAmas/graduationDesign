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
            }
        },
        system:{
            matrix:{
                size:5,
                color:"#ff00ff"
            }
        }
    };
    this.meshs = {
        floors:[],
    };

    this.handler = {
        onMouseMove(e){
            scope.mouse.x =  ((e.clientX-scope.canvas.offsetLeft) / scope.canvas.offsetWidth) * 2 - 1;
            scope.mouse.y = -((e.clientY-scope.canvas.offsetTop) / scope.canvas.offsetHeight) * 2 + 1;
            // console.log(scope.mouse)
        },
        initAllHandler(){
            scope.canvas.children[0].addEventListener('mousemove', this.onMouseMove, false);
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
        getCurState(){},
        changeStateTo(s){
            var _this_ = this;
            this.curState = s;
            switch(s){
                case "floorHover": 
                    scope.canvas.onmousemove = function () {
                       _this_.fn.floorHover(); 
                    };
                    break;
                default:
                    scope.canvas.onmousemove = null;
                    scope.canvas.onmousedown = null;
                    scope.canvas.onmouseup = null;
            }
        },
        fn:{
            floorHover(){
                if(scope.raycaster.intersect){
                    scope.raycaster.intersect.object.material.color.set(0xff0000);
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
                var mat = new THREE.MeshBasicMaterial({color:new THREE.Color(this.setting.system.matrix.color)});
                var mesh = new THREE.Mesh(geo,mat);
                mesh.position.x = i * this.setting.system.matrix.size + this.setting.system.matrix.size / 2;
                mesh.position.z = j * this.setting.system.matrix.size + this.setting.system.matrix.size / 2;
                mesh.rotation.x = -0.5*Math.PI;
                mesh.targetType = ["floor"]
                this.scene.add(mesh);
                this.meshs.floors[i].push({
                    mesh:mesh,
                    coord:{
                        x:i,
                        z:j
                    }
                });


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

var scene = new Scene();

scene.init();
