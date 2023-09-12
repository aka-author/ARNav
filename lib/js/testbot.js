
class TestBot {

    constructor() {

        this.bounceMin = 1;
        this.bounceMax = 3;
        this.stuckMin  = 60*5;
        this.stuckMax  = 60*10

        this.eventProbabilities = {
            "bounce":           .5,
            "like":             .01,
            "likeMessage":      .001,
            "dislike":          .05,
            "dislikeMessage":   .005,
            "stuck":            .1
        };

        this.likeMessages = [
            "This guide is incredibly informative!",
            "Thank you for making this resource available.",
            "I finally understand this topic thanks to this help page!",
            "Your assistance is greatly appreciated.",
            "I'm so grateful for this detailed explanation.",
            "You've saved me hours of frustration. Thank you!",
            "This is a lifesaver!",
            "Kudos to the author for such a well-written guide.",
            "I can't believe how much I've learned from this help topic.",
            "This has cleared up so many of my questions.",
            "I'm impressed by the quality of this content.",
            "I wish I had found this sooner.",
            "This is a fantastic resource for beginners.",
            "The step-by-step instructions are a game-changer.",
            "I'm feeling much more confident now, thanks to this help page.",
            "I'll be recommending this to my friends and colleagues.",
            "I can't thank you enough for this help article.",
            "I appreciate the effort put into creating this guide.",
            "This has been a tremendous help. Thank you!",
            "I never thought I'd grasp this topic, but your help made it possible.",
            "I'm genuinely impressed by the level of detail provided here.",
            "This is exactly what I needed to solve my problem.",
            "I love how user-friendly this guide is.",
            "This has made my day. Thank you!",
            "I feel like I've unlocked a new skill thanks to this help article.",
            "I'm thrilled to have stumbled upon this resource.",
            "This is an invaluable source of information.",
            "I'm grateful for the clarity of this explanation.",
            "I'm blown away by how helpful this is.",
            "I can't express how thankful I am for this guide.",
            "This is pure gold. Thank you!",
            "I can't stop raving about this to my friends.",
            "I'm giving this a 5-star rating!",
            "This should be the top result for anyone searching on this topic.",
            "I'm so glad I found this. It's a game-changer.",
            "I've bookmarked this page for future reference.",
            "I wish I could shake the hand of the person who created this.",
            "I feel so much more confident after reading this.",
            "I'm recommending this to everyone I know.",
            "This is exactly what I was looking for. Thank you!",
            "I've been searching for help on this topic, and this is the best I've found.",
            "This has exceeded my expectations. Well done!",
            "I can't believe how much easier this makes things.",
            "This is a fantastic resource for learners.",
            "I've been struggling with this, and now it all makes sense.",
            "I've shared this with my entire team. It's that good.",
            "I can't thank you enough for this amazing guide.",
            "This has answered all my questions. I'm thrilled!",
            "I'm walking away from this with a smile on my face.",
            "I feel so much more knowledgeable after reading this.",
            "This deserves all the praise it gets. Outstanding!",
            "I've been searching for a while, and this is the best help page by far."
        ];

        this.dislikeMessages = [
            "This guide is terrible!",
            "I expected better from this resource.",
            "Waste of time!",
            "This didn't help me at all.",
            "I'm extremely disappointed.",
            "I regret clicking on this page.",
            "This is a complete letdown.",
            "I can't believe how unhelpful this is.",
            "This is a joke!",
            "I wouldn't recommend this to anyone.",
            "I feel like I've been misled.",
            "This is a waste of digital space.",
            "I'd give this zero stars if I could.",
            "I want my time back after reading this.",
            "I'm furious with the quality of this content.",
            "I'm never visiting this site again.",
            "I expected so much more.",
            "This is just plain awful.",
            "I'm seething with anger over this.",
            "This is an insult to my intelligence.",
            "I demand a refund for the time I wasted here.",
            "This is the worst help article I've ever read.",
            "I can't believe someone wrote this garbage.",
            "I'm absolutely livid!",
            "I want to speak to the person responsible for this mess.",
            "I've seen better help pages from a toddler.",
            "This is an abomination.",
            "I hope no one else falls for this nonsense.",
            "This makes me want to scream in frustration.",
            "I'm offended by the lack of quality here.",
            "I'm considering legal action for wasting my time.",
            "I can't even express how much I dislike this.",
            "I'm disgusted with this resource.",
            "This is pure incompetence.",
            "I'm shaking my head at how bad this is.",
            "I'm fuming with rage right now.",
            "I can't believe I wasted a moment on this.",
            "I'm boycotting this site from now on.",
            "This is an affront to anyone seeking help.",
            "I'm tempted to write a strongly-worded email to the author.",
            "I've lost all faith in this source.",
            "This is an epic failure.",
            "I'm outraged by the lack of effort put into this.",
            "I'm tearing my hair out in frustration.",
            "This is beyond terrible. It's insulting.",
            "I'm disgusted with the lack of professionalism.",
            "I'm never coming back here again. Ever.",
            "This is a disgrace."
          ];
    }

