import canvasData from './canvasData.js';

for(const picture of canvasData)
{
	const pixelBox = `<div class="col-4 align-self-center mt-5">
						<div class="pixel silver-border" data-tag="${picture.tag}">
							<img src="${picture.thumbnail}" alt="${picture.getName()}">
						</div>
					</div>`;
	pixelList.innerHTML+=pixelBox;
}

$(document).on('click','div.pixel',function(){
	
	var tag = $(this).data('tag');
	var picture = canvasData.filter((element)=>element.tag == tag)[0]
	console.log(picture)
	//$('#pixel-modal').modal('show');
})

