"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, FilePen } from "lucide-react";
import download from "downloadjs";
import { githubUrl, siteUrl } from "@/lib/global";
import { cn, writeToClipboard } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";

interface PageToolProps {
    page: string
}

export function EditOnGithub({ page }: PageToolProps) {
    return (
        <Link
            className={cn('not-prose', buttonVariants({ variant: 'outline' }))}
            href={`${githubUrl}/blob/main/content/docs/${page}`}
            target='_blank'>
            <FilePen />
            编辑此页面
        </Link>
    );
}

export function DownloadLyrics({ page }: PageToolProps) {
    interface ResponseType {
        data: {
            song: string
            lyrics: string
        }
    }

    const handleDownload = async () => {
        const res = await fetch(`/api/lyrics?path=${page.replace('.mdx', '')}`);
        const { data } = await res.json() as ResponseType;
        const lyrics = data.lyrics.replaceAll('<br />', '\n');
        
        download(lyrics, data.song +'.txt', 'text/plain');
    };

    return (
        <Button
            variant='outline'
            className='cursor-pointer'
            onClick={() => handleDownload()}>
            <Download />
            获取歌词
        </Button>
    );
}

export function CopyAPI({ page }: PageToolProps) {
    const apiUrl = `${siteUrl}/api/lyrics?path=/${page.replace('.mdx', '')}`;

    const [buttonText, setButtonText] = useState('复制');

    return (
        <AlertDialog onOpenChange={() => setButtonText('复制')}>
            <AlertDialogTrigger asChild>
                <Button
                    variant='outline'
                    className='cursor-pointer'>
                    复制 API
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>复制 API 接口</AlertDialogTitle>
                    <AlertDialogDescription className='space-y-2'>
                        <Textarea value={apiUrl} readOnly/>
                        <Link href='/docs/api' className='text-sm float-right hover:underline hover:text-fd-foreground'>
                            API 文档
                        </Link>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>关闭</AlertDialogCancel>
                    <Button
                        onClick={async () => {
                            await writeToClipboard(apiUrl);
                            setButtonText('复制成功');
                        }}>
                        {buttonText}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
