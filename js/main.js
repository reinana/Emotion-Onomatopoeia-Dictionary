class Word {
    constructor(word, definition, pictureUrl) {
        this.word = word;
        this.definition = definition;
        this.pictureUrl = pictureUrl;
    }

    // onomatopoeia のカード１枚を作成する
    generateCardHtml() {
        return `
            <div class="d-flex col-md-5 col-12 bg-white px-0 my-2">
                <div class="col-8">
                    <h4 class="pt-3">${this.word}</h4>
                    <p class="pt-2">${this.definition}</p>
                </div>
                <div class="d-flex justify-content-center align-items-center col-4 px-0">
                    <img class="imgFit col-12 p-1" src="${this.pictureUrl}" alt="Image of ${this.word}">
                </div>
            </div>`;
    }
}

class EmotionObject {
    constructor(emotion, description, color, emoji, onomatopoeia) {
        this.emotion = emotion;
        this.description = description;
        this.color = color;
        this.emoji = emoji;
        this.onomatopoeia = onomatopoeia;
    }
    
    // 感情のすべての擬音語のWordオブジェクトの配列を返します。 （要件で指定されている関数）
    getOnomatopoeiaWords() {
        return this.onomatopoeia.map(onomatope => new Word(onomatope, dictionary[onomatope], pictureDictionary[onomatope]));
    }
    
    // （要件で指定されている関数）
    // コンテナのHTMLを文字列を返します。
    // このコンテナの背景は感情の色で、コンテナの上部には、感情と感情の説明が表示されています。
    // 次にこの感情の各擬音語とその定義、画像を含んだカードが表示されます。
    getHtmlContainerString() {
        // オノマトペの配列
        const onomatopoeiaWords = this.getOnomatopoeiaWords();
        // 感情が持っているオノマトペのカードのHTML
        const cardsHtml = onomatopoeiaWords.map(word => word.generateCardHtml()).join("");
        // 感情ごとのいろ
        return `
            <div id="${this.emotion}" class="bg-${this.color}">
                <div class="container py-3">
                    <div class="p-3 text-white">
                        <h2>${this.emotion.toUpperCase()}</h2>
                        <p>${this.description}</p>
                    </div>
                    <div class="d-flex justify-content-between flex-wrap">
                    ${cardsHtml}
                    </div>
                </div>
            </div>`;
    }
    
}

class EmotionUIBuilder {
    // HTML要素を生成してtargetに追加する共通のメソッド
    static updateTargetHtml(emotionObjectList, renderFunction, containerClass = '') {
        // htmlの作成
        const htmlString = emotionObjectList.map(renderFunction).join("");

        // 外枠が必要な場合は作る
        const container = document.createElement('div');
        if (containerClass) container.className = containerClass;
        container.innerHTML = htmlString;

        // target に追加
        target.appendChild(container);
    }


    // categoryセクションを作る
    static generateCategoryElements(emotionObjectList) {
        // コールバック
        const renderCategory = (emotion, index) => 
        `
            <div class="col-12 col-md-6 col-lg-3 p-4 m-4 text-center text-white bg-${emotion.color}">
                <a href="#sec${index}" class="text-decoration-none">
                <h3>${emotion.emotion.toUpperCase()}</h3>
                <p class="emoji">${emotion.emoji}</p>
                <p>${emotion.description}</p>
                </a>
            </div>
        `;
        // targetに追加
        this.updateTargetHtml(emotionObjectList, renderCategory, "container d-flex justify-content-center flex-wrap");
    
    }

    // onomatopoeia セクションを作る
    static generateOnomatopoeiaElements(emotionObjectList) {
        // コールバック
        const renderOnomatopoeia = (emotion, index) => `<div id="sec${index}">${emotion.getHtmlContainerString()}</div>`;
        // targetに追加する
        this.updateTargetHtml(emotionObjectList, renderOnomatopoeia);
    }
}

//グローバル定数
const dictionary = {
    bark: "the sound made by a dog",
    grunt: "issue a low, animal-like noise",
    roar: "make a loud noise, as of an animal",
    whack: "the act of hitting vigorously",
    smack: "a blow from a flat object (as an open hand)",
    hiss: `make a sharp, elongated "s" sound`,
    ahem: "the utterance of a sound similar to clearing the throat",
    bawl: "cry loudly",
    bling: "flashy, ostentatious jewelry",
    boom: "a deep prolonged loud noise",
    buzz: "the sound of rapid vibration",
    caw: "utter a cry, characteristic of crows, rooks, or ravens",
    chatter: "talk socially without exchanging too much information",
    chant: "a repetitive song in which syllables are assigned to a tone",
    clatter: "a continuous rattling sound as of hard objects falling or striking each other.",
    clunk: "a heavy dull sound (as made by impact of heavy objects)",
    crawl: "move forward on the hands and knees or by dragging the body close to the ground.",
    flick: "throw or toss with a quick motion",
    giggle: "a light, silly laugh.",
    gargle: "an act or instance or the sound of washing one's mouth and throat with a liquid kept in motion by exhaling through it.",
    honk: "the cry of a goose or any loud sound resembling it",
    oink: "the short low gruff noise of the kind made by hogs",
    whine: "a complaint uttered in a plaintive way",
    waah: "sound made when crying by babies",
    zing: "sound my by something energetic",
};

