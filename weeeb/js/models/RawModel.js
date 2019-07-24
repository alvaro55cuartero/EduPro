class RawModel {


	constructor(id, count) {
		this.id = id;
		this.count = count;
	}

	RawModel(positions, indices, textureCoords) {
		RawModel model = Loader.loadToVao(positions, indices, textureCoords);
		this.id = model.id;
		this.count = model.count;
	}

	RawModel(indices, positions, textureCoords, normals) {
		RawModel model = Loader.loadToVao(indices, positions, textureCoords, normals);
		this.id = model.id;
		this.count = model.count;
	}

	getId() {
		return id;
	}

	setId(id) {
		this.id = id;
	}

	setCount(count) {
		this.count = count;
	}

	getCount() {
		return count;
	}

}