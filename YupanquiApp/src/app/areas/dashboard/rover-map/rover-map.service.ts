import * as THREE from 'three';
import { ElementRef, HostListener, Injectable, NgZone, OnDestroy } from '@angular/core';
import { VRMLLoader } from 'node_modules/three/examples/jsm/loaders/VRMLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import  Stats  from 'node_modules/three/examples/jsm/libs/stats.module.js';

@Injectable({ providedIn: 'root' })
export class EngineService implements OnDestroy {
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  light: THREE.AmbientLight;
  geometry: any;
  cube: THREE.Mesh;
  rover: any;
  objeto: any;
  controls: any;
  ejeX = new THREE.Vector3(1, 0, 0);
  ejeY = new THREE.Vector3(0, 1, 0);
  ejeZ = new THREE.Vector3(0, 0, 1);
  girX = 0;
  girY = 0;
  girZ = 0;
  // stats = new Stats();
  private frameId: number = null;

  constructor(
    private ngZone: NgZone
  ) {
    window.addEventListener("keydown", function (event) {
      console.log(event.key);




    }, true);
  }
  //teclado down
  // @HostListener('window:keydown', [])
  // onWindowKeyDown() {
  //   console.log('keydown')
  // }

  ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
    if (this.renderer != null) {
      this.renderer.dispose();
      this.renderer = null;
      this.canvas = null;
    }
  }


  createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = canvas.nativeElement;

    // canvas.nativeElement.appendChild( this.stats.dom );
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize(window.innerWidth, 600);

    // create the scene
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / 600, 1, 20000);

    this.camera.position.set(-10, 7, -2);


    // light

    var dirLight = new THREE.DirectionalLight(0xeeeeee);
    dirLight.position.set(200, 200, 200);

    this.camera.add(dirLight);
    this.camera.add(dirLight.target);

    this.scene.add(this.camera);

    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    // this.rover = new THREE.VR
    // this.cube = new THREE.Mesh(geometry, material);
    // this.scene.add(this.cube);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.maxPolarAngle = Math.PI * 0.45;//0.495
    //controls.target.set( 0, 10, 0 );
    this.controls.minDistance = 1;
    this.controls.maxDistance = 200;
    this.controls.enableDamping = true;
    //controls.update();

    this.controls.target.x = -4;
    this.controls.target.y = 4;
    this.controls.target.z = 0;

    var geometry = new THREE.PlaneBufferGeometry(20000, 20000, 1, 1);
    geometry.rotateX(- Math.PI / 2);
    // var position = geometry.attributes.position;
    // position.usage = THREE.DynamicDrawUsage;
    // for (var i = 0; i < position.count; i++) {
    //   var y = 0.1 * Math.sin(i);
    //   position.setY(i, 0);
    // }

    var texture = new THREE.TextureLoader().load('../../../../assets/terrain/terrain2.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(325, 325);

    var material = new THREE.MeshBasicMaterial({ color: 0xcf882c, map: texture });
    var mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);

    const loader = new VRMLLoader();
    loader.load(
      '../../../../assets/vrm/yupanqui.wrl',
      (object) => {
        // called when the resource is loaded
        console.log("Rover Cargado")
        console.log(object);
        this.rover = object;

        this.rover.position.x = 0;//rotation x :-Math.PI/2
        this.rover.position.y = 0.76;//0.76
        this.rover.position.z = 0;//0.02


        this.rover.rotation.x = 0;
        this.rover.rotation.y = 0;
        this.rover.rotation.z = 0;

        this.rover.rotateOnAxis(this.ejeX, this.girX);
        this.rover.rotateOnAxis(this.ejeY, this.girY);
        this.rover.rotateOnAxis(this.ejeZ, this.girZ);

        this.rover.scale.set(4, 4, 4);

        // for(let i=0;i<=120;i++){
        // 	huellaGeo = new THREE.BoxGeometry( 1, 0.2, 1 );
        // 	huellaMat = new THREE.MeshBasicMaterial( {color: 0x0CB6B8} );
        // 	huellaMesh = new THREE.Mesh( huellaGeo, huellaMat );

        // 	huellaMesh.position.x=0;
        // 	huellaMesh.position.y=0;
        // 	huellaMesh.position.z=0;
        // 	arrayHuella[i]=huellaMesh;
        // 	scene.add(huellaMesh);
        // }

        this.scene.add(this.rover);
        this.scene.add(object)
      },
      (xhr) => {
        // called while loading is progressing
        console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
      },
      (error) => {
        // called when loading has errors
        console.error('An error happened', error);
      },
    );
    //   loader.load('../../../../assets/vrm/rover.wrl', function(object){
    //     alert(object);
    //     this.scene.add(object);
    //     console
    // });
  }

  animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.

    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.controls.update();
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.controls.update();
          this.render();
        });
      }

      window.addEventListener('resize', () => {
        this.resize();
      });
    });
    // this.stats.update();
  }

  render(): void {
    this.frameId = requestAnimationFrame(() => {
      // this.stats.begin();
      this.render();
    });
    // this.rover.rotation.x += 0.01;
    // this.rover.rotation.y += 0.01;
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }
  resize(): void {
    const width = 800;
    const height = 500;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, 600);
  }
}