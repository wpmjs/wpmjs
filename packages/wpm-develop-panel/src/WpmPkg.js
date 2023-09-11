import {render} from "react-dom"
import React from "react"

function parseURLQuery() {
	const queryMap = {};

	location
		.search
		.slice(1)
		.split('&')
		.map(item => {
			const [key, value] = item.split('=');
			queryMap[key] = value || '';
		});

  return queryMap;
}

const query = parseURLQuery()

if (query.wpmPkg) {
	var iframe = document.createElement("div")
	var classDiv = document.createElement("div")
	var el = document.createElement("div")
	iframe.style = "z-index: 1000;background-color:#eee;padding:20px;position: fixed;top: 0;left: 0;right: 0;bottom: 0; width: 100%;height: 100%;"
	document.body.appendChild(classDiv);
	if(classDiv.parentNode !== document.body) {
		iframe.className = classDiv.parentNode.className
	}
	document.body.appendChild(iframe, document.body.firstChild);
	
	iframe.appendChild(el)
	query.wpmPkg = decodeURIComponent(query.wpmPkg)
  window.wpmjs.import(query.wpmPkg).then(Button => {
    render(<Button.default></Button.default>, el)
  })
}
