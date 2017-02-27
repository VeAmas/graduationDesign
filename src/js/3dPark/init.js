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
    this.pass = {
        composer: null,
        effectFXAA: null,
        outlinePass: null,
        renderPass: null
    };

    this.meshs = {
        floors:[],
    };

    this.model = {
        cur:{

        },
        temp:{
            geo:new THREE.CubeGeometry(8,8,8),
            mat:new THREE.MeshLambertMaterial({color:new THREE.Color("#123456")})
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
            }, 200);
        },
        onMouseup(e){
            if(e.button === 0){
                var x = e.clientX;
                var z = e.clientY;
                var d = (x-scope.timer.clickTimer.x)*(x-scope.timer.clickTimer.x)+(z-scope.timer.clickTimer.z)*(z-scope.timer.clickTimer.z);
                if(scope.timer.clickTimer.flag && d < 20){
                        // console.log("click")
                    if(scope.state.leftClickMethod){ 
                        scope.state.leftClickMethod();
                    }
                }
                else{
                    // console.log("d:"+d);
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
                case "selectObject" :
                    scope.canvas.onmousemove = null;
                    scope.raycaster.targetSet('cube');
                    this.leftClickMethod = this.fn.selectObject;
                    break;
                case "floorHover": 
                    scope.raycaster.targetSet("floor");
                    scope.canvas.onmousemove = function () {
                       _this_.fn.floorHover(); 
                    };
                    break;
                case "modelHover":
                    // 
                    //去除outline
                    //
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
            deleteObject(){
                if(!!scope.model.cur.mesh){
                    scope.scene.remove(scope.model.cur.mesh);
                    scope.state.fn.setToFree(scope.model.cur.mesh.occupiedArray);
                    //
                    //从物品队列删除
                    //
                }
            },
            selectObject(){
                if(scope.raycaster.intersect){
                    var target = scope.raycaster.intersect.object;
                    scope.pass.outlinePass.selectedObjects = [];
                    scope.pass.outlinePass.selectedObjects.push(target);
                    scope.model.cur.mesh = target;
                    //
                    //弹出菜单
                    root.setMenuState('selected');
                    //
                }else{
                    scope.pass.outlinePass.selectedObjects = [];    
                    scope.model.cur.mesh = null;                
                }
            },
            addObject(){
                if(scope.raycaster.intersect){
                    var target = scope.raycaster.intersect.object;
                    var result = scope.state.fn.getSquare(target.floor.coord.x,target.floor.coord.z);
                    if(!result.valid){
                        return;
                    }
                    var arr = scope.state.fn.getSquare(target.floor.coord.x,target.floor.coord.z).arr;
                    scope.state.fn.setToOccupied(arr);
                    scope.recover.allColor();
                    //
                    //设置物品参数
                    //添加到物品队列
                    //
                    var mat = scope.model.cur.mat.clone();
                    mat.roughness = 1;
                    mat.metalness = 0;
                    var mesh  = new THREE.Mesh(scope.model.cur.geo.clone(),mat);
                    mesh.position.copy(scope.model.cur.mesh.position);
                    mesh.targetType = ['cube'];
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                    mesh.occupiedArray = arr;
                    scope.scene.add(mesh);
                    scope.state.changeStateTo("selectObject");

                    root.setMenuState('normal');

                }
            },
            clearStat(){
                if(scope.model.cur.mesh){
                    scope.scene.remove(scope.model.cur.mesh);
                    scope.model.cur.mesh = null;
                    scope.recover.allColor();
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
            setToFree(arr){
                 arr.forEach(i => {
                    i.occupied = false;
                });
             },
            setToOccupied(arr){
                arr.forEach(i => {
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
        this.sceneCube = new THREE.Scene();

        var light = new THREE.SpotLight(0xffffff,1);
        light.position.x =100;
        light.position.y =100;
        light.position.z =-100;
        light.castShadow = true;
        this.scene.add( light );
        light.shadowMapWidth = light.shadowMapHeight = 4096;    //阴影大小

        var urls = [ "img/posx.jpg", "img/negx.jpg", "img/posy.jpg", "img/negy.jpg", "img/posz.jpg", "img/negz.jpg" ];
        var textureCube = new THREE.CubeTextureLoader().load( urls );
        textureCube.format = THREE.RGBFormat;
        textureCube.mapping = THREE.CubeReflectionMapping;

        var cubeShader = THREE.ShaderLib.cube;
        var cubeMaterial = new THREE.ShaderMaterial( {
            fragmentShader: cubeShader.fragmentShader,
            vertexShader: cubeShader.vertexShader,
            uniforms: cubeShader.uniforms,
            depthWrite: false,
            side: THREE.BackSide
        } );
        cubeMaterial.uniforms.tCube.value = textureCube;

        cubeMesh = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100 ), cubeMaterial );
        this.sceneCube.add( cubeMesh );



        var directions  = [ "img/posx.jpg", "img/negx.jpg", "img/posy.jpg", "img/negy.jpg", "img/posz.jpg", "img/negz.jpg" ];
        var skyGeometry = new THREE.CubeGeometry( 500, 500, 500 );   
        
        var materialArray = [];
        for (var i = 0; i < 6; i++)
            materialArray.push( new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture( directions[i]  ),
                side: THREE.BackSide
            }));
        var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
        var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
        this.scene.add( skyBox );


        // var vertexShader = document.getElementById( 'vertexShader' ).textContent;
        // var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
        // var uniforms = {
        //     topColor:    { type: "c", value: new THREE.Color( 0x0077ff ) },
        //     bottomColor: { type: "c", value: new THREE.Color( 0xffffff ) },
        //     offset:      { type: "f", value: 400 },
        //     exponent:    { type: "f", value: 0.6 }
        // };
        // uniforms.topColor.value.copy( light.color );
        // var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
        // var skyMat = new THREE.ShaderMaterial( {
        //     uniforms: uniforms,
        //     vertexShader: vertexShader,
        //     fragmentShader: fragmentShader,
        //     side: THREE.BackSide
        // } );
        // var sky = new THREE.Mesh( skyGeo, skyMat );
        // this.scene.add( sky );

        this.meshs.floors = [];
        for(var i = 0; i < this.setting.user.matrix.width;i++){
            this.meshs.floors[i] = [];
            for(var j = 0; j < this.setting.user.matrix.height; j++){
                var geo =  new THREE.PlaneBufferGeometry(this.setting.system.matrix.size,this.setting.system.matrix.size);
                var mat = new THREE.MeshLambertMaterial({color:new THREE.Color(this.setting.system.color.floor)});
                var mesh = new THREE.Mesh(geo,mat);
                mat.side = THREE.DoubleSide;
                mesh.position.x = i * this.setting.system.matrix.size + this.setting.system.matrix.size / 2;
                mesh.position.z = j * this.setting.system.matrix.size + this.setting.system.matrix.size / 2;
                mesh.rotation.x = -0.5*Math.PI;
                mesh.targetType = ["floor"];
                mesh.receiveShadow = true;
                mesh.castShadow = true;
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
        this.cameraCube = new THREE.PerspectiveCamera( 70, this.canvas.clientWidth/this.canvas.clientHeight, 1, 100000 );
    };
    this.initLight = function(){

                
    };
    this.initRenderer = function(){
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize( this.canvas.clientWidth, this.canvas.clientHeight );    
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;

        this.renderer.autoClear = false;
        this.renderer.setFaceCulling( THREE.CullFaceNone );
        this.canvas.appendChild(this.renderer.domElement); 

        this.pass.composer = new THREE.EffectComposer( this.renderer );     
        this.pass.renderPass = new THREE.RenderPass( this.scene, this.camera );
        // this.pass.renderPass.renderToScreen = true
        // this.pass.renderPass.clear = false
        // this.pass.renderPass.clearDepth = true
        this.pass.outlinePass = new THREE.OutlinePass( new THREE.Vector2( this.canvas.clientWidth, this.canvas.clientHeight ), this.scene, this.camera);
        // this.pass.outlinePass.renderToScreen = true
        // this.pass.outlinePass.clear = false
        // this.pass.outlinePass.clearDepth = true
        this.pass.effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
        this.pass.effectFXAA.uniforms.resolution.value.set(1 / this.canvas.clientWidth, 1 / this.canvas.clientHeight );
        this.pass.effectFXAA.renderToScreen = true;
        // this.pass.effectFXAA.clear = false
        // this.pass.effectFXAA.clearDepth = true

        // this.pass.cubeRenderPass = new THREE.RenderPass( this.sceneCube, this.cameraCube ); 
        // this.pass.cubeRenderPass.renderToScreen = true
        // this.pass.cubeRenderPass.clear = false
        // this.pass.cubeRenderPass.clearDepth = true
        this.pass.composer.addPass( this.pass.outlinePass );
        this.pass.composer.addPass( this.pass.effectFXAA );
        // this.pass.composer.addPass( this.pass.cubeRenderPass );
        this.pass.composer.addPass( this.pass.renderPass );


        // this.pass.composer1 = new THREE.EffectComposer( this.renderer );  

    };
    this.initController = function(){
        this.controller = new THREE.OrbitControls(this.camera,this.canvas);              
        this.controller.target.set(this.setting.user.matrix.width / 2 * this.setting.system.matrix.size ,0, this.setting.user.matrix.height / 2 * this.setting.system.matrix.size);
        this.controller.enableDamping = true;
        this.controller.dampingFactor = 0.25;
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
        this.cameraCube.rotation.copy( this.camera.rotation );
        // this.renderer.autoClear = true;
        this.renderer.setClearColor( 0xfff0f0 );
        this.renderer.setClearAlpha( 0.5 );    
        // this.renderer.render(scope.scene, scope.camera);    
        // this.renderer.render(scope.sceneCube, scope.cameraCube);  
        // this.pass.composer1.render();       
        this.pass.composer.render();             
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

