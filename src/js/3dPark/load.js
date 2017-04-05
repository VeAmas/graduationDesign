Scene.prototype.load = function() {
    var scope = this;
    var textures = {};
    var model = {
        red: './red.obj',
        bus: './123.obj'
    };

    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };

    manager.onLoad = function () {
        console.log('finished!')
    }

    console.log(manager)

    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };
    var onError = function ( xhr ) {
    };


    var loader = new THREE.OBJLoader( manager );
    loader.load( model.red, function ( object ) {
        object.position.y = 5;
        object.rotation.y = 3.14;
        scope.scene.add( object );
    }, onProgress, onError );
    loader.load( model.bus, function ( object ) {
        object.position.y = 5;
        object.scale = new THREE.Vector3(0.01,0.01,0.01)
        sss.bus = object
        scope.scene.add( object );
    }, onProgress, onError );





};


var sss = {}