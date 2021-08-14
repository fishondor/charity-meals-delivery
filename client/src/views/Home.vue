<template>
    <div>
        <Hero />
        <v-container class="amenities">
            <h3 class="text-h3 text-center ma-10">
                על הפרוייקט
            </h3>
            <v-row>
                <v-col
                    cols="12"
                    md="8"
                    xs="12">
                    <p class="text-h5">
                        פרוייקט ארוחות שישי הוא פרוייקט התנדבותי שמורכב מצבא של מעל 150 מבשלות ומעשרות מחלקים אשר דואגים מידיי שבוע לחלוקת ארוחות שישי לבודדים ומשפחות מהיישוב הזקוקים לאוכל חם לסוף השבוע. 
משפחות ובודדים, תושבי הישוב שללא הארוחה הזאת, ספק אם היה להם מה לאכול. 
לאחרונה מספר המשפחות והבודדים גדל וכיום אנחנו עומדים על 20 ארוחות בכל שבוע. 
ולכן, אנחנו זקוקים למתנדבים נוספים שיצטרפו לפרוייקט המקסים שלנו ויקחו חלק בחלוקת הארוחות. 
מדובר על שעה התנדבות ביום שישי בין 10 ל11 בבוקר 
עושים איסוף של הארוחה מהמבשלות ביישוב ונוסעים לתת למשפחה. 
יוצאים מהרכב רק פעם אחת. 
כמה פשוט, ככה ממלא את הלב. 
בואו תצטרפו! 
                    </p>
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                    xs="12">
                    <img src="@/assets/delivery.jpg" />
                </v-col>
            </v-row>
        </v-container>
        <v-container class="amenities">
            <h3 class="text-h3 text-center ma-10">
                איך זה עובד
            </h3>
            <v-row>
                <v-col
                    cols="12"
                    md="4"
                    xs="12">
                    <img src="@/assets/pickup.jpg" />
                </v-col>
                <v-col
                    cols="12"
                    md="8"
                    xs="12">
                    <p class="text-h5 pa-5">
                        <ul>
                            <li>
                                מצטרפים לקבוצת הווטסאפ <a href="https://chat.whatsapp.com/FB4I0mE8upHHaJ6g94IqWN">כאן</a>
                            </li>
                            <li>
                                בכל שבוע מנהלת הקבוצה תפרסם קישור להרשמה לחלוקה של אותו שבוע
                            </li>
                            <li>
                                נכנסים לקישור וממלאים פרטים נדרשים: טלפון, מספר מסירות שמסוגלים לבצע
                            </li>
                            <li>
                                בהמשך מנהל הקבוצה ישבץ כל מחלק לאיסוף ומסירה 
                            </li>
                            <li>
                                הפרטים יתעדכנו ותוכלו לראות את מקומות האיסוף ומקום המסירה באותו קישור. כתובת וטלפון
                            </li>
                            <li>
                                יוצאים בשעה שנקבעה (מנהלת הקבוצה תודיע). משך החלוקה אינו עולה מעל שעה בדרך כלל
                            </li>
                        </ul>
                    </p>
                </v-col>
            </v-row>
        </v-container>
        <v-container fluid>
            <img src="@/assets/multiple_carriers.jpg" />
        </v-container>
        <v-container>
            <p class="attribution">This website uses image from:
                <ul>
                    <li>
        <a href="https://www.vecteezy.com/free-vector/supporting">Supporting Vectors by Vecteezy</a></li>
                    <li>
        <a href="https://www.vecteezy.com/free-vector/cartoon">Cartoon Vectors by Vecteezy</a></li>
                    <li>
        <a href="https://75.2.80.54/free-vector/holiday">Holiday Vectors by Vecteezy</a></li>
                    <li>
        <a href="https://www.vecteezy.com/free-vector/food-charity">Food Charity Vectors by Vecteezy</a></li>
                    <li>
        <a href="https://www.vecteezy.com/free-vector/box">Box Vectors by Vecteezy</a></li>
                    <li>
        <a href="https://www.vecteezy.com/free-vector/food-donation">Food Donation Vectors by Vecteezy</a></li>
                </ul>
            </p>
        </v-container>
    </div>
</template>

<script>
export default {
    components: {
        Hero: () => import('../components/Hero')
    }
}
</script>

<style lang="scss" scoped>
img {
    max-width: 100%;
    border-radius: 5px; 
}
.attribution {
    direction: ltr;
    font-size: 8px;

    ul {
        padding: 0;

        li {
            display: inline;
        }
    } 
}
</style>