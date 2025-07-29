import { GetItem } from '../../helper/storages'
import { Navigate } from 'react-router-dom'
import type { ProtectedRoute } from '../../types'
export const LoginProtect = ({children}:ProtectedRoute) => {
    const token  = GetItem("access_token")
    const role = GetItem("role")
    if(token){
        return <Navigate to={`/${role}`} />
    }
  return (
    <>
    {children}
    </>
  )
}
export default LoginProtect
