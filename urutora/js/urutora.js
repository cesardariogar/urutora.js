/*!
 * Urutora.js JavaScript Library v0.0.1
 * https://github.com/tavuntu/urutora.js
  *
 * Copyright Urutora.js
 * Released under the MIT license
 * https://opensource.org/licenses/MIT
 */

var ut = {};

ut.tables = {};

//Miscellaneous:
ut.byId = function(id) {
	return document.getElementById(id);
};

ut.byClass = function(cls, src) {
	var source = document;
	if(src) {
		source = src;
	}

	return source.getElementsByClassName(cls);
};

ut.hideRow = function(row) {
	row.style.display = "none";
};

ut.showRow = function(row) {
	row.style.display = "table-row";
};

ut.wrap = function(element, wrapper) {
    element.parentNode.insertBefore(wrapper, element);
    wrapper.appendChild(element);
};

ut.create = function(tag) {
	return document.createElement(tag);
};

ut.refresh = function(tableId) {
	var utTable = ut.tables[tableId];
	var ref = utTable.reference;

	for(var i = 0; i < ref.childNodes.length; i++) {
		var node = ref.childNodes[i];

		//Iterate rows and show corresponding:
		if(node.tagName === "TBODY") {
			var rowCount = node.childNodes.length;
			var pageNumber = 1;

			for(var j = 0; j < rowCount; j++) {
				var row = node.childNodes[j];
				utTable.columnCount = row.childNodes.length;

				row.setAttribute("page-number", pageNumber);

				if((j + 1) % utTable.pageSize === 0) {
					pageNumber++;
				}

				if(row.getAttribute("page-number") != utTable.currentPage) {
					ut.hideRow(row);
				} else {
					ut.showRow(row);
				}
			}

			utTable.pageCount = Math.ceil(rowCount / utTable.pageSize);
			break;
		}
	}
	// Page indicator:
	var wrapper = ut.byId("ut-wrapper-" + tableId);
	var tdPage = ut.byClass("ut-page-td", wrapper)[0];
	var pageLabel = utTable.currentPage + "/" + utTable.pageCount;
	if(utTable.options.tags.pageIndicator) {
		pageLabel = utTable.options.tags.pageIndicator;
		pageLabel = pageLabel.replace("{current}", utTable.currentPage)
		pageLabel = pageLabel.replace("{total}", utTable.pageCount)
	}
	tdPage.innerHTML = pageLabel;

	if(utTable.pageCount == 0) {
		ut.byClass("ut-nav-table", wrapper)[0].style.display = "none";
	} else {
		ut.byClass("ut-nav-table", wrapper)[0].style.display = "table";
	}
};

ut.firstPage = function(tableId) {
	var utTable = ut.tables[tableId];
	utTable.currentPage = 1;

	ut.refresh(tableId);
};

ut.prevPage = function(tableId) {
	var utTable = ut.tables[tableId];
	utTable.currentPage--;

	if(utTable.currentPage < 1) {
		utTable.currentPage = 1;
	}

	ut.refresh(tableId);
};

ut.nextPage = function(tableId) {
	var utTable = ut.tables[tableId];
	utTable.currentPage++;

	if(utTable.currentPage > utTable.pageCount) {
		utTable.currentPage = utTable.pageCount;
	}

	ut.refresh(tableId);
};

ut.lastPage = function(tableId) {
	var utTable = ut.tables[tableId];
	utTable.currentPage = utTable.pageCount;
	
	ut.refresh(tableId);
};

ut.goToPage = function(tableId, page) {
	//TODO
};

