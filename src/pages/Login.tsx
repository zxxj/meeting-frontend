import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LoginForm } from './components/LoginForm';

export const Login = () => {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex items-center justify-center">
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle className="text-center">会议室预约系统</CardTitle>
            <CardDescription className="text-center">
              <p>前端: React ShadcnUI Axios.</p>
              <p>后端: Nest JWT Mysql TypeOrm Redis.</p>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
