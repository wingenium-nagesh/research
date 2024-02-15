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
	    lightImagesLabel = 'label2a.jpg';
	    darkImagesLabel = 'label1b.jpg';
	}

       else if (set == 'B')
	{
	    darkImages.push('tone0071b.jpg');
	    darkImages.push('tone0131b.jpg');
	    lightImagesLabel ='label1a.jpg';
	    darkImagesLabel ='label2b.jpg';
	}
    var posWords = API.shuffle(['Liefde', 'Vreugde']);
    var negWords = API.shuffle(['Misbruik', 'Verdriet']);

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
				{word: negWords[1]}
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
				{word: posWords[1]}
			],
			//Stimulus css
			stimulusCss : {color:'#0000FF','font-size':'2.3em'}
		},
	base_url : {//Where are your images at?
	    image : baseURL
	}
    });
});
