gl = null;

init();



//
// Start here
//

function init() {
	const canvas = document.querySelector('#glcanvas');
  	gl = canvas.getContext('webgl');

  // If we don't have a GL context, give up now

  	if (!gl) {
   		alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    	return;
  	}

  	const shaderProgram = initShaderProgram(gl, vsSource, fsSource);


  	programInfo = {
    	program: shaderProgram,
    	attribLocations: {
    		vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
   		},
    	uniformLocations: {
      		projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      		modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    	},
  	};

	buffers = initBuffers(gl);

	const fieldOfView = 45 * Math.PI / 180;
  	const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  	const zNear = 0.1;
  	const zFar = 100.0;
	 projectionMatrix = mat4.create();

	mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  	render();
}



function render() {
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
  	gl.clearDepth(1.0);
  	gl.enable(gl.DEPTH_TEST);
  	gl.depthFunc(gl.LEQUAL);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	drawScene(gl, programInfo, buffers);
}


function initBuffers(gl) {


  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const positions = [
     1.0,  1.0,
    -1.0,  1.0,
     1.0, -1.0,
    -1.0, -1.0,
  ];


	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
  };
}

function drawScene(gl, programInfo, buffers) {
  	

  	

  	const modelViewMatrix = mat4.create();

  	mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }

  gl.useProgram(programInfo.program);

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);

  {
    const offset = 0;
    const vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
  }
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