const pictureDictionary = {
    bark: "https://cdn.pixabay.com/photo/2013/07/25/11/59/german-shepherd-166972_1280.jpg",
    grunt: "https://cdn.pixabay.com/photo/2023/08/03/00/03/lion-8166054_1280.jpg",
    roar: "https://cdn.pixabay.com/photo/2018/04/13/21/24/lion-3317670_1280.jpg",
    whack: "https://cdn.pixabay.com/photo/2017/10/27/11/49/boxer-2894025_1280.jpg",
    smack: "https://cdn.pixabay.com/photo/2015/03/20/19/38/hammer-682767_1280.jpg",
    hiss: "https://cdn.pixabay.com/photo/2016/10/13/23/30/cat-1739091_1280.jpg",
    ahem: "https://cdn.pixabay.com/photo/2014/03/13/10/12/man-286476_1280.jpg",
    bawl: "https://cdn.pixabay.com/photo/2015/06/26/10/17/smiley-822365_960_720.jpg",
    bling: "https://cdn.pixabay.com/photo/2017/12/30/13/37/happy-new-year-3050088_1280.jpg",
    boom: "https://cdn.pixabay.com/photo/2016/04/12/21/17/explosion-1325471_1280.jpg",
    buzz: "https://cdn.pixabay.com/photo/2020/02/13/10/29/bees-4845211_1280.jpg",
    caw: "https://cdn.pixabay.com/photo/2017/02/16/11/13/bird-2071185_1280.jpg",
    chatter: "https://cdn.pixabay.com/photo/2018/04/01/20/31/ducks-3282053_1280.jpg",
    chant: "https://cdn.pixabay.com/photo/2017/08/23/09/58/birds-2672101_1280.jpg",
    clatter: "https://cdn.pixabay.com/photo/2020/02/06/19/01/clutter-4825256_1280.jpg",
    clunk: "https://cdn.pixabay.com/photo/2017/01/10/03/06/steel-1968194_1280.jpg",
    crawl: "https://cdn.pixabay.com/photo/2014/01/10/00/40/fright-241435_1280.jpg",
    flick: "https://cdn.pixabay.com/photo/2012/02/23/08/48/disgust-15793_1280.jpg",
    giggle: "https://cdn.pixabay.com/photo/2017/08/07/15/18/people-2604850_1280.jpg",
    gargle: "https://cdn.pixabay.com/photo/2017/04/03/16/32/girl-smoke-cigarette-2198839_1280.jpg",
    honk: "https://cdn.pixabay.com/photo/2017/02/28/14/37/geese-2105918_1280.jpg",
    oink: "https://cdn.pixabay.com/photo/2019/03/02/15/32/pig-4030013_1280.jpg",
    whine: "https://cdn.pixabay.com/photo/2020/05/01/01/57/girl-5115192_960_720.jpg",
    waah: "https://cdn.pixabay.com/photo/2017/01/18/02/18/emotions-1988745_1280.jpg",
    zing: "https://cdn.pixabay.com/photo/2017/09/14/16/38/fiber-optic-2749588_1280.jpg",
};

const emotions = [
    new EmotionObject("angry", "feeling or showing strong annoyance, displeasure, or hostility; full of anger.", "red", "😠", ["bark", "grunt", "roar", "whack", "smack", "hiss"]),
    new EmotionObject("happy","feeling or showing pleasure or contentment.","pink","🥳",["bling", "chatter", "chant", "giggle"]),
    new EmotionObject("bad","not such as to be hoped for or desired; unpleasant or unwelcome.","lightblue","😰",["ahem", "clatter", "clunk"]),
    new EmotionObject("sad","feeling or showing sorrow; unhappy.","grey","🥺",["bawl", "whine", "waah"]),
    new EmotionObject("surprised","to feel mild astonishment or shock.","purple","😲",["boom", "honk", "zing"]),
    new EmotionObject("fearful","feeling afraid, showing fear or anxiety.","green","😖",["buzz", "caw", "crawl"]),
    new EmotionObject("disgusted","feeling or showing strong annoyance, displeasure, or hostility; full of anger.","orange","😒",["flick", "gargle", "oink"])
];

const target = document.getElementById("target");
EmotionUIBuilder.generateCategoryElements(emotions);
EmotionUIBuilder.generateOnomatopoeiaElements(emotions);
