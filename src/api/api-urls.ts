export class ApiUrls {
  //ADMIN AUTH
  public static AUTH: string = "/log-in";

  // GROUPS
  public static GROUPS: string = "/group";

  // COURSES
  public static Course: string = "/courses";

  //STUDENTS
  public static STUDENTS: string = "/students";

  //BRANCHES
  public static BRANCHES: string = "/branches";

  //TEACHERS
  public static TEACHER: string = "/teacher";
  public static TEACHERGROUP: string = "/group-teachers";

  //ROOMS
  public static ROOMS: string = "/rooms";

  //LESSONS
  public static LESSONS: string = "/lessons";

  //LIDS
  public static LID: string = "/lid";

  //EVENTS
  public static EVENTS: string = "/events";

  //ADMIN
  public static ADMIN: string = "/admin";

  //GROUP LESSONS
  public static GROUPLESSONS: string = this.LESSONS + "/group";

  //GROUP TEACHERS
  public static GROUPTEACHERS: string = "/group-teachers"; 
  public static GROUPTEACHERSBYGROUPID: string = this.GROUPTEACHERS + '/by-group';

  //GROUP STUDENTS
  public static GROUPSTUDENTS: string = "/group-students"; 
  public static GROUPSTUDENTSBYGROUPID: string = this.GROUPSTUDENTS + '/by-group';

  //FORGET PASSWORD
  public static FORGETPASSWORD: string = "/admin/forget-password";

  //OTP
  public static CONFIRMOTP: string = "/admin/verify-otp";

  //RESET PASSWORD
  public static RESETPASSWORD: string = "/admin/new-password";
}