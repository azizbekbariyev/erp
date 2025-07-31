import { Switch, Table } from 'antd'
import { useParams } from 'react-router-dom'

const StudentsGroup = () => {
    const id = useParams()
    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    }
    // const students = use
    console.log(id);
    const colums = [
        {
            title:"#",
            dataIndex:"id",
        },
        {
            title:"O'quvchi ismi",
            render: (first_name:string, last_name:string)=><span>{first_name} {last_name}</span>
        },
        {
            title:"Kelgan",
            render:()=><Switch defaultChecked onChange={onChange} />
        },
    ]
  return (
    <div>
        <Table columns={colums} />
    </div>
  )
}

export default StudentsGroup