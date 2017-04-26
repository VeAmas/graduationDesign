Scene.prototype.load = function() {
    var scope = this;
    var textures = {};
    var model = {
        red: './models/red.obj',
        bus: './models/123.obj',
        building1: './models/building1.obj',
        building2: './models/building2.obj',        
        lamp: './models/lamp.obj'
    };

    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };

    manager.onLoad = function () {
        scope.init();
    };

    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };

    var loader = new THREE.OBJLoader( manager );
    loader.load( model.bus, function ( object ) {
        object.position.y = 5;
        var scale = 1.8;
        object.scale.set(scale,scale,scale);
        scope.model.bus = {
            mesh: object
        };
        object.children[0].material.color.set('#000000'); // 轮胎
        object.children[1].material.color.set('#336666'); // 外壳
        object.children[2].material = new THREE.MeshLambertMaterial({ color: '#000000'}); // 玻璃
        object.children[3].material.color.set('#000000'); // 窗户的边框
        object.children[4].material.color.set('#333333'); // 车牌边框和上下车的脚垫

        object.children[0].castShadow = true;
        object.children[1].castShadow = true;
        object.children[2].castShadow = true;
        object.children[3].castShadow = true;
        object.children[4].castShadow = true;
        // for (var i = 0; i < bus.children.length; i++) {
        //     var mat = bus.children[i].material;
        //     mat
        // }
    }, onProgress);

    loader.load( model.building1, function ( object ) {
        scope.model.building1.geo = object.children[0].geometry;
        scope.model.building1.mat = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('./img/building1.jpg'), 
            bumpMap: new THREE.TextureLoader().load('./img/building1_bump.jpg'), 
            bumpScale: 0.2
        });
        var scale = 0.05;
        object.children[0].geometry.scale(scale,scale,scale);
    }, onProgress );

    loader.load( model.building2, function ( object ) {
        scope.model.building2.geo = object.children[0].geometry;
        scope.model.building2.mat = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('./img/building2.jpg'), 
            bumpScale: 0.2
        });
        var scale = 0.1;
        object.children[0].geometry.scale(scale,scale,scale);
    }, onProgress );

    loader.load( model.lamp, function ( object ) {
        scope.model.lamp.geo = object.children[0].geometry;
        scope.model.lamp.mat = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('./img/lamp.jpg'), 
            // bumpScale: 0.2
        });
        var scale = 0.03;
        object.children[0].geometry.scale(scale,scale,scale);
    }, onProgress );

    var parkingSetGeo = new THREE.PlaneBufferGeometry(8,24,4);
    parkingSetGeo.rotateX(-0.5*Math.PI);
    var parkingSetMat = new THREE.MeshBasicMaterial({transparent: true, map: new THREE.TextureLoader().load('./img/parkingSet.png')});

    var canvasTextureList = {};
    var setList = [{
        name: '3D',
        id: '1568413'
    }, {
        name: '4F',
        id: '25438648'
    }, {
        name: '3E',
        id: '152483'
    }, {
        name: '3F',
        id: '483645836'
    }];
    setList.forEach(function (v) {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.width = 64;
        canvas.height = 128;
        context.font = "Bold 28px Arial";
        context.textAlign='center';
        context.fillStyle = "rgba(255,255,255,1)";
        context.fillText(v.name, 32, 50);
        var texture = new THREE.Texture(canvas);
        canvasTextureList[v.name] = texture;
        texture.needsUpdate = true;
    });

    scope.model = {
        cur:{

        },
        parkingSet: {
            geo: parkingSetGeo,
            mat: parkingSetMat,
            height: 0.4,
            size: [2, 6]
        },
        building1: {
            height: 2.5,
            size: [10, 4]
        },
        building2: {
            height: 43,
            size: [8, 8]
        },
        lamp: {
            height: -0.5,
            size: [1, 1]
        },
        canvasTextureList
    };
      
};
