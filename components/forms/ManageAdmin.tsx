"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Router } from "next/router"
import { useRouter } from "next/navigation"
import { Toaster, toast } from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"

interface Application {
  _id: string;
  applicationName: string;
}
interface Userdata {
  _id: string;
  email: string;
  role: string;
}

const formSchema = z.object({
  application: z.string().min(2).max(50),
  admins: z.string(),
  

})


const ManageAdmin = () => {
  const [values, setValues] = useState<Application[]>([])
  const [users, setUsers] = useState<Userdata[]>([])
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/applications/fetchApplications")
      .then((data) => data.json())
      .then((val) => setValues(val.apps));

      fetch("http://localhost:3000/api/users/allUsers")
      .then((data) => data.json())
      .then((val) => setUsers(val.users))
  }, [])


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      application: "",
      admins: "",
      
    },
  })
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log(data);
      setLoading(true);
      const res = await axios.patch(`/api/users/userRole/${data.admins} `, data);
      const response = await axios.post(`/api/applications/addAdmin/${data.application} `, data);
      console.log("Adminstrator Added successfully", response.data);
      console.log("Role updated successfully", res.data);
      toast.success(" Adminstrator Added successfully");
      

    } catch (error: any) {
      toast.error("Adminstrator already exists");
    } finally {
      setLoading(false);
    }
    
  }
  return (

    <div className="max-w-[600px] border-2 p-8 rounded-md mt-8">
      <div><Toaster/></div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="application"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Application</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an Application" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {values.map((opts, i) => (
                      <SelectItem key={i} value={opts._id}>{opts.applicationName}</SelectItem>
                    ))}

                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="admins"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Users</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an User" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  {users.map((opts, i) => (
                      <SelectItem key={i} value={opts._id}>{opts.email}</SelectItem>
                    ))}

                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit">Add Admin</Button>
        </form>
      </Form>
    </div>
  )
}

export default ManageAdmin