/*!
 * Urutora.js JavaScript Library v0.0.4
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

ut.refreshPageIndicator = function(tableId) {
	// Page indicator:
	var utTable = ut.tables[tableId];
	var wrapper = ut.byId("ut-wrapper-" + tableId);
	var tdPage = ut.byClass("ut-page-td", wrapper)[0];
	var pageLabel = utTable.currentPage + "/" + utTable.pageCount;
	if(utTable.options.tags.pageIndicator) {
		pageLabel = utTable.options.tags.pageIndicator;
		pageLabel = pageLabel.replace("{current}", utTable.currentPage)
		pageLabel = pageLabel.replace("{total}", utTable.pageCount)
	}
	tdPage.innerHTML = pageLabel;
};

ut.refresh = function(tableId) {
	var utTable = ut.tables[tableId];
	var ref = utTable.reference;


	var tbody = ref.querySelector("tbody");
	//Iterate rows and show corresponding:
	if(tbody) {
		var rowCount = tbody.childNodes.length;
		rowCount -= ref.querySelectorAll("tbody tr.ut-hidden-row").length;
		if(utTable.searching) {
			rowCount = ref.querySelectorAll("tr[search-page-number]").length;
		}
		utTable.rowCount = rowCount;
		utTable.pageCount = Math.ceil(utTable.rowCount / utTable.pageSize);
		var pageNumber = 1;

		//Move current page if it's out of limits:
		if(utTable.currentPage > utTable.pageCount) {
			utTable.currentPage = utTable.pageCount || 1;
		}

		var indexRow = 1;
		var indexVisibleRow = 1;
		var differentiator = "page-number";//Paginate all rows.

		if(utTable.searching) {//Paginate search results:
			differentiator = "search-page-number";
		}

		var rowsFound = 0;
		for(var j = 0; j < tbody.childNodes.length; j++) {
			var row = tbody.childNodes[j];

			row.setAttribute("page-number", pageNumber);

			if(indexRow % utTable.pageSize === 0) {
				pageNumber++;
			}

			if(row.getAttribute(differentiator) != utTable.currentPage) {
				ut.hideRow(row);
			} else {
				ut.showRow(row);
				rowsFound++;
				if(indexVisibleRow % 2 === 0) {
					row.setAttribute("class", "ut-even-row");
				} else {
					row.removeAttribute("class");
				}
				indexVisibleRow++;
			}
			indexRow++;
		}

		// Hide pagination:
		if(tbody.childNodes.length == 0) {
			ut.hideRow(ref.parentNode.querySelector(".ut-nav-row"));
		} else {
			ut.showRow(ref.parentNode.querySelector(".ut-nav-row"));
		}
		//Insert "filler" rows:
		var lastOnes = rowsFound % utTable.pageSize;

		//Delete previous rows if there are:
		var prevHiddenRows = ref.querySelectorAll("tbody tr.ut-hidden-row");
		for(var i = 0; i < prevHiddenRows.length; i++) {
			ref.querySelector("tbody").removeChild(prevHiddenRows[i]);
		}

		if(lastOnes != 0) {
			var remaining = utTable.pageSize - lastOnes
			for(var i = 0; i < remaining; i++) {
				var tr = document.createElement("tr");
				tr.setAttribute("page-number", utTable.pageCount);
				tr.setAttribute("class", "ut-hidden-row");
				tr.style.visibility = "hidden";
				var td = document.createElement("td");
				td.innerHTML = "&nbsp;";
				td.setAttribute("colspan", utTable.columnCount);

				tr.appendChild(td);
				ref.querySelector("tbody").appendChild(tr);
			}
		}
	}
	
	ut.refreshPageIndicator(tableId);
};

ut.search = function(tableId, text) {
	var utTable = ut.tables[tableId];
	var ref = utTable.reference;

	var matches = false;
	var rowSearchIndex = 1;
	var tbody = ref.querySelector("tbody");
	if(tbody) {

		var searchPageNumber = 1;
		for(var j = 0; j < tbody.childNodes.length; j++) {
			var row = tbody.childNodes[j];

			//Iterate table cells:
			var foundInRow = false;
			for(var k = 0; k < row.childNodes.length; k++) {
				var cell = row.childNodes[k];

				targetText = cell.innerText;
				if(!utTable.options.caseSensitive) {
					targetText = cell.innerText.toLowerCase();
					text = text.toLowerCase();
				}

				if(targetText.indexOf(text) != -1) {
					foundInRow = true;
					matches = true;
				}
			}

			//Show/hide the ones with/without results:
			if(!foundInRow) {
				row.removeAttribute("search-page-number")
			} else {
				if(row.getAttribute("class") != "ut-hidden-row") {
					row.setAttribute("search-page-number", searchPageNumber);
					if(rowSearchIndex % utTable.pageSize === 0) {
						searchPageNumber++;
					}

					rowSearchIndex++;
				}
			}


		}
		var wrapper = ut.byId("ut-wrapper-" + tableId);
		var navRow = wrapper.querySelector("tr.ut-nav-row");
		var nrRow = wrapper.querySelector("tr.ut-no-results-row");
		ut.refresh(tableId);

		if(matches) {
			ut.showRow(navRow);
			ut.hideRow(nrRow);
		} else {
			ut.hideRow(navRow);
			ut.showRow(nrRow);
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

		utTable.columnCount = ref.querySelectorAll("thead tr:last-child th").length;

		ut.wrap(ref, wrapper);
		//Style for table associated (optional):
		ref.setAttribute("ut-table", "true");
		if(utTable.options.tableStyling == false) {
			ref.removeAttribute("ut-table");
		}

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

		//Search field:
		if(!options.disableSearch) {
			var searchInput;
			if(options.searchInput) {
				searchInput = ut.byId(options.searchInput);
			} else {
				searchInput = ut.create("input");
				searchInput.setAttribute("class", "ut-search-input");
				searchInput.setAttribute("placeholder", tags.searchPlaceHolder || "Search")
				wrapper.insertBefore(searchInput, wrapper.firstChild);
			}

			searchInput.onkeyup = function() {
				var text = searchInput.value.trim();
				if(text) {
					utTable.searching = true;
					ut.search(tableId, text);
				} else {
					ut.showRow(navRow);
					ut.hideRow(ut.byClass("ut-no-results-row", wrapper)[0]);
					utTable.searching = false;
					ut.refresh(tableId);
				}
			};
		}

		// No results row indicator:
		var noResultsRow = document.createElement("tr");
		var noResultsCell = document.createElement("td");
		noResultsRow.setAttribute("class", "ut-no-results-row");
		noResultsCell.innerHTML = (tags.noResults || "No results found");
		noResultsCell.setAttribute("colspan", "5");
		noResultsRow.appendChild(noResultsCell);
		navTable.appendChild(noResultsRow);

		////////////////////
		ut.refresh(tableId);
		////////////////////
	}

	utTable.state = "ready";
};
