## Stage 1: Pixel Gallery

This version will include a gallery of my own pixel creations, displayed as thumbnails in four columns with an infinity scroll. These columns will be responsive. Clicking on a thumbnail triggers a pop-up which will display the full-sized image. User will be able to download the image as .png or .svg.

The full sized image will be displayed by a script written in Javascript, which will read a canvasData.js. Later, the script will receive the necessary data from a database, but in this first version all data will be saved locally.

The canvasData.js idea is quite simple: It consists of a square matrix with default sizes (5, 10, 15, 20), although in later versions users will be able to define their own canvas to create a pixel image. Each position of the matrix  represents a pixel in the image and the value will be -1, a blank space, or the position number of an HEX array.

```javascript
//canvasData.js 
//Example of picture data, this information will be added in a database in later versions
export default [
	{
		name: {'es':'Árbol','default':'Tree'},
		dimension: 5,
		colors: ['#2f612e','#56a34b','#24955f','#aeb244','#7e4735'],
		matrix: [
			[-1,0,1,2,-1],
			[1,3,2,3,0],
			[-1,2,0,1,-1],
			[-1,-1,4,-1,-1],
			[-1,-1,4,-1,-1]
		],
		thumbnail: 'img/thumbnail/tree.png',
		tag:'tree',
		getName() {
			var userLang = navigator.language || navigator.userLanguage;
			return this.name[userLang]||this.name['default'];
		}
	}
]
```

Part of the main.js of the Stage 1, this part draws the pixel with their color in a canvas:

```javascript
import canvasData from './canvasData.js';
const canvasSize = 300;
var pixelSize = canvasSize/picture.dimension;

picture = canvasData.filter((element)=>element.tag == tag)[0]; //tag, is defined as data-tag in the thumbnail

var pixelSize = canvasSize/picture.dimension;
picture.matrix.forEach((row,xindex)=>{
    var pixelPicture = "";
    row.forEach((colorTag,yindex)=>{
        var pixelColor = colorTag == -1?"#fff":picture.colors[colorTag];
        pixelPicture += `<div class="pixels" style="background-color:${pixelColor};width:${pixelSize}px;height:${pixelSize}px"></div>`;
    })
    canvas.innerHTML += `<div class="row m-0">${pixelPicture}</div>`;
})

//In the latest versions of JavaScript, you don't need to use document.getElementById('id') to get element from the DOM, simply you access to that element using it's id name
```

Every pixel in the canvas will be defined as a square, the size of which will be calculated so it fits in a canvas box. This box will be responsive, but will have a min width and height.

### TO DO

* Design the thumbnail list :white_check_mark:
* Design the title page :white_check_mark:
* Design the pop up view :white_check_mark:
* Develop the script that draws the pixel image from a matrix defined in a  canvasData.js file :white_check_mark:
* Develop the way to download the image canvas into .png or .svg file :white_check_mark:
