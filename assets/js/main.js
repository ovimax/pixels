import canvasData from './canvasData.js';
const canvasSize = 300;
var picture;
var	svgBox = document.getElementById('svg-box');
var	svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
var	svgNS = svg.namespaceURI;

svg.setAttribute('xmlns',"http://www.w3.org/2000/svg");
svg.setAttribute('width',canvasSize);
svg.setAttribute('height',canvasSize);

const downloadToFile = (content, filename, contentType) => {
  const a = document.createElement('a');
  const file = new Blob([content], {type: contentType});

  a.href= URL.createObjectURL(file);
  a.download = filename;
  a.click();
  
  URL.revokeObjectURL(a.href);
};

const drawSVG = (color,dim,x,y) => {
	var rect = document.createElementNS(svgNS,'rect');
    rect.setAttribute('x',x);
    rect.setAttribute('y',y);
    rect.setAttribute('width',dim);
    rect.setAttribute('height',dim);
    rect.setAttribute('fill',color);
    svg.appendChild(rect);
}


for(const picture of canvasData)
{
	const pixelBox = `<div class="col-4 align-self-center mt-5 text-center">
						<div class="pixel silver-border" data-tag="${picture.tag}" id="${picture.tag}">
							<img src="${picture.thumbnail}" alt="${picture.getName()}" title="${picture.getName()}" >
						</div>
						<label htmlFor="${picture.tag}">${picture.getName()}</label>
					</div>`;
	pixelList.innerHTML+=pixelBox;
}

$(document).on('click','div.pixel',function(){
	var tag = $(this).data('tag');
	picture = canvasData.filter((element)=>element.tag == tag)[0];

	canvasTitle.innerHTML="";
	canvasColors.innerHTML="";
	canvas.innerHTML="";

	var colors = "";
	picture.colors.forEach((c)=>{
		colors += `<div class="color" style="background-color: ${c};" id="color-${c}">${c}</div>`
	})

	var pixelSize = canvasSize/picture.dimension;
	picture.matrix.forEach((row,xindex)=>{
		var pixelPicture = "";
		row.forEach((colorTag,yindex)=>{
			var pixelColor = colorTag == -1?"#fff":picture.colors[colorTag];
			pixelPicture += `<div class="pixels" style="background-color:${pixelColor};width:${pixelSize}px;height:${pixelSize}px"></div>`;
			var x = yindex*pixelSize;
			var y = xindex*pixelSize;
			drawSVG(pixelColor,pixelSize,x,y)
		})
		canvas.innerHTML += `<div class="row m-0">${pixelPicture}</div>`;
	})

	canvasTitle.innerHTML = `${picture.getName()} (${picture.dimension}x${picture.dimension})`;
	canvasColors.innerHTML = colors;
	svgBox.appendChild(svg);

	$('#pixel-modal').modal('show');
})



//--- MODAL ACTION BUTTONS ---
$(".btn-png").click(function() {
	var div = document.getElementById('canvas');
	html2canvas(document.querySelector("#canvas")).then(canvas => {
	    canvas.toBlob(function(blob) {
                saveAs(blob, `${picture.getName()}.png`); 
            });
	});
});


$(".btn-svg").click(function() {
	downloadToFile(svgBox.innerHTML, `${picture.getName()}.svg`, 'image/svg+xml');
});
//--- MODAL ACTION BUTTONS ---

const myModalEl = document.getElementById('pixel-modal')
myModalEl.addEventListener('hidden.bs.modal', event => {
	svg.innerHTML="";
	svgBox.removeChild(svg);
})