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
                width: 20,
                height:20
            },
            brushSize:{
                width:1,
                height:1
            }
        },
        system:{
            matrix:{
                size:4,

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
        meshList: [],
        floors: [],
    };

    this.recover = {
        colorList:[],
        opacityList:[],
        allColor(){
            this.colorList.forEach(function (i) {
                i.material.color.set(i.recoverColor); 
                i.recoverColor = null;
            });
            this.colorList = [];
        },
        allOpacity(){
            this.opacityList.forEach(function (i) {
                i.material.visible=i.recoverOpacity; 
                i.recoverOpacity = null;
            });
            this.opacityList = [];            
        },
        pushColor(t){
            this.colorList.push(t);
            t.recoverColor = t.material.color.getHex();
        },
        pushOpacity(t){
            this.opacityList.push(t);
            t.recoverOpacity = t.material.visible;
        }
    };

    this.timer = {
        clickTimer:{
            flag:false,
            x:null,
            z:null
        },
    };

    this.animate = {
        aniNum: 0,
        list: [],
        run () {
            var removeList = [];
            for(var i = 0; i < this.aniNum; i++){
                var item = this.list[i];
                item.timer += 17;
                if(item.timer > item.duration) {
                    item.timer = item.duration;
                }
                for(var j in item.map){
                    var variable = item.map[j].variable;
                    var value = item.map[j].value;
                    if ('fn' in item.map[j]) {
                        if(item._this){
                            variable[value] = item.map[j].fn.call(item._this, item.timer / item.duration);
                        }
                        else{
                            variable[value] = item.map[j].fn(item.timer / item.duration);
                        }
                    } else {
                        variable[value] = item.map[j].des.from + (item.map[j].des.to - item.map[j].des.from) * item.timer / item.duration;
                    }
                }
                if(item.timer >=  item.duration){
                    item.cb && item.cb.call(item._this ? item._this : window, null);
                    removeList.push(item.id);
                }
            }
            for(i in removeList){
                this.remove(removeList[i]);       
            }
        },
        register (map, duration, cb, _this) {
            var newMap = [];
            var id = new Date().valueOf();

            for(var i in map){
                if(Array.isArray(map[i])){
                    var set = map[i];
                    if(this._pushAnimation(newMap, set[0], set[1], set[2])){
                        continue;
                    }
                    console.error('no function or complete description contained when registering a new animation!');
                    return false;
                }
                else{
                    var name = this._analyseObjPath(i);
                    if(!name){
                        return false;
                    }
                    if(this._pushAnimation(newMap, name[0], name[1], map[i])){
                        continue;
                    }
                    console.error('no function or complete description contained when registering a new animation!');
                    return false;
                }
            }
            
            this.list.push({map: newMap, duration, timer: 0, cb, _this, id});
            this.aniNum++;
            return id;
        },
        remove (id) {
            var _this = this;
            this.list.forEach(function (v, i) {
                if(v.id === id){
                    _this.list.splice(i,1);
                    _this.aniNum--;
                    return false;
                } 
            });
        },
        _pushAnimation(array, variable, value, other){
            if(typeof other === 'function'){
                array.push({
                    variable,
                    value,
                    fn: other
                });
                return true;
            }
            else if(typeof other === 'object'){
                if('from' in other && 'to' in other){
                    array.push({
                        variable ,
                        value ,
                        des: other
                    });
                    return true;
                }
            }
        },
        _analyseObjPath(path){
            try{
                path = path.match(/([^\.]*?\.)|([^\.]*$)/g);
                path = path.map(function(v){return v.replace('.','')});
                path.length--;
                if (path[0] === 'scope') {
                    path.shift();
                }
                var variable = scope;
                for(var i = 0; i<path.length - 1; i++){
                    variable = variable[path[i]];
                    if(!variable){
                        throw new Error('no such variable called '+path[i]+'!')
                    }
                }
                return [variable, path[path.length - 1]];
            }
            catch(e){
                console.error(e);
                return false;
            }
        }
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
                if (scope.state.curState === 'modelHover' && scope.model.cur.mesh) {
                    scope.model.cur.mesh.rotation.y += Math.PI / 2;
                }
                
                //右键操作
            }
        },
        initAllHandler(){
            scope.canvas.children[0].addEventListener('mousemove', this.onMouseMove, false);
            scope.canvas.children[0].addEventListener('mousedown', this.onMousedown, false);
            scope.canvas.children[0].addEventListener('mouseup', this.onMouseup, false);
        }
    };

    this.addBus = function (setId) {
        var set;
        for (var i in scope.meshs.meshList) {
            if (scope.meshs.meshList[i].objType === 'parkingSet' && scope.meshs.meshList[i].typeId === setId) {
                set = scope.meshs.meshList[i];
            }
        }
        if (!set) {
            return;
        }

        var bus = scope.model.bus.mesh.clone();
        bus.rotation.y = Math.PI + set.rotation.y;

        var dir = new THREE.Vector3(1,0,0);
        dir.applyAxisAngle(new THREE.Vector3(0,1,0), bus.rotation.y + Math.PI * 0.5);
        bus.children.forEach(function (v) {
            v.material = v.material.clone();
            v.material.transparent = true;
            v.material.opacity = 0;
        });
        scope.scene.add(bus);
        bus.position.copy(set.position);
        bus.position.add(dir.multiplyScalar(4 * scope.setting.system.matrix.size));
        set.bus = bus;

        var start = bus.position.clone();
        var end = set.position.clone().add(dir.multiplyScalar(0.5 / 4));
        scope.animate.register([
            [
                bus.position, 
                "x", 
                {from: start.x, to: end.x}
            ], [
                bus.position,
                'z',
                {from: start.z, to: end.z}
            ]
        ], 500);
        bus.children.forEach(function (v, i) {
            scope.animate.register([
                [
                    v.material, 
                    "opacity", 
                    {from: 0, to: 1}
                ]
            ], 500, function () {
                this.material.transparent = false;
                if (i === 2) {
                    this.material.transparent = true;
                    this.material.opacity = 0.8;
                }
            }, v);
        });
    };

    this.removeBus = function (setId) {
        var set;
        for (var i in scope.meshs.meshList) {
            if (scope.meshs.meshList[i].objType === 'parkingSet' && scope.meshs.meshList[i].typeId === setId) {
                set = scope.meshs.meshList[i];
            }
        }
        if (!set || !set.bus) {
            return;
        }

        var bus = set.bus;
        bus.children.forEach(function (v) {
            v.material.transparent = true;
        });        

        var dir = new THREE.Vector3(1,0,0);
        dir.applyAxisAngle(new THREE.Vector3(0,1,0), bus.rotation.y + Math.PI * 0.5);

        var end = bus.position.clone().add(dir.multiplyScalar(4 * scope.setting.system.matrix.size));
        var start = set.position.clone().add(dir.multiplyScalar(0.5 / 4));

        scope.animate.register([
            [
                bus.position, 
                "x", 
                {from: start.x, to: end.x}
            ], [
                bus.position,
                'z',
                {from: start.z, to: end.z}
            ]
        ], 500, function () {
            scope.scene.remove(this);
        }, bus);
        bus.children.forEach(function (v) {
            scope.animate.register([
                [
                    v.material, 
                    "opacity", 
                    {from: 1, to: 0}
                ]
            ], 500, function () {
                this.material.transparent = false;
            }, v);
        });
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

    this.saveData = [];
    this.save = function () {
        scope.saveData = [];
        scope.meshs.meshList.forEach(function (v) {
            var item = {
                type: v.objType,
                id: v.typeId,
                position: {
                    x: v.position.x,
                    y: v.position.y,
                    z: v.position.z
                },
                rotation: {
                    x: v.rotation.x,
                    y: v.rotation.y,
                    z: v.rotation.z
                },
                occupiedArray: []
            };
            v.occupiedArray.forEach(function (a) {
                item.occupiedArray.push({
                    floor: {
                        x: a.floor.coord.x,
                        z: a.floor.coord.z
                    }
                });
            });
            scope.saveData.push(item);
        });

        localStorage.setItem('saveData', JSON.stringify(scope.saveData));

        console.clear();
        scope.saveData.forEach(function (v) {
            console.log(v.id);
        });
    };

    this.loadScene = function () {
        scope.saveData = JSON.parse(localStorage.getItem('saveData'));
        if (scope.saveData && scope.saveData.length > 0) {
            scope.saveData.forEach(function (v) {
                var m = v.type;
                scope.model.cur.geo = scope.model[m].geo.clone();
                scope.model.cur.mat = scope.model[m].mat.clone();  
                scope.model.cur.option = scope.model[m].option;
                scope.model.cur.height = scope.model[m].height;


                var mat = scope.model.cur.mat.clone();
                mat.roughness = 1;
                mat.metalness = 0;
                var mesh  = new THREE.Mesh(scope.model.cur.geo, mat);
                mesh.position.set(v.position.x, v.position.y, v.position.z);
                mesh.targetType = ['cube'];
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.occupiedArray = [];
                v.occupiedArray.forEach(function (a) {
                    scope.meshs.floors[a.floor.x][a.floor.z].mesh.occupied = true;
                    mesh.occupiedArray.push(scope.meshs.floors[a.floor.x][a.floor.z].mesh);
                });
                mesh.objType = m;
                mesh.typeId = v.id;
                mesh.rotation.set(v.rotation.x, v.rotation.y, v.rotation.z);
                mesh.size = scope.model[m].size;
                
                scope.scene.add(mesh);
                scope.model.modify = null;
                scope.state.changeStateTo("selectObject");

                scope.meshs.meshList.push(mesh);


                if (m === 'parkingSet') {
                    var nameTag = new THREE.Mesh(scope.model.cur.geo, new THREE.MeshBasicMaterial( {map: scene.model.canvasTextureList[v.id], side:THREE.DoubleSide, transparent: true} ));
                    mesh.add(nameTag);
                    root.setList.forEach(function (v) {
                        if (v.name === mesh.typeId) {                            
                            Vue.set(v, 'added', true);
                        }
                    });
                }
            });
        }
    };

    this.state = {
        curState:null,
        leftClickMethod:null,
        getCurState(){},
        changeStateTo(s){
            var _this_ = this;
            this.fn.clearStat();
            this.curState = s;
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
                    scope.raycaster.targetSet("floor");
                    this.leftClickMethod = this.fn.addObject;
                    scope.setting.user.brushSize.width = scope.model.cur.size[0];
                    scope.setting.user.brushSize.height = scope.model.cur.size[1];
                    scope.model.cur.mesh = new THREE.Mesh(scope.model.cur.geo.clone(),scope.model.cur.mat.clone());
                    scope.model.cur.mesh.position.y = 99999;
                    scope.model.cur.mesh.material.transparent = true;
                    scope.model.cur.mesh.material.opacity = 0.5;
                    scope.model.cur.mesh.size = scope.model.cur.size;
                    if (scope.model.cur.type === 'parkingSet') {
                        var mesh = new THREE.Mesh(scope.model.cur.geo.clone(), new THREE.MeshBasicMaterial( {map: scene.model.canvasTextureList[scope.model.cur.id], side:THREE.DoubleSide, transparent: true} ));
                        scope.model.cur.mesh.add(mesh);
                    }
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
            modifyObject(){                
                if(!!scope.model.cur.mesh){
                    scope.scene.remove(scope.model.cur.mesh);

                    var index = scope.meshs.meshList.indexOf(scope.model.cur.mesh);
                    scope.meshs.meshList.splice(index, 1);

                    scope.state.fn.setToFree(scope.model.cur.mesh.occupiedArray);
                    scope.model.modify = {};
                    for (var i in scope.model.cur) {
                        scope.model.modify[i] = scope.model.cur[i];
                    }
                    scope.model.modify.position = scope.model.modify.mesh.position.clone();
                    var data = scope.model.modify.mesh.data;
                    scope.state.changeStateTo('modelHover');
                    scope.model.modify.mesh.data = data;
                    scope.pass.outlinePass.selectedObjects = [];  


                }
            },
            deleteObject(){
                if(!!scope.model.cur.mesh){
                    scope.scene.remove(scope.model.cur.mesh);
                    scope.state.fn.setToFree(scope.model.cur.mesh.occupiedArray);
                    scope.pass.outlinePass.selectedObjects = [];  
           
                    if (scope.model.cur.type === 'parkingSet') {
                        root.removeSet(scope.model.cur.id);
                    }

                    var index = scope.meshs.meshList.indexOf(scope.model.cur.mesh);
                    scope.meshs.meshList.splice(index, 1);
                    scope.save();
                }
            },
            selectObject(){
                if(scope.raycaster.intersect){
                    var target = scope.raycaster.intersect.object;
                    scope.pass.outlinePass.selectedObjects = [];
                    scope.pass.outlinePass.selectedObjects.push(target);
                    scope.model.cur.mesh = target;
                    scope.model.cur.geo = target.geometry;
                    scope.model.cur.mat = target.material;
                    scope.model.cur.size = target.size;
                    scope.model.cur.id = target.typeId;
                    scope.model.cur.type = target.objType;
                    scope.model.cur.height = target.position.y * 2;

                    target.focus();
                    // scope.scene.remove(scope.dashLine);
                    //
                    //弹出菜单
                    root.setMenuState('selected');
                    //
                }else{
                    scope.pass.outlinePass.selectedObjects = [];    
                    scope.model.cur.mesh = null;   
                    // scope.scene.add(scope.dashLine);
                    root.setMenuState('normal');             
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
                    scope.recover.allOpacity();
                    //
                    //设置物品参数
                    //添加到物品队列
                    //
                    var mat = scope.model.cur.mat.clone();
                    mat.roughness = 1;
                    mat.metalness = 0;
                    var mesh  = new THREE.Mesh(scope.model.cur.geo.clone(), mat);
                    mesh.position.copy(scope.model.cur.mesh.position);
                    mesh.targetType = ['cube'];
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                    mesh.occupiedArray = arr;
                    mesh.objType = scope.model.cur.type;
                    mesh.typeId = scope.model.cur.id;
                    mesh.rotation.copy(scope.model.cur.mesh.rotation);
                    mesh.size = scope.model.cur.mesh.size;
                    scope.model.cur.mesh.children.forEach(function (v) {
                        mesh.add(v);
                    });
                    if(scope.model.modify){
                        mesh.data = scope.model.modify.mesh.data;
                    }
                    else if(scope.model.cur.option){
                        mesh.data = scope.model.cur.option();
                        // prompt
                    }
                    scope.scene.add(mesh);
                    scope.model.modify = null;
                    scope.state.changeStateTo("selectObject");

                    if(root.cb) {
                        root.cb();
                        delete root.cb;
                    }

                    scope.meshs.meshList.push(mesh);
                    scope.save();
                    root.setMenuState('normal');
                }
            },
            clearStat(){
                scope.pass.outlinePass.selectedObjects = [];    
                if(scope.model.cur.mesh && root.state.addObject){
                    scope.scene.remove(scope.model.cur.mesh);
                    scope.model.cur.mesh = null;
                    scope.recover.allColor();
                    scope.recover.allOpacity();
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
            cancelMove () {
                if (scope.model.modify && scope.model.modify.mesh) {
                    scope.model.modify.mesh.position.copy(scope.model.modify.position);
                    scope.model.modify.mesh.material.opacity = 1;
                    scope.model.modify.mesh.material.transparent = false;     
                    scope.scene.add(scope.model.modify.mesh);   
                    scope.model.modify.mesh.occupiedArray.forEach(function (v) {
                        v.occupied = true;
                    })

                    scope.meshs.meshList.push(scope.model.modify.mesh);   
                    scope.save();
                }
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
                scope.recover.allOpacity();

                if(scope.raycaster.intersect){
                    var target = scope.raycaster.intersect.object;
                    var result = this.getSquare(target.floor.coord.x,target.floor.coord.z);
                    for(var i = 0;i<result.arr.length;i++){
                        scope.recover.pushColor(result.arr[i]);
                        scope.recover.pushOpacity(result.arr[i]);
                        result.arr[i].material.visible = true;
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
                        scope.model.cur.height / 2,
                        (z0 + 1 + z1) / 2 * scope.setting.system.matrix.size);
                }
            }
        }
    };

    this.initScene = function(){
        this.scene = new THREE.Scene(); 
        this.sceneCube = new THREE.Scene();

        var light = new THREE.SpotLight(0xffffff,1);
        light.position.x =-10;
        light.position.y =100;
        light.position.z =100;
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
        for (var i = 0; i < 6; i++){
            materialArray.push( new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture( directions[i]  ),
                side: THREE.BackSide
            }));
        }
        var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
        var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
        this.scene.add( skyBox );

        var groundGeo = new THREE.PlaneBufferGeometry(1000,1000);
        var groundMat = new THREE.MeshLambertMaterial({color:new THREE.Color(this.setting.system.color.floor)});
        var ground = new THREE.Mesh(groundGeo,groundMat);
        ground.rotation.x = -0.5*Math.PI;
        ground.position.y = 0;
        ground.receiveShadow = true;
        this.scene.add(ground);

        var dashLineGeo = new THREE.Geometry();

        var w = scope.setting.user.matrix.width * scope.setting.system.matrix.size;
        var h = scope.setting.user.matrix.height * scope.setting.system.matrix.size;
        dashLineGeo.vertices.push(
                    new THREE.Vector3(0,0.5,0),
                    new THREE.Vector3(0,0.5,h),
                    new THREE.Vector3(w,0.5,h),
                    new THREE.Vector3(w,0.5,0),
                    new THREE.Vector3(0,0.5,0),
                    new THREE.Vector3(w,0.5,0),
                    new THREE.Vector3(0,0.5,h),
                    new THREE.Vector3(w,0.5,h)
                 );
        dashLineGeo.computeLineDistances();

        var dashLine = new THREE.LineSegments( dashLineGeo, new THREE.LineDashedMaterial( {
            color: 0xffaa00, 
            dashSize: scope.setting.system.matrix.size / 2, 
            gapSize: scope.setting.system.matrix.size / 4
        } ) );
        scope.scene.add(dashLine);
        scope.dashLine = dashLine;

        this.meshs.floors = [];
        for(i = 0; i < this.setting.user.matrix.width;i++){
            this.meshs.floors[i] = [];
            for(var j = 0; j < this.setting.user.matrix.height; j++){
                var geo =  new THREE.PlaneBufferGeometry(this.setting.system.matrix.size,this.setting.system.matrix.size);
                var mat = new THREE.MeshLambertMaterial({color:new THREE.Color(this.setting.system.color.floor)});
                var mesh = new THREE.Mesh(geo,mat);
                mat.side = THREE.DoubleSide;
                mat.visible = false;
                mesh.position.x = i * this.setting.system.matrix.size + this.setting.system.matrix.size / 2;
                mesh.position.z = j * this.setting.system.matrix.size + this.setting.system.matrix.size / 2;
                mesh.position.y = 0.1;
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
        this.cameraCube = new THREE.PerspectiveCamera( 70, this.canvas.clientWidth/this.canvas.clientHeight, 1, 100000 );
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
        this.pass.outlinePass = new THREE.OutlinePass( new THREE.Vector2( this.canvas.clientWidth, this.canvas.clientHeight ), this.scene, this.camera);

        this.pass.effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
        this.pass.effectFXAA.uniforms.resolution.value.set(1 / this.canvas.clientWidth, 1 / this.canvas.clientHeight );
        this.pass.effectFXAA.renderToScreen = true;

        this.pass.composer.addPass( this.pass.outlinePass );
        this.pass.composer.addPass( this.pass.effectFXAA );
        this.pass.composer.addPass( this.pass.renderPass );


    };
    this.initController = function(){
        this.controller = new THREE.OrbitControls(this.camera,this.canvas);              
        this.controller.target.set(this.setting.user.matrix.width / 2 * this.setting.system.matrix.size ,0, this.setting.user.matrix.height / 2 * this.setting.system.matrix.size);
        // this.controller.enableDamping = true;
        // this.controller.dampingFactor = 0.25;
    };
    this.initRaycaster = function(){
        this.mouse = new THREE.Vector2();
        this.raycaster.object = new THREE.Raycaster();
    };
    this.reRender = function(){
        scope.render();
        requestAnimationFrame(scope.reRender);

    };
    this.initHook = function(){
        THREE.Mesh.prototype.focus = function () {
            var originPos = scope.camera.position.clone();
            var target = scope.controller.target.clone();
            var thisPos = this.position;
            var direction = target.clone().sub(originPos).normalize();
            var x = originPos.x + direction.x / direction.y * (thisPos.y - originPos.y);
            var z = originPos.z + direction.z / direction.y * (thisPos.y - originPos.y);
            var y = thisPos.y;
            var actualTarget = new THREE.Vector3(x,y,z);
            var newPos = new THREE.Vector3(thisPos.x - actualTarget.x + originPos.x, thisPos.y - actualTarget.y + originPos.y, thisPos.z - actualTarget.z + originPos.z);
            var deltaCameraPosition = new THREE.Vector3(newPos.x - originPos.x, newPos.y - originPos.y, newPos.z - originPos.z);
            var deltaTargetPosition = new THREE.Vector3(thisPos.x - target.x, thisPos.y - target.y, thisPos.z - target.z);
            var percentage = 1 / Math.ceil(500/17);

            scope.animate.register({
                "scope.camera.position": function () {
                    var position = this.variable[this.value];
                    return position.set(position.x + percentage * deltaCameraPosition.x, position.y, position.z + percentage * deltaCameraPosition.z);
                },
                "scope.controller.target": function (p) {
                    return new THREE.Vector3(target.x + p * deltaTargetPosition.x, target.y + p * deltaTargetPosition.y, target.z + p * deltaTargetPosition.z);
                }
            },500);
        };
    };
    this.render = function(){ 
        this.raycaster.intersectGet();
        this.cameraCube.rotation.copy( this.camera.rotation );
        this.renderer.setClearColor( 0xfff0f0 );
        this.renderer.setClearAlpha( 0.5 );    
        this.pass.composer.render();             
        this.controller.update();       
        this.animate.run();                                         
    };
    this.init = function(){
        this.initScene();
        this.initCamera();  
        this.initRenderer();
        this.initController();
        this.initRaycaster();
        this.initHook();  
        this.reRender();
        this.handler.initAllHandler();

        this.loadScene();
    };
};

