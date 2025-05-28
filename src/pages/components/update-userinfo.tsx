import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

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
import { getUserInfo, sendCaptcha, update } from '@/service/modules/user';
import type { UpdateUserInfoForm } from '@/types/user';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const formSchema = z.object({
  avatar: z.string().min(2, {
    message: '头像不能为空!',
  }),
  username: z.string().min(2, {
    message: '用户名不能为空!',
  }),
  phoneNumber: z.string().min(2, {
    message: '手机号不能为空!',
  }),
  nickname: z.string().min(2, {
    message: '昵称不能为空!',
  }),

  email: z.string().min(2, {
    message: '邮箱不能为空!',
  }),
  captcha: z.string().min(2, {
    message: '验证码不能为空!',
  }),
});

export const UpdateUserInfo = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);

  // 调用useForm钩子并配置解析器
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      phoneNumber: '',
      avatar: '',
      nickname: '',
      email: '',
      captcha: '',
    },
  });

  // 处理表单提交
  const onSubmit = async (data: UpdateUserInfoForm) => {
    setLoading(true);
    console.log('表单提交的数据:', data);

    try {
      const { code, data: res } = await update(data);
      if (code === 200 || code === 201) {
        toast('更新成功!', {
          description: `${data}`,
          action: {
            label: '关闭',
            onClick: () => console.log('Undo'),
          },
        });
      } else {
        toast('更新失败!', {
          description: `错误信息: ${res}`,
          action: {
            label: '关闭',
            onClick: () => console.log('Undo'),
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast('更新信息接口超时!', {
        description: `!!`,
        action: {
          label: '关闭',
          onClick: () => console.log('Undo'),
        },
      });
    } finally {
      setLoading(false);
      onOpenChange(false);
    }
  };

  const send = async () => {
    const values = form.getValues();
    try {
      const { code, data } = await sendCaptcha('update', values.email);

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

  const fetchUserInfo = async () => {
    const res = await getUserInfo();
    const { avatar, username, phoneNumber, nickname, email } = res.data;
    form.reset({ avatar, nickname, email, username, phoneNumber });
  };

  useEffect(() => {
    if (!open) return;
    fetchUserInfo();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>编辑个人信息</DialogTitle>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex">
                      <FormLabel className="w-14">头像:</FormLabel>
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
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex">
                      <FormLabel className="w-14">昵称:</FormLabel>
                      <FormControl className="flex-1">
                        <Input placeholder="请输入昵称" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex">
                      <FormLabel className="w-14">手机号:</FormLabel>
                      <FormControl className="flex-1">
                        <Input placeholder="手机号" {...field} />
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
                      <FormLabel className="w-14">邮箱:</FormLabel>
                      <FormControl className="flex-1">
                        <Input placeholder="请输入邮箱" disabled {...field} />
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
                      <FormLabel className="w-14">验证码:</FormLabel>
                      <FormControl className="flex-1">
                        <Input placeholder="请输入验证码" {...field} />
                      </FormControl>
                      <FormMessage />
                      <Button
                        className="ml-4"
                        disabled={loading}
                        onClick={async (e) => {
                          e.preventDefault();
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
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="submit"
                  className="w-4/5 mx-auto block"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      更新中...
                    </div>
                  ) : (
                    '确认'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>

          {/* <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription> */}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
