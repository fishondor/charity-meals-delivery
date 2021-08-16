const descriptions = ['משפחה 10 נפשות','משפחה 4 נפשות','משפחה 6 נפשות - קניות בלבד','משפחה 3 נפשות','בודד','זוג']
const foodDescriptions = [ 'דגים אורז',
'עוגה ',
'קוסקוס מרק ירקות ועוףחלה',
'מנה בשרית ותוספת - של ענת ',
'5 חלות',
'עוף וספגטי',
'עוגה ',
'אורזקציצות2 חלותשתיה',
'פרגיתאורזפתיתים עוגה',
'חלה',
'עוףקוסקוס',
'אורזעוגהחלות',
'עוף בתנור',
'פרגיותספגטיירקות',
'קניות+ קניות של כרמלה ',
'2 חלות2 שתייה ',
'קציצותפתיתיםאפונה וגזרחלהעוגה',
'עוגה ',
'אורז עם בשרקציצות עוף',
'חלה ',
'עוף בתנוראורז חלות',
'תבשיל בשראפונה תפואאורזשתייה ',
'עוגה ',
'קוסקוסאורז ' ]

const addresses = [ 'הירקון 12א',
'חנייה ביס צאלון ',
'אהוד מנור 8',
'אפרים קישון 5 מרכז מסחרי ',
'הגולן 34',
'הגולן 54 ב',
'חנייה ביס צאלון ',
'הגולן 62',
'הירקון 54',
'ספיר 6',
'טופז 7',
'האתרוג 5',
'ספיר 46',
'תגיע אליך ',
'חבצלת 4',
'גן אלון - אהוד מנור 66',
'ספיר 24',
'חנייה ביס צאלון ',
'הירקון 44 ב',
'טופז 23',
'האיריס 83',
'גן נקר - ליכטנשטיין 44',
'חנייה ביס צאלון ',
'בעל הנס 4' ]

function gfg7() {
    var minm = 1000000;
    var maxm = 9999999;
    return Math.floor(Math
    .random() * (maxm - minm + 1)) + minm;
}

function gfg3() {
    var minm = 100;
    var maxm = 999;
    return Math.floor(Math
    .random() * (maxm - minm + 1)) + minm;
}

function selectRandomItem(array){
    return array[Math.floor(Math.random() * array.length)]
}

const generateMock = (count) => {
    var mockArray = []
    for(let i = 0; i < count; i++) {
        let pickupsNumber = Math.floor(Math.random() * 5);
        let pickups = []
        for(let z = 0; z <= pickupsNumber; z++) {
            let pickup = {
                phone: gfg3() + "-" + gfg7(),
                address: selectRandomItem(addresses),
                description: selectRandomItem(foodDescriptions),
                name: "מבשל" + gfg3()
            }
            pickups.push(pickup)
        }
        let deliveryGroup = {
            description: selectRandomItem(descriptions),
            index: i + 1,
            pickups: pickups
        }
    
        mockArray.push(deliveryGroup)
    }
    return mockArray
}

module.exports = generateMock

var myArgs = process.argv.slice(2);
if(myArgs[0] && !isNaN(parseInt(myArgs[0])))
    console.log('Mock', JSON.stringify(createMock(myArgs[0])))