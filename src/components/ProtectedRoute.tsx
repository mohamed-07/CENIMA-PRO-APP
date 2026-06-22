import { useAuth } from '@/context/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  // انتظر حتى يتحقق Supabase من الـ session قبل أي redirect
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
      </div>
    );
  }

  // إذا ما في user → رجّعه لصفحة login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // إذا عنده user → اعرض الـ children (MainLayout + الصفحات)
  return <Outlet />;
}