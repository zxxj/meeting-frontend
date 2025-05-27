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
import { Link, useNavigate } from 'react-router-dom';
import type { UserRegisterForm } from '@/types/user';
import { register, sendCaptcha } from '@/service/modules/user';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: '用户名不能为空!',
    }),
    nickname: z.string().min(2, {
      message: '昵称不能为空!',
    }),
    password: z.string().min(2, {
      message: '密码不能为空!',
    }),
    repassword: z.string().min(2, {
      message: '确认密码不能为空!',
    }),
    email: z.string().min(2, {
      message: '邮箱不能为空!',
    }),
    captcha: z.string().min(2, {
      message: '验证码不能为空!',
    }),
  })
  .refine((data) => data.password === data.repassword, {
    path: ['repassword'], // 指定错误显示在哪个字段上
    message: '两次密码输入不一致!',
  });

export function RegisterForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 调用useForm钩子并配置解析器
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      nickname: '',
      password: '',
      repassword: '',
      email: '',
      captcha: '',
    },
  });

  // 处理表单提交
  const onSubmit = async (data: UserRegisterForm) => {
    setLoading(true);
    console.log('表单提交的数据:', data);
    try {
      const { code } = await register(data);
      if (code === 200 || code === 201) {
        toast('注册成功!', {
          description: '即将跳转到登录页面',
          action: {
            label: '关闭',
            onClick: () => console.log('Undo'),
          },
        });

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast('注册失败!', {
          description: `错误信息: 请求超时`,
          action: {
            label: '关闭',
            onClick: () => console.log('Undo'),
          },
        });
      }
    } catch (error) {
      toast('注册接口超时!', {
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

  const send = async () => {
    const values = form.getValues();
    try {
      const { code, data } = await sendCaptcha('register', values.email);

      if (code === 200 || code === 201) {
        toast('成功!', {
          description: `${data}`,
          action: {
            label: '关闭',
            onClick: () => console.log('Undo'),
          },
        });
      } else {
        toast('错误!', {
          description: `${data}!`,
          action: {
            label: '关闭',
            onClick: () => console.log('Undo'),
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast('错误!', {
        description: `验证码发送异常!`,
        action: {
          label: '关闭',
          onClick: () => console.log('Undo'),
        },
      });
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
                <FormLabel className="w-16">用户名:</FormLabel>
                <FormControl className="flex-4/5">
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
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <div className="flex">
                <FormLabel className="w-16">昵称:</FormLabel>
                <FormControl className="flex-1">
                  <Input
                    placeholder="请输入昵称"
                    autoComplete="nickname"
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
                <FormLabel className="w-16">密码:</FormLabel>
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

        <FormField
          control={form.control}
          name="repassword"
          render={({ field }) => (
            <FormItem>
              <div className="flex">
                <FormLabel className="w-16">确认密码:</FormLabel>
                <FormControl className="flex-1">
                  <Input
                    placeholder="请再次确认密码"
                    autoComplete="new-password"
                    type="password"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex">
                <FormLabel className="w-16">邮箱:</FormLabel>
                <FormControl className="flex-1">
                  <Input placeholder="请输入邮箱" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="captcha"
          render={({ field }) => (
            <FormItem>
              <div className="flex">
                <FormLabel className="w-16">验证码:</FormLabel>
                <FormControl className="flex-1">
                  <Input placeholder="请输入验证码" {...field} />
                </FormControl>
                <Button
                  className="ml-4"
                  disabled={loading}
                  onClick={async () => {
                    setLoading(true);
                    try {
                      await send();
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin w-4 h-4 mr-2" />
                      发送中...
                    </>
                  ) : (
                    '发送验证码'
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end mb-2">
          <Button variant="link">
            <Link to="/login">已有账号? 去登录</Link>
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
              注册中...
            </div>
          ) : (
            '注册'
          )}
        </Button>
      </form>
    </Form>
  );
}
