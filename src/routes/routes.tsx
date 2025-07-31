import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from '../App';
import { SignUp,SignIn, Admin, StudentLayout, Teacher, NotFound, Courses, LoginProtect, LayoutProtect, Worker, Branches } from '@pages';
import { Groups } from '@pages';
import SingleGroup from '../pages/groups/single-group';
import Room from '../pages/rooms/room';
import TeacherLayout from '../pages/teachers-layout/teacher-layout';
import Dashboard from '../pages/teachers-layout/dashboard';
import StudentsGroup from '../pages/teachers-layout/students-group';
import MyGroup from '../pages/teachers-layout/my-groups';
import GroupDetailView from '../pages/teachers-layout/group-view';
const Router = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<App />}>
          {/* SiginIN and SingUp Routes  */}
          <Route
            index
            element={
              <LoginProtect>
                <SignIn />
              </LoginProtect>
            }
          />
          <Route path="sign-up" element={<SignUp />} />
          {/* Admin Layout */}
          <Route
            path="admin"
            element={
              <LayoutProtect>
                <Admin />
              </LayoutProtect>
            }>
            <Route index element={<Groups />} />,
            <Route path="group/:id" element={<SingleGroup />} />
            <Route path="students" element={<StudentLayout />} />,
            <Route path="branches" element={<Branches />} />,
            <Route path="courses" element={<Courses />}></Route>
            <Route path="teachers" element={<Teacher/>}></Route>
            <Route path='rooms' element={<Room/>}></Route>
          </Route>
          {/* Student Layout */}
          <Route path="student" element={<StudentLayout />}></Route>

          {/* Teacher Layout */}
          <Route path="teacher" element={<TeacherLayout />}>
            <Route index element={< Dashboard/>} />
            <Route path='my-groups' element={<MyGroup />} />
            <Route path="my-groups/:id" element={<GroupDetailView />} />
            <Route path="group/:id" element={<StudentsGroup />} />
          </Route>
          <Route path="/worker" element={<Worker />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      )
    );
  return <RouterProvider router={router}/>
};

export default Router;
