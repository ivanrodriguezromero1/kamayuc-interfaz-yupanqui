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
  girX = 0;
  girY = 0;
  girZ = 0;
  huellaGeo;
  huellaMat;
  huellaMesh;
  arrayHuella = [];
  ava=0;
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
      
      console.log(event.key)
      
      if(event.key.toString()=='d'||event.key.toString()=='D'){
        
        // if(this.girY>0){
         
        // }
        if(this.ava!=0){
          this.girY-=3*Math.PI/180;
        }
      }else if(event.key.toString()=='a'||event.key.toString()=='A'){
        
        // if(this.girY<22*Math.PI/180){
          
        // }
        if(this.ava!=0){
          this.girY+=3*Math.PI/180;
        }
      }else if(event.key.toString()=='s'||event.key.toString()=='S'){
        // // this.girX+=3*Math.PI/180;
        // if(this.girX<60*Math.PI/180){
          
        // }
        if(this.ava>0){
          this.ava=0;
        }
        else{
          this.ava=-1;
        }
      }else if(event.key.toString()=='w'||event.key.toString()=='W'){
        if(this.ava<0){
          this.ava=0;
        }
        else{
          this.ava=1;
        }
        // this.girX-=3*Math.PI/180;
        // if(this.girX>0){
          
        // }
      }else if(event.key.toString()=='q'||event.key.toString()=='Q'){
        this.ava=0;
        this.gripper=0;
      }else if(event.key.toString()=='e'||event.key.toString()=='E'){
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
    this.renderer.setSize(window.innerWidth-3,innerHeight-50);
    
    // create the scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xaaccff );
    this. scene.fog = new THREE.FogExp2( 0xaaccff, 0.021 );
    this.camera = new THREE.PerspectiveCamera(60, (window.innerWidth-3) / (window.innerHeight-60), 1, 20000);

    this.camera.position.x = -4;
    this.camera.position.y = 4;
    this.camera.position.z = 8;

    // light

    var dirLight = new THREE.DirectionalLight(0xeeeeee);
    dirLight.position.set(200, 200, 1000);

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
    this.controls.minDistance = 3;
    this.controls.maxDistance = 15;
    //controls.update();

    this.controls.target.x = 0;
    this.controls.target.y = 0;
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
    texture.repeat.set( 353, 353);

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
        this.rover.rotation.y= Math.PI/2;
        
        this.rover.position.x = 0;//rotation x :-Math.PI/2
        this.rover.position.y = 0.76;//0.76
        this.rover.position.z = 0;//0.02



        // this.rover.rotateOnAxis(this.ejeX, this.girX);
        // this.rover.rotateOnAxis(this.ejeY, this.girY);
        // this.rover.rotateOnAxis(this.ejeZ, this.girZ);

        this.rover.scale.set(4, 4, 4);
        this.scene.add(this.rover);
        this.animate();
        for (let i = 0; i <= 120; i++) {
          this.huellaGeo = new THREE.BoxGeometry( 1, 0.05, 1 );
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

      this.rover.rotation.x = 0;
      this.rover.rotation.y= Math.PI/2;
      this.rover.rotation.z = 0;
      
      

      let ejeX = new THREE.Vector3(1, 0, 0);
      let ejeY = new THREE.Vector3(0, 1, 0);
      let ejeZ = new THREE.Vector3(0, 0, 1);

      this.rover.rotateOnAxis(ejeX, this.girX);
      this.rover.rotateOnAxis(ejeY, this.girY);
      this.rover.rotateOnAxis(ejeZ, this.girZ);

      if (this.ava == 1) {
        if (this.ang == 0) {
          let eje = new THREE.Vector3(0, 1, 0);
          this.arrayHuella[this.contPasos].rotation.x = 0;
          this.arrayHuella[this.contPasos].rotation.y = 0;
          this.arrayHuella[this.contPasos].rotation.z = 0;
          this.arrayHuella[this.contPasos].rotateOnAxis(eje, this.girY);
          this.ang = 1;

        } else if (this.ang == 1) {
          // let eje = new THREE.Vector3(1, 0, 0);
          // this.rot += 2 * Math.PI / 180;
          // this.cont += 1;

          const paso = 0.07;

          this.giroDirec = this.girY;
          this.rover.position.z -= Math.cos(this.giroDirec) * paso;
          this.rover.position.x -= Math.sin(this.giroDirec) * paso;
          console.log(this.rover.position);
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
      else if (this.ava==-1){
        if (this.ang == 0) {
          let eje = new THREE.Vector3(0, 1, 0);
          this.arrayHuella[this.contPasos].rotation.x = 0;
          this.arrayHuella[this.contPasos].rotation.y = 0;
          this.arrayHuella[this.contPasos].rotation.z = 0;
          this.arrayHuella[this.contPasos].rotateOnAxis(eje, this.girY);
          this.ang = 1;

        } else if (this.ang == 1) {
          // let eje = new THREE.Vector3(1, 0, 0);
          this.rot += 2 * Math.PI / 180;
          this.cont += 1;

          const paso = -0.07;

          this.giroDirec = this.girY;
          this.rover.position.z -= Math.cos(this.giroDirec) * paso;
          this.rover.position.x -= Math.sin(this.giroDirec) * paso;
          console.log(this.rover.position);
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
    this.frameId = requestAnimationFrame(() => {
      this.animate();
    });
    this.render();
    // this.stats.update();
  }

  render(): void {

    // this.rover.rotation.x += 0.01;
    // this.rover.rotation.y += 0.01;
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }
  resize(): void {
    const width = window.innerWidth-20;
    const height = window.innerHeight-64;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width,height);
  }
}