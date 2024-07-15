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
import { useState } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"



const formSchema = z.object({
  applicationName: z.string().min(2).max(50),
  applicationDescription:z.string().min(2).max(200),
  applicationIpAddress:z.string().min(2).max(100),
  applicationMOTSId:z.string().min(2).max(100),
  hostDetails: z.string().min(2).max(10),
})

const NewApp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicationName: "",
      applicationDescription:"",
      applicationIpAddress:"",
      applicationMOTSId:"" ,
      hostDetails:""
    },
  })
 async function onSubmit(values: z.infer<typeof formSchema>) {
    
    console.log(values);
    try {
      setLoading(true);
      const response = await axios.post("/api/applications/createApplication", values);
      console.log("Application created successfully", response.data);
      toast.success(" success");
      router.push("/manage/newApp/addURL");

    } catch (error: any) {
      console.log(" failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
   
   
  }
  return (
    
    <div className="max-w-[600px] border-2 p-8 rounded-md mt-12">
      <div><Toaster/></div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="applicationName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Name</FormLabel>
              <FormControl>
                <Input placeholder="Example App" {...field} />
              </FormControl>
              <FormDescription>
                This is your Application name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
        control={form.control}
        name="applicationDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Application Description</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormDescription>
              Describe your Application.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="applicationIpAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Application IP Address</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormDescription>
              Enter the IP Address of your Application.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="applicationMOTSId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Application MOTS ID</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormDescription>
              Enter the MOTS ID of your application
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      /><FormField
      control={form.control}
      name="hostDetails"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Host Details</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select A Host" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Cloud">Cloud</SelectItem>
              <SelectItem value="ONPRIME">ONPRIME</SelectItem>
              <SelectItem value="Other">Other</SelectItem>

            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
      
        <Button type="submit">Submit</Button>
      </form>
    </Form>
      </div>
  )
}

export default NewApp