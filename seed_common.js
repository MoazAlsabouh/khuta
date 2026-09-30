require("dotenv").config();
const mongoose = require("mongoose");
const Lesson = require("./models/Lesson");

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/study-dashboard")
  .then(async () => {
    console.log("Connected to MongoDB for seeding...");
    
    const lessons = [
      // التربية الإسلامية (مشترك)
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة القرآن الكريم (التلاوة)', lesson: 'نعم الله تعالى مدعاة للتوحيد والشكر' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة القرآن الكريم (التلاوة)', lesson: 'الله وحده هو الخالق المتصرف' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة القرآن الكريم (التلاوة)', lesson: 'الله وحده القادر المعبود' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة القرآن الكريم (التلاوة)', lesson: 'من مظاهر قدرة الله تعالى وعظيم فضله' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة القرآن الكريم (التلاوة)', lesson: 'دلائل عظمة الخالق عز وجل' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة القرآن الكريم (التلاوة)', lesson: 'مبادئ وقيم خالدة' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة القرآن الكريم (التلاوة)', lesson: 'أسس الدعوة إلى الله تعالى' },
      
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة القرآن الكريم (التفسير والاستحفاظ)', lesson: 'صيانة الحقوق وتوثيق العقود' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة القرآن الكريم (التفسير والاستحفاظ)', lesson: 'إيمان ودعاء' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة القرآن الكريم (التفسير والاستحفاظ)', lesson: 'القرآن الكريم وعظيم قدرة الله تعالى' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة القرآن الكريم (التفسير والاستحفاظ)', lesson: 'سعة علم الله تعالى وكمال قدرته' },
      
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة الحديث النبوي الشريف', lesson: 'بيعة صادقة' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة الحديث النبوي الشريف', lesson: 'الإيمان قوة وعمل' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة الحديث النبوي الشريف', lesson: 'حكم القاضي لا يُحل الحرام' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة الحديث النبوي الشريف', lesson: 'مكانة الشهيد وعظيم أجره' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة الحديث النبوي الشريف', lesson: 'عموم المسؤولية' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة الحديث النبوي الشريف', lesson: 'توجيه نبوي حكيم' },
      
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة التربية الإنسانية', lesson: 'بناء الحضارة في الإسلام' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة التربية الإنسانية', lesson: 'مقومات الحضارة الإنسانية في الإسلام' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة التربية الإنسانية', lesson: 'مظاهر الحضارة الإسلامية' },
      
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة التربية الأسرية والاجتماعية', lesson: 'نظام الأسرة في الإسلام' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة التربية الأسرية والاجتماعية', lesson: 'المحرّمات من النساء في الزواج' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة التربية الأسرية والاجتماعية', lesson: 'الخطبة والأسس الإسلامية للزواج' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة التربية الأسرية والاجتماعية', lesson: 'عقد الزواج' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة التربية الأسرية والاجتماعية', lesson: 'حقوق الزوجين' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة التربية الأسرية والاجتماعية', lesson: 'الطلاق' },
      
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة التربية الاقتصادية والمالية', lesson: 'نظام المال في الإسلام' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة التربية الاقتصادية والمالية', lesson: 'قيود الملكية (الفردية - الجماعية)' },
      
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة العلاقات الدولية', lesson: 'أسس العلاقات الدولية في الإسلام' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة العلاقات الدولية', lesson: 'الجهاد في الإسلام' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة العلاقات الدولية', lesson: 'من آداب الجهاد وأحكامه' },
      
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة السيرة النبوية والأعلام', lesson: 'هدي النبي في القيادة' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة السيرة النبوية والأعلام', lesson: 'أم سليم بنت ملحان' },
      { stream: 'مشترك', subject: 'التربية الإسلامية', unit: 'وحدة السيرة النبوية والأعلام', lesson: 'الإمام جعفر الصادق' },

      // اللغة الإنجليزية (مشترك)
      { stream: 'مشترك', subject: 'اللغة الإنجليزية', unit: 'Module 1: Learning for Life', lesson: 'Unit 1: Life Choices' },
      { stream: 'مشترك', subject: 'اللغة الإنجليزية', unit: 'Module 1: Learning for Life', lesson: 'Unit 2: Success' },
      
      { stream: 'مشترك', subject: 'اللغة الإنجليزية', unit: 'Module 2: Sciences', lesson: 'Unit 3: Medicine' },
      { stream: 'مشترك', subject: 'اللغة الإنجليزية', unit: 'Module 2: Sciences', lesson: 'Unit 4: Engineering' },
      
      { stream: 'مشترك', subject: 'اللغة الإنجليزية', unit: 'Module 3: Politics', lesson: 'Unit 5: Civil Rights' },
      { stream: 'مشترك', subject: 'اللغة الإنجليزية', unit: 'Module 3: Politics', lesson: 'Unit 6: United Nations' },
      
      { stream: 'مشترك', subject: 'اللغة الإنجليزية', unit: 'Module 4: Biology', lesson: 'Unit 7: Microorganism' },
      { stream: 'مشترك', subject: 'اللغة الإنجليزية', unit: 'Module 4: Biology', lesson: 'Unit 8: Facts about Human Body' },
      
      { stream: 'مشترك', subject: 'اللغة الإنجليزية', unit: 'Module 5: Culture', lesson: 'Unit 9: Citizenship' },
      { stream: 'مشترك', subject: 'اللغة الإنجليزية', unit: 'Module 5: Culture', lesson: 'Unit 10: Culture Shock' },
      
      { stream: 'مشترك', subject: 'اللغة الإنجليزية', unit: 'Module 6: Technology', lesson: 'Unit 11: Artificial Intelligence' },
      { stream: 'مشترك', subject: 'اللغة الإنجليزية', unit: 'Module 6: Technology', lesson: 'Unit 12: Digital Literacy' },
    ];

    await Lesson.insertMany(lessons);
    console.log(`Successfully inserted ${lessons.length} lessons!`);
    process.exit(0);
  })
  .catch(console.error);
