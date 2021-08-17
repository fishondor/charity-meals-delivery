<template>
    <div>
        <div v-for='(amenity, index) in amenities' :key="index" class="amenities">
            <h3 class="text-h3 text-md-center text-right mb-5 ma-md-10">
                {{amenity.title}}
            </h3>
            <v-row class="amenities-content">
                <v-col
                    cols="12"
                    md="8"
                    xs="12">
                    <p class="text-h5">
                        <span v-if="amenity.text" v-html="amenity.text"></span>
                        <ul v-if="amenity.list">
                            <li v-for="(item, itemIndex) in amenity.list" :key="itemIndex" v-html="item">
                            </li>
                        </ul>
                    </p>
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                    xs="12">
                    <img class="mt-md-2" :src="amenity.image" />
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
    data: () => (
        {
            amenities: [
                {
                    title: 'על הפרוייקט',
                    image: require('../assets/delivery.jpg'),
                    text: `פרוייקט ארוחות שישי הוא פרוייקט התנדבותי שמורכב מצבא של מעל 150 מבשלות ומעשרות מחלקים אשר דואגים מידיי שבוע לחלוקת ארוחות שישי לבודדים ומשפחות מהיישוב הזקוקים לאוכל חם לסוף השבוע.<br> 
משפחות ובודדים, תושבי הישוב שללא הארוחה הזאת, ספק אם היה להם מה לאכול.<br> 
לאחרונה מספר המשפחות והבודדים גדל וכיום אנחנו עומדים על 20 ארוחות בכל שבוע.<br> 
ולכן, אנחנו זקוקים למתנדבים נוספים שיצטרפו לפרוייקט המקסים שלנו ויקחו חלק בחלוקת הארוחות.<br> 
מדובר על שעה התנדבות ביום שישי בין 10 ל11 בבוקר 
עושים איסוף של הארוחה מהמבשלות ביישוב ונוסעים לתת למשפחה.<br> 
יוצאים מהרכב רק פעם אחת.<br> 
כמה פשוט, ככה ממלא את הלב.<br> 
<a href="https://chat.whatsapp.com/FB4I0mE8upHHaJ6g94IqWN">בואו תצטרפו!</a>`
                },
                {
                    title: 'איך זה עובד',
                    image: require('../assets/pickup.jpg'),
                    list: [
                        `מצטרפים לקבוצת הווטסאפ <a href="https://chat.whatsapp.com/FB4I0mE8upHHaJ6g94IqWN">כאן</a>`,
                        `בכל שבוע מנהלת הקבוצה תפרסם קישור להרשמה לחלוקה של אותו שבוע`,
                        `נכנסים לקישור וממלאים פרטים נדרשים: טלפון, מספר מסירות שמסוגלים לבצע`,
                        `בהמשך מנהל הקבוצה ישבץ כל מחלק לאיסוף ומסירה`,
                        `הפרטים יתעדכנו ותוכלו לראות את מקומות האיסוף ומקום המסירה באותו קישור. כתובת וטלפון`,
                        `יוצאים בשעה שנקבעה (מנהלת הקבוצה תודיע). משך החלוקה אינו עולה על שעה בדרך כלל`
                    ]
                }
            ]
        }
    )
}
</script>

<style lang="scss" scoped>
.amenities {

    &:nth-child(even) .amenities-content{
        direction: ltr;

        * {
            direction: rtl;
        }

        ul {
            padding: 0 24px 0 0;
        }
    }
}
</style>