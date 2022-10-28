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