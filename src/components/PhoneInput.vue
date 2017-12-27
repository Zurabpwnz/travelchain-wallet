<template lang="pug">
    div.ai-phone-input
        div.country-select(@click="getCountryList().open()")
            div.iti-flag(:class="countryCode")
            q-select(
                ref="countryCode"
                v-model="countryCode"
                :options="countryList()"
                @change="validate(phoneNumber)"
            )

        q-input(
            v-model="phoneNumber"
            :prefix="getPhoneCode()"
        )
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {
        QInput,
        QSelect,
    } from 'quasar';

    @Component({
        name: "aiphone",
        props: ['number'],
        components: {
            QInput,
            QSelect,
        }
    })
    export default class PhoneInput extends Vue {
        public isOpenCountryList = false
        public phoneNumber = "";
        public countryCode = "ru";
        public countries = {
            'af': {name: "Afghanistan (‫افغانستان‬‎)", code: 93, format: "111 111 1111"},
            'al': {name: "Albania (Shqipëri)", code: 355, format: "111 111 1111"},
            'dz': {name: "Algeria (‫الجزائر‬‎)", code: 213, format: "1111 11 11 11"},
            'as': {name: "American Samoa", code: 1684, format: "(111) 111-1111"},
            'ad': {name: "Andorra", code: 376, format: "111 111"},
            'ao': {name: "Angola", code: 244, format: "111 111 111"},
            'ai': {name: "Anguilla", code: 1264, format: "(111) 111-1111"},
            'ag': {name: "Antigua and Barbuda", code: 1268, format: "(111) 111-1111"},
            'ar': {name: "Argentina", code: 54, format: "111 11-1111-1111"},
            'am': {name: "Armenia (Հայաստան)", code: 374, format: "111 111111"},
            'aw': {name: "Aruba", code: 297, format: "111 1111"},
            'au': {name: "Australia", code: 61, format: "1111 111 111"},
            'at': {name: "Austria (Österreich)", code: 43, format: "0664 123456"},
            'az': {name: "Azerbaijan (Azərbaycan)", code: 994, format: "040 123 45 67"},
            'bs': {name: "Bahamas", code: 1242, format: "(242) 359-1234"},
            'bh': {name: "Bahrain (‫البحرين‬‎)", code: 973, format: "3600 1234"},
            'bd': {name: "Bangladesh (বাংলাদেশ)", code: 880, format: "01812-345678"},
            'bb': {name: "Barbados", code: 1246, format: "(246) 250-1234"},
            'by': {name: "Belarus (Беларусь)", code: 375, format: "8 029 491-19-11"},
            'be': {name: "Belgium (België)", code: 32, format: "0470 12 34 56"},
            'bz': {name: "Belize", code: 501, format: "622-1234"},
            'bj': {name: "Benin (Bénin)", code: 229, format: "90 01 12 34"},
            'bm': {name: "Bermuda", code: 1441, format: "(441) 370-1234"},
            'bt': {name: "Bhutan (འབྲུག)", code: 975, format: "17 12 34 56"},
            'bo': {name: "Bolivia", code: 591, format: "71234567"},
            'ba': {name: "Bosnia and Herzegovina (Босна и Херцеговина)", code: 387, format: "061 123 456"},
            'bw': {name: "Botswana", code: 267, format: "71 123 456"},
            'br': {name: "Brazil (Brasil)", code: 55, format: "(11) 96123-4567"},
            'io': {name: "British Indian Ocean Territory", code: 246, format: "380 1234"},
            'vg': {name: "British Virgin Islands", code: 1284, format: "(284) 300-1234"},
            'bn': {name: "Brunei", code: 673, format: "712 3456"},
            'bg': {name: "Bulgaria (България)", code: 359, format: "048 123 456"},
            'bf': {name: "Burkina Faso", code: 226, format: "70 12 34 56"},
            'bi': {name: "Burundi (Uburundi)", code: 257, format: "79 56 12 34"},
            'kh': {name: "Cambodia (កម្ពុជា)", code: 855, format: "091 234 567"},
            'cm': {name: "Cameroon (Cameroun)", code: 237, format: "6 71 23 45 67"},
            'ca': {name: "Canada", code: 1, format: "(204) 234-5678"},
            'cv': {name: "Cape Verde (Kabu Verdi)", code: 238, format: "991 12 34"},
            'bq': {name: "Caribbean Netherlands", code: 599, format: "318 1234"},
            'ky': {name: "Cayman Islands", code: 1345, format: "(345) 111-1111"},
            'cf': {name: "Central African Republic (République centrafricaine)", code: 236, format: "70 01 23 45"},
            'td': {name: "Chad (Tchad)", code: 235, format: "11 11 11 11"},
            'cl': {name: "Chile", code: 56, format: "09 6123 4567"},
            'cn': {name: "China (中国)", code: 86, format: "131 2345 6789"},
            'cx': {name: "Christmas Island", code: 61, format: "0412 345 678"},
            'cc': {name: "Cocos (Keeling) Islands", code: 61, format: "0412 345 678"},
            'co': {name: "Colombia", code: 57, format: "321 1234567"},
            'km': {name: "Comoros (‫جزر القمر‬‎)", code: 269, format: "321 23 45"},
            'cd': {name: "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", code: 243, format: "0991 234 567"},
            'cg': {name: "Congo (Republic) (Congo-Brazzaville)", code: 242, format: "06 123 4567"},
            'ck': {name: "Cook Islands", code: 682, format: "71 234"},
            'cr': {name: "Costa Rica", code: 506, format: "8312 3456"},
            'ci': {name: "Côte d’Ivoire", code: 225, format: "01 23 45 67"},
            'hr': {name: "Croatia (Hrvatska)", code: 385, format: "091 234 5678"},
            'cu': {name: "Cuba", code: 53, format: "05 1234567"},
            'cw': {name: "Curaçao", code: 599, format: "9 518 1234"},
            'cy': {name: "Cyprus (Κύπρος)", code: 357, format: "96 123456"},
            'cz': {name: "Czech Republic (Česká republika)", code: 420, format: "601 123 456"},
            'dk': {name: "Denmark (Danmark)", code: 45, format: "20 12 34 56"},
            'dj': {name: "Djibouti", code: 253, format: "77 83 10 01"},
            'dm': {name: "Dominica", code: 1767, format: "(767) 225-1234"},
            'do': {name: "Dominican Republic (República Dominicana)", code: 1, format: "(809) 234-5678"},
            'ec': {name: "Ecuador", code: 593, format: "099 123 4567"},
            'eg': {name: "Egypt (‫مصر‬‎)", code: 20, format: "0100 123 4567"},
            'sv': {name: "El Salvador", code: 503, format: "7012 3456"},
            'gq': {name: "Equatorial Guinea (Guinea Ecuatorial)", code: 240, format: "222 123 456"},
            'er': {name: "Eritrea", code: 291, format: "07 123 456"},
            'ee': {name: "Estonia (Eesti)", code: 372, format: "5123 4567"},
            'et': {name: "Ethiopia", code: 251, format: "091 123 4567"},
            'fk': {name: "Falkland Islands (Islas Malvinas)", code: 500, format: "51234"},
            'fo': {name: "Faroe Islands (Føroyar)", code: 298, format: "211234"},
            'fj': {name: "Fiji", code: 679, format: "701 2345"},
            'fi': {name: "Finland (Suomi)", code: 358, format: "041 2345678"},
            'fr': {name: "France", code: 33, format: "06 12 34 56 78"},
            'gf': {name: "French Guiana (Guyane française)", code: 594, format: "0694 20 12 34"},
            'pf': {name: "French Polynesia (Polynésie française)", code: 689, format: "87 12 34 56"},
            'ga': {name: "Gabon", code: 241, format: "06 03 12 34"},
            'gm': {name: "Gambia", code: 220, format: "301 2345"},
            'ge': {name: "Georgia (საქართველო)", code: 995, format: "555 12 34 56"},
            'de': {name: "Germany (Deutschland)", code: 49, format: "01512 3456789"},
            'gh': {name: "Ghana (Gaana)", code: 233, format: "023 123 4567"},
            'gi': {name: "Gibraltar", code: 350, format: "57123456"},
            'gr': {name: "Greece (Ελλάδα)", code: 30, format: "691 234 5678"},
            'gl': {name: "Greenland (Kalaallit Nunaat)", code: 299, format: "22 12 34"},
            'gd': {name: "Grenada", code: 1473, format: "(473) 403-1234"},
            'gp': {name: "Guadeloupe", code: 590, format: "0690 30-1234"},
            'gu': {name: "Guam", code: 1671, format: "(671) 300-1234"},
            'gt': {name: "Guatemala", code: 502, format: "5123 4567"},
            'gg': {name: "Guernsey", code: 44, format: "07781 123456"},
            'gn': {name: "Guinea (Guinée)", code: 224, format: "601 12 34 56"},
            'gw': {name: "Guinea-Bissau (Guiné Bissau)", code: 245, format: "955 012 345"},
            'gy': {name: "Guyana", code: 592, format: "609 1234"},
            'ht': {name: "Haiti", code: 509, format: "34 10 1234"},
            'hn': {name: "Honduras", code: 504, format: "9123-4567"},
            'hk': {name: "Hong Kong (香港)", code: 852, format: "5123 4567"},
            'hu': {name: "Hungary (Magyarország)", code: 36, format: "(20) 123 4567"},
            'is': {name: "Iceland (Ísland)", code: 354, format: "611 1234"},
            'in': {name: "India (भारत)", code: 91, format: "099876 54321"},
            'id': {name: "Indonesia", code: 62, format: "0812-345-678"},
            'ir': {name: "Iran (‫ایران‬‎)", code: 98, format: "0912 345 6789"},
            'iq': {name: "Iraq (‫العراق‬‎)", code: 964, format: "0791 234 5678"},
            'ie': {name: "Ireland", code: 353, format: "085 012 3456"},
            'im': {name: "Isle of Man", code: 44, format: "07924 123456"},
            'il': {name: "Israel (‫ישראל‬‎)", code: 972, format: "050-123-4567"},
            'it': {name: "Italy (Italia)", code: 39, format: "312 345 6789"},
            'jm': {name: "Jamaica", code: 1876, format: "(876) 210-1234"},
            'jp': {name: "Japan (日本)", code: 81, format: "090-1234-5678"},
            'je': {name: "Jersey", code: 44, format: "07797 123456"},
            'jo': {name: "Jordan (‫الأردن‬‎)", code: 962, format: "07 9012 3456"},
            'kz': {name: "Kazakhstan (Казахстан)", code: 7, format: "8 (771) 000 9998"},
            'ke': {name: "Kenya", code: 254, format: "0712 123456"},
            'ki': {name: "Kiribati", code: 686, format: "72012345"},
            'xk': {name: "Kosovo", code: 383, format: ""},
            'kw': {name: "Kuwait (‫الكويت‬‎)", code: 965, format: "500 12345"},
            'kg': {name: "Kyrgyzstan (Кыргызстан)", code: 996, format: "0700 123 456"},
            'la': {name: "Laos (ລາວ)", code: 856, format: "020 23 123 456"},
            'lv': {name: "Latvia (Latvija)", code: 371, format: "21 234 567"},
            'lb': {name: "Lebanon (‫لبنان‬‎)", code: 961, format: "71 123 456"},
            'ls': {name: "Lesotho", code: 266, format: "5012 3456"},
            'lr': {name: "Liberia", code: 231, format: "077 012 3456"},
            'ly': {name: "Libya (‫ليبيا‬‎)", code: 218, format: "091-2345678"},
            'li': {name: "Liechtenstein", code: 423, format: "660 234 567"},
            'lt': {name: "Lithuania (Lietuva)", code: 370, format: "(8-612) 34567"},
            'lu': {name: "Luxembourg", code: 352, format: "628 123 456"},
            'mo': {name: "Macau (澳門)", code: 853, format: "6612 3456"},
            'mk': {name: "Macedonia (FYROM) (Македонија)", code: 389, format: "072 345 678"},
            'mg': {name: "Madagascar (Madagasikara)", code: 261, format: "032 12 345 67"},
            'mw': {name: "Malawi", code: 265, format: "0991 23 45 67"},
            'my': {name: "Malaysia", code: 60, format: "012-345 6789"},
            'mv': {name: "Maldives", code: 960, format: "771-2345"},
            'ml': {name: "Mali", code: 223, format: "65 01 23 45"},
            'mt': {name: "Malta", code: 356, format: "9696 1234"},
            'mh': {name: "Marshall Islands", code: 692, format: "235-1234"},
            'mq': {name: "Martinique", code: 596, format: "0696 20 12 34"},
            'mr': {name: "Mauritania (‫موريتانيا‬‎)", code: 222, format: "22 12 34 56"},
            'mu': {name: "Mauritius (Moris)", code: 230, format: "5251 2345"},
            'yt': {name: "Mayotte", code: 262, format: "0639 12 34 56"},
            'mx': {name: "Mexico (México)", code: 52, format: "044 222 123 4567"},
            'fm': {name: "Micronesia", code: 691, format: "350 1234"},
            'md': {name: "Moldova (Republica Moldova)", code: 373, format: "0621 12 345"},
            'mc': {name: "Monaco", code: 377, format: "06 12 34 56 78"},
            'mn': {name: "Mongolia (Монгол)", code: 976, format: "8812 3456"},
            'me': {name: "Montenegro (Crna Gora)", code: 382, format: "067 622 901"},
            'ms': {name: "Montserrat", code: 1664, format: "(664) 492-3456"},
            'ma': {name: "Morocco (‫المغرب‬‎)", code: 212, format: "0650-123456"},
            'mz': {name: "Mozambique (Moçambique)", code: 258, format: "82 123 4567"},
            'mm': {name: "Myanmar (Burma) (မြန်မာ)", code: 95, format: "09 212 3456"},
            'na': {name: "Namibia (Namibië)", code: 264, format: "081 123 4567"},
            'nr': {name: "Nauru", code: 674, format: "555 1234"},
            'np': {name: "Nepal (नेपाल)", code: 977, format: "984-1234567"},
            'nl': {name: "Netherlands (Nederland)", code: 31, format: "06 12345678"},
            'nc': {name: "New Caledonia (Nouvelle-Calédonie)", code: 687, format: "75.12.34"},
            'nz': {name: "New Zealand", code: 64, format: "021 123 4567"},
            'ni': {name: "Nicaragua", code: 505, format: "8123 4567"},
            'ne': {name: "Niger (Nijar)", code: 227, format: "93 12 34 56"},
            'ng': {name: "Nigeria", code: 234, format: "0802 123 4567"},
            'nu': {name: "Niue", code: 683, format: "1234"},
            'nf': {name: "Norfolk Island", code: 672, format: "3 81234"},
            'kp': {name: "North Korea (조선 민주주의 인민 공화국)", code: 850, format: "0192 123 4567"},
            'mp': {name: "Northern Mariana Islands", code: 1670, format: "(670) 234-5678"},
            'no': {name: "Norway (Norge)", code: 47, format: "406 12 345"},
            'om': {name: "Oman (‫عُمان‬‎)", code: 968, format: "9212 3456"},
            'pk': {name: "Pakistan (‫پاکستان‬‎)", code: 92, format: "0301 2345678"},
            'pw': {name: "Palau", code: 680, format: "620 1234"},
            'ps': {name: "Palestine (‫فلسطين‬‎)", code: 970, format: "0599 123 456"},
            'pa': {name: "Panama (Panamá)", code: 507, format: "6001-2345"},
            'pg': {name: "Papua New Guinea", code: 675, format: "681 2345"},
            'py': {name: "Paraguay", code: 595, format: "0961 456789"},
            'pe': {name: "Peru (Perú)", code: 51, format: "912 345 678"},
            'ph': {name: "Philippines", code: 63, format: "0905 123 4567"},
            'pl': {name: "Poland (Polska)", code: 48, format: "512 345 678"},
            'pt': {name: "Portugal", code: 351, format: "912 345 678"},
            'pr': {name: "Puerto Rico", code: 1, format: "(787) 234-5678"},
            'qa': {name: "Qatar (‫قطر‬‎)", code: 974, format: "3312 3456"},
            're': {name: "Réunion (La Réunion)", code: 262, format: "0692 12 34 56"},
            'ro': {name: "Romania (România)", code: 40, format: "0712 345 678"},
            'ru': {name: "Russia (Россия)", code: 7, format: "(111) 111-11-11"},
            'rw': {name: "Rwanda", code: 250, format: "0720 123 456"},
            'bl': {name: "Saint Barthélemy (Saint-Barthélemy)", code: 590, format: "0690 30-1234"},
            'sh': {name: "Saint Helena", code: 290, format: "51234"},
            'kn': {name: "Saint Kitts and Nevis", code: 1869, format: "(869) 765-2917"},
            'lc': {name: "Saint Lucia", code: 1758, format: "(758) 284-5678"},
            'mf': {name: "Saint Martin (Saint-Martin (partie française))", code: 590, format: "0690 30-1234"},
            'pm': {name: "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", code: 508, format: "055 12 34"},
            'vc': {name: "Saint Vincent and the Grenadines", code: 1784, format: "(784) 430-1234"},
            'ws': {name: "Samoa", code: 685, format: "601234"},
            'sm': {name: "San Marino", code: 378, format: "66 66 12 12"},
            'st': {name: "São Tomé and Príncipe (São Tomé e Príncipe)", code: 239, format: "981 2345"},
            'sa': {name: "Saudi Arabia (‫المملكة العربية السعودية‬‎)", code: 966, format: "051 234 5678"},
            'sn': {name: "Senegal (Sénégal)", code: 221, format: "70 123 45 67"},
            'rs': {name: "Serbia (Србија)", code: 381, format: "060 1234567"},
            'sc': {name: "Seychelles", code: 248, format: "2 510 123"},
            'sl': {name: "Sierra Leone", code: 232, format: "(025) 123456"},
            'sg': {name: "Singapore", code: 65, format: "8123 4567"},
            'sx': {name: "Sint Maarten", code: 1721, format: "(721) 520-5678"},
            'sk': {name: "Slovakia (Slovensko)", code: 421, format: "0912 123 456"},
            'si': {name: "Slovenia (Slovenija)", code: 386, format: "031 234 567"},
            'sb': {name: "Solomon Islands", code: 677, format: "74 21234"},
            'so': {name: "Somalia (Soomaaliya)", code: 252, format: "7 1123456"},
            'za': {name: "South Africa", code: 27, format: "071 123 4567"},
            'kr': {name: "South Korea (대한민국)", code: 82, format: "010-0000-0000"},
            'ss': {name: "South Sudan (‫جنوب السودان‬‎)", code: 211, format: "0977 123 456"},
            'es': {name: "Spain (España)", code: 34, format: "612 34 56 78"},
            'lk': {name: "Sri Lanka (ශ්‍රී ලංකාව)", code: 94, format: "071 234 5678"},
            'sd': {name: "Sudan (‫السودان‬‎)", code: 249, format: "091 123 1234"},
            'sr': {name: "Suriname", code: 597, format: "741-2345"},
            'sj': {name: "Svalbard and Jan Mayen", code: 47, format: "412 34 567"},
            'sz': {name: "Swaziland", code: 268, format: "7612 3456"},
            'se': {name: "Sweden (Sverige)", code: 46, format: "070-123 45 67"},
            'ch': {name: "Switzerland (Schweiz)", code: 41, format: "078 123 45 67"},
            'sy': {name: "Syria (‫سوريا‬‎)", code: 963, format: "0944 567 890"},
            'tw': {name: "Taiwan (台灣)", code: 886, format: "0912 345 678"},
            'tj': {name: "Tajikistan", code: 992, format: "(8) 917 12 3456"},
            'tz': {name: "Tanzania", code: 255, format: "0621 234 567"},
            'th': {name: "Thailand (ไทย)", code: 66, format: "081 234 5678"},
            'tl': {name: "Timor-Leste", code: 670, format: "7721 2345"},
            'tg': {name: "Togo", code: 228, format: "90 11 23 45"},
            'tk': {name: "Tokelau", code: 690, format: "7290"},
            'to': {name: "Tonga", code: 676, format: "771 5123"},
            'tt': {name: "Trinidad and Tobago", code: 1868, format: "(868) 291-1234"},
            'tn': {name: "Tunisia (‫تونس‬‎)", code: 216, format: "20 123 456"},
            'tr': {name: "Turkey (Türkiye)", code: 90, format: "0501 234 56 78"},
            'tm': {name: "Turkmenistan", code: 993, format: "8 66 123456"},
            'tc': {name: "Turks and Caicos Islands", code: 1649, format: "(649) 231-1234"},
            'tv': {name: "Tuvalu", code: 688, format: "901234"},
            'us': {name: "United States", code: 1, format: "(201) 555-0123"},
            'gb': {name: "United Kingdom", code: 44, format: "07400 123456"},
            'vi': {name: "U.S. Virgin Islands", code: 1340, format: "(340) 642-1234"},
            'ug': {name: "Uganda", code: 256, format: "0712 345678"},
            'ua': {name: "Ukraine (Україна)", code: 380, format: "(11) 111 1111"},
            'ae': {name: "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", code: 971, format: "050 123 4567"},
            'uy': {name: "Uruguay", code: 598, format: "094 231 234"},
            'uz': {name: "Uzbekistan (Oʻzbekiston)", code: 998, format: "8 91 234 56 78"},
            'vu': {name: "Vanuatu", code: 678, format: "591 2345"},
            'va': {name: "Vatican City (Città del Vaticano)", code: 39, format: "312 345 6789"},
            've': {name: "Venezuela", code: 58, format: "0412-1234567"},
            'vn': {name: "Vietnam (Việt Nam)", code: 84, format: "091 234 56 78"},
            'wf': {name: "Wallis and Futuna", code: 681, format: "50 12 34"},
            'eh': {name: "Western Sahara (‫الصحراء الغربية‬‎)", code: 212, format: "0650-123456"},
            'ye': {name: "Yemen (‫اليمن‬‎)", code: 967, format: "0712 345 678"},
            'zm': {name: "Zambia", code: 260, format: "095 5123456"},
            'zw': {name: "Zimbabwe", code: 263, format: "071 123 4567"},
            'ax': {name: "Åland Islands", code: 358, format: "041 2345678"}
        };

        mounted()
        {
            this.$watch('phoneNumber', (value) => {
                this.validate(value);
                this.$emit('onChange', this.getPhone());
                this.$emit( this.isComplete() ? 'onComplete' : 'onClear', this.getPhone());
            });

            this.phoneNumber = this.$props['number'];
            this.$forceUpdate();
        }
        
        countryList()
        {
            let countries = new Array();
            for( let key in this.countries )
            {
                countries.push({
                    value: key,
                    label: this.countries[key].name,
                });
            }
            return countries;
        }

        getCountryList()
        {
            return this.$refs.countryCode;
        }

        validate(value)
        {
            let codeFormat = String( this.countries[ this.countryCode ].format );
            codeFormat = codeFormat.replace(new RegExp(/ /g), '');
            codeFormat = codeFormat.replace(new RegExp(/[\(|\)]/g), '');

            value = value.match(/([0-9])/g);
            value = value ? value.join('') : "";
            if( value.length > codeFormat.length )
                value = value.substring(0, codeFormat.length);

            this.phoneNumber = value;
        }

        getPhoneCode()
        {
            return "+"+ this.countries[ this.countryCode ].code;
        }

        getPhone()
        {
            return this.getPhoneCode() + this.phoneNumber;
        }

        isComplete()
        {
            let codeFormat = String( this.countries[ this.countryCode ].format );
            codeFormat = codeFormat.replace(new RegExp(/ /g), '');
            codeFormat = codeFormat.replace(new RegExp(/[\(|\)]/g), '');

            return this.phoneNumber.length == codeFormat.length;
        }
    }
</script>