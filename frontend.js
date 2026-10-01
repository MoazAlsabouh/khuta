const UNIT_ORDER = {"وحدة القرآن الكريم (التلاوة)": 0, "وحدة القرآن الكريم (التفسير والاستحفاظ)": 1, "وحدة الحديث النبوي الشريف": 2, "وحدة التربية الإنسانية": 3, "وحدة التربية الأسرية والاجتماعية": 4, "وحدة التربية الاقتصادية والمالية": 5, "وحدة العلاقات الدولية": 6, "وحدة السيرة النبوية والأعلام": 7, "Module 1: Learning for Life": 8, "Module 2: Sciences": 9, "Module 3: Politics": 10, "Module 4: Biology": 11, "Module 5: Culture": 12, "Module 6: Technology": 13, "الحركة والتحريك": 14, "الكهرباء والمغناطيسية": 15, "الأمواج المستقرة": 16, "الإلكترونيات والجسم الصلب": 17, "الفيزياء الفلكية": 18, "الكيمياء النووية": 19, "الغازات": 20, "حركية التفاعلات الكيميائية": 21, "الكيمياء التحليلية": 22, "الكيمياء العضوية": 23, "الفصل الأول": 24, "الفصل الثاني": 25, "تذكرة بالمتتاليات والإثبات بالتدريج": 26, "التوابع: النهايات والاستمرار": 27, "التوابع: الاشتقاق": 28, "نهاية متتالية": 29, "التابع اللوغاريتمي النيبري": 30, "التابع الأسي": 31, "Module": 32, "الوحدة الأولى: أبرز المتغيرات في الوطن العربي بداية القرن العشرين": 33, "الوحدة الثانية: سورية ولبنان منذ الاحتلال الفرنسي حتى الوقت الحاضر": 34, "الوحدة الثالثة: فلسطين والأردن والعراق": 35, "الوحدة الرابعة: شبه الجزيرة العربية": 36, "الوحدة الخامسة: وادي النيل والقرن الإفريقي": 37, "الوحدة السادسة: الجزائر وتونس": 38, "الوحدة السابعة: ليبيا والمغرب وموريتانيا": 39, "الوحدة الأولى: الوطن العربي": 40, "الوحدة الثانية: الحياة البشرية والاقتصادية": 41, "الوحدة الثالثة: سورية (الطبيعة والموارد)": 42, "الوحدة الرابعة: سورية (الحياة البشرية والاقتصادية)": 43, "الوحدة الخامسة: العالم بين نام ومتقدم": 44, "مناهج النقد": 45, "الغربة والاغتراب في الأدب المهجري": 46, "ظواهر وجدانية": 47, "أدب القضايا الاجتماعية": 48, "الوحدة الأولى: المعرفة": 49, "الوحدة الثانية: الأخلاق": 50, "الوحدة الثالثة: الأخلاق والعلم": 51, "الوحدة الرابعة: الفلسفة الحديثة": 52, "الوحدة الخامسة: الفلسفة المعاصرة": 53, "الوحدة السادسة: الفكر العربي المعاصر": 54, "الوحدة السابعة: المنطق": 55, "الوحدة الثامنة: علم النفس العمليات المعرفية": 56, "الوحدة الثامنة: الشخصية": 57, "الوحدة الثامنة: علم النفس الإيجابي": 58, "الوحدة التاسعة: المفاهيم الاجتماعية": 59, "الوحدة التاسعة: المجتمع المعاصر": 60, "التكامل والتوابع الأصلية": 61, "الأشعة في الفراغ": 62, "الجداء السلمي في الفراغ": 63, "المستقيمات والمستويات في الفراغ": 64, "الأعداد العقدية": 65, "تطبيقات الأعداد العقدية في الهندسة": 66, "التحليل التوافقي": 67, "الاحتمالات": 68, "قضايا وطنية وقومية": 69, "فن الرواية": 70};
const LESSON_ORDER = {"نعم الله تعالى مدعاة للتوحيد والشكر": 0, "الله وحده هو الخالق المتصرف": 1, "الله وحده القادر المعبود": 2, "من مظاهر قدرة الله تعالى وعظيم فضله": 3, "دلائل عظمة الخالق عز وجل": 4, "مبادئ وقيم خالدة": 5, "أسس الدعوة إلى الله تعالى": 6, "صيانة الحقوق وتوثيق العقود": 7, "إيمان ودعاء": 8, "القرآن الكريم وعظيم قدرة الله تعالى": 9, "سعة علم الله تعالى وكمال قدرته": 10, "بيعة صادقة": 11, "الإيمان قوة وعمل": 12, "حكم القاضي لا يُحل الحرام": 13, "مكانة الشهيد وعظيم أجره": 14, "عموم المسؤولية": 15, "توجيه نبوي حكيم": 16, "بناء الحضارة في الإسلام": 17, "مقومات الحضارة الإنسانية في الإسلام": 18, "مظاهر الحضارة الإسلامية": 19, "نظام الأسرة في الإسلام": 20, "المحرّمات من النساء في الزواج": 21, "الخطبة والأسس الإسلامية للزواج": 22, "عقد الزواج": 23, "حقوق الزوجين": 24, "الطلاق": 25, "نظام المال في الإسلام": 26, "قيود الملكية (الفردية - الجماعية)": 27, "أسس العلاقات الدولية في الإسلام": 28, "الجهاد في الإسلام": 29, "من آداب الجهاد وأحكامه": 30, "هدي النبي في القيادة": 31, "أم سليم بنت ملحان": 32, "الإمام جعفر الصادق": 33, "Unit 1: Life Choices": 34, "Unit 2: Success": 35, "Unit 3: Medicine": 36, "Unit 4: Engineering": 37, "Unit 5: Civil Rights": 38, "Unit 6: United Nations": 39, "Unit 7: Microorganism": 40, "Unit 8: Facts about Human Body": 41, "Unit 9: Citizenship": 42, "Unit 10: Culture Shock": 43, "Unit 11: Artificial Intelligence": 44, "Unit 12: Digital Literacy": 45, "الحركة التوافقية البسيطة": 46, "الاهتزازات الجيبية الدورانية نواس الفتل غير المتخامد": 47, "الاهتزازات غير التوافقية النواس الثقلي غير المتخامد": 48, "ميكانيك الموائع": 49, "النسبية الخاصة": 50, "المغناطيسية": 51, "فعل الحقل المغناطيسي في التيار الكهربائي": 52, "التحريض الكهرطيسي": 53, "الدارات المهتزة والتيارات عالية التواتر": 54, "التيار المتناوب الجيبي": 55, "المحولات الكهربائية": 56, "الأمواج المستقرة العرضية": 57, "الأمواج المستقرة الطولية": 58, "النماذج الذرية والطيوف": 59, "انتزاع الإلكترونات وتسريعها": 60, "الأشعة المهبطية": 61, "الفعل الكهرضوئي": 62, "نظرية الكم والفعل الكهرضوئي": 63, "الأشعة السينية X-Ray": 64, "أشعة الليزر": 65, "الفيزياء الفلكية": 66, "الكيمياء النووية": 67, "الغازات": 68, "سرعة التفاعل الكيميائي": 69, "التوازن الكيميائي": 70, "الحموض والأسس": 71, "المحاليل المائية للأملاح": 72, "المعايرة الحجمية": 73, "الأغوال": 74, "الألدهيدات والكيتونات": 75, "الحموض العضوية الكربوكسيلية": 76, "مشتقات الحموض الكربوكسيلية": 77, "الأمينات": 78, "الجهاز العصبي": 79, "النسيج العصبي": 80, "الجهاز العصبي المحيطي - خواص الأعصاب": 81, "الظواهر الكهربائية في الخلايا الحية - النقل في الأعصاب": 82, "تتمة النقل في الأعصاب - وظائف الجهاز العصبي (1+2)": 83, "وظائف الجهاز العصبي (3) - الفعل المنعكس": 84, "بعض أمراض الجهاز العصبي - مفهوم المستقبلات الحسية - مستقبلات الجلد": 85, "المستقبلات الكيميائية - المستقبلات الصوتية": 86, "مستقبلات التوازن - المستقبلات الضوئية": 87, "التنسيق الهرموني - الغدة النخامية - الغدة الدرقية": 88, "آليات السيطرة على إفراز الغدد الصم - التنسيق الكيميائي في النبات": 89, "تتمة التنسيق الكيميائي في النبات": 90, "تكاثر الفيروسات - التكاثر عند الأحياء": 91, "التقانات الحيوية - الخلايا الجذعية - تكاثر الجراثيم والفطريات": 92, "التكاثر الجنسي لدى عاريات البذور": 93, "التكاثر الجنسي لدى مغلفات البذور": 94, "منشأ جهاز التكاثر لدى الانسان - جهاز التكاثر الذكري": 95, "تشكل النطاف - الهرمونات الجنسية الذكرية": 96, "جهاز التكاثر الأنثوي": 97, "الدورة الجنسية - التنامي الجنيني (الإلقاح)": 98, "التنامي الجنيني (التعشيش والحمل) - الولادة والإرضاع": 99, "الصحة الإنجابية": 100, "تجارب مندل في الوراثة": 101, "التهجين الاختباري - تأثر المورثات وتعديلات النسب المندلية في الهجونة": 102, "المورثات المتتامة - الحجب الراجح - الارتباط والعبور": 103, "تحديد الجنس لدى الأحياء - الوراثة والجنس": 104, "الوراثة عند الإنسان - الطفرات": 105, "الهندسة الوراثية": 106, "عموميات عن المتتاليات": 107, "البرهان بالتدريج أو بالاستقراء الرياضي": 108, "نهاية تابع عند اللانهاية": 109, "نهاية تابع عند عدد حقيقي": 110, "العمليات على النهايات": 111, "مبرهنات المقارنة": 112, "نهاية تابع مركب": 113, "المقارب المائل": 114, "الاستمرار": 115, "التوابع المستمرة وحل المعادلات": 116, "تعاريف (تذكرة)": 117, "مشتقات بعض التوابع المألوفة (تذكرة)": 118, "تطبيقات الاشتقاق": 119, "اشتقاق تابع مركب": 120, "المشتقات من مراتب عليا": 121, "نهاية متتالية : تذكرة": 122, "مبرهنات تخص النهايات": 123, "تقارب المتتاليات المطردة": 124, "متتاليات متجاورة": 125, "التابع اللوغاريتمي النيبري": 126, "لوغاريتم جداء ضرب": 127, "دراسة التابع اللوغاريتمي ln": 128, "مشتق التابع المركب lnou": 129, "نهايات مهمة تتعلق بالتابع اللوغاريتمي": 130, "التابع الأسي النيبري": 131, "خواص التابع الأسي": 132, "دراسة التابع الأسي": 133, "نهايات مهمة تتعلق بالتابع الأسي": 134, "دراسة توابع من النمط a^x": 135, "معادلات تفاضلية بسيطة": 136, "Unité 1: On fête ensemble ...": 137, "Unité 2: Chacun pour tous": 138, "Unité 3: Le salon, un espace culturel": 139, "Unité 4: La femme dans la littérature": 140, "Unité 5: L\\": 141, "Unité 6: La conquête de l\\": 142, "الأطماع الاستعمارية في القرن التاسع عشر": 143, "الوطن العربي محور الأطماع الاستعمارية في القرن العشرين": 144, "صيغ وأساليب جديدة للاستعمار": 145, "العرب في بلاد الشام": 146, "الشعب العربي السوري يتصدى للقوات الفرنسية في ميسلون": 147, "الثورات السورية ضد الاحتلال الفرنسي": 148, "سياسة فرنسا لم تثن الشعب العربي السوري عن نيل استقلاله": 149, "سورية بين الاستقلال وانقلاب 1970": 150, "سورية منذ انقلاب 1970 حتى الوقت الحاضر": 151, "لبنان منذ الاحتلال الفرنسي حتى معاهدة عام 1936م": 152, "لبنان منذ الاستقلال حتى الوقت الحاضر": 153, "الأطماع الاستعمارية في فلسطين قبل الحرب العالمية الأولى": 154, "الشعب الفلسطيني يعلن الثورة": 155, "القضية الفلسطينية بين الحرب العالمية الثانية والنكبة": 156, "القضية الفلسطينية منذ النكبة حتى الوقت الحاضر": 157, "الأردن منذ تأسيس الإمارة حتى الوقت الحاضر": 158, "العراق منذ الاحتلال البريطاني حتى معاهدة عام 1930م": 159, "العراق منذ الحرب العالمية الثانية حتى الوقت الحاضر": 160, "المملكة العربية السعودية منذ التأسيس حتى الوقت الحاضر": 161, "الكويت وقطر والبحرين منذ السيطرة البريطانية حتى الوقت الحاضر": 162, "الإمارات وعُمان منذ السيطرة البريطانية حتى الوقت الحاضر": 163, "تاريخ اليمن منذ القرن التاسع عشر حتى الوقت الحاضر": 164, "الاحتلال البريطاني لمصر": 165, "أوضاع مصر بين الحربين العالميتين": 166, "مصر منذ انتهاء الملكية حتى الوقت الحاضر": 167, "السودان منذ الحكم الثنائي حتى الوقت الحاضر": 168, "الصومال وجيبوتي منذ الاحتلال الأجنبي حتى الوقت الحاضر": 169, "اريتريا وجزر القمر منذ الاحتلال الأجنبي حتى الوقت الحاضر": 170, "فرنسا تحول الجزائر إلى مستعمرة فرنسية": 171, "المقاومة الجزائرية حتى الحرب العالمية الثانية": 172, "الشعب الجزائري يفجر ثورة مليون شهيد": 173, "فرنسا تفرض نظاماً استعمارياً جديداً على تونس": 174, "تونس تقاوم الاحتلال الفرنسي حتى نيل الاستقلال": 175, "ليبيا والأطماع الإيطالية": 176, "ليبيا منذ المقاومة حتى الوقت الحاضر": 177, "المغرب من الحماية إلى الثورة": 178, "الحركة الوطنية تقود المغرب إلى الاستقلال": 179, "موريتانيا في تاريخها الحديث": 180, "الوطن العربي (موقع جغرافي مميز)": 181, "البنية الجيولوجية للوطن العربي": 182, "مظاهر السطح في الوطن العربي": 183, "مناخ الوطن العربي": 184, "المياه في الوطن العربي (قلة في الموارد المائية)": 185, "المياه في الوطن العربي (أزمة راهنة وصراع مستقبلي)": 186, "ترب الوطن العربي": 187, "الثروات الباطنية في الوطن العربي": 188, "أقاليم الوطن العربي الجغرافية": 189, "السكان في الوطن العربي": 190, "المراكز العمرانية في الوطن العربي": 191, "القطاع الأولي (الزراعة والثروة الحيوانية)": 192, "الصناعة في الوطن العربي": 193, "الإنتاج الصناعي العربي": 194, "السياحة في الوطن العربي": 195, "النقل والمواصلات في الوطن العربي": 196, "التجارة والتنمية في الوطن العربي": 197, "الجمهورية العربية السورية (موقع جغرافي فريد)": 198, "الجمهورية العربية السورية (تضاريس متنوعة)": 199, "المناخ والبيئات الطبيعية في سورية": 200, "المياه والترب في سورية": 201, "الثروات الباطنية في سورية": 202, "الخصائص الديموغرافية للسكان في سورية": 203, "التوزع الجغرافي للسكان والمراكز العمرانية": 204, "الزراعة أهم الأنشطة الاقتصادية": 205, "الصناعة قارب النجاة للاقتصاد السوري": 206, "السياحة صناعة المستقبل": 207, "النقل عماد الاقتصاد والتجارة مرآته": 208, "العالم كل متغير": 209, "لماذا دول نامية ودول متقدمة؟": 210, "اليابان": 211, "الهند": 212, "السنغال": 213, "بعض تحديات التنمية والتقدم": 214, "المنهج الاجتماعي في النقد الأدبي (قراءة تمهيدية)": 215, "أحزان البنفسج (نص أدبي - عبد الوهاب البياتي)": 216, "المنهج النفسي في النقد الأدبي (قراءة تمهيدية)": 217, "وَجَدْتُها (نص أدبي - فدوى طوقان)": 218, "شعوري (نص أدبي - نديم محمد)": 219, "التفكير النقدي (مطالعة - د. محمود السيد)": 220, "البناء (نص أدبي - زكي قنصل)": 221, "رفيقة الخلق (نص أدبي - شفيق جبري)": 222, "نبض الطفولة وجمالها (نص أدبي - محمد سليمان الأحمد)": 223, "قوانين الفكر": 224, "مبحث المعرفة وتداخلاتها مع العلوم الأخرى": 225, "خطوات المعرفة العلمية": 226, "تحليل نص (ضرورة الفلسفة)": 227, "لا أخلاقية العنف": 228, "اللاعنف": 229, "التسامح": 230, "التواصل": 231, "المحبة": 232, "تحليل نص (المحبة)": 233, "الإنسان والتكنولوجيا": 234, "أبعاد مشكلة الإنسان المعاصر": 235, "أخلاقيات العلم والتكنولوجيا": 236, "تحليل نص (الإنسان والاستهلاك)": 237, "المذهب العقلي": 238, "المذهب التجريبي": 239, "المذهب النقدي": 240, "المذهب المادي الجدلي": 241, "تحليل نص (المثالية الهيغلية)": 242, "الفلسفة الوجودية": 243, "الفلسفة الحيوية": 244, "فلسفة الظواهر": 245, "تحليل نص (البراجماتية)": 246, "التأويل في الفكر العربي المعاصر": 247, "النزعة الجمالية عند عبد الكريم اليافي": 248, "النزعة الأخلاقية عند عادل العوا": 249, "الوضعية المنطقية عند زكي نجيب محمود": 250, "الشخصانية عند عبد العزيز الحبابي": 251, "تحليل نص (ضرورة النقد في الفكر العربي)": 252, "الحدود المنطقية": 253, "القضايا": 254, "الاستغراق": 255, "الاستدلال": 256, "القياس": 257, "جبر المنطق": 258, "المغالطات المنطقية": 259, "تحليل نص (أسس التفكير المنطقي)": 260, "الانتباه": 261, "الإدراك": 262, "الذاكرة والنسيان": 263, "الذكاء": 264, "تحليل نص (الإبداع)": 265, "مفهوم الذات": 266, "نظريات الشخصية": 267, "تحليل نص (الشعور واللاشعور)": 268, "التفكير الإيجابي": 269, "السعادة": 270, "الرضا عن الحياة": 271, "تحليل نص (الحياة الإيجابية)": 272, "القيمة الاجتماعية": 273, "الاندماج الاجتماعي": 274, "الضبط الاجتماعي": 275, "الظاهرة الاجتماعية": 276, "تحليل نص (منهج البحث في العلوم الاجتماعية)": 277, "الصداقة والشباب": 278, "العمل التطوعي": 279, "الإرشاد الاجتماعي": 280, "الإعلام والمجتمع": 281, "تحليل نص (نحن والإعلام)": 282, "التوابع الأصلية": 283, "بعض قواعد حساب التوابع الأصلية": 284, "التكامل المحدد وخواصه": 285, "التكامل المحدد وحساب المساحة": 286, "عموميات": 287, "الارتباط الخطي لثلاثة أشعة": 288, "المعلم في الفراغ": 289, "المسافة في الفراغ": 290, "مركز الأبعاد المتناسبة في الفراغ": 291, "الجداء السلمي في المستوي (تذكرة)": 292, "الجداء السلمي في الفراغ": 293, "التعامد في الفراغ": 294, "المعادلة الديكارتية لمستوٍ": 295, "المستقيم والمستوي بصفتهما مراكز أبعاد متناسبة": 296, "التمثيلات الوسيطية": 297, "تقاطع مستقيمات ومستويات": 298, "تقاطع ثلاثة مستويات": 299, "مجموعة الأعداد العقدية": 300, "مرافق عدد عقدي": 301, "الشكل المثلثي لعدد عقدي": 302, "طويلة عدد عقدي وزاويته": 303, "الشكل الأسي لعدد عقدي": 304, "المعادلات من الدرجة الثانية ذات الأمثال الحقيقية": 305, "تمثيل الأشعة بأعداد عقدية": 306, "استعمال العدد العقدي الممثل لشعاع": 307, "الكتابة العقدية للتحويلات الهندسية": 308, "إنشاء قوائم من عناصر مجموعة": 309, "التوافيق": 310, "خواص عدد التوافيق، ومنشور ذي الحدين": 311, "الاحتمالات المشروطة": 312, "المتحولات العشوائية": 313, "الاستقلال الاحتمالي لمتحولين عشوائيين": 314, "المتحولات العشوائية الحدانية": 315, "أدب القضايا الوطنية والقومية (قراءة تمهيدية)": 316, "عرس المجد (نص أدبي - عمر أبو ريشة)": 317, "الجسر (نص أدبي - محمود درويش)": 318, "الأدب المهجري (قراءة تمهيدية)": 319, "وطني (نص أدبي - جورج صيدح)": 320, "المهاجر (نص أدبي - نسيب عريضة)": 321, "الغاب (نص أدبي - جبران خليل جبران)": 322, "رسالة الشرق المتجدد (مطالعة - ميخائيل نعيمة)": 323, "فن الرواية (قراءة تمهيدية)": 324, "المصابيح الزرق (نص روائي - حنا مينة)": 325, "دمشق يا بسمة الحزن (نص روائي - ألفة الإدلبي)": 326, "عوامل تجديد الرواية العربية (مطالعة - د. نضال الصالح)": 327, "الشعر الوجداني (قراءة تمهيدية)": 328, "الوطن (نص أدبي - عدنان مردم بك)": 329, "لوعة الفراق (نص أدبي - بدر الدين الحامد)": 330, "الأمير الدمشقي (نص أدبي - نزار قباني)": 331, "مهمة الشعر (مطالعة - د. نعيم اليافي)": 332, "الأدب الاجتماعي (قراءة تمهيدية)": 333, "قوة العلم (نص أدبي - محمود سامي البارودي)": 334, "مروءة وسخاء (نص أدبي - خير الدين الزركلي)": 335, "رسالة حب (مطالعة - سلمى الحفار الكزبري)": 336};

