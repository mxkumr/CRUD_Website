import { LoginForm } from '@/components/auth/LoginForm';
import { WebGLShader } from '@/components/WebGLShader';

export default function LoginPage() {
  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      <WebGLShader />
      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex flex-1 items-center justify-center p-4">
          <LoginForm />
        </div>
        <footer className="border-t border-border/40 py-6 text-center text-sm text-muted-foreground backdrop-blur-sm">
          © {new Date().getFullYear()} TalentFlow. Internal recruiting demo.
        </footer>
      </div>
    </main>
  );
}
