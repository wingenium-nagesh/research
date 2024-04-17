define(['questAPI'], function(Quest){
    let API = new Quest();
    let isTouch = API.getGlobal().$isTouch;
	
    /**
	* Page prototype
	*/
    API.addPagesSet('basicPage',{
        header: 'Questionnaire',
        prev:true,
        prevText:'Vorige',
        noSubmit:false, //Change to true if you don't want to show the submit button.
        submitText:'Volgende',
        decline:true,
        declineText: isTouch ? 'Weigeren' : 'Geen antwoord', 
        autoFocus:true,
        numbered:false,
        animate:'slide fade drop-in',
        progressBar:'Page <%= pagesMeta.number %> van 6',
        //questions: [
        //    {type:'dropdown', stem:'Wat is jouw beroep?', name:'beroep',required:true,answers: [{text:'AIOS', value:0},{text:'Verpleegkundige', value:1},{text:'Verloskundige', value:2},{text:'Gynaecoloog', value:3}]},
        //    {type:'dropdown', stem:'Wat is jouw geslacht?', name:'geslacht',required:true,answers: [{text:'Man', value:0},{text:'Vrouw', value:1},{text:'Anders', value:0}]},
        //    {type:'textNumber', stem:'Wat is jouw leeftijd?', name:'leeftijd',min:18,max:70,required:true,errorMsg: {max:"Deelnemers moeten tussen 18 en 70 jaar oud zijn",number:"Leeftijd moet een geldig nummer zijn"}}       
        //]
    });
	
    /**
	* Question prototypes
	*/
    API.addQuestionsSet('basicQ',{
        decline: 'true',
        required : true, 		
        errorMsg: {
            required: isTouch
            ? 'Selecteer alstublieft een antwoord, of klik op \'Weigeren\''
            : 'Selecteer alstublieft een antwoord, of klik op \'Geen antwoord\''
        },
        autoSubmit:'true',
        numericValues:'true',
        help: '<%= pagesMeta.number < 6 %>',
        helpText: 'Tip: For quick response, click to select your answer, and then click again to submit.'
    });

    API.addQuestionsSet('basicSelect',{
        inherit :'basicQ',
        type: 'selectOne'
    });
	
    API.addQuestionsSet('basicDropdown',{
        inherit :'basicQ',
        type : 'dropdown',
        autoSubmit:false
    });
	
    API.addQuestionsSet('therm',{
        inherit: 'basicSelect',
        answers: [
            {text:'10 - Extremely warm', value:10},
            {text:'9 - Very warm', value:9},
            {text:'8 - Moderately warm', value:8},
            {text:'7 - Somewhat warm', value:7},
            {text:'6 - Slightly warm', value:6},
            {text:'5 - Neither warm nor cold', value:5},
            {text:'4 - Slightly cold', value:4},
            {text:'3 - Somewhat cold', value:3},
            {text:'2 - Moderately cold', value:2},
            {text:'1 - Very cold', value:1},
            {text:'0 - Extremely cold', value:0}
        ]
    });

	
    /**
	*Specific questions
	*/	
    API.addQuestionsSet('attributes7',{
        inherit : 'basicSelect',
        name: 'attributes7',
        stem: 'Which statement best describes you?',
        answers: [
            {text:'I strongly prefer <%= global.whiteLabels %> to <%= global.blackLabels %>.',value:7},
            {text:'I moderately prefer <%= global.whiteLabels %> to <%= global.blackLabels %>.',value:6},
            {text:'I slightly prefer <%= global.whiteLabels %> to <%= global.blackLabels %>.',value:5},
            {text:'I like <%= global.whiteLabels %> and <%= global.blackLabels %> equally.',value:4},
            {text:'I slightly prefer <%= global.blackLabels %> to <%= global.whiteLabels %>.',value:3},
            {text:'I moderately prefer <%= global.blackLabels %> to <%= global.whiteLabels %>.',value:2},
            {text:'I strongly prefer <%= global.blackLabels %> to <%= global.whiteLabels %>.',value:1}
        ]
    });
	
    API.addQuestionsSet('thermBlack',{
        inherit : 'therm',
        name: 'Tblack_0to10',
        stem: 'How warm or cold do you feel towards <b><%= global.blackLabels %></b>?'
    });

    API.addQuestionsSet('thermWhite',{
        inherit : 'therm',
        name: 'Twhite_0to10',
        stem: 'How warm or cold do you feel towards <b><%= global.whiteLabels %></b>?'
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
                            questions: {inherit:'thermBlack'}
                        },
                        {
                            inherit:'basicPage', 
                            questions: {inherit:'thermWhite'}							
                        }
                    ]
                },
                {
                    inherit:'basicPage', 
                    questions: {inherit:'attributes7'}
                }
            ]
        }
    ]);

    return API.script;
});
