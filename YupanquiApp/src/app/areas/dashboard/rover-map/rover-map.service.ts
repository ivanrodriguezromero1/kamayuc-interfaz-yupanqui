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
  huellaGeo;
  huellaMat;
  huellaMesh;
  arrayHuella = [];
  ava;
  giroDirec = 0;
  ang = 0;
  contPasos = 0;
  rot = 0;
  cont=0;
  gripper = 0;
  latlngs = [[38.36, -110.7]];
  rutX=38.36;
	rutY=-110.7;
  polyline;
  // stats = new Stats();
  private frameId: number = null;

  constructor(
    private ngZone: NgZone
  ) {
    window.addEventListener('resize', () => {
      this.resize();
    });
    window.addEventListener("keydown", (event) =>{
      console.log(event.key);
      this.ava=1;
      if(event.key.toString()=='h'){
        if(this.girY>0){
          this.girY-=3*Math.PI/180;
        }
      }else if(event.key.toString()=='k'){
        if(this.girY<22*Math.PI/180){
          this.girY+=3*Math.PI/180;
        }
      }else if(event.key.toString()=='j'){
        if(this.girZ<60*Math.PI/180){
          this.girZ+=3*Math.PI/180;
        }
      }else if(event.key.toString()=='u'){
        if(this.girZ>0){
          this.girZ-=3*Math.PI/180;
        }
      }else if(event.key.toString()=='o'){
        this.gripper=0;
      }else if(event.key.toString()=='l'){
        this.gripper=1;
      }



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
        this.rover = object;

        this.rover.position.x = 0;//rotation x :-Math.PI/2
        this.rover.position.y = 0.76;//0.76
        this.rover.position.z = 0;//0.02



        this.rover.rotateOnAxis(this.ejeX, this.girX);
        this.rover.rotateOnAxis(this.ejeY, this.girY);
        this.rover.rotateOnAxis(this.ejeZ, this.girZ);

        this.rover.scale.set(4, 4, 4);
        this.scene.add(this.rover);
        this.animate();
        for (let i = 0; i <= 120; i++) {
          this.huellaGeo = new THREE.BoxGeometry(0.5, 0.2, 0.5);
          this.huellaMat = new THREE.MeshBasicMaterial({ color: 0x0CB6B8 });
          this.huellaMesh = new THREE.Mesh(this.huellaGeo, this.huellaMat);

          this.huellaMesh.position.x = 0;
          this.huellaMesh.position.y = 0;
          this.huellaMesh.position.z = 0;
          this.arrayHuella[i] = this.huellaMesh;
          this.scene.add(this.huellaMesh);
        
        }
        
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
  }

  animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.

    this.ngZone.runOutsideAngular(() => {
      // if (document.readyState !== 'loading') {
      //$('#idPresionDatos').html(brazoX); 

      // this.rover.rotation.x = 0;
      // this.rover.rotation.y = 0;
      // this.rover.rotation.z = 0;

      // brazoInfe.rotation.x=0;
      // brazoInfe.rotation.y=0;
      // brazoInfe.rotation.z=0;

      // brazoCent.rotation.x=0;
      // brazoCent.rotation.y=0;
      // brazoCent.rotation.z=0;

      // brazoSup.rotation.x=0;
      // brazoSup.rotation.y=0;
      // brazoSup.rotation.z=0;

      // brazoSup2.rotation.x=0;
      // brazoSup2.rotation.y=0;
      // brazoSup2.rotation.z=0;

      this.ejeX = new THREE.Vector3(1, 0, 0);
      this.ejeY = new THREE.Vector3(0, 1, 0);
      this.ejeZ = new THREE.Vector3(0, 0, 1);

      this.rover.rotateOnAxis(this.ejeX, this.girX);
      this.rover.rotateOnAxis(this.ejeY, this.girY);
      this.rover.rotateOnAxis(this.ejeZ, this.girZ);
      // brazoCent.rotateOnAxis(ejeY, girY)
      // brazoSup.rotateOnAxis(ejeY, girY);
      // brazoSup.rotateOnAxis(ejeZ, girZ);
      // brazoSup2.rotateOnAxis(ejeY, girY);
      // brazoSup2.rotateOnAxis(ejeZ, girZ);
      if (this.ava == 1) {
        if (this.ang == 0) {
          let eje = new THREE.Vector3(0, 1, 0);
          this.arrayHuella[this.contPasos].rotation.x = 0;
          this.arrayHuella[this.contPasos].rotation.y = 0;
          this.arrayHuella[this.contPasos].rotation.z = 0;
          this.arrayHuella[this.contPasos].rotateOnAxis(eje, this.girY);
          this.ang = 1;

        } else if (this.ang == 1) {

          let eje = new THREE.Vector3(1, 0, 0);
          this.rot += 2 * Math.PI / 180;
          this.cont += 1;

          const paso = 0.07;

          this.giroDirec = this.girY;
          this.rover.position.z -= Math.cos(this.giroDirec) * paso;
          this.rover.position.x -= Math.sin(this.giroDirec) * paso;

          let cateZ = Math.cos(this.giroDirec) * paso;
          let cateX = Math.sin(this.giroDirec) * paso;

          this.camera.position.z -= cateZ;
          this.camera.position.x -= cateX;

          this.controls.target.x -= cateX;
          this.controls.target.z -= cateZ;
          this.controls.update();

          if (this.cont==22){
          	this.ang=0;
          	this.cont=0;
          	this.arrayHuella[this.contPasos].position.x=this.rover.position.x;
          	this.arrayHuella[this.contPasos].position.z=this.rover.position.z;

          	this.rutX+=Math.sin(this.giroDirec)*0.00001;
          	this.rutY+=Math.cos(this.giroDirec)*0.00001;

          	// $("#longlat").text(" Long="+rutX.toString()+"° \n Lat="+rutY.toString()+"°");
          	// this.latlngs.push([this.rutX,this.rutY]);
          	// this.polyline= L.polyline(this.latlngs, {color: '#0CB6B8'}).addTo(map);
          	// map.fitBounds(polyline.getBounds());

          	if(this.contPasos<120){
          		this.contPasos+=1;
          	}else{
          		this.contPasos=0;
          	}				 		
          }
        }

      }

      this.scene.add(this.rover);

      // agregarBrazoAEscena();



      this.controls.update();
      this.render();
      // } 
      // else {
      //   window.addEventListener('DOMContentLoaded', () => {


      //     this.controls.update();
      //     this.render();
      //   });
      // }

      
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