// "use client";
// import React from "react";
// import { z } from "zod";
// import { useToast } from "../ui/use-toast";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../ui/form";
// import { createMedia, saveActivityLogsNotification } from "@/lib/queries";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";

// type Props = {
//   subaccountId: string;
//   setClose: () => void;
// };

// const formShcema = z.object({
//   link: z.string().min(1, { message: "Media File is required" }),
//   name: z.string().min(1, { message: "Name is required" }),
// });

// const UploadMediaForm = ({ setClose, subaccountId }: Props) => {
//   const { toast } = useToast();
//   const router = useRouter();
//   const form = useForm<z.infer<typeof formShcema>>({
//     resolver: zodResolver(formShcema),
//     mode: "onSubmit",
//     defaultValues: {
//       link: "",
//       name: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formShcema>) {
//     try {
//       const response = await createMedia(subaccountId, values);
//       await saveActivityLogsNotification({
//         agencyId: undefined,
//         description: `Uploaded a media file | ${response.name}`,
//         subaccountId,
//       });

//       toast({
//         title: "Success",
//         description: "Uploaded a media file",
//       });
//       router.refresh();
//       setClose();
//     } catch (error) {
//       console.log(error);
//       toast({
//         variant: "destructive",
//         title: "Failed",
//         description: "Could not upload media",
//       });
//     }
//   }

//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <CardTitle>Upload Media</CardTitle>
//         <CardDescription>
//           Please enter the details for your file
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem className="flex-1">
//                   <FormLabel>File Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Your agency name" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="link"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Media File</FormLabel>
//                   <FormControl>
//                     {/* <FileUpload
//                       apiEndpoint="subaccountLogo"
//                       value={field.value}
//                       onChange={field.onChange}
//                     /> */}
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit" className="mt-4">
//               Upload Media
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// };

// export default UploadMediaForm;
