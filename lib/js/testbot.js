
class TestBot {

    constructor() {

    }

    //returns a random integer from min to max inclusive
    getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    browseToNextPage() {

        let allLinks = document.getElementsByTagName('a');
        let randomNum = this.getRandomInteger(0, allLinks.length - 1);

        if (allLinks.length > 0) {
            let randomNum = this.getRandomInteger(0, allLinks.length - 1);
            allLinks[randomNum].click();
        } else {
            history.back();
        }
            
    }

    getDislikeMessage() {
        const messageMap = new Map([
            [1, "Why don't I see cat photos here?!"],
            [2, "This page looks terrible."],
            [3, "I did not want this page."],
            [4, "I am so confused!"],
            [5, "This isn't what I wanted."]
        ]);

        let randMessage = messageMap.get(this.getRandomInteger(1, messageMap.size));

        let msg = [{
            "varName": "icap.action.message",
            "parsibleValue": randMessage
        }];
        return msg;
    }

    getLikeMessage() {
        const messageMap = new Map([
            [1, "This looks really good!"],
            [2, "This was exactly what I was looking for."],
            [3, "This is super helpful!"],
            [4, "Thanks!"],
            [5, "I like this page."]
        ]);

        let randMessage = messageMap.get(this.getRandomInteger(1, messageMap.size));

        let msg = [{
            "varName": "icap.action.message",
            "parsibleValue": randMessage
        }];
        return msg;
    }

    simulateReadersActivities() {
        
        //50% chance to bounce
        if (Math.random() < .5) {
            //simulate a 'bounce' and leave the page after 1-3 seconds
            console.log("bounced");
            let randomTime = this.getRandomInteger(1, 3) * 1000;
            setTimeout(() => { this.browseToNextPage() }, randomTime);
            return;
        }

        //10% chance to dislike a page
        if (Math.random() < 0.1) {
            //10% chance to leave a message when disliking
            if (Math.random() < 0.1) {
                let msg = this.getDislikeMessage();
                GLOBAL_ICAP_REPORTER.addActionMeasurement("DISLIKE", msg);
            }
            else
                GLOBAL_ICAP_REPORTER.addActionMeasurement("DISLIKE");
            console.log("disliked");
            GLOBAL_ICAP_REPORTER.commitMeasurements();
        } else if (Math.random() < 0.1) {
            //10% chance to like a page if it wasn't disliked
            //10% chance to leave a message when liking
            if (Math.random() < 0.1) {
                let msg = this.getLikeMessage();
                GLOBAL_ICAP_REPORTER.addActionMeasurement("LIKE", msg);
            }
            else
                GLOBAL_ICAP_REPORTER.addActionMeasurement("LIKE");
            console.log("liked");
            GLOBAL_ICAP_REPORTER.commitMeasurements();
        }

        //5% chance of being stuck
        if (Math.random() < .05) {
            console.log("stuck");
            let randomTime = this.getRandomInteger(5, 7) * 60000;
            setTimeout(() => { this.browseToNextPage() }, randomTime);
            return;
        }

        //finally, go to new page
        console.log("new page");
        let randomTime = this.getRandomInteger(1, 3) * 1000;
        setTimeout(() => { this.browseToNextPage() }, randomTime);
        
    }

    run() {

        console.log("The iCAP testbot is here!")
        this.simulateReadersActivities();

    }
    

}


var GLOBAL_TESTBOT = new TestBot()

GLOBAL_TESTBOT.run()