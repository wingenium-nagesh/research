define(['pipAPI',  'iat10.js'], function(APIConstructor, iatExtension){
	
	var API = new APIConstructor();
	var set = API.shuffle(['A','B'])[0];
    var lightImages = [];
    var darkImages = [];
    var lightImagesLabel = [];
    var darkImagesLabel = [];
	
	var baseURL = './images/';
	  //Fill the sets of words and images for the gay categories, based on the gay-set condition
      if (set == 'A')
	{
	    darkImages.push('tone0031b.jpg');
	    darkImages.push('tone0051b.jpg');
	    darkImages.push('tone0061b.jpg');
	    darkImages.push('tone0081b.jpg');
	    darkImages.push('tone0111b.jpg');
	    darkImages.push('tone0121b.jpg');
	    lightImages.push('tone0041a.jpg');
	    lightImages.push('tone0071a.jpg');
	    lightImages.push('tone0091a.jpg');
	    lightImages.push('tone0101a.jpg');
	    lightImages.push('tone0131a.jpg');
	    lightImages.push('tone0141a.jpg');
	    lightImagesLabel = 'label2a.jpg';
	    darkImagesLabel = 'label1b.jpg';
	}

       else if (set == 'B')
	{
	    darkImages.push('tone0071b.jpg');
	    darkImages.push('tone0131b.jpg');
	    darkImages.push('tone0091b.jpg');
	    darkImages.push('tone0101b.jpg');
	    darkImages.push('tone0141b.jpg');
	    darkImages.push('tone0041b.jpg');
	    lightImages.push('tone0081a.jpg');
	    lightImages.push('tone0031a.jpg');
	    lightImages.push('tone0061a.jpg');
	    lightImages.push('tone0111a.jpg');
	    lightImages.push('tone0051a.jpg');
	    lightImages.push('tone0121a.jpg');
	    lightImagesLabel ='label1a.jpg';
	    darkImagesLabel ='label2b.jpg';
	}
    var posWords = API.shuffle([
		'Liefde', 'Vreugde', 'Vriend', 'Plezier', 'Adoreren', 'Vrolijk', 'Vriendschap', 'Blij', 'Glimlachen', 'Koesteren', 'Uitstekend', 'Blij',
		'Blij', 'Spectaculair', 'Aantrekkelijk', 'Vreugde', 'Opwinding', 'Lachen', 'Aantrekkelijk', 'Heerlijk', 'Fantastisch', 'Glorieus', 'Aangenaam', 'Mooi',
		'Geweldig', 'Blij', 'Mooi', 'Fantastisch', 'Vieren', 'Genieten', 'Prachtig', 'Triomf']);
    var negWords = API.shuffle([
		'Misbruik', 'Verdriet', 'Vergif', 'Bedroefd', 'Pijn', 'Verachten', 'Mislukking', 'Vervelend',
		'Boos', 'Afschuw hebben van', 'Afschuwelijk', 'Negatief', 'Lelijk', 'Vuil', 'Vies', 'Kwaad',
		'Verrot', 'Ergeren', 'Ramp', 'Afschuwelijk', 'Hoon', 'Afschuwelijk', 'Walging', 'Haat',
		'Vernederen', 'Egoïstisch', 'Tragisch', 'Hinderlijk', 'Haat', 'Pijnlijk', 'Walgelijk', 'Vies']);

    var darkMedia = []; 
	for(var dImage = 0; dImage < darkImages.length; dImage++)
	{
	    darkMedia.push({image:darkImages[dImage]});
	}

	 var lightMedia = []; 
	for(var lImage = 0; lImage < lightImages.length; lImage++)
	{
	    lightMedia.push({image:lightImages[lImage]});
	}


    return iatExtension({
	category1 : {
	    name : 'Donkerhuidige mensen', //Will appear in the data.
	    title : {
		media : {image:darkImagesLabel}, //Name of the category presented in the task.
		css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
		height : 4 //Used to position the "Or" in the combined block.
	    }, 
	    stimulusMedia :  darkMedia, 

		//Stimulus css (style)
		stimulusCss : {color:'#31940F','font-size':'2.3em'}
	},    
	category2 :    {
	    name : 'Lichthuidige mensen', //Will appear in the data.
	    title : {
		media : {image:lightImagesLabel}, //Name of the category presented in the task.
		css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
		height : 4 //Used to position the "Or" in the combined block.
	    }, 
	    stimulusMedia :  lightMedia, 
		//Stimulus css (style)
		stimulusCss : {color:'#31940F','font-size':'2.3em'}
	},
		attribute1 :
		{
			name : 'Negatief',
			title : {
				media : {word : 'Negatief'},
				css : {color:'#0000FF','font-size':'1.8em'},
				height : 4 //Used to position the "Or" in the combined block.
			},
			stimulusMedia : [ //Stimuli content as PIP's media objects
				{word: negWords[0]},
				{word: negWords[1]},
				{word: negWords[2]},
				{word: negWords[3]},
				{word: negWords[4]},
				{word: negWords[5]},
				{word: negWords[6]},
				{word: negWords[7]}
			],
			//Stimulus css
			stimulusCss : {color:'#0000FF','font-size':'2.3em'}
		},
		attribute2 :
		{
			name : 'Positief',
			title : {
				media : {word : 'Positief'},
				css : {color:'#0000FF','font-size':'1.8em'},
				height : 4 //Used to position the "Or" in the combined block.
			},
			stimulusMedia : [ //Stimuli content as PIP's media objects
				{word: posWords[0]},
				{word: posWords[1]},
				{word: posWords[2]},
				{word: posWords[3]},
				{word: posWords[4]},
				{word: posWords[5]},
				{word: posWords[6]},
				{word: posWords[7]}
			],
			//Stimulus css
			stimulusCss : {color:'#0000FF','font-size':'2.3em'}
		},
	base_url : {//Where are your images at?
	    image : baseURL
	}
    });
});
