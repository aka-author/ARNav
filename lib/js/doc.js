/* * ** *** ***** ******** ************* *********************
 Product:	Active Reader Navigation Library
 Module:	doc.js                                   (\(\
 Func:		Managing document data                   (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavTocEntry extends ArnavModel {

	constructor(chief, id, title, uri=undefined) {
		
		super(chief, id);
		
		this.title = title;
		this.uri = uri;
	}

	getTitle() {
		return this.title;
	}

	hasUri() {
		return !!this.uri;
	}

	getUri() {
		return this.uri;
	}

	getLevel() {
		return this.getChief().getLevel() + 1;
	}

	matchUri(uri) {
		let clauses = uri.split("/");
		return clauses[clauses.length-1] == this.getUri();	
	}

	getEntries() {
		return this.workers;
	}
}


class ArnavDoc extends ArnavModel {

	getLevel() {
		return 0;
	}

	createEntryOfDto(chief, entryDto) {
		return new ArnavTocEntry(chief, entryDto.id, entryDto.title, entryDto.uri);
	}

	extractTocEntriesFromDto(dto) {
		return dto.toc.entries;
	}

	loadEntryFromDto(chief, entryDto) {
		let entry = this.createEntryOfDto(chief, entryDto);
		if(entryDto.entries)
			this.loadEntriesFromDto(entry, entryDto.entries);
		return entry;	
	}

	loadEntriesFromDto(chief, entriesDtoArray) {
		for(let i in entriesDtoArray) {
			this.loadEntryFromDto(chief, entriesDtoArray[i]);
		}
	}

	loadFromDto(dto) {
		this.id = dto.id;
		this.title = dto.title;
		this.loadEntriesFromDto(this, this.extractTocEntriesFromDto(dto)); 
	}
	
	getEntries() {
		return this.workers;
	}
}