﻿import { app, auth, db, onAuthStateChanged, signOut, collection, getDocs, getDoc, doc, setDoc, updateDoc, query, where, addDoc, deleteDoc } from './firebase-init.js';

const state = {
  data: null,
  lessons: [],
  units: [],
  unitIndex: 0,
  weekly: [],
  exams: [],
  examTimer: null,
  weeklyTimer: null,
  weeklyActivity: null
};

const page = document.body.dataset.page;
const $ = (id) => document.getElementById(id);
const esc = (v = "") => String(v).replace(/[&<>"']/g, c => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#039;"
}[c]));
const attr = esc;

const subjectsFallback = [
  "الرياضيات", "الفيزياء", "الكيمياء", "الأحياء",
  "اللغة العربية", "اللغة الإنجليزية", "التربية الدينية"
];

// الأيام الدراسية الخمسة المعتمدة فقط (من الأحد إلى الخميس)
const WEEKDAYS = [
  { key: "الجمعة", label: "الجمعة", short: "جمعة" },
  { key: "السبت", label: "السبت", short: "سبت" },
  { key: "الأحد", label: "الأحد", short: "أحد" },
  { key: "الإثنين", label: "الإثنين", short: "إثنين" },
  { key: "الثلاثاء", label: "الثلاثاء", short: "ثلاثاء" },
  { key: "الأربعاء", label: "الأربعاء", short: "أربعاء" },
  { key: "الخميس", label: "الخميس", short: "خميس" }
];

