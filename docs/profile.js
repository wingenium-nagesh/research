define(['questAPI'], function(Quest){
    let API = new Quest();
    let isTouch = API.getGlobal().$isTouch;
	
    API.addPagesSet('basicPage',{
        header: 'Introductie',
        prev:true,
        prevText:'Vorige',
        noSubmit:false, //Change to true if you don't want to show the submit button.
        submitText:'Volgende',
        decline:true,
        declineText: isTouch ? 'Weigeren' : 'Geen antwoord', 
        autoFocus:true,
        numbered:false,
        //animate:'slide fade drop-in',
        //progressBar:'Page <%= pagesMeta.number %> van 3',
        questions: [
            {type:'dropdown', stem:'Wat is jouw beroep?', name:'beroep',required:true,answers: [{text:'AIOS', value:0},{text:'Verpleegkundige', value:1},{text:'Verloskundige', value:2},{text:'Gynaecoloog', value:3}]},
            {type:'dropdown', stem:'Wat is jouw geslacht?', name:'geslacht',required:true,answers: [{text:'Man', value:0},{text:'Vrouw', value:1},{text:'Anders', value:0}]},
            {type:'textNumber', stem:'Wat is jouw leeftijd?', name:'leeftijd',min:18,max:70,required:true,errorMsg: {max:"Deelnemers moeten tussen 18 en 70 jaar oud zijn",number:"Leeftijd moet een geldig nummer zijn"}}       
        ]
    });
    API.addSequence([{inherit:'basicPage'}]);
    return API.script;
});
/*     
	//Question prototypes
    API.addQuestionsSet('basicQ',{
        decline:false,
        required: true, 		
        errorMsg: {
            required: isTouch
            ? 'Selecteer alstublieft een antwoord, of klik op \'Weigeren\''
            : 'Selecteer alstublieft een antwoord, of klik op \'Geen antwoord\''
        },
        autoSubmit:false,
        noSubmit:false, //Change to true if you don't want to show the submit button.
        numericValues:true,
        help:'<%= pagesMeta.number < 3 %>',
        //helpText: 'Tip: For quick response, click to select your answer, and then click again to submit.'
    });

    API.addQuestionsSet('basicSelect',{
        inherit :'basicQ',
        type: 'selectOne'
    });
	
    API.addQuestionsSet('basicDropdown',{
        inherit :'basicQ',
        type : 'dropdown'
    });
	
    API.addQuestionsSet('profession',{
        inherit: 'basicDropdown',
        answers: [
            {text:'AIOS', value:3},
            {text:'Verpleegkundige', value:2},
            {text:'Verloskundige', value:1},
            {text:'Gynaecoloog', value:0}
        ]
    });

	
	// Specific questions
		
    API.addQuestionsSet('beroep',{
        inherit : 'profession',
        name: 'beroep',
        stem: 'Wat is jouw beroep?'
    });

    API.addQuestionsSet('leeftijd',{
            name:'age',
            type:'textNumber',
            stem: 'Wat is jouw leeftijd',
            min:18,
            max:70,
            required:true,
            errorMsg: {
                max: "Deelnemers moeten tussen 18 en 70 jaar oud zijn",
                number: "Leeftijd moet een geldig nummer zijn"
            }
        });

    API.addQuestionsSet('geslacht',{
        inherit: 'basicDropdown',
        name: 'geslacht',
        stem: 'Wat is jouw geslacht?',
        answers: [
            {text:'Man', value:0},
            {text:'Vrouw', value:1},
            {text:'Anders', value:2}
        ]
    });

    API.addSequence([
        {
            mixer : 'random',
            data : [
                {
                    mixer : 'random', 
                    wrapper:true, 
                    data : [
                        {
                            inherit:'basicPage', 
                            questions: {inherit:'beroep'}
                        },
                        {
                            inherit:'basicPage', 
                            questions: {inherit:'leeftijd'}							
                        },
                        {
                            inherit:'basicPage',
                            questions: {inherit:'geslacht'}							
                        },
                    ]
                }
            ]
        }
    ]);

    return API.script;
});

*/
