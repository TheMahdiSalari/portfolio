// app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    // ✅ فیکس: اضافه کردن w-full برای اطمینان از تراز درست
    <div className="flex items-center w-full"> 
      <h1 className="text-lg font-semibold md:text-2xl">خوش آمدید، مدیر!</h1>
    </div>
  )
}