window.PARTY_CATALOGUE = {
  packs: [
    { id: 1, name: 'The Jackbox Party Pack', year: 2014, status: 'released' },
    { id: 2, name: 'The Jackbox Party Pack 2', year: 2015, status: 'released' },
    { id: 3, name: 'The Jackbox Party Pack 3', year: 2016, status: 'released' },
    { id: 4, name: 'The Jackbox Party Pack 4', year: 2017, status: 'released' },
    { id: 5, name: 'The Jackbox Party Pack 5', year: 2018, status: 'released' },
    { id: 6, name: 'The Jackbox Party Pack 6', year: 2019, status: 'released' },
    { id: 7, name: 'The Jackbox Party Pack 7', year: 2020, status: 'released' },
    { id: 8, name: 'The Jackbox Party Pack 8', year: 2021, status: 'released' },
    { id: 9, name: 'The Jackbox Party Pack 9', year: 2022, status: 'released' },
    { id: 10, name: 'The Jackbox Party Pack 10', year: 2023, status: 'released' },
    { id: 11, name: 'The Jackbox Party Pack 11', year: 2025, status: 'released' },
    { id: 12, name: 'The Jackbox Party Pack 12', year: 2026, status: 'upcoming', kind: 'party-pack' },
    { id: 'survey-scramble', name: 'The Jackbox Survey Scramble', shortName: 'Survey Scramble', year: 2024, status: 'released', kind: 'standalone' }
  ],
  games: [
    {id:'ydkj-2015',title:"YOU DON'T KNOW JACK 2015",pack:1,min:1,max:4,audience:false,extended:false,tags:['quiz'],style:['Trivia'],desc:'A fast, irreverent trivia game mixing pop culture and general knowledge.'},
    {id:'fibbage-xl',title:'Fibbage XL',pack:1,min:2,max:8,audience:false,extended:false,tags:['quiz','typing'],style:['Bluffing','Trivia'],desc:'Invent believable fake answers to obscure trivia and spot the real one.'},
    {id:'drawful',title:'Drawful',pack:1,min:3,max:8,audience:false,extended:false,tags:['drawing','typing'],style:['Drawing','Guessing'],desc:'Draw strange prompts, then write convincing titles for everyone else’s artwork.'},
    {id:'word-spud',title:'Word Spud',pack:1,min:2,max:8,audience:false,extended:false,tags:['typing'],style:['Word game'],desc:'Build ridiculous chains of words and phrases together.'},
    {id:'lie-swatter',title:'Lie Swatter',pack:1,min:1,max:100,audience:false,extended:false,tags:['quiz'],style:['True or false'],desc:'Rapid-fire fact checking where everyone decides whether statements are true or false.'},

    {id:'fibbage-2',title:'Fibbage 2',pack:2,min:2,max:8,audience:true,extended:true,tags:['quiz','typing'],style:['Bluffing','Trivia'],desc:'Write fake answers to trivia prompts and try to fool the room.'},
    {id:'bidiots',title:'Bidiots',pack:2,min:3,max:6,audience:false,extended:false,tags:['drawing'],style:['Drawing','Auction'],desc:'Create questionable art, then bid strategically in a chaotic auction.'},
    {id:'bomb-corp',title:'Bomb Corp.',pack:2,min:1,max:4,audience:false,extended:false,tags:['speaking'],style:['Puzzle','Co-op'],desc:'Work through instruction-based office puzzles where clear communication matters.'},
    {id:'earwax',title:'Earwax',pack:2,min:3,max:8,audience:true,extended:false,tags:[],style:['Sound'],desc:'Answer prompts by combining sound effects and let the judge choose the funniest result.'},
    {id:'quiplash-xl',title:'Quiplash XL',pack:2,min:3,max:8,audience:true,extended:true,tags:['typing'],style:['Comedy','Writing'],desc:'Type punchlines to prompts and compete for everyone’s votes.'},

    {id:'quiplash-2',title:'Quiplash 2',pack:3,min:3,max:8,audience:true,extended:true,tags:['typing'],style:['Comedy','Writing'],desc:'A head-to-head prompt game built around quick written jokes.'},
    {id:'trivia-murder-party',title:'Trivia Murder Party',pack:3,min:1,max:8,audience:true,extended:true,tags:['quiz'],style:['Trivia','Survival'],desc:'A sinister quiz show where wrong answers lead to dangerous mini-games.'},
    {id:'guesspionage',title:'Guesspionage',pack:3,min:2,max:8,audience:true,extended:false,tags:['quiz'],style:['Survey','Guessing'],desc:'Estimate how people answered real-world survey questions.'},
    {id:'tee-ko',title:'Tee K.O.',pack:3,min:3,max:8,audience:true,extended:true,tags:['drawing','typing'],style:['Drawing','Writing'],desc:'Combine player-made drawings and slogans into shirts, then battle for votes.'},
    {id:'fakin-it',title:"Fakin' It",pack:3,min:3,max:6,audience:true,extended:false,tags:['speaking'],style:['Social deduction'],desc:'Spot the player who is secretly faking their way through group actions and answers.'},

    {id:'fibbage-3',title:'Fibbage 3',pack:4,min:2,max:8,audience:true,extended:true,tags:['quiz','typing'],style:['Bluffing','Trivia'],desc:'Create fake trivia answers and uncover the truth, with an extra personal bluffing mode.'},
    {id:'survive-internet',title:'Survive the Internet',pack:4,min:3,max:8,audience:true,extended:true,tags:['typing'],style:['Comedy','Writing'],desc:'Twist your friends’ words into absurd internet posts and headlines.'},
    {id:'monster-seeking-monster',title:'Monster Seeking Monster',pack:4,min:3,max:7,audience:true,extended:true,tags:['typing','speaking'],style:['Social','Hidden roles'],desc:'Message other players, arrange dates and exploit secret monster powers.'},
    {id:'bracketeering',title:'Bracketeering',pack:4,min:3,max:16,audience:true,extended:true,tags:['typing','speaking'],style:['Voting','Debate'],desc:'Submit answers to ridiculous prompts, then argue and vote through a tournament bracket.'},
    {id:'civic-doodle',title:'Civic Doodle',pack:4,min:3,max:8,audience:true,extended:true,tags:['drawing'],style:['Drawing'],desc:'Take turns adding to community murals and vote on the evolving artwork.'},

    {id:'ydkj-full-stream',title:"YOU DON'T KNOW JACK: Full Stream",pack:5,min:1,max:8,audience:true,extended:true,tags:['quiz'],style:['Trivia'],desc:'The classic irreverent trivia format rebuilt for a full party audience.'},
    {id:'split-room',title:'Split the Room',pack:5,min:3,max:8,audience:true,extended:true,tags:['typing','speaking'],style:['Hypotheticals','Voting'],desc:'Create divisive hypothetical choices designed to split the room as evenly as possible.'},
    {id:'patently-stupid',title:'Patently Stupid',pack:5,min:3,max:8,audience:true,extended:true,tags:['drawing','typing','speaking'],style:['Drawing','Presentation'],desc:'Invent ridiculous products, draw them and pitch them to the group.'},
    {id:'mad-verse-city',title:'Mad Verse City',pack:5,min:3,max:8,audience:true,extended:true,tags:['typing','speaking'],style:['Writing','Performance'],desc:'Write rap lines for giant robots and send them into lyrical battles.'},
    {id:'zeeple-dome',title:'Zeeple Dome',pack:5,min:1,max:6,audience:false,extended:false,tags:[],style:['Action','Co-op'],desc:'A physics-driven action game where players fling characters around an alien arena.'},

    {id:'tmp-2',title:'Trivia Murder Party 2',pack:6,min:1,max:8,audience:true,extended:true,tags:['quiz'],style:['Trivia','Survival'],desc:'A second deadly trivia show with new questions, traps and survival mini-games.'},
    {id:'role-models',title:'Role Models',pack:6,min:3,max:6,audience:true,extended:true,tags:['speaking'],style:['Personality','Voting'],desc:'Categorise your friends into unusual roles and compare how the group sees everyone.'},
    {id:'joke-boat',title:'Joke Boat',pack:6,min:3,max:8,audience:true,extended:true,tags:['typing','speaking'],style:['Comedy','Performance'],desc:'Build jokes from supplied ingredients and perform them for votes.'},
    {id:'dictionarium',title:'Dictionarium',pack:6,min:3,max:8,audience:true,extended:true,tags:['typing'],style:['Word game','Writing'],desc:'Invent definitions, synonyms and sentences for completely made-up words.'},
    {id:'push-button',title:'Push The Button',pack:6,min:4,max:10,audience:false,extended:false,tags:['drawing','typing','speaking'],style:['Social deduction'],desc:'Complete drawing and writing tests while trying to identify hidden alien players.'},

    {id:'quiplash-3',title:'Quiplash 3',pack:7,min:3,max:8,audience:true,extended:true,tags:['typing'],style:['Comedy','Writing'],desc:'Write funny responses to prompts and win head-to-head votes.'},
    {id:'devils-details',title:'The Devils and the Details',pack:7,min:3,max:8,audience:true,extended:false,tags:['speaking'],style:['Co-op','Chaos'],desc:'Coordinate a suburban devil family through simultaneous chores and crises.'},
    {id:'champd-up',title:"Champ'd Up",pack:7,min:3,max:8,audience:true,extended:true,tags:['drawing','typing'],style:['Drawing','Battles'],desc:'Draw bizarre champions and challengers, name them and fight for the crowd’s vote.'},
    {id:'talking-points',title:'Talking Points',pack:7,min:3,max:8,audience:true,extended:true,tags:['speaking'],style:['Presentation','Improvisation'],desc:'Improvise presentations from slides you have never seen while an assistant controls the visuals.'},
    {id:'blather-round',title:"Blather 'Round",pack:7,min:2,max:6,audience:true,extended:false,tags:['typing','speaking'],style:['Guessing','Word game'],desc:'Describe a secret phrase using a restricted word bank while everyone guesses.'},

    {id:'drawful-animate',title:'Drawful Animate',pack:8,min:3,max:10,audience:true,extended:true,tags:['drawing','typing'],style:['Drawing','Guessing'],desc:'Create two-frame animated doodles, then write titles and identify the real prompt.'},
    {id:'wheel-enormous',title:'The Wheel of Enormous Proportions',pack:8,min:2,max:8,audience:true,extended:true,tags:['quiz'],style:['Trivia','Chance'],desc:'Answer trivia to earn slices, then spin a giant wheel for victory.'},
    {id:'job-job',title:'Job Job',pack:8,min:3,max:10,audience:true,extended:true,tags:['typing'],style:['Writing','Comedy'],desc:'Rebuild interview answers using words taken from other players.'},
    {id:'poll-mine',title:'The Poll Mine',pack:8,min:2,max:10,audience:true,extended:true,tags:['speaking'],style:['Teamwork','Ranking'],desc:'Work in teams to predict how the group ranked a series of choices.'},
    {id:'weapons-drawn',title:'Weapons Drawn',pack:8,min:4,max:8,audience:true,extended:true,tags:['drawing','speaking'],style:['Social deduction','Drawing'],desc:'Draw calling cards, commit fictional murders and investigate everyone else’s artwork.'},

    {id:'fibbage-4',title:'Fibbage 4',pack:9,min:2,max:8,audience:true,extended:true,tags:['quiz','typing'],style:['Bluffing','Trivia'],desc:'Write convincing lies for unusual trivia and try to spot the truth.'},
    {id:'junktopia',title:'Junktopia',pack:9,min:3,max:8,audience:true,extended:true,tags:['typing','speaking'],style:['Writing','Presentation'],desc:'Invent backstories for strange objects and sell them to the room.'},
    {id:'nonsensory',title:'Nonsensory',pack:9,min:3,max:8,audience:true,extended:true,tags:['drawing','typing'],style:['Guessing','Creative'],desc:'Respond to prompts on absurd sliding scales, then estimate where each answer belongs.'},
    {id:'roomerang',title:'Roomerang',pack:9,min:4,max:9,audience:true,extended:true,tags:['typing','speaking'],style:['Roleplay','Voting'],desc:'Roleplay reality-show characters, answer prompts and vote housemates out and back in.'},
    {id:'quixort',title:'Quixort',pack:9,min:1,max:10,audience:true,extended:true,tags:['quiz','speaking'],style:['Trivia','Teamwork'],desc:'Sort trivia answers into the correct order before they fall away.'},

    {id:'dodo-re-mi',title:'Dodo Re Mi',pack:10,min:1,max:9,audience:true,extended:false,tags:[],style:['Music','Rhythm'],desc:'Use phones as instruments and perform songs together in a rhythm challenge.'},
    {id:'fixytext',title:'FixyText',pack:10,min:3,max:8,audience:true,extended:true,tags:['typing'],style:['Writing','Teamwork'],desc:'Everyone edits the same chaotic text at once, with no delete key.'},
    {id:'hypnotorious',title:'Hypnotorious',pack:10,min:4,max:8,audience:true,extended:true,tags:['typing','speaking'],style:['Hidden identity','Roleplay'],desc:'Answer in character, work out who belongs together and identify the odd one out.'},
    {id:'tee-ko-2',title:'Tee K.O. 2',pack:10,min:3,max:8,audience:true,extended:true,tags:['drawing','typing'],style:['Drawing','Writing'],desc:'Create drawings and slogans, combine them into garments and battle for votes.'},
    {id:'timejinx',title:'Timejinx',pack:10,min:1,max:8,audience:true,extended:true,tags:['quiz'],style:['Trivia'],desc:'A time-travel trivia game focused on dates, eras and historical knowledge.'},

    {id:'suspectives',title:'Suspectives',pack:11,min:4,max:8,audience:true,extended:true,tags:['typing','speaking'],style:['Social deduction'],desc:'Use survey answers as evidence while investigating which player committed the fictional crime.'},
    {id:'doominate',title:'Doominate',pack:11,min:3,max:8,audience:true,extended:true,tags:['typing'],style:['Writing','Comedy'],desc:'Turn pleasant situations into terrible ones in a head-to-head joke contest.'},
    {id:'legends-trivia',title:'Legends of Trivia',pack:11,min:1,max:6,audience:true,extended:true,tags:['quiz','speaking'],style:['Trivia','Teamwork'],desc:'Work together through a fantasy-flavoured trivia adventure.'},
    {id:'cookie-haus',title:'Cookie Haus',pack:11,min:3,max:8,audience:true,extended:true,tags:['drawing'],style:['Drawing'],desc:'Design edible-looking creations to satisfy unusual customer briefs.'},
    {id:'hear-say',title:'Hear Say',pack:11,min:2,max:8,audience:true,extended:true,tags:['speaking'],style:['Sound','Performance'],desc:'Record voices and sound effects, then hear them used in short movie scenes.'},

    {id:'idol-factions',title:'Idol Factions',pack:12,min:2,max:8,audience:null,extended:null,tags:['quiz','speaking'],style:['Trivia','Teams'],desc:'Teams race to sort factual answers into the right categories.',upcoming:true},
    {id:'forgot-card',title:'We Forgot a Card',pack:12,min:3,max:8,audience:null,extended:null,tags:['typing','drawing'],style:['Creative','Writing'],desc:'Create absurd greeting cards for unusual occasions.',upcoming:true},
    {id:'debate-switch',title:'Debate and Switch',pack:12,min:2,max:8,audience:null,extended:null,tags:['speaking'],style:['Debate','Persuasion'],desc:'Take sides on silly topics and persuade the room to switch allegiance.',upcoming:true},
    {id:'megapals',title:'MegaPals',pack:12,min:3,max:8,audience:null,extended:null,tags:['typing','speaking'],style:['Word game','Friends'],desc:'Try to match the way other players think through fast word associations.',upcoming:true},
    {id:'hyperface',title:'Hyperface',pack:12,min:3,max:8,audience:null,extended:null,tags:['drawing'],style:['Visual','Creative'],desc:'Warp and alter faces and images to answer bizarre visual prompts.',upcoming:true}

    ,{id:'survey-hilo',title:'Hilo',pack:'survey-scramble',min:2,max:10,audience:true,extended:true,tags:['quiz','typing'],style:['Survey','Guessing'],desc:'Guess answers near the top or bottom of enormous ranked survey lists.'}
    ,{id:'survey-bounce',title:'Bounce',pack:'survey-scramble',min:2,max:10,audience:true,extended:true,tags:['quiz','typing','speaking'],style:['Survey','Teams'],desc:'Teams guess survey answers to position a paddle and return an accelerating ball.'}
    ,{id:'survey-squares',title:'Squares',pack:'survey-scramble',min:2,max:10,audience:true,extended:true,tags:['quiz','typing','speaking'],style:['Survey','Teams','Strategy'],desc:'Teams claim a grid by finding answers in different popularity ranges.'}
    ,{id:'survey-speed',title:'Speed',pack:'survey-scramble',min:2,max:10,audience:true,extended:true,tags:['quiz','typing'],style:['Survey','Fast-paced'],desc:'Race against the clock to uncover as many answers on a survey list as possible.'}
    ,{id:'survey-dares',title:'Dares',pack:'survey-scramble',min:2,max:10,audience:true,extended:true,tags:['quiz','typing','speaking'],style:['Survey','Challenge'],desc:'Dare other players to find answers higher or lower on the current survey list.'}
    ,{id:'survey-dash',title:'Dash',pack:'survey-scramble',min:2,max:10,audience:true,extended:true,tags:['quiz'],style:['Survey','Race','Multiple choice'],desc:'Race to the finish by identifying the most popular answer from a set of survey choices.'}
  ]
};
