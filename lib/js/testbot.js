class TestBot {

    constructor() {

        this.context = this.detectMetaValues();
        this.context.country = undefined;
        this.context.lang = this.detectLang();
        
        this.actionSettings = {};
        this.rules = [];
        this.likeMessages = [];
        this.dislikeMessages = [];
        this.neutralThoughtfulPhrases = [];
        this.finalPhrases = [];
        this.internationalFirstNames = [];
        this.internationalLastNames = [];  
    }

    detectCountryAndProceed() {

        const me = this;

        fetch("https://api.country.is").then(
            (response) => {
                return response.json();
            }
        ).then(
            (response) => {
                this.context.country = response.country; 
            }
        ).catch(
            (error) => {
                this.context.country = undefined; 
            }
        ).finally(
            () => {
                me.simulateReadersActivities();
            } 
        );
    }

    detectLang() {

        let lang = undefined;

        const htmlElements = document.querySelectorAll('html');
        const rawLang = htmlElements[0].getAttribute("lang")
        lang = !!rawLang ? rawLang : "en";
        
        return lang;
    }

    detectMetaValues() {
        const metaElements = document.querySelectorAll('meta');
        const metaObject = {};
      
        metaElements.forEach((meta) => {
          const name = meta.getAttribute('name');
          const content = meta.getAttribute('content');
      
          if (name && content) {
            metaObject[name] = content;
          }
        });
    
        return metaObject;
    }

    getContext() {
        return this.context;
    }

    getScriptURL() {
        return this.context["testbot.testdata.script"];
    }

    isStrict(key) {
        let strKey = String(key);
        let strictFlag = strKey.endsWith(".id") || 
                         strKey.endsWith(".uid") || 
                         strKey.endsWith(".oid") || 
                         strKey.endsWith("verno") || 
                         strKey.endsWith("datetime");
        return strictFlag; 
    }

    normalizeString(s) {
        return String(s).toUpperCase();
    }

    matchContextProp(key, context, trigger) {

        if(!context.hasOwnProperty(key)) return false;

        if(this.isStrict(key)) return context[key] == trigger[key];
        
        return this.normalizeString(context[key]).indexOf(this.normalizeString(trigger[key])) != -1;
    }

    matchContext(context, trigger) {
        
        let matchCount = 0;

        if(!trigger) return 0;

        for(const key in trigger) {

            if(!this.matchContextProp(key, context, trigger)) 
                return 0;

            matchCount++;
        }
        
        return matchCount;
    }

    getDefaultResponse() {

        let defaultResponse = {
            "issue_probabilities": {
                "bounce": 0.5,
                "like": 0.01,
                "likeMessage": 0.001,
                "dislike": 0.05,
                "dislikeMessage": 0.005,
                "stuck": 0.1
            },
            "link_appeal_rates": []
        }

        for(const rule of this.rules)
            if(!rule.trigger) {
                defaultResponse = rule.response;
                break;
            }

        return defaultResponse;
    }

    chooseResponse(context) {
        
        let response = this.getDefaultResponse();
        let maxContextMatchCount = 0;
        
        for(const rule of this.rules) {

            let contentMatchCount = this.matchContext(context, rule.trigger);

            if(contentMatchCount > maxContextMatchCount) {
                maxContextMatchCount = contentMatchCount;
                response = rule.response;
            }
        }

        return response;
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

    evaluateAppealRate(link) {

        let rate = 1;

        const defaultResponse = this.getDefaultResponse();

        let url = String(link.getAttribute("href")).toLowerCase();
        let wording = String(link.textContext).toLowerCase();
                
        for(const appeal_rate of defaultResponse.link_appeal_rates)
            if(url.indexOf(appeal_rate.pattern) != -1 || wording.indexOf(appeal_rate.pattern) != -1) {
                rate = appeal_rate.rate;
                break;
            }

        return rate;
    }

    browseToNextPage() {

        let allLinks = document.getElementsByTagName('a');

        if(allLinks.length == 0) {
            history.back();
            return;
        }

        const levels = [];
        let level = 0;
        for(let linkIdx = 0; linkIdx < allLinks.length; linkIdx++) {
            level += this.evaluateAppealRate(allLinks[linkIdx])
            levels[linkIdx] = level;
        }

        let nextPageLink = null;

        let bone = Math.random()*level;

        for(let linkIdx = 0;  linkIdx < allLinks.length; linkIdx++)
            if(bone < levels[linkIdx]) {
                nextPageLink = allLinks[linkIdx];
                break;
            }

        if(!!nextPageLink) 
            nextPageLink.click();    
    }

    getRandomItem(arr) {
        return arr[this.getRandomInteger(0, arr.length - 1)];
    }

    getLocalMessages(i18nMessages, langCode=undefined) {
        const actualLangCode = langCode ? langCode : this.detectLang();
        return i18nMessages[actualLangCode] ? i18nMessages[actualLangCode] : i18nMessages["en"];
    }

    getRandomMessage(messages) {

        let phrases = [];

        if(Math.random() <= 0.1)
            phrases.push(this.getRandomItem(this.getLocalMessages(this.neutralThoughtfulPhrases)));

        for(let count = 0; count < this.getRandomInteger(1, 3); count++)
            phrases.push(this.getRandomItem(this.getLocalMessages(messages)));

        if(Math.random() <= 0.1)
            phrases.push(this.getRandomItem(this.getLocalMessages(this.neutralThoughtfulPhrases)));

        phrases.push(this.getRandomItem(this.getLocalMessages(this.finalPhrases)) + ",");
        phrases.push(this.getRandomItem(this.getLocalMessages(this.internationalFirstNames)));
        phrases.push(this.getRandomItem(this.getLocalMessages(this.internationalLastNames)));
        
        let msgText = phrases.join(" ");

        let msg = [{
            "varname": "icap.action.message",
            "parsable_value": msgText
        }];

        return msg;
    }

    getDislikeMessage() {
        return this.getRandomMessage(this.dislikeMessages);
    }

    getLikeMessage() {
        return this.getRandomMessage(this.likeMessages);
    }

    getRandomEventName(issueProbabilities, defaultEventName) {
        
        let targetEventName = defaultEventName;

        const events = [];

        let acc = 0;
        for(let eventName in issueProbabilities) {
            acc += issueProbabilities[eventName];
            events.push({"eventName": eventName, "eventRate": acc});
        }

        const bone = Math.random();

        for(let eventIdx = 0; eventIdx < events.length; eventIdx++)
            if(bone <= events[eventIdx].eventRate) {
                targetEventName = events[eventIdx].eventName;
                break;
            } 

        return targetEventName;
    }

    getArbitraryUserActionType(issueProbabilities) {
        return this.getRandomEventName(issueProbabilities, "normal");
    }

    simulateReadersActivities() {

        const context = this.getContext();
        const response = this.chooseResponse(context);

        console.table(context)
        console.table(response.issue_probabilities)

        let randomTime = 0;

        let userActionType = this.getArbitraryUserActionType(response.issue_probabilities);
        let msg = "";

        switch(userActionType) {
            case "bounce": 
                console.log("Bounce");
                randomTime = this.getRandomInteger(this.actionSettings.bounce_min, this.actionSettings.bounce_max);
                break;
            case "like": 
                console.log("Like");
                GLOBAL_ICAP_REPORTER.addActionMeasurement("LIKE");
                break;
            case "likeMessage":
                console.log("Like and a message");
                msg = this.getLikeMessage();
                console.log(msg[0].parsable_value);
                GLOBAL_ICAP_REPORTER.addActionMeasurement("LIKE", msg);
                break;
            case "dislike":
                console.log("Dislike");
                GLOBAL_ICAP_REPORTER.addActionMeasurement("DISLIKE");
                break;
            case "dislikeMessage":
                console.log("Dislike and a message");
                msg = this.getDislikeMessage()
                console.log(msg[0].parsable_value);
                GLOBAL_ICAP_REPORTER.addActionMeasurement("DISLIKE", msg);
                break;
            case "stuck":
                console.log("Stuck");
                randomTime = this.getRandomInteger(this.actionSettings.stuck_min, this.actionSettings.stuck_max);
                break;
            default:
                console.log("Normal");
        }
        
        // Finally, go to a new page
        if(randomTime == 0)
            randomTime = this.getRandomNormalInteger(this.actionSettings.bounce_max, this.actionSettings.stuck_min);

        console.log("Delay:", randomTime, "sec.");

        setTimeout(() => {this.browseToNextPage()}, randomTime*1000);
    }

    loadScriptAndProceed() {
        console.log("Loading...");
        const scriptUrl = this.getScriptURL();
        
        fetch(scriptUrl).then(
            (response) => {
                return response.json();
            }
        ).then(
            (response) => {

                this.actionSettings = response["action_settings"];
                this.rules = response["rules"];
                this.likeMessages = response["like_messages"];
                this.dislikeMessages = response["dislike_messages"];
                this.neutralThoughtfulPhrases = response["neutral_thoughtful_phrases"];
                this.finalPhrases = response["final_phrases"];
                this.internationalFirstNames = response["international_first_names"];
                this.internationalLastNames = response["international_last_names"]; 

                this.detectCountryAndProceed()
            }
        ).catch(
            (error) => {
                console.log();
            }
        );
    }

    run() {
        console.log("The iCAP test bot is here!")
        this.loadScriptAndProceed();
    }
}


var GLOBAL_TESTBOT = new TestBot()

GLOBAL_TESTBOT.run()