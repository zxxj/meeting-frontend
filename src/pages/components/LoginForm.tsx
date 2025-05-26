'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  username: z.string().min(2, {
    message: '用户名不能为空!',
  }),
  password: z.string().min(2, {
    message: '密码不能为空!',
  }),
});

export function LoginForm() {
  // 调用useForm钩子并配置解析器
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  interface UserLogin {
    username: string;
    password: string;
  }
  // 处理表单提交
  const onSubmit = (data: UserLogin) => {
    console.log('表单提交的数据:', data);
    // 这里可以添加API调用等处理逻辑
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <div className="flex">
                <FormLabel className="w-14">用户名:</FormLabel>
                <FormControl className="flex-1">
                  <Input placeholder="请输入用户名" {...field} />
                </FormControl>
                <FormMessage />
              </div>
              {/* <FormDescription>登录表单.</FormDescription> */}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex">
                <FormLabel className="w-14">密码:</FormLabel>
                <FormControl className="flex-1">
                  <Input placeholder="请输入密码" type="password" {...field} />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-between mb-2">
          <Button variant="link">没有账号? 去注册</Button>
          <Button variant="link">忘记密码</Button>
        </div>
        <Button type="submit" className="w-full">
          登录
        </Button>
      </form>
    </Form>
  );
}
