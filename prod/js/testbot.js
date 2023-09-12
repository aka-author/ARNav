class TestBot{constructor(){this.bounceMin=1;this.bounceMax=3;this.stuckMin=300;this.stuckMax=600;this.eventProbabilities={bounce:.5,like:.01,likeMessage:.001,dislike:.05,dislikeMessage:.005,stuck:.1};this.likeMessages="This guide is incredibly informative!;Thank you for making this resource available.;I finally understand this topic thanks to this help page!;Your assistance is greatly appreciated.;I'm so grateful for this detailed explanation.;You've saved me hours of frustration. Thank you!;This is a lifesaver!;Kudos to the author for such a well-written guide.;I can't believe how much I've learned from this help topic.;This has cleared up so many of my questions.;I'm impressed by the quality of this content.;I wish I had found this sooner.;This is a fantastic resource for beginners.;The step-by-step instructions are a game-changer.;I'm feeling much more confident now, thanks to this help page.;I'll be recommending this to my friends and colleagues.;I can't thank you enough for this help article.;I appreciate the effort put into creating this guide.;This has been a tremendous help. Thank you!;I never thought I'd grasp this topic, but your help made it possible.;I'm genuinely impressed by the level of detail provided here.;This is exactly what I needed to solve my problem.;I love how user-friendly this guide is.;This has made my day. Thank you!;I feel like I've unlocked a new skill thanks to this help article.;I'm thrilled to have stumbled upon this resource.;This is an invaluable source of information.;I'm grateful for the clarity of this explanation.;I'm blown away by how helpful this is.;I can't express how thankful I am for this guide.;This is pure gold. Thank you!;I can't stop raving about this to my friends.;I'm giving this a 5-star rating!;This should be the top result for anyone searching on this topic.;I'm so glad I found this. It's a game-changer.;I've bookmarked this page for future reference.;I wish I could shake the hand of the person who created this.;I feel so much more confident after reading this.;I'm recommending this to everyone I know.;This is exactly what I was looking for. Thank you!;I've been searching for help on this topic, and this is the best I've found.;This has exceeded my expectations. Well done!;I can't believe how much easier this makes things.;This is a fantastic resource for learners.;I've been struggling with this, and now it all makes sense.;I've shared this with my entire team. It's that good.;I can't thank you enough for this amazing guide.;This has answered all my questions. I'm thrilled!;I'm walking away from this with a smile on my face.;I feel so much more knowledgeable after reading this.;This deserves all the praise it gets. Outstanding!;I've been searching for a while, and this is the best help page by far.".split(";");
this.dislikeMessages="This guide is terrible!;I expected better from this resource.;Waste of time!;This didn't help me at all.;I'm extremely disappointed.;I regret clicking on this page.;This is a complete letdown.;I can't believe how unhelpful this is.;This is a joke!;I wouldn't recommend this to anyone.;I feel like I've been misled.;This is a waste of digital space.;I'd give this zero stars if I could.;I want my time back after reading this.;I'm furious with the quality of this content.;I'm never visiting this site again.;I expected so much more.;This is just plain awful.;I'm seething with anger over this.;This is an insult to my intelligence.;I demand a refund for the time I wasted here.;This is the worst help article I've ever read.;I can't believe someone wrote this garbage.;I'm absolutely livid!;I want to speak to the person responsible for this mess.;I've seen better help pages from a toddler.;This is an abomination.;I hope no one else falls for this nonsense.;This makes me want to scream in frustration.;I'm offended by the lack of quality here.;I'm considering legal action for wasting my time.;I can't even express how much I dislike this.;I'm disgusted with this resource.;This is pure incompetence.;I'm shaking my head at how bad this is.;I'm fuming with rage right now.;I can't believe I wasted a moment on this.;I'm boycotting this site from now on.;This is an affront to anyone seeking help.;I'm tempted to write a strongly-worded email to the author.;I've lost all faith in this source.;This is an epic failure.;I'm outraged by the lack of effort put into this.;I'm tearing my hair out in frustration.;This is beyond terrible. It's insulting.;I'm disgusted with the lack of professionalism.;I'm never coming back here again. Ever.;This is a disgrace.".split(";");
this.neutralThoughtfulPhrases="Consider all the possibilities.;Take your time and reflect.;It's worth pondering.;Let's approach this with an open mind.;Reflect on your choices.;Seek a balanced perspective.;Embrace the opportunity to learn.;What can we discover today?;Let's explore new horizons.;Balance is key in all things.;Let's find common ground.;Understanding leads to harmony.;A thoughtful approach is valuable.;What can we glean from this situation?;Patience can yield great insights.;Sometimes the journey is the reward.;Seek clarity in your thoughts.;What can we uncover together?;Consider the implications of your actions.;Stay curious and keep questioning.;A moment of reflection can make a difference.;Let's strive for empathy and understanding.;Every challenge presents an opportunity.;Thoughtful decisions lead to growth.;Sometimes it's okay not to have all the answers.;Empathy can bridge divides.;Seek to understand before being understood.;In uncertainty, there is room for growth.;Balance your thoughts with compassion.;What can we learn from each other?;Embrace the beauty of simplicity.;Mindfulness in action is a powerful tool.;Every problem has a solution waiting to be found.;Listen actively and speak with intent.;Thoughtfulness can foster meaningful connections.;See the world with fresh eyes each day.;A moment of reflection can lead to clarity.;In stillness, we can find answers.;Open your heart and mind to new ideas.;Seek harmony in your thoughts and actions.;Consider the perspectives of others.;What can we create together?;Challenge your assumptions with curiosity.;Embrace the power of a kind word.;Listen deeply, speak mindfully.;In understanding, there is strength.;Thoughtfulness can be a guiding light.;Let's approach this with empathy.;What can we achieve through collaboration?".split(";");
this.finalPhrases="Warm regards;With sincere appreciation;Yours truly;In appreciation;With gratitude;Sending good vibes;Wishing you well;With my best wishes;Sincerely yours;Take good care".split(";");this.internationalFirstNames="John Maria Mohammed Anna Yuki Carlos Luisa Hans Sophia Ahmed Elena Pablo Aisha Ravi Mia Yusuf Isabella Nina Javier Aya David Olga Andrei Sophie Sven Lucia Hiroshi Gabriela Abdul Lina Sebastian Yara Antonio Amina Luca Mei Rafael Elsa Omar Emma Johan Anika Federico Leila Giovanni Aiko Marta William".split(" ");
this.internationalLastNames="Smith Rodriguez Khan M\u00fcller Tanaka Gonz\u00e1lez Fernandez Schmidt Lee Ali Petrov Lopez Patel Gupta Anderson Ibrahim Ferrari Kowalski Nakamura Kim Ivanov Popov Dupont Nielsen Costa Sato Silva Rahman Garcia Fischer Souza Rossi Abdel-Malik Romano Chen Taylor Lindgren Martinez Rahman Russo Takahashi Rodriguez Johnson M\u00fcller Hassan Svensson".split(" ")}getRandomInteger(a,b){return Math.floor(Math.random()*(b-a+1)+a)}getRandomNormalInteger(a,b){let c=0;for(let e=
0;6>e;e++)c+=this.getRandomInteger(a,b);return Math.floor(c/6)}browseToNextPage(){let a=document.getElementsByTagName("a");if(0==a.length)history.back();else{var b=this.getRandomInteger(0,a.length-1);a[b].click()}}getRandomItem(a){return a[this.getRandomInteger(0,a.length-1)]}getRandomMessage(a){let b=[];.1>=Math.random()&&b.push(this.getRandomItem(this.neutralThoughtfulPhrases));for(let c=0;c<this.getRandomInteger(1,3);c++)b.push(this.getRandomItem(a));.1>=Math.random()&&b.push(this.getRandomItem(this.neutralThoughtfulPhrases));
b.push(this.getRandomItem(this.finalPhrases)+",");b.push(this.getRandomItem(this.internationalFirstNames));b.push(this.getRandomItem(this.internationalLastNames));return[{varName:"icap.action.message",parsibleValue:b.join(" ")}]}getDislikeMessage(){return this.getRandomMessage(this.dislikeMessages)}getLikeMessage(){return this.getRandomMessage(this.likeMessages)}getRandomEventName(a,b){const c=[];let e=0;for(var d in a)e+=a[d],c.push({eventName:d,eventRate:e});a=Math.random();for(d=0;d<c.length;d++)if(a<=
c[d].eventRate){b=c[d].eventName;break}return b}getArbitraryUserActionType(){return this.getRandomEventName(this.eventProbabilities,"normal")}simulateReadersActivities(){let a=0,b="";switch(this.getArbitraryUserActionType()){case "bounce":console.log("Bounce");a=this.getRandomInteger(this.bounceMin,this.bounceMax);break;case "like":console.log("Like");GLOBAL_ICAP_REPORTER.addActionMeasurement("LIKE");break;case "likeMessage":console.log("Like and a message");b=this.getLikeMessage();console.log(b[0].parsibleValue);
GLOBAL_ICAP_REPORTER.addActionMeasurement("LIKE",b);break;case "dislike":console.log("Dislike");GLOBAL_ICAP_REPORTER.addActionMeasurement("DISLIKE");break;case "dislikeMessage":console.log("Dislike and a message");b=this.getDislikeMessage();console.log(b[0].parsibleValue);GLOBAL_ICAP_REPORTER.addActionMeasurement("DISLIKE",b);break;case "stuck":console.log("Stuck");a=this.getRandomInteger(this.stuckMin,this.stuckMax);break;default:console.log("Normal")}0==a&&(a=this.getRandomNormalInteger(this.bounceMax,
this.stuckMin));console.log("Delay:",a,"sec.");setTimeout(()=>{this.browseToNextPage()},1E3*a)}run(){console.log("The iCAP test bot is here!");this.simulateReadersActivities()}}var GLOBAL_TESTBOT=new TestBot;GLOBAL_TESTBOT.run();
