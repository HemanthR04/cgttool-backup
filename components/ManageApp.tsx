import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'

const managedata =[
    {
        title: 'Add Application',
        Description: 'Create a new application to manage your URLs',
        btn:"Create New Application",
        href:"/manage/newApp"
    },
    {
        title: 'Manage URLs',
        Description: 'Manage URLs if an exisiting Application',
        btn:"Manage URLs",
        href:"/manage/manageURLs"
    },
    
    {
        title: 'Manage Adminstrators',
        Description: 'Add or manage Adminstrators for applications',
        btn:"Manage Adminstrators",
        href:"/manage/manageAdmins"
    }
]
const ManageApp = () => {
    return (

        <div className='w-full h-[90%] flex flex-wrap  my-[100px] px-40 items-start justify-center gap-12'>
            {
                managedata.map((item,i)=>(
                    <Card key={i} className="sm:col-span-2 w-[400px] h-[200px]">
                        <CardHeader className="pb-3">
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription className="max-w-lg text-balance leading-relaxed">
                                {item.Description}
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button><Link href={`${item.href}`}>{item.btn}</Link></Button>
                        </CardFooter>
                    </Card>
                ))
            }
            
        </div>
    )
}




export default ManageApp