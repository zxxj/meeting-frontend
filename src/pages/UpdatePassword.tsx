import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UpdatePasswordForm } from './components/UpdatePasswordForm';

export const UpdatePassword = () => {
  return (
    <div className="w-screen h-screen ">
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
            <UpdatePasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
