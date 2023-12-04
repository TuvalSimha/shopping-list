import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "urql";
import { graphql } from "@/gql/gql";

const postsQueryDocument = graphql(/* GraphQL */ `
  mutation AddItem($title: String!, $quantity: String!) {
    addItem(title: $title, quantity: $quantity) {
      id
      title
      quantity
    }
  }
`);

const formSchema = z.object({
  title: z.string().min(2).max(50),
  quantity: z.string().min(1).max(10),
});

export default function AddItem() {
  const [result, addItem] = useMutation(postsQueryDocument);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      quantity: "1",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    addItem(values);
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 5000);
    return () => clearTimeout(timer);
  }

  return (
    <div className="mt-[100px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            defaultValue={"1"}
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
          <Button onSubmit={form.handleSubmit(onSubmit)} type="submit">
            הוסף
          </Button>
        </form>
      </Form>
    </div>
  );
}
