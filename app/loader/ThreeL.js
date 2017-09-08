import React, {Component} from "react";
import "./App.css";
import * as THREE from "three";

const nodes_n = 20;

const ThreeC_s = {
	minHeight: 'inherit'
};


// Set some camera attributes.
const NEAR = 0.001;
const FAR = 200000000000;

const bezier = require('adaptive-bezier-curve');
const Line = require('three-line-2d')(THREE);
const BasicShader = require('three-line-2d/shaders/basic')(THREE);
const {MeshLine, MeshLineMaterial} = require('three.meshline');
console.log(MeshLine, MeshLineMaterial);

class ThreeC extends Component {
	constructor(props) {
		super(props);
	};
	
	componentWillMount() {
		// this.width = undefined;
		// this.height = undefined;
		// this.aspect = undefined;
		// this.container = undefined;
		// Create a WebGL renderer, camera
		// and a scene
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setClearColor(new THREE.Color('black'));
		this.scene = new THREE.Scene();
		
		this.mouseX = 0;
		this.mouseY = 0;
		
		this.onDocumentMouseMove = (event) => {
			console.log("fff",event.clientX,window.innerWidth);
			this.mouseX = (event.clientX - window.innerWidth / 2) * 0.01;
			this.mouseY = (event.clientY - window.innerHeight / 2) * 0.01;
			console.log(this.mouseX);
		};
		
		
		this.onDocumentMouseLeave = (event) => {
			console.log("leave");
			this.mouseX = this.mouseY = 0;
		};
	}
	
	resize() {
		// Set the scene size.
		this.width = this.container.clientWidth;
		this.height = this.container.clientHeight;
		
		// Create/update a WebGL camera
		this.camera = new THREE.OrthographicCamera(
			this.width / -2,
			this.width / 2,
			this.height / 2,
			this.height / -2,
			NEAR,
			FAR
		);
		
		this.renderer.setSize(this.width, this.height);
	}
	
	componentDidMount() {
		this.resize();
		
		// Attach the renderer-supplied
		// DOM element.
		this.container.appendChild(this.renderer.domElement);
		
		document.addEventListener('mousemove', this.onDocumentMouseMove, false);
		document.addEventListener('mouseleave', this.onDocumentMouseLeave, false);


//build a smooth bezier curve in world units
// 		let quality = 1;
// 		let curve = bezier(
// 			[( Math.random() - 0.5 ) * this.width, ( Math.random() - 0.5 ) * this.height],
// 			[( Math.random() - 0.5 ) * this.width, ( Math.random() - 0.5 ) * this.height],
// 			[( Math.random() - 0.5 ) * this.width, ( Math.random() - 0.5 ) * this.height],
// 			[( Math.random() - 0.5 ) * this.width, ( Math.random() - 0.5 ) * this.height],
// 			quality);
//
// //create our geometry
// 		let curveGeometry = Line(curve);
//
// //create a material using a basic shader
// 		let mat = new THREE.ShaderMaterial(BasicShader({
// 			side: THREE.DoubleSide,
// 			diffuse: 0x5cd7ff,
// 			thickness: 20
// 		}));
//
// 		let mesh = new THREE.Mesh(curveGeometry, mat);
// 		this.scene.add(mesh);
// 		let boxm = new THREE.BoxHelper(mesh, 0xffff00);
// 		this.scene.add(boxm);
		
		
		let geometry = new THREE.Geometry();
		let sprite = new THREE.TextureLoader().load("sprites/disk50.png");
		let i = nodes_n;
		while (i--) {
			let vertex = new THREE.Vector3();
			vertex.x = ( Math.random() - 0.5 ) * this.width;
			vertex.y = ( Math.random() - 0.5 ) * this.height;
			vertex.z = 0; //200 * Math.random()-100;
			geometry.vertices.push(vertex);
		};
		let material = new THREE.PointsMaterial({
			size: 35,
			sizeAttenuation: false,
			map: sprite,
			alphaTest: 0.5,
			transparent: true
		});
		material.precision = "lowp";
		material.color.setHSL(1.0, 0.3, 0.7);
		let particles = new THREE.Points(geometry, material);
		this.scene.add(particles);
		let box = new THREE.BoxHelper(particles, 0xffff00);
		this.scene.add(box);
		
		let line = new MeshLine();
		line.setGeometry(geometry);
		let material3 = new MeshLineMaterial({
			sizeAttenuation: true,
			lineWidth: 0.01,
			// resolution: new THREE.Vector2(this.width, this.height)
		});
		let mesh = new THREE.Mesh(line.geometry, material3); // this syntax could definitely be improved!
		this.scene.add(mesh);
		
		console.log(this.camera);
		this.scene.add(this.camera);
		
		let axisHelper = new THREE.AxisHelper(1000);
		this.scene.add(axisHelper);
		
		let render = () => {
			console.log("?",this.mouseY);
			requestAnimationFrame(render);
			let time = Date.now() * 0.0005;
			// this.camera.position.set(this.camera.position.x, this.camera.position.y, 300*Math.sin(time));
			this.camera.rotation.set(this.camera.rotation.x + this.mouseY * 0.01, this.camera.rotation.y + this.mouseX * 0.01, this.camera.rotation.z);
			
			this.camera.updateProjectionMatrix();
			// this.camera.updateProjectionMatrix();
			this.renderer.render(this.scene, this.camera);
		};
		render();
		
	}
	
	
	render() {
		
		return (
			<div ref={(container) => {
				this.container = container
			}} style={ThreeC_s}/>
		);
	}
}

export default ThreeC;
