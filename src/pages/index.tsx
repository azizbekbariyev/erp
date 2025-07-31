import { lazy } from "react";
const SignIn = lazy(()=> import("./auth/sign-in"))
const SignUp = lazy(()=> import("./auth/sign-up"))
const Admin = lazy(()=> import("./admin-layout/admin-layout"))
const StudentLayout = lazy(()=> import("./student-layout/student-layout"))
const Teacher = lazy(()=> import("./teacher/teacher"))
const Courses = lazy(()=> import("./courses/courses"))
const NotFound = lazy(()=> import("./not-found/notFound"))
const LayoutProtect = lazy(()=> import("./protect-route/layout-protect"))
const LoginProtect = lazy(()=> import("./protect-route/login"))
const Worker = lazy(()=> import("./worker/worker"))
const Branches = lazy(() => import("./branches/branches"));
const Group = lazy(() => import("./groups/single-group"));
const Groups = lazy(() => import("./groups/groups"));
export {
    SignIn,
    SignUp,
    Admin,
    StudentLayout,
    Teacher,
    NotFound,
    Courses,
    LayoutProtect,
    LoginProtect,
    Worker,
    Branches,
    Group,
    Groups
}