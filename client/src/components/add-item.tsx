import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  quantity: z.number().min(1),
});

export function AddItem() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      quantity: 1,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="font-semibold rounded-full bg-black border border-white text-white h-[150px] w-[150px]">
          הוספת פריט
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className=" flex flex-row justify-end right-0">
              <AlertDialogCancel className="bg-red-400 border-[1px] border-black">
                X
              </AlertDialogCancel>
            </div>
            <AlertDialogTitle>הוספת פריט לקניות</AlertDialogTitle>
            <AlertDialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>שם פריט</FormLabel>
                        <FormControl>
                          <Input placeholder="שם פריט" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quantity"
                    defaultValue={1}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>כמות</FormLabel>
                        <FormControl>
                          <Input placeholder="כמות" {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <AlertDialogAction
                    onSubmit={form.handleSubmit(onSubmit)}
                    type="submit"
                  >
                    הוסף
                  </AlertDialogAction>
                </form>
              </Form>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
