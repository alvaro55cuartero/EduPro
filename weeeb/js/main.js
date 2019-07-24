gl = null;
programInfo = null;
buffers = null;

loop();



function loop() {
  init();
  setTimeout(frame, 500);
  dispose();
}


function init() {
  const canvas = document.querySelector('#glcanvas');
  gl = canvas.getContext('webgl');

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  shaderProgram = new Shader(gl, vsSource, fsSource);

  const positionBuffer = gl.createBuffer();


  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);


  const positions = [
     1.0,  1.0,
    -1.0,  1.0,
     1.0, -1.0,
    -1.0, -1.0,
  ];

  
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  buffers = {
    position: positionBuffer,
  };

}

function frame() {
  tick();
  render();
  console.log("frame");
  setTimeout(frame, 500);
}


function tick() {

}

function render() { 
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  drawScene(gl, programInfo, buffers);
}

function dispose() {

}


function drawScene(gl, programInfo, buffers) {
  const fieldOfView = 45 * Math.PI / 180;
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();


  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  const modelViewMatrix = mat4.create();


  mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);

  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(shaderProgram.vertexPosition, numComponents, type, normalize, stride, offset);
    gl.enableVertexAttribArray(shaderProgram.vertexPosition);
  }


  shaderProgram.start();
  gl.uniformMatrix4fv(shaderProgram.projectionMatrix, false, projectionMatrix);
  gl.uniformMatrix4fv(shaderProgram.modelViewMatrix, false, modelViewMatrix);

  {
    const offset = 0;
    const vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
  }
}