const LEVANT_MONTHS_SHORT = [
  "كانون 2", "شباط", "آذار", "نيسان", "أيار", "حزيران",
  "تموز", "آب", "أيلول", "تشرين 1", "تشرين 2", "كانون 1"
];

const LEVANT_MONTHS_FULL = [
  "كانون الثاني", "شباط", "آذار", "نيسان", "أيار", "حزيران",
  "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"
];

const GREGORIAN_MONTHS = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];

// دالة معالجة الامتحانات لمنع حدوث خطأ toExam is not defined
function toExam(item) {
  if (!item) return { id: "", subject: "", name: "", at: "" };
  return {
    id: item.id || "",
    subject: item.subject || item.title || "مادة غير محددة",
    name: item.name || item.exam || item.subject || "امتحان",
    at: item.at || item.date || item.dateTime || ""
  };
}
// إتاحتها في النطاق العام لمنع أي خطأ غير متوقع
window.toExam = toExam;

function normDay(str = "") {
  return String(str)
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .trim();
}

function getTasksForDay(dayName, weeklyList = state.weekly) {
  const target = normDay(dayName);
  return (weeklyList || []).filter(item => normDay(item.day) === target);
}

function bar(percent, cls = "") {
  const p = Math.max(0, Math.min(100, Number(percent) || 0));
  return `<div class="progress ${cls}"><span style="width:${p}%"></span></div>`;
}