ut.search = function(tableId, text) {
	var utTable = ut.tables[tableId];
	var ref = utTable.reference;

	for(var i = 0; i < ref.childNodes.length; i++) {
		var node = ref.childNodes[i];
		var rowCount = node.childNodes.length;

		//Iterate table rows:
		var matches = false;
		if(node.tagName === "TBODY") {
			for(var j = 0; j < rowCount; j++) {
				var row = node.childNodes[j];

				//Iterate table cells:
				var foundInRow = false;
				for(var k = 0; k < row.childNodes.length; k++) {
					var cell = row.childNodes[k];

					targetText = cell.innerText;
					if(!utTable.options.keySensitive) {
						targetText = cell.innerText.toLowerCase();
						text = text.toLowerCase();
					}

					if(targetText.indexOf(text) !== -1) {
						foundInRow = true;
						matches = true;
					}
				}

				//Show/hide the ones with/without results:
				if(!foundInRow) {
					ut.hideRow(row);
				} else {
					ut.showRow(row);
				}

			}
			var wrapper = ut.byId("ut-wrapper-" + tableId);
			var nr = ut.byClass("ut-no-results-row", wrapper);
			var navRow = ut.byClass("ut-nav-row", wrapper)[0];
			// Show or hide the "no results" row
			if(matches) {
				ut.hideRow(navRow);
				ut.hideRow(nr[0]);
			} else {
				ut.hideRow(navRow);
				ut.showRow(nr[0]);
			}
			break;
		}
	}
};

ut.init = function(tableId, opts) {
	var options = opts || {};

	ut.tables[tableId] = {
		"reference": ut.byId(tableId),
		"pageSize": options.pageSize || 5,
		"currentPage": 1,
		"options": options
	};

	var utTable = ut.tables[tableId];
	var ref = utTable.reference;

	//Setup table:
	if(!ref) {
		alert("No table with id '" + tableId + "' found!");
	} else {
		var wrapper = document.createElement("div");
		wrapper.setAttribute("class", "ut-wrapper");
		wrapper.setAttribute("id", "ut-wrapper-" + tableId);

		ut.wrap(ref, wrapper);

		//Navigation:
		var navTable = ut.create("table");
		navTable.setAttribute("class", "ut-nav-table");

		var navRow = ut.create("tr");
		navRow.setAttribute("class", "ut-nav-row");

		if(!utTable.options.tags) {
			utTable.options.tags = {};
		}
		var tags = utTable.options.tags;
		
		var navFirstTD = ut.create("td");
		navFirstTD.setAttribute("class", "ut-nav ut-td-first");
		navFirstTD.innerHTML = tags.firstPage || "<<";
		navFirstTD.onclick = function() {
			ut.firstPage(tableId);
		};

		var navPrevTD = ut.create("td");
		navPrevTD.setAttribute("class", "ut-nav ut-td-prev");
		navPrevTD.innerHTML = tags.prevPage || "<";
		navPrevTD.onclick = function() {
			ut.prevPage(tableId);
		};

		var navPageTD = ut.create("td");
		navPageTD.setAttribute("class", "ut-page-td");

		var navNextTD = ut.create("td");
		navNextTD.setAttribute("class", "ut-nav ut-td-next");
		navNextTD.innerHTML = tags.nextPage || ">";
		navNextTD.onclick = function() {
			ut.nextPage(tableId);
		};

		var navLastTD = ut.create("td");
		navLastTD.setAttribute("class", "ut-nav ut-td-last");
		navLastTD.innerHTML = tags.lastPage || ">>";
		navLastTD.onclick = function() {
			ut.lastPage(tableId);
		};

		navRow.appendChild(navFirstTD);
		navRow.appendChild(navPrevTD);

		navRow.appendChild(navPageTD);

		navRow.appendChild(navNextTD);
		navRow.appendChild(navLastTD);

		navTable.appendChild(navRow);
		wrapper.appendChild(navTable);

		////////////////////
		ut.refresh(tableId);
		////////////////////

		//Search field:
		if(!options.disableSearch) {
			var searchInput = ut.create("input");
			searchInput.setAttribute("class", "ut-search-input");
			searchInput.setAttribute("placeholder", tags.searchPlaceHolder || "Search")
			wrapper.insertBefore(searchInput, wrapper.firstChild);

			searchInput.onkeyup = function() {
				var text = searchInput.value.trim();
				if(text) {
					ut.search(tableId, text);
				} else {
					ut.showRow(navRow);
					ut.hideRow(ut.byClass("ut-no-results-row", wrapper)[0]);
					ut.refresh(tableId);
				}
			};
		}

		// No results row indicator:
		var noResultsRow = document.createElement("tr");
		noResultsRow.setAttribute("class", "ut-no-results-row");
		noResultsRow.innerHTML = "<td colspan='5'>" +
			(tags.noResults || "No results found") +
		"</td>";
		navTable.appendChild(noResultsRow);
	}

	utTable.state = "ready";
};