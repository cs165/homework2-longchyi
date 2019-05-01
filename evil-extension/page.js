const MATCH_LIST = {
  'there': 'their',
  'their': 'there',
  'they\'re': 'there',
  'There': 'Their',
  'Their': 'There',
  'They\'re': 'There',
  'THERE': 'THEIR',
  'THEIR': 'THERE',
  'THEY\'RE': 'THERE'
};

function transformTextNodes(node) {
	if (node.nodeType == Node.TEXT_NODE){
    	const splitTxt = node.textContent.split(" ");
    	for (let i = 0; i < splitTxt.length; i ++){
      		if (MATCH_LIST.hasOwnProperty(splitTxt[i].trim())){
        		splitTxt[i] = splitTxt[i].replace(splitTxt[i].trim(), MATCH_LIST[splitTxt[i].trim()]);
      		}
    	}
    	node.textContent = splitTxt.join(" ");
  	}
  	for (const child of node.childNodes){
    	transformTextNodes(child);
  	}
}

transformTextNodes(document.body);

console.log('Evil extension loaded!');
console.log('Extension updated');