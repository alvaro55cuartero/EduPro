class CuboRawModel() {
	this.vertices = { 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0,

			0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1,

			1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1,

			0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1,

			0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1,

			0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1

	};

	this.textureCoords = {

			0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1,
			1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0

	};

	this.indices = { 0, 1, 3, 3, 1, 2, 4, 5, 7, 7, 5, 6, 8, 9, 11, 11, 9, 10, 12, 13, 15, 15, 13, 14,
			16, 17, 19, 19, 17, 18, 20, 21, 23, 23, 21, 22

	};

	Constructor() {
		super(vertices, indices, textureCoords);
	}


}