const Intentional=()=>import("@/views/admissions/Intentional.vue")//意向学员管理
const Solicitation=()=>import("@/views/admissions/Solicitation.vue")//邀约查询
const Teacher=()=>import("@/views/teacher/index.vue")//教师管理
const Info=()=>import("@/views/students/info.vue")//学生信息
const Exam=()=>import("@/views/students/exam.vue")//考试管理
const Lesson=()=>import("@/views/students/lesson.vue")//课时管理
const Class=()=>import("@/views/class/index.vue")//排课管理
const Administrative=()=>import("@/views/administrative/index.vue")//行政管理
const Finance=()=>import("@/views/finance/index.vue")//财务管理
const Content=()=>import("@/components/Content.vue")//公共布局
export default {
    Intentional,
    Solicitation,
    Teacher,
    Info,
    Exam,
    Lesson,
    Class,
    Administrative,
    Finance,
    Content
}