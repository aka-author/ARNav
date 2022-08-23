/* * ** *** ***** ******** ************* *********************
 Product:	Active Reader Navigation Library
 Module:	doc.js                                   (\(\
 Func:		Managing document data                   (^.^)
* * ** *** ***** ******** ************* *********************/

class ArnavTocEntry extends ArnavBureaucrat {

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


class ArnavDoc extends ArnavBureaucrat {

	getLevel() {
		return 0;
	}

	createEntryOfDto(chief, entryDto) {
		return new ArnavTocEntry(chief, entryDto.entry['@id'], 
									entryDto.entry['@title'], entryDto.entry['@uri']);
	}

	extractTocEntriesFromDto(dto) {
		return dto["entries"];
	}

	loadEntryFromDto(chief, entryDto) {
		let entry = this.createEntryOfDto(chief, entryDto);
		this.entriesByUri[entry.getUri] = entry; 
		if(entryDto.entry.entries)
			this.loadEntriesFromDto(entry, entryDto.entry.entries);
		return entry;	
	}

	loadEntriesFromDto(chief, entriesDtoArray) {
		for(let i in entriesDtoArray) {
			this.loadEntryFromDto(chief, entriesDtoArray[i]);
		}
	}

	loadFromDto(dto) {
		this.id = dto["entry"]["@id"];
		this.title = dto["entry"]["@title"];
		this.entriesByUri = {};
		this.loadEntriesFromDto(this, this.extractTocEntriesFromDto(dto["entry"])); 
	}
	
	getEntries() {
		return this.workers;
	}

}
