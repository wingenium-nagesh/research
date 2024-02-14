define(['questAPI'], function(Quest){
    let API = new Quest();
    let isTouch = API.getGlobal().$isTouch;
	
    /**
	* Page prototype
	*/
    API.addPagesSet('basicPage',{
        noSubmit:false, //Change to true if you don't want to show the submit button.
        header: 'Introductie',
        decline: false,
        declineText: isTouch ? 'Decline' : 'Decline to Answer', 
        autoFocus:true,
        progressBar:  'Page <%= pagesMeta.number %> out of 3'
    });
	
    /**
	* Question prototypes
	*/
    API.addQuestionsSet('basicQ',{
        decline: 'false',
        required : true, 		
        errorMsg: {
            required: isTouch
                ? 'Please select an answer, or click \'Decline\'' 
                : 'Please select an answer, or click \'Decline to Answer\''
        },
        autoSubmit:'false',
        noSubmit:false, //Change to true if you don't want to show the submit button.
        numericValues:'true',
        help: '<%= pagesMeta.number < 3 %>',
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

	
    /**
	*Specific questions
	*/	
    API.addQuestionsSet('beroep',{
        inherit : 'profession',
        name: 'beroep',
        stem: 'Wat is jouw beroep?'
    });

    API.addQuestionsSet('leeftijd',{
            type: 'slider',
            stem: 'Wat is jouw leeftijd',
            min:18,
            max:70,
            steps:50
    });

    API.addQuestionsSet('geslacht',{
        inherit : 'basicDropdown',
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
