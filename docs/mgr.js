define(['managerAPI', 'datapipeline.js'], function(Manager) {
    let API = new Manager();

    API.setName('mgr');
    API.addSettings('skip',true);
	init_data_pipe(API, 'wGEEFYhKxi2b', {file_type:'csv'});

/*
    //Randomly select which of two sets of category labels to use.
    let raceSet = API.shuffle(['a','b'])[0];
    let blackLabels = [];
    let whiteLabels = [];

    if (raceSet == 'a') {
        blackLabels.push('African Americans');
        whiteLabels.push('European Americans');
    } else {
        blackLabels.push('Black people');
        whiteLabels.push('White people');
    }

    API.addGlobal({
        raceiat:{},
        //YBYB: change when copying back to the correct folder
        baseURL: './images/',
        raceSet:raceSet,
        blackLabels:blackLabels,
        whiteLabels:whiteLabels,
        //Select randomly what attribute words to see. 
        posWords : API.shuffle([
             'Love', 'Cheer', 'Friend', 'Pleasure',
            'Adore', 'Cheerful', 'Friendship', 'Joyful', 
            'Smiling','Cherish', 'Excellent', 'Glad', 
            'Joyous', 'Spectacular', 'Appealing', 'Delight', 
            'Excitement', 'Laughing', 'Attractive','Delightful', 
            'Fabulous', 'Glorious', 'Pleasing', 'Beautiful', 
            'Fantastic', 'Happy', 'Lovely', 'Terrific', 
            'Celebrate', 'Enjoy', 'Magnificent', 'Triumph'
        ]),
        negWords : API.shuffle([
            'Abuse', 'Grief', 'Poison', 'Sadness', 
            'Pain', 'Despise', 'Failure', 'Nasty', 
            'Angry', 'Detest', 'Horrible', 'Negative', 
            'Ugly', 'Dirty', 'Gross', 'Evil', 
            'Rotten','Annoy', 'Disaster', 'Horrific',  
            'Scorn', 'Awful', 'Disgust', 'Hate', 
            'Humiliate', 'Selfish', 'Tragic', 'Bothersome', 
            'Hatred', 'Hurtful', 'Sickening', 'Yucky'
        ])
    }); 
*/

    API.addTasksSet({
        instructions: [{
            type: 'message',
            buttonText: 'Doorgaan'
        }],

        profile: [{
            type: 'quest',
            name: 'profile',
            scriptUrl: 'profile.js'
        }],

        intro: [{
            inherit: 'instructions',
            name: 'intro',
            templateUrl: 'intro.jst',
            title: 'Introductie',
            header: 'Welkom'
        }],

        skiniat_instructions: [{
            inherit: 'instructions',
            name: 'instructions',
            templateUrl: 'skiniat_instructions.jst',
            title: 'IAT Instructies',
            header: 'Implicit Association Test'
        }],

        explicits: [{
            type: 'quest',
            name: 'explicits',
            scriptUrl: 'explicits.js'
        }],

//        raceiat: [{
//            type: 'time',
//            name: 'raceiat',
//            scriptUrl: 'raceiat.js'
//        }],

        skiniat: [{
            type: 'time',
            name: 'skiniat',
            scriptUrl: 'skiniat.js'
        }],

        lastpage: [{
            type: 'message',
            name: 'lastpage',
            templateUrl: 'lastpage.showresults.jst',
            //templateUrl: 'lastpage.jst',
            title: 'End',
            //Uncomment the following if you want to end the study here.
            //last:true, 
            header: 'Studie klaar'
        }], 
        
        //This task waits until the data are sent to the server.
        uploading: uploading_task({header: 'Een momentje alsjeblieft.', body:'Even wachten, data wordt verzonden...'}),

        //Use if you want to redirect the participants elsewhere at the end of the study
        redirect:
        [{ 
            //type:'redirect', name:'redirecting', url: 'https://app.prolific.co/submissions/complete?cc=CHYHAOC9' 
            //You can use that to go back to prolific: https://app.prolific.co/submissions/complete?cc=YOURCODE
            type:'redirect', name:'redirecting', url: 'https://www.google.com' 
        }],
    });

    API.addSequence([
        
        //{ type: 'post', path: ['raceSet', 'blackLabels', 'whiteLabels'] },
        {inherit: 'intro'},
        {inherit: 'profile'},
        // force the instructions to preceed the iat
        {
            mixer: 'wrapper',
            data: [
                {inherit: 'explicits'},
                {inherit: 'skiniat_instructions'},
                {inherit: 'skiniat'}
            ]
        },
        {inherit: 'uploading'},
        {inherit: 'lastpage'},
        {inherit: 'redirect'}
    ]);

    return API.script;
});
