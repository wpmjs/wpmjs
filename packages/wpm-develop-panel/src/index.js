// require("../../wpmjs/dist/index.js")
import React from 'react';
import ReactDOM from 'react-dom';
import DevelopPanel from './DevelopPanel';
import './WpmPkg';

function main() {

	if (!localStorage.getItem("wpm-debug-url")) {
		localStorage.setItem("wpm-debug-url", 'http://localhost:9120')
	}

  const el = document.createElement('div');
	
	el.id = 'wpmjs-dev-panel';

	document.body.appendChild(el);
	ReactDOM.render(<DevelopPanel />, el);
}

if(!document.getElementById('wpmjs-dev-panel')) {
	main()
}