    getRandomInteger(min, max) {
        return Math.floor(Math.random()*(max - min + 1) + min);
    }

    getRandomNormalInteger(min, max) {

        let total = 0;

        for(let i = 0; i < 6; i++)
            total += this.getRandomInteger(min, max);

        return  Math.floor(total/6);
    }


    browseToNextPage() {

        let allLinks = document.getElementsByTagName('a');

        if(allLinks.length == 0) {
            history.back();
            return;
        }

        let randomNum = this.getRandomInteger(0, allLinks.length - 1);
        allLinks[randomNum].click();    
    }

    getRandomMessage(messages) {

        let msg = [{
            "varName": "icap.action.message",
            "parsibleValue": messages[this.getRandomInteger(0, messages.length - 1)]
        }];

        return msg;
    }

    getDislikeMessage() {
        return getRandomMessage(this.dislikeMessages);
    }

    getLikeMessage() {
        return getRandomMessage(this.likeMessages);
    }

    getRandomEventName(probabilities, defaultEventName) {
        // Calculate the sum of probabilities
        const totalProbability = Object.values(probabilities).reduce(
          (acc, probability) => acc + probability,
          0
        );
      
        // Generate a random number between 0 and 1
        const randomValue = Math.random();
      
        // Check if the sum of probabilities is less than 1
        if (totalProbability < 1) {
          // Calculate the probability of the default event
          const defaultProbability = 1 - totalProbability;
      
          // Check if the random value falls within the default event probability
          if (randomValue <= defaultProbability) {
            return defaultEventName;
          }
        }
      
        // Calculate the cumulative probabilities for each event
        let cumulativeProbability = 0;
        for (const eventName in probabilities) {
          cumulativeProbability += probabilities[eventName];
          if (randomValue <= cumulativeProbability) {
            return eventName;
          }
        }
      
        // Default case (shouldn't normally be reached)
        return defaultEventName;
    }

    getArbitraryUserActionType() {
        return this.getRandomEventName(this.eventProbabilities, "normal");
    }

    simulateReadersActivities() {

        let randomTime = 0;

        let userActionType = this.getArbitraryUserActionType();

        switch(userActionType) {
            case "bounce": 
                console.log("Bounce");
                randomTime = this.getRandomInteger(this.bounceMin, this.bounceMax);
                break;
            case "like": 
                console.log("Like");
                GLOBAL_ICAP_REPORTER.addActionMeasurement("LIKE", msg);
                break;
            case "likeMessage":
                console.log("Like and a message");
                GLOBAL_ICAP_REPORTER.addActionMeasurement("LIKE", this.getLikeMessage());
                break;
            case "Dislike":
                console.log("Dislike");
                GLOBAL_ICAP_REPORTER.addActionMeasurement("DISLIKE");
                break;
            case "dislikeMessage":
                console.log("Dislike and a message");
                GLOBAL_ICAP_REPORTER.addActionMeasurement("DISLIKE", this.getDislikeMessage());
                break;
            case "stuck":
                console.log("Stuck");
                randomTime = this.getRandomInteger(this.stuckMin, this.stuckMax);
                break;
            default:
                console.log("Normal");
                randomTime = this.getRandomNormalInteger(this.bounceMax, this.stuckMin);
        }
        
        // Finally, go to a new page
        console.log("Delay:", randomTime, "sec.");
        setTimeout(() => {this.browseToNextPage()}, randomTime*1000);
    }

    run() {
        console.log("The iCAP test bot is here!")
        this.simulateReadersActivities();
    }
}


var GLOBAL_TESTBOT = new TestBot()

GLOBAL_TESTBOT.run()