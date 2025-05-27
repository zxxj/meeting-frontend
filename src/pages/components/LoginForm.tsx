'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { login } from '@/service/modules/user';
import { setItem } from '@/utils/local';
import { Link, useNavigate } from 'react-router-dom';
import type { UserLoginForm } from '@/types/user';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const formSchema = z.object({
  username: z.string().min(2, {
    message: '用户名不能为空!',
  }),
  password: z.string().min(2, {
    message: '密码不能为空!',
  }),
});

export function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 调用useForm钩子并配置解析器
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // 处理表单提交
  const onSubmit = async (data: UserLoginForm) => {
    setLoading(true);
    console.log('表单提交的数据:', data);

    try {
      const { code, data: res } = await login(data);
      if (code === 200 || code === 201) {
        toast('登陆成功!', {
          description: '欢迎来到会议室预约系统',
          action: {
            label: '关闭',
            onClick: () => console.log('Undo'),
          },
        });

        setItem('assess_token', res.accessToken);
        setItem('refresh_token', res.refreshToken);
        setItem('user_info', JSON.stringify(res.userInfo));

        navigate('/');
      } else {
        toast('登录失败!', {
          description: `错误信息: ${res}`,
          action: {
            label: '关闭',
            onClick: () => console.log('Undo'),
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast('登陆接口超时!', {
        description: `!!`,
        action: {
          label: '关闭',
          onClick: () => console.log('Undo'),
        },
      });
    } finally {
      setLoading(false);
    }
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
                  <Input
                    placeholder="请输入用户名"
                    autoComplete="username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
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
                  <Input
                    placeholder="请输入密码"
                    type="password"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-between mb-2">
          <Button variant="link" type="button">
            <Link to="/register">没有账号? 去注册</Link>
          </Button>
          <Button variant="link" type="button">
            <Link to="/updatePassword">忘记密码</Link>
          </Button>
        </div>
        <Button
          type="submit"
          className="w-4/5 mx-auto block"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              登录中...
            </div>
          ) : (
            '登录'
          )}
        </Button>
      </form>
    </Form>
  );
}
