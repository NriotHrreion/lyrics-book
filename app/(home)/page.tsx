import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col gap-3 justify-center items-center">
      <h1 className="text-2xl font-bold">歌词本</h1>
      <p className="text-fd-muted-foreground">
        这是一个网页歌词本，包含陈升、李志的歌词
      </p>
      <Link
        href="/docs"
        className={
          cn("w-fit", buttonVariants({ variant: 'default' }))
        }>
        点击进入
      </Link>
    </main>
  );
}