function shell({title, subtitle = "", active = ""}, content) {
  document.title = `${title} | خُطى | رفيقك نحو التفوق`;
  const appEl = $("app");
  if (!appEl) return;
  
  // Fetch user info to show/hide admin link
  const user = auth.currentUser;
const data = { user: user ? { name: (state.userProfile && state.userProfile.name) || user.displayName || user.email.split('@')[0], role: 'user' } : null };
if (true) {
    const isAdmin = data.user && data.user.role === 'admin';
    const adminLink = isAdmin ? `<a href="/admin">لوحة المشرف</a>` : "";
    const userName = data.user ? `<span style="margin-left:10px;">${data.user.name}</span>` : "";

    appEl.innerHTML = `
      <main class="container">
        <header class="topbar">
          <a class="brand" href="index.html">
            <img src="logo.jpg" alt="Logo" style="height: 40px; border-radius: 5px; margin-left: 10px; mix-blend-mode: multiply;">
            <span><b>خُطى</b><small>رفيقك نحو التفوق</small></span>
          </a>
          <nav class="nav">
            <a class="${active === "dashboard" ? "active" : ""}" href="index.html">الرئيسية</a>
            <a class="${active === "subjects" ? "active" : ""}" href="subjects.html">المواد</a>
            <a class="${active === "weekly" ? "active" : ""}" href="weekly.html">الجدول</a>
            <a class="${active === "exams" ? "active" : ""}" href="exams.html">الامتحانات</a>
            <a class="${active === "channels" ? "active" : ""}" href="channels.html">القنوات</a>
            ${adminLink}
          </nav>
          <div class="top-actions">
            ${userName}
            <button id="refresh" class="icon-btn" title="تحديث">↻</button>
            <button id="logout" class="secondary">خروج</button>
          </div>
        </header>
        <section class="page-heading">
          <div>
            <span class="eyebrow">خُطى | رفيقك نحو التفوق</span>
            <h1>${title}</h1>
            ${subtitle ? `<p>${subtitle}</p>` : ""}
          </div>
        </section>
        <div id="error" class="error hidden"></div>
        ${content}
        <footer style="text-align: center; padding: 25px 20px; font-size: 0.9em; background: linear-gradient(135deg, #f0f7ff, #e6f0fa); color: #333; margin-top: 50px; border-top: 2px solid #cce0ff; border-radius: 10px 10px 0 0;">
          <strong style="color: #4285F4; font-size: 1.1em;">خُطى | رفيقك نحو التفوق</strong><br>
          جميع الحقوق محفوظة المبرمج معاذ الصبوح &copy; ${new Date().getFullYear()}<br>
          <div style="margin-top: 15px; display: flex; justify-content: center; gap: 20px; align-items: center;">
            <a href="https://github.com/MoazAlsabouh/" target="_blank" title="GitHub">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#333"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/moazalsabouh/" target="_blank" title="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#0077b5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://x.com/moazAlsabouh" target="_blank" title="X (Twitter)">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#1da1f2"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </footer>
      </main>`;

    const logoutBtn = $("logout");
    if (logoutBtn) {
      logoutBtn.onclick = async () => {
        await signOut(auth);
        location.href = "/login.html";
      };
    }

    const refreshBtn = $("refresh");
    if (refreshBtn) {
      refreshBtn.onclick = () => location.reload();
    }
  }
}



function showError(error) {
  const box = $("error");
  if (!box) return;
  box.textContent = `⚠️ ${error.message || error}`;
  box.classList.remove("hidden");
}

function hideError() {
  const box = $("error");
  if (box) box.classList.add("hidden");
}



