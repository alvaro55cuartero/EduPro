function Shader(gl, vertexFile, fragmentFile) {

	this.loadShader = function(gl, type, source) {
  		const shader = gl.createShader(type);
  		gl.shaderSource(shader, source);
  		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
 			gl.deleteShader(shader);
  			return null;
  		}

  		return shader;
	}


	this.vertexShaderID = this.loadShader(gl, gl.VERTEX_SHADER, vertexFile);
	this.fragmentShaderID = this.loadShader(gl, gl.FRAGMENT_SHADER, fragmentFile);
	this.programID = gl.createProgram();

			
	gl.attachShader(this.programID, this.vertexShaderID);
	gl.attachShader(this.programID, this.fragmentShaderID);
		
		
	gl.linkProgram(this.programID);
	gl.validateProgram(this.programID);
		
 	if (!gl.getProgramParameter(this.programID, gl.LINK_STATUS)) {
    	alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    	return null;
  	}

	vertexPosition = gl.getAttribLocation(this.programID, 'aVertexPosition');
	projectionMatrix = gl.getUniformLocation(this.programID, 'uProjectionMatrix');
	modelViewMatrix = gl.getUniformLocation(this.programID, 'uModelViewMatrix');

	this.start = function() {
		gl.useProgram(this.programID);
	}

	this.stop = function() {
		gl.useProgram(0);
	}
   			
}