Scene.prototype.load = function() {
    var scope = this;
    var textures = {};
    var model = {
        red: './models/red.obj',
        bus: './models/123.obj'
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
    var onError = function ( xhr ) {
    };

    var loader = new THREE.OBJLoader( manager );
    loader.load( model.bus, function ( object ) {
        object.position.y = 5;
        object.scale = new THREE.Vector3(0.01,0.01,0.01);
        scope.model.bus = {
            mesh: object
        };
    }, onProgress, onError );

    var parkingSetGeo = new THREE.PlaneBufferGeometry(8,16,4);
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
        temp:{
            geo:new THREE.CubeGeometry(4,4,4),
            mat:new THREE.MeshLambertMaterial({color:new THREE.Color("#123456")}),
            height: 4,
            size: [1, 1]
        },
        red: {
            geo:new THREE.CubeGeometry(12,4,4),
            mat:new THREE.MeshLambertMaterial({color:new THREE.Color("#123456")}),
            height: 4,
            size: [3, 1]
        },
        blue: {
            geo:new THREE.CubeGeometry(12,4,8),
            mat:new THREE.MeshLambertMaterial({color:new THREE.Color("#486548")}),
            height: 4,
            size: [3, 2]
        },
        parkingSet: {
            geo: parkingSetGeo,
            mat: parkingSetMat,
            height: 0.4,
            size: [2, 4]
        },
        canvasTextureList
    };
      
};