async function fetchUserProfile() {
  if (!auth.currentUser) return null;
  try {
    const docSnap = await getDoc(doc(db, 'users', auth.currentUser.uid));
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (e) {}
  return { name: auth.currentUser.displayName || auth.currentUser.email.split('@')[0], stream: 'علمي' };
}

async function fetchLessons() {
  const q = query(collection(db, "lessons"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function fetchProgress() {
  if (!auth.currentUser) return [];
  const q = query(collection(db, "progress"), where("user", "==", auth.currentUser.uid));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function fetchExams() {
  if (!auth.currentUser) return [];
  const q = query(collection(db, "exams"), where("user", "==", auth.currentUser.uid));
  const snap = await getDocs(q);
  const exams = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  return exams.sort((a, b) => new Date(a.at) - new Date(b.at));
}

async function fetchChannels() {
  if (!auth.currentUser) return [];
  const q = query(collection(db, "channels"), where("user", "==", auth.currentUser.uid));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function fetchWeeklyTasks() {
  if (!auth.currentUser) return [];
  const q = query(collection(db, "weeklyTasks"), where("user", "==", auth.currentUser.uid));
  const snap = await getDocs(q);
  const tasks = snap.docs.map(d => ({ id: d.id, ...d.data() }));

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - ((now.getDay() + 2) % 7)); // Align to Friday
  startOfWeek.setHours(0,0,0,0);
  
  for (const t of tasks) {
    if (t.done && t.doneDate) {
      if (new Date(t.doneDate) < startOfWeek) {
        t.done = false;
        t.doneDate = null;
        updateDoc(doc(db, 'weeklyTasks', t.id), { done: false, doneDate: null }).catch(e=>console.error(e));
      }
    }
  }
  return tasks;
}

async function fetchWeeklyActivities() {
  if (!auth.currentUser) return { weeks: [], current: null, window: {} };
  
  const q = query(collection(db, "weeklyActivity"), where("user", "==", auth.currentUser.uid));
  const snap = await getDocs(q);
  const activities = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  
  // Generate 52 weeks starting from Sunday, Aug 30, 2026
  const academicYearStart = new Date("2026-08-28T00:00:00Z");
  const weeks = [];
  for (let i = 0; i < 52; i++) {
    const start = new Date(academicYearStart);
    start.setUTCDate(start.getUTCDate() + (i * 7));
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 6);
    
    const startStr = start.toISOString().slice(0, 10);
    const endStr = end.toISOString().slice(0, 10);
    
    const saved = activities.find(a => a.start === startStr);
    weeks.push({
      start: startStr,
      end: endStr,
      completed: saved ? saved.completed : 0,
      percent: saved ? saved.percent : 0,
      days: saved ? saved.days : {}
    });
  }
  
  const now = new Date();
  const startDay = new Date(now);
  startDay.setDate(now.getDate() - ((now.getDay() + 2) % 7)); // Align to Friday
  startDay.setHours(0,0,0,0);
  const endDay = new Date(startDay);
  endDay.setDate(startDay.getDate() + 6);
  
  const currentWindow = { start: startDay.toISOString().slice(0, 10), end: endDay.toISOString().slice(0, 10) };
  let current = weeks.find(a => a.start === currentWindow.start);
  
  return { weeks, current, window: currentWindow };
}

async function loadProgress() {
  const user = auth.currentUser;
  if (!user) return { overallPercent: 0, totalLessons: 0, subjects: [], stages: [] };

  const [allLessons, progressList, userProfile] = await Promise.all([
    fetchLessons(),
    fetchProgress(),
    fetchUserProfile()
  ]);
  state.userProfile = userProfile;
  const lessons = allLessons.filter(x => !x.stream || x.stream === 'مشترك' || x.stream === userProfile.stream);


  const progressMap = {};
  progressList.forEach(p => { progressMap[p.lesson] = p; });

  const subjects = [...new Set(lessons.map(x => x.subject).filter(Boolean))].sort();
  const stages = [["first","الدراسة الأولى"],["review1","المراجعة الأولى"],["review2","المراجعة الثانية"],["retention","مراجعة التثبيت"],["final","المراجعة الامتحانية الأخيرة"]];

  const stageProgress = Object.fromEntries(stages.map(([key, label]) => { 
    const done = lessons.filter(x => progressMap[x.id]?.[key]).length; 
    return [key, {label, done, total: lessons.length, percent: lessons.length ? Math.round((done/lessons.length)*100) : 0}]; 
  }));

  const subjectProgress = subjects.map(subject => { 
    const rows = lessons.filter(x => x.subject === subject); 
    const stage = Object.fromEntries(stages.map(([key, label]) => {
      const done = rows.filter(x => progressMap[x.id]?.[key]).length;
      return [key, {label, done, total: rows.length, percent: rows.length ? Math.round((done/rows.length)*100) : 0}];
    })); 
    const completedStages = rows.reduce((sum, x) => sum + stages.filter(([key]) => progressMap[x.id]?.[key]).length, 0); 
    const totalChecks = rows.length * stages.length; 
    return {subject, lessons: rows.length, percent: totalChecks ? Math.round((completedStages/totalChecks)*100) : 0, stages: stage}; 
  });

  const totalChecks = lessons.length * stages.length; 
  const completedChecks = lessons.reduce((sum, x) => sum + stages.filter(([key]) => progressMap[x.id]?.[key]).length, 0);

  state.data = { academicYear: "2026/2027", updatedAt: new Date().toISOString(), totalLessons: lessons.length, overallPercent: totalChecks ? Math.round((completedChecks/totalChecks)*100) : 0, stages: stageProgress, subjects: subjectProgress };
  return state.data;
}


function countdown(at) {
  if (!at) return { expired: true, text: "لم يحدد موعد" };
  const diff = new Date(at).getTime() - Date.now();
  if (!Number.isFinite(diff) || diff <= 0) return { expired: true, text: "انتهى الموعد" };
  const total = Math.floor(diff / 1000);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return {
    expired: false,
    text: `${days} يوم • ${hours} س • ${minutes} د • ${seconds} ث`,
    days, hours, minutes, seconds
  };
}

function formatTime12(timeStr) {
  if (!timeStr) return "";
  const parts = String(timeStr).trim().split(":");
  if (parts.length < 2) return timeStr;
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1].slice(0, 2);
  if (isNaN(hours)) return timeStr;
  const period = hours >= 12 ? "م" : "ص";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${period}`;
}

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "—";
  let hours = d.getHours();
  const mins = String(d.getMinutes()).padStart(2, "0");
  const period = hours >= 12 ? "م" : "ص";
  hours = hours % 12 || 12;
  return `${d.getDate()} ${LEVANT_MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}، ${hours}:${mins} ${period}`;
}

function renderDashboard(d, examsList = []) {
  const safeExams = Array.isArray(examsList) ? examsList.map(toExam) : [];
  const upcoming = safeExams
    .filter(x => x.at && new Date(x.at).getTime() > Date.now())
    .sort((a, b) => new Date(a.at) - new Date(b.at))[0];

  const overall = Number(d?.overallPercent) || 0;
  const totalLessons = d?.totalLessons || 0;
  const subjectsList = Array.isArray(d?.subjects) ? d.subjects : [];
  const stagesList = d?.stages && typeof d.stages === "object" ? Object.values(d.stages) : [];
  const totalDoneStages = stagesList.reduce((s, x) => s + (Number(x.done) || 0), 0);

  shell({
    title: "لوحة التحكم",
    subtitle: "ملخص سريع للتقدم العام وموعد الامتحان القادم.",
    active: "dashboard"
  }, `
    <section class="hero-grid">
      <article class="card overall-card">
        <div class="card-kicker">التقدم العام</div>
        <div class="overall-value">${overall}%</div>
        ${bar(overall)}
        <div class="stats-row">
          <div><b>${totalLessons}</b><span>درسًا</span></div>
          <div><b>${subjectsList.length}</b><span>مواد</span></div>
          <div><b>${totalDoneStages}</b><span>مراحل منجزة</span></div>
        </div>
      </article>
      <article class="card exam-hero">
        <div class="card-kicker">⏳ الامتحان القادم</div>
        ${upcoming ? `
          <h2>${esc(upcoming.name || upcoming.subject)}</h2>
          <p class="muted">${esc(upcoming.subject)} • ${formatDate(upcoming.at)}</p>
          <div id="mainCountdown" class="countdown-big">${countdown(upcoming.at).text}</div>
          <a class="button" href="exams.html">عرض كل الامتحانات</a>
        ` : `<div class="empty compact">لا يوجد امتحان قادم مسجل حاليًا.<br><a href="exams.html">أضف أول امتحان</a></div>`}
      </article>
    </section>

    <section class="section-block">
      <div class="section-title">
        <div>
          <h2>📊 نظرة سريعة على المواد</h2>
          <p>اضغط على أي مادة لفتح صفحتها وتفاصيل الوحدات والدروس.</p>
        </div>
        <a class="button secondary" href="subjects.html">كل المواد</a>
      </div>
      <div class="subject-grid">
        ${subjectsList.map(s => `
          <a class="subject-card" href="subject.html?name=${encodeURIComponent(s.subject)}">
            <div class="subject-card-head">
              <span>${esc(s.subject)}</span>
              <strong>${s.percent || 0}%</strong>
            </div>
            ${bar(s.percent || 0, "mini-progress")}
            <small>${s.lessons || 0} درس</small>
          </a>
        `).join("")}
      </div>
    </section>

    <section class="section-block">
      <div class="section-title">
        <div>
          <h2>🧭 مراحل الدراسة</h2>
          <p>تقدم كل مرحلة على مستوى جميع الدروس.</p>
        </div>
      </div>
      <div class="stage-grid">
        ${stagesList.map(s => `
          <article class="stage-card">
            <strong>${s.percent || 0}%</strong>
            <b>${esc(s.label || "مرحلة")}</b>
            <span>${s.done || 0} من ${s.total || 0} درس</span>
            ${bar(s.percent || 0)}
          </article>
        `).join("")}
      </div>
    </section>`);

  if (upcoming) {
    clearInterval(state.examTimer);
    const update = () => {
      const el = $("mainCountdown");
      if (el) el.textContent = countdown(upcoming.at).text;
    };
    update();
    state.examTimer = setInterval(update, 1000);
  }
}

async function dashboardPage() {
  try {
    const [d, rawExams] = await Promise.all([
      loadProgress(),
      fetchExams()
    ]);
    const safeExams = Array.isArray(rawExams) ? rawExams.map(toExam) : [];
    renderDashboard(d, safeExams);
  } catch (e) {
    shell({
      title: "لوحة التحكم",
      subtitle: "ملخص الدراسة لعام 2026/2027.",
      active: "dashboard"
    }, `<div class="card empty">تعذر تحميل البيانات.</div>`);
    showError(e);
  }
}

async function subjectsPage() {
  shell({
    title: "المواد",
    subtitle: "كل مادة لها صفحة مستقلة حتى تبقى الدراسة مرتبة وواضحة.",
    active: "subjects"
  }, `<div id="subjectPageGrid" class="subject-grid large"></div>`);

  try {
    const d = await loadProgress();
    const subjects = Array.isArray(d?.subjects) ? d.subjects : [];
    const gridEl = $("subjectPageGrid");
    if (!gridEl) return;

    gridEl.innerHTML = subjects.map(s => {
      const stages = s.stages && typeof s.stages === "object" ? Object.values(s.stages) : [];
      return `
        <a class="subject-card detailed" href="subject.html?name=${encodeURIComponent(s.subject)}">
          <div class="subject-card-head">
            <span>${esc(s.subject)}</span>
            <strong>${s.percent || 0}%</strong>
          </div>
          ${bar(s.percent || 0)}
          <div class="subject-meta">
            <span>${s.lessons || 0} درس</span>
            <span>فتح المادة ←</span>
          </div>
          <div class="tiny-stages">
            ${stages.map(x => `<span>${esc(x.label)}: <b>${x.percent || 0}%</b></span>`).join("")}
          </div>
        </a>`;
    }).join("");
  } catch (e) {
    showError(e);
  }
}

function subjectFromUrl() {
  return new URLSearchParams(location.search).get("name") || "";
}

function renderSubjectPage(d, subjectName) {
  const subject = (d?.subjects || []).find(x => x.subject === subjectName);
  if (!subject) {
    shell({
      title: "المادة غير موجودة",
      subtitle: "اختر مادة من قائمة المواد.",
      active: "subjects"
    }, `<div class="card empty"><a class="button" href="subjects.html">العودة إلى المواد</a></div>`);
    return;
  }

  const stages = subject.stages && typeof subject.stages === "object" ? Object.values(subject.stages) : [];

  shell({
    title: subject.subject,
    subtitle: `${subject.lessons} درس • إنجاز المادة ${subject.percent}%`,
    active: "subjects"
  }, `
    <section class="subject-summary card">
      <div>
        <span class="card-kicker">تقدم المادة</span>
        <strong class="summary-percent">${subject.percent}%</strong>
      </div>
      <div class="summary-progress">
        ${bar(subject.percent)}
        <small>يمكنك فتح الوحدات والتنقل بينها دون ازدحام الصفحة.</small>
      </div>
    </section>
    <section class="stage-grid compact-stages">
      ${stages.map(s => `
        <article class="stage-card">
          <strong>${s.percent}%</strong>
          <b>${esc(s.label)}</b>
          <span>${s.done} من ${s.total}</span>
          ${bar(s.percent)}
        </article>
      `).join("")}
    </section>
    <section class="card lessons-card">
      <div class="section-title">
        <div>
          <h2>📖 وحدات المادة</h2>
          <p>نعرض وحدة واحدة في كل مرة لتكون المتابعة أسلس.</p>
        </div>
        <a class="button secondary" href="subjects.html">← كل المواد</a>
      </div>
      <div class="unit-toolbar">
        <button id="prevUnit" class="secondary">→ السابقة</button>
        <div class="unit-current">
          <span id="unitCounter">—</span>
          <strong id="unitTitle">—</strong>
        </div>
        <button id="nextUnit" class="secondary">التالية ←</button>
      </div>
      <div id="unitProgress"></div>
      <div id="lessons" class="lessons"></div>
    </section>
    <section class="card">
      <div class="section-title">
        <div>
          <h2>🎥 مصادر هذه المادة</h2>
          <p>القنوات وقوائم التشغيل المرتبطة بالمادة.</p>
        </div>
        <a class="button secondary" href="channels.html">إدارة المصادر</a>
      </div>
      <div id="subjectChannels" class="channels"></div>
    </section>`);
}

function getUnitsForSubject(subjectName) {
  const rows = state.lessons.filter(x => x.subject === subjectName);
  const units = [...new Set(rows.map(x => x.unit || "دروس بدون وحدة"))];
  return { rows, units };
}

function renderLessons(subjectName) {
  const { rows, units } = getUnitsForSubject(subjectName);
  if (!units.length) {
    $("unitCounter").textContent = "لا توجد وحدات";
    $("unitTitle").textContent = "—";
    $("unitProgress").innerHTML = "";
    $("lessons").innerHTML = `<div class="empty">لا توجد دروس مسجلة لهذه المادة.</div>`;
    $("prevUnit").disabled = $("nextUnit").disabled = true;
    return;
  }

  state.unitIndex = Math.max(0, Math.min(state.unitIndex, units.length - 1));
  const unit = units[state.unitIndex];
  const unitRows = rows.filter(x => (x.unit || "دروس بدون وحدة") === unit).sort((a, b) => (LESSON_ORDER[a.lesson] ?? 9999) - (LESSON_ORDER[b.lesson] ?? 9999));
  const checks = unitRows.reduce((sum, x) => sum + x.stages.filter(s => s.checked).length, 0);
  const total = unitRows.length * 5;
  const percent = total ? Math.round((checks / total) * 100) : 0;

  $("unitCounter").textContent = `الوحدة ${state.unitIndex + 1} من ${units.length}`;
  $("unitTitle").textContent = unit;
  $("unitProgress").innerHTML = `
    <div class="unit-progress-head">
      <span>إنجاز الوحدة</span>
      <strong>${percent}%</strong>
    </div>
    ${bar(percent)}`;

  $("lessons").innerHTML = unitRows.map(x => `
    <article class="lesson-row">
      <div class="lesson-info">
        <strong>${esc(x.lesson)}</strong>
        <p>${x.page ? `صفحة ${esc(x.page)}` : ""}</p>
      </div>
      <div class="checks">
        ${x.stages.map(s => `
          <label>
            <input type="checkbox" ${s.checked ? "checked" : ""} data-id="${attr(x.id)}" data-prop="${attr(s.property)}">
            ${esc(s.label)}
          </label>
        `).join("")}
      </div>
    </article>
  `).join("");

  $("prevUnit").disabled = state.unitIndex === 0;
  $("nextUnit").disabled = state.unitIndex >= units.length - 1;

  document.querySelectorAll("#lessons input[data-id]").forEach(cb => {
    cb.onchange = async e => {
      const el = e.target;
      try {
        const allowed = { "الدراسة الأولى": "first", "المراجعة الأولى": "review1", "المراجعة الثانية": "review2", "مراجعة التثبيت": "retention", "المراجعة الامتحانية الأخيرة": "final" };
  const key = allowed[el.dataset.prop];
  const q = query(collection(db, "progress"), where("user", "==", auth.currentUser.uid), where("lesson", "==", el.dataset.id));
  const snap = await getDocs(q);
  if (!snap.empty) {
    await updateDoc(snap.docs[0].ref, { [key]: el.checked });
  } else {
    await addDoc(collection(db, "progress"), { user: auth.currentUser.uid, lesson: el.dataset.id, [key]: el.checked });
  }
        const old = state.unitIndex;
        await loadProgress();
        await loadLessonsForSubject(subjectName, false);
        state.unitIndex = old;
        renderLessons(subjectName);
      } catch (err) {
        el.checked = !el.checked;
        showError(err);
      }
    };
  });
}

async function loadLessonsForSubject(subjectName, reset = true) {
  state.lessons = await (async function() {
  const [allLessons, progressList, userProfile] = await Promise.all([
    fetchLessons(),
    fetchProgress(),
    fetchUserProfile()
  ]);
  state.userProfile = userProfile;
  const lessons = allLessons.filter(x => !x.stream || x.stream === 'مشترك' || x.stream === userProfile.stream);

  const progressMap = {};
  progressList.forEach(p => { progressMap[p.lesson] = p; });
  const stages = [["first","الدراسة الأولى"],["review1","المراجعة الأولى"],["review2","المراجعة الثانية"],["retention","مراجعة التثبيت"],["final","المراجعة الامتحانية الأخيرة"]];
  return lessons.map(x => {
    const p = progressMap[x.id] || {};
    return {
      id: x.id, lesson: x.lesson, subject: x.subject, unit: x.unit,
      stages: stages.map(([key, label]) => ({ property: label, label, checked: !!p[key] }))
    };
  });
})();
  if (reset) state.unitIndex = 0;
  renderLessons(subjectName);
}

async function renderSubjectChannels(subjectName) {
  const rows = (await fetchChannels()).filter(x => x.subject === subjectName);
  $("subjectChannels").innerHTML = rows.length
    ? rows.map(channelCard).join("")
    : `<div class="empty">لا توجد مصادر مسجلة لهذه المادة حتى الآن.</div>`;
}

function channelCard(x) {
  return `
    <article class="channel">
      <span class="tag">${esc(x.subject || "")}</span>
      <h3>${esc(x.name || "قناة بدون اسم")}</h3>
      ${x.channelUrl ? `<a href="${attr(x.channelUrl)}" target="_blank" rel="noopener noreferrer">🎥 فتح القناة</a>` : ""}
      ${x.playlistName ? (x.playlistUrl ? `<a href="${attr(x.playlistUrl)}" target="_blank" rel="noopener noreferrer">▶ ${esc(x.playlistName)}</a>` : `<span class="source-note">▶ ${esc(x.playlistName)}</span>`) : ""}
      ${x.notes ? `<p>${esc(x.notes)}</p>` : ""}
      ${x.user === auth.currentUser?.uid ? `<button class="danger-link" data-del-channel="${attr(x.id)}" style="margin-top: 10px; font-size: 0.8em;">حذف المصدر</button>` : ""}
    </article>`;
}

async function subjectPage() {
  const subjectName = subjectFromUrl();
  try {
    const d = await loadProgress();
    renderSubjectPage(d, subjectName);
    if (!d.subjects.some(x => x.subject === subjectName)) return;
    await loadLessonsForSubject(subjectName);
    await renderSubjectChannels(subjectName);
    $("prevUnit").onclick = () => {
      if (state.unitIndex > 0) {
        state.unitIndex--;
        renderLessons(subjectName);
      }
    };
    $("nextUnit").onclick = () => {
      const { units } = getUnitsForSubject(subjectName);
      if (state.unitIndex < units.length - 1) {
        state.unitIndex++;
        renderLessons(subjectName);
      }
    };
  } catch (e) {
    if (!document.getElementById("app").innerHTML) {
      shell({ title: "المادة", active: "subjects" }, "");
    }
    showError(e);
  }
}

function weeklyForm() {
  return `
    <form id="weeklyForm" class="form-grid">
      <select name="day" required>
        ${WEEKDAYS.map(x => `<option value="${x.key}">${x.label}</option>`).join("")}
      </select>
      <input name="subject" placeholder="المادة" required>
      <input name="task" placeholder="المهمة / الدرس" required>
      <input name="time" type="time" aria-label="الوقت">
      <button class="button" type="submit">＋ إضافة</button>
    </form>`;
}

function activityLevelClass(percent) {
  const p = Number(percent) || 0;
  if (p <= 0) return "activity-0";
  if (p < 25) return "activity-1";
  if (p < 50) return "activity-2";
  if (p < 75) return "activity-3";
  if (p < 100) return "activity-4";
  return "activity-5";
}

function weekLabel(x) {
  if (!x?.start) return "أسبوع";
  const start = new Date(`${x.start}T00:00:00Z`);
  const end = new Date(`${x.end}T00:00:00Z`);
  const fmt = d => `${d.getUTCDate()} ${LEVANT_MONTHS_SHORT[d.getUTCMonth()]}`;
  return `${fmt(start)} — ${fmt(end)}`;
}

function getDateForCell(weekStartStr, dayOffset) {
  if (!weekStartStr) return null;
  const d = new Date(`${weekStartStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + dayOffset);
  return d;
}

function renderWeeklyActivity(payload) {
  const rawWeeks = Array.isArray(payload?.weeks) ? payload.weeks : [];
  const weeks = rawWeeks.slice().sort((a, b) => {
    return new Date(`${a.start}T00:00:00Z`).getTime() - new Date(`${b.start}T00:00:00Z`).getTime();
  });

  const current = payload?.current;
  state.weeklyActivity = payload;

  const totalCompleted = weeks.reduce((sum, x) => sum + Number(x.completed || 0), 0);
  const activeWeeks = weeks.filter(x => Number(x.completed || 0) > 0).length;
  const average = weeks.length ? Math.round(weeks.reduce((sum, x) => sum + Number(x.percent || 0), 0) / weeks.length) : 0;

  // تجميع الأسابيع حسب الشهور المتعاقبة
  const monthBlocks = [];
  let curBlock = null;

  weeks.forEach((w, idx) => {
    const d = new Date(`${w.start}T00:00:00Z`);
    if (isNaN(d.getTime())) return;
    const m = d.getUTCMonth();
    const y = d.getUTCFullYear();
    const key = `${y}-${m}`;
    if (!curBlock || curBlock.key !== key) {
      if (curBlock) monthBlocks.push(curBlock);
      curBlock = { key, m, y, startCol: idx + 1, span: 1 };
    } else {
      curBlock.span++;
    }
  });
  if (curBlock) monthBlocks.push(curBlock);

  const cellDataStore = [];

  const gridHtml = weeks.map((w) => {
    const isCurrentWeek = Boolean(current && w.start === current.start);

    return WEEKDAYS.map((dayObj, dayIdx) => {
      let dayCompleted = 0;
      let dayTotal = 0;
      let dayPercent = 0;

      if (isCurrentWeek) {
        // حساب إنجاز اليوم بدقة متناهية من مهام المستخدم المحددة للأسبوع الحالي
        const tasks = getTasksForDay(dayObj.key, state.weekly);
        dayTotal = tasks.length;
        dayCompleted = tasks.filter(t => t.done).length;
        dayPercent = dayTotal > 0 ? Math.round((dayCompleted / dayTotal) * 100) : 0;
      } else if (w.days && typeof w.days === "object") {
        const dayRecord = Array.isArray(w.days) ? w.days[dayIdx] : (w.days[dayObj.key] || w.days[normDay(dayObj.key)]);
        if (dayRecord) {
          dayCompleted = Number(dayRecord.completed || 0);
          dayTotal = Number(dayRecord.total || 0);
          dayPercent = Number(dayRecord.percent || 0);
        }
      }

      const cellDate = getDateForCell(w.start, dayIdx);
      const dateText = cellDate ? `${cellDate.getUTCDate()} ${LEVANT_MONTHS_SHORT[cellDate.getUTCMonth()]}` : "";
      const storeIndex = cellDataStore.length;

      cellDataStore.push({
        dayName: dayObj.label,
        dateText,
        completed: dayCompleted,
        total: dayTotal,
        percent: dayPercent,
        weekText: weekLabel(w),
        isCurrent: isCurrentWeek
      });

      const titleAttr = `${dayObj.label} (${dateText}) • ${dayCompleted}/${dayTotal} منجز (${dayPercent}%)`;

      return `<button type="button"
        class="activity-cell ${activityLevelClass(dayPercent)} ${isCurrentWeek ? "is-current-week" : ""}"
        title="${esc(titleAttr)}"
        aria-label="${esc(titleAttr)}"
        data-store-idx="${storeIndex}">
      </button>`;
    }).join("");
  }).join("");

  const targetEl = $("weeklyActivity");
  if (!targetEl) return;

  targetEl.innerHTML = `
    <section class="weekly-activity card">
      <div class="section-title activity-heading">
        <div>
          <h2>📈 نشاط السنة الدراسية</h2>
          <p>كل مربع يمثل يومًا دراسيًا مستقلاً، ويتم تحديث نسبة الإنجاز يوميًا.</p>
        </div>
        <span class="current-week-badge">الأسبوع الحالي: ${current ? esc(weekLabel(current)) : ""}</span>
      </div>
      <div class="activity-summary">
        <div><strong>${activeWeeks}</strong><span>أسابيع نشطة</span></div>
        <div><strong>${totalCompleted}</strong><span>مهام منجزة</span></div>
        <div><strong>${average}%</strong><span>متوسط النشاط</span></div>
        <div><strong>${state.weekly ? state.weekly.filter(t=>t.done).length : 0}/${state.weekly ? state.weekly.length : 0}</strong><span>هذا الأسبوع</span></div>
      </div>
      <div class="activity-scroll">
        <div class="activity-calendar">
          <div class="activity-months-wrap">
            <div class="activity-weekday-spacer"></div>
            <div class="activity-months" style="grid-template-columns: repeat(${weeks.length || 53}, 14px);">
              ${monthBlocks.map(b => {
                const name = LEVANT_MONTHS_SHORT[b.m];
                const fullName = `${LEVANT_MONTHS_FULL[b.m]} (${GREGORIAN_MONTHS[b.m]} ${b.y})`;
                return `<span style="grid-column:${b.startCol} / span ${b.span}" class="activity-month-label" title="${esc(fullName)}">${esc(name)}</span>`;
              }).join("")}
            </div>
          </div>
          <div class="activity-board">
            <div class="activity-weekdays" aria-hidden="true">
              ${WEEKDAYS.map(d => `<span title="${d.label}">${d.label}</span>`).join("")}
            </div>
            <div class="activity-grid" aria-label="خريطة النشاط اليومي">
              ${gridHtml}
            </div>
          </div>
        </div>
      </div>
      <div class="activity-legend">
        <span>أقل</span>
        <i class="activity-cell activity-0" title="0%"></i>
        <i class="activity-cell activity-1" title="1-24%"></i>
        <i class="activity-cell activity-2" title="25-49%"></i>
        <i class="activity-cell activity-3" title="50-74%"></i>
        <i class="activity-cell activity-4" title="75-99%"></i>
        <i class="activity-cell activity-5" title="100%"></i>
        <span>أعلى</span>
      </div>
      <div id="activityDetails" class="activity-details"></div>
    </section>`;

  document.querySelectorAll("[data-store-idx]").forEach(btn => {
    btn.onclick = () => {
      const item = cellDataStore[Number(btn.dataset.storeIdx)];
      if (!item) return;
      const detailsEl = $("activityDetails");
      if (detailsEl) {
        detailsEl.innerHTML = `
          <div>
            <b>${esc(item.dayName)} (${esc(item.dateText)})</b>
            <span>${item.completed} من ${item.total} مهام مكتملة</span>
            <strong>${item.percent}%</strong>
            <small style="color:var(--muted)">[الأسبوع: ${esc(item.weekText)}]</small>
          </div>`;
      }
    };
  });
}

function renderWeekly(rows) {
  const currentDayIndex = new Date().getDay();
  // تحويل مؤشر اليوم ليتوافق مع أيام الدراسة (الأحد = 0)
  const studyDaysIndices = [0, 1, 2, 3, 4];
  const todayKey = studyDaysIndices.includes(currentDayIndex) ? WEEKDAYS[currentDayIndex].key : "الأحد";

  const listEl = $("weeklyList");
  if (!listEl) return;

  listEl.innerHTML = WEEKDAYS.map(d => {
    const items = getTasksForDay(d.key, rows);
    if (!items.length) return "";
    const doneCount = items.filter(x => x.done).length;
    const isToday = normDay(d.key) === normDay(todayKey);

    return `
      <section class="day-block ${isToday ? "today" : ""}">
        <div class="day-head">
          <h3>${d.label}</h3>
          <span>${doneCount}/${items.length} منجز</span>
        </div>
        ${items.map(x => `
          <article class="task-row">
            <label>
              <input type="checkbox" data-week-id="${attr(x.id)}" ${x.done ? "checked" : ""}>
              <span><b>${esc(x.subject)}</b> — ${esc(x.task)}${x.time ? ` <small>(${esc(formatTime12(x.time))})</small>` : ""}</span>
            </label>
            <button class="danger-link" data-delweek-id="${attr(x.id)}">حذف</button>
          </article>
        `).join("")}
      </section>`;
  }).join("") || `<div class="empty">لم تضف أي مهام بعد.</div>`;

  document.querySelectorAll("[data-week-id]").forEach(el => {
    el.onchange = async () => {
      try {
        await updateDoc(doc(db, 'weeklyTasks', el.dataset.weekId), { done: el.checked, doneDate: el.checked ? new Date().toISOString() : null });
        state.weekly = await fetchWeeklyTasks();
        renderWeekly(state.weekly);
        renderWeeklyActivity(await fetchWeeklyActivities());
      } catch (e) {
        el.checked = !el.checked;
        showError(e);
      }
    };
  });

  document.querySelectorAll("[data-delweek-id]").forEach(el => {
    el.onclick = async () => {
      try {
        await deleteDoc(doc(db, 'weeklyTasks', el.dataset.delweekId));
        state.weekly = await fetchWeeklyTasks();
        renderWeekly(state.weekly);
        renderWeeklyActivity(await fetchWeeklyActivities());
      } catch (e) {
        showError(e);
      }
    };
  });
}

async function refreshWeeklyView() {
  const before = state.weeklyActivity?.current?.start || "";
  state.weekly = await fetchWeeklyTasks();
  const activity = await fetchWeeklyActivities();
  renderWeekly(state.weekly);
  renderWeeklyActivity(activity);
  return before !== (activity.current?.start || "");
}

async function weeklyPage() {
  shell({
    title: "الجدول الأسبوعي",
    subtitle: "يُعاد ضبط علامات الإنجاز كل يوم خميس، ويُحفظ نشاط كل أسبوع في سجل السنة كاملة.",
    active: "weekly"
  }, `
    <section class="card">${weeklyForm()}</section>
    <div id="weeklyList" class="days"></div>
    <div id="weeklyActivity"></div>`);

  try {
    await refreshWeeklyView();
    const form = $("weeklyForm");
    if (form) {
      form.onsubmit = async e => {
        e.preventDefault();
        const f = new FormData(e.target);
        try {
          await addDoc(collection(db, 'weeklyTasks'), { user: auth.currentUser.uid, done: false, 
              day: f.get("day"),
              subject: f.get("subject"),
              task: f.get("task"),
              time: f.get("time")
             });
          e.target.reset();
          await refreshWeeklyView();
        } catch (err) {
          showError(err);
        }
      };
    }

    clearInterval(state.weeklyTimer);
    state.weeklyTimer = setInterval(async () => {
      try { await refreshWeeklyView(); } catch (e) { console.error(e); }
    }, 60000);
  } catch (e) {
    showError(e);
  }
}

function examCard(x) {
  const item = toExam(x);
  return `
    <article class="exam-card">
      <div>
        <span class="tag">${esc(item.subject)}</span>
        <h3>${esc(item.name)}</h3>
        <p>${formatDate(item.at)}</p>
      </div>
      <div class="exam-count" data-countdown="${attr(item.at)}">${countdown(item.at).text}</div>
      <button class="danger-link" data-delexam-id="${attr(item.id)}">حذف</button>
    </article>`;
}

function renderExams(rows) {
  const safeList = Array.isArray(rows) ? rows.map(toExam) : [];
  const sorted = [...safeList].sort((a, b) => new Date(a.at) - new Date(b.at));
  const listEl = $("examList");
  if (!listEl) return;

  listEl.innerHTML = sorted.length
    ? sorted.map(examCard).join("")
    : `<div class="empty">لا توجد امتحانات مسجلة.</div>`;

  document.querySelectorAll("[data-delexam-id]").forEach(el => {
    el.onclick = async () => {
      try {
        await deleteDoc(doc(db, 'exams', el.dataset.delexamId));
        state.exams = await fetchExams();
        renderExams(state.exams);
      } catch (e) {
        showError(e);
      }
    };
  });
}

function updateExamTimers() {
  document.querySelectorAll("[data-countdown]").forEach(el => {
    el.textContent = countdown(el.dataset.countdown).text;
  });
}

async function examsPage() {
  shell({
    title: "الامتحانات",
    subtitle: "كل المواعيد والامتحانات محفوظة بدقة، والعد التنازلي يتحدث تلقائياً.",
    active: "exams"
  }, `
    <section class="card">
      <form id="examForm" class="form-grid">
        <input name="subject" placeholder="المادة" required>
        <input name="name" placeholder="اسم الامتحان">
        <input name="date" type="date" required>
        <input name="time" type="time" required>
        <button class="button" type="submit">＋ إضافة امتحان</button>
      </form>
    </section>
    <div id="examList" class="exam-list"></div>`);

  try {
    state.exams = await fetchExams();
    renderExams(state.exams);

    const form = $("examForm");
    if (form) {
      form.onsubmit = async e => {
        e.preventDefault();
        const f = new FormData(e.target);
        try {
          await addDoc(collection(db, 'exams'), { user: auth.currentUser.uid, 
              subject: f.get("subject"),
              name: f.get("name"),
              at: `${f.get("date")}T${f.get("time")}`
             });
          e.target.reset();
          state.exams = await fetchExams();
          renderExams(state.exams);
        } catch (err) {
          showError(err);
        }
      };
    }

    setInterval(updateExamTimers, 1000);
  } catch (e) {
    showError(e);
  }
}

function channelsForm() {
  return `
    <form id="channelForm" class="form-grid six">
      <input name="name" placeholder="اسم القناة" required>
      <select name="subject" required>
        <option value="">اختر المادة</option>
        ${subjectsFallback.map(x => `<option value="${x}">${x}</option>`).join("")}
      </select>
      <input name="channelUrl" type="url" placeholder="رابط القناة">
      <input name="playlistName" placeholder="اسم قائمة التشغيل">
      <input name="playlistUrl" type="url" placeholder="رابط قائمة التشغيل">
      <input name="notes" placeholder="ملاحظات">
      <button class="button" type="submit">＋ إضافة المصدر</button>
    </form>`;
}

async function channelsPage() {
  shell({
    title: "القنوات وقوائم التشغيل",
    subtitle: "اجمع مصادر الشرح في مكان واحد، ويمكنك أيضًا فتحها من صفحة كل مادة.",
    active: "channels"
  }, `
    <section class="card">${channelsForm()}</section>
    <div id="channelList" class="channels large"></div>`);

  try {
    const render = async () => {
      const rows = await fetchChannels();
      const listEl = $("channelList");
      if (listEl) {
        listEl.innerHTML = rows.length
          ? rows.map(channelCard).join("")
          : `<div class="empty">لا توجد مصادر بعد.</div>`;
        document.querySelectorAll("[data-del-channel]").forEach(btn => {
          btn.onclick = async () => {
            if(confirm('هل أنت متأكد من حذف هذا المصدر؟')) {
               try { await deleteDoc(doc(db, 'channels', btn.dataset.delChannel)); await render(); } catch(e) { showError(e); }
            }
          };
        });
      }
    };

    await render();

    const form = $("channelForm");
    if (form) {
      form.onsubmit = async e => {
        e.preventDefault();
        const f = new FormData(e.target);
        try {
          await addDoc(collection(db, 'channels'), { user: auth.currentUser.uid, ...Object.fromEntries(f.entries()) });
          e.target.reset();
          await render();
        } catch (err) {
          showError(err);
        }
      };
    }
  } catch (e) {
    showError(e);
  }
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  const init = async () => {
  hideError();
  try {
    if (page === "dashboard") return await dashboardPage();
    if (page === "subjects") return await subjectsPage();
    if (page === "subject") return await subjectPage();
    if (page === "weekly") return await weeklyPage();
    if (page === "exams") return await examsPage();
    if (page === "channels") return await channelsPage();
  } catch (err) {
    showError(err);
  }
};
init();
});
